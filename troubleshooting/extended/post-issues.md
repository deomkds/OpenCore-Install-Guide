# Problemas Após a Instalação

Problemas que podem ocorrem depois de ter o macOS instalado corretamente.

[[toc]]

## iMessage e Siri Não Funcionam

Veja o guia [Corrigindo os iServiços](https://deomkds.github.io/OpenCore-Post-Install/universal/iservices.html).

## Sem Áudio Integrado

Veja o guia [Corrigindo o Áudio com a AppleALC](https://deomkds.github.io/OpenCore-Post-Install/).

## Reset de BIOS ou Modo de Segurança Após Reinicio/Desligamento

Veja o guia [Corrigindo Resets de RTC/CMOS](https://deomkds.github.io/OpenCore-Post-Install/misc/rtc.html).

## Trackpads PS2 Synaptics Não Funcionam

Tente usar o arquivo [SSDT-Enable_DynamicEWMode.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-Enable_DynamicEWMode.dsl).
Primeiro, abra o Gerenciador de Dispositivos (Windows) e abra o seguinte caminho:

```
Gerenciador de Dispositivos -> Mouse e Outros Dispositivos Apontadores -> clique duas vezes no trackpad -> Propriedades -> Detalhes > Nome de Dispositivo na BIOS
```

Então baixe o arquivo [SSDT-Enable_DynamicEWMode.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-Enable_DynamicEWMode.dsl)
Por padrão, o arquivo usa `PCI0.LPCB.PS2K` como caminho. Será necessário alterá-lo de acordo com o caminho do trackpad do seu computador.

```c
External (_SB_.PCI0.LPCB.PS2K, DeviceObj) <- Renomeie isso.

    Name(_SB.PCI0.LPCB.PS2K.RMCF, Package()  <- Renomeie isso.

```

Então compile com o MaciASL, copie o arquivo final para a pasta `OC/ACPI` e adicione-o na `config.plist`.

* Observação: embora isso funcione na maioria dos casos, o trackpad pode sofrer atrasos e os botões físicos podem não funciona. [Veja mais detalhes aqui.](https://github.com/acidanthera/bugtracker/issues/890) (em inglês). Se puder viver sem o trackpado, esta opção pode ser melhor:

Encontre o caminho da ACPI para o seu mouse (veja acima), então baixe o arquivo [SSDT-DisableTrackpadProbe.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-DisableTrackpadProbe.dsl). Por padrão, o arquivo usa `PCI0.LPCB.PS2K` como caminho. Será necessário alterá-lo de acordo com o caminho da ACPI do seu computador.

```c
External (_SB_.PCI0.LPCB.PS2K, DeviceObj) <- Renomeie isso.

    Name(_SB.PCI0.LPCB.PS2K.RMCF, Package() <- Renomeie isso.
```

## Correção para Teclas "Breakless" em Teclados Dell PS2

Aqueles usuários que estejam tendo problemas com pressionamentos de teclas que não retornam (pressionando indefinidamente), será necessário ativar o perfil da Dell na VoodooPS2.

Primeiro de tudo, será necessário encontrar, no Gerenciador de Dispositivos, o caminho ACPI para o objeto do teclado:

```
Gerenciador de Dispositivos -> Teclados -> clique duas vezes no teclado -> Propriedades -> Detalhes > Nome do Dispositivo na BIOS
```

Então, baixe o arquivo [SSDT-KEY-DELL-WN09.dsl](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-KEY-DELL-WN09.dsl) e altere o caminho ACPI para o que foi encontrado no passo anterior:

```c
External (_SB_.PCI0.LPCB.PS2K, DeviceObj) <- Renomeie isso.

    Method(_SB.PCI0.LPCB.PS2K._DSM, 4) <- Renomeie isso.
```

## macOS Sem Aceleração Gráfica na GPU AMD X570

Verifique o seguinte:

* A GPU é compatível com UEFI (GTX 7XX/2013+).
* O CSM está desativado na BIOS.
* Forçar a velocidade do link da PCIe 3.0.

## DRM Não Funciona

Veja o guia [Corrigindo a DRM](https://deomkds.github.io/OpenCore-Post-Install/universal/drm.html).

## "Memory Modules Misconfigured" no MacPro7,1

Veja o guia [Corrigindo Problemas de Memória no MacPro7,1](https://deomkds.github.io/OpenCore-Post-Install/universal/memory.html).

Aqueles que simplesmente quiserem desativar a notificação (não o erro em si), recomenda-se instalar o [RestrictEvents](https://github.com/acidanthera/RestrictEvents/releases).

## Aplicativos Travando em AMD

~~Solução fácil: compra um Intel.~~

Em CPUs AMD, sempre que o macOS faz uma chamada para funções específicas da CPU, o aplicativo pode não funcionar corretamente ou travar. Aqui estão alguns dos apps afetados e suas "soluções":

* Produtos da Adobe nem sempre funcionam:
  * Algumas correções podem ser encontradas aqui: [Correções de Adobe](https://adobe.amd-osx.com/) (em inglês).
  * Observe que essas correções simplesmente desligam certos recursos. Isto é, não são correções de verdade.
* Máquinas virtuais sendo executada no *framework* AppleHV não funcionam (ex.: Parallels 15, VMware):
  * O VirtualBox funciona bem, visto que não utiliza o AppleHV.
  * O VMware 10 ou mais antigo também funciona.
  * O Parallels 13.1.0 ou mais antigo também são conhecidos por funcionar.
* Docker quebrado:
  * O Docker Toolbox é a única solução, por ser baseado no VirtualBox. Muitos recursos não estão disponíveis nessa versão.
* O IDA Pro não instala:
  * Existe uma verificação específica de Intel no instalador. O app propriamente dito deve rodar.
* Páginas da web travando em CPUs 15/16h:
  * Siga as direções dessa página (após a seção UPDATE 5): [Fix web pages](https://www.insanelymac.com/forum/topic/335877-amd-mojave-kernel-development-and-testing/?do=findComment&comment=2661857) (em inglês).

## Suspensão Travando em AMD

Geralmente acontece em computadores com AMD Ryzen ou mais novo que utilizam o controlador USB do chipset. A principal maneira de verificar se este problema está acontecendo é observar os logs após ativar ou retornar da suspensão:

* No Terminal:
  * `log show --last 1d | grep -i "Wake reason"`

Deverá resultar em algo como:

```
Sleep transition timed out after 180 seconds while calling power state change callbacks. Suspected bundle: com.apple.iokit.IOUSBHostFamily.
```

É possível verificar qual controlador é `XHC0` por meio do IOReg, procurando pelo Vendor ID (1022 é o chipset AMD). A correção para esse problema de suspensão pode ser:

* Evitar o chipset USB completamente (idealmente, configurar `_STA = 0x0` para desativar completamente o controlador usando uma SSDT).
* Corrigir as propriedades de energida da USBX de forma que atenda às expectativas do controlador.

## AssetCache Content Caching Indisponível em Máquinas Virtuais

Erros como:

```bash
$ sudo AssetCacheManagerUtil activate
AssetCacheManagerUtil[] Failed to activate content caching: Error Domain=ACSMErrorDomain Code=5 "virtual machine"...
```

Surgem devido à *flag* `VMM` ser exposta pelo `sysctl`.

Aplique o patch de *kernel* [VmAssetCacheEnable](https://github.com/ofawx/VmAssetCacheEnable) para esconder a *flag* e permitir a operação normal.

## Computadores com CPUs Coffee Lake Falhando ao Retornar da Suspensão

No macOS 10.15.4 Catalina, algumas mudanças foram feitas na AGPM que podem causar problemas ao retornar da suspensão em computadores com CPUs Coffee Lake. Especificamente, monitores conectados à GPU integrada não retornam da suspensão como deveriam. Para resolver isso:

* Adicione o argumento de inicialização `igfxonln=1` na `config.plist`.
* Certifique-se de estar usando a [WhateverGreen v1.3.8](https://github.com/acidanthera/WhateverGreen/releases) ou mais nova.

## Sem Informações de Temperatura/Cooler

Uma de duas:

* O iStat Menus ainda não suporta leitura desses dados no MacPro7,1.
* Os sensores integrados da VirtualSMC não suportam AMD.

No caso do iStat, será necessário aguardar por uma atualização. Já usuários de AMD podem escolher uma das duas soluções:

* [SMCAMDProcessor](https://github.com/trulyspinach/SMCAMDProcessor/releases)
  * Ainda em beta inicial, mas um ótimo trabalho já foi feito. Observe que foi testada principalmente em CPUs Ryzen.
* [FakeSMC3_with_plugins](https://github.com/CloverHackyColor/FakeSMC3_with_plugins/releases)

**Observações para CPUs AMD com FakeSMC**:

* O suporte ao FileVault na FakeSMC ainda precisa de mais trabalho.
* Certifique-se de que nenhuma outra `kext` de SMC esteja presente, especialmente a [VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases).

## Erro "Você não pode alterar o disco de inicialização para o disco selecionado"

Geralmente, é causado por uma configuração irregular na partição do Windows. Mais especificamente, signfica que a partição EFI não é a primeira no disco. Para corrigir isso, ative a seguinte *quirk*:

* `PlatformInfo -> Generic -> AdviseWindows -> True`

![](../../images/troubleshooting/troubleshooting-md/error.png)

## Seleção de Disco de Inicialização Não Aplica Corretamente

Problemas nos quais o painel de configuração Disco de Inicialização não aplica corretamente as alterações são provavelmente causados pela falta de um `DevicePathsSupported` no I/O Registry. Para resolver isso, certifique-se de que a opção `PlatformInfo -> Automatic` está ativada.

Exemplo de `DevicePathsSupported` faltante:

* [Default DevicePath match failure due to different PciRoot #664](https://github.com/acidanthera/bugtracker/issues/664#issuecomment-663873846) (em inglês).

## macOS Retornando da Suspensão com a Hora Errada

Um problema estranho que algumas pessoas podem notar é que, ao retornar da suspensão, o macOS apresentará a hora errada por um breve momento antes de se autocorrigir por meio de uma sincronização com a rede. A causa raiz deste problema é pode ser o fato do RTC não contar a hora corretamente. Isso pode ser resolvido com trocando a bateria de CMOS (bateria da BIOS).

Observe que placas Z270 e mais novas são bastante enjoadas com a tensão da bateria, então escolha com cuidado.

Para verificar se o RTC está funcionando corretamente:

* Baixe a [VirtualSMC v1.1.5+](https://github.com/acidanthera/virtualsmc/releases) e execute a ferramenta `smcread`:

```bash
/diretorio/do/smcread -s | grep CLKT
```

![](../../images/extras/big-sur/readme/rtc-1.png)

Isso deve retornar um valor hexadecimal. Uma vez convertido, esse valor deve ser igual ao tempo decorrido entre a meia-noite em Cupertino.

Então, neste exemplo, pegue o valor (`00010D13`) e converta-o para decimal. Então, divida-o por 3600. O resultado deve ser o tempo decorrido aproximado (em segundos) desde a meia-noite, relativo a Cupertino.

* 00010D13 (converta para HEX)-> 68883 (divida por 3600 para obter as horas)-> 19.13h(então 19:07:48).

Depois, coloque o *hackintosh* em modo de suspensão por alguns minutos e ligue-o novamente. Agora, cheque o valor CLKT mais uma vez para ver se houve uma alteração compatível com o tempo em que o computador ficou suspenso. Caso o relógio não tenha contado o tempo correto, busque comprar uma nova bateria (com a tensão correta).

## Sem Controle de Volume ou Brilho Em Monitores Externos

Estranhamente, o macOS bloqueia os controles de volume em dispositivos de áudio digital. Para trazer de volta parte dessa funcionalidade, use o aplicativo [MonitorControl](https://github.com/the0neyouseek/MonitorControl/releases) (em inglês).

## Inconsistência de Relógio Entre o macOS e o Windows

Isso se deve ao fato do macOS tratar o horário da BIOS/firmware UEFI como UTC enquanto o Windows o trata como fuso horário local. Será necessário forçar um dos sistemas operacionais a tratar o relógio da BIOS de maneira diferente. É altamente recomendado modificar o Windows pois é muito mais fácil, rápido e seguro:

* [Instale os utilitários do BootCamp](https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootcamp.html)
* [Modifique o Registro do Windows](https://superuser.com/q/494432) [Download](https://raw.githubusercontent.com/deomkds/OpenCore-Install-Guide/main/extra-files/clockfix.zip)

## Desativando o SIP

A Proteção da Integridade do Sistema (SIP) é uma tecnologia de segurança que tenta prevenir que softwares maliciosos e o usuário final causem danos ao sistema operacional. Lançado originalmente no OS X 10.11 El Capitan, o SIP evoluiu ao longo do tempo para controlar mais e mais coisas no macOS, incluindo a habidade de limitar a edição em locais de arquivos restritos e o carregamento de `kexts` de terceiros por meio da ferramenta `kextload` (isso não afeta o OpenCore, já que as `kexts` são injetadas na inicialização).

Para resolver isso, a Apple providenciou inúmeras opções de configuração por meio da variável de NVRAM `csr-active-config`, a qual pode ser alterada tanto pelo ambiente de recuperação do macOS quanto pela seção NVRAM nas configurações do OpenCore (esta última será discutida abaixo).

* <span style="color:red">ATENÇÃO:</span> Desativar o SIP pode quebrar certas funcionalidades do sistema operacional, como atualizações de software no macOS 11Big Sur ou mais novo. Seja cuidadoso e desabilite somente alguns valores específicos do SIP, em vez de desligá-lo completamente. Assim é possível evitar alguns desses problemas.
  * As opções `CSR_ALLOW_UNAUTHENTICATED_ROOT` e `CSR_ALLOW_APPLE_INTERNAL` são conhecidas por impedir o download de atualizações no macOS.

É possível escolher valores diferentes para ativar ou desativar certas *flags* do SIP. Algumas ferramentas úteis que podem ajudar com esses valores são o [CsrDecode](https://github.com/corpnewt/CsrDecode) e o [csrstat](https://github.com/JayBrown/csrstat-NG). Valores comuns são apresentados a seguir. Os bytes já foram trocados para sua conveniência. Observe que eles devem ser adiconados na `config.plist`, no caminho `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config`.

* `00000000` - SIP ativado completamente (0x0).
* `03000000` - Desabilita a verificação de assinaturas de *kexts* (0x1) e as proteções do sistema de arquivos (0x2).
* `FF030000` - Desabilita todas as [*flags* no macOS 10.13 High Sierra](https://opensource.apple.com/source/xnu/xnu-4570.71.2/bsd/sys/csr.h.auto.html) (em inglês) (0x3ff).
* `FF070000` - Desabilita todas as [*flags* no macOS 10.14 Mojave](https://opensource.apple.com/source/xnu/xnu-4903.270.47/bsd/sys/csr.h.auto.html) (em inglês) e no [macOS 10.15 Catalina](https://opensource.apple.com/source/xnu/xnu-6153.81.5/bsd/sys/csr.h.auto.html) (em inglês) (0x7ff), visto que a Apple criou um novo valor para a política de execução.
* `FF0F0000` - Desabilita todas as *flags* no macOS 11 Big Sur (0xfff), que possui uma nova [*flag* para o *root* autenticado](https://eclecticlight.co/2020/06/25/big-surs-signed-system-volume-added-security-protection/) (em inglês).

**Observação**: Desativar o SIP no OpenCore é um pouco diferente se comparado ao Clover. Especificamente, as variáveis NVRAM não serão sobrescritas a não ser que haja uma entrada configurada na seção `Delete`. Então, caso já tenha configurado o SIP alguma vez pelo  OpenCore ou pelo macOS, será necessário sobrescrever a variável:

* `NVRAM -> Delete -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config`
  
![](../../images/troubleshooting/troubleshooting-md/sip.png)

## Escrevendo na Partição do Sistema do macOS

No macOS 10.15 Catalina e mais novos, a Apple dividiu os dados do sistema operaciona e os dados do usuário em dois volumes diferentes. O volume que contém os arquivos do sistema é somente leitura por padrão. Para obter permissões de escrita nesses volumes, será necessário fazer algumas coisas:

* Observação: usuários da opção `SecureBootModel` podem acabar tendo um *boot loop* na partição de recuperação caso a partição do sistema seja modificada. Para resolver isso, redefina a NVRAM e configure o  `SecureBootModel` para `Disabled`.

**macOS Catalina**

1. [Desative o SIP](#desativando-o-sip)
2. Monte o volume com permissões de escrita (execute `sudo mount -uw /` no Terminal).

**macOS Big Sur**

1. [Desative o SIP](#desativando-o-sip)
2. Monte o volume com permissões de escrita (veja o comando abaixo).

* Observação: devido a forma como as atualizações do sistema funcionam no macOS 11 Big Sur e mais novos, alterar o volume do sistema pode quebrar as atualizações. Prossiga com cautela.

Comandos baseados na documentação do KDK da Apple:

```bash
# Primeiro, crie um ponto de montagem para o volume.
mkdir ~/livemount

# Então, encontre o volume do sistema.
diskutil list

# A partir da lista abaixo, é possível ver que o volume do sistema corresponde a disk5s5.
/dev/disk5 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +255.7 GB   disk5
                                 Physical Store disk4s2
   1:                APFS Volume ⁨Big Sur HD - Data⁩       122.5 GB   disk5s1
   2:                APFS Volume ⁨Preboot⁩                 309.4 MB   disk5s2
   3:                APFS Volume ⁨Recovery⁩                887.8 MB   disk5s3
   4:                APFS Volume ⁨VM⁩                      1.1 MB     disk5s4
   5:                APFS Volume ⁨Big Sur HD⁩              16.2 GB    disk5s5
   6:              APFS Snapshot ⁨com.apple.os.update-...⁩ 16.2 GB    disk5s5s

# Monte a unidade (ex.: disk5s5).
sudo mount -o nobrowse -t apfs  /dev/disk5s5 ~/livemount

# Agora é possível fazer alterações no volume do sistema livremente.

# Caso tenha alterado as pastas S*/L*/Kernel, S*/L*/Extensions ou L*/Extensions,
# será necessário reconstruir o kernel cache.
sudo kmutil install --volume-root ~/livemount --update-all

# Por fim, ao terminar de alterar o volume do sistema, será preciso criar uma nova snapshot.
sudo bless --folder ~/livemount/System/Library/CoreServices --bootefi --create-snapshot
```

## Revertendo Snapshots do APFS

No macOS 11 Big Sur, o volume do sistema possui uma *snapshot* que permite a reversão para um estado prévio caso atualizações do sistema parem de funcionar devido a um selo violado. Graças ao fato de que novas *snapshots* são criadas a cada atualização do sistema operacional, há várias opções para reversão.

Para reverter a um estado anterior, primeiro será necessário reiniciar o computador e acessar a partição de recuperação. Então selecione a opção "Restaurar de um Backup do Time Machine":

![](./../../images/troubleshooting/troubleshooting-md/snapshots.jpg)

* [Créditos a Lifewire pela imagem.](https://www.lifewire.com/roll-back-apfs-snapshots-4154969)

## Problemas de Desbloqueio com o Apple Watch

Para quem estiver tendo problemas ao desbloquear o computador com o Apple Watch, verifique o seguinte:

* Se possui uma placa de rede sem fio Apple com Bluetooth Low Energy (4.0 ou superior).
* Se o macOS e o Apple Watch estão usando oo mesmo ID Apple.
* Se os iServiços estão funcionando corretamente (ex.: iMessage).
* Se há uma opção para desbloquear com o Apple Watch nas configurações de Segurança e Privacidade nas Preferências do Sistema.

![](../../images/troubleshooting/troubleshooting-md/watch-unlock.png)

Se os requisitos acima forem cumpridos, mas problemas de desbloqueio ainda ocorrerem, recomenda-se seguir o guia abaixo:

* [Fixing Auto Unlock](https://forums.macrumors.com/threads/watchos-7-beta-5-unlock-mac-doesnt-work.2250819/page-2?post=28904426#post-28904426) (em inglês)

## Problemas com Saída 4K em GPUs Integradas Usando HDMI

Em computadores com portas HDMI 2.0 que estejam tendo problemas de resolução, verifique o seguinte:

* Se a saída de vídeo em 4K funciona corretamente no Windows.
* Se o monitor está configurado para usar a HDMI 2.0.
  * Caso esteja utilizando um conversor de HDMI para DisplayPort, certifique-se de que o monitor está configurado para usar DisplayPort 1.2 ou superior.
* Certifique-se de que foi alocada memória suficiente para a GPU integrada.
  * Em CPUs Broadwell e mais novas, 64MB é o esperado.
  * Usuários que dependem da propriedade `framebuffer-stolenmem` da WhateverGreen precisam saber que ela pode causar problemas com a saída de vídeo em 4K. Certifique-se de que é possível configurar a memória de vídeo da GPU integrada para 64MB, de forma a permitir a remoção dessas propriedades.
* Usuários de notebooks e muitos desktops talvez precisem deste argumento de inicialização:
  * `-cdfon`

Para qualquer outra solução de problemas, veja a [documentação Intel da WhateverGreen](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md).
