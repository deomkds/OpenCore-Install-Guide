# VirtualBox

## Requisitos

* VirtualBox.
* Um computador executando o macOS.
* O Instalador do macOS desejado salvo na pasta `/Aplicativos`.
* Um HD ou SSD externo, conectado pela USB.

## Convertendo a Mídia de Instalação

O VirtualBox não consegue usar a imagem de disco origina diretamente, então será preciso convertê-la para o formado `VDI`.

Pelo Terminal, use o comando `cd` para acessar a pasta que contém a imagem de disco. Então, execute os comandos abaixo:

```bash
### Altere "Install macOS Big Sur Beta" caso o nome do arquivo .img seja diferente.
VBoxManage convertfromraw "Install macOS Big Sur Beta.img" "Install macOS Big Sur Beta.vdi" --format VDI
```

## Instalando o macOS no VirtualBox

Primeiro, conecte o HD externo que será alvo da instalação do macOS e crie um disco rígido virtual que o referencie para usar com o VirtualBox. Observação: talvez seja necessário remover as partições do disco antes de usá-lo. Também será preciso editar o dispositivo de destino.

```bash
diskutil list
# Localize o disco externo que combine e substitua o /dev/disk3 abaixo pelo caminho do seu dispositivo.
sudo VBoxManage internalcommands createrawvmdk -filename RawHDD.vmdk -rawdisk /dev/disk3
```

Depois, inicie o VirtualBox com permissões de superusuário e crie uma nova máquina virtual do macOS.

```bash
sudo VirtualBox
```

* Nome: Big Sur
* Tipo: MacOS 64bit

* De 2 a 4 núcleos para a CPU.
* De 4 a 8 GB de RAM.
* Não crie um disco virtual.

Vincule o disco que foi criado no passo anterior conforme imagem abaixo:

![](../../images/extras/big-sur/virtualbox/vbox-storage.png)

Agora, feche o VirtualBox e adicione as seguintes propriedades à máquina virtual para permitir que ela inicie.

```bash
sudo VBoxManage modifyvm "Big Sur" --cpuidset 00000001 000306a9 04100800 7fbae3ff bfebfbff

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMacPro1,1"

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Mac-7BA5B2D9E42DDD94"

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```

Execute o VirtualBox como superusuário e inicie a VM. O instalador deverá começar a inicalização. Complete a instalação da mesma forma como seria feito em qualquer outro dispositivo.

```bash
sudo VirtualBox
```

Quando a instalação estiver completa, e a tela de Boas Vindas estiver sendo exibida, envie um sinal de desligamento ACPI para o macOS e selecione Desligar.

Adicione a sua partição EFI já preparada à partição EFI presente no dispositivo USB e ejete-o.

Insira o disco de volta no computador e inicie normalmente.
