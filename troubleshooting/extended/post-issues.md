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

É comumente causado por uma configuração de partição do Windows irregular. Mais especificamente, signfica que a partição EFI não é a primeira no disco. Para corrigir isso, será necessário ativar a seguinte *quirk*:

* `PlatformInfo -> Generic -> AdviseWindows -> True`

![](../../images/troubleshooting/troubleshooting-md/error.png)

## Seleção de Disco de Inicialização Não Aplica Corretamente

Caso esteja tendo problemas nos quais o painel de configuração Disco de Inicialização não aplica corretamente as novas configurações, muito provavelmente é um problema causado pela falta de um `DevicePathsSupported` no I/O Registry. Para resolver isso, certifique-se de que a opção `PlatformInfo -> Automatic` está ativada.

Exemplo de `DevicePathsSupported` faltante:

* [Default DevicePath match failure due to different PciRoot #664](https://github.com/acidanthera/bugtracker/issues/664#issuecomment-663873846) (em inglês).

## macOS waking up with the wrong time

An odd quirk some people may notice is that from wake, macOS will have the incorrect time for a bit before self-correcting with network time check. The root cause of this issue is most likely due to your RTC not ticking, and can be resolved with a new CMOS battery(note that Z270 and newer are quite picky with voltage so choose carefully).

To verify whether your RTC is working correctly:

* Download [VirtualSMC v1.1.5+](https://github.com/acidanthera/virtualsmc/releases) and run the smcread tool:

```bash
/path/to/smcread -s | grep CLKT
```

![](../../images/extras/big-sur/readme/rtc-1.png)

This should provide you with a hexadecimal value, and once converted it should equal time elapsed from Midnight relative to Cupertino.

So for this example, we'll grab our value(`00010D13`) then convert it to decimal and finally divide it by 3600. This should result in the approximate time elapsed(in seconds) since midnight relative to Cupertino

* 00010D13 (Convert to HEX)-> 68883 (Divided by 3600 so we get hours)-> 19.13h(so 19:07:48)

Next you'll want to put your hack to sleep for a bit and wake it, then check the CLKT value once more to see whether it deviated more or if it has a set difference. If you find it didn't actually tick much of at all from the elapsed time, you'll need to look into buying a new battery(with proper voltage)

## No Volume/Brightness control on external monitors

Oddly enough, macOS has locked down digital audio from having control. To bring back some functionality, the app [MonitorControl](https://github.com/the0neyouseek/MonitorControl/releases) has done great work on improving support in macOS

## Time inconsistency between macOS and Windows

This is due to macOS using Universal Time while Windows relies on Greenwich time, so you'll need to force one OS to a different way of measuring time. We highly recommend modifying Windows instead as it's far less destructive and painful:

* [Install Bootcamp utilities](https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootcamp.html)
* [Modify Windows' registry](https://superuser.com/q/494432)

## Disabling SIP

SIP or more properly known as System Integrity Protection, is a security technology that attempts to prevent any malicious software and the end user from damaging the OS. First introduced with OS X El Capitan, SIP has grown over time to control more and more things in macOS, including limiting edits to restricted file locations and 3rd party kext loading with `kextload`(OpenCore is unaffected as kexts are injected at boot). To resolve this, Apple has provided numerous configuration options in the NVRAM variable `csr-active-config` which can either be set in the macOS recovery environment or with OpenCore's NVRAM section(The latter will be discussed below).

* <span style="color:red">WARNING:</span> Disabling SIP can break OS functionality such as software updates in macOS 11, Big Sur and newer. Please be careful to only disable specific SIP values instead of disabling SIP outright to avoid these issues.
  * Enabling `CSR_ALLOW_UNAUTHENTICATED_ROOT` and `CSR_ALLOW_APPLE_INTERNAL` are common options that can break OS updates for users

You can choose different values to enable or disable certain flags of SIP. Some useful tools to help you with these are [CsrDecode](https://github.com/corpnewt/CsrDecode) and [csrstat](https://github.com/JayBrown/csrstat-NG). Common values are as follows (bytes are pre-hex swapped for you, and note that they go under NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config):

* `00000000` - SIP completely enabled (0x0).
* `03000000` - Disable kext signing (0x1) and filesystem protections (0x2).
* `FF030000` - Disable all [flags in macOS High Sierra](https://opensource.apple.com/source/xnu/xnu-4570.71.2/bsd/sys/csr.h.auto.html) (0x3ff).
* `FF070000` - Disable all [flags in macOS Mojave](https://opensource.apple.com/source/xnu/xnu-4903.270.47/bsd/sys/csr.h.auto.html) and in [macOS Catalina](https://opensource.apple.com/source/xnu/xnu-6153.81.5/bsd/sys/csr.h.auto.html) (0x7ff) as Apple introduced a value for executable policy.
* `FF0F0000` - Disable all flags in macOS Big Sur (0xfff) which has another new [flag for authenticated root](https://eclecticlight.co/2020/06/25/big-surs-signed-system-volume-added-security-protection/).

**Note**: Disabling SIP with OpenCore is quite a bit different compared to Clover, specifically that NVRAM variables will not be overwritten unless explicitly told so under the `Delete` section. So if you've already set SIP once either via OpenCore or in macOS, you must override the variable:

* `NVRAM -> Delete -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config`
  
![](../../images/troubleshooting/troubleshooting-md/sip.png)

## Writing to the macOS system partition

With macOS Catalina and newer, Apple split the OS and user data into 2 volumes where the system volume is read-only by default. To make these drives writable we'll need to do a few things:

* Note: Users of `SecureBootModel` may end up in a RecoveryOS boot loop if the system partition has been modified. To resolve this, Reset NVRAM and set `SecureBootModel` to `Disabled`

**macOS Catalina**

1. [Disable SIP](#disabling-sip)
2. Mount drive as writable (Run `sudo mount -uw /` in terminal)

**macOS Big Sur**

1. [Disable SIP](#disabling-sip)
2. Mount drive as writable (See below link for command)

* Note: Due to how OS updates work in macOS Big Sur and newer, changing the system volume can in fact break OS updates. Please edit with caution

Commands based off of Apple's KDK documents:

```bash
# First, create a mount point for your drive
mkdir ~/livemount

# Next, find your System volume
diskutil list

# From the below list, we can see our System volume is disk5s5
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

# Mount the drive(ie. disk5s5)
sudo mount -o nobrowse -t apfs  /dev/disk5s5 ~/livemount

# Now you can freely make any edits to the System volume

# If you edited either the S*/L*/Kernel, S*/L*/Extensions or L*/Extensions,
# you will need to rebuild the kernel cache
sudo kmutil install --volume-root ~/livemount --update-all

# Finally, once done editing the system volume we'll want to create a new snapshot
sudo bless --folder ~/livemount/System/Library/CoreServices --bootefi --create-snapshot
```

## Rolling back APFS Snapshots

With macOS Big Sur, the system volume is now snapshotted allowing you to roll back in case of issues with system updates breaking due to a broken seal. Thanks to new snapshots being created with every OS update, we've got quite a bit to roll back too.

To roll back, you'll first need to reboot into Recovery partition then select "Restore From Time Machine Backup":

![](./../../images/troubleshooting/troubleshooting-md/snapshots.jpg)

* [Credit to Lifewire for image](https://www.lifewire.com/roll-back-apfs-snapshots-4154969)

## Apple Watch Unlock issues

For those with Apple Watch Unlock issues, verify the following:

* You have a supported Apple Wireless card with Bluetooth Low Energy(4.0+)
* Your watch and Mac are signed in with the same account
* iServices working correctly(ie. iMessage)
* There's an option to Unlock with Apple Watch under Security and Privacy setting in System Preferences

![](../../images/troubleshooting/troubleshooting-md/watch-unlock.png)

If the above are met, and you still have unlock issues we recommend running through the below guide:

* [Fixing Auto Unlock](https://forums.macrumors.com/threads/watchos-7-beta-5-unlock-mac-doesnt-work.2250819/page-2?post=28904426#post-28904426)

## 4K iGPU output issues over HDMI

For machines with HDMI 2.0 capable ports with resolutuion issues, verify the following:

* 4k output works correctly in Windows
* Monitor is set explicitly to HDMI 2.0
  * If using an HDMI to DisplayPort converter, ensure the monitor is set to DisplayPort 1.2 or higher
* Ensure enough iGPU memory has been allocated
  * For Broadwell and newer, 64MB is expected to be allocated
  * Machines relying on WhateverGreen's `framebuffer-stolenmem` property should know this can cause 4k output issues. Please ensure you can set the iGPU's memory to 64MB allowing you to remove these properties
* Laptops and many desktop users may need this boot-arg:
  * `-cdfon`

For all other troubleshooting, please reference [WhateverGreen's Intel docs](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md)
