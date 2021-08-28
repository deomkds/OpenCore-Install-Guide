# Notebook Ivy Bridge

| Suporte | Versão |
| :--- | :--- |
| Suporte Inicial no macOS | OS X 10.7 Lion |

## Ponto de Partida

Criar uma config.plist pode parecer difícil, mas não é. Este guia mostrará como configurar tudo, só é preciso ter tempo. Não se preocupe, você não será deixado no escuro. Isso significa que, caso surjam problemas, verifique as configurações da sua `config.plist` para garantir que está tudo certo. O principal a ser observado com o OpenCore é:

* **Todas as propriedades precisam estar definidas**. O OpenCore não reverte para valores padrão, então **não exclua nenhuma seção, a não ser que seja explicitamente indicado**. Se o guia não menciona uma opção, mantenha os padrões.
* **O arquivo Sample.plist não pode ser usado sem alterações**. É preciso configurá-lo para o seu computador antes de usá-lo.
* **NÂO USE CONFIGURADORES**. Eles raramente respeitam as configurações do OpenCore e alguns, como o do Mackie, adicionam propriedades do Clover e corrompem as plists!

Agora, com isso fora do caminho, um breve lembrete sobre as ferramentas necessárias:

* [ProperTree](https://github.com/corpnewt/ProperTree)
  * Editor universal de arquivos `.plist`.
* [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS)
  * Para gerar os dados da SMBIOS.
* [Sample/config.plist](https://github.com/acidanthera/OpenCorePkg/releases)
  * Veja a seção anterior para obter esses arquivos: [Configuração da config.plist](../config.plist/README.md)

**Leia este guia mais de uma vez antes de configurar o OpenCore. Tenha certeza de tê-lo configurado corretamente. Observe que as imagens deste guia nem sempre estarão 100% atualizadas, então sempre leia o texto que as acompanha. Se nada for mencionado sobre uma opção, mantenha as configurações padrão.**

## ACPI

![ACPI](../images/config/config-laptop.plist/ivy-bridge/acpi.png)

### Add

::: tip Informações

É aqui onde todas as SSDTs do computador são adicionadas. Elas são muito importantes para **iniciar o macOS** e possuem muitos usos, como [mapear as portas USB](https://deomkds.github.io/OpenCore-Post-Install/usb/), [desativar GPUs não suportdas](../extras/spoof.md) e coisas do tipo. Da forma como o OpenCore funciona, **elas são necessárias para iniciar o macOS**. O guia sobre como fazê-las pode ser encontrado aqui: [**Primeiros Passos com a ACPI**](https://deomkds.github.io/Getting-Started-With-ACPI/).

Serão necessárias algumas SSDTs para trazer de volta algumas funcionalidades que o Clover oferecia:

| SSDTs Necessárias | Descrição |
| :--- | :--- |
| **[SSDT-PM](https://github.com/Piker-Alpha/ssdtPRGen.sh)** | Necessário para obter o gerenciamento de energia da CPU apropriado. Será preciso executar o script `ssdtPRGen.sh` do Pike para gerar este arquivo. Será comentado no guia de [Pós-instalação do OpenCore](https://deomkds.github.io/OpenCore-Post-Install/). |
| **[SSDT-EC](https://deomkds.github.io/Getting-Started-With-ACPI/)** | Corrige o controlador integrado. Veja o guia [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para mais detalhes.
| **[SSDT-XOSI](https://github.com/deomkds/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-XOSI.aml)** | Faz com que todas as chamadas _OSI, específicas de Windows, funcionem para o identificador do macOS (Darwin). Pode ajudar a habilitar algumas funções como o XHCI e outras. |
| **[SSDT-PNLF](https://deomkds.github.io/Getting-Started-With-ACPI/)** | Conserta o controle de brilho. Veja o guia [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para obter mais detalhes. Observe que os NUCs da Intel não precisam disso. |
| **[SSDT-IMEI](https://deomkds.github.io/Getting-Started-With-ACPI/)** | Necessário para adicionar o dispositivo IMEI faltante em CPUs Ivy Bridge com placas-mãe série 6. |

Observe que **não é preciso** adicionar a sua `DSDT.aml` aqui, pois ela já está presente no firmware do seu computador. Então, se ela estiver presente nesta seção, remova a sua entrada da `config.plist` e exclua o arquivo `.aml` da pasta `EFI/OC/ACPI`.

Para aqueles que desejam obter mais informações sobre como extrair DSDTs, como criar SSDTs e como compilá-las, veja o guia [**Primeiros Passos com a ACPI**](https://deomkds.github.io/Getting-Started-With-ACPI/). SSDTs compiladas possuem a extensão **.aml** (*assembled*) e serão colocadas na pasta `EFI/OC/ACPI`. Elas também **precisam** estar especificadas na sua `config.plist`, dentro da seção `ACPI -> Add`.

:::

### Delete

::: tip Informações

Esta seção bloqueia o carregamento de certas tabelas da ACPI, o que será muito importante neste guia. O principal motivo para tal é que o XCPM da Apple não suporta muito bem CPUs Ivy Bridge. Isso pode causar *kernel panics* na `AppleIntelCPUPowerManagement.kext` durante a inicialização. Para evitar isso, será necessário criar uma SSDT de Gerenciamento de Energia utilizando as intruções do guia de [Pós-instalação do OpenCore](https://deomkds.github.io/OpenCore-Post-Install/) e bloquear o carregamento das tabelas antigas que estão presentes na ACPI do computador. É uma solução temporária, até que seja possível fazer a SSDT-PM. As tabelas bloqueadas serão desbloqueadas depois.

Bloqueando a tabela CpuPm:

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| All | Boolean | YES |
| Comment | String | Bloaquear CpuPm. |
| Enabled | Boolean | YES |
| OemTableId | Data | 437075506d000000 |
| TableLength | Number | 0 |
| TableSignature | Data | 53534454 |

Bloqueando a tabela Cpu0Ist:

| Key | Type | Value |
| :--- | :--- | :--- |
| All | Boolean | YES |
| Comment | String | Bloquear Cpu0Ist. |
| Enabled | Boolean | YES |
| OemTableId | Data | 4370753049737400 |
| TableLength | Number | 0 |
| TableSignature | Data | 53534454 |

:::

### Patch

::: tip Informações

Esta seção permite modificar partes da ACPI (DSDT, SSDT etc.) de forma dinâmica por meio do OpenCore. Neste caso, será necessário configurar o seguinte:

* Renomear OSI
  * Necessário ao usar a SSDT-XOSI, já que todas as chamadas OSI são redirecionadas para essa SSDT.

| Comment | String | Alterar _OSI para XOSI |
| :--- | :--- | :--- |
| Enabled | Boolean | YES |
| Count | Number | 0 |
| Limit | Number | 0 |
| Find | Data | 5f4f5349 |
| Replace | Data | 584f5349 |

:::

### Quirks

Configurações relacionadas à ACPI. Deixe tudo como padrão, pois este guia não vai usar essas *quirks*.

## Booter

![Booter](../images/config/config-universal/aptio-iv-booter.png)

Esta seção é dedicada a *quirks* relacionadas com a aplicação de patches no `boot.efi` através do `OpenRuntime`, o substituto do `AptioMemoryFix.efi`.

### MmioWhitelist

Esta seção permite definir quais regiões do mapa de memória que são geralmente ignoradas pelo macOS, são boas para o uso. Útil ao ser combinado com `DevirtualiseMmio`.

### Quirks

::: tip Informações

Configurações relacionadas à aplicação de patches no `boot.efi` e a correções de firmware. Mantenha os padrões.

:::

::: details Informação Mais Detalhada

* **AvoidRuntimeDefrag**: YES
  * Corrige serviços UEFI em tempo de execução, como a data, a hora, a NVRAM, o controle de energia etc.
* **EnableSafeModeSlide**: YES
  * Permite que as variáveis `slide` possam ser usadas no modo de segurança.
* **EnableWriteUnprotector**: YES
  * Necessária para remover a proteção de escrita do registrdor CR0.
* **ProvideCustomSlide**: YES
  * Usado para variáveis `slide` calculadas. No entanto, a necessidade desta *quirk* é determinada pela presença da mensagem `OCABC: Only N/256 slide values are usable!` no *log* de depuração. Se a mensagem `OCABC: All slides are usable! You can disable ProvideCustomSlide!` estiver presente no *log*, desative o `ProvideCustomSlide`.
* **SetupVirtualMap**: YES
  * Corrige as chamadas de `SetVirtualAddresses` para endereços virtuais. Exigido em placas Gigabyte para resolver *kernel panics* precoces.

:::

## DeviceProperties

![DeviceProperties](../images/config/config-laptop.plist/ivy-bridge/DeviceProperties.png)

### Add

Configura as propriedades de dispositivo a partir de um mapa.

::: tip PciRoot(0x0)/Pci(0x2,0x0)

Esta seção é configurada por meio do [Guia de Patches de Framebuffer](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) (em inglês) da WhateverGreen e é utilizada para configurar propriedades importantes da GPU integrada.

Ao configurar a GPU integrada, a tabela abaixo deve ajudar a encontrar os valores corretos a serem utilizados. Eis uma explicação sobre alguns deles:

* **AAPL,ig-platform-id**
  * Usado internamente para configurar a GPU integrada.
* **Type**
  * Indica se a entrada é recomendada para notebooks (ex.: com monitor integrado) ou para  NUCs da Intel (ex.: sem monitor integrado).

Siga esses passos ao configurar as propriedades da GPU integrada. Siga tambeḿ as notas de configuração presentes abaixo da tabela caso elas informem algo diferente:

1. Ao criar a primeira `config.plist`, configure somente a propriedade `AAPL,ig-platform-id`. É o suficiente para iniciar o instalador.
2. Caso o macOS inicie sem aceleração gráfica (7MB de VRAM e fundo opaco na Dock), então será necessário testar valores diferentes para a `AAPL,ig-platform-id`, adicionar patches de memória reservada (*stolenmem*) ou até mesmo adicionar a propriedade `device-id`.

| AAPL,ig-platform-id | Tipo | Observação |
| ------------------- | ---- | ------- |
| **03006601** | Notebook | Use em monitores cuja resolução seja **1366x768** ou menor. |
| **04006601** | Notebook | Use em monitores cuja resolução seja **1600x900** ou maior. Veja abaixo os patches adicionais. |
| **09006601** | Notebook | Use em dispositivos cujo monitor seja conectado por `eDP` em vez de `LVDS`, mas teste os valores **03006601** e **04006601** antes de tentar esse valor. |
| **0b006601** | NUC | Use nos NUCs da Intel. |

#### Observações Sobre a Configuração

* A VGA *não* é suportada, a não ser que seja ligada por meio de um adaptador interno de VGA para DP. Aparentemente, pouquíssimos dispositivos terão essa configuração, então é questão de sorte.

* Caso esteja utilizando `04006601` como `ig-platform-id`, talvez seja necessário adicionar os seguintes parâmetros para corrigir as saídas externas (caso contrário, pode haver somente uma saída. Créditos ao Rehabman por isso).

| Chave | Tipo | Valor | Explicação |
| :--- | :--- | :--- | :--- |
| `framebuffer-patch-enable` | Number | `1`                                                          | *ativa os patches semânticos em princípio* (retirado do manual da WahteverGreen) |
| `framebuffer-memorycount`  | Number | `2`                                                          | Correspondendo o FBMemoryCount ao conector em `03006601` (1 em `04` vs 2 em `03`) |
| `framebuffer-pipecount`    | Number | `2`                                                          | Correspondendo o PipeCount ao conector em `03006601` (3 em `04` vs 2 em `03`) |
| `framebuffer-portcount`    | Number | `4`                                                          | Correspondendo o PortCount ao conector em `03006601` (1 em `04` vs 4 em `03`) |
| `framebuffer-stolenmem`    | Data   | `00000004`                                                   | Correspondendo a quantidade de memória reservada (STOLEN) para 64MB (0x04000000 de hex para base 10 em Bytes) ao conector em `03006601`<br />Veja [esta página](https://www.tonymacx86.com/threads/guide-alternative-to-the-minstolensize-patch-with-32mb-dvmt-prealloc.221506/) (em inglês) para obter mais informações. |
| `framebuffer-con1-enable`  | Number | `1`                                                          | Isso ativará a aplicação de patches no *connector 1* do driver, que é o segundo conector depois de con0, que, por sua vez, é o conector eDP/LVDS. |
| `framebuffer-con1-alldata` | Data   | `02050000 00040000 07040000 03040000 00040000 81000000 04060000 00040000 81000000` | Ao usar o `all data` com um conector, ou fornece-se toda a informação daquele conector (*port-bused-type-flag*) ou para aquela porta e para todas as que a seguem, como neste caso.<br />Aqui, as portas em `04` estão limitadas a `1`:<br />`05030000 02000000 30020000` (que corresponde à porta 5, LVDS)<br />No entanto, na `03` existem 3 portas extras:<br />`05030000 02000000 30000000` (LVDS, con0, como na `04`)<br/>`02050000 00040000 07040000` (DP, con1)<br/>`03040000 00040000 81000000` (DP, con2)<br/>`04060000 00040000 81000000` (DP, con3)<br />Por ter alterado o número de PortCount para `4` em uma plataforma que só possui 1 porta, significa que é preciso definir as 3 outras, começando no con1 e indo até o final).<br /> |

:::

::: tip PciRoot(0x0)/Pci(0x16,0x0)

**Híbridos Sandy/IvyBridge:**

Alguns notebooks dessa era vieram com um chipset misturado, usando CPUs Ivy Bridge em chipsets Sandy Bridge. Isso cria problemas no macOS, já que ele espera encontrar um certo ID de [dispositivo IMEI](https://en.wikipedia.org/wiki/Intel_Management_Engine) (em inglês). Quando ele não encontra esse ID, o sistema trava na inicialização porque os drivers de GPUs integradas da Apple exigem a presença de um dispositivo IMEI. Para corrigir isso, será necessário falsificar o ID do dispositivo IMEI nessas configurações.

* Para saber se este problema afeta você, verifique se o modelo da CPU é um Intel Core ix-3xxx e se o chipset é um Hx6x (por exemplo, um notebook com HM65 ou HM67 que utilize uma CPU Core i3-3110M) usando ferramentas como o AIDA64 ou o HWiNFO.
* Na `config.plist`, adicione um novo dispositivo PciRoot chamado `PciRoot(0x0)/Pci(0x16,0x0)`

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| device-id | Data | 3A1E0000 |

:::

::: tip PciRoot(0x0)/Pci(0x1b,0x0)

`layout-id`

* Aplica a injeção de áudio da AppleALC. Será necessário fazer sua própria pesquisa para descobrir qual codec sua placa-mãe utiliza e combiná-la com um leiaute da AppleALC. [Codecs Suportados pela AppleALC](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs) (em inglês).
* Exclua essa entrada completamente, já que ela não será utilizada por este guia neste momento.

Em vez disso, será utilizado o argumento de inicialização (*boot-arg*) `alcid=xxx` para conseguir o mesmo efeito. O `alcid` sobrescreverá todos os outros layout-IDs presentes. Mais informações sobre isso estão disponíveis no guia de [Pós-instalação do OpenCore](https://deomkds.github.io/OpenCore-Post-Install/).

:::

### Delete

Remove as propriedades de dispositivos do mapa. Pode ser ignorado.

## Kernel

![Kernel](../images/config/config-universal/kernel.png)

### Add

É aqui onde são especificadas as *kexts* que serão carregadas, a ordem desse carregamento e quais arquiteturas cada *kext* suporta. Por padrão, recomenda-se manter o que o ProperTree criou, no entanto, para computadores com CPUs de 32 bits, veja a seguir.

::: details Informação Mais Detalhada

O principal a se observar é:

* Ordem de Carregamento
  * Lembre-se que quaisquer *plugins* devem carregar **depois** de suas dependências.
  * Isso significa que *kexts* como a Lilu **precisam** vir antes da VirtualSMC, AppleALC, WhateverGreen etc.

Lembre-se que usuários do [ProperTree](https://github.com/corpnewt/ProperTree) podem pressionar **Cmd/Ctrl + Shift + R** para adicionar todas as suas *kexts* na ordem correta sem precisar digitar cada uma manualmente.

* **Arch**
  * Arquiteturas suportadas pela *kext*.
  * Atualmente, os valores suportados são `Any`, `i386` (32 bits), e `x86_64` (64 bits).
* **BundlePath**
  * Nome da *kext*.
  * Ex: `Lilu.kext`.
* **Enabled**
  * Auto explicativo. Ativa ou desativa a *kext*.
* **ExecutablePath**
  * O caminho para o verdadeiro executável fica escondido dentro da *kext*. É possível encontrá-lo clicando com o botão direito e selecionando a opção `Mostrar Conteúdo do Pacote`. Geralmente, estará em `Contents/MacOS/Kext`, mas algumas *kexts* possuem outras *kexts* escondidas na pasta `Plugin`. Observe que *kexts* compostas somente por um arquivo `.plist` não precisam ter este campo preenchido.
  * Ex: `Contents/MacOS/Lilu`.
* **MinKernel**
  * A versão mínima do *kernel* na qual a *kext* pode ser injetada. Consulte a tabela abaixo para os valores permitidos.
  * Ex. `12.00.00` representa o OS X 10.8 Mountain Lion.
* **MaxKernel**
  * A versão máxima do *kernel* na qual a *kext* pode ser injetada. Consulte a tabela abaixo para os valores permitidos.
  * Ex. `11.99.99` representa o OS X 10.7 Lion.
* **PlistPath**
  * Caminho para o arquivo `info.plist` escondido dentro da *kext*.
  * Ex: `Contents/Info.plist`.
  
::: details Tabela de Suporte de *Kernel*

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

Necessário para "falsificar" CPUs não suportadas como Pentiums e Celerons.

* **CpuidMask**: deixe vazio.
* **CpuidData**: deixe vazio.

### Force

Usado para carregar *kexts* direto do volume do sistema. Relevante somente para sistemas operacionais mais antigos nos quais algumas *kexts* não estavam presentes no *cache* (ex.: `IONetworkingFamily` no Mac OS X 10.6 Snow Leopard).

Pode ser ignorado.

### Block

Impede que certas *kexts* sejam carregadas. Irrelevante no momento.

### Patch

Aplica patches tanto no *kernel* quanto nas *kexts*.

### Quirks

::: tip Informações

Configurações relacionadas ao *kernel*. Ative somente as seguintes opções:

| Quirk | Ativada | Observação |
| :--- | :--- | :--- |
| AppleCpuPmCfgLock | YES | Desnecessário caso o `CFG-Lock` esteja desabilitado na BIOS. |
| DisableIOMapper | YES | Desnecessário caso o `VT-D` esteja desabilitado na BIOS. |
| LapicKernelPanic | NO | Computadores HP necessitam dessa *quirk*. |
| PanicNoKextDump | YES | |
| PowerTimeoutKernelPanic | YES | |
| XhciPortLimit | YES | |

:::

::: details More in-depth Info

* **AppleCpuPmCfgLock**: YES
  * Necessário somente quando a trava de CFG não puder ser desativada na BIOS.
  * Aplicável somente a computadores com CPUs Ivy Bridge ou mais antigas.
    * Observação: computadores com CPUs Broadwell ou mais antigas necessitam disso ao executar o OS X 10.10 Yosemite ou mais antigo.
* **AppleXcpmCfgLock**: NO
  * Necessário somente quando a trava de CFG não puder ser desativada na BIOS.
  * Aplicável somente para computadores com CPUs Haswell ou mais novas.
    * Observação: computadores com CPUs Ivy Bridge-E também precisam, já que suportam XCPM.
* **CustomSMBIOSGuid**: NO
  * Aplica patches de GUID quando `UpdateSMBIOSMode` está configurado para `Custom`. Mais relevante para notebooks Dell.
  * Ativar esta *quirk* em conjunto com `PlatformInfo -> UpdateSMBIOSMode -> Custom` desativará a injeção de SMBIOS em sistemas operacionais que não sejam da Apple. Este guia não endossa este método, pois quebra a compatibilidade com o Bootcamp. Use por sua conta e risco.
* **DisableIoMapper**: YES
  * Necessária para contornar o VT-D caso seja impossível desabilitar a opção na BIOS ou ele seja necessário em outros sistemas operacionais. Uma alternativa muito melhor ao `dart=0`, pois permite manter o SIP ligado no macOS 10.15 Catalina.
* **DisableLinkeditJettison**: YES
  * Permite que a Lilu e outras *kexts* tenham uma performance melhor sem o `keepsyms=1`.
* **DisableRtcChecksum**: NO
  * Previne que a AppleRTC escreva na soma de verificação primária (0x58-0x59). Exigido para usuários que, ao reiniciar/desligar o macOS, experienciam uma redefinição de BIOS ou são enviados para o modo de segurança.
* **ExtendBTFeatureFlags** NO
  * Útil para aqueles que tiverem problemas com o Continuidade ao usar placas Wi-Fi que não sejam da Apple ou da Fenvi.
* **LapicKernelPanic**: NO
  * Desativa um *kernel panic* no interruptor *AP core lapic*. Geralmente é necessário em computadores HP. Equivalente ao `Kernel LAPIC` do Clover.
* **LegacyCommpage**: NO
  * Resolve a necessidade de instruções SSSE3 em CPUs de 64 bits no macOS. Relevante principalmente para CPUs Pentium 4 de 64 bits, como Prescott.
* **PanicNoKextDump**: YES
  * Permite ler os *logs* de *kernel panics* quando ocorrem.
* **PowerTimeoutKernelPanic**: YES
  * Ajuda a corrigir *kernel panics* relacionadas a alterações de energia com os drivers da Apple no macOS 10.15 Catalina. Mais perceptível com o áudio digital.
* **SetApfsTrimTimeout**: `-1`
  * Configura o intervalo de tempo do TRIM (em microsegundos) em SSDs com sistema de arquivos APFS. Aplicável somente para o macOS 10.14 Mojave ou mais novos que estejam utilizando SSDs problemáticos.
* **XhciPortLimit**: YES
  * Isto é, na verdade, o patch que corrige o limite de 15 portas USB. Não dependa dele, pois não é uma solução garantida para corrigir problemas de USB. Por favor, prefira criar um [mapa das portas USB](https://deomkds.github.io/OpenCore-Post-Install/usb/) sempre que possível.

O motivo para tal é que o UsbInjectAll reimplementa uma funcionalidade integrada do macOS sem ter os ajustes apropriados. É muito mais limpo simplesmente descrever suas portas em uma *kext* com só um arquivo `.plist` dentro, o que não desperdiça memória em tempo de execução e coisas do tipo.

:::

### Scheme

Configurações relacionadas com a inicialização de sistemas operacionais antigos, como o Mac OS X 10.4 Tiger, 10.5 Leopard e 10.6 Snow Leopard. A maioria dos leitores pode pular essa parte. No entanto, aqueles que planejam usar sistemas antigos, continuem lendo.

::: details Informação Mais Detalhada

* **FuzzyMatch**: True
  * Usado para ingorar somas de verificação no *kernelcache*, optando em vez disso pelo último *cache* disponível. Pode ajudar a melhorar a performance da inicialização em muitos computadores com Mac OS X 10.6 Snow Leopard.
* **KernelArch**: x86_64
  * Configura o tipo de arquitetura do *kernel*. As opções possíveis são: `Auto`, `i386` (32 bits) e `x86_64` (64 bits).
  * Se estiver utilizando sistemas operacionais mais antigos que necessitam de um *kernel* 32 bits, como o Mac OS X 10.4 Tiger e 10.5 Leopard, recomenda-se configurar essa opção para `Auto` e deixar que o macOS decida a melhor opção baseado na SMBIOS. Veja a tabela abaixo com os valores suportados:
    * Mac OS X 10.4 Tiger e 10.5 Leopard: `x86_64`, `i386` ou `i386-user32`.
      * `i386-user32` se refere ao espaço de usuário em 32 bits. Então, CPUs de 32 bits precisam usar essa opção (ou CPUs que não possuem as instruções SSSE3).
      * `x86_64` Ainda executará o espaço do *kernel* em 32 bits. No entanto, garantirá que o espaço de usuário seja 64 bits nessas versões do Mac OS X.
    * Mac OS X 10.6 Snow Leopard: `i386`, `i386-user32` ou `x86_64`.
    * OS X 10.7 Lion: `i386` ou `x86_64`.
    * OS X 10.8 Mountain Lion ou mais novo: `x86_64`.
* **KernelCache**: Auto
  * Configura o tipo de *cache* do *kernel*. Útil principalmente para depuração, então recomenda-se manter configurado como `Auto` para obter o melhor suporte.

:::

## Misc

![Misc](../images/config/config-universal/misc.png)

### Boot

Configurações da tela de inicialização. Mantenha todos os padrões como estão.

### Debug

::: tip Informações

Útil para depurar os problemas de inicialização do OpenCore (tudo será alterado, *exceto* `DisplayDelay`):

| Quirk | Ativada |
| :--- | :--- |
| AppleDebug | YES |
| ApplePanic | YES |
| DisableWatchDog | YES |
| Target | 67 |

:::

::: details Informação Mais Detalhada

* **AppleDebug**: YES
  * Ativa o *log* do `boot.efi`. Útil para depuração. Observe que isso só é suportado no macOS 10.15.4 Catalina ou superior.
* **ApplePanic**: YES
  * Tenta salvar os *logs* de *kernel panics* diretamente no disco.
* **DisableWatchDog**: YES
  * Desativa o *watchdog* do UEFI. Pode ajudar com problemas de inicialização precoces.
* **DisplayLevel**: `2147483650`
  * Exibe ainda mais informações de depuração. Necessita da versão de depuração do OpenCore.
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

| Quirk | Ativada | Observação |
| :--- | :--- | :--- |
| AllowNvramReset | YES | |
| AllowSetDefault | YES | |
| BlacklistAppleUpdate | YES | |
| ScanPolicy | 0 | |
| SecureBootModel | Default |  Essa opção é literalmente uma palavra e diferencia maiúsculas de minúsculas. Mude para `Disabled` se precisar desativar a Inicialização Segura (ex.: se precisar usar os Web Drivers da Nvidia). |
| Vault | Optional | Esta opção é literalmente uma palavra e omiti-la não é permitido. Você vai se arrepender se não configurá-la para `Optional`. Atente-se para o fato de que a opção diferencia maiúsculas de minúsculas. |

:::

::: details Informação Mais Detalhada

* **AllowNvramReset**: YES
  * Permite redefinir a NVRAM tanto por meio do seletor de inicialização e ao pressionar `Cmd+Opt+P+R`.
* **AllowSetDefault**: YES
  * Permite apertar `CTRL+Enter` e `CTRL+Index` para configurar o dispositivo padrão de inicialização no seletor.
* **ApECID**: 0
  * Usado para configurar identificadores de inicialização segura personalizados. Atualmente, essa *quirk* não é confiável devido a um *bug* no instalador do macOS. Recomenda-se fortemente manter essa opção configurada para o valor padrão.
* **AuthRestart**: NO
  * Ativa a reinicialização autenticada para o FileVault 2, de forma que a senha não seja exigida ao reiniciar o computador. Pode ser considerada um risco à segurança, portanto é opcional.
* **BlacklistAppleUpdate**: YES
  * Usado para bloquear atualizações de firmware. Age como um nível extra de proteção, já que o macOS 11 Big Sur não mais utiliza a variável `run-efi-updater`.
* **DmgLoading**: Signed
  * Garante que o OpenCore só carregará DMGs que estejam assinadas digitalmente.
* **ExposeSensitiveData**: `6`
  * Exibe mais informações de depuração e necessita da versão de depuração do OpenCore.
* **Vault**: `Optional`
  * Não será necessário lidar com cofres, então ignore esta opção. **Não será possível iniciar se esta opção estiver configurada para Secure.**
  * Isso é literalmente uma palavra e sua omissão não é permitida. Você vai se arrepender se não configurá-la para `Optional`. Atente-se para o fato de que a opção diferencia maiúsculas de minúsculas.
* **ScanPolicy**: `0`
  * Configurar para `0` permite ver todas as unidades disponíveis. Veja a seção [Segurança](https://deomkds.github.io/OpenCore-Post-Install/universal/security.html) para obter mais detalhes. **O OpenCore não iniciará pendrives se esta opção estiver configurada para Default**.
* **SecureBootModel**: Default
  * Ativa a funcionalidade de Inicialização Segura da Apple no macOS. Consulte a seção [Segurança](https://deomkds.github.io/OpenCore-Post-Install/universal/security.html) para mais detalhes.
  * Observação: Usuários podem notar que atualizar o OpenCore em um sistema operacional já instalado pode resultar em falhas precoces de inicialização. Para resolver isso, veja: [Parado em OCB: LoadImage failed - Security Violation](/troubleshooting/extended/kernel-issues.md#stuck-on-ocb-loadimage-failed-security-violation) (em inglês).

:::

### Tools

Usado para executar as ferramentas de depuração do OpenCore, como o `shell`. A função de *snapshot* do ProperTree adicionará as ferramentas necessárias automaticamente.

### Entries

Usado para especificar caminhos de inicialização irregulares que não podem ser encontrados naturalmente pelo OpenCore.

Não será abordado aqui. Veja o item 8.6 do PDF de configuração para mais informações: [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) (em inglês).

## NVRAM

![NVRAM](../images/config/config-universal/nvram.png)

### Add

::: tip 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14

Usado para o escalonamento da interface de usuário do OpenCore. O padrão servirá para os propósitos deste guia. Veja a seção abaixo para obter informações mais detalhadas.

:::

::: details Informação Mais Detalhada

Caminho do inicializador. Usado principalmente para o escalonamento da interface gráfica.

* **UIScale**:
  * `01`: Resolução padrão.
  * `02`: HiDPI (geralmente necessário para que o FileVault funcione corretamente em telas menores)

* **DefaultBackgroundColor**: Cor de fundo usada pelo `boot.efi`.
  * `00000000`: Syrah Black (preto).
  * `BFBFBF00`: Light Gray (cinza).

:::

::: tip 4D1FDA02-38C7-4A6A-9CC6-4BCCA8B30102

GUID de NVRAM do OpenCore. Relevante principalmente para usuários da RTCMemoryFixup.

:::

::: details Informação Mais Detalhada

* **rtc-blacklist**: <>
  * Para ser usado em conjunto com a RTCMemoryFixup. Acesse esta página para obter mais detalhes: [Corrigindo problemas de escrita do RTC](https://deomkds.github.io/OpenCore-Post-Install/misc/rtc.html#finding-our-bad-rtc-region) (em inglês).
  * A maioria dos usuários pode ignorar esta seção.

:::

::: tip 7C436110-AB2A-4BBB-A880-FE41995C9F82

Máscara de bits da Proteção da Integridade do Sistema (SIP).

* **Argumentos de inicialização (*boot-args*) de uso geral**:

| boot-args | Descrição |
| :--- | :--- |
| **-v** | Ativa o modo *verbose*, que exibe todos os textos ocultos que rolam na tela durante a inicialização, em vez da maçã e da barra de progresso. É de grande valia para qualquer *hackintosher*, já que fornece uma espiada por trás do processo de inicialização e pode ajudar a identificar problemas, encontrar *kexts* defeituosas e outras coisas que impeçam o macOS de iniciar completamente. |
| **debug=0x100** | Isso desativa o *watchdog* do macOS, o que ajuda a prevenir uma reinicialização após um *kernel panic*. Dessa forma, é possível (talvez) obter algumas informações importantes e seguir as migalhas para resolver um problema. |
| **keepsyms=1** | É uma configuração companheira do `debug=0x100`, que diz ao sistema operacional para também exibir os símbolos na tela durante um *kernel panic*. Pode oferecer uma compreensão ainda maior sobre o que pode estar causando o *kernel panic* em primeiro lugar. |
| **alcid=1** | Usado para configurar o *layout-id* para a AppleALC. Veja a lista de [codecs suportados](https://github.com/acidanthera/applealc/wiki/supported-codecs) (em inglês) para descobrir qual layout é o mais apropriado para o seu computador. Mais informações são fornecidas no guia de [Pós-instalação do OpenCore](https://deomkds.github.io/OpenCore-Post-Install/) |

* **Argumentos de inicialização (boot-args) específicas de GPUs**:

| boot-args | Descrição |
| :--- | :--- |
| **-wegnoegpu** | Usado para desabilitar todas as outras GPUs que não sejam a integrada da Intel. Útil para aqueles que queiram executar versões mais novas do macOS nos quais a GPU dedicada não seja suportada. |

* **csr-active-config**: `00000000`
  * Confgigurações da Proteção da Integridade do Sistema (SIP). É geralmente recomendado alterar essa opção por meio da partição de Recuperação, usando o utilitário de linha de comando `csrutil`.
  * Por padrão, o `csr-active-config` é configurado para `00000000`, o que ativa a Proteção da Integridade do Sistema. É possível escolher uma variedade de valores diferentes, mas de maneira geral, recomenda-se mantê-lo ligado para melhores práticas de segurança. Mais informações podem ser encontradas na página de solução de problemas: [Desativando o SIP](../troubleshooting/extended/post-issues.md#desativando-o-sip).

* **run-efi-updater**: `No`
  * Isso é usado para prevenir que os pacotes de atualização de firmware da Apple sejam instalados e quebrem a ordem de inicialização. É importante, pois essas atualizações de firmware (criadas para os Macs) não funcionam em *hackintoshes*.

* **prev-lang:kbd**: <>
  * Necessário para teclados não latinos. Use o formato `lang-COUNTRY:keyboard`. Recomenda-se manter vazio, mas é possível especificá-lo caso seja necessário. **O padrão na Sample.plist é russo.**):
  * Estadunidense: `en-US:0`(`656e2d55533a30` em hexadecimal).
  * Uma lista completa pode ser encontrada em [AppleKeyboardLayouts.txt](https://github.com/acidanthera/OpenCorePkg/blob/master/Utilities/AppleKeyboardLayouts/AppleKeyboardLayouts.txt) (em inglês).
  * Dica: a opção `prev-lang:kbd` pode ser alterada para usar uma cadeia de caracteres (*string*), de forma que digitar `en-US:0` diretamente também será aceito, removendo a necessidade de converter o valor para hexadecimal.

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| prev-lang:kbd | String | en-US:0 |

:::

### Delete

Reescreve as variáveis NVRAM na marra. Observe que `Add` **não sobrescreve** valores que já estejam presentes na NVRAM. Então, valores como os `boot-args` devem ser deixados como estão.

::: details Informação Mais Detalhada

* **LegacyEnable**: NO
  * Permite que a NVRAM seja armazenada no arquivo `nvram.plist`. Necessário em computadores que não possuem NVRAM nativa.

* **LegacyOverwrite**: NO
  * Permite sobrescrever variáveis de firmware a partir do arquivo `nvram.plist`. Necessário somente em computadores que não possuem NVRAM nativa.

* **LegacySchema**
  * Usado para atribuir variáveis NVRAM. Usado com o `LegacyEnable` configurado para YES.

* **WriteFlash**: YES
  * Ativa a função de escrever em memória *flash* para todas as variáveis adicionadas.

:::

## PlatformInfo

![PlatformInfo](../images/config/config-laptop.plist/ivy-bridge/smbios.png)

::: tip Informações

Para configurar a informação da SMBIOS, será utilizado o aplicativo [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS), desenvolvido por CorpNewt.

Neste exemplo de Ivy Bridge, a SMBIOS do MacBookPro10,2 será utilizada. Isso é intencional, por questões de compatibilidade. É mais ou menos assim:

| SMBIOS | Tipo de CPU | Tipo de GPU | Tamanho do Monitor |
| :--- | :--- | :--- | :--- |
| MacBookAir5,1 | Dual Core 17w | GPU integrada: HD 4000 | 11" |
| MacBookAir5,2 | Dual Core 17w | GPU integrada: HD 4000 | 13" |
| MacBookPro10,1 | Quad Core 45w | GPU integrada: HD 4000 + GPU dedicada: GT650M | 15" |
| MacBookPro10,2 | Dual Core 35w (Alto Desempenho) | GPU integrada: HD 4000 | 13" |
| MacMini6,1 | NUC Dual Core | GPU integrada: HD 4000 | N/A |
| MacMini6,2 | NUC Quad Core | GPU integrada: HD 4000 | N/A |

**Observação**: As seguintes SMBIOS são suportadas somente até o macOS 10.15 Catalina. Para os casos em que seja necessário usar o macOS 11 Big Sur, veja as instruções a seguir:

::: details Tabela de SMBIOS para o macOS 11 Big Sur

Observe que usar uma das SMBIOS abaixo no macOS 10.15 Catalina ou mais antigo não é recomendado, já que coisas como o gerenciamento de energia podem parar de funcionar.

| SMBIOS | Tipo de CPU | Tamanho do Monitor |
| :--- | :--- | :--- |
| MacBookAir6,1 | Dual Core 15w | 11" |
| MacBookAir6,2 | Dual Core 15w | 13" |
| MacBookPro11,1 | Dual Core 28w | 13" |
| MacBookPro11,2 | Quad Core 45w | 15" |
| MacBookPro11,3 | Quad Core 45w | 15" |
| MacBookPro11,4 | Quad Core 45w | 15" |
| MacBookPro11,5 | Quad Core 45w | 15" |
| MacMini7,1 | NUC | N/A |

:::

Execute o GenSMBIOS, escolha a opção 1 para baixar o MacSerial e a opção 3 para selecionar a SMBIOS. Isso mostrará uma saída similar à seguinte:

```sh
  #######################################################
 #               MacBookPro10,2 SMBIOS Info            #
#######################################################

Type:         MacBookPro10,2
Serial:       C02KCYZLDNCW
Board Serial: C02309301QXF2FRJC
SmUUID:       A154B586-874B-4E57-A1FF-9D6E503E4580
```

A parte `Type` deve ser copiada para `Generic -> SystemProductName`.

A parte `Serial` deve ser copiada para `Generic -> SystemSerialNumber`.

A parte `Board Serial` deve ser copiada para `Generic -> MLB`.

A parte `SmUUID` deve ser copiada para `Generic -> SystemUUID`.

Configure o `Generic -> ROM` tanto para uma ROM da Apple (extraída de um Mac de verdade), o endereço MAC do controlador de rede ou qualquer endereço MAC aleatório. Pode ser só 6 bytes aleatórios. Neste guia, será utilizado `11223300 0000`. Depois da instalação, siga o guia [Corrigindo os iServiços](https://deomkds.github.io/OpenCore-Post-Install/universal/iservices.html) para saber como encontrar o endereço MAC real do seu computador.

**Lembre-se que o objetivo aqui é ter um número de série inválido ou um que seja válido, mas que não esteja em uso. A mensagem de resposta deve ser algo como: "Número de série inválido" ou "Data de compra não validada".**

[Página para Verificar a Cobertura da Apple](https://checkcoverage.apple.com)

**Automatic**: YES

* Gera o `PlatformInfo` baseado na seção `Generic`, em vez de usar as seções `DataHub`, `NVRAM` e `SMBIOS`.

:::

### Generic

::: details Informação Mais Detalhada

* **AdviseFeatures**: NO
  * Usado para quando a partição EFI não é a primeira na unidade do Windows.

* **MaxBIOSVersion**: NO
  * Configura a versão da BIOS para o máximo, evitando assim que atualizações de firmware no macOS 11 Big Sur e superior sejam baixadas. Mais relevante principalmente para Macs originais.

* **ProcessorType**: `0`
  * Configure como `0` para ativar a detecção automática de tipo. Porém, este valor pode ser substituído, se necessário. Veja o arquivo [AppleSmBios.h](https://github.com/acidanthera/OpenCorePkg/blob/master/Include/Apple/IndustryStandard/AppleSmBios.h) (em inglês) para os valores possívels.

* **SpoofVendor**: YES
  * Altera a informação de fabricante para `Acidanthera`. Geralmente, não é seguro usar `Apple` como fabricante na maioria dos casos.

* **SystemMemoryStatus**: Auto
  * Define, nas informações da SMBIOS, se a memória é soldada ou não. Puramente cosmético, por isso recomenda-se deixar como `Auto`.

* **UpdateDataHub**: YES
  * Atualiza os campos de Data Hub.

* **UpdateNVRAM**: YES
  * Atualiza os campos da NVRAM.

* **UpdateSMBIOS**: YES
  * Atualiza os campos da SMBIOS.

* **UpdateSMBIOSMode**: Create
  * Substitui as tabelas com EfiReservedMemoryType recentemente alocado. Use `Custom` em notebooks  Dell que exigem o uso da *quirk* `CustomSMBIOSGuid`.
  * Configurar para `Custom` com a *quirk* `CustomSMBIOSGuid` ativada pode também desativar a injeção de SMBIOS em sistemas operacionais que não são da Apple. No entanto, este método não é recomendado por quebrar a compatibilidade com o Bootcamp. Use por sua conta e risco.

:::

## UEFI

![UEFI](../images/config/config-universal/aptio-iv-uefi-laptop.png)

* **ConnectDrivers**: YES
  * Força a conexão dos drivers `.efi`. Mudar para `NO` pode acelerar um pouco a inicialização, mas exigirá que os drivers se conectem por conta própria. Acontece que nem todos fazem isso, como é o caso de alguns drivers de sistema de arquivos, que podem não carregar caso esta opção esteja configurada para `NO`.

### Drivers

Adicione os drivers `.efi` aqui.

Para este guia, os únicos drivers que devem estar presentes nessa seção são:

* `HfsPlus.efi`
* `OpenRuntime.efi`

### APFS

Configurações relacionadas ao driver de APFS. Mantenha as opções padrão.

### Audio

Configurações relacionadas ao `AudioDxe`. Esta seção será ignorada neste guia. Mantenha todas as opções padrão. Esta seção não tem nada a ver com o suporte de áudio no macOS.

* Para outros usos do `AudioDxe` e da seção `Audio`, acesse o guia de [Pós-instalação do OpenCore](https://deomkds.github.io/OpenCore-Post-Install/).

### Input

Configurações relacionadas à transmissão do teclado para o `boot.efi`. É usado para oferecer suporte ao FileVault e a teclas de atalho. Mantenha todas as opções padrão pois essas *quirks* não serão utilizados no momento. Obtenha mais detalhes aqui: [Segurança e FileVault](https://deomkds.github.io/OpenCore-Post-Install/universal/security.html).

### Output

Configurações relacionadas com a exibição visual do OpenCore. Mantenha todas as opções no padrão pois essas *quirks* não serão utilizadas no momento.

### ProtocolOverrides

Relevante principalmente em máquinas virtuais, Macs antigos e para usuários do FileVault. Para mais detalhes, acesse: [Segurança e FileVault](https://deomkds.github.io/OpenCore-Post-Install/universal/security.html).

### Quirks

::: tip Informações

Configurações das *quirks* relacionados ao ambiente UEFI. Altere as seguintes opções:

| Quirk | Ativada | Observação |
| :--- | :--- | :--- |
| IgnoreInvalidFlexRatio | YES | |
| ReleaseUsbOwnership | YES | |
| UnblockFsConnect | NO | Necessária principalmente em placas-mãe HP. |

:::

::: details Informação Mais Detalhada

* **IgnoreInvalidFlexRatio**: YES
  * Correção para quando o MSR\_FLEX\_RATIO (0x194) não pode ser desabilitado na BIOS. Exigido para todos os computadores com CPUs anteriores ao Skylake.
* **ReleaseUsbOwnership**: YES
  * Libera o controlador USB do driver de firmware. Necessário quando o firmware não suporta o *handoff* de EHCI/XHCI. A maioria dos notebooks possuem firmwares horríveis, o que torna essa opção necessária.
* **DisableSecurityPolicy**: NO
  * Desativa a política de segurança de plataforma no firmware. Recomendado para firmwares problemáticos que impeçam o carregamento de drivers de firmware de terceiros ao desligar a Inicialização Segura.
  * Recomenda-se ativar esta opção em dispositivos Microsoft Surface.

* **RequestBootVarRouting**: YES
  * Redireciona o `AptioMemoryFix` de `EFI_GLOBAL_VARIABLE_GUID` para `OC_VENDOR_VARIABLE_GUID`. É necessário quando o firmware tenta excluir as opções de *boot*. Recomenda-se deixar ativado em todos os computadores para garantir o funcionamento correto ao instalar atualizações, do painel de controle `Disco de Inicialização` e outras coisas.

* **UnblockFsConnect**: NO
  * Alguns firmwares bloqueiam o intrumental de partições, abrindo-as no modo `By Driver`, o que resulta na impossibilidade de instalação dos protocolos de sistema de arquivo. É relevante principalmente em computadores HP, quando nenhum driver for listado.

:::

### ReservedMemory

Usado para impedir que os sistemas operacionais usem certas regiões da memória. É relevante principalmente para as GPUs integradas das CPUs Sandy Bridge ou em computadores com falhas de memória. O uso desta *quirk* não será coberto neste guia.

## Limpando

Agora tudo está pronto para ser salvo e copiado para a partição `EFI`, na pasta `EFI/OC`.

Para aqueles que estiverem tendo problemas de inicialização, é recomendado ler a seção de [Solução de Problemas](../troubleshooting/troubleshooting.md) primeiro. Se ainda restarem dúvidas, é possível consultar algum dos recursos disponíveis abaixo:

* [Subreddit r/Hackintosh](https://www.reddit.com/r/hackintosh/) (em inglês).
* [Discord do r/Hackintosh](https://discord.gg/2QYd7ZT) (em inglês).

### Lembretes Finais

**Usuários de Notebooks HP**:

* `Kernel -> Quirks -> LapicKernelPanic -> YES`
  * Caso não esteja ativada, ocorrerá um *kernel panic* no LAPIC.
* `UEFI -> Quirks -> UnblockFsConnect -> YES`

## Configurações da BIOS em Intel

* Observação: a maioria dessas opções podem não estar presentes no firmware do seu computador. É recomendado que todas as opções estejam configuradas da forma mais próxima possível, mas não se preocupe muito caso essas opções não estejam presentes na BIOS do seu computador.

### Opções para Desativar

| Nome em Inglês | Nome em Português | Observação |
| :--- | :--- | :--- |
| Fast Boot | Inicialização Rápida | |
| Secure Boot | Inicialização Segura | |
| Serial/COM Port | Porta Serial/COM | |
| Parallel Port | Porta Paralela | |
| VT-d | Tecnologia de Virtualização Intel VT-d | Pode ser ativado se o `DisableIoMapper` estiver configurado para YES. |
| Compatibility Support Module (CSM) | Módulo de Suporte de Compatibilidade (MSC) | |
| Thunderbolt | | Só durante a instalação inicial, já que as portas Thunderbolt podem causar problemas caso não estejam configuradas corretamente. |
| Intel SGX | | |
| Intel Platform Trust | | |
| CFG Lock (MSR 0xE2 write protection) | Trava de CFG (proteção de escrita do MSR 0xE2) | **Precisa estar desligado. Se a opção da BIOS não puder ser encontrada, ative o `AppleCpuPmCfgLock` sob o caminho `Kernel -> Quirks`. O macOS não iniciará com a trava de CFG ativada.** |

### Opções para Ativar

| Nome em Inglês | Nome em Português | Oservação |
| :--- | :--- | :--- |
| VT-x | Tecnologia de Virtualização Intel VT-x | |
| Above 4G decoding | | |
| Hyper-Threading | | |
| Execute Disable Bit | | |
| EHCI/XHCI Hand-off | | |
| OS type: Windows 8.1/10 UEFI Mode | Tipo de SO: Windows 8.1/10 em Modo UEFI | |
| DVMT Pre-Allocated (iGPU Memory): 32MB | DVMT Pré-alocado (memória da GPU integrada): 32MB | |
| SATA Mode: AHCI | Modo SATA: AHCI | |

## Finalizando

Depois de tudo terminado, acesse o guia [Processo de Instalação](../installation/installation-process.md) para continuar com a configuração do OpenCore.
