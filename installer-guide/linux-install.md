# Criando o Instalador no Linux

Embora não seja necessário ter uma instalação zerada para usar o OpenCore, alguns usuários preferem ter um sistema limpo ao atualizar seus gerenciadores de boot.

Para começar, tenha em mãos:

* Pendrive de 4GB
* [macrecovery.py](https://github.com/acidanthera/OpenCorePkg/releases)
  
## Baixando o macOS

Para iniciar, use o comando `cd` para acessar a pasta do [macrecovery](https://github.com/acidanthera/OpenCorePkg/releases) e execute um dos comandos abaixo:

![](../images/installer-guide/legacy-mac-install-md/macrecovery.png)

```sh
# Ajuste o seguinte comando para a pasta correta
cd ~/Downloads/OpenCore-0/Utilities/macrecovery/
```

Depois, execute um dos seguintes comandos dependendo do sistema que deseja iniciar:

```sh
# OS X 10.7 Lion:
python ./macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download
python ./macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download

# OS X 10.8 Mountain Lion:
python ./macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download

# OS X 10.9 Mavericks:
python ./macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download

# OS X 10.10 Yosemite:
python ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download

# OS X 10.11 El Capitan:
python ./macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download

# macOS 10.12 Sierra:
python ./macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download

# macOS 10.13 High Sierra:
python ./macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download
python ./macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download

# macOS 10.14 Mojave:
python ./macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download

# macOS 10.15 Catalina
python ./macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download

# Versão mais recente
# macOS 11 Big Sur
python ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download
```

A partir daqui, execute um desses comandos numa janela do Terminal e, quando terminado, aparecerá uma mensagem similar a esta:

![](../images/installer-guide/legacy-mac-install-md/download-done.png)

* **Observação**: dependendo do sistema operacional, o script baixará um arquivo chamado `BaseSystem` ou um chamado `RecoveryImage`. Ambos agem da mesma forma, então quando este guia fizer referência a `BaseSystem`, a informação também se aplica ao `RecoveryImage`.

* **Observação sobre o macOS 11 Big Sur**: como essa versão é nova, ainda há problemas a serem resolvidos com sertos sistemas. Para mais informações, acesse: [OpenCore e o macOS 11 Big Sur](../extras/big-sur/README.md).
  * Para usuários de primeira viagem, recomenda-se usar o macOS 10.15 Catalina.
* **Observação sobre GPUs Nvidia**: Lembre-se de verificar se sua placa suporta as versões mais recentes do sistema operaciona. Para isso, leia as [Limitações de Hardware](../macos-limits.md).

## Criando o Instalador

Esta seção focará na forma de fazer as partições necessárioas no dispositivo USB. Fique à vontade para usar seu programa preferido, seja o `gdisk`, o `fdisk`, o `parted`, o `gparted` ou o `gnome-disks`. Este guia focará no `gdisk` por ser daorinha e permitir mudar o tipo de partição no futuro, o que será necessário para fazer a partição de Recuperação do macOS iniciar. A distro usada neste guia foi o Ubuntu 18.04, mas outras versões também servem.

Créditos ao [midi1996](https://github.com/midi1996) pelo seu trabalho no [Guia de Instalador Online](https://midi1996.github.io/hackintosh-internet-install-gitbook/) (em inglês), no qual este guia foi baseado.

### Método 1

No Terminal:

1. Execute `lsblk` e determine o bloco do seu dispositivo USB.
  ![lsblk](../images/installer-guide/linux-install-md/unknown-5.png)
2. Execute `sudo gdisk /dev/<bloco do seu dispositivo USB>`.
   1. Se perguntado qual tabela de partição usar, selecione GPT.
      ![Selecione GPT](../images/installer-guide/linux-install-md/unknown-6.png)
   2. Aperte `p` para exibir as partições do bloco \(e checar se é a que você procura\).
      ![](../images/installer-guide/linux-install-md/unknown-13.png)
   3. Aperte `o` para limpar a tabela de partição e crie uma nova em GPT (se houver).
      1. Confirme apertando `y`.
         ![](../images/installer-guide/linux-install-md/unknown-8.png)
   4. Aperte `n`.
      1. `partition number`: Deixe em branco para usar o valor padrão.
      2. `first sector`: Deixe em branco para usar o valor padrão.
      3. `last sector`: Deixe em branco para usar o disco todo.
      4. `Hex code or GUID`: `0700` para definir o tipo de partição como Microsoft Basic Data.
   5. Aperte `w`.
      * Confirme apertando `y`.
      ![](../images/installer-guide/linux-install-md/unknown-9.png)
      * Em alguns casos, um reboot é necessário, mas é raro. Se quiser ter certeza, reinicie seu computador. Você também pode tentar reconectar seu pendrive.
   6. Feche o `gdisk` apertando `q` (normalmente ele fecha sozinho).
3. Use o `lsblk` para determinar os identificadores da partição.
4. Execute `sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<bloco da partição no dispositivo USB>` para formatar seu pendrive em FAT32 usando o nome OPENCORE.
5. Então execute `cd` para acessar o diretório `/OpenCore/Utilities/macrecovery/` e deve encontrar uma `.dmg` e um arquivo `.chunklist`.
   1. Monte a partição do pendrive com o `udisksctl` (`udisksctl mount -b /dev/<bloco da partição no dispositivo USB>`, não precisa de sudo na maioria dos casos) ou com o `mount` (`sudo mount /dev/<bloco da partição no dispositivo USB> /onde/você/monta/partições`, o sudo é necessário).
   2. Execute o `cd` para acessar o seu pendrive e crie uma pasta com o `mkdir com.apple.recovery.boot` na raiz da partição FAT32 do pendrive.
   3. Agora use o comando `cp` ou o comando `rsync` para copiar tanto a `BaseSystem.dmg` quanto o arquivo `BaseSystem.chunklist` para dentro da pasta `com.apple.recovery.boot`.

### Método 2 (caso o primeiro não funcione)

No Terminal:

1. Execute o `lsblk` e determine o bloco do seu dispositivo USB.
   ![](../images/installer-guide/linux-install-md/unknown-11.png)
2. Execute `sudo gdisk /dev/<bloco do seu dispositivo USB>`
   1. Se perguntado qual tabela de partição usar, selecione GPT.
      ![](../images/installer-guide/linux-install-md/unknown-12.png)
   2. Aperte `p` para exibir as partições do bloco \(e checar se é a que você procura\).
      ![](../images/installer-guide/linux-install-md/unknown-13.png)
   3. Aperte `o` para limpar a tabela de partição e crie uma nova em GPT (se houver).
      1. Confirme apertando `y`.
         ![](../images/installer-guide/linux-install-md/unknown-14.png)
   4. Aperte `n`.
      1. `partition number`: Deixe em branco para usar o valor padrão.
      2. `first sector`: Deixe em branco para usar o valor padrão.
      3. `last sector`: `+200M` para criar uma partição de 200MB que depois será renomeada para OPENCORE.
      4. `Hex code or GUID`: `0700` para definir o tipo de partição como Microsoft Basic Data.
      ![](../images/installer-guide/linux-install-md/unknown-15.png)
   5. Aperte `n`.
      1. `partition number`: Deixe em branco para usar o valor padrão.
      2. `first sector`: Deixe em branco para usar o valor padrão.
      3. `last sector`: Deixe em branco para usar o valor padrão \(ou pode usar `+3G` se desejar particionar o resto do pendrive\).
      4. `Hex code or GUID`: `af00` para definir o tipo de partição como Apple HFS/HFS+.
      ![](../images/installer-guide/linux-install-md/unknown-16.png)
   6. Aperte `w`.
      * Confirme apertando `y`.
      ![](../images/installer-guide/linux-install-md/unknown-17.png)
      * Em alguns casos, um reboot é necessário, mas é raro. Se quiser ter certeza, reinicie seu computador. Você também pode tentar reconectar seu pendrive.
   7. Feche o `gdisk` apertando `q` (normalmente ele fecha sozinho).
3. Use o `lsblk` novamente para determinar o bloco do disco de 200MB e da outra partição.
   ![](../images/installer-guide/linux-install-md/unknown-18.png)
4. Execute `sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<o bloco da sua partição de 200MB>` para formatar a partição de 200MB em FAT32 usando o nome OPENCORE.
5. Então execute `cd` para acessar o diretório `/OpenCore/Utilities/macrecovery/` e deve encontrar uma `.dmg` e um arquivo `.chunklist`.
   1. Monte a partição do pendrive com o `udisksctl` (`udisksctl mount -b /dev/<bloco da partição no dispositivo USB>`, não precisa de sudo na maioria dos casos) ou com o `mount` (`sudo mount /dev/<bloco da partição no dispositivo USB> /onde/você/monta/partições`, o sudo é necessário).
   2. Execute o `cd` para acessar o seu pendrive e crie uma pasta com o `mkdir com.apple.recovery.boot` na raiz da partição FAT32 do pendrive.
   3. Baixe o `dmg2img` (disponível na maioria das distros).
   4. Execute `dmg2img -l BaseSystem.dmg` e determine qual partição tem a propriedade `disk image`.
      ![](../images/installer-guide/linux-install-md/unknown-20.png)
   5. Execute `dmg2img -p <o número da partição> -i BaseSystem.dmg -o <o bloc da sua partição de 3GB+>` para extrair e escrever a imagem de recuperação na partição do disco.
      * Vai demorar um pouco. MUITO, se estiver usando um pendrive lento (demorou mais ou menos uns 5 minutos usando um pendrive rápido com USB 2.0).
      ![](../images/installer-guide/linux-install-md/unknown-21.png)

## Finalizando

Depois de tudo terminado, acesse o guia [Configurando a EFI](./opencore-efi.md) para continuar com a configuração do OpenCore.
