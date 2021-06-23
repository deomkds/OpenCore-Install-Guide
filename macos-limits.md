# Limitações de Hardware

Com o macOS, é preciso estar ciente de que existem muitas limitações de hardware antes de dar o primeiro passo com a instalação. Isso acontece por causa da quantidade limitada de hardware que a Apple suporta, o que nos limita ao que ela vende ou aos patches que a comunidade cria.

As seguintes seções devem ser observadas:

* [CPU](#suporte-de-cpu)
* [GPU](#suporte-de-gpu)
* [Placa-mãe](#suporte-de-placa-mãe)
* [Armazenamento](#suporte-de-armazenamento)
* [Rede Cabeada](#rede-cabeada)
* [Rede Sem Fio](#rede-sem-fio)
* [Diversos](#diversos)

Para guias mais detalhados sobre o assunto, acesse:

* [Guia de Compra de GPUs](https://deomkds.github.io/GPU-Buyers-Guide/)
  * Veja se a GPU do seu computador é suportada e qual versão do macOS ele está apto para executar.
* [Guia de Compra de Wi-Fi](https://deomkds.github.io/Wireless-Buyers-Guide/)
  * Veja se placa Wi-Fi do seu computador é suportada.
* [Guia de Compra Anti-Hackintosh](https://deomkds.github.io/Anti-Hackintosh-Buyers-Guide/)
  * Guia geral sobre quais peças evitar e quais problemas podem ocorrer.

## Suporte de CPU

No quesito CPU, as seguintes características são suportadas:

* CPUs de ambas as arquiteturas, 32 e 64 bits.
  * Isso, no entanto, requer que o sistema ofereça suporte à arquitetura. Veja mais na seção Exigências de CPU, abaixo.
* CPUs Intel de desktop.
  * Este guia oferece suporte para processadores Yonah a Comet Lake.
* CPUs Intel de alta performance e de servidor.
  * Este guia oferece suporte para processadores Nehalem a Cascade Lake X.
* CPUs Intel Core "i" e série Xeon para notebooks.
  * Este guia oferece suporte para processadores Arrendale a Ice Lake.
  * Observe que processadores para notebooks Atom, Celeron e Pentium não são suportados.
* CPUs AMD Bulldozer (15h), Jaguar (16h) e Ryzen (17h) para desktops.
  * Processadores AMD para notebooks **não** são suportados.
  * Observe que nem todos os recursos do macOS são suportados em plataformas AMD. Saiba mais a seguir.

**Para informações mais detalhadas, acesse o [Guia de Compra Anti-Hackintosh](https://deomkds.github.io/Anti-Hackintosh-Buyers-Guide/).**

::: details Exigências de CPU

**Arquitetura**

* CPUs de 32 bits são suportadas do Mac OS X 10.4.1 Tiger ao Mac OS X 10.6.8 Snow Leopard.
  * Observe que o OS X 10.7 Lion exige a execução do espaço de usuário em 64 bits, limitando CPUs de 32 bits ao Mac OS X 10.6 Snow Leopard.
* CPUs de 64 bits são suportadas a partir do Mac OS X 10.4.1 Tiger.

**Instruções SSE**

* SSE3 é exigido para todas as versões do OS X/macOS Intel.
* SSSE3 é exigido para todas as versões de 64 bits do OS X/macOS Intel.
  * Para CPUs que não possuem SSSE3 (ex.: certos Pentiums de 64 bits), é recomendado executar o espaço de usuário em 32 bits por meio do argumento de boot `i386-user32`.
* SSE4 é exigido a partir do macOS 10.12 Sierra.
* SSE4.2 é exigido a partir do macOS 10.14 Mojave.
  * CPUs com SSE4.1 são suportadas com a kext [telemetrap.kext](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/post-28447707).
  * Drivers AMD mais novos também exigem SSE4.2 para habilitar o suporte ao Metal. Para resolver isso, veja: [MouSSE: emulação de SSE4.2](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/).

**Firmware**

* EFI32 é exigido do Mac OS X 10.4.1 Tiger ao 10.4.7 (isto é, OpenCore de 32 bits (IA32)).
  * Mac OS X 10.4.8 Tiger ao OS X 10.7.5 Lion suportam tanto EFI32 quanto EFI64.
* A partir do OS X 10.8 Mountain Lion, é exigido EFI64 (isto é, OpenCore de 64 bits (x64)).
* O driver OpenPartitionDxe.efi é necessário do OS X 10.7 Lion ao 10.9 Mavericks para que seja possível iniciar a partição de recuperação.

**Kernel**

* Kexts de 32 bits são exigidas do OS X 10.4 Tiger ao 10.5 Leopard, pois executam o espaço do kernel somente em 32 bits.
  * O Mac OS X 10.6 Snow Leopard e o OS X 10.7 Lion suportam executar o espaço do kernel tanto em 32 quanto em 64 bits.
* A partir do OS X 10.8 Mountain Lion, são exigidas kexts de 64 bits, pois executam o espaço do kernel somente em 64 bits.
  * Execute o comando `lipo -archs` para saber quais arquiteturas suas kexts suportam (lembre-se de executar este comando diretamente no binário executável e não no pacote .kext).

**Limitações de Núcleos/Threads**

* Versões do OS X 10.10 Yosemite e anteriores podem não iniciar caso a CPU possua mais de 24 threads (como evidenciado pelo *kernel panic* `mp_cpus_call_wait() timeout`).
* Versões a partir do OS X 10.11 El Capitan possuem um limite máximo de 64 threads.
* O argumento de boot `cpus=` pode ser usado para contornar o problema.
* Desativar o HyperThreading também serve para evitar o problema.

**Observações Especiais**

* A kext Lilu e seus plug-ins exigem o Mac OS 10.8 Mountain Lion ou superior para funcionar.
  * Recomenda-se utilizar o FakeSMC em versões antigas do OS X.
* Versões do Mac OS X 10.6 Snow Leopard e anteriores exigem que a opção `RebuildAppleMemoryMap` esteja ativada.
  * Isto serve para evitar um *kernel panic*.

:::

::: details Tabela de CPUs Intel Suportadas

Lista baseada no suporte de kernel (kérneis?) não modificados (vanilla):

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
  * O VMWare 10 e o Parallels 13.1.0 possuem hypervisor próprio, no entanto, essas versões são antigas e usá-las representa uma grande ameaça à segurança.
* Softwares da Adobe.
  * A maioria dos aplicativos da Adobe dependem do conjunto de instruções Memfast, da Intel, o que resulta em travamentos nas CPUs AMD.
  * É possível desativar certas funcionalidades, como suporte a RAW, para evitar tais travamentos: [Correções para Adobe](https://gist.github.com/naveenkrdy/26760ac5135deed6d0bb8902f6ceb6bd).
* Suporte a arquitetura de 32 bits.
  * Para aqueles que ainda dependem de softwares de 32 bits em versões do macOS 10.14 Mojave e anteriores, observe que os patches vanilla não suportam instruções 32 bits.
  * Uma alternativa é a instalação de um [kernel modificado](https://amd-osx.com/download/kernel.html), no entanto, perde-se o suporte ao iMessage.
* Problemas de estabilidade em muitos aplicativos.
  * Aplicativos de áudio, como o Logic Pro, são os mais vulneráveis a problemas.
  * É sabido que o DaVinci Resolve também apresenta problemas esporádicos.

:::

## Suporte de GPU

Suporte de GPU se torna muito mais complicado devido à existência de uma quantidade quase infinita de placas de vídeo à venda no mercado, mas no geral é o que se segue:

* GPUs AMD baseadas em GCN são suportadas na versão mais recente do macOS.
  * APUs da AMD não são suportadas, no entanto.
  * Núcleos AMD baseados em [Lexa](https://www.techpowerup.com/gpu-specs/amd-lexa.g806) (série Polaris) também não são suportados.
  * Observação especial para usuários de placas Navi da MSI: [Instalador não funcionando com 5700XT #901](https://github.com/acidanthera/bugtracker/issues/901) (em inglês).
    * Este problema não está mais presente no macOS 11 Big Sur.
* Suporte a GPUs Nvidia é... *complicado*.
  * [Maxwell(9XX)](https://en.wikipedia.org/wiki/GeForce_900_series) e [Pascal(10XX)](https://en.wikipedia.org/wiki/GeForce_10_series): Essas GPUs são limitadas ao macOS 10.13 High Sierra.
  * [Nvidia's Turing(20XX,](https://en.wikipedia.org/wiki/GeForce_20_series)[16XX)¹](https://pt.wikipedia.org/wiki/S%C3%A9rie_GeForce_16): Essas GPUs **não são suportadas por nenhuma versão do macOS**.
  * [Nvidia's Ampere(30XX)](https://en.wikipedia.org/wiki/GeForce_30_series): Essas GPUs **não são suportadas por nenhuma versão do macOS**.
  * [Nvidia's Kepler(6XX,¹](https://pt.wikipedia.org/wiki/GeForce_600)[7XX)¹](https://pt.wikipedia.org/wiki/S%C3%A9rie_NVIDIA_GeForce_700): Essas GPUs são suportadas na versão mais recente do macOS (incluindo o macOS 11 Big Sur).
    * Isso acontece porque a Apple ainda oferece suporte para alguns [MacBook Pros com GPUs Nvidia](https://deomkds.github.io/GPU-Buyers-Guide/modern-gpus/nvidia-gpu.html).
* GPUs integradas da Intel nível [GT2+](https://pt.wikipedia.org/wiki/Intel_HD_Graphics).
  * Este guia cobre GPUs do Ivy Bridge ao Ice Lake.
    * Informações acerca das GPUs da série GMA podem ser encontradas aqui: [Patching de GMA](https://deomkds.github.io/OpenCore-Post-Install/gpu-patching/).
  * Observe que GT2 se refere ao nível da GPU integrada. Isto é, GPUs do nível GT1, encontradas em Pentiums, Celerons e Atoms, não são suportadas no macOS.

E uma observação importante sobre **notebooks com GPUs dedicadas**:

* 90% das GPUs dedicadas não funcionam porque são conectadas internamente de forma que o macOS não oferece suporte (GPUs alternáveis). A Nvidia chama essa função de Optimus. Não é possível utilizar essas GPUs dedicadas para o monitor interno, então é recomendado desativá-las e desligá-las. Isso será abordado neste guia mais para frente.
* Em alguns casos, a GPU dedicada fica responsável pelas portas HDMI, Mini DisplayPort e outras, o que pode ou não funcionar no macOS. Caso funcione, será necessário manter a GPU ligada e funcionando.
* E é raro, mas existem alguns notebooks que não possuem GPUs alternáveis, o que torna possível usar a GPU dedicada, se suportada pelo macOS. Porém, a maneira como são conectadas à placa mãe geralmente causam problemas.

**Para ver uma lista completa de GPUs suportadas, acesse o [Guia de Compra de GPUs](https://deomkds.github.io/GPU-Buyers-Guide/)**

::: details Tabela de GPUs Intel Suportadas

| Geração | Suporte Inicial | Suporte Final | Observações |
| :--- | :--- | :--- | :--- |
| [GMA de 3ª Geração](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Third_generation) | 10.4.1 | 10.7.5 | [Exige kernel e patches de 32 bits](https://deomkds.github.io/OpenCore-Post-Install/gpu-patching/legacy-intel/) |
| [GMA de 4ª Geração](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen4) | 10.5.0 | ^^ | ^^ |
| [Arrendale (HD Graphics de 1ª Geração)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen5) | 10.6.4 | 10.13.6 | Suporta somente conexão interna LVDS. HDMI, eDP e outras portas não são suportadas. |
| [Sandy Bridge (HD 3000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen6) | 10.6.7 | ^^ | N/A |
| [Ivy Bridge (HD 4000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.7.3 | 10.15.7 | ^^ |
| [Haswell (HD 4XXX, 5XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.8.5 | <span style="color:green"> Atual </span> | ^^ |
| [Broadwell (5XXX, 6XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen8) | 10.10.0 | ^^ | ^^ |
| [Skylake (HD 5XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.11.0 | ^^ | ^^ |
| [Kaby Lake (HD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.12.4 | ^^ | ^^ |
| [Coffee Lake (UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.13.6 | ^^ | ^^ |
| [Comet Lake (UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.15.4 | ^^ | ^^ |
| [Ice Lake (Gx)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen11) | 10.15.4 | ^^ | Exige o uso dos argumentos de boot `-igfxcdc` e `-igfxdvmt`. |
| [Tiger Lake (Xe)](https://en.wikipedia.org/wiki/Intel_Xe) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Nenhum driver disponível. </span> |
| [Rocket Lake](https://en.wikipedia.org/wiki/Rocket_Lake) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Nenhum driver disponível. </span> |

Observação: a Apple manteve os drivers das GPUs integradas do Ivy Bridge (4ª geração) no macOS 11 Big Sur, porém sua remoção é iminente. Esteja ciente disso ao instalar.

*Todos os links estão em inglês.*

:::

::: details Tabela de GPUs AMD Suportadas

| Geração | Suporte Inicial | Suporte Final | Observações |
| :--- | :--- | :--- | :--- |
| [X800](https://en.wikipedia.org/wiki/Radeon_X800_series) | 10.3.x | 10.7.5 | Exige kernel de 32 bits. |
| [X1000](https://en.wikipedia.org/wiki/Radeon_X1000_series) | 10.4.x | ^^ | N/A |
| [Terascale](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Terascale 2/3](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.6.x | ^^ | ^^ |
| [GCN 1](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.8.3 | <span style="color:green"> Atual </span> | ^^ |
| [GCN 2/3](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.10.x | ^^ | ^^ |
| [Polaris 10](https://en.wikipedia.org/wiki/Radeon_RX_400_series), [20](https://en.wikipedia.org/wiki/Radeon_RX_500_series) | 10.12.1 | ^^ | ^^ |
| [Vega 10](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.12.6 | ^^ | ^^ |
| [Vega 20](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.14.5 | ^^ | ^^ |
| [Navi 10](https://en.wikipedia.org/wiki/Radeon_RX_5000_series) | 10.15.1 | ^^ | Exige o uso do argumento de boot `agdpmod=pikera`. |
| [Navi 20](https://en.wikipedia.org/wiki/Radeon_RX_6000_series) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Drivers atuais não funcionam. </span> |

*Todos os links estão em inglês.*

:::

::: details Tabela de GPUs Nvidia Suportadas

| Geração | Suporte Inicial | Suporte Final | Observações |
| :--- | :--- | :--- | :--- |
| [GeForce 6](https://en.wikipedia.org/wiki/GeForce_6_series) | 10.2.x | 10.7.5 | Exige kernel de 32 bits e [patch de NVCAP](https://deomkds.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/). |
| [GeForce 7](https://en.wikipedia.org/wiki/GeForce_7_series) | 10.4.x | ^^ | Exige [patch de NVCAP](https://deomkds.github.io/OpenCore-Post-Install/gpu-patching/nvidia-patching/). |
| [Tesla](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Tesla V2](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)#Tesla_2.0) | 10.5.x | ^^ | ^^ |
| [Fermi](https://en.wikipedia.org/wiki/Fermi_(microarchitecture)) | 10.7.x | ^^ | ^^ |
| [Kepler](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.7.x | <span style="color:green"> Atual </span> | N/A |
| [Kepler V2](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.8.x | ^^ | ^^ |
| [Maxwell](https://en.wikipedia.org/wiki/Maxwell_(microarchitecture)) | 10.10.x | 10.13.6 | Exige os [Webdrivers](https://www.nvidia.com/download/driverResults.aspx/149652/). |
| [Pascal](https://en.wikipedia.org/wiki/Pascal_(microarchitecture)) | 10.12.4 | ^^ | ^^ |
| [Turing](https://en.wikipedia.org/wiki/Turing_(microarchitecture)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Nenhum driver disponível. </span> |
| [Ampere](https://en.wikipedia.org/wiki/Ampere_(microarchitecture)) | ^^ | ^^ | ^^ |

*Todos os links em inglês porque a Desciclopédia Brasileira é a maior do mundo, mas a Wikipédia Lusófona não.*

:::

## Supore de Placa Mãe

Como regra geral, todas as placas são suportadas contanto que a CPU também seja. Mas no passado, placas B550 apresentavam problemas:

* [~~AMD's B550 boards~~](https://en.wikipedia.org/wiki/List_of_AMD_chipsets)

Contudo, graças a desenvolvimentos recentes, placas B550 são suportadas com a adição da [SSDT-CPUR](https://github.com/naveenkrdy/Misc/blob/master/SSDTs/SSDT-CPUR.dsl). Mais informações serão fornecidas tanto no guia [Juntando os Arquivos](./ktext.md) quanto na seção [config.plist para Zen](./AMD/zen.md).

## Suporte de Armazenamento

Em sua maioria, todos os discos baseados em SATA possuem suporte, assim como a maioria dos SSDs NVMe, com somente algumas poucas exceções:

* **SSDs NVMe Samsung PM981, PM991 e Micron 2200S**
  * Estes SSDs não são compatíveis de forma nativa (causam kernel panics) e portanto exigem o uso da kext [NVMeFix.kext](https://github.com/acidanthera/NVMeFix/releases) para evitar travamentos. Observe que esses SSDs ainda podem causar problemas na inicialização mesmo com a NVMeFix.kext.
  * Ainda nesse assunto, os SSDs NVMe Samsung 970 EVO Plus também possuiam esse mesmo problema, mas que foi resolvido com uma atualização de firmware. Baixe a atualização (Windows via Samsung Magician ou ISO inicializável) [aqui](https://www.samsung.com/semiconductor/minisite/ssd/download/tools/).
  * Observe também que notebooks que usam memória [Intel Optane](https://www.intel.com.br/content/www/br/pt/products/details/memory-storage/optane-memory.html) ou [Micron 3D XPoint](https://www.micron.com/products/advanced-solutions/3d-xpoint-technology) para aceleração de HDD não são suportados no macOS. Alguns usuários reportaram sucesso no macOS 10.15 Catalina, até mesmo com suporte a leitura e escrita, mas recomendamos que a memória seja removida para evitar problemas de inicialização em potencial.

* **Intel 600p**
  * Embora seja possível iniciar o macOS, esteja ciente de que esse modelo de SSD pode causa inúmeros problemas, conforme relatado aqui: [Alguma solução para o Intel 600p NVMe Drive? #1286](https://github.com/acidanthera/bugtracker/issues/1286).

## Rede Cabeada

Praticamente todos os adaptadores de rede possuem alguma forma de suporte no macOS, seja por meio dos drivers nativos ou por meio de kexts feitas pela comunidade. As maiores exceções são:

* Intel I225 2.5Gb NIC.
	* Encontrado em placas Comet Lake para desktops de alto desempenho.
  * É possível contornar o problema: [fonte](https://www.hackintosh-forum.de/forum/thread/48568-i9-10900k-gigabyte-z490-vision-d-er-läuft/?postID=606059#post606059) e [exemplo](config.plist/comet-lake.md#deviceproperties).
* Intel I350 1Gb NIC para servidores.
  * Normalmente encontrado em placas de servidor Intel e Supermicro de várias gerações.
  * [Solução alternativa](config-HEDT/ivy-bridge-e.md#deviceproperties).
* Intel 10Gb NIC para serviores.
  * É possível contornar o problema nos [chipsets X520 e X540](https://www.tonymacx86.com/threads/how-to-build-your-own-imac-pro-successful-build-extended-guide.229353/).
* Mellanox e Qlogic NICs para servidores.

## Rede Sem Fio

A maioria das placas Wi-Fi pré-instaladas em notebooks não são suportadas. Geralmente são Intel, Qualcomm ou Realtek. Se tiver sorte, talvez encontre uma placa Atheros que tem suporte somente até o macOS 10.13 High Sierra.

A melhor opção é a compra de uma placa Broadcom suportada. Veja a lista completa de recomendações no [Guia de Compra de Wi-Fi](https://deomkds.github.io/Wireless-Buyers-Guide/).

Observação: Placas Intel possuem suporte não oficial no macOS por meio de drivers de terceiros. Veja o [Guia de Compra de Wi-Fi](https://deomkds.github.io/Wireless-Buyers-Guide/) para mais informações sobre os drivers e as placas suportadas.

## Diversos

* **Leitores de Digitais**
  * No momento, não existe uma forma de emular o sensor do Touch ID, portanto leitores de digitais não funcionam.
* **Reconhecimento Facial do Windows Hello**
	* O reconhecimento facial não é suportado.
  * Alguns notebooks vem com webcams conectadas no barramento I2C (e usadas através da GPU integrada). Essas não funcionam.
  * Já outros vem com webcams conectadas no barramento USB. Com um pouco de sorte, a câmera pode funcionar, mas nada além disso.
* **Tecnologia Intel Smart Sound (SST)**
	* Nenhum dispositivo conectado através do Intel SST funcionará. Geralmente é o microfone interno. É possível verificar no Gerenciador de Dispositivos do Windows.
* **Entrada de Fone de Ouvido Combinada com Microfone (ComboJack, TRRS, Fone de Celular)**
  * A parte de entrada de áudio (microfone) pode não funcionar em alguns modelos de notebooks. Nesses casos, será necessário usar o microfone integrado ou algum dispositivo de áudio USB externo.
* **Portas USB-C Thunderbolt**
  * O suporte para portas Thunderbolt e USB-C combinadas ainda é instável em *hackintoshes*, ainda mais com controladores Alpine Ridge, presente na maioria dos notebooks. Foram feitas tentativas de manter o contralador ligado, o que permitiria o *hotplug* de dispositivos, mas isso causou kernel panics e interrompeu o funcionamento das portas USB-C ao retornar da suspensão. A única forma de usar a porção USB-C dessas portas e ainda ser capaz de suspender o computador é conectando um dispositivo durante a inicialização do sistema e mantendo-o sempre conectado.
  * Observação: isso não se aplica a portas que são apenas USB-C, somente para portas USB-C e Thunderbolt 3 combinadas.
  * Desativar o Thunderbolt na BIOS também resolve este problema.
