# Criando o instalador no macOS

Embora não seja necessário ter uma instalação zerada para usar o OpenCore, alguns usuários preferem ter um sistema limpo ao atualizar seus gerenciadores de boot.

Para começar, será necessário baixar uma cópia do macOS. Se estiver só criando um pendrive bootável com o OpenCore e não um instalador completo, pule essa seção e vá direto para a formatação do pendrive. Para os outros, é possível baixar o macOS tanto da Mac App Store quanto pelo script do Munki.

## Baixando o macOS: Sistema Operacional Moderno

* Este método permite baixar o macOS 10.13 High Sierra ou mais novo. Para versões mais antigas, como o macOS 10.12 Sierra ou anterior, acesse o guia [Baixando o macOS: Sistema Operacional Antigo](#downloading-macos-legacy-os).

A partir de um computador executando o macOS que atinja os requisitos da versão do sistema operacional que você pretende utilizar, vá direto para a Mac App Store e baixe a versão do macOS desejada, depois prossiga até a seção [**Configurando o Instalador**](#setting-up-the-installer).

Para computadores que necessitam de uma versão específica do sistema operacional ou não conseguem baixar da Mac App Store, é possível usar o utilitário `InstallInstallMacos` do Munki.

Para executá-lo, copie e cole o comando abaixo em uma janela do Terminal.

```sh
mkdir ~/macOS-installer && cd ~/macOS-installer && curl -O https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py && sudo python installinstallmacos.py
```

![](../images/installer-guide/mac-install-md/munki.png)

Como dá para ver, ele exibe uma bela lista de instaladores do macOS. Se for necessário baixar uma versão específica, é possível selecioná-la digitando o número que está ao lado. Neste exemplo, será usado a opção 10:

![](../images/installer-guide/mac-install-md/munki-process.png)

* **Observação sobre o macOS 11 Big Sur**: Como essa versão é bem nova, ainda existem alguns problemas a serem resolvidos com certos sistemas. Para mais informações, acesse: [OpenCore e macOS 11 Big Sur](../extras/big-sur/README.md).
  * Para usuários de primeira viagem, recomendamos o macOS 10.15 Catalina.
* **Observação sobre GPUs Nvidia**: Lembre-se de verificar se seu hardware suporta os macOS mais novos. Consulte o guia [Limitações de Hardware](../macos-limits.md) para mais informações.

Isso vai demorar um pouco, já que o utilitário baixará todos os 8GB do instalador do macOS, então é altamente recomendado ler o resto deste guia enquanto aguarda.

Uma vez terminado, a DMG contendo o instalador do macOS poderá ser encontrada na pasta `~/macOS-Installer/`. O arquivo terá um nome parecido com `Install_macOS_11.1-20C69.dmg`, a variar dependendo da versão. Monte-a e encontrará o aplicativo instalador dentro dela.

* Observações:
  * É recomendado mover o "Instalador do macOS.app" para a pasta `/Aplicativos`, pois os comandos a seguir serão executados nela.
  * Pressionar Cmd+Shift+G no Finder permite abrir rapidamente a pasta `~/macOS-installer`.

![](../images/installer-guide/mac-install-md/munki-done.png)

![](../images/installer-guide/mac-install-md/munki-dmg.png)

Daqui, pule para [Configurando o Instalador](#setting-up-the-installer) para terminar o que você começou.

## Baixando o macOS: Sistema Operacional Antigo

* Este método permite baixar versões do OS X muito mais antigas. Atualmente, suporta todas as versões para Intel do OS X (do 10.4 Tiger até a mais atual).

  * [macOS Antigo: Método Offline](./mac-install-pkg.md)
    * Suporta do 10.10 ao 10.12.
  * [macOS Antigo: Método Online (Suporta 10.7 a 10.15)](./mac-install-recovery.md)
    * Suporta do 10.7 ao 11.
  * [macOS Antigo: Imagens de Disco](./mac-install-dmg.md)
    * Suporta do 10.4 ao 10.6.

## Configurando o Instalador

Agora, será necessário formatar o pendrive para prepará-lo para receber tanto o instalador do macOS quanto o OpenCore. Utilize as opções macOS Extendido (HFS+) com um mapa de partição tipo GUID. Serão criadas duas particões: a principal `MyVolume` e uma segunda partição chamada `EFI`, que é usada como a partição de boot e onde o firmware do computador procurará pelos arquivos de inicialização.

* Observações:
  * Por padrão, o Utilitário de Disco somente mostra partições. Pressione Cmd/Win+2 para exibir todos os dispositivos. Alternativamente, é possível usar o botão Visualização.
  * Os usuários que estão seguindo a seção "macOS Antigo: Método Online" podem pular para [Configurando o Ambiente EFI do OpenCore](#setting-up-opencore-s-efi-environment)

![Formatando o pendrive](../images/installer-guide/mac-install-md/format-usb.png)

Depois, execute o comando `createinstallmedia` provido pela [Apple](https://support.apple.com/en-us/HT201372).
Observer que o comando é feito para pendrives formatados com o nome `MyVolume`:

```sh
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```

Isso vai demorar um pouco. Fique à vontade para tomar um café ou continuar lendo este guia (pra ser honesto, ninguém deveria estar seguindo este guia passo a passo sem ler ele inteiro primeiro).

Também é possível trocar o caminho do `createinstallmedia` pela localização do instalador no seu computador (mesma coisa com o nome do pendrive).

::: details Comandos createinstallmedia Antigos

Retirados do próprio site da Apple: [Como criar um instalador inicializável no macOS](https://support.apple.com/pt-br/HT201372)

```sh
# Big Sur
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Catalina
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Mojave
sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# High Sierra
sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume

# Sierra
sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ macOS\ Sierra.app

# El Capitan
sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app

# Yosemite
sudo /Applications/Install\ OS\ X\ Yosemite.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ Yosemite.app

# Mavericks
sudo /Applications/Install\ OS\ X\ Mavericks.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ Mavericks.app --nointeraction
```

:::

## Configuração Legada

Para sistemas que não suportam a inicialização UEFI, veja:

::: details Configurando a Inicialização Legada

Para começar, será preciso:

* `BootInstall\_IA32.tool` ou `BootInstall\_X64.tool`
  * Podem ser encontrados no OpenCorePkg, na pasta `/Utilties/LegacyBoot/`.
* Pendrive de Instalação (criado acima).

Dentro da pasta do OpenCore, navegue até `Utilities/LegacyBoot`. Lá existirá um arquivo chamado `BootInstall_ARCH.tool`. Ele é responsável por instalar o DuetPkg no disco de destino selecionado.

![Local do BootInstall](../images/extras/legacy-md/download.png)

Agora, execute essa ferramenta no Terminal **com sudo**. A ferramenta falhará, caso contrário.

```sh
# Substitua X64 por IA32 se for usar uma CPU de 32 bits.
sudo ~/Downloads/OpenCore/Utilities/legacyBoot/BootInstall_X64.tool
```

![Seleção de Disco/Salvando nova MBR](../images/extras/legacy-md/boot-disk.png)

Isso exibirá uma lista de discos disponíveis, escolha o seu e será perguntado sobre salvar uma nova MBR. Escolha _sim_ (`[y]`) e o processo terá terminado.

![Instalador Finalizado](../images/extras/legacy-md/boot-done.png)

![EFI Base](../images/extras/legacy-md/efi-base.png)

Isso criará um arquivo **bootia32** ou **bootx64** na partição EFI.

:::

## Configurando o Ambiente EFI do OpenCore

Configurar o ambiente EFI do OpenCore é simples, basta montar a partição EFI. Ela é criada automaticamente quando o pendrive é formatado em GUID, mas a partição permanece desmontada por padrão. É aqui que entra nosso amigo [MountEFI](https://github.com/corpnewt/MountEFI):

![MountEFI](../images/installer-guide/mac-install-md/mount-efi-usb.png)

Note que a partição EFI está vazia no momento em que é montada. É aqui que a diversão começa.

![Partição EFI vazia](../images/installer-guide/mac-install-md/base-efi.png)

## Feito isso, acesse o guia [Configurando a EFI](./opencore-efi.md) para continuar
