# OpenCore e o macOS 11 Big Sur

É aquela época do ano de novo e, com ela, veio um novo beta do macOS. Aqui estão todas as informações para começar.

::: tip Lembrete

**Esta página contém uma breve discussão sobre o que é preciso para se preparar para o macOS 11 Big Sur. Um olhar mais detalhado acerca do que mudou com o macOS 11 Big Sur pode ser encontrado aqui:**

* [What's new in macOS 11, Big Sur!](https://dortania.github.io/hackintosh/updates/2020/11/12/bigsur-new.html) (em inglês)

:::

## Table of Contents

[[toc]]

## Pré-requisitos

Antes de pular de cabeça na instalação do macOS 11 Big Sur, será preciso revisar algumas coisas:

### Uma SMBIOS Suportada

O macOS 11 Big Sur deixou de suportar algumas das SMBIOS de CPUs Ivy Bridge e Haswell. Veja a lista abaixo para saber se a sua ainda é suportada:

* iMac14,3 e mais antigas.
  * Observação: iMac14,4 ainda é suportada.
* MacPro5,1 e mais antigas.
* MacMini6,x e mais antigas.
* MacBook7,1 e mais antigas.
* MacBookAir5,x e mais antigas.
* MacBookPro10,x e mais antigas.

Se sua SMBIOS era suportada no macOS 10.15 Catalina e não está incluída na lista acima, está tudo certo!

::: details SMBIOS Suportadas

SMBIOS ainda suportadas no macOS 11 Big Sur:

* iMac14,4 e mais novas.
* MacPro6,1 e mais novas.
* iMacPro1,1 e mais novas.
* MacMini7,1 e mais novas.
* MacBook8,1 e mais novas.
* MacBookAir6,x e mais novas.
* MacBookPro11,x e mais novas.

Para obter uma lista completa de todas as SMBIOS suportadas, incluíndo em quais versões do macOS, veja: [Escolhendo a SMBIOS Correta](../smbios-support.md).

:::

Para aqueles que estejam procurando por uma simples tradução para seus computadores:

* Usuários de iMac13,1 devem passar a usar iMac14,4.
* Usuários de iMac13,2 devem passar a usar iMac15,1.
* Usuários de iMac14,2 e iMac14,3 devem passar a usar iMac15,1.
  * Observação: usuários de CPUs AMD com GPUs Nvidia talvez achem a MacPro7,1 mais apropriada.
* Usuários de iMac14,1 devem passar a usar iMac14,4.

### Hardware Suportado

Poucas coisas deixaram de ser suportadas, mas aqui estão algumas que deixaram:

* CPUs Ivy Bridge U, H e S oficiais.
  * Essas CPUs ainda serão capazes de iniciar sem muitos problemas, mas observe que não existem mais Macs suportados pelo macOS 11 Big Sur que utilizem CPUs Ivy Bridge para consumidores.
  * CPUs Ivy Bridge-E ainda são suportadas graças ao MacPro6,1.
* GPUs integradas das CPUs Ivy Bridge terão suporte removido.
  * No entanto, os drivers da HD 4000 e HD 2500 ainda estão presentes no macOS 11.0.1 Big Sur.
* Placas Wi-Fi com chipsets BCM4331 e BCM43224.
  * Veja o [Guia de Compra Wi-Fi](https://deomkds.github.io/Wireless-Buyers-Guide/) para alternativas de atualização.
  * Possível contorno é injetar uma versão corrigida da IO80211Family. Veja este link para mais detalhes: [IO80211 Patches](https://github.com/khronokernel/IO80211-Patches) (em inglês).
* Alguns controladores SATA.
  * Por algum motivo, a Apple removeu a classe AppleIntelPchSeriesAHCI da `AppleAHCIPort.kext`. Devido a remoção completa dessa classe, tentar falsificar outro ID (geralmente feito pela `SATA-unsupported.kext`) pode falhar para uns e causar instabilidade para outros.
  * Uma correção parcial é injetar a versão do macOS 10.15 Catalina que tenha tido seus símbolos conflitantes corrigidos. É possível encontrar uma versão de exemplo aqui: [AppleAHCIPort.kext do macOS 10.15 Catalina com Patches](https://github.com/deomkds/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip)
  * Recomenda-se configurar o valor do `MinKernel` para 20.0.0 na *kext* `CtlnaAHCIPort.kext`, de forma a evitar quaisquer conflitos em potencial. Dessa forma, funcionará tanto no macOS 10.15 Catalina e no macOS 11 Big Sur e a SATA-unsupported poderá ser removida.

Outras mudanças notáveis:

* Usuários de GPUs Navi MSI não mais precisam do patch `ATY,rom`/`-wegnoegpu` para iniciar o instalador.
* O estágio 2 da instalação exige NVRAM funcional.
  * Asus Série 9: para mais informações, acesse [Haswell ASUS Z97 Big Sur Update Thread](https://www.reddit.com/r/hackintosh/comments/jw7qf1/haswell_asus_z97_big_sur_update_and_installation/) (em inglês).
  * Usuários de X99 e X299 com NVRAM quebrada precisarão instalar em outro computador e mover o SSD ao terminar.

### Kexts atualizadas, bootloader e config.plist

Certifique-se de estar usando a versão mais recente do OpenCore, das *kexts* e da `config.plist` para eviar problemas estranhos de compatibilidade. É possível baixar e atualizar o OpenCore e as *kexts* seguindo o guia:

* [Atualizando o OpenCore e o macOS](https://deomkds.github.io/OpenCore-Post-Install/universal/update.html)

Caso não tenha certeza de qual versão do OpenCore está sendo executada, é possível descobrir usando o seguinte comando no Terminal:

```sh
nvram 4D1FDA02-38C7-4A6A-9CC6-4BCCA8B30102:opencore-version
```

* Observação: este comando exige que o bit `0x2` seja adicionado na opção `Misc -> Security -> ExposeSensitiveData`. O valor recomendado para a opção `ExposeSensitiveData` é `0x6`, que inclui os bits `0x2` e `0x4`.

#### Observação Sobre AMD

**Lembrete para Usuários de AMD**: Não se esqueça de atualizar os patches de *kernel* usando aqueles fornecidos para AMD OS X, ou o macOS 11 Big Sur não iniciará:

* [Patches de AMD](https://github.com/AMD-OSX/AMD_Vanilla/) (em inglês)

#### Observação Sobre Intel HEDT

Os usuários de X79, X99 e X299 devem prestar muita atenção ao exposto a seguir. O macOS 11 Big Sur adicionou novas exigências para ACPI, então será necessário baixar novas SSDTs:

* X79
  * [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl)
* X99
  * [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl)
  * [SSDT-RTC0-RANGE](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl)
* X299
  * [SSDT-RTC0-RANGE](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl)

Para os que preferem arquivos pré-compilados, veja:

* [Primeiros Passos com a ACPI: SSDTs Pré-compiladas](https://deomkds.github.io/Getting-Started-With-ACPI/ssdt-methods/ssdt-prebuilt.html)

### Problemas Conhecidos

Muita coisa parou de funcionar com o macOS 11 Big Sur. Principalmente:

* Lilu
  * Os patches de espaço de usuário foram muito afetados. Isso significa que alguns recursos pararam de funcionar:
  * Incluem:
    * DiskArbitrationFixup
    * MacProMemoryNotificationDisabler
    * SidecarEnabler
    * SystemProfilerMemoryFixup
    * NoTouchID
    * Patches de DRM e `-cdfon` da WhateverGreen
* AirportBrcmFixup
  * Forçar o carregamento de um driver específico por meio do `brcmfx-driver=` pode ajudar.
    * Por exemplo, usuários de BCM94352Z talvez precisem de `brcmfx-driver=2` nos arugmentos de inicialização para resolver isso. Outros chipsets precisarão de outras variáveis.
  * Configurar o `MaxKernel` para 19.9.9 na `AirPortBrcm4360_Injector.kext` pode ajudar. Mais informações [no repositório](https://github.com/acidanthera/AirportBrcmFixup/blob/master/README.md#please-pay-attention) (em inglês).
* Suporte a SATA quebrado.
  * Devido à remoção da classe AppleIntelPchSeriesAHCI na `AppleAHCIPort.kext`.
  * Para resolver isso, instale a [AppleAHCIPort.kext do macOS 10.15 Catalina com Patches](https://github.com/deomkds/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip), configurando o `MinKernel` para 20.0.0.

E embora não seja um problema, o SIP ganhou um novo bit. Para desativá-lo da maneira correta, será necessário configurar a opção `csr-active-config` para `FF0F0000`. Veja mais detalhes aqui: [Desativando o SIP](../../troubleshooting/extended/post-issues.md#desativando-o-sip).

## Instalação

Os guias foram atualizados para acomodar o macOS 11 Big Sur. Veja a página que melhor se aplica a você:

* [Usuários de macOS](../../installer-guide/mac-install.md)
* [Usuários de Windows](../../installer-guide/winblows-install.md)
* [Usuários de Linux](../../installer-guide/linux-install.md)

## Solução de Problemas

### Preso em `Forcing CS_RUNTIME for entitlement`

![Créditos a Stompy pela imagem](../../images/extras/big-sur/readme/cs-stuck.jpg)

Esta é a parte na qual o macOS sela o volume do sistema, e onde pode parecer que o macOS está travado. **NÃO REINICIE** pensando que travou, pois este processo pode demorar um pouco para terminar e corromperá a instalação caso seja interrompido. 

### Preso em `PCI Configuration Begins` em Placas Intel X99 e X299

![](../../images/extras/big-sur/readme/rtc-error.jpg)

Como mencionado anteriormente, placas-mãe Intel HEDT podem ter alguns problemas relacionados com o dispositivo RTC na ACPI. Para resolver, será preciso verificar o dispositivo RTC e ver quais regiões estão faltando. Para obter mais informaçõe, acesse: [SSDT-RTC0-RANGE.dsl](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl) (em inglês).

### Preso em `ramrod`(^^^^^^^^^^^^^)

![Créditos a Notiflux pela imagem](../../images/extras/big-sur/readme/ramrod.jpg)

Caso fique preso perto da seção `ramrod` (inicia, dá esse erro e reinicia de novo nesse erro, causando um loop), significa que o emulador de SMC está com problemas. Para corrigir, existem duas opções: 

* Certifique-se de estar usando as *builds* mais recentes da VirtualSMC e da Lilu, com o argumento de inicialização `vsmcgen=1`.
* Alterne para a [FakeSMC do Rehabman](https://bitbucket.org/RehabMan/os-x-fakesmc-kozlek/downloads/) (pode usar o truque do `MinKernel`/`MaxKernel` mencionado anteriormente para restringir a FakeSMC ao macOS 11 Big Sur e superior).

E ao trocar de *kexts*, certifique-se de que não ter ambas FakeSMC e VirtualSMC ativadas na `config.plist` para a mesma versão do macOS, já que isso causará conflitos.

### Kernel Panic em X79 e X99 na IOPCIFamily

Isso deve-se a presença de Pontes PCI não utilizadas ativadas na ACPI. Dessa forma, quando o IOPCIFamily procura por dispositivos desconhecidos, causa um *kernel panic*. Para resolver, será preciso adicionar a [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl) nas configurações.

### DeviceProperties injection failing

With Big Sur, macOS has become much pickier with devices being present in ACPI. Especially if you're injecting important properties for WhateverGreen or AppleALC, you may find they're no longer applying. To verify whether your ACPI defines your hardware, check for the `acpi-path` property in [IORegistryExplorer](https://github.com/khronokernel/IORegistryClone/blob/master/ioreg-210.zip):

![](../../images/extras/big-sur/readme/acpi-path.png)

If no property is found, you'll need to create an SSDT that provides the full pathing as you likely have a PCI Bridge that is not documented in your ACPI tables. An example of this can be found here: [SSDT-BRG0](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-BRG0.dsl)

* **Note**: This issue may also pop up in older versions of macOS, however Big Sur is most likely to have issues.

### Keyboard and Mouse broken

For certain legacy systems, you may notice that while the USB ports work your HID-based devices such as the keyboard and mouse may be broken. To resolve this, add the following patch:

::: details IOHIDFamily Patch

config.plist -> Kernel -> Patch:

| Key | Type | Value |
| :--- | :--- | :--- |
| Base | String | _isSingleUser |
| Count | Integer | 1 |
| Enabled | Boolean | True |
| Find | Data | |
| Identifier | String | com.apple.iokit.IOHIDFamily |
| Limit | Integer | 0 |
| Mask | Data | |
| MaxKernel | String | |
| MinKernel | String | 20.0.0 |
| Replace | Data | B801000000C3 |
| ReplaceMask | Data | |
| Skip | Integer | 0 |

[Source](https://applelife.ru/threads/ustanovka-macos-big-sur-11-0-beta-na-intel-pc-old.2944999/page-81#post-884400)

:::

### Early Kernel Panic on `max_cpus_from_firmware not yet initialized`

If you receive an early kernel panic on `max_cpus_from_firmware not yet initialized`, this is due to the new `acpi_count_enabled_logical_processors` method added in macOS Big Sur's kernel. To resolve, please ensure you're on OpenCore 0.6.0 or newer with the `AvoidRuntimeDefrag` Quirk enabled.

* **Note**: Due to how early this kernel panic happens, you may only be able to log it either via serial or rebooting in a known working install of macOS and checking your panic logged in NVRAM.
  * Most users will see this panic simply as `[EB|#LOG:EXITBS:START]`

::: details Example Kernel Panic

On-screen:

![](../../images/extras/big-sur/readme/onscreen-panic.png)

Via serial logging or NVRAM:

![](../../images/extras/big-sur/readme/apic-panic.png)

:::

::: details Legacy Edge Case

On certain hardware, mainly the HP DC7900, the kernel still can't determine exactly how many threads your hardware supports. This will result in the aforementioned kernel panic and so we need to hard code the CPU core's value.

To do this, Add the following patch(replacing the 04 from B8 **04** 00 00 00 C3 with the amount of CPU threads your hardware supports):

| Key | Type | Value |
| :--- | :--- | :--- |
| Base | String | _acpi_count_enabled_logical_processors |
| Count | Integer | 1 |
| Enabled | Boolean | True |
| Find | Data | |
| Identifier | String | Kernel |
| Limit | Integer | 0 |
| Mask | Data | |
| MaxKernel | String | |
| MinKernel | String | 20.0.0 |
| Replace | Data | B804000000C3 |
| ReplaceMask | Data | |
| Skip | Integer | 0 |

:::

### Cannot update to newer versions of Big Sur

Generally there's 2 main culprits:

* [Broken Update Utility](#broken-update-utility)
  * Most common error if running a beta, try this first
* [Broken Seal](#broken-seal)

#### Broken Update Utility

Generally seen with every beta cycle, simply unenroll and enroll again:

```sh
# Unenroll from beta catalog
sudo /System/Library/PrivateFrameworks/Seeding.framework/Resources/seedutil unenroll
# Enroll back in
sudo /System/Library/PrivateFrameworks/Seeding.framework/Resources/seedutil enroll DeveloperSeed
```

Then check back with settings, and it should pop up. If not, run the following:

```sh
# List software updates via terminal
softwareupdate -l
```

This should help kick the update utility back into gear. If you still have issues, check the [Broken Seal](#broken-seal) section.

#### Broken Seal

With Apple's new snapshotting for the system drive, they now depend heavily on this for OS updates to apply correctly. So when a drove's seal is broken, macOS will refuse to update the drive.

To verify yourself, check that `Snapshot Sealed` returns as YES:

```bash
# List all APFS volumes
diskutil apfs list

# Look for your system volume
Volume disk1s8 A604D636-3C54-4CAA-9A31-5E1A460DC5C0
        ---------------------------------------------------
        APFS Volume Disk (Role):   disk1s8 (System)
        Name:                      Big Sur HD (Case-insensitive)
        Mount Point:               Not Mounted
        Capacity Consumed:         15113809920 B (15.1 GB)
        Sealed:                    Broken
        FileVault:                 No
        |
        Snapshot:                  4202EBE5-288B-4701-BA1E-B6EC8AD6397D
        Snapshot Disk:             disk1s8s1
        Snapshot Mount Point:      /
        Snapshot Sealed:           Yes
```

If it returns `Snapshot Sealed: Broken`, then you'll want to go through the following:

* Update to OpenCore 0.6.4 or newer
  * Specifically commit [ba10b5d](https://github.com/acidanthera/OpenCorePkg/commit/1b0041493d4693f9505aa6415d93079ea59f7ab0) or newer is required
* Revert to older snapshots
  * Mainly for those who have tampered with the system volume
  * See here how to revert: [Rolling back APFS Snapshots](../../troubleshooting/extended/post-issues.md#rolling-back-apfs-snapshot)

### Kernel Panic on `Rooting from the live fs`

Full error:

```
Rooting from the live fs of a sealed volume is not allowed on a RELEASE build
```

This is due to issues around Secure Boot boot being enabled in Beta 10 with older versions of OpenCore. Simply update to 0.6.4 to resolve

* Specifically commit [ba10b5d](https://github.com/acidanthera/OpenCorePkg/commit/1b0041493d4693f9505aa6415d93079ea59f7ab0) or newer is required

### Asus Z97 and HEDT(ie. X99 and X299) failing Stage 2 Installation

With Big Sur, there's a higher reliance on native NVRAM for installation otherwise the installer will get stuck in a reboot loop. To resolve this you'll need to either:

* Install Big Sur on another machine, then transfer the drive
* Fix the motherboard's NVRAM
  * mainly applicable with Asus's Z97 series

For the latter, see here: [Haswell ASUS Z97 Big Sur Update Thread](https://www.reddit.com/r/hackintosh/comments/jw7qf1/haswell_asus_z97_big_sur_update_and_installation/)

### Laptops kernel panicking on `cannot perform kext scan`

This is due to multiple copies of the same kext being in your kernel cache, and to be more specific having multiple copies of VoodooInput. Look over your `Kernel -> Add` and verify you only have 1 copy of VoodooInput enabled.

* Note: Both VoodooI2C and VoodooPS2 have a bundled copy of VoodooInput, which you disable is up to personal preference
