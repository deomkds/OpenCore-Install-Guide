# Limitações de Hardware

Com o macOS, é preciso estar ciente de que existem muitas limitações de hardware antes de dar o primeiro passo com a instalação. Isso acontece por causa da quantidade limitada de hardware suportado pela Apple, o que nos limita ao que ela vende ou aos patches que a comunidade tenha criado.

As seções sobre hardware a serem verificadas são:

* [CPU](#suporte-de-cpu)
* [GPU](#suporte-de-gpu)
* [Placa-mãe](#suporte-de-placa-mãe)
* [Armazenamento](#suporte-de-armazenamento)
* [Rede Cabeada](#rede-cabeada)
* [Rede Sem Fio](#rede-sem-fio)
* [Diversos](#diversos)

E para guias mais detalhados sobre o assunto, acesse:

* [Guia de Compra de GPUs](https://deomkds.github.io/GPU-Buyers-Guide/)
  * Verifique se sua GPU é suportada e qual versão do macOS está apto a executar.
* [Guia de Compra de Wi-Fi](https://deomkds.github.io/Wireless-Buyers-Guide/)
  * Verifique se sua placa Wi-Fi é suportada.
* [Guia de Compra Anti-Hackintosh](https://deomkds.github.io/Anti-Hackintosh-Buyers-Guide/)
  * Guia geral sobre o que evitar e quais problemas podem ocorrer.

## Suporte de CPU

No quesito CPU, as seguintes características são suportadas:

* CPUs de ambas as arquiteturas, 32 e 64 bits.
  * Isso, no entanto, requer que o sistema ofereça suporte à arquitetura. Veja mais na seção Exigências de CPU abaixo.
* CPUs Intel para desktops.
  * Este guia oferece suporte para processadores Yonah até Comet Lake.
* CPUs Intel de alta performance e para servidores.
  * Este guia oferece suporte para processadores Nehalem até Cascade Lake X.
* Intel's Core "i" and Xeon series laptop CPUs
* CPUs Intel Core "i" e série Xeon para notebooks.
  * Este guia oferece suporte para processadores Arrendale até Ice Lake.
  * Observe que processadores Atom, Celeron e Pentium para notebooks não são suportados.
* CPUs AMD Bulldozer (15h), Jaguar (16h) e Ryzen (17h) para desktops.
  * Processadores AMD para notebooks **não** são suportados.
  * Observe que nem todos os recursos do macOS são suportados em plataformas AMD. Saiba mais a seguir.

**Para informações mais detalhadas, acesse o [Guia de Compra Anti-Hackintosh](https://deomkds.github.io/Anti-Hackintosh-Buyers-Guide/).**

::: details Exigências de CPU

Arquitetura

* CPUs de 32 bits são suportadas do Mac OS X 10.4.1 Tiger ao Mac OS X 10.6.8 Snow Leopard.
  * Observe que o OS X 10.7 Lion exige a execução do espaço de usuário em 64 bits, limitando CPUs de 32 bits ao Mac OS X 10.6 Snow Leopard.
* CPUs de 64 bits são suportadas a partir do Mac OS X 10.4.1 Tiger.

Instruções SSE

* SSE3 é exigido para todas as versões do OS X/macOS para Intel.
* SSSE3 é exigido para todas as versões de 64 bits do OS X/macOS para Intel.
  * Para CPUs que não possuem SSSE3 (ex.: certos Pentiums de 64 bits), é recomendado executar o espaço de usuário em 32 bits por meio do argumento de boot `i386-user32`.
* SSE4 é exigido a partir do macOS 10.12 Sierra.
* SSE4.2 é exigido a partir do macOS 10.14 Mojave.
  * CPUs com SSE4.1 são suportadas com a kext [telemetrap.kext](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/post-28447707).
  * Drivers AMD mais novos também exigem SSE4.2 para habilitar o suporte ao Metal. Para resolver isso, veja: [MouSSE: emulação de SSE4.2](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/).

Firmware

* Mac OS X 10.4.1 Tiger ao 10.4.7 exigem EFI32 (isto é, vesão do OpenCore IA32 (32 bits)).
  * Mac OS X 10.4.8 Tiger ao OS X 10.7.5 Lion suportam tanto EFI32 quanto EFI64.
* A partir do OS X 10.8 Mountain Lion, é exigido EFI64 (isto é, vesão do OpenCore x64 (64 bits))
* OS X 10.7 Lion ao 10.9 Mavericks exigem o driver OpenPartitionDxe.efi para que possam iniciar a partição de recuperação.

Kernel

* OS X 10.4 Tiger e 10.5 Leopard exigem kexts de 32 bits, pois executam o espaço do kernel somente em 32 bits.
  * Mac OS X 10.6 Snow Leopard e OS X 10.7 Lion suportam executar o espaço do kernel tanto em 32 quanto em 64 bits.
* A partir do OS X 10.8 Mountain Lion, são exigidas kexts de 64 bits, pois executam o espaço do kernel somente em 64 bits.
  * Execute o comando `lipo -archs` para saber quais arquiteturas suas kexts suportam (lembre-se de executar este comando diretamente no executável binário e não no pacote .kext).

Limites de Contagem de Núcleos/Threads

* Versões do OS X 10.10 Yosemite e anteriores podem não iniciar caso a CPU possua mais de 24 threads (como evidenciado pelo Kernel Panic `mp_cpus_call_wait() timeout`).
* Versões a partir do OS X 10.11 El Capitan possuem um limite de 64 threads.
* O argumento de boot `cpus=` pode ser usado para contornar o problema, bem como desabilitar o HyperThreading.

Observações Especiais

* A Lilu e seus plug-ins exigem o Mac OS 10.8 Mountain Lion ou superior para funcionar.
  * Recomenda-se utilizar o FakeSMC em versões antigas do OS X.
* Versões do Mac OS X 10.6 Snow Leopard e anteriores exigem que a opção RebuildAppleMemoryMap esteja ativada.
  * Isto serve para resolver um Kernel Panic.

:::

::: details Tabela de CPUs Intel Suportadas

Suporte baseado em kernel (kérneis?) não modificados (vanilla):

| Geração | Suporte Inicial | Suporte Final | Observações | CPUID |
| :--- | :--- | :--- | :--- | :--- |
| [Pentium 4](https://pt.wikipedia.org/wiki/Pentium_4) | 10.4.1 | 10.5.8 | Usado somente em dev-kits. | 0x0F41 |
| [Yonah](https://pt.wikipedia.org/wiki/Pentium_M#Yonah_e_Merom) | 10.4.4 | 10.6.8 | 32 bits | 0x0006E6 |
| [Conroe¹](https://en.wikipedia.org/wiki/Conroe_(microprocessor)), [Merom](https://pt.wikipedia.org/wiki/Pentium_M#Yonah_e_Merom) | 10.4.7 | 10.11.6 | Sem SSE4. | 0x0006F2 |
| [Penryn¹](https://en.wikipedia.org/wiki/Penryn_(microarchitecture)) | 10.4.10 | 10.13.6 | Sem SSE4.2. | 0x010676 |
| [Nehalem](https://pt.wikipedia.org/wiki/Nehalem_(microarquitetura)) | 10.5.6 | <span style="color:green"> Atual </span> | N/A | 0x0106A2 |
| [Lynnfield¹](https://en.wikipedia.org/wiki/Lynnfield_(microprocessor)), [Clarksfield¹](https://en.wikipedia.org/wiki/Clarksfield_(microprocessor)) | 10.6.3 | ^^ | Sem suporte a GPU integrada da Intel em versões a partir do macOS 10.14 Mojave. | 0x0106E0 |
| [Westmere, Clarkdale, Arrandale¹](https://en.wikipedia.org/wiki/Westmere_(microarchitecture)) | 10.6.4 | ^^ | ^^ | 0x0206C0 |
| [Sandy Bridge](https://pt.wikipedia.org/wiki/Sandy_Bridge) | 10.6.7 | ^^ | ^^ | 0x0206A0(M/H) |
| [Ivy Bridge](https://pt.wikipedia.org/wiki/Ivy_Bridge) | 10.7.3 | ^^ | Sem suporte a GPU integrada da Intel em versões a partir do macOS 11 Big Sur. | 0x0306A0(M/H/G) |
| [Ivy Bridge-E5](https://pt.wikipedia.org/wiki/Ivy_Bridge) | 10.9.2 | ^^ | N/A | 0x0306E0 |
| [Haswell](https://pt.wikipedia.org/wiki/Haswell_(microarquitetura)) | 10.8.5 | ^^ | ^^ | 0x0306C0(S) |
| [Broadwell](https://pt.wikipedia.org/wiki/Broadwell_(microarquitetura)) | 10.10.0 | ^^ | ^^ | 0x0306D4(U/Y) |
| [Skylake](https://pt.wikipedia.org/wiki/Skylake_(microarquitetura)) | 10.11.0 | ^^ | ^^ | 0x0506e3(H/S) 0x0406E3(U/Y) |
| [Kaby Lake¹](https://en.wikipedia.org/wiki/Kaby_Lake) | 10.12.4 | ^^ | ^^ | 0x0906E9(H/S/G) 0x0806E9(U/Y) |
| [Coffee Lake¹](https://en.wikipedia.org/wiki/Coffee_Lake) | 10.12.6 | ^^ | ^^ | 0x0906EA(S/H/E) 0x0806EA(U)|
| [Amber¹](https://en.wikipedia.org/wiki/Kaby_Lake#List_of_8th_generation_Amber_Lake_Y_processors), [Whiskey¹](https://en.wikipedia.org/wiki/Whiskey_Lake_(microarchitecture)), [Comet Lake¹](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.14.1 | ^^ | ^^ | 0x0806E0(U/Y) |
| [Comet Lake¹](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.15.4 | ^^ | ^^ | 0x0906E0(S/H)|
| [Ice Lake¹](https://en.wikipedia.org/wiki/Ice_Lake_(microprocessor)) | ^^ | ^^ | ^^ | 0x0706E5(U) |
| [Rocket Lake¹](https://en.wikipedia.org/wiki/Rocket_Lake) | ^^ | ^^ | Exige CPUID de Comet Lake. | 0x0A0671 |
| [Tiger Lake¹](https://en.wikipedia.org/wiki/Tiger_Lake_(microprocessor)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Não testado. </span> | 0x0806C0(U) |

¹Links em inglês devido à falta de tradução.
:::

::: details Limitações de CPUs AMD no macOS


Infelizmente, muitos recursos do macOS são instáveis ou simplesmente não funcionam em processadores AMD. Alguns deles incluem:

* Máquinas virtuais que dependem do AppleHV.
  * Inclui o VMWare, o Parallels, o Docker, o Android Studio, entre outros.
  * O VirtualBox é a única exceção, pelo fato de possuir hypervisor próprio.
  * O VMWare 10 e o Parallels 13.1.0 possuem hypervisor próprio, no entanto, utilizar versões tão desatualizadas desses softwares representa uma grande ameaça à segurança.
* Softwares da Adobe.
  * A maior parte da coleção de aplicativos da Adobe depende do conjunto de instruções Memfast, da Intel, o que resulta em travamentos nas CPUs AMD.
  * É possível desativar certas funcionalidades, como suporte a RAW, para evitar tais travamentos: [Correções para Adobe](https://gist.github.com/naveenkrdy/26760ac5135deed6d0bb8902f6ceb6bd).
* Suporte a arquitetura de 32 bits.
  * Para aqueles que ainda dependem de softwares em 32 bits em versões do macOS 10.14 Mojave e anteriores, observe que os patches vanilla não suportam instruções 32 bits.
  * Uma alternativa é a instalação de um [kernel modificado](https://amd-osx.com/download/kernel.html), no entanto, perde-se o suporte ao iMessage.
* Problemas de estabilidade em muitos aplicativos.
  * Aplicativos de áudio, como o Logic Pro, são os mais vulneráveis a problemas.
  * É sabido que o DaVinci Resolve também apresenta problemas esporádicos.

:::

## Suporte de GPU

Suporte de GPU se torna muito mais complicado devido à existência de uma quantidade quase infinita de placs de vídeo à venda no mercado, mas a regra geral é o que se segue:

* GPUs AMD baseadas em GCN são suportadas na versão mais recente do macOS.
  * APUs da AMD não são suportadas, no entanto.
  * Núcleos AMD baseados em [Lexa](https://www.techpowerup.com/gpu-specs/amd-lexa.g806) da série Polaris também não são suportados.
  * Observação especial para usuários de placas Navi da MSI: [Instalador não funcionando com 5700XT #901](https://github.com/acidanthera/bugtracker/issues/901) (em inglês).
    * Este problema não está mais presente no macOS 11 Big Sur.
* Suporte a GPUs Nvidia é... *complicado*.
  * [Maxwell(9XX)](https://en.wikipedia.org/wiki/GeForce_900_series) and [Pascal(10XX)](https://en.wikipedia.org/wiki/GeForce_10_series) GPUs are limited to macOS 10.13: High Sierra
  * [Nvidia's Turing(20XX,](https://en.wikipedia.org/wiki/GeForce_20_series)[16XX)](https://en.wikipedia.org/wiki/GeForce_16_series) GPUs are **not supported in any version of macOS**
  * [Nvidia's Ampere(30XX)](https://en.wikipedia.org/wiki/GeForce_30_series) GPUs are **not supported in any version of macOS**
  * [Nvidia's Kepler(6XX,](https://en.wikipedia.org/wiki/GeForce_600_series)[7XX)](https://en.wikipedia.org/wiki/GeForce_700_series) GPUs are supported in the latest versions of macOS (including macOS 11 Big Sur)
    * This is due to Apple still supporting a few [MacBook Pros with Nvidia GPUs](https://dortania.github.io/GPU-Buyers-Guide/modern-gpus/nvidia-gpu.html)
* Intel's [GT2+ tier](https://en.wikipedia.org/wiki/Intel_Graphics_Technology) series iGPUs
  * Ivy Bridge through Ice Lake iGPU support is covered in this guide
    * Info on GMA series iGPUs can be found here: [GMA Patching](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/)
  * Note GT2 refers to the tier of iGPU, low-end GT1 iGPUs found on Pentiums, Celerons and Atoms are not supported in macOS

And an important note for **Laptops with discrete GPUs**:

* 90% of discrete GPUs will not work because they are wired in a configuration that macOS doesn't support (switchable graphics). With NVIDIA discrete GPUs, this is usually called Optimus. It is not possible to utilize these discrete GPUs for the internal display, so it is generally advised to disable them and power them off (will be covered later in this guide).
* However, in some cases, the discrete GPU powers any external outputs (HDMI, mini DisplayPort, etc.), which may or may not work; in the case that it will work, you will have to keep the card on and running.
* However, there are some laptops that rarely do not have switchable graphics, so the discrete card can be used (if supported by macOS), but the wiring and setup usually cause issues.

**For a full list of supported GPUs, see the [GPU Buyers Guide](https://dortania.github.io/GPU-Buyers-Guide/)**

::: details Intel GPU Support Chart

| GPU Generation | Initial support | Last supported version | Notes |
| :--- | :--- | :--- | :--- |
| [3rd Gen GMA](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Third_generation) | 10.4.1 | 10.7.5 | [Requires 32-bit kernel and patches](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/legacy-intel/) |
| [4th Gen GMA](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen4) | 10.5.0 | ^^ | ^^ |
| [Arrendale(HD Graphics)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen5) | 10.6.4 | 10.13.6 | Only LVDS is supported, eDP and external outputs are not |
| [Sandy Bridge(HD 3000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen6) | 10.6.7 | ^^ | N/A |
| [Ivy Bridge(HD 4000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.7.3 | 10.15.7 | ^^ |
| [Haswell(HD 4XXX, 5XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.8.5 | <span style="color:green"> Current </span> | ^^ |
| [Broadwell(5XXX, 6XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen8) | 10.10.0 | ^^ | ^^ |
| [Skylake(HD 5XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.11.0 | ^^ | ^^ |
| [Kaby Lake(HD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.12.4 | ^^ | ^^ |
| [Coffee Lake(UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.13.6 | ^^ | ^^ |
| [Comet Lake(UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.15.4 | ^^ | ^^ |
| [Ice Lake(Gx)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen11) | 10.15.4 | ^^ | Requires `-igfxcdc` and `-igfxdvmt` in boot-args |
| [Tiger Lake(Xe)](https://en.wikipedia.org/wiki/Intel_Xe) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> No drivers available </span> |
| [Rocket Lake](https://en.wikipedia.org/wiki/Rocket_Lake) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> No drivers available </span> |

Note: Apple has kept Ivy Bridge's iGPU drivers present in macOS 11, Big Sur, however they are slated for removal. Please be aware they may be removed at a later time.

:::

::: details AMD GPU Support Chart

| GPU Generation | Initial support | Last supported version | Notes |
| :--- | :--- | :--- | :--- |
| [X800](https://en.wikipedia.org/wiki/Radeon_X800_series) | 10.3.x | 10.7.5 | Requires 32 bit kernel |
| [X1000](https://en.wikipedia.org/wiki/Radeon_X1000_series) | 10.4.x | ^^ | N/A |
| [Terascale](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Terascale 2/3](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.6.x | ^^ | ^^ |
| [GCN 1](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.8.3 | <span style="color:green"> Current </span> | ^^ |
| [GCN 2/3](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.10.x | ^^ | ^^ |
| [Polaris 10](https://en.wikipedia.org/wiki/Radeon_RX_400_series), [20](https://en.wikipedia.org/wiki/Radeon_RX_500_series) | 10.12.1 | ^^ | ^^ |
| [Vega 10](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.12.6 | ^^ | ^^ |
| [Vega 20](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.14.5 | ^^ | ^^ |
| [Navi 10](https://en.wikipedia.org/wiki/Radeon_RX_5000_series) | 10.15.1 | ^^ | Requires `agdpmod=pikera` in boot-args |
| [Navi 20](https://en.wikipedia.org/wiki/Radeon_RX_6000_series) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Current drivers do not function </span> |

:::

::: details Nvidia GPU Support Chart

| GPU Generation | Initial support | Last supported version | Notes |
| :--- | :--- | :--- | :--- |
| [GeForce 6](https://en.wikipedia.org/wiki/GeForce_6_series) | 10.2.x | 10.7.5 | Requires 32 bit kernel and [NVCAP patching](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [GeForce 7](https://en.wikipedia.org/wiki/GeForce_7_series) | 10.4.x | ^^ | [Requires NVCAP patching](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [Tesla](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Tesla V2](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)#Tesla_2.0) | 10.5.x | ^^ | ^^ |
| [Fermi](https://en.wikipedia.org/wiki/Fermi_(microarchitecture)) | 10.7.x | ^^ | ^^ |
| [Kepler](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.7.x | <span style="color:green"> Current </span> | N/A |
| [Kepler V2](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.8.x | ^^ | ^^ |
| [Maxwell](https://en.wikipedia.org/wiki/Maxwell_(microarchitecture)) | 10.10.x | 10.13.6 | [Requires webdrivers](https://www.nvidia.com/download/driverResults.aspx/149652/) |
| [Pascal](https://en.wikipedia.org/wiki/Pascal_(microarchitecture)) | 10.12.4 | ^^ | ^^ |
| [Turing](https://en.wikipedia.org/wiki/Turing_(microarchitecture)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> No drivers available </span> |
| [Ampere](https://en.wikipedia.org/wiki/Ampere_(microarchitecture)) | ^^ | ^^ | ^^ |

:::

## Motherboard Support

For the most part, all motherboards are supported as long as the CPU is. Previously, B550 boards had issues:

* [~~AMD's B550 boards~~](https://en.wikipedia.org/wiki/List_of_AMD_chipsets)

However thanks to recent developments, B550 boards are now bootable with the addition of [SSDT-CPUR](https://github.com/naveenkrdy/Misc/blob/master/SSDTs/SSDT-CPUR.dsl). More info will be provided in both [Gathering Files](./ktext.md) and [Zen's config.plist section](./AMD/zen.md)

## Storage Support

For the most part, all SATA based drives are supported and the majority of NVMe drives as well. There are only a few exceptions:

* **Samsung PM981, PM991 and Micron 2200S NVMe SSDs**
  * These SSDs are not compatible out of the box (causing kernel panics) and therefore require [NVMeFix.kext](https://github.com/acidanthera/NVMeFix/releases) to fix these kernel panics. Note that these drives may still cause boot issues even with NVMeFix.kext.
  * On a related note, Samsung 970 EVO Plus NVMe SSDs also had the same problem but it was fixed in a firmware update; get the update (Windows via Samsung Magician or bootable ISO) [here](https://www.samsung.com/semiconductor/minisite/ssd/download/tools/).
  * Also to note, laptops that use [Intel Optane Memory](https://www.intel.com/content/www/us/en/architecture-and-technology/optane-memory.html) or [Micron 3D XPoint](https://www.micron.com/products/advanced-solutions/3d-xpoint-technology) for HDD acceleration are unsupported in macOS. Some users have reported success in Catalina with even read and write support but we highly recommend removing the drive to prevent any potential boot issues.
  
* **Intel 600p**
  * While not unbootable, please be aware this model can cause numerous problems. [Any fix for Intel 600p NVMe Drive? #1286](https://github.com/acidanthera/bugtracker/issues/1286)

## Wired Networking

Virtually all wired network adapters have some form of support in macOS, either by the built-in drivers or community made kexts. The main exceptions:

* Intel I225 2.5Gb NIC
  * Found on high-end Desktop Comet Lake boards
  * Workarounds are possible: [Source](https://www.hackintosh-forum.de/forum/thread/48568-i9-10900k-gigabyte-z490-vision-d-er-läuft/?postID=606059#post606059) and [Example](config.plist/comet-lake.md#deviceproperties)
* Intel I350 1Gb server NIC
  * Normally found on Intel and Supermicro server boards of various generations
  * [Workaround](config-HEDT/ivy-bridge-e.md#deviceproperties)
* Intel 10Gb server NICs
  * Workarounds are possible for [X520 and X540 chipsets](https://www.tonymacx86.com/threads/how-to-build-your-own-imac-pro-successful-build-extended-guide.229353/)
* Mellanox and Qlogic server NICs

## Wireless Networking

Most WiFi cards that come with laptops are not supported as they are usually Intel/Qualcomm. If you are lucky, you may have a supported Atheros card, but support only runs up to High Sierra.

The best option is getting a supported Broadcom card; see the [WiFi Buyer's Guide](https://dortania.github.io/Wireless-Buyers-Guide/) for recommendations.

Note: Intel WiFi is unofficially (3rd party driver) supported on macOS, check [WiFi Buyer's Guide](https://dortania.github.io/Wireless-Buyers-Guide/) for more information about the drivers and supported cards.

## Miscellaneous

* **Fingerprint sensors**
  * There is currently no way to emulate the Touch ID sensor, so fingerprint sensors will not work.
* **Windows Hello Face Recognition**
  * Some laptops come with WHFR that is I2C connected (and used through your iGPU), those will not work.
  * Some laptops come with WHFR that is USB connected, if you're lucky, you may get camera functionality, but nothing else.
* **Intel Smart Sound Technology**
  * Laptops with Intel SST will not have anything connected through them (usually internal mic) work, as it is not supported. You can check with Device Manager on Windows.
* **Headphone Jack Combo**
  * Some laptops with a combo headphone jack may not get audio input through them and will have to either use the built-in microphone or an external audio input device through USB.
* **Thunderbolt USB-C ports**
  * (Hackintosh) Thunderbolt support is currently still iffy in macOS, even more so with Alpine Ridge controllers, which most current laptops have. There have been attempts to keep the controller powered on, which allows Thunderbolt and USB-C hotplug to work, but it comes at the cost of kernel panics and/or USB-C breaking after sleep. If you want to use the USB-C side of the port and be able to sleep, you must plug it in at boot and keep it plugged in.
  * Note: This does not apply to USB-C only ports - only Thunderbolt 3 and USB-C combined ports.
  * Disabling Thunderbolt in the BIOS will also resolve this.
