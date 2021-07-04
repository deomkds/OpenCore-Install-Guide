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
  * Desnecessário para o OS X 10.10 Yosemite ou superior.

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
  * Necessita do Mac OS X 10.6 Snow Leopard ou superior.
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
  * Necessita do OS X 10.8 Mountain Lion ou superior.

### Áudio

* [AppleALC](https://github.com/acidanthera/AppleALC/releases)
  * Usada para aplicar patches na AppleHDA, permitindo suporte para a maioria dos controladores de áudio integrados.
  * Usuários de AMD 15h/16h podem ter problemas com ela, e computadores com Ryzen/Threadripper raramente conseguem suporte ao microfone.
  * Necessita do OS X 10.8 Mountain Lion ou superior.
  
::: details Kext de Áudio Antiga

Aqueles que planejam usar o OS X 10.7 Lion ou versões mais antigas talvez queiram optar por usar essas kexts em vez da AppleALC:

* [VoodooHDA](https://sourceforge.net/projects/voodoohda/)
  * Necessita do OS X 10.6 Snow Leopard ou superior.
  
* [VoodooHDA-FAT](https://github.com/khronokernel/Legacy-Kexts/blob/master/FAT/Zip/VoodooHDA.kext.zip)
  * Similar à de cima, porém suporta kernels (kérneis?) de 32 e 64 bits. É perfeita para usar no Mac OS X 10.4 Tiger e no 10.5 Leopard.

:::

### Ethernet

Será presumido que o modelo do controlador Ethernet que o seu computador possui é conhecido, mas lembre-se que o manual de usuário ou o site do fabricante também podem fornecer informações a respeito do modelo que seu computador possui.

* [IntelMausi](https://github.com/acidanthera/IntelMausi/releases)
  * Necessária para a maioria dos controladores Intel. Chipsets baseados no I211 precisam da  SmallTreeIntel82576.kext.
  * Controladores Intel 82578, 82579, I217, I218 e I219 são oficialmente suportados.
  * Necessitam do OS X 10.9 Mavericks ou superior. Usuários do Mac OS X 10.6 Snow Leopard ao OS X 10.8 Mountain Lion podem usar a IntelSnowMausi, feita para versões mais antigas.
* [SmallTreeIntel82576](https://github.com/khronokernel/SmallTree-I211-AT-patch/releases)
  * Necessária para controladores I211. Baseada na kext SmallTree, mas corrigida para suportar o modelo I211.
  * Necessária na maioria das placas AMD que usam controladores da Intel.
  * Versões e macOS suportados:
    * Versão 1.0.6: funciona do OS X 10.9 Mavericks ao macOS 10.12 Sierra.
    * Versão 1.2.5: funciona do macOS 10.13 High Sierra ao 10.14 Mojave.
    * Versão 1.3.0: funciona do macOS 10.15 Catalina em diante.
* [AtherosE2200Ethernet](https://github.com/Mieze/AtherosE2200Ethernet/releases)
  * Necessária para todos os controladores da marca Atheros e Killer.
  * Necessita do OS X 10.8 Mountain Lion ou superior.
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
  * Necessita do macOS 10.15 Catalina ou superior.
* Para controladores Intel I225-V, os patches são mencionados na seção de desktops [Comet Lake DeviceProperties](config.plist/comet-lake.md#deviceproperties). Nenhuma kext é requerida.
  * Necessita do macOS 10.15 Catalina ou superior.
* Para controladores Intel I350, os patches são mencionados na seção HEDT do [Sandy e Ivy Bridge-E DeviceProperties](config-HEDT/ivy-bridge-e.md#deviceproperties). Nenhuma kext é requerida.
  * Necessita do OS X 10.10 Yosemite ou superior.

::: details Kexts de Ethernet Antigas

Relevante para instalações de Mac OS X antigas ou hardware de PCs mais velhos.

* [AppleIntele1000e](https://github.com/chris1111/AppleIntelE1000e/releases)
  * Relevante principalmente para controladores Ethernet Intel de 10/100MBe.
  * Necessita do Mac OS X 10.6 Snow Leopard ou superior.
* [RealtekRTL8100](https://www.insanelymac.com/forum/files/file/259-realtekrtl8100-binary/)
  * Relevante principalmente para controladores Ethernet Realtek de 10/100MBe.
  * Necessita do macOS 10.12 Sierra ou mais novo para versões superiores a 2.0.0.
* [BCM5722D](https://github.com/chris1111/BCM5722D/releases)
  * Relevante principalmente para controladores Broadcom baseados no chipset BCM5722.
  * Necessitam do Max OS X 10.6 Snow Leopard ou superior.

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
  * Necessita do OS X 10.11 El Capitan ou superior.

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
  * Adiciona suporte para uma grande variedade de placas Wi-Fi da Intel e funciona nativamente no ambiente de Recuperação graças a integração com a IO80211Family.
  * Necessita do macOS 10.13 High Sierra ou mais novo e requer a presença de Inicialização Segura da Apple para funcionar corretamente.
* [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware/releases)
  * Adiciona suporte para o Bluetooth das placas Wi-Fi da Intel no macOS.
  * Necessita do macOS 10.13 High Sierra ou superior.

::: details Mais informações sobre a ativação da AirportItlwm

Para ativar o suporte a AirportItlwm com o OpenCore, será necessário fazer uma das seguintes ações:

* Ativar a Inicialização Segura configurando `Misc -> Security -> SecureBootModel` para `Default` ou algum outro valor válido.
  * Isso será discutido mais tarde neste guia e também no guia de pós-instalação: [Inicialização Segura da Apple](https://deomkds.github.io/OpenCore-Post-Install/universal/security/applesecureboot.html)
* Se não puder ativar o SecureBootModel, ainda será possível injetar à força a kext IO80211Family (**Altamente desencorajado**).
  * Configure `Kernel -> Force` na sua config.plist (será discutido mais tarde neste guia):
  
![](./images/ktext-md/force-io80211.png)

:::

#### Broadcom

* [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases)
  * Usado para corrigir placas Wi-Fi Broadcom que não são da Apple ou da Fenvi. **Não funciona em placas Intel, Killer, Realtek, entre outras.**
  * Necessita do OS X 10.10 Yosemite ou superior.
  * Usuários do macOS 11 Big Sur, vejam os [problemas conhecidos](./extras/big-sur#known-issues) para entender os passos extras necessários relativos aos drivers da AirPortBrcm4360.
* [BrcmPatchRAM](https://github.com/acidanthera/BrcmPatchRAM/releases)
  * Usado para fazer o upload do firmware em chipsets de Bluetooth da Broadcom. Necessário para todas as placas que não são Apple AirPort ou Fenvi.
  * Para ser usado junto com a BrcmFirmwareData.kext:
    * BrcmPatchRAM3 é para macOS 10.15 Catalina ou mais novo (precisa ser usado junto com a BrcmBluetoothInjector).
    * BrcmPatchRAM2 é para OS X 10.11 El Capitan ao macOS 10.14 Mojave.
    * BrcmPatchRAM é para OS X 10.8 Mountain Lion a 10.10 Yosemite.

::: details Ordem de Carregamento da BrcmPatchRAM

A ordem em `Kernel -> Add` deve ser:

1. BrcmBluetoothInjector
2. BrcmFirmwareData
3. BrcmPatchRAM3

No entanto, o ProperTree lidará com isso por conta própria, não precisa se preocupar.

:::

### Kexts Específicas para CPUs AMD

* [XLNCUSBFIX](https://cdn.discordapp.com/attachments/566705665616117760/566728101292408877/XLNCUSBFix.kext.zip)
  * Correção de USB para computadores com CPUs AMD FX. Não recomendado para Ryzen.
  * Necessita do macOS 10.13 High Sierra ou superior.
* [VoodooHDA](https://sourceforge.net/projects/voodoohda/)
  * Fornece áudio para computadores com CPUs FX e corrige o suporte para Microfone e Saída de Áudio no painel frontal em computadores com CPUs Ryzen. Não instale junto com a AppleALC. A qualidade de áudio é perceptivelmente pior do que com a AppleALC em computadores com CPUs Zen.
  * Necessita do OS X 10.6 Snow Leopard ou superior.

### Extras

* [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  * Útil a partir do macOS 10.15 Catalina para desativar a kext AppleMCEReporter que pode causar *kernel panics* em computadores com CPUs AMD e em placas-mãe com dois sockets.
  * SMBIOS afetadas:
    * MacPro6,1
    * MacPro7,1
    * iMacPro1,1
  * Necessita do macOS 10.15 Catalina ou superior.
* [CpuTscSync](https://github.com/lvs1974/CpuTscSync/releases)
  * Necessário para sincronizar o TSC em algumas placas-mãe Intel HEDT e de servidor. Sem isso, o macOS pode ficar extremamente lento ou até mesmo não iniciar.
  * **Não funciona em CPUs AMD.**
  * Necessita do OS X 10.8 Mountain Lion ou superior.
* [NVMeFix](https://github.com/acidanthera/NVMeFix/releases)
  * Usado para corrigir o gerenciamento de energia e a inicialização em SSDs NVMe que não são da Apple.
  * Necessita do macOS 10.14 Mojave ou superior.
* [SATA-Unsupported](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/SATA-unsupported.kext.zip)
  * Adiciona suporte para uma grande variedade de controladores SATA. Relevante principalmente em notebooks nos quais o macOS possui problemas em encontrar as unidades SATA. Recomenda-se testar o macOS sem essa kext antes de instalá-la.
  * Observação sobre o macOS 11 Big Sur: Será necessário usar a kext [CtlnaAHCIPort](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip) no lugar da SATA-Unsupported, devido ao fato de que vários controladores tiveram seu suporte removido dos drivers originais.
    * Não é preciso se preocupar com isso no macOS 10.15 Catalina ou mais antigo.

::: details Kexts de SATA Antigas

* [AHCIPortInjector](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/AHCIPortInjector.kext.zip)
  * Injetor antigo de SATA/AHCI. Relevante principalmente em computadores mais antigos da era Penryn.
* [ATAPortInjector](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/ATAPortInjector.kext.zip)
  * Injetor antigo de ATA. Relevante principalmente para dispositivos IDE e ATA (isto é, quando não existe opção de AHCI na BIOS).
  
:::

### Especificidades de Notebooks

Para descobrir que tipo de teclado e *trackpad* seu computador possui, olhe no Gerenciador de Dispositivos do Windows ou execute o comando `dmesg | grep -i input` no Linux.

#### Drivers de Entrada

* [VoodooPS2](https://github.com/acidanthera/VoodooPS2/releases)
  * Para computadores que utilizam teclados, mouses e *trackpads* com conexão PS2.
  * Necessita do macOS 10.11 El Capitan ou superior para obter as funcionalidades do Magic Trackpad 2.
* [VoodooPS2 do RehabMan](https://bitbucket.org/RehabMan/os-x-voodoo-ps2-controller/downloads/)
  * Para computadores que utilizam teclados, mouses e *trackpads* com conexão PS2, ou quando não quiser usar a VoodooInput.
  * Necessita do Mac OS X 10.6 Snow Leopard ou superior.
* [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases/)
  * Para computadores que possuem dispositivos Synaptics com conexão SMBus. Principalmente *trackpads* e *trackpoints*.
  * Necessita do macOS 10.11 El Capitan ou superior para obter as funcionalidades do Magic Trackpad 2.
* [VoodooSMBus](https://github.com/VoodooSMBus/VoodooSMBus/releases)
  * Para computadores que possuem dispositivos ELAN com conexão SMBus. Principalmente *trackpads* e *trackpoints*.
  * Suporta o macOS 10.14 Mojave ou superior por enquanto.
* [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C/releases)
  * Usado para corrigir dispositivos I2C, como alguns *touchpads* mais chiques e computadores com *touchscreens*.
  * Necessita do macOS 10.11 El Capitan ou superior para obter as funcionalidades do Magic Trackpad 2.
::: details Plugins da VoodooI2C
| Tipo de Conexão | Plugin | Observações |
| :--- | :--- | :--- |
| Microsoft HID | VoodooI2CHID | Pode ser usado para ativar o suporte a certas *touchscreens* USB também. |
| Proprietária da ELAN | VoodooI2CElan | Dispositivos ELAN1200 ou superiores necessitam da VoodooI2CHID, no entanto. |
| Proprietária da Synaptics | VoodooI2CSynaptics | O protocolo F12 da Synaptics necessita da VoodooI2CHID, no entanto. |
| ^^ | VoodooRMI | Suporta os protocolos F12/F3A da Synaptics. No entanto, esses geralmente suportam o padrão HID da Microsoft, então tente usar a VoodooI2CHID antes. |
| Touchpad FTE1001 | VoodooI2CFTE | |
| Protocolo Multitouch Atmel | VoodooI2CAtmelMXT | |
:::

#### Diversas

* [ECEnabler](https://github.com/1Revenger1/ECEnabler/releases)
  * Corrige a exibição do status de bateria em vários computadores diferentes, pois permite a leitura dos campos EC que sejam mais longos que 8 bits.
* [BrightnessKeys](https://github.com/acidanthera/BrightnessKeys/releases)
  * Corrige as teclas de brilho automaticamente.

Por favor, leia o arquivo [Kexts.md](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Kexts.md) (em inglês) para obter uma lista completa de todas as kexts suportadas.

## SSDTs

Então você vê todas aquelas SSDTs na pasta AcpiSamples e imagina se precisa de alguma delas. Neste guia, as SSDTs necessárias serão abordadas **na seção de ACPI específica para a sua config.plist**, pois as SSDTs são específicas de cada plataforma. Algumas até precisam de configuração por parte do usuário e seria muito fácil se perder caso uma lista delas fosse fornecida neste momento.

O guia [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) possui uma seção extensa a respeito de SSDTs, incluíndo informações sobre como compilá-las para diferentes plataformas.

A seguir, veja um resumo rápido sobre as SSDTs necessárias. Os links apontam para o código-fonte delas, que precisam ser compiladas em um arquivo .aml antes de serem usadas.

### Desktop

| Plataforma | **CPU** | **EC** | **AWAC** | **NVRAM** | **USB** |
| :-------: | :-----: | :----: | :------: | :-------: | :-----: |
| Penryn | N/A | [SSDT-EC](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | N/A | N/A | N/A |
| Lynnfield e Clarkdale | ^^ | ^^ | ^^ | ^^ | ^^ |
| SandyBridge | [CPU-PM](https://deomkds.github.io/OpenCore-Post-Install/universal/pm.html#sandy-and-ivy-bridge-power-management)</br>(Execute após a instalação.) | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/plug.html) | ^^ | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | ^^ | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake | ^^ | ^^ | [SSDT-AWAC](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/awac.html) | [SSDT-PMC](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/nvram.html) | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | N/A | [SSDT-RHUB](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/rhub.html) |
| AMD (15/16h) | N/A | ^^ | N/A | ^^ | N/A |
| AMD (17/19h) | [SSDT-CPUR para B550 e A520](https://github.com/deomkds/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-CPUR.aml) | ^^ | ^^ | ^^ | ^^ |

### Desktop de Alta Performance

| Plataforma | **CPU** | **EC** | **RTC** | **PCI** |
| :-------: | :-----: | :----: | :-----: | :-----: |
| Nehalem e Westmere | N/A | [SSDT-EC](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | N/A | N/A |
| Sandy Bridge-E | ^^ | ^^ | ^^ | [SSDT-UNC](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/unc0) |
| Ivy Bridge-E | ^^ | ^^ | ^^ | ^^ |
| Haswell-E | [SSDT-PLUG](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/plug.html) | [SSDT-EC-USBX](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | [SSDT-RTC0-RANGE](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/awac.html) | ^^ |
| Broadwell-E | ^^ | ^^ | ^^ | ^^ |
| Skylake-X | ^^ | ^^ | ^^ | N/A |

### Notebooks

| Plataforma | **CPU** | **EC** | **Luz de Fundo** | **Trackpad I2C** | **AWAC** | **USB** | **IRQ** |
| :-------: | :-----: | :----: | :-----------: | :--------------: | :------: | :-----: | :-----: |
| Clarksfield e Arrandale | N/A | [SSDT-EC](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | [SSDT-PNLF](https://deomkds.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) | N/A | N/A | N/A | [IRQ SSDT](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/irq.html) |
| Sandy Bridge | [CPU-PM](https://deomkds.github.io/OpenCore-Post-Install/universal/pm.html#sandy-and-ivy-bridge-power-management)</br>(Execute após a instalação.) | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/plug.html) | ^^ | ^^ | [SSDT-GPI0](https://deomkds.github.io/Getting-Started-With-ACPI/Laptops/trackpad.html) | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/ec-fix.html) | ^^ | ^^ | ^^ | ^^ | N/A |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake (8ª geração) e Whiskey Lake | ^^ | ^^ | [SSDT-PNLF-CFL](https://deomkds.github.io/Getting-Started-With-ACPI/Laptops/backlight.html) | ^^ | [SSDT-AWAC](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/awac.html) | ^^ | ^^ |
| Coffee Lake (9ª geração) | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ice Lake | ^^ | ^^ | ^^ | ^^ | ^^ | [SSDT-RHUB](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/rhub.html) | ^^ |

Continuando:

| Plataforma | **NVRAM** | **IMEI** |
| :-------: | :-------: | :------: |
|  Clarksfield e Arrandale | N/A | N/A |
| Sandy Bridge | ^^| [SSDT-IMEI](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/imei.html) |
| Ivy Bridge | ^^ | ^^ |
| Haswell | ^^ | N/A |
| Broadwell | ^^ | ^^ |
| Skylake | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ |
| Coffee Lake (8ª geração) e Whiskey Lake | ^^ | ^^ |
| Coffee Lake (9ª geração) | [SSDT-PMC](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/nvram.html) | ^^ |
| Comet Lake | N/A | ^^ |
| Ice Lake | ^^ | ^^ |

## Finalizando

Depois de tudo terminado, acesse o guia [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para continuar com a configuração do OpenCore.
