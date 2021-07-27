# Depurando o Sistema a Fundo

Essa seção se aprofundará na toca de coelho que é o processo de solução de problemas, focando especificamente na depuração de baixo nível, com saída de dados de depuração apropriada e a configuração da saída serial.

**Observação**: 99% dos usuários não precisam deste nível de depuração. Somente *hackintoshers* hardcore ou casos muito extremos e raros precisarão desses procedimentos.

[[toc]]

## Configurando a EFI

Em grande parte, as alterações necessárias são mínimas. Principalmente, recomenda-se utilizar a versão de depuração do OpenCore, em conjunto com todas as suas *kexts*. Isso ajuda a garantir a coleta apropriada de todos os dados necessários. Para mais detalhes sobre a versão de depuração do OpenCore, acesse: [Depurando com o OpenCore](./debug.md).

Além de usar as variantes de depuração do OpenCore e das *kexts*, essas ferramentas também podem ajudar bastante:

* [DebugEnhancer.kext](https://github.com/acidanthera/DebugEnhancer/releases)
  * Ajuda bastante na depuração do kernel ao mesmo tempo em que corrige o erro [kern.msgbuf to 10485760](https://github.com/acidanthera/DebugEnhancer/blob/4495911971011a1a7a0ffe8605d6ca4b341f67d9/DebugEnhancer/kern_dbgenhancer.cpp#L131) (em inglês) e ainda permite aumentar o tamanho do log do *kernel*.
  * Observe que essa *kext* não pode ser carregada durante a inicialização do *kernel*. Os logs iniciais não são afetados até que a *kext* seja carregada, o que ocorre momentos antes do estágio de configuração da PCI.
  
* [SSDT-DBG](https://gist.github.com/al3xtjames/39ebea4d615c8aed829109a9ea2cd0b5)
  * Ativa as declarações de depuração contidas nas tabelas ACPI, ajudando com a depuração de eventos da ACPI durante a execução do sistema operacional.
  * Será necessário [compilar a SSDT](https://deomkds.github.io/Getting-Started-With-ACPI/Manual/compile.html).
  
## Configurando a Config.plist

Configurar a saída serial no OpenCore é bastante simples.

### Misc

* **SerialInt**: YES
  * Executa a inicialiação da porta serial.
* **Target**: `67`
  * Habilita a saída de dados de depuração do OpenCore.
  * `Target = 75` adiciona a *flag* serial tradicional (0x08) nos casos em que [a porta serial for utilizada](#serial-setup-optional).
  * É possível calcular um valor personalizado. Consulte a página [Depurando com o OpenCore](./debug.md).
  
### NVRAM

#### boot-args

Aqui é onde serão configuradas algumas variáveis que ajudarão com a saída de dados de depuração. Utilize os seguintes argumentos de inicialização:

```
-v keepsyms=1 debug=0x12a msgbuf=1048576
```

Agora, veja o que cada argumento faz:

* **-v**
  * Habilita a saída verbosa.
* **keepsyms=1**
  * Garante que os símbolos sejam mantidos durante os *kernel panics*, o que ajuda bastante na solução de problemas.
* **debug=0x12a**
  * Uma combinação de `DB_KPRT` (0x8), `DB_KDP_BP_DIS` (0x32) e `DB_KDP_GETC_ENA` (0x200).
  * Uma lista dos valores completa pode ser encontrada aqui: [debug.h](https://github.com/apple/darwin-xnu/blob/master/osfmk/kern/debug.h#L419L447) (em inglês).
* **msgbuf=1048576**
  * Configura o tamanho do *buffer* de mensagens do *kernel*, o que ajuda a obter logs mais apropriados durante a inicialização.
  * 1048576 é 1MB(/1024^2). Pode ser maior, se necessário.
  * Desnecessário caso esteja usando a `DebugEnhancer.kext`. No entanto, ainda é necessário para os logs de *kernel* iniciais.

**Outros _boot-args_ úteis**:

Dependendo do que está sendo depurado, esses argumentos de inicialização podem ser extremamente úteis:

* **-liludbgall**
  * Habilita a depuração na Lilu e em todos os plugins. Observe, no entanto, que isso exige o uso das versões de depuração das *kexts*.
* **io=0xff**
  * Ativa a depuração do IOKit, que fornece dados melhores. Esteja ciente de que, ao usar este parâmetro, a quantidade de dados no log será gigantesca e deixará o sistema operacional lento, especialmente durante a inicialização.
* **igdebug=0xff**
  * Habilita a depuração de GPUs integradas. Útil ao se trabalhar com computadores que possuam GPUs integradas.
* **serial=5**
  * Redireciona a saída de dados para a porta serial, caso esteja [planejando usá-la](#serial-setup-optional).
  * Recomendado para a saída de dados inicial do *kernel*, antes da configuração da PCI.
* **acpi_layer=0x8**
  * Habilita a depuração das `ACPI_TABLES`. Veja o arquivo [acoutput.h](https://github.com/acpica/acpica/blob/master/source/include/acoutput.h) (em inglês) para obter mais informações.
  * Alternativamente, `0xFFFFFFFF` ativa todas as camadas.
* **acpi_level=0x2**
  * Configura a depuração de `ACPI_LV_DEBUG_OBJECT`. Veja o arquivo [acoutput.h](https://github.com/acpica/acpica/blob/master/source/include/acoutput.h) (em inglês) para obter mais informações.
  * Alternativamente, `0xFFFF5F` significa `ACPI_ALL_COMPONENTS`.

## Configurando a Porta Serial (Opcional)

* [Configurando o Hardware](#configurando-o-hardware)
* [Configurando o CoolTerm](#configurando-o-coolterm)

Embora seja opcional, a saída serial pode ser super útil para coletar todas as informações importantes que derramam do computador. É também a única maneira apropriada de obter logs de *kernel panics* super precoces, como as coisas que vem logo depois de `[EB|#LOG:EXITBS:START]`.

Para configurá-la, será necessário ter:

* Uma porta/conector serial no computador de testes.
* Um cabo serial-para-serial ou serial-para-USB.
* Um segundo computador para receber os logs da saída de dados serial (com uma porta serial ou USB).
* Um software para monitorar a saída de dados serial:
  * Neste guia, será utilizado o [CoolTerm](https://freeware.the-meiers.org), já que ele possui versões para macOS, Linux, Windows e até mesmo para o Raspberry Pi.
  * O `screen` e outros métodos também são suportados.

### Configurando o Hardware

Neste exemplo, será utilizada uma placa Asus X299-E Strix, que possui um conector serial. Para verificar se sua placa possui um desses, leia o manual e procure pela porta serial/COM:

![Porta Serial](../images/troubleshooting/kernel-debugging-md/serial-header.png)

Como evidenciado pela imagem, há uma porta COM na parte de baixo da placa-mãe. Ela até mesmo fornece um diagrama para conectar pinos seriais manualmente, caso não esteja utilizando um adaptador de Conector Serial de 9/10 Pinos para DB9.

Alternativamente, alguns computadores possuem portas seriais DB9 diretamente nas conexões traseiras, como este Dell Optiplex 780 SFF (observe que VGA e Serial **não** são o mesmo conector!):

<img width="508" alt="" src="../images/troubleshooting/kernel-debugging-md/serial-connector.jpg">

No X299 do autor original, foi utilizado um simples adaptador de [conector serial para DB9](https://www.amazon.ca/gp/product/B001Y1F0HW/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1), e então um [adaptador de DB9 para USB RS 232](https://www.amazon.ca/gp/product/B075YGKFC1/ref=ppx_yo_dt_b_asin_title_o00_s01?ie=UTF8&psc=1), que é, por fim, conectado a um notebook:

| Conector serial para DB9 | Adaptador de DB9 para USB RS 232|
| :--- | :--- |
| ![](../images/troubleshooting/kernel-debugging-md/817DNdBZDkL._AC_SL1500_.jpg) | ![](../images/troubleshooting/kernel-debugging-md/61yHczOwpTL._AC_SL1001_.jpg) |

O manual do OpenCore geralmente recomenda dispositivos UART baseados em CP21202:

> Para obter o log durante a inicialização, é possível usar a depuração por meio da porta serial. A depuração por meio da porta serial é ativada no Target, isto é, 0xB para em tela com serial. O OpenCore utiliza uma taxa de 115200 bauds, 8 bits de dados, sem paridade e 1 bit de parada. Para o macOS, a melhor escolha são dispositivos UART baseados em CP2102. Conecte o TX da placa-mãe ao RX UART USB e o GND da placa mãe no GND do UART USB. Utilize um utilitário de tela para obter a saída, ou baixa um software com interface gráfica como o CoolTerm.
> Observação: Em muitas placas-mãe (e possivelmente em adabtadores UART USB) os nomes dos pinos podem estar incorretos. É bastante comum encontrar o GND trocado com o RX, fazendo com que seja necessário conectar o "TX" da placa-mãe no GND do UART USB e o “GND” da placa-mae ao RX do UART USB.

**Lembrete importante**: não se esqueca de ativar a porta serial na BIOS também. Muitas placas-mãe desativam a opção por padrão.

### Configurando o CoolTerm

Agora, abra o [CoolTerm](https://freeware.the-meiers.org) e configure algumas opções. Ao iniciar o CoolTerm, será exibida uma janela simples. Aqui, selecone a opção Options:

![](../images/troubleshooting/kernel-debugging-md/coolterm-first-start.png)
![](../images/troubleshooting/kernel-debugging-md/coolterm-settings.png)

Aqui, são exibidas algumas opções, mas as principais com as quais se preocupar são:

* Port: tenha certeza de usar o mesmo do controlador serial do seu computador.
* Baudrate = 115200
* Data Bits = 8
* Parity = none
* Stop Bit = 1

Então, salve as configurações e selecione a opção Connect. Será exibido um log em tempo real da saída serial:

![CoolTerm Connect](../images/troubleshooting/kernel-debugging-md/coolterm-connect.png)

Para gravar, simplesmente acesse a opção `Connections -> Capture to Text/Binary File -> Start...(Cmd+R)`:

![](../images/troubleshooting/kernel-debugging-md/coolterm-record.png)

## Kits de Depuração do Kernel (Opcional)

* [KDK em um SO Instalado](#kdk-em-um-so-instalado)
* [Uninstalling the KDK](#uninstalling-the-kdk)

Kits de Depuração de Kernel (KDK) são uma forma incrível de obter ainda mais informações de logs do *kernel* e das principais *kexts*. Especificamente, KDKs são versões de depuração do Core Foundation do macOS fornecidas pela própria Apple. Incluem tanto logs adicionais quanto ASSERTs, permitindo vizualizar mais diretamente os problemas da sua configuração. No entanto, observe que depuração com ponte ou a utilização do `lldb` não serão abordados neste guia.

<span style="color:red"> CUIDADO: </span> Instalar KDKs em computadores de trabalho pode causar problemas com as atualizações do sistema operacional e brickar instalações. Por favor, realize a depuração em instalações do macOS dedicadas para tal, de forma a evitar perda de dados.

Para começar, será necessário ter, no mínimo, uma [conta de desenvolvedor gratuita](https://developer.apple.com/support/compare-memberships/) (em inglês) da Apple. Uma vez criada pelo menos a conta gratuita, será possível acessar os KDKs a partir da página [More Downloads](https://developer.apple.com/download/more/) (em inglês):

* Observação: contas gratuitas estarão limitadas a versões de lançamento dos KDKs. KDKs beta só são fornecidos para [contas de desenvolvedor pagas](https://developer.apple.com/support/compare-memberships/) (em inglês).
* Observação 2: A Apple disponibiliza KDKs antigas até o Mac OS X 10.5 Leopard, então não se preocupe se o seu sistema operacional não possui mais suporte.

![](../images/troubleshooting/kernel-debugging-md/more-downloads.png)

Para determinar qual *build* de KDK será necessária para versões beta do macOS, execute o seguinte comando no Terminal:

```sh
sw_vers | grep BuildVersion
```

Neste guia, será baixado o Kit de Depuração do Kernel v11.3 build 20E5186d. Uma vez baixado, monte a imagem de disco e encontre o instalador do KDK. Por padrão, o KDK será instalado somente para realizar a depuração com dois computadores (Performing Two-Machine Debugging) e fornecerá zero benefício extra para depuração de *kernel* no computador hospedeiro (isto é, no computador no qual foi instalado).

### KDK em um SO Instalado

Para habilitar a depuração no computador hospedeiro, será necessário realizar os seguintes passos:

1. Executar o pacote de instalação do KDK (`.pkg`);
2. Desabilitar o SIP (OS X 10.11 El Capitan e superior);
3. Montar a partição de *root* com permissões de escrita (macOS 10.15 Catalina e superior);
4. Instalar as versões de depuração do *kernel* e das *kexts*;
5. Atualizar os argumentos de inicialização (*boot-args*);
6. Reiniciar e verificar se tudo deu certo.

#### 1. Executar o pacote de instalação do KDK (`.pkg`)

Simplesmente execute o arquivo `.pkg` normalmente:

![](../images/troubleshooting/kernel-debugging-md/kdk-install.png)

Uma vez instalado, os componentes do KDK, como a versão de depuração do *kernel*, podem ser encontradas no diretório `/Library/Developer/KDKs`:

![](../images/troubleshooting/kernel-debugging-md/kdk-installed.png)

#### 2. Desabilitar o SIP

* Aplicável ao OS X 10.11 El Capitan e mais novo.

Para desabilitar o SIP, existem duas opções:

* Desabilitar pelo ambiente de Recuperação.

* [Desabilitar pela config.plist](./extended/post-issues.md#desativando-o-sip).

Geralmente, recomenda-se usar o ambiente de Recuperação para que seja possível reverter facilmente com uma redefinição de NVRAM. No entanto, alguns usuários talvez precisem que o SIP continue desabilitado mesmo após redefinições de NVRAM.

Neste caso, simplesmente reinicie o ambiente de Recuperação do macOS, abra o Terminal e execute o seguinte:

```sh
csrutil disable
csrutil authenticated-root disable # No macOS 11 Big Sur ou superior.
```

Reinicie e o SIP deverá ter sido ajustado. É possível executar o comando `csrutil status` no Terminal para verificar se funcionou.

* <span style="color:red"> CUIDADO: </span> os usuários que dependem do recurso [ApECID do OpenCore](https://deomkds.github.io/OpenCore-Post-Install/universal/security/applesecureboot.html#apecid), tenha ciência de que o ApECID **precisa** estar desabilitado para usar o KDK.

#### 3. Mount root partition as writable

* Applicable for macOS 10.15, Catalina and newer

Mounting the root volume as writable is easy, however the process is a bit long:

```bash
# Big Sur+
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
```

```bash
# Catalina only
sudo mount -uw /
```

#### 4. Install debug kernel and kexts

Now we install our KDK into the system:

```bash
# Install KDK to System Volume
# Ensure to replace <KDK Version>
# For 10.15 and older, swap livemount with /Volumes/<Target Volume>
sudo ditto /Library/Developer/KDKs/<KDK Version>/System ~/livemount/System

# Rebuild the kernel cache(Big Sur and newer)
sudo kmutil install --volume-root ~/livemount --update-all

# Rebuild the kernel cache(Catalina and older)
sudo kextcache -invalidate /Volumes/<Target Volume>

# Finally, once done editing the system volume
# we'll want to create a new snapshot (Big Sur and newer)
sudo bless --folder ~/livemount/System/Library/CoreServices --bootefi --create-snapshot
```

#### 5. Update boot-args

Now that you've finished setting up the KDK and installed it, we now need to tell boot.efi which kernel to use. You have 2 options to choose from:

* `kcsuffix=debug` (removed with Big Sur)
* `kcsuffix=development`
* `kcsuffix=kasan`

`development` arg will set the new default debug kernel in Big Sur, while `kasan` is a much more logging intensive kernel that incorporates [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer).

Once you've decided which kernel is ideal for you, add the kcsuffix arg to your boot-args in your config.plist

#### 6. Reboot and check your work

Assuming everything was done correctly, you'll now want to reboot and check that the correct kernel was booted:

```sh
sysctl kern.osbuildconfig
 kern.osbuildconfig: kasan
```

And as we can see, we're successfully booting a KASAN kernel.

### Uninstalling the KDK

Uninstalling the KDK is fairly simple, however can be a bit destructive if not care.

1. Mount root partition as writable(macOS 10.15+)
2. Remove debug kernel and kexts
3. Re-enable SIP
4. Clean boot-args
5. Reboot and check your work

Steps:

#### 1. Mount root partition as writable(macOS 10.15+)

```bash
# Big Sur+
# First, create a mount point for your drive
# Skip of still present from mounting volume last time
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

# Mount the drive (ie. disk5s5)
sudo mount -o nobrowse -t apfs  /dev/disk5s5 ~/livemount
```

```bash
# Catalina only
sudo mount -uw /
```

#### 2. Remove debug kernel and kexts

```bash
# Revert to old snapshot (Big Sur+)
sudo bless --mount ~/livemount --bootefi --last-sealed-snapshot
```

```bash
# Reset kernel cache (Catalina and older)
sudo rm /System/Library/Caches/com.apple.kext.caches/Startup/kernelcache.de*
sudo rm /System/Library/PrelinkedKernels/prelinkedkernel.de*
sudo kextcache -invalidate /
```

#### 3. Re-enable SIP

* Recovery commands(if previously changed via recovery):

```sh
csrutil enable
csrutil authenticated-root enable # Big Sur+
```

* config.plist changes(if previously changed via config.plist):
  * [Enabling via config.plist](./extended/post-issues.md#disabling-sip)
  
#### 4. Clean boot-args

Don't forget to remove `kcsuffix=` in your boot-args

#### 5. Reboot and check your work

Assuming everything was done correctly, you'll now want to reboot and check that the correct kernel was booted:

```sh
sysctl kern.osbuildconfig
 kern.osbuildconfig: release
```

And as we can see, we're successfully booting a KASAN kernel.
