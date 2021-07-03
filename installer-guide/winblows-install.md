# Criando o Instalador no Windows

Embora não seja necessário ter uma instalação nova do macOS para usar o OpenCore, alguns usuários preferem começar do zero quando atualizam seus gerenciadores de boot.

Para começar, será necessário ter:

* Pendrive de 4GB.
  * Para formatar pendrives maiores do que 16GB em FAT32, use o método do [Rufus](#pelo-rufus).
* [macrecovery.py](https://github.com/acidanthera/OpenCorePkg/releases)
  * Isto exige uma instalação do [Python](https://www.python.org/downloads/).

## Baixando o macOS

Obter instaladores antigos é super fácil. Primeiro, baixe uma cópia do [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases) e vá até a pasta `/Utilities/macrecovery/`. Depois copie o caminho da pasta `macrecovery`:

![](../images/installer-guide/winblows-install-md/file-path.png)

A partir daqui, será necessário abrir uma janela do Promt de Comando e acessar, usando o comando `cd`, o diretório do `macrecovery` que foi copiando anteriormente.

```sh
cd colar_o_caminho_da_pasta
```

![](../images/installer-guide/winblows-install-md/command-prompt.png)

Agora execute uma das linhas a seguir, dependendo da versão do macOS que deseja instalar.

*Observação: esses scripts dependem do [Python](https://www.python.org/downloads/), por favor, instale-o se ainda não o fez.

```sh
# OS X 10.7 Lion:
python macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download
python macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download

# OS X 10.8 Mountain Lion:
python macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download

# OS X 10.9 Mavericks:
python macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download

# OS X 10.10 Yosemite:
python macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download

# OS X 10.11 El Capitan:
python macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download

# macOS 10.12 Sierra:
python macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download

# macOS 10.13 High Sierra:
python macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download
python macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download

# macOS 10.14 Mojave:
python macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download

# macOS 10.15 Catalina:
python macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download

# Versão mais recente
# macOS 11 Big Sur
python macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download
```

* **Observação sobre o macOS 11 Big Sur**: Como esta versão é bem nova, ainda existem alguns problemas com certos computadores para serem resolvidos. Para mais informações, acesse: [OpenCore e o macOS 11 Big Sur](../extras/big-sur/README.md).
  * Para usuários de primeira viagem, recomenda-se usar o macOS 10.15 Catalina.
* **Observação sobre GPUs Nvidia**: Lembre-se de checar se sua placa é suportada nas versões mais novas do macOS. Veja mais na página sobre [Limitações de Hardware](../macos-limits.md).

Isso deve demorar um pouco. No entanto, assim que tiver terminado, os arquivos BaseSystem ou RecoveryImage devem ficar disponíveis:

![](../images/installer-guide/winblows-install-md/macrecovery-done.png)

| BaseSystem | RecoveryImage |
| :--- | :--- |
|![](../images/installer-guide/winblows-install-md/basesystem-example.png) | ![](../images/installer-guide/winblows-install-md/macrecovery-after.jpg) |

Agora, com o instalador baixado, é hora de formatar o pendrive.

## Criando o Instalador

Aqui o pendrive será formatado e o macOS será copiado para ele.
Existem três opções para isso:

* [Pelo Gerenciador de Disco](#pelo-gerenciador-de-disco)
  * Tem interface gráfica. É bastante simples.
  * Somente suporta computadores com UEFI (geralmente PCs de 2012 ou mais novos).
* [Pelo Rufus](#pelo-rufus)
  * Tem interface gráfica. É o mais simples.
  * Usado em pendrives maiores que 16GB.
* [Pelo diskpart](#pelo-diskpart)
  * Linha de comando. Dá um pouco mais de trabalho.
  * Exigido para computadores mais antigos (sem UEFI, anteriores a 2012).

### Pelo Gerenciador de Disco

Abra o Gerenciador de Disco e formate o pendrive em FAT32:

1. Clique com o botão direito no Menu Iniciar na barra de tarefas e selecione Gerenciador de Disco.
2. Será possível ver todas as partições e unidades. Na metade de baixo da janela, estarão seus dispositivos. Encontre o pendrive.
3. Formate o pendrive de forma que ele possua uma partição em FAT32.

* Se o pendrive possuir múltiplas partições, clique com o botão direito em cada uma das partições e selecione Excluir Volume. Isso **apagará os dados** do pendrive, então certifique-se de ter um backup e só exclua as partições _do pendrive_.
  * Clique com o botão direito no espaço não alocado e crie um novo volume simples. Certifique-se de que está em FAT32 e que ela tenha pelo menos 1GB ou 2GB de tamanho. Nomeie-a como EFI.
* Caso contrário, clique com o botão direito na partição do pendrive e clique em formatar. Selecione a opção FAT32.

![](../images/installer-guide/winblows-install-md/DiskManagement.jpg)

Depois, acesse a raíz do pendrive e crie uma pasta chamada `com.apple.recovery.boot`. Então mova os arquivos BaseSystem ou RecoveryImage para dentro dela. Certifique-se de copiar tanto o arquivo .dmg quanto o arquivo .chunklist para essa pasta.

![](../images/installer-guide/winblows-install-md/com-recovery.png)

Agora acesse o OpenCorePkg que foi baixado anteriormente e abra-o:

![](../images/installer-guide/winblows-install-md/base-oc-folder.png)

Aqui é possível ver tanto a pasta IA32 (para CPUs de 32 bits) quanto a pasta X64 (para CPUs de 64 bits). Escolha a que for mais apropriada para o seu computador e abra-a. Então, de dentro dela, copie a pasta EFI e cole na raíz do pendrive, junto com a `com.apple.recovery.boot`, mas não dentro dela. Feito isso, deve ficar assim:

![](../images/installer-guide/winblows-install-md/com-efi-done.png)

### Pelo Rufus

1. Baixe o [Rufus](https://rufus.ie/).
2. Configure a opção Seleção de Boot para não inicializável.
3. Configure Sistema de Arquivos como FAT32 Grande.
4. Clique em INICIAR e aguarde o término do processo.
5. Exclua todos os arquivos do tipo autorun.inf que serão criados no pendrive.

![](../images/installer-guide/winblows-install-md/format-usb-rufus.png)

Depois, acesse a raíz do pendrive e crie uma pasta chamada `com.apple.recovery.boot`. Então mova os arquivos BaseSystem ou RecoveryImage para dentro dela. Certifique-se de copiar tanto o arquivo .dmg quanto o arquivo .chunklist para essa pasta.

![](../images/installer-guide/winblows-install-md/com-recovery.png)

Agora acesse o OpenCorePkg que foi baixado anteriormente e abra-o:

![](../images/installer-guide/winblows-install-md/base-oc-folder.png)

Aqui é possível ver tanto a pasta IA32 (para CPUs de 32 bits) quanto a pasta X64 (para CPUs de 64 bits). Escolha a que for mais apropriada para o seu computador e abra-a. Então, de dentro dela, copie a pasta EFI e cole na raíz do pendrive, junto com a `com.apple.recovery.boot`, mas não dentro dela. Feito isso, deve ficar assim:

![](../images/installer-guide/winblows-install-md/com-efi-done.png)

### Pelo diskpart

::: details Pelo diskpart

Aperte Windows + R e digite `diskpart`.

Agora, execute o seguinte

```sh
# Lista todos os discos disponíveis.
list disk
# Selecione o seu disco(ex.: disk 1)
select disk 1
# Formate o disco.
clean
# Converta para GPT.
# Devido a um bug estranho com o BOOTICE e o DuetPkg, discos em MBR terão problemas ao iniciar.
convert gpt
# Crie uma nova partição.
create partition primary
# Selecione a partição recém-criada.
# Executar o comando clean garante que só existirá uma partição, que se chamará "partition 1".
select partition 1
# Formate-a em FAT32.
format fs=fat32 quick
# Atribua uma letra de unidade (ex.: unidade E, certifique-se de que a letra já não está em uso).
ASSIGN LETTER=E
```

Depois, acesse a raíz do pendrive e crie uma pasta chamada `com.apple.recovery.boot`. Então mova os arquivos BaseSystem ou RecoveryImage para dentro dela. Certifique-se de copiar tanto o arquivo .dmg quanto o arquivo .chunklist para essa pasta.

![](../images/installer-guide/winblows-install-md/com-recovery.png)

Agora acesse o OpenCorePkg que foi baixado anteriormente e abra-o:

![](../images/installer-guide/winblows-install-md/base-oc-folder.png)

Aqui é possível ver tanto a pasta IA32 (para CPUs de 32 bits) quanto a pasta X64 (para CPUs de 64 bits). Escolha a que for mais apropriada para o seu computador e abra-a. Então, de dentro dela, copie a pasta EFI e cole na raíz do pendrive, junto com a `com.apple.recovery.boot`, mas não dentro dela. Feito isso, deve ficar assim:

![](../images/installer-guide/winblows-install-md/com-efi-done.png)

::: details Configuração da Instalação Legada

Se o firmware do seu computador não suporta UEFI, siga as intruções abaixo:

Para iniciar, baixe o seguinte:

* [7-Zip](https://www.7-zip.org)
* [BOOTICE](https://www.majorgeeks.com/files/details/bootice_64_bit.html)
* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)

Depois, abra o BOOTICE e certifique-se que selecionou a unidade correta.

![](../images/installer-guide/winblows-install-md/bootice.png)

Então, clique em "Process MBR", selecione "Restore MBR" e selecione o arquivo **boot0** que está na pasta `Utilities/LegacyBoot/` no OpenCorePkg:

| Restore MBR | Restore boot0 file |
| :--- | :--- |
| ![](../images/installer-guide/winblows-install-md/restore-mbr.png) | ![](../images/installer-guide/winblows-install-md/restore-mbr-file.png) |

Então volte para a tela inicial e clique em "Process PBR" e depois em "Restore PBR". A partir daqui, selecione o arquivo **Boot1f32** que está na pasta `Utilities/LegacyBoot/` no OpenCorePkg:

| Restore PBR | Restore boot1f32 file |
| :--- | :--- |
| ![](../images/installer-guide/winblows-install-md/restore-pbr.png) | ![](../images/installer-guide/winblows-install-md/restore-pbr-file.png) |

Feito isso, volte para o pendrive e faça uma última coisa. Copie o arquivo **bootx64** (para CPUs de 64 bits) ou o arquivo **bootia32** (para CPUs de 32 bits) que está na pasta `Utilities/LegacyBoot/` e cole-o na raíz do pendrive. **Renomeie o arquivo para _boot_** para garantir que o  DuetPkg possa funcionar.

![](../images/installer-guide/winblows-install-md/final-boot-file.png)

:::

## Com tudo isso feito, acesse o guia [Configurando a EFI](./opencore-efi.md) para continuar
