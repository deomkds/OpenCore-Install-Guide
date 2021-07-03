# macOS Antigo: Método Offline

Este método permite baixar instaladores completos da Apple, porém, é limitado ao OS X 10.10 Yosemite. Versões mais antigas podem ser baixadas por meio do "Método Online" comentado na próxima seção.

Para iniciar, siga este link:

* [Como obter versões antigas do macOS](https://support.apple.com/pt-br/HT211683)

Escolha a versão desejada e um arquivo .pkg será baixado.

Dependendo de qual versão do macOS estiver usando, basta rodar esse script e partir para o guia [Configurando o Instalador](#setting-up-the-installer). No entanto, se encontrar este erro:

![](../images/installer-guide/legacy-mac-install-md/unsupported.png)

Significa que será necessário extrair o instalador manualmente.

### Extraindo o Instalador

Para iniciar, obtenha o `InstallMacOSX/InstallOS.dmg` e monte-a:

![](../images/installer-guide/legacy-mac-install-md/mount.png)

Depois, abra uma janela do Terminal e crie uma pasta na mesa (área de trabalho). Execute uma linha de cada vez:

```sh
cd ~/Desktop
mkdir MacInstall && cd MacInstall
```

Agora vem a parte divertida: extrair o isntalador. Isso pode levar alguns minutos.

* Para o OS X 10.11 El Capitan ou mais antigo:

```sh
xar -xf /Volumes/Install\ OS\ X/InstallMacOSX.pkg
```

* Para o macOS 10.12 Sierra:

```sh
xar -xf /Volumes/Install\ macOS/InstallOS.pkg
```

Depois, execute o seguinte (uma linha de cada vez).

* OS X 10.10 Yosemite:

```sh
cd InstallMacOSX.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ OS\ X\ Yosemite.app/Contents/SharedSupport/
mv Install\ OS\ X\ Yosemite.app /Applications
```

* OS X 10.11 El Capitan:

```sh
cd InstallMacOSX.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ OS\ X\ El\ Capitan.app/Contents/SharedSupport/
mv Install\ OS\ X\ El\ Capitan.app /Applications
```

* macOS 10.12 Sierra:

```sh
cd InstallOS.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ macOS\ Sierra.app/Contents/SharedSupport/
mv Install\ macOS\ Sierra.app /Applications
```

## Finalizando

Depois de tudo terminado, acesse o guia [Configurando o Instalador](./mac-install.md#setting-up-the-installer) para continuar com a configuração do OpenCore.
