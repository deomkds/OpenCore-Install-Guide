# macOS Antigo: Método Online

Este método permite baixar versões antigas do macOS, incluíndo o OS X 10.7 Lion até o mais atual. No entanto, estes são apenas instaladores de recuperação e exigem uma conexão com a internet funcional dentro do instalador.

Para iniciar, será necessário usar o script macrecovery.py. Esta ferramenta já vem dentro do OpenCorePkg:

![](../images/installer-guide/legacy-mac-install-md/macrecovery.png)

As instruções de execução são bastante simples: escolha a partir de um dos comandos abaixo dependendo da versão do sistema operacional que deseja baixar.

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

# macOS 10.15 Catalina:
python ./macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download

# Versão mais recente (ex.: macOS 11 Big Sur):
python ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download
```

A partir daqui, execute um desses comandos no Terminal e, assim que terminado, aparecerá algo como:

![](../images/installer-guide/legacy-mac-install-md/download-done.png)

Uma vez que isso tenha terminado, formate o pendrive como FAT32 usando o esquema de partição GUID:

![](../images/installer-guide/legacy-mac-install-md/fat32-erase.png)

Finalmente, crie uma pasta na raiz desse pendrive chamada `com.apple.recovery.boot` e coloque o arquivo BaseSystem/RecoveryImage baixado nela:

![](../images/installer-guide/legacy-mac-install-md/dmg-chunklist.png)

## Finalizando

Depois de tudo terminado, acesse o guia [Configurando o Ambiente EFI do OpenCore](./mac-install.md#setting-up-opencore-s-efi-environment) para continuar com a configuração do OpenCore.
