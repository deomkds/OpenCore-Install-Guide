# Problemas no Espaço do Usuário

Problemas que podem acontecer depois de ter iniciado o instalador e a interface gráfica aparecer.

[[toc]]

## Instalador do macOS Está em Russo

O arquivo `config.plist` é distribuído por padrão em russo porque são os eslavos que mandam no mundo do *hackintosh*. Verifique o valor `prev-lang:kbd` no caminho `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82`. Configure-o para `656e2d55533a30` de forma a usar o American: en-US:0. Uma lista completa dos valores suportados pode ser encontrada em [AppleKeyboardLayouts.txt](https://github.com/acidanthera/OpenCorePkg/blob/master/Utilities/AppleKeyboardLayouts/AppleKeyboardLayouts.txt)(em inglês). Para aqueles que estejam editando a `config.plist` com um editor de texto simples (ex.: UEFI Shell, Notepad++ etc.), `656e2d55533a30` será apresentado como `ZW4tVVM6MA==`.

Talvez seja necessário redefinir a NVRAM no seletor de incialização também.

* Observação: notebooks Thinkpad são conhecidos por entrar em um estado semi-brickado depois de redefinir a NVRAM pelo OpenCore. Nesses computadores, é recomendado atualizar a BIOS para redefinir a NVRAM.

Ainda não funcionou? É hora de usar chumbo grosso. Force a remoção da propriedade e deixe que o OpenCore a reconstrua:

Na `config.plist`, crie o caminho `NVRAM -> Delete -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> Item 0`, mude o tipo para `String` e coloque o valor como `prev-lang:kbd`.

![](../../images/troubleshooting/troubleshooting-md/lang.png)

## Instalador do macOS Danificado

Se o instalador do macOS sendo utilizado foi baixadno antes de outubro de 2019, é provavel que o certificado de instalação tenha expirado. Existem duas formas de corrigir isso:

* Baixando a cópia mais recente do instalador do macOS.
* Mudando a data do computador pelo Terminal para um momento em que o certificado ainda era válido.

Para fazer a segunda opção:

* Desconecte todos os dispositivos de rede (Ethernet, desligue o WiFi).
* No Terminal do modo de recuperação, execute o comando abaixo para configurar o relógio do sistema para 1º de setembro de 2019:

```
date 0901000019
```

## Preso em ou próximo de `IOConsoleUsers: gIOScreenLock...`/`gIOLockState (3...`

Isso é exatamente antes da GPU ser inicializada de forma apropriada. Verifique o seguinte:

* A GPU suporta UEFI (GTX 7XX/2013+).
* O CSM está desativado na BIOS.
* Forçar a velocidade do link da PCIe 3.0.
* Verifique novamente se os valores de `ig-platform-id` and `device-id` são válidos (caso esteja usando uma GPU integrada).
  * Intel UHD 630 de desktop pode precisar usar o valor alternativo `00009B3E`.
* Tentar várias [correções da WhateverGreen](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) (em inglês).
  * Usar o argumento de inicialização `-igfxmlr`. Pode se manifestar como um erro de "Divide by Zero" (Dividir por Zero).
* Usuários de GPUs integradas em CPUs Coffee Lake talvez precisem usar o argumento de inicialização `igfxonln=1` no macOS 10.15.4 Catalina ou mais novo.

## Tela Preta Após `IOConsoleUsers: gIOScreenLock...` em Notebooks e All-In-Ones (AIO)

Verifique o seguinte:

* A SSDT-PNLF está instalada na `EFI/OC/ACPI` e configurada corretamente  na `config.plist`, no caminho `ACPI -> Add`.
* As propriedades da GPU integrada foram configuradas corretamente no caminho `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0)`.
* Notebooks com CPUs Coffee Lake e mais novos: adicione `-igfxblr` nos argumentos de inicialização.
  * Como alternativa, adicione `enable-backlight-registers-fix | Data | 01000000` no caminho `PciRoot(0x0)/Pci(0x2,0x0)`.

Adicionalmente, verifique os problemas mencionados na seção anterior.

## Tela Distorcida em Notebooks

Ative o CSM nas configurações da UEFI. Pode ser exibido como "Boot legacy ROMs" ou outra configuração legada.

## Tela preta após `IOConsoleUsers: gIOScreenLock...` em GPUs Navi

* Adicione `agdpmod=pikera` nos argumentos de inicialização.
* Alterne entre diferentes saídas de vídeo.
* Tente executar a SMBIOS do MacPro7,1 com o argumento de inicialização `agdpmod=ignore`.

Para usuários de GPUs Navi MSI, será necessário aplicar o patch mencionado aqui: [Installer not working with 5700XT #901](https://github.com/acidanthera/bugtracker/issues/901) (em inglês).

Especificamente, adicione a seguinte entrada no caminho `Kernel -> Patch`:

```
Base:
Comment: Patch de bug na VBIOS em GPU Navi
Count: 1
Enabled: YES
Find: 4154592C526F6D2300
Identifier: com.apple.kext.AMDRadeonX6000Framebuffer
Limit: 0
Mask:
MinKernel:
MaxKernel:
Replace: 414D442C526F6D2300
ReplaceMask:
Skip: 0
```

## Travado no Instalador do macOS Após 30 Segundos

É provavel que seja causado por uma versão quebrada da NullCPUPowerManagement ou mesmo a completa falta dela. A versão disponibilizada no Guia de OSX Vanilla em AMD está corrompida. Para corrgir o problema, remova a `NullCPUPowerManagement.kext` do caminho `Kernel -> Add` e da pasta `EFI/OC/Kexts` e então habilite a opção `DummyPowerManagement` no caminho `Kernel -> Emulate`.

## Reinicialização em CPUs 15h/16h Depois da Tela de Dados & Privacidade

Siga as orientações após o item "UPDATE 2" neste link: [Fix Data and Privacy reboot](https://www.insanelymac.com/forum/topic/335877-amd-mojave-kernel-development-and-testing/?do=findComment&comment=2658085) (em inglês).

## macOS Travado Antes do Login

Isso é um exemplo comum de um TSC estragado. Na maioria dos sistemas, basta instalar a [CpuTscSync](https://github.com/lvs1974/CpuTscSync).

Em CPUs Skylake-X, muitos firmwares (incluindo Asus e EVGA) não reportam todos os núcleos. Então será necessário redefinir o TSC ao reiniciar e ao retornar da suspensão usando o [TSCAdjustReset](https://github.com/interferenc/TSCAdjustReset). A versão compilada pode ser encontrada aqui: [TSCAdjustReset.kext](https://github.com/deomkds/OpenCore-Install-Guide/blob/master/extra-files/TSCAdjustReset.kext.zip). Observe que é **preciso** abrir a `kext` (no Finder, clicar com o botão direito, Mostrar Conteúdo do Pacote, abrir o arquivo `Contents -> Info.plist`) e alterar a opção `IOKitPersonalities -> IOPropertyMatch -> IOCPUNumber` para o número de *threads* que a CPU  possui, iniciando em `0` (ex.: Intel Core i9 7980XE com 18 núcleos usaria o valor `35`, já que tem 36 *threads* no total).

A maneira mais comum de observar o problema do TSC:

Caso 1    |  Caso 2
:-------------------------:|:-------------------------:
![](../../images/troubleshooting/troubleshooting-md/asus-tsc.png)  |  ![](../../images/troubleshooting/troubleshooting-md/asus-tsc-2.png)

## MediaKit Reporta Espaço Insuficiente

Este erro acontece devido a uma partição EFI muito pequena. Por padrão, o Windows cria uma EFI com apenas 100MB, mas o macOS precisará de uma com 200MB. Existem duas formas de contornar isso:

* Expanda a partição EFI na unidade para 200MB (procure no Google).
* Formate o disco todo em vez de apenas particioná-lo.
  * Observe que, por padrão, o Utilitário de Disco mostra apenas partições. Pressione `Cmd/Win+2` para mostrar todos os dispositivos (também pode ser feito a partir do menu Exibir).

Padrão           |  Mostrar Todos os Dispositivos (Cmd+2)
:-------------------------:|:-------------------------:
![](../../images/troubleshooting/troubleshooting-md/Default.png)  |  ![](../../images/troubleshooting/troubleshooting-md/Showalldevices.png)

## Utilitário de Disco Falhando ao Apagar

Pode ser um (ou mais) dentre os cinco problemas a seguir:

* Formatar apenas a partição e não o disco todo. Veja [MediaKit Reporta Espaço Insuficiente](#mediakit-reporta-espaço-insuficiente)
* O Utilitário de Disco possui um bug estranho o qual faz com que a primeira tentativa de apagar um disco/partição falhe. Tente apagar novamente.
* O suporte ao `hot-plug` de dispositivos SATA na BIOS pode estar causando problemas (tente desativá-la).
* Firmware antigo. Certifique-se de que o HD/SSD esteja usando a versão mais recente do firmware.
* E, pra terminar, a unidade de disco pode estar ruim.

## Unidades SATA Não Aparecem no Utilitário de Disco

* Certifique-se de que o modo SATA está configurado para AHCI na BIOS.
* Certos controladores SATA podem não ser suportados oficialmente pelo macOS. Para esses casos, baixe e instale a [CtlnaAHCIPort.kext](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip).
  * Para controladores SATA muito antigos, a [AHCIPortInjector.kext](https://www.insanelymac.com/forum/files/file/436-ahciportinjectorkext/) pode ser mais apropriada.

## Preso em Restam 2 Minutos

![](../../images/troubleshooting/troubleshooting-md/2-min-remaining.jpeg)

Esse erro está diretamente relacionado ao estágio no qual o macOS escreve certas variáveis de NVRAM para o computador usar na próxima inicialização. Então, quando há problemas relacionados a NVRAM, travamentos podem ocorrer nessa parte.

Para resolver, existem algumas opções:

* Intel série 300 (ex.: Z390):
  * [SSDT-PMC](https://deomkds.github.io/Getting-Started-With-ACPI/).
* Outros podem alterar a `config.plist`:
  * LegacyEnable -> YES
  * LegacyOverwrite -> YES
  * WriteFlash -> YES

## O Servidor de Recuperação Não Pode Ser Contactado

Caso o pendrive de instalação tenha sido criado no Windows ou no Linux, ele é baseado no modo de recuperação. Isso significa que somente uma pequena parte do Instalador do macOS está presente no pendrive e o restante precisa ser baixado dos servidores da Apple. E o motivo pelo qual o este guia não orienta a criação de instaladores completos é devido a natureza instável dos drivers de HFS e outros utilitários que acabam corrompendo dados.

Para resolver o erro, existem algumas opções:

* Certifique-se de ter uma conexão Ethernet ou WiFi que funcione:
  * Abra o `Utilitário de Rede` no menu `Utilitários` no instalador e veja se a placa de rede é exibida.
    * Caso **não** seja exibida, é provável que a *kext* de rede correta não esteja instalada.
      * Veja: [Kexts de Ethernet](../../ktext.md#ethernet) e [Descobrindo Especificações](../../find-hardware.md)
    * Caso ela **seja** exibida, execute `ping -c3 www.google.com` no Terminal do instalador para garantir que a conexão com a internet está funcionando.
      * Caso nada seja exibido, pode haver problemas com as `kexts` de rede ou com a conexão.
        * Recomenda-se tentar variantes antigas das `kexts` para os casos em que as builds mais novas possam ter bugs desconhecidos.
      * Caso alguma coisa seja exibida, então o problema é com a  Apple. Tente instalar novamente em algum outro momento.

| Verificar o NIC | Ping |
| :--- | :--- |
| ![](../../images/troubleshooting/troubleshooting-md/check-network.png) | ![Ping](../../images/troubleshooting/troubleshooting-md/ping.png) |

## Teclado e Mouse Quebrados no macOS 11 Big Sur

Em alguns computadores antigos (ex.: Intel Core 2 Duo, 2010 ou mais antigo), embora as portas USB funcionem, alguns dispositivos de Interface Humana (HID) como teclados e mouses podem não funcionar. Para resolver isso, adicione o seguinte patch:

::: details Patch de IOHIDFamily

`config.plist -> Kernel -> Patch`:

| Key | Type | Value |
| :--- | :--- | :--- |
| Base | String | _isSingleUser |
| Count | Integer | 1 |
| Enabled | Boolean | True |
| Find | Data | |
| Identifier | String | com.apple.iokit.IOHIDFamily |
| Limit | Integer | 0 |
| Mask | Data | |
| MaxKernel | String | |
| MinKernel | String | 20.0.0 |
| Replace | Data | B801000000C3 |
| ReplaceMask | Data | |
| Skip | Integer | 0 |

[Source](https://applelife.ru/threads/ustanovka-macos-big-sur-11-0-beta-na-intel-pc-old.2944999/page-81#post-884400) (em inglês)

:::

## Preso em `Seu Mac precisa de uma atualização de firmware para poder ser instalado nesse volume`

Se uma mensagem de atualização de firmware está sendo exibida ao tentar instalar o macOS em um volue APFS, muito provavelmente há uma SMBIOS desatualizada sendo utilizada. Primeiro, verifique o seguinte:

* Se a opção `PlatformInfo -> Automatic` está habilitada.
* Se a opção `UpdateSMBIOSMode` está configurado para `Create`.
  * Certifique-se de que a opção `CustomSMBIOSGuid` está desabilitada.
  * Em computadores Dell e VAIO, certifique-se de que a opção `CustomSMBIOSGuid` está habilitada e a opção `UpdateSMBIOSMode` está configurada para `Custom`.
    * As opções `CustomSMBIOSGuid` e `UpdateSMBIOSMode` devem sempre ser usadas em conjunto.
* Se há uma SMBIOS suportada na versão do macOS:
  * Ex.: veja se não está usando `-no_compat_check`.
* Se o OpenCore instalado está na versão mais recente.

Se o erro ainda ocorrer, então existe alguma informação de SMBIOS desatualizada no OpenCore. Nesses casos, recomenda-se utilizar uma SMBIOS alternativa que seja similar a atual. Para obter uma lista completa de SMBIOS, acesse a página [Escolhendo a SMBIOS Correta](../../extras/smbios-support.html).
