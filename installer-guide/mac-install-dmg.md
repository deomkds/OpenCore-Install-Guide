# macOS Antigo: Imagens de Disco

Este método depende de imagens de disco hospedadas ou pela Apple ou pelo grupo Acidanthera, que serão restauradas para o pendrive.

#### Imagens de Disco do Acidanthera

Os instaladores abaixo foram retirados de discos de restauração genuínos de Macs, com suas travas de SMBIOS removidas. O conteúdo do OS X em si não foi modificado de nenhuma forma.

* [OS X 10.4.10 Tiger (8R4088)](https://archive.org/details/10.4.10-8-r-4088-acdt) [Mirror no MEGA](https://mega.nz/folder/D3ASzLzA#7sjYXE2X09f6aGjol_C7dg)

* [OS X 10.5.7 Leopard (9J3050)](https://archive.org/details/10.5.7-9-j-3050) [Mirror no MEGA](https://mega.nz/folder/inRBTarD#zanf7fUbviwz3WHBU5xpCg)

* [OS X 10.6.7 Snow Leopard (10J4139)](https://archive.org/details/10.6.7-10j3250-disk-images)[Mirror no MEGA](https://mega.nz/folder/z5YUhYTb#gA_IRY5KMuYpnNCg7kR3ug/file/ioQkTagI)

#### Imagens de Disco da Apple

É necessário ter uma conta de Desenvolvedor da Apple para acessar essas imagens de disco.

* [OS X 10.5.0 Leopard Golden Master (9a581)](https://download.developer.apple.com/Mac_OS_X/mac_os_x_v10.5_leopard_9a581/leopard_9a581_userdvd.dmg)

* [OS X 10.6.0 Snow Leopard Golden Master (10a432)](https://download.developer.apple.com/Mac_OS_X/mac_os_x_version_10.6_snow_leopard_build_10a432/mac_os_x_v10.6_build_10a432_user_dvd.dmg)

### Restaurando para o Pendrive

Agora vem a parte divertida. Primeiro, abra a DMG baixada e monte-a. Então, abra o Utilitário de Discose formate o pendrive como macOS Extendido (HFS+) usando o mapa de partição GUID:

![Formatando o Pendrive](../images/installer-guide/mac-install-md/format-usb.png)

Depois, escolha uma das opções:

* [Restauração ASR](#restauração-asr)(Restauração de Software da Apple)
  * Feita pelo Terminal, funciona com o SIP ativado.
* [Restauração pelo Utilitário de Disco](#disk-utility)
  * Talvez precise que o SIP seja desligado em versões mais novas do macOS.
  
#### Restauração ASR

Aqui, simplesmente abra o Terminal e execute a seguinte linha:

```sh
sudo asr restore -source /Volumes/Mac\ OS\ X\ Install\ DVD  -target /Volumes/MyVolume -erase -noverify
```

* **Observação**: Talvez esteja diferente da sua configuração. Por favor, altere conforme o necessário:
  * Mude `/Volumes/Mac\ OS\ X\ Install\ DVD` para o nome da sua imagem de disco montada.
  * Mude `/Volumes/MyVolume` para o nome do seu pendrive.

### Uma vez terminado, siga para o guia [COnfigurando o Ambiente EFI do OpenCore](./mac-install.md#setting-up-opencore-s-efi-environment)
  
#### Utilitário de Disco

Devido a alguns problemas irritantes com o Utilitário de Disco, muitas restaurações podem falhar caso o SIP esteja ativado. Se encontrar problemas, recomenda-se usar o método [Método ASR](#restauração-asr) ou desativar o SIP.

Para iniciar, abra o Utilitário de Disco e veja se seu pendrive e a imagem de disco montada estão presentes na barra lateral. Então, selecione a opção Restaurar.

![](../images/installer-guide/legacy-mac-install-md/pre-restore.png)
![](../images/installer-guide/legacy-mac-install-md/restore.png)

::: details Solução de Problemas

Se, durante a restauração, encontrar um erro como esse:

![](../images/installer-guide/legacy-mac-install-md/sip-fail.png)

Provavelmente significa que o SIP precisa ser desligado. No entanto, recomenda-se o uso do método [Método ASR](#restauração-asr) em vez de desligar o SIP.

:::

## Finalizando

Depois de tudo terminado, acesse o guia [Configurando o Ambiente EFI do OpenCore](./mac-install.md#setting-up-opencore-s-efi-environment) para continuar com a configuração do OpenCore.
