# OpenCore e o macOS 11 Big Sur

É aquela época do ano de novo e, com ela, veio um novo beta do macOS. Aqui estão todas as informações para começar.

::: tip Lembrete

**Esta página contém uma breve discussão sobre o que é preciso para se preparar para o macOS 11 Big Sur. Um olhar mais detalhado acerca do que mudou com o macOS 11 Big Sur pode ser encontrado aqui:**

* [What's new in macOS 11, Big Sur!](https://dortania.github.io/hackintosh/updates/2020/11/12/bigsur-new.html) (em inglês)

:::

## Table of Contents

[[toc]]

## Pré-requisitos

Antes de pular de cabeça na instalação do macOS 11 Big Sur, será preciso revisar algumas coisas:

### Uma SMBIOS Suportada

O macOS 11 Big Sur deixou de suportar algumas das SMBIOS de CPUs Ivy Bridge e Haswell. Veja a lista abaixo para saber se a sua ainda é suportada:

* iMac14,3 e mais antigas.
  * Observação: iMac14,4 ainda é suportada.
* MacPro5,1 e mais antigas.
* MacMini6,x e mais antigas.
* MacBook7,1 e mais antigas.
* MacBookAir5,x e mais antigas.
* MacBookPro10,x e mais antigas.

Se sua SMBIOS era suportada no macOS 10.15 Catalina e não está incluída na lista acima, está tudo certo!

::: details SMBIOS Suportadas

SMBIOS ainda suportadas no macOS 11 Big Sur:

* iMac14,4 e mais novas.
* MacPro6,1 e mais novas.
* iMacPro1,1 e mais novas.
* MacMini7,1 e mais novas.
* MacBook8,1 e mais novas.
* MacBookAir6,x e mais novas.
* MacBookPro11,x e mais novas.

Para obter uma lista completa de todas as SMBIOS suportadas, incluíndo em quais versões do macOS, veja: [Escolhendo a SMBIOS Correta](../smbios-support.md).

:::

Para aqueles que estejam procurando por uma simples tradução para seus computadores:

* Usuários de iMac13,1 devem passar a usar iMac14,4.
* Usuários de iMac13,2 devem passar a usar iMac15,1.
* Usuários de iMac14,2 e iMac14,3 devem passar a usar iMac15,1.
  * Observação: usuários de CPUs AMD com GPUs Nvidia talvez achem a MacPro7,1 mais apropriada.
* Usuários de iMac14,1 devem passar a usar iMac14,4.

### Hardware Suportado

Poucas coisas deixaram de ser suportadas, mas aqui estão algumas que deixaram:

* CPUs Ivy Bridge U, H e S oficiais.
  * Essas CPUs ainda serão capazes de iniciar sem muitos problemas, mas observe que não existem mais Macs suportados pelo macOS 11 Big Sur que utilizem CPUs Ivy Bridge para consumidores.
  * CPUs Ivy Bridge-E ainda são suportadas graças ao MacPro6,1.
* GPUs integradas das CPUs Ivy Bridge terão suporte removido.
  * No entanto, os drivers da HD 4000 e HD 2500 ainda estão presentes no macOS 11.0.1 Big Sur.
* Placas Wi-Fi com chipsets BCM4331 e BCM43224.
  * Veja o [Guia de Compra Wi-Fi](https://deomkds.github.io/Wireless-Buyers-Guide/) para alternativas de atualização.
  * Possível contorno é injetar uma versão corrigida da IO80211Family. Veja este link para mais detalhes: [IO80211 Patches](https://github.com/khronokernel/IO80211-Patches) (em inglês).
* Alguns controladores SATA.
  * Por algum motivo, a Apple removeu a classe AppleIntelPchSeriesAHCI da `AppleAHCIPort.kext`. Devido a remoção completa dessa classe, tentar falsificar outro ID (geralmente feito pela `SATA-unsupported.kext`) pode falhar para uns e causar instabilidade para outros.
  * Uma correção parcial é injetar a versão do macOS 10.15 Catalina que tenha tido seus símbolos conflitantes corrigidos. É possível encontrar uma versão de exemplo aqui: [AppleAHCIPort.kext do macOS 10.15 Catalina com Patches](https://github.com/deomkds/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip)
  * Recomenda-se configurar o valor do `MinKernel` para 20.0.0 na *kext* `CtlnaAHCIPort.kext`, de forma a evitar quaisquer conflitos em potencial. Dessa forma, funcionará tanto no macOS 10.15 Catalina e no macOS 11 Big Sur e a SATA-unsupported poderá ser removida.

Outras mudanças notáveis:

* Usuários de GPUs Navi MSI não mais precisam do patch `ATY,rom`/`-wegnoegpu` para iniciar o instalador.
* O estágio 2 da instalação exige NVRAM funcional.
  * Asus Série 9: para mais informações, acesse [Haswell ASUS Z97 Big Sur Update Thread](https://www.reddit.com/r/hackintosh/comments/jw7qf1/haswell_asus_z97_big_sur_update_and_installation/) (em inglês).
  * Usuários de X99 e X299 com NVRAM quebrada precisarão instalar em outro computador e mover o SSD ao terminar.

### Kexts atualizadas, bootloader e config.plist

Certifique-se de estar usando a versão mais recente do OpenCore, das *kexts* e da `config.plist` para eviar problemas estranhos de compatibilidade. É possível baixar e atualizar o OpenCore e as *kexts* seguindo o guia:

* [Atualizando o OpenCore e o macOS](https://deomkds.github.io/OpenCore-Post-Install/universal/update.html)

Caso não tenha certeza de qual versão do OpenCore está sendo executada, é possível descobrir usando o seguinte comando no Terminal:

```sh
nvram 4D1FDA02-38C7-4A6A-9CC6-4BCCA8B30102:opencore-version
```

* Observação: este comando exige que o bit `0x2` seja adicionado na opção `Misc -> Security -> ExposeSensitiveData`. O valor recomendado para a opção `ExposeSensitiveData` é `0x6`, que inclui os bits `0x2` e `0x4`.

#### Observação Sobre AMD

**Lembrete para Usuários de AMD**: Não se esqueça de atualizar os patches de *kernel* usando aqueles fornecidos para AMD OS X, ou o macOS 11 Big Sur não iniciará:

* [Patches de AMD](https://github.com/AMD-OSX/AMD_Vanilla/) (em inglês)

#### Observação Sobre Intel HEDT

Os usuários de X79, X99 e X299 devem prestar muita atenção ao exposto a seguir. O macOS 11 Big Sur adicionou novas exigências para ACPI, então será necessário baixar novas SSDTs:

* X79
  * [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl)
* X99
  * [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl)
  * [SSDT-RTC0-RANGE](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl)
* X299
  * [SSDT-RTC0-RANGE](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl)

Para os que preferem arquivos pré-compilados, veja:

* [Primeiros Passos com a ACPI: SSDTs Pré-compiladas](https://deomkds.github.io/Getting-Started-With-ACPI/ssdt-methods/ssdt-prebuilt.html)

### Problemas Conhecidos

Muita coisa parou de funcionar com o macOS 11 Big Sur. Principalmente:

* Lilu
  * Os patches de espaço de usuário foram muito afetados. Isso significa que alguns recursos pararam de funcionar:
  * Incluem:
    * DiskArbitrationFixup
    * MacProMemoryNotificationDisabler
    * SidecarEnabler
    * SystemProfilerMemoryFixup
    * NoTouchID
    * Patches de DRM e `-cdfon` da WhateverGreen
* AirportBrcmFixup
  * Forçar o carregamento de um driver específico por meio do `brcmfx-driver=` pode ajudar.
    * Por exemplo, usuários de BCM94352Z talvez precisem de `brcmfx-driver=2` nos arugmentos de inicialização para resolver isso. Outros chipsets precisarão de outras variáveis.
  * Configurar o `MaxKernel` para 19.9.9 na `AirPortBrcm4360_Injector.kext` pode ajudar. Mais informações [no repositório](https://github.com/acidanthera/AirportBrcmFixup/blob/master/README.md#please-pay-attention) (em inglês).
* Suporte a SATA quebrado.
  * Devido à remoção da classe AppleIntelPchSeriesAHCI na `AppleAHCIPort.kext`.
  * Para resolver isso, instale a [AppleAHCIPort.kext do macOS 10.15 Catalina com Patches](https://github.com/deomkds/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip), configurando o `MinKernel` para 20.0.0.

E embora não seja um problema, o SIP ganhou um novo bit. Para desativá-lo da maneira correta, será necessário configurar a opção `csr-active-config` para `FF0F0000`. Veja mais detalhes aqui: [Desativando o SIP](../../troubleshooting/extended/post-issues.md#desativando-o-sip).

## Instalação

Os guias foram atualizados para acomodar o macOS 11 Big Sur. Veja a página que melhor se aplica a você:

* [Usuários de macOS](../../installer-guide/mac-install.md)
* [Usuários de Windows](../../installer-guide/winblows-install.md)
* [Usuários de Linux](../../installer-guide/linux-install.md)

## Solução de Problemas

### Preso em `Forcing CS_RUNTIME for entitlement`

![Créditos a Stompy pela imagem](../../images/extras/big-sur/readme/cs-stuck.jpg)

Esta é a parte na qual o macOS sela o volume do sistema, e onde pode parecer que o macOS está travado. **NÃO REINICIE** pensando que travou, pois este processo pode demorar um pouco para terminar e corromperá a instalação caso seja interrompido.

### Preso em `PCI Configuration Begins` em Placas Intel X99 e X299

![](../../images/extras/big-sur/readme/rtc-error.jpg)

Como mencionado anteriormente, placas-mãe Intel HEDT podem ter alguns problemas relacionados com o dispositivo RTC na ACPI. Para resolver, será preciso verificar o dispositivo RTC e ver quais regiões estão faltando. Para obter mais informaçõe, acesse: [SSDT-RTC0-RANGE.dsl](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0-RANGE.dsl) (em inglês).

### Preso em `ramrod`(^^^^^^^^^^^^^)

![Créditos a Notiflux pela imagem](../../images/extras/big-sur/readme/ramrod.jpg)

Caso fique preso perto da seção `ramrod` (inicia, dá esse erro e reinicia de novo nesse erro, causando um loop), significa que o emulador de SMC está com problemas. Para corrigir, existem duas opções:

* Certifique-se de estar usando as *builds* mais recentes da VirtualSMC e da Lilu, com o argumento de inicialização `vsmcgen=1`.
* Alterne para a [FakeSMC do Rehabman](https://bitbucket.org/RehabMan/os-x-fakesmc-kozlek/downloads/) (pode usar o truque do `MinKernel`/`MaxKernel` mencionado anteriormente para restringir a FakeSMC ao macOS 11 Big Sur e superior).

E ao trocar de *kexts*, certifique-se de que não ter ambas FakeSMC e VirtualSMC ativadas na `config.plist` para a mesma versão do macOS, já que isso causará conflitos.

### Kernel Panic em X79 e X99 na IOPCIFamily

Isso deve-se a presença de Pontes PCI não utilizadas ativadas na ACPI. Dessa forma, quando o IOPCIFamily procura por dispositivos desconhecidos, causa um *kernel panic*. Para resolver, será preciso adicionar a [SSDT-UNC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl) nas configurações.

### Injeção de DeviceProperties Falhando

O macOS 11 Big Sur é muito mais enjoado em relação aos dispositivos presentes na ACPI. Em especial, se estiver injetando propriedades importantes para a WhateverGreen ou a AppleALC, pode notar que algumas delas não são aplicadas. Para verificar se a ACPI define o hardware, procure pela propriedade `acpi-path` no [IORegistryExplorer](https://github.com/khronokernel/IORegistryClone/blob/master/ioreg-210.zip):

![](../../images/extras/big-sur/readme/acpi-path.png)

Se nenhuma propriedade for encontrada, será necessário criar uma SSDT que fornecerá o caminho completo, visto que o computador provavelmente possui uma ponte PCI que não está documentada em nenhuma tabela ACPI. Um exemplo disso pode ser encontrado aqui: [SSDT-BRG0](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-BRG0.dsl) (em inglês).

* **Observação**: este problema também pode aparecer em versões mais antigas do macOS, no entanto, o macOS 11 Big Sur é o mais provável de apresentar problemas.

## Teclado e Mouse Não Funcionam

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

### Kernel Panic Precoce em `max_cpus_from_firmware not yet initialized`

Caso ocorra um *kernel panic* precoce em `max_cpus_from_firmware not yet initialized`, deve-se ao novo método `acpi_count_enabled_logical_processors` adicionado no *kernel* do macOS 11 Big Sur. Para resolver isso, certifique-se de estar usando o OpenCore 0.6.0 ou mais novo com a *quirk* `AvoidRuntimeDefrag` ativada.

* **Observação**: devido ao momento em que este *kernel panic* ocorre, talvez só seja possível obter um registro dele por meio da porta serial ou reiniciando uma instalação funcional do macOS e checando os *logs* da NVRAM.
  * A maioria dos usuários verão este *kernel panic* simplesmente como `[EB|#LOG:EXITBS:START]`.

::: details Kernel Panic de Exemplo

Na tela:

![](../../images/extras/big-sur/readme/onscreen-panic.png)

Registro por porta serial ou NVRAM:

![](../../images/extras/big-sur/readme/apic-panic.png)

:::

::: details Problema Raro Legado

Em alguns hardwares, principalmente o HP DC7900, o *kernel* ainda não consegue determinar exatamente quantas *threads* o hardware suporta. Isso resultará no *kernel panic* supracitado e será necessário especificar manualmente a contagem de núcleos da CPU.

Para fazer isso, adicione o seguinte patch (substituindo o 04 de B8 **04** 00 00 00 C3 pela quantidade de *threads* da CPU que o hardware suporta):

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| Base | String | _acpi_count_enabled_logical_processors |
| Count | Integer | 1 |
| Enabled | Boolean | True |
| Find | Data | |
| Identifier | String | Kernel |
| Limit | Integer | 0 |
| Mask | Data | |
| MaxKernel | String | |
| MinKernel | String | 20.0.0 |
| Replace | Data | B804000000C3 |
| ReplaceMask | Data | |
| Skip | Integer | 0 |

:::

### Impossível Atualizar Para Novas Versões do macOS 11 Big Sur

Geralmente, existem 2 culpados principais:

* [Utilitário de Atualização Quebrado](#utilitário-de-atualização-quebrado)
  * Erro mais comum ao executar versoes betas. Tente isso primeiro.
* [Selo Violado](#selo-violado)

#### Utilitário de Atualização Quebrado

Geralmente visto em todos os ciclos de betas. Simplesmente saia e entre novamente no catálogo de betas.

```sh
# Saia do catálogo de betas.
sudo /System/Library/PrivateFrameworks/Seeding.framework/Resources/seedutil unenroll
# Entre novamente.
sudo /System/Library/PrivateFrameworks/Seeding.framework/Resources/seedutil enroll DeveloperSeed
```

Então verifique novamente as configurações que a atualização deverá aparecer. Caso não aconteça, execute o seguinte:

```sh
# Listar as atualizações de software pelo Terminal.
softwareupdate -l
```

Isso deve ajudar a empurrar o Utilitário de Atualização de volta à ação. Caso ainda tenha problemas, veja a próxima seção.

#### Selo Violado

Com as snapshots que a Apple faz do volume do sistema, agora as atualizações de software dependem muito disso para funcionar corretamente. Então, quando o selo de um volume está violado, o macOS se recusará a atualizar aquele volume.

Para verificar isso, veja se `Snapshot Sealed` retorna YES:

```bash
# Lista todos os volumes APFS.
diskutil apfs list

# Procure pelo volume do sistema.
Volume disk1s8 A604D636-3C54-4CAA-9A31-5E1A460DC5C0
        ---------------------------------------------------
        APFS Volume Disk (Role):   disk1s8 (System)
        Name:                      Big Sur HD (Case-insensitive)
        Mount Point:               Not Mounted
        Capacity Consumed:         15113809920 B (15.1 GB)
        Sealed:                    Broken
        FileVault:                 No
        |
        Snapshot:                  4202EBE5-288B-4701-BA1E-B6EC8AD6397D
        Snapshot Disk:             disk1s8s1
        Snapshot Mount Point:      /
        Snapshot Sealed:           Yes
```

Se retornar `Snapshot Sealed: Broken`, então será necessário realizar os passos a seguir:

* Atualize para o OpenCore 0.6.4 ou mais novo:
  * Exige especificamente o *commit* [ba10b5d](https://github.com/acidanthera/OpenCorePkg/commit/1b0041493d4693f9505aa6415d93079ea59f7ab0) (em inglês) ou mais novo.
* Reverta para snapshots mais antigas.
  * Principalmente para aqueles que tenham feito alterações no volume do sistema.
  * Veja aqui como reverter: [Revertendo Snapshots APFS](../../troubleshooting/extended/post-issues.md#revertendo-snapshots-apfs)

### Kernel Panic em `Rooting from the live fs`

Erro completo:

```
Rooting from the live fs of a sealed volume is not allowed on a RELEASE build
```

Isso deve-se a problemas com o a Inicialização Segura estando ativada no beta 10 enquanto utiliza versões antigas do OpenCore. Simplesmente atualize para a versão 0.6.4 para resolver.

* Exige especificamente o *commit* [ba10b5d](https://github.com/acidanthera/OpenCorePkg/commit/1b0041493d4693f9505aa6415d93079ea59f7ab0) (em inglês) ou mais recente.

### Asus Z97 e HEDT (ex.: X99 e X299) Falhando no Estágio 2 da Instalação

A instalação do macOS 11 Big Sur possui uma dependência maior na NVRAM nativa. Caso ela não funcione, o instalador travará em um *boot loop*. Para resolver isso, será necessário uma das coisas a seguir:

* Instalar o macOS 11 Big Sur em outro computador, então transferir o disco rígido.
* Consertar a NVRAM da placa-mãe.
  * Aplicável principalmente a Asus Série Z97.

Para o último, veja: [Haswell ASUS Z97 Big Sur Update Thread](https://www.reddit.com/r/hackintosh/comments/jw7qf1/haswell_asus_z97_big_sur_update_and_installation/) (em inglês).

### Notebooks com Kernel Panics em `cannot perform kext scan`

Isso deve-se ao fato de existirem multiplas cópias da mesma *kext* presente no *kernel cache*. Para ser mais específico, múltiplas cópias da VoodooInput. Verifique o caminho `Kernel -> Add` para ter certeza de que há somente uma cópia da VoodooInput ativada.

* Observação: tanto a VoodooI2C quanto a VoodooPS2 possuem uma cópia da VoodooInput dentro delas. Desabilite uma de sua preferência.
