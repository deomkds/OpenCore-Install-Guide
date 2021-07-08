# Bulldozer (15h) e Jaguar (16h)

| Suporte | Versão |
| :--- | :--- |
| Suporte Inicial no macOS | macOS 10.13 High Sierra |

## Ponto de Partida

Criar uma config.plist pode parecer difícil, mas não é. Só demora um pouco, mas esse guia mostrará como configurar tudo. Você não será deixado no escuro. Isso significa que, caso surjam problemas, verifique as configurações da sua config.plist para garantir que está tudo certo. O principal a se observar com o OpenCore:

* **Todas as propriedades precisam estar definidas**. Não existe valores padrão para os quais o OpenCore reverterá, então **não exclua nenhuma seção, a não ser que seja indicado explicitamente**. Se o guia não mencionar uma opção, deixe-a no padrão.
* **O arquivo Sample.plist não pode ser usado do jeito que está**. É preciso configurá-lo antes para o seu computador.
* **NÂO USE CONFIGURADORES**. Eles raramente respeitam as configurações do OpenCore e alguns, como o do Mackie, adicionam propriedades do Clover e corrompem as plists!

Agora, com tudo isso fora do caminho, um breve lembrete sobre as ferramentas necessárias:

* [ProperTree](https://github.com/corpnewt/ProperTree)
  * Editor universal de arquivos `.plist`.
* [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS)
  * Para gerar os dados da SMBIOS.
* [Sample/config.plist](https://github.com/acidanthera/OpenCorePkg/releases)
  * Veja a seção anterior para obter esses arquivos: [Configuração da config.plist](../config.plist/README.md)
* [Patches de Kernel para AMD](https://github.com/AMD-OSX/AMD_Vanilla/tree/opencore)
  * Necessários para iniciar o macOS em hardware AMD (salve-os para mais tarde, a maneira de usá-los será abordada a seguir).
  * [Bulldozer/Jaguar(15h/16h)](https://github.com/AMD-OSX/AMD_Vanilla/tree/opencore/15h_16h) (Suporta macOS 10.13 High Sierra, 10.14 Moajve e 10.15 Catalina).

**E leia este guia mais de uma vez antes de configurar o OpenCore. E tenha certeza de tê-lo configurado corretamente. Observe que as imagens deste guia nem sempre estarão 100% atualizadas, então por favor leia o texto que as acompanha. Se nada for mencionado, mantenha as configurações padrão.**

## ACPI

![ACPI](../images/config/AMD/acpi-fx.png)

### Add

::: tip Informaçõesrmação

É aqui onde serão adicionadas todas as SSDTs do seu computador. Elas são muito importantes para **iniciar o macOS** e possuem muitos usos, como [mapear as USB](https://deomkds.github.io/OpenCore-Post-Install/usb/), [desativar GPUs não suportdas](../extras/spoof.md) e coisas do tipo. E com o sistema do OpenCore, **são necessárias para dar boot**. O guia sobre como fazê-las pode ser encontrado aqui: [**Primeirs Passos com a ACPI**](https://deomkds.github.io/Getting-Started-With-ACPI/)

| SSDTs Necessárias | Descrição |
| :--- | :--- |
| **[SSDT-EC-USBX](https://deomkds.github.io/Getting-Started-With-ACPI/)** | Corrige tanto o controlador integrado e a energia da USB, veja o guia [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para mais detalhes. |

Observe que **não é preciso** adicionar a sua `DSDT.aml` aqui, pois ela já está presente no firmware do seu computador. Então, se ela estiver nessa seção, remova a entrada referente a ela na config.plist e a exclua da pasta `EFI/OC/ACPI`.

Para aqueles que desejam um aprofundamendo sobre extração de DSDT, como fazer as SSDTs e como compilá-las, por favor veja o guia [**Primeiros Passos com a ACPI**](https://deomkds.github.io/Getting-Started-With-ACPI/). SSDTs compiladas possuem a extensão **.aml** (*assembled*) e serão colocadas na pasta `EFI/OC/ACPI`. Elas também **precisam** estar especificadas na sua config.plist, dentro da seção `ACPI -> Add`.

:::

### Delete

Esta seção bloqueia o carregamento de certas tabelas da ACPI. Ignore-a por enquanto.

### Patch

Essa seção permite modificar partes da ACPI (DSDT, SSDT etc.) de forma dinâmica pelo OpenCore. No caso deste guia, os patches são gerenciados pelas SSDTs. É uma solução muito mais limpa pois permite inicar o Windows e outros sistemas operacionais com o OpenCore.

### Quirks

Configurações relacionadas à ACPI. Deixe tudo como padrão pois este guia não vai usar esses *quirks*.

## Booter

![Booter](../images/config/config-universal/aptio-iv-booter.png)

Esta seção é dedicada aos *quirks* relacionados a aplicação de patches no `boot.efi` com o OpenRuntime, o substituto do `AptioMemoryFix.efi`.

### MmioWhitelist

Essa seção está permitindo que os espaços que são geralmente ignorados passem diretamente para o macOS. Útil ao ser combinado com o `DevirtualiseMmio`.

### Quirks

::: tip Informaçõesrmação
Configurações relacionadas à aplicação de patches no boot.efi e a correções de firmware. Mantenha as opções padrão.
:::
::: details Informação Mais Detalhada

* **AvoidRuntimeDefrag**: YES
  * Corrige serviços UEFI em tempo de execução como a data, a hora, a NVRAM, o controle de energia etc.
* **EnableSafeModeSlide**: YES
  * Permite que as variáveis `slide` possam ser usadas no modo de segurança.
* **EnableWriteUnprotector**: YES
  * Necessário para remover a proteção de escrita do registrador CR0.
* **ProvideCustomSlide**: YES
  * Usado para calcular a variável `slide`. No entanto, a necessidade desse *quirk* é determinada pela mensagem `OCABC: Only N/256 slide values are usable!` no log de depuração. Se a mensagem `OCABC: All slides are usable! You can disable ProvideCustomSlide!` estiver presente no seu log, desative o `ProvideCustomSlide`.
* **SetupVirtualMap**: YES
  * Corrige as chamadas de SetVirtualAddresses para endereços virtuais, exigido em placas Gigabyte para resolver *kernel panics* precoces.
  
:::

## DeviceProperties

![DeviceProperties](../images/config/config-universal/DP-no-igpu.png)

### Add

Configura as propriedades de dispositivo a partir de um mapa.

Por padrão, a Sample.plist apresenta esta seção já configurada para GPUs integradas e áudio. Neste momento, não há GPUs integradas, então o PciRoot `PciRoot(0x0)/Pci(0x2,0x0)` pode ser removido da seção`Add`. Para o áudio, o layout será configurado na seção de argumentos de inicialização (*boot-args*), então a remoção do  `PciRoot(0x0)/Pci(0x1b,0x0)` também é recomendada tanto da seção `Add` quanto da seção `Block`.

TL;DR: exclua todos os PciRoot pois não serão utilizados neste guia.

### Delete

Remove as propriedades de dispositivos do mapa. Pode ser ignorado.

## Kernel

| Kernel | Patches de Kernel |
| :--- | :--- |
| ![Kernel](../images/config/AMD/kernel.png) | ![](../images/config/AMD/kernel-patch.png) |

### Add

É aqui onde são especificadas as kexts que serão carregadas, a ordem desse carregamento e quais arquiteturas cada kext suporta. Por padrão, recomenda-se manter o que o ProperTree criou, no entanto, para computadores com CPUs de 32 bits, veja abaixo:

::: details Informações Mais Detalhadas

O principal a se observar é:

* Ordem de Carregamento
  * Lembre-se que quaisquer plugins devem carregar *depois* de suas dependências.
  * Isso significa que kexts como a Lilu **precisam** vir antes da VirtualSMC, AppleALC, WhateverGreen etc.

Lembre-se que usuários do [ProperTree](https://github.com/corpnewt/ProperTree) podem pressionar **Cmd/Ctrl + Shift + R** para adicionar todas as suas kexts na ordem correta sem precisar digitar cada uma manualmente.

* **Arch**
  * Arquiteturas suportadas por esta kext.
  * Atualmente, os valores suportados são `Any`, `i386` (32 bits), e `x86_64` (64 bits).
* **BundlePath**
  * Nome da kext.
  * Ex: `Lilu.kext`.
* **Enabled**
  * Auto explicativo. Ativa ou desativa a kext.
* **ExecutablePath**
  * O caminho para o executável de fato fica escondido dentro da kext. É possível encontrá-lo clicando com o botão direito e selecionando a opção `Show Package Contents`. Geralmente, estará em `Contents/MacOS/Kext` mas algumas kexts possuem outras kexts escondidas na pasta `Plugin`. Observe que kexts compostas somente de uma plsit não precisam ter este campo preenchido.
  * Ex: `Contents/MacOS/Lilu`.
* **MinKernel**
  * A versão mínima do kernel na qual a kext pode ser injetada. Consulte a tabela abaixo para os valores permitidos.
  * Ex. `12.00.00` representa o OS X 10.8 Mountain Lion.
* **MaxKernel**
  * A versão máxima do kernel na qual a kext pode ser injetada. Consulte a tabela abaixo para os valores permitidos.
  * Ex. `11.99.99` representa o OS X 10.7 Lion.
* **PlistPath**
  * Caminho para o arquivo `info.plist` escondido dentro da kext.
  * Ex: `Contents/Info.plist`.
  
::: details Tabela de Suporte de Kernel

| Versão do macOS | MinKernel | MaxKernel |
| :--- | :--- | :--- |
| 10.4 | 8.0.0 | 8.99.99 |
| 10.5 | 9.0.0 | 9.99.99 |
| 10.6 | 10.0.0 | 10.99.99 |
| 10.7 | 11.0.0 | 11.99.99 |
| 10.8 | 12.0.0 | 12.99.99 |
| 10.9 | 13.0.0 | 13.99.99 |
| 10.10 | 14.0.0 | 14.99.99 |
| 10.11 | 15.0.0 | 15.99.99 |
| 10.12 | 16.0.0 | 16.99.99 |
| 10.13 | 17.0.0 | 17.99.99 |
| 10.14 | 18.0.0 | 18.99.99 |
| 10.15 | 19.0.0 | 19.99.99 |
| 11 | 20.0.0 | 20.99.99 |

:::

### Emulate

::: tip Informações

Necessário para esconder CPUs não suportadas como Pentiums e Celerons, e para desativar o gerenciamento de energida da CPU em CPUs não suportadas (como em CPUs AMD).

| Quirk | Ativado |
| :--- | :--- |
| DummyPowerManagement | YES |

:::

::: details Informações Mais Detalhadas

* **CpuidMask**: Deixe vazio.
  * Máscara para CPUID falso.
* **CpuidData**: Deixe vazio.
  * Entrada do CPUID falso.
* **DummyPowerManagement**: YES
  * Nova alternativa para a NullCPUPowerManagement, exigida em todos os computadores baseados em CPUs AMD, pois eles não possuem gerenciamento de energia nativo. Usuários de Intel podem ignorar isso.
* **MinKernel**: Deixe vazio.
  * A versão mínima do kernel no qual os patches acima serão injetados. Se nenhum valor for especificado, será aplicado a todas as versões do macOS. Veja os valores permitidos na tabela abaixo.
  * Ex. `12.00.00` representa o OS X 10.8 Mountain Lion.
* **MaxKernel**: Deixe vazio.
  * A versão máxima do kernel no qual os patches acima serão injetados. Se nenhum valor for especificado, será aplicado a todas as versões do macOS. Veja os valores permitidos na tabela abaixo.
  * Ex. `11.99.99` representa o OS X 10.7 Lion.

::: details Tabela de Suporte de Kernel

| Versão do macOS | MinKernel | MaxKernel |
| :--- | :--- | :--- |
| 10.4 | 8.0.0 | 8.99.99 |
| 10.5 | 9.0.0 | 9.99.99 |
| 10.6 | 10.0.0 | 10.99.99 |
| 10.7 | 11.0.0 | 11.99.99 |
| 10.8 | 12.0.0 | 12.99.99 |
| 10.9 | 13.0.0 | 13.99.99 |
| 10.10 | 14.0.0 | 14.99.99 |
| 10.11 | 15.0.0 | 15.99.99 |
| 10.12 | 16.0.0 | 16.99.99 |
| 10.13 | 17.0.0 | 17.99.99 |
| 10.14 | 18.0.0 | 18.99.99 |
| 10.15 | 19.0.0 | 19.99.99 |
| 11 | 20.0.0 | 20.99.99 |

:::

### Force

Usado para carregar kexts direto do volume do sistema. Relevante somente para sistemas operacionais mais antigos nos quais algumas kexts não estavam presentes no cache (ex.: IONetworkingFamily no Mac OS X 10.6 Snow Leopard).

Pode ser ignorado.

### Block

Impede que certas kexts sejam carregadas. Não relevante no momento.

### Patch

É aqui onde a mágica dos patches de kernel para AMD acontece. Por favor, observe que as opções `KernelToPatch` e `MatchOS` do Clover se tornam `Kernel` e `MinKernel` / `MaxKernel` no OpenCore. É possível encontrar patches prontos feitos AlGrey [aqui](https://amd-osx.com/forum/memberlist.php?mode=viewprofile&u=10918&sid=e0feb8a14a97be482d2fd68dbc268f97)(algrey#9303).

Patches de Kernel:

* [Bulldozer/Jaguar(15h/16h)](https://github.com/AMD-OSX/AMD_Vanilla/tree/opencore/15h_16h) (macOS 10.13 High Sierra, 10.14 Mojave e 10.15 Catalina).

Para unir:

* Abra os dois arquivos;
* Apague a seção `Kernel -> Patch` da config.plist;
* Copie a seção `Kernel -> Patch` da patches.plist;
* Cole onde os patches antigos estavam na config.plist.

![](../images/config/AMD/kernel.gif)

### Quirks

::: tip Informações

Configurações relacionadas ao kernel. Ative somente as seguintes opções:

| Quirk | Ativado |
| :--- | :--- |
| PanicNoKextDump | YES |
| PowerTimeoutKernelPanic | YES |
| XhciPortLimit | YES |

:::

::: details Informações Mais Detalhadas

* **AppleCpuPmCfgLock**: NO
  * Necessário somente quando a trava de CFG não puder ser desativada pela BIOS. Usuários de AMD podem ignorar isso.
* **AppleXcpmCfgLock**: NO
  * Necessário somente quando a trava de CFG não puder ser desativada pela BIOS. Usuários de AMD podem ignorar isso.
* **AppleXcpmExtraMsrs**: NO
  * Desativa múltiplos acessos ao MSR necessários em CPUs não suportadas como Pentiums e alguns Xeons.
* **CustomSMBIOSGuid**: NO
  * Aplica patches de GUID quando UpdateSMBIOSMode está configurado para `Custom`. Mais relevante para notebooks da Dell.
  * Ativar este *quirk* em conjunto com `PlatformInfo -> UpdateSMBIOSMode -> Custom` desativará a injeção de  SMBIOS em sistemas operacionais que não sejam da Apple. Este guia não endossa este método pois quebra a compatibilidade com o Bootcamp. Use por sua conta e risco.
* **DisableIoMapper**: NO
  * CPUs AMD não possuem suporte a DMAR ou VT-D, portanto é irrelevante.
* **DisableLinkeditJettison**: YES
  * Permite que a Lilu e outras kexts tenham uma performance melhor sem `keepsyms=1`.
* **DisableRtcChecksum**: NO
  * Previne que a AppleRTC escreva no checksum primário (0x58-0x59). Exigido para usuários que, ao reiniciar/desligar o macOS, experienciam um reset de BIOS ou são enviados para o modo de segurança.
* **ExtendBTFeatureFlags** NO
  * Útil para aqueles que tiverem problemas com o Continuidade ao usar placas Wi-Fi que não sejam da Apple ou da Fenvi.
* **LapicKernelPanic**: NO
  * Desativa uma *kernel panic* no interruptor AP core lapic. Geralmente é necessário em computadores da HP. Equivalente ao `Kernel LAPIC` do Clover.
* **LegacyCommpage**: NO
  * Resolve a necessidade de instruções SSSE3 em CPUs de 64 bits no macOS. Relevante principalmente para CPUs Pentium 4 de 64 bits, como Prescott.
* **PanicNoKextDump**: YES
  * Permite ler os logs de *kernel panics* quando ocorrem.
* **PowerTimeoutKernelPanic**: YES
  * Ajuda a corrigir *kernel panics* relacionadas a alterações de energia com os drivers da Apple no macOS 10.15 Catalina. Mais perceptível com o áudio digital.
* **SetApfsTrimTimeout**: `-1`
  * Configura o timeout do trim em microsegundos em SSDs com sistema de arquivos APFS. Aplicável somente para o macOS 10.14 Mojave ou mais novos que estejam utilizando SSDs problemáticos.
* **XhciPortLimit**: YES
  * Isto é, na verdade, o patch que corrige o limite de 15 portas USB. Não dependa dele, pois não é uma solução garantida para corrigir problemas de USB. Uma solução mais apropriada para computadores com CPUs AMD pode ser encontrado aqui: [Mapeamento de USB em AMD](https://deomkds.github.io/OpenCore-Post-Install/usb/).
:::

### Scheme

Configurações relacionadas com a inicialização de sistemas operacionais antigos, como o Mac OS X 10.4 Tiger, 10.5 Leopard e 10.6 Snow Leopard. A maioria dos leitores pode pular essa parte. No entanto, aqueles que planejam usar sistemas antigos, continue lendo.

::: details Informações Mais Detalhadas

* **FuzzyMatch**: True
  * Usado para ingorar somas de verificação no kernelcache, optando em vez disso pelo último cache disponível. Pode ajudar a melhorar a performance da inicialização em muitos computadores com Mac OS X 10.6 Snow Leopard.
* **KernelArch**: x86_64
  * Configura o tipo de arquitetura do kernel. As opções possíveis são: `Auto`, `i386` (32 bits) e `x86_64` (64 bits).
  * Se estiver utilizando sistemas operacionais mais antigos que necessitam de um kernel em 32 bits, como o Mac OS X 10.4 Tiger e 10.5 Leopard, recomenda-se configurar essa opção para `Auto` e deixar que o macOS decida a melhor opção baseado na SMBIOS. Veja a tabela abaixo com os valores suportados:
    * Mac OS X 10.4 Tiger e 10.5 Leopard: `x86_64`, `i386` ou `i386-user32`.
      * `i386-user32` se refere ao espaço de usuário em 32 bits. Então, CPUs de 32 bits precisam usar essa opção (ou CPUs que não possuem as instruções SSSE3).
      * `x86_64` Ainda executará o espaço do kernel em 32 bits. No entanto, garantirá que o espaço de usuário seja 64 bits nessas versões do Mac OS X.
    * Mac OS X 10.6 Snow Leopard: `i386`, `i386-user32` ou `x86_64`.
    * OS X 10.7 Lion: `i386` ou `x86_64`.
    * OS X 10.8 Mountain Lion ou mais novo: `x86_64`.

* **KernelCache**: Auto
  * Configura o tipo de cache do kernel. Útil principalmente para depuração, então recomenda-se manter configurado como `Auto` para obter o melhor suporte.

:::

## Misc

![Misc](../images/config/config-universal/misc.png)

### Boot

Configurações da tela de boot. Mantenha todos os padrões como estão.

### Debug

::: tip Informações

Útil para depurar os problemas de inicialização do OpenCore (tudo será alterado, *exceto* `DisplayDelay`):

| Quirk | Ativado |
| :--- | :--- |
| AppleDebug | YES |
| ApplePanic | YES |
| DisableWatchDog | YES |
| Target | 67 |

:::

::: details Informações Mais Detalhadas

* **AppleDebug**: YES
  * Ativa o log do boot.efi. Útil para depuração. Observe que isso só é suportado no macOS 10.15.4 Catalina ou superior.
* **ApplePanic**: YES
  * Tenta salvar os logs de *kernel panics* diretamente no disco.
* **DisableWatchDog**: YES
  * Desativa o watchdog da UEFI. Pode ajudar com problemas precoces na inicialização.
* **DisplayLevel**: `2147483650`
  * Exibe ainda mais informação de depuração. Necessita da versão de depuração do OpenCore.
* **SerialInit**: NO
  * Necessário para configurar a saída serial no OpenCore.
* **SysReport**: NO
  * Útil para a depuração, como a extração de tabelas da ACPI.
  * Observe que essa função está limitada a versões de depuração do OpenCore.
* **Target**: `67`
  * Exibe mais informações de depuração, mas requer a versão de depuração do OpenCore.

Esses valores são baseados nos cálculos feitos na página [Depurando o OpenCore](../troubleshooting/debug.md).

:::

### Security

::: tip Informações

Segurança é bastante autoexplicativa. **Não pule** esta parte. Eis o que deve ser alterado:

| Quirk | Ativado | Comentário |
| :--- | :--- | :--- |
| AllowNvramReset | YES | |
| AllowSetDefault | YES | |
| BlacklistAppleUpdate | YES | |
| ScanPolicy | 0 | |
| SecureBootModel | Default |  Essa opção é literalmente uma palavra e diferencia maiúsculas de minúsculas. Mude para `Disabled` se precisar desativar a Inicialização Segura (ex.: se precisar usar os Web Drivers da Nvidia). |
| Vault | Optional | Esta opção é literalmente uma palavra e omiti-la não é permitido. Você vai se arrepender se não configurá-la para `Optional`. Atente-se para o fato de que a opção diferencia maiúsculas de minúsculas. |

:::

::: details Informações Mais Detalhadas

* **AllowNvramReset**: YES
  * Permite redefinir a NVRAM tanto por meio do seletor de inicialização e ao pressionar `Cmd+Opt+P+R`.
* **AllowSetDefault**: YES
  * Permite apertar `CTRL+Enter` e `CTRL+Index` para configurar o dispositivo padrão de inicialização no seletor.
* **ApECID**: 0
  * Usado para configurar identificadores de inicialização segura personalizados. Atualmente, esse *quirk* não é confiável devido a um *bug* no instalador do macOS. Recomenda-se fortemente manter essa opção configurada para o valor padrão.
* **AuthRestart**: NO
  * Ativa a reinicialização autenticada para o FileVault 2 de forma que a senha não é exigida ao reiniciar o computador. Pode ser considerada um risco à segurança, portanto é opcional.
* **BlacklistAppleUpdate**: YES
  * Usado para bloquear atualizações de firmware. Age como um nível extra de proteção já que o macOS 11 Big Sur não mais utiliza a variável `run-efi-updater`.

* **DmgLoading**: Signed
  * Garante que somente as DMGs que estejam assinadas digitalmente possam ser carregadas.
* **ExposeSensitiveData**: `6`
  * Exibe mais informações de depuração e necessita da versão de depuração do OpenCore.
* **Vault**: `Optional`
  * Não será necessário lidar com cofres, então ignore esta opção. **Não será possível iniciar se esta opção estiver configurada para Secure.**
  * Isso é literalmente uma palavra e sua omissão não é permitida. Você vai se arrepender se não configurá-la para `Optional`. Atente-se para o fato de que a opção diferencia maiúsculas de minúsculas.
* **ScanPolicy**: `0`
  * Configurar para `0` permite ver todos as unidades disponíveis. Por favor, veja a seção [Segurança](https://deomkds.github.io/OpenCore-Post-Install/universal/security.html) para obter mais detalhes. **O OpenCore não iniciará pendrives se esta opção estiver configurada para Default**.
* **SecureBootModel**: Default
  * Ativa a funcionalidade da Inicialização Segura da Apple no macOS. Consulte a seção [Segurança](https://dortania.github.io/OpenCore-Post-Install/universal/security.html) para mais detalhes.
  * Observação: Usuários podem notar que atualizar o OpenCore em um SO já instalado pode resultar em falhas precoces de inicialização. Para resolver isso, veja: [Parado em OCB: LoadImage failed - Security Violation](/troubleshooting/extended/kernel-issues.md#stuck-on-ocb-loadimage-failed-security-violation).

:::

### Tools

Usado para executar as ferramentas de depuração do OpenCore, como o shell. A função de *snapshot* do ProperTree adicionará as ferramentas necessárias automaticamente.

### Entries

Usado para especificar caminhos de inicialização irregulares que não podem ser encontrados naturalmente pelo OpenCore.

Não será abordado aqui. Veja o item 8.6 do PDF de configuração para mais informações: [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) (em inglês).

## NVRAM

![NVRAM](../images/config/config-universal/nvram.png)

### Add

::: tip 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14

Usado para o escalonamento da interface de usuário do OpenCore. O padrão servirá para os propósitos deste guia. Veja a seção abaixo para obter informações mais detalhadas.

:::

::: details Informações Mais Detalhadas

Caminho do inicializador. Usado principalmente para o escalonamento da interface gráfica.

* **UIScale**:
  * `01`: Resolução padrão.
  * `02`: HiDPI (geralmente necessário para que o FileVault funcione corretamente em telas menores)

* **DefaultBackgroundColor**: Cor de fundo usada pelo boot.efi
  * `00000000`: Syrah Black (preto).
  * `BFBFBF00`: Light Gray (cinza).

:::

::: tip 4D1FDA02-38C7-4A6A-9CC6-4BCCA8B30102

GUID de NVRAM do OpenCore. Relevante principalmente para usuários da RTCMemoryFixup.

:::

::: details Informações Mais Detalhadas

* **rtc-blacklist**: <>
  * Para ser usado em conjunto com a RTCMemoryFixup. Acesse esta página para obter mais detalhes: [Corrigindo problemas de escrita do RTC](https://deomkds.github.io/OpenCore-Post-Install/misc/rtc.html#finding-our-bad-rtc-region)
  * A maioria dos usuários pode ignorar esta seção.

:::

::: tip 7C436110-AB2A-4BBB-A880-FE41995C9F82

Máscara de bits da Proteção da Integridade do Sistema (SIP).

* **Argumentos de inicialização (boot-args) de uso geral**:

| boot-args | Descrição |
| :--- | :--- |
| **-v** | Ativa o modo *verbose*, que exibe todos os textos ocultos que rolam na tela durante a inicialização em vez da maçã e da barra de progresso. É de grande valia para qualquer *Hackintosher*, já que oferece uma espiada por trás do processo de inicialização e pode ajudar a identificar problemas, kexts defeituosas e outras coisas que impeçam o macOS de iniciar completamente. |
| **debug=0x100** | Isso desativa o watchdog do macOS, o que ajuda a prevenir uma reinicialização após um *kernel panic*. Dessa forma, é possível (talvez) obter algumas informações importantes e seguir as migalhas até resolver os problemas. |
| **keepsyms=1** | É uma configuração companheira do debug=0x100, que diz ao SO para também exibir na tela os símbolos num *kernel panic*. Pode oferecer uma compreensão ainda maior sobre o que pode estar causando o *kernel panic* em primeiro lugar. |
| **npci=0x2000** | Isso desativa uma depuração da PCI relacionada a `kIOPCIConfiguratorPFM64`. Uma alternativa é `npci= 0x3000`, que desativa também a depuração relacionada a`gIOPCITunnelledKey`. Necessário quando a inicialização trava em `PCI Start Configuration`, pois há conflitos de IRQ nas trilhas de PCI. **Desnecessário se Above4GDecoding estiver ativado**. [Fonte](https://opensource.apple.com/source/IOPCIFamily/IOPCIFamily-370.0.2/IOPCIBridge.cpp.auto.html) (em inglês) |

* **Argumentos de inicialização (boot-args) específicas de GPUs**:

| boot-args | Descrição |
| :--- | :--- |
| **agdpmod=pikera** | Usado para desativar o boardID em GPUs Navi (série RX 5000). Sem isso, será exibida uma tela preta. **Não use caso não possua uma GPU Navi** (isto é, placas Polaris e Vega não devem usar). |
| **nvda_drv_vrl=1** | Usado para ativar os Web Drivers da Nvidia em placas Maxwell e Pascal no macOS 10.12 Sierra e 10.13 High Sierra. |

* **csr-active-config**: `00000000`
  * Confgigurações da Proteção da Integridade do Sistema (SIP). É geralmente recomendado alterar essa opção por meio da partição de Recuperação, usando o utilitário de linha de comando `csrutil`.
  * Por padrão, o `csr-active-config` é configurado para `00000000`, o que ativa a Proteção da Integridade do Sistema. É possível escolher uma variedade de valores diferentes, mas de maneira geral, recomenda-se mantê-lo ligado para melhores práticas de segurança. Mais informações podem ser encontradas na página de solução de problemas: [Desativando o SIP](../troubleshooting/extended/post-issues.md#disabling-sip).

* **run-efi-updater**: `No`
  * Isso é usado para prevenir que os pacotes de atualização de firmware da Apple sejam instaldos e quebrem a ordem de inicialização. É importante pois essas atualizações de firmware (criadas para os Macs) não funcionam.

* **prev-lang:kbd**: <>
  * Necessário para teclados não latinos. Use o formato `lang-COUNTRY:keyboard`. Recomenda-se manter vazio, mas é possível especificar. **O padrão na Sample.plist é russo,**):
  * Estadunidense: `en-US:0`(`656e2d55533a30` em hexadecimal).
  * Lista completa pode ser encontrada em [AppleKeyboardLayouts.txt](https://github.com/acidanthera/OpenCorePkg/blob/master/Utilities/AppleKeyboardLayouts/AppleKeyboardLayouts.txt) (em inglês).
  * Dica: `prev-lang:kbd` pode ser mudada para uma cadeia de caracteres (string) de forma que digitar `en-US:0` diretamente também será válido, sem a necessidade de converter o valor para hexadecimal.

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| prev-lang:kbd | String | en-US:0 |

:::

### Delete

::: tip Informações

Reescreve as variáveis NVRAM na marra. Observe que `Add` **não sobrescreve** valores que já estejam presentes na NVRAM. Então, valores como os `boot-args` devem ser deixados como estão. Mude apenas o seguinte:

| Quirk | Ativado |
| :--- | :--- |
| WriteFlash | YES |

:::

::: details Informações Mais Detalhadas

* **LegacyEnable**: NO
  * Permite que a NVRAM seja armazenada no arquivo nvram.plist. Necessário em computadores que não possuem NVRAM nativa.

* **LegacyOverwrite**: NO
  * Permite sobrescrever variáveis de firmware a partir do arquivo nvram.plist. Necessário somente em computadores que não possuem NVRAM nativa.

* **LegacySchema**
  * Usado para atribuir variáveis NVRAM. Usado com o LegacyEnable configurado para YES.

* **WriteFlash**: YES
  * Ativa a função de escrever em memória *flash* para todas as variáveis adicionadas.

:::

## PlatformInfo

![PlatformInfo](../images/config/config-universal/iMacPro-smbios.png)

::: tip Informações

Para configurar a informação da SMBIOS, será utilizado o aplicativo [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS), desenvolvido por CorpNewt.

Neste exemplo, será selecionada a SMBIOS do iMacPro1,1. No entanto, algumas SMBIOS funcionam melhor com certas GPUs do que outras.

* iMacPro1,1: AMD RX Polaris ou mais novas.
* MacPro7,1: AMD RX Polaris ou mais novas.
  * Observe que MacPro7,1 é exclusiva para macOS 10.15 Catalina ou superior.
* MacPro6,1: AMD R5/R7/R9 e mais antigas.
* iMac14,2: Nvidia Kepler e mais novas.
  * Observação: iMac14,2 é a única que possui suporte nos OS X 10.8 Mountain Lion ao macOS 10.15 Catalina. Para o macOS 11 Big Sur ou mais novo, use MacPro7,1.

Execute o GenSMBIOS, escolha a opção 1 para baixar o MacSerial e a opção 3 para selecionar a SMBIOS. Isso mostrará uma saída similar à seguinte:

```sh
  #######################################################
 #              iMacPro1,1 SMBIOS Info                 #
#######################################################

Type:         iMacPro1,1
Serial:       C02YX0TZHX87
Board Serial: C029269024NJG36CB
SmUUID:       DEA17B2D-2F9F-4955-B266-A74C47678AD3
```

A ordem é `Product | Serial | Board Serial (MLB)`

A parte `Type` deve ser copiada para `Generic -> SystemProductName`.

A parte `Serial` deve ser copiada para `Generic -> SystemSerialNumber`.

A parte `Board Serial` deve ser copiada para `Generic -> MLB`.

A parte `SmUUID` deve ser copiada para `Generic -> SystemUUID`.

Configure o `Generic -> ROM` tanto para Apple ROM (extraída de um Mac de verdade), o endereço MAC do controlador de rede ou qualquer endereço MAC aleatório. Pode ser só 6 bytes aleatórios. Neste guia, será utilizado `11223300 0000`. Depois da instalação, siga o guia [Corrigindo os iServiços](https://deomkds.github.io/OpenCore-Post-Install/universal/iservices.html) para saber como encontrar o endereço MAC real do seu computador).

**Lembre-se que o objetivo aqui é ter um número de série invalido ou um que seja válido, mas que não esteja em uso. A mensagem de resposta deve ser algo como: "Número de série inválido" ou "Data de compra não validada".**

[Página de Verificar a Cobertura da Apple](https://checkcoverage.apple.com)

**Automatic**: YES

* Gera o PlatformInfo baseado na seção Generic, em vez de usar as seções DataHub, NVRAM e SMBIOS.

:::

### Generic

::: details Informações Mais Detalhadas

* **AdviseWindows**: NO
  * Used for when the EFI partition isn't first on the Windows drive

* **MaxBIOSVersion**: NO
  * Sets BIOS version to Max to avoid firmware updates in Big Sur+, mainly applicable for genuine Macs.

* **ProcessorType**: `0`
  * Set to `0` for automatic type detection, however this value can be overridden if desired. See [AppleSmBios.h](https://github.com/acidanthera/OpenCorePkg/blob/master/Include/Apple/IndustryStandard/AppleSmBios.h) for possible values

* **SpoofVendor**: YES
  * Swaps vendor field for Acidanthera, generally not safe to use Apple as a vendor in most case

* **SystemMemoryStatus**: Auto
  * Sets whether memory is soldered or not in SMBIOS info, purely cosmetic and so we recommend `Auto`

* **UpdateDataHub**: YES
  * Update Data Hub fields

* **UpdateNVRAM**: YES
  * Update NVRAM fields

* **UpdateSMBIOS**: YES
  * Updates SMBIOS fields

* **UpdateSMBIOSMode**: Create
  * Replace the tables with newly allocated EfiReservedMemoryType, use `Custom` on Dell laptops requiring `CustomSMBIOSGuid` quirk
  * Setting to `Custom` with `CustomSMBIOSGuid` quirk enabled can also disable SMBIOS injection into "non-Apple" OSes however we do not endorse this method as it breaks Bootcamp compatibility. Use at your own risk

:::

## UEFI

![UEFI](../images/config/config-universal/aptio-v-uefi.png)

**ConnectDrivers**: YES

* Forces .efi drivers, change to NO will automatically connect added UEFI drivers. This can make booting slightly faster, but not all drivers connect themselves. E.g. certain file system drivers may not load.

### Drivers

Add your .efi drivers here.

Only drivers present here should be:

* HfsPlus.efi
* OpenRuntime.efi

### APFS

Settings related to the APFS driver, leave everything here as default.

### Audio

Related to AudioDxe settings, for us we'll be ignoring(leave as default). This is unrelated to audio support in macOS.

* For further use of AudioDxe and the Audio section, please see the Post Install page: [Add GUI and Boot-chime](https://dortania.github.io/OpenCore-Post-Install/)

### Input

Related to boot.efi keyboard passthrough used for FileVault and Hotkey support, leave everything here as default as we have no use for these quirks. See here for more details: [Security and FileVault](https://dortania.github.io/OpenCore-Post-Install/)

### Output

Relating to OpenCore's visual output,  leave everything here as default as we have no use for these quirks.

### ProtocolOverrides

Mainly relevant for Virtual machines, legacy macs and FileVault users. See here for more details: [Security and FileVault](https://dortania.github.io/OpenCore-Post-Install/)

### Quirks

::: tip Informações
Relating to quirks with the UEFI environment, for us we'll be changing the following:

| Quirk | Enabled | Comment |
| :--- | :--- | :--- |
| UnblockFsConnect | NO | Needed mainly by HP motherboards |

:::

::: details Informações Mais Detalhadas

* **DisableSecurityPolicy**: NO
  * Disables platform security policy in firmware, recommended for buggy firmwares where disabling Secure Boot does not allow 3rd party firmware drivers to load.
  * If running a Microsoft Surface device, recommended to enable this option

* **RequestBootVarRouting**: YES
  * Redirects AptioMemoryFix from `EFI_GLOBAL_VARIABLE_GUID` to `OC_VENDOR_VARIABLE_GUID`. Needed for when firmware tries to delete boot entries and is recommended to be enabled on all systems for correct update installation, Startup Disk control panel functioning, etc.

* **UnblockFsConnect**: NO
  * Some firmware block partition handles by opening them in By Driver mode, which results in File System protocols being unable to install. Mainly relevant for HP systems when no drives are listed

:::

### ReservedMemory

Used for exempting certain memory regions from OSes to use, mainly relevant for Sandy Bridge iGPUs or systems with faulty memory. Use of this quirk is not covered in this guide

## Cleaning up

And now you're ready to save and place it into your EFI under EFI/OC.

For those having booting issues, please make sure to read the [Troubleshooting section](../troubleshooting/troubleshooting.md) first and if your questions are still unanswered we have plenty of resources at your disposal:

* [AMD OS X Discord](https://discord.gg/QuUWg7)
* [r/Hackintosh Subreddit](https://www.reddit.com/r/hackintosh/)

**Sanity check**:

So thanks to the efforts of Ramus, we also have an amazing tool to help verify your config for those who may have missed something:

* [**Sanity Checker**](https://opencore.slowgeek.com)

Note that this tool is neither made nor maintained by Dortania, any and all issues with this site should be sent here: [Sanity Checker Repo](https://github.com/rlerdorf/OCSanity)

## AMD BIOS Settings

* Note: Most of these options may not be present in your firmware, we recommend matching up as closely as possible but don't be too concerned if many of these options are not available in your BIOS

### Disable

* Fast Boot
* Secure Boot
* Serial/COM Port
* Parallel Port
* Compatibility Support Module (CSM)(**Must be off, GPU errors like `gIO` are common when this option in enabled**)

### Enable

* Above 4G decoding(**This must be on, if you can't find the option then add `npci=0x2000` to boot-args. Do not have both this option and npci enabled at the same time**)
* EHCI/XHCI Hand-off
* OS type: Windows 8.1/10 UEFI Mode
* SATA Mode: AHCI

# Now with all this done, head to the [Installation Page](../installation/installation-process.md)
