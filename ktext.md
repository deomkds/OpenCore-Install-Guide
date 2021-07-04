# Juntando os Arquivos

Esta seção aborda o processo de coleta dos diversos arquivos necessários para a inicialização do macOS. Espera-se que você conheça bem o seu hardware antes de começar e que já tenha feito um *hackintosh* antes, pois não nos aprofundaremos muito aqui.

> Qual a melhor maneira de descobrir se o meu computador é suportado?

Acessando a página de [**Limitações de Hardware**](macos-limits.md) para obter melhores informações sobre o que o macOS necessita para iniciar. O suporte de hardware entre o Clover e o OpenCore é bastante similar.

> Quais são os jeitos de descobrir que tipo de hardware eu tenho?

Acesse a página [Descobrindo Especificações](./find-hardware.md) para saber mais.

[[toc]]

## Drivers de Firmware

Drivers de firmware são os os drivers usados pelo OpenCore no ambiente UEFI. Eles são exigidos principalmente para iniciar um computador. Funcionam tanto extendendo as habilidades de correção do OpenCore quanto exibindo diferentes tipos de unidades no seletor do OpenCore (como partições em HFS).

* **Observação Sobre o Local**: Esses arquivos **precisam** ser colocados na pasta `EFI/OC/Drivers/`.

### Todos os Computadores

::: tip Drivers Necessários

Para a maioria dos computadores, só serão necessários dois drivers `.efi` para começar:

* [HfsPlus.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi)(<span style="color:red">Exigido</span>)
  * Necessário para exibir volumes HFS (ex.: Instaladores do macOS e partições/imagens de Recuperação). **Não instale junto com outros drivers HFS.**
  * Para computadores com CPUs Sandy Bridge ou mais antigas e CPUs Ivy Bridge de entrada (i3 e Celerons), veja a seção de computadores antigos abaixo.
* [OpenRuntime.efi](https://github.com/acidanthera/OpenCorePkg/releases)(<span style="color:red">Exigido</span>)
  * Substituto para o [AptioMemoryFix.efi](https://github.com/acidanthera/AptioFixPkg) e usado como uma extensão do OpenCore para ajudar na aplicação de patches no boot.efi, para aplicar correções na NVRAM e para obter um melhor gerenciamento de memória.
  * Lembrete: é distribuindo junto com o OpenCorePkg, que foi baixado anteriormente.

:::

### Computadores Antigos

Além do descrito acima, se o computador não suporta UEFI (geralmente 2011 ou mais antigo) então será necessário instalar os arquivos a seguir. Preste bastante atenção em cada um deles, pois talvez não seja preciso usar os quatro ao mesmo tempo.

* [OpenUsbKbDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases)
  * Usado pelo seletor do OpenCore em **computadores antigos que usarão o DuetPkg**, [não recomendado e até mesmo perigoso em firmwares UEFI (Ivy Bridge e mais novos)](https://applelife.ru/threads/opencore-obsuzhdenie-i-ustanovka.2944066/page-176#post-856653).
* [HfsPlusLegacy.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlusLegacy.efi)
  * É a variante do driver HfsPlus.efi usada em computadores que não possuem suporte à instrução RDRAND. Geralmente visto em computadores que usam CPUs Sandy Bridge ou mais antigos e CPUs Ivy Bridge de entrada (i3 e Celerons).
  * Não instale esse driver junto com o HfsPlus.efi (o normal). Escolha somente um deles dependendo do hardware.
* [OpenPartitionDxe](https://github.com/acidanthera/OpenCorePkg/releases)
  * Necessário para iniciar a partição de Recuperação do OS X 10.7 Lion ao OS X 10.9 Mavericks.
    * Este arquivo é distribuído junto com o OpenCorePkg e pode ser encontrado na pasta `EFI/OC/Drivers`.
    * Observação: Usuários do OpenDuet (isto é, sem UEFI) terão este driver já integrado, excluíndo sua necessidade.
  * Desnecessário para o OS X 10.10 Yosemite ou mais novo.

Esses arquivos deverão ser colocados na pasta `Driver`, dentro da sua EFI.

::: details Especificidades sobre 32 bits

Para aqueles que possuem CPUs de 32 bits, será necessário baixar estes drivers também:

* [HfsPlus32](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus32.efi)
  * Alternativa ao HfsPlusLegacy, mas para CPUs de 32 bits. Não instale este driver junto com os outros drivers de HFS.

:::

## Kexts

Uma kext é uma extensão de kernel (**k**ernel **ext**ension). É equivalente do macOS aos drivers de dispositivos encontrados no Windows. Elas deverão ser colocas na pasta Kexts, dentro da sua EFI.

* **Observação sobre Windows e Linux**: As kexts serão exibidas como pastas normais nesses sistemas operacionais. **Verifique mais de uma vez** se a pasta que está copiando para a EFI possui uma extensão .kext visível (e não adicione uma se estiver faltando).
  * Se uma kext também incluir um arquivo `.dSYM`, fique à vontade para deletá-lo. Eles só são úteis para o *debugging* pelos desenvolvedores.
* **Observação sobre Local**: Estes arquivos **precisam** ser colocados na pasta `EFI/OC/Kexts/`.

Todas as kexts listadas abaixo podem ser encontradas **pré compiladas** no [repositório de kexts](http://kexts.goldfish64.com/). As kexts de lá são compiladas toda vez em que há um novo *commit*.

### Necessárias

::: tip Kexts Necessárias

Sem as duas abaixo, nenhum *hackintosh* inicia:

* [VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases)(<span style="color:red">Exigida</span>)
  * Emula o chip SMC encontrado nos Macs de verdade, sem ela o macOS não iniciará.
  * Uma alternativa é a FakeSMC, que possui suporte inconsistente. É mais utilizada em computadores antigos.
  * Necessita do Mac OS X 10.6 Snow Leopard ou mais novo.
* [Lilu](https://github.com/acidanthera/Lilu/releases)(<span style="color:red">Exigida</span>)
  * Uma kext para corrigir muitos processos, exigida pela AppleALC, WhateverGreen, VirtualSMC e muitas outras kexts. Sem a Lilu, as outras kexts não funcionarão.
  * Observe que a Lilu e seus plugins precisam do OS X 10.8 Mountain Lion ou mais novo para funcionar.

::: details Kexts Antigas Necessárias

Para aqueles planejando usar o OS X 10.7 Lion ou versões mais antigas em computadores de 32 bits, será necessário utilizar as kexts abaixo no lugar do VirtualSMC:

* [FakeSMC-32](https://github.com/khronokernel/Legacy-Kexts/blob/master/32Bit-only/Zip/FakeSMC-32.kext.zip?raw=true)

Lembrete: se não deseja usar esses sistemas antigos, ignore esta kext.

* **Observação sobre o Mac OS X 10.4 Tiger e 10.5 Leopard**: Mesmo em CPUs de 64 bits, o espaço do kernel nesses sistemas ainda é em 32 bits. Então é recomendado utilizar o FakeSMC-32 junto com o VirtualSMC. Configure a opção `Arch` do FakeSMC-32 para `i386` e do VirtualSMC para `x86_64`. Isso será abordado melhor em outras partes deste guia.

:::

### Plugins do VirtualSMC

Os plugins abaixo não são necessários para iniciar o macOS, somente adicionam funcionalidades extras ao sistema (como monitoramento de hardware). Observe que, enquanto o VirtualSMC suporta o Mac OS X 10.6 Snow Leopard, os plugins talvez exijam OS X 10.8 Mountain Lion:

* SMCProcessor.kext
  * Usada para monitorar a temperatura da CPU, **não funciona em computadores AMD**.
* SMCSuperIO.kext
  * Usada para monitorar a velocidade das ventoinhas, **não funciona em computadores AMD**.
* SMCLightSensor.kext
  * Usada pelo sensor de luz ambiente em notebooks, **usuários de desktop podem ignorar**.
  * Não utilize-a caso não possua um sensor de luz ambiente. Ela pode causar problemas.
* SMCBatteryManager.kext
  * Usada para medir os níveis de bateria em notebooks, **usuários de desktop podem ignorar**.
* SMCDellSensors.kext
  * Permite um monitoramento e controle mais detalhado das ventoinhas em computadores da Dell que suportam o System Management Mode (SMM).
  * **Não a utilize caso não possua um computador da Dell suportado**. Geralmente, os mais beneficiados são usuário de notebooks Dell.

### Gráficos

* [WhateverGreen](https://github.com/acidanthera/WhateverGreen/releases)(<span style="color:red">Exigida</span>)
  * Usada para aplicar patches de DRM, boardID, correções de *framebuffer*, entre outras coisas. Todas as GPUs se beneficiam por usarem essa kext.
  * Observe que o arquivo SSDT-PNLF.dsl incluído só é necessário para notebooks e computadores do tipo *All in One*. Veja mais inforamaçoes no guia [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/).
  * Necessita do OS X 10.8 Mountain Lion ou mais novo.

### Áudio

* [AppleALC](https://github.com/acidanthera/AppleALC/releases)
  * Usada para aplicar patches na AppleHDA, permitindo suporte para a maioria dos controladores de áudio integrados.
  * Usuários de AMD 15h/16h podem ter problemas com ela, e computadores com Ryzen/Threadripper raramente conseguem suporte ao microfone.
  * Necessita do OS X 10.8 Mountain Lion ou mais novo.
  
::: details Kext de Áudio Antiga

Aqueles que planejam usar o OS X 10.7 Lion ou versões mais antigas talvez queiram optar por usar essas kexts em vez da AppleALC:

* [VoodooHDA](https://sourceforge.net/projects/voodoohda/)
  * Necessita do OS X 10.6 Snow Leopard ou mais novo.
  
* [VoodooHDA-FAT](https://github.com/khronokernel/Legacy-Kexts/blob/master/FAT/Zip/VoodooHDA.kext.zip)
  * Similar à de cima, porém suporta kernels (kérneis?) de 32 e 64 bits. É perfeita para usar no Mac OS X 10.4 Tiger e no 10.5 Leopard.

:::

### Ethernet

Será presumido que o modelo do controlador Ethernet que o seu computador possui é conhecido, mas lembre-se que o manual de usuário ou o site do fabricante também podem fornecer informações a respeito do modelo que seu computador possui.

* [IntelMausi](https://github.com/acidanthera/IntelMausi/releases)
  * Necessária para a maioria dos controladores Intel. Chipsets baseados no I211 precisam da  SmallTreeIntel82576.kext.
  * Controladores Intel 82578, 82579, I217, I218 e I219 são oficialmente suportados.
  * Necessitam do OS X 10.9 Mavericks ou mais novo. Usuários do Mac OS X 10.6 Snow Leopard ao OS X 10.8 Mountain Lion podem usar a IntelSnowMausi, feita para versões mais antigas.
* [SmallTreeIntel82576](https://github.com/khronokernel/SmallTree-I211-AT-patch/releases)
  * Necessária para controladores I211. Baseada na kext SmallTree, mas corrigida para suportar o modelo I211.
  * Necessária na maioria das placas AMD que usam controladores da Intel.
  * Versões e macOS suportados:
    * Versão 1.0.6: funciona do OS X 10.9 Mavericks ao macOS 10.12 Sierra.
    * Versão 1.2.5: funciona do macOS 10.13 High Sierra ao 10.14 Mojave.
    * Versão 1.3.0: funciona do macOS 10.15 Catalina em diante.
* [AtherosE2200Ethernet](https://github.com/Mieze/AtherosE2200Ethernet/releases)
  * Necessária para todos os controladores da marca Atheros e Killer.
  * Necessita do OS X 10.8 Mountain Lion ou mais novo.
  * Observação: modelos Atheros Killer E2500 na verdade são baseados em chipsets Realtek. Para esses controladores, utilize a kext [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases).
* [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)
  * Para controladores Realtek Gigabit Ethernet.
  * Versões e macOS suportados:
    * Versão 2.2.0 ou anteriores: a partir do OS X 10.8 Mountain Lion.
    * Versões 2.2.2 até 2.3.0: a partir do macOS 10.12 Sierra.
    * Versão 2.4.0: a partir do macOS 10.14 Mojave.
  * **Observação:** Às vezes a última versão da kext pode não funcionar com o seu controlador. Caso observe problemas, tente utilizar versões mais antigas.
* [LucyRTL8125Ethernet](https://www.insanelymac.com/forum/files/file/1004-lucyrtl8125ethernet/)
  * Para controladores Realtek 2.5Gb Ethernet.
  * Necessita do macOS 10.15 Catalina ou mais novo.
* Para controladores Intel I225-V, os patches são mencionados na seção de desktops [Comet Lake DeviceProperties](config.plist/comet-lake.md#deviceproperties). Nenhuma kext é requerida.
  * Necessita do macOS 10.15 Catalina ou mais novo.
* Para controladores Intel I350, os patches são mencionados na seção HEDT do [Sandy e Ivy Bridge-E DeviceProperties](config-HEDT/ivy-bridge-e.md#deviceproperties). Nenhuma kext é requerida.
  * Necessita do OS X 10.10 Yosemite ou mais novo.

::: details Kexts de Ethernet Antigas

Relevante para instalações de Mac OS X antigas ou hardware de PCs mais velhos.

* [AppleIntele1000e](https://github.com/chris1111/AppleIntelE1000e/releases)
  * Relevante principalmente para controladores Ethernet Intel de 10/100MBe.
  * Necessita do Mac OS X 10.6 Snow Leopard ou mais novo.
* [RealtekRTL8100](https://www.insanelymac.com/forum/files/file/259-realtekrtl8100-binary/)
  * Relevante principalmente para controladores Ethernet Realtek de 10/100MBe.
  * Necessita do macOS 10.12 Sierra ou mais novo para versões superiores a 2.0.0.
* [BCM5722D](https://github.com/chris1111/BCM5722D/releases)
  * Relevante principalmente para controladores Broadcom baseados no chipset BCM5722.
  * Necessitam do Max OS X 10.6 Snow Leopard ou mais novo.

:::

E também lembre-se que alguns controladores Ethernet são suportados nativamente pelo macOS:

::: details Controladores Ethernet Nativos

#### Série Aquantia

```md
# AppleEthernetAquantiaAqtion.kext
pci1d6a,1    = Aquantia AQC107
pci1d6a,d107 = Aquantia AQC107
pci1d6a,7b1  = Aquantia AQC107
pci1d6a,80b1 = Aquantia AQC107
pci1d6a,87b1 = Aquantia AQC107
pci1d6a,88b1 = Aquantia AQC107
pci1d6a,89b1 = Aquantia AQC107
pci1d6a,91b1 = Aquantia AQC107
pci1d6a,92b1 = Aquantia AQC107
pci1d6a,c0   = Aquantia AQC113
pci1d6a,4c0  = Aquantia AQC113
```

**Observação**: Devido a alguns firmwares desatualizados distribuidos com muitos controladores Aquantia, talvez seja necessário atualizá-las para o firmware mais novo em um sistema Linux ou Windows para garantir que o controlador seja compatível com o macOS.

#### Série Intel

```md
# AppleIntel8254XEthernet.kext
pci8086,1096 = Intel 80003ES2LAN
pci8086,100f = Intel 82545EM
pci8086,105e = Intel 82571EB/82571GB

# AppleIntelI210Ethernet.kext
pci8086,1533 = Intel I210
pci8086,15f2 = Intel I225LM (Added in macOS 10.15)

# Intel82574L.kext
pci8086,104b = Intel 82566DC
pci8086,10f6 = Intel 82574L

```

#### Série Broadcom

```md
# AppleBCM5701Ethernet.kext
pci14e4,1684 = Broadcom BCM5764M
pci14e4,16b0 = Broadcom BCM57761
pci14e4,16b4 = Broadcom BCM57765
pci14e4,1682 = Broadcom BCM57762
pci14e4,1686 = Broadcom BCM57766
```

:::

### USB

* [USBInjectAll](https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/)
  * Usada para injetar controladores Intel USB em computadores que não possuem as portas USB definidas na ACPI.
  * Não deve ser necessária em desktops Skylake e mais novos.
    * Placas AsRock são burras e precisam dela.
    * No entanto, recomenda-se utilizá-la em notebooks Coffee Lake e mais antigos.
  * Não funciona em CPUs AMD **de jeito nenhum**.
  * Necessita do OS X 10.11 El Capitan ou mais novo.

* [XHCI-unsupported](https://github.com/RehabMan/OS-X-USB-Inject-All)
  * Necessária para controladores USB não nativos.
  * Computadores baseados em CPUs AMD não precisam dela.
  * Chipsets comuns que precisam:
    * H370
    * B360
    * H310
    * Z390 (desnecessário no macOS 10.14 Mojave e mais novo)
    * X79
    * X99
    * Placas AsRock (especificamente em placas-mãe Intel, placas B460/Z490 ou mais novas, no entanto, não precisam)

### Wi-Fi e Bluetooth

#### Intel

* [AirportItlwm](https://github.com/OpenIntelWireless/itlwm/releases)
  * Adds support for a large variety of Intel wireless cards and works natively in recovery thanks to IO80211Family integration
  * Requires macOS 10.13 or newer and requires Apple's Secure Boot to function correctly
* [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware/releases)
  * Adds Bluetooth support to macOS when paired with an Intel wireless card
  * Requires macOS 10.13 or newer

::: details More info on enabling AirportItlwm

To enable AirportItlwm support with OpenCore, you'll need to either:

* Enable `Misc -> Security -> SecureBootModel` by either setting it as `Default` or some other valid value
  * This is discussed both later on in this guide and in the post-install guide: [Apple Secure Boot](https://dortania.github.io/OpenCore-Post-Install/universal/security/applesecureboot.html)
* If you cannot enable SecureBootModel, you can still force inject IO80211Family(**Highly discouraged**)
  * Set the following under `Kernel -> Force` in your config.plist(discussed later in this guide):
  
![](./images/ktext-md/force-io80211.png)

:::

#### Broadcom

* [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases)
  * Used for patching non-Apple/non-Fenvi Broadcom cards, **will not work on Intel, Killer, Realtek, etc**
  * Requires OS X 10.10 or newer
  * For Big Sur see [Big Sur Known Issues](./extras/big-sur#known-issues) for extra steps regarding AirPortBrcm4360 drivers.
* [BrcmPatchRAM](https://github.com/acidanthera/BrcmPatchRAM/releases)
  * Used for uploading firmware on Broadcom Bluetooth chipset, required for all non-Apple/non-Fenvi Airport cards.
  * To be paired with BrcmFirmwareData.kext
    * BrcmPatchRAM3 for 10.15+ (must be paired with BrcmBluetoothInjector)
    * BrcmPatchRAM2 for 10.11-10.14
    * BrcmPatchRAM for 10.8-10.10

::: details BrcmPatchRAM Load order

The order in `Kernel -> Add` should be:

1. BrcmBluetoothInjector
2. BrcmFirmwareData
3. BrcmPatchRAM3

However ProperTree will handle this for you, so you need not concern yourself

:::

### AMD CPU Specific kexts

* [XLNCUSBFIX](https://cdn.discordapp.com/attachments/566705665616117760/566728101292408877/XLNCUSBFix.kext.zip)
  * USB fix for AMD FX systems, not recommended for Ryzen
  * Requires macOS 10.13 or newer
* [VoodooHDA](https://sourceforge.net/projects/voodoohda/)
  * Audio for FX systems and front panel Mic+Audio support for Ryzen system, do not mix with AppleALC. Audio quality is noticeably worse than AppleALC on Zen CPUs
  * Requires OS X 10.6 or newer

### Extras

* [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  * Useful starting with Catalina to disable the AppleMCEReporter kext which will cause kernel panics on AMD CPUs and dual-socket systems
  * Affected SMBIOS:
    * MacPro6,1
    * MacPro7,1
    * iMacPro1,1
  * Requires macOS 10.15 or newer
* [CpuTscSync](https://github.com/lvs1974/CpuTscSync/releases)
  * Needed for syncing TSC on some of Intel's HEDT and server motherboards, without this macOS may be extremely slow or even unbootable.
  * **Does not work on AMD CPUs**
  * Requires OS X 10.8 or newer
* [NVMeFix](https://github.com/acidanthera/NVMeFix/releases)
  * Used for fixing power management and initialization on non-Apple NVMe
  * Requires macOS 10.14 or newer
* [SATA-Unsupported](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/SATA-unsupported.kext.zip)
  * Adds support for a large variety of SATA controllers, mainly relevant for laptops which have issues seeing the SATA drive in macOS. We recommend testing without this first.
  * macOS Big Sur Note: [CtlnaAHCIPort](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip) will need to be used instead due to numerous controllers being dropped from the binary itself
    * Catalina and older need not concern

::: details Legacy SATA Kexts

* [AHCIPortInjector](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/AHCIPortInjector.kext.zip)
  * Legacy SATA/AHCI injector, mainly relevant for older machines of the Penryn era
* [ATAPortInjector](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/ATAPortInjector.kext.zip)
  * Legacy ATA injector, mainly relevant for IDE and ATA devices(ie. when no AHCI option is present in the BIOS)
  
:::

### Laptop Specifics

To figure out what kind of keyboard and trackpad you have, check Device Manager in Windows or `dmesg | grep -i input` in Linux

#### Input drivers

* [VoodooPS2](https://github.com/acidanthera/VoodooPS2/releases)
  * For systems with PS2 keyboards, mice, and trackpads
  * Requires macOS 10.11 or newer for MT2 (Magic Trackpad 2) functions
* [RehabMan's VoodooPS2](https://bitbucket.org/RehabMan/os-x-voodoo-ps2-controller/downloads/)
  * For older systems with PS2 keyboards, mice, and trackpads, or when you don't want to use VoodooInput
  * Supports macOS 10.6+ support
* [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases/)
  * For systems with Synaptics SMBus-based devices, mainly for trackpads and trackpoints.
  * Requires macOS 10.11 or newer for MT2 functions
* [VoodooSMBus](https://github.com/VoodooSMBus/VoodooSMBus/releases)
  * For systems with ELAN SMBus-based devices, mainly for trackpads and trackpoints.
  * Supports macOS 10.14 or newer currently
* [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C/releases)
  * Used for fixing I2C devices, found with some fancier touchpads and touchscreen machines
  * Requires macOS 10.11 or newer for MT2 functions
::: details VoodooI2C Plugins
| Connection type | Plugin | Notes |
| :--- | :--- | :--- |
| Microsoft HID | VoodooI2CHID | Can be used to support some USB touchscreens as well |
| ELAN Proprietary | VoodooI2CElan | ELAN1200+ require VoodooI2CHID instead |
| Synaptics Proprietary | VoodooI2CSynaptics | Synaptics F12 protocol require VoodooI2CHID instead |
| ^^ | VoodooRMI | Supports Synaptics protocols F12/F3A - These generally support Microsoft's HID standard so you should attempt using VoodooI2CHID first |
| FTE1001 touchpad | VoodooI2CFTE | |
| Atmel Multitouch Protocol | VoodooI2CAtmelMXT | |
:::

#### Misc

* [ECEnabler](https://github.com/1Revenger1/ECEnabler/releases)
  * Fixes reading battery status on many devices (Allows reading EC fields over 8 bits long)
* [BrightnessKeys](https://github.com/acidanthera/BrightnessKeys/releases)
  * Fixes brightness keys automatically

Please refer to [Kexts.md](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Kexts.md) for a full list of supported kexts

## SSDTs

So you see all those SSDTs in the AcpiSamples folder and wonder whether you need any of them. For us, we will be going over what SSDTs you need in **your specific ACPI section of the config.plist**, as the SSDTs you need are platform specific. With some even system specific where they need to be configured and you can easily get lost if I give you a list of SSDTs to choose from now.

[Getting started with ACPI](https://dortania.github.io/Getting-Started-With-ACPI/) has an extended section on SSDTs including compiling them on different platforms.

A quick TL;DR of needed SSDTs(This is source code, you will have to compile them into a .aml file):

### Desktop

| Platforms | **CPU** | **EC** | **AWAC** | **NVRAM** | **USB** |
| :-------: | :-----: | :----: | :------: | :-------: | :-----: |
| Penryn | N/A | [SSDT-EC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | N/A | N/A | N/A |
| Lynnfield and Clarkdale | ^^ | ^^ | ^^ | ^^ | ^^ |
| SandyBridge | [CPU-PM](https://dortania.github.io/OpenCore-Post-Install/universal/pm.html#sandy-and-ivy-bridge-power-management) (Run in Post-Install) | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://dortania.github.io/Getting-Started-With-ACPI/Universal/plug.html) | ^^ | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | ^^ | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake | ^^ | ^^ | [SSDT-AWAC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/awac.html) | [SSDT-PMC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/nvram.html) | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | N/A | [SSDT-RHUB](https://dortania.github.io/Getting-Started-With-ACPI/Universal/rhub.html) |
| AMD (15/16h) | N/A | ^^ | N/A | ^^ | N/A |
| AMD (17/19h) | [SSDT-CPUR for B550 and A520](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-CPUR.aml) | ^^ | ^^ | ^^ | ^^ |

### High End Desktop

| Platforms | **CPU** | **EC** | **RTC** | **PCI** |
| :-------: | :-----: | :----: | :-----: | :-----: |
| Nehalem and Westmere | N/A | [SSDT-EC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | N/A | N/A |
| Sandy Bridge-E | ^^ | ^^ | ^^ | [SSDT-UNC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/unc0) |
| Ivy Bridge-E | ^^ | ^^ | ^^ | ^^ |
| Haswell-E | [SSDT-PLUG](https://dortania.github.io/Getting-Started-With-ACPI/Universal/plug.html) | [SSDT-EC-USBX](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | [SSDT-RTC0-RANGE](https://dortania.github.io/Getting-Started-With-ACPI/Universal/awac.html) | ^^ |
| Broadwell-E | ^^ | ^^ | ^^ | ^^ |
| Skylake-X | ^^ | ^^ | ^^ | N/A |

### Laptop

| Platforms | **CPU** | **EC** | **Backlight** | **I2C Trackpad** | **AWAC** | **USB** | **IRQ** |
| :-------: | :-----: | :----: | :-----------: | :--------------: | :------: | :-----: | :-----: |
| Clarksfield and Arrandale | N/A | [SSDT-EC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | [SSDT-PNLF](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) | N/A | N/A | N/A | [IRQ SSDT](https://dortania.github.io/Getting-Started-With-ACPI/Universal/irq.html) |
| SandyBridge | [CPU-PM](https://dortania.github.io/OpenCore-Post-Install/universal/pm.html#sandy-and-ivy-bridge-power-management) (Run in Post-Install) | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://dortania.github.io/Getting-Started-With-ACPI/Universal/plug.html) | ^^ | ^^ | [SSDT-GPI0](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/trackpad.html) | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](https://dortania.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | ^^ | ^^ | ^^ | ^^ | N/A |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake (8th Gen) and Whiskey Lake | ^^ | ^^ | [SSDT-PNLF-CFL](https://dortania.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) | ^^ | [SSDT-AWAC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/awac.html) | ^^ | ^^ |
| Coffee Lake (9th Gen) | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ice Lake | ^^ | ^^ | ^^ | ^^ | ^^ | [SSDT-RHUB](https://dortania.github.io/Getting-Started-With-ACPI/Universal/rhub.html) | ^^ |

Continuing:

| Platforms | **NVRAM** | **IMEI** |
| :-------: | :-------: | :------: |
|  Clarksfield and Arrandale | N/A | N/A |
| Sandy Bridge | ^^| [SSDT-IMEI](https://dortania.github.io/Getting-Started-With-ACPI/Universal/imei.html) |
| Ivy Bridge | ^^ | ^^ |
| Haswell | ^^ | N/A |
| Broadwell | ^^ | ^^ |
| Skylake | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ |
| Coffee Lake (8th Gen) and Whiskey Lake | ^^ | ^^ |
| Coffee Lake (9th Gen) | [SSDT-PMC](https://dortania.github.io/Getting-Started-With-ACPI/Universal/nvram.html) | ^^ |
| Comet Lake | N/A | ^^ |
| Ice Lake | ^^ | ^^ |

# Now with all this done, head to [Getting Started With ACPI](https://dortania.github.io/Getting-Started-With-ACPI/)
