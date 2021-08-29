# Problemas de Kernel

Problemas que partem da primeira inicialização do instalador do macOS até o momento antes da interface gráfica aparecer.

[[toc]]

## Preso em `[EB|#LOG:EXITBS:START]`

Essa seção será dividida em três partes, então preste bastante atenção:

* [Problemas na Seção Booter](#problemas-na-seção-booter)
* [Problemas na Seção Kernel Patch](#problemas-na-seção-kernel-patch)
* [Problemas na Seção UEFI](#problemas-na-seção-uefi)
* [Problemas de Máquinas Virtuais](#problemas-de-máquinas-virtuais)

### Problemas na Seção Booter

Os principais culpados a se observar na seção Booter são:

* **DevirtualiseMmio**
  * Algumas regiões de MMIO ainda são necessárias para o correto funcionamento, então será necessário excluir essas regiões usando a opção `Booter -> MmioWhitelist` ou desativar completamente esta *quirk*. Veja mais informações aqui: [Usando o DevirtualiseMmio](../../extras/kaslr-fix.md#usando-o-devirtualisemmio)
  * Usuários de TRx40 devem habilitar esta *quirk*.
  * Usuários de X99 precisam desabilitar esta *quirk* pois ela causa problemas em alguns firmwares.

* **SetupVirtualMap**
  * Esta *quirk* é necessária na maioria dos firmwares e sem ela é bem comum ter *kernel panics*. Habilite-a caso ainda não esteja.
    * Necessário principalmente em placas Z390 e mais antigas.
    * No entanto, alguns firmwares (2020+) não funcionam com esta *quirk* e podem causar *kernel panic*:
      * Série Ice Lake da Intel.
      * Série Comet Lake da Intel (B460, H470, Z490 etc).
      * AMD B550 e A520 (agora inclui a última versão da BIOS em placas X570).
        * Muitas placas B450 e X470 com atualizações de BIOS do final de 2020 também estão inclusas.
      * AMD TRx40.
      * Máquinas virtuais como o QEMU.
      * Placas X299 com atualização de BIOS 2020+ (aplica-se também a placas X299 na última versão da BIOS lançada ou no final de 2019 ou em 2020+).

* **EnableWriteUnprotector**

  * Outro problema pode ser que o macOS esteja conflitando com a proteção de escrita do registrador CR0. Para resolver isto, existem duas opções:
    * Caso o firmware suporte MATs (firmwares de 2018 em diante):
      * EnableWriteUnprotector -> NO
      * RebuildAppleMemoryMap -> YES
      * SyncRuntimePermissions -> YES
    * Em firmwares mais antigos:
      * EnableWriteUnprotector -> YES
      * RebuildAppleMemoryMap -> NO
      * SyncRuntimePermissions -> NO
    * Observação: alguns notebooks (ex.: Dell Inspiron 5370), mesmo tendo suporte a MATs, travam na inicialização. Para esses casos, existem duas opções:
      * Iniciar com a combinação antiga de *quirk* de firmware (isto é, habilitar `EnableWriteUnprotector` e desabilitar `RebuildAppleMemoryMap` + `SyncRuntimePermissions`)
      * Habilitar `DevirtualiseMmio` e seguir o [guia do MmioWhitelist](https://deomkds.github.io/OpenCore-Install-Guide/extras/kaslr-fix.html).

Sobre o suporte a MATs, firmwares compilados com o EDK 2018 terão suporte. Muitas OEMs também adicionaram suporte até notebooks com CPUs Skylake. Acontece que não é sempre óbvio se a OEM atualizou o firmware, mas é possível checar os logs do OpenCore para saber se seu computador possui suporte. ([Veja como acessar o log aqui.](../debug.html)):

```
OCABC: MAT support is 1
```

* Observação: `1` significa que há suporte para MATs, enquanto `0` significa que não há suporte.

### Problemas na Seção Kernel Patch

Esta seção será dividida entre usuários de Intel e AMD:

#### Usuários de AMD

* Faltando [patches de *kernel*](https://github.com/AMD-OSX/AMD_Vanilla/tree/opencore) (em inglês e só é aplicável a CPUs AMD). Certifique-se de estar usando patches do OpenCore e não do Clover. O Clover usa `MatchOS` enquanto o OpenCore usa  `MinKernel` e `Maxkernel`.
  * Observe que patches de *kernel* obsoletos também terão o mesmo efeito, então certifique-se de estar usando os patches para AMD mais recentes.

#### Usuários de Intel

* **AppleXcpmCfgLock** e **AppleCpuPmCfgLock**
  * Faltando patches de CFG ou XCPM. Ative as opções `AppleXcpmCfgLock` e `AppleCpuPmCfgLock`.
    * CPUs Haswell e mais novas usam somente a opção `AppleXcpmCfgLock`.
    * CPUs Ivy Bridge e mais antigas usam somente a opção `AppleCpuPmCfgLock`
      * CPUs Broadwell e mais antigas precisam da opção `AppleCpuPmCfgLock` ao executar o OS X 10.10 Yosemite ou mais antigo.
  * Alternativamente, é possível desativar a trava de CFG do jeito certo: [Corrigindo o CFG-Lock](https://deomkds.github.io/OpenCore-Post-Install/misc/msr-lock.html)
* **AppleXcpmExtraMsrs**
  * Também pode ser necessário. Geralmente se aplica a Pentiums, HEDT e outros sistemas diferentes que não são nativamente suportados pelo macOS.

#### Usuários de Intel Antigo

No macOS 11 Big Sur, muitos firmwares têm problemas ao determinar a quantidade de núcleos da CPU e, portanto, sofrerão *kernel panics* muito precocemente, antes mesmo de exibirem qualquer saída na tela. Por meio da porta serial, é possível ver o seguinte *kernel panic*:

```
max_cpus_from_firmware not yet initialized
```

Para resolver:

* Ative a opção `AvoidRuntimeDefrag` no caminho `Booter -> Quirks`.
  * Deve funcionar para a maioria dos firmwares.

No entanto, em alguns computadores como o HP Compaq DC 7900, o firmware ainda causa *kernel panic*, então é necessário forçar um valor para a quantidade de núcleos da CPU. Somente use o patch a seguir caso a opção `AvoidRuntimeDefrag` não funcione:

::: details Patch de Núcleos de CPU Antiga

Adicione o seguinte patch, substituindo o `04` do `B8 **04** 00 00 00 C3` pela quantidade de *threads* que a CPU do seu computador possui:

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| Base | String | \_acpi\_count\_enabled\_logical\_processors |
| Count | Integer | 1 |
| Enabled | Boolean | YES |
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

### Problemas na Seção UEFI

* **ProvideConsoleGop**
  * Necessário para transicionar para a tela seguinte. Originalmente, isso era parte do driver AptioMemoryFix, mas foi integrado ao OpenCore por meio desta *quirk*. Pode ser encontrado no caminho `UEFI -> Output`.
  * Observe que, a partir da versão 0.5.6, esta *quirk* vem ativada por padrão na `sample.plist`.
* **IgnoreInvalidFlexRatio**
  * Isso é necessário em CPUs Broadwell e mais antigas. **Não use em AMD ou Skylake e mais novos**.

## Preso em EndRandomSeed

Mesmo problema descrito acima. Consulte a seção [Preso em `[EB|#LOG:EXITBS:START]`](#preso-em-eb-log-exitbs-start) para obter mais detalhes.

## Preso após selecionar a partição do macOS no OpenCore

Mesmo problema descrito acima. Consulte a seção [Preso em `[EB|#LOG:EXITBS:START]`](#preso-em-eb-log-exitbs-start) para obter mais detalhes.

* Observação: habilitar a [depuração do OpenCore](../debug.html) pode ajudar a clarificar melhor as coisas.

## Kernel Panic em `Invalid frame pointer`

Isso deve-se a algum problema na hora de configurar as opções do caminho `Booter -> Quirks`. Verifique o seguinte:

* `DevirtualiseMmio`
  * Alguns espaços de MMIO ainda são necessários para o correto funcionamento, então será preciso excluir essas regiões no caminho `Booter -> MmioWhitelist` ou desativar esta *quirk* completamente.
  * Mais informações aqui: [Usando o DevirtualiseMmio](../../extras/kaslr-fix.md#usando-o-devirtualisemmio)

* `SetupVirtualMap`
  * Esta *quirk* é necessária para a maioria dos firmwares e sem ela, é bastante comum encontrar um *kernel panic* aqui. Ative-a caso ainda não esteja.
    * No entanto, certos firmwares não funcionam com esta *quirk*, o que pode também causar essa *kernel panic*:
      * Série Ice Lake da Intel.
      * Série Comet Lake da Intel.
      * AMD B550.
      * AMD A520.
      * AMD TRx40.
      * Máquinas virtuais como o QEMU.

Outro problema pode ser que o macOS esteja conflitando com a proteção de escrita do registrador CR0. Para resolver isso, existem duas opções:

* Caso o firmware suporte MATs (firmwares de 2018 em diante):
  * EnableWriteUnprotector -> NO
  * RebuildAppleMemoryMap -> YES
  * SyncRuntimePermissions -> YES
* Firmwares mais antigos:
  * EnableWriteUnprotector -> YES
  * RebuildAppleMemoryMap -> NO
  * SyncRuntimePermissions -> NO

Sobre o suporte a MATs, firmwares compilados com o EDK 2018 terão suporte. Muitas OEMs também adicionaram suporte até notebooks com CPUs Skylake. Acontece que não é sempre óbvio se a OEM atualizou o firmware, mas é possível checar os logs do OpenCore para saber se seu computador possui suporte. ([Veja como acessar o log aqui.](../debug.html)):

```
OCABC: MAT support is 1
```

* Observação: `1` significa que há suporte para MATs, enquanto `0` significa que não há suporte.

## Preso em `[EB|LD:OFS] Err(0xE)` ao inicializar o volume Preboot

Erro completo:

```
[EB|`LD:OFS] Err(0xE) @ OPEN (System\\Library\\PrelinkedKernels\\prelinkedkernel)
```

Isso pode acontecer quando o volume Preboot não está atualizado corretamente. Para corrigir, será necessário iniciar no modo de Recuperação e repará-lo por lá:

1. Habilite a opção `JumpstartHotplug` no caminho `UEFI -> APFS` (o partição de Recuperação pode não iniciar no macOS 11 Big Sur sem essa opção).
2. Inicie no modo de Recuperação.
3. Abra o Terminal e execute os seguintes comandos:

```bash
# Primeiro, encontre o seu volume Preboot.
diskutil list

# Na lista abaixo, é possível ver que o volume Preboot corresponde a disk5s2.
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

# Agora monte o volume Preboot.
diskutil mount disk5s2

# Então, execute o comando updatePreboot no volume Preboot.
diskutil apfs updatePreboot /volume/disk5s2
```

Por fim, reinicie o computador.

## Preso em `OCB: LoadImage failed - Security Violation`

Erro completo:

```
OCSB: No suitable signature - Security Violation
OCB: Apple Secure Boot prohibits this boot entry, enforcing!
OCB: LoadImage failed - Security Violation
```

Isso deve-se à presença de manifestos de Inicialização Segura da Apple desatualizados ou à completa falta deles no volume Preboot. O resultado é uma falha de carregamento caso a opção `SecureBootModel` esteja configurada. O motivo para a falta desses arquivos é um bug do macOS.

Para resolver, faça uma das opções a seguir:

* Desative o `SecureBootModel`.
  * Isto é, configure a opção `Misc -> Security -> SecureBootModel -> Disabled`.
* Reinstale o macOS usando a última versão.
* Copie os manifestos da Inicialização Segura do diretório `/usr/standalone/i386` para `/Volumes/Preboot/<UUID>/System/Library/CoreServices`.
  * Observe que será necessário fazer isso pelo Terminal pois o volume Preboot não é facilmente editável pelo Finder.
  
Para fazer isso pelo Terminal:

```bash
# Primeiro, encontre o seu volume Preboot.
diskutil list

# Na lista abaixo, é possível ver que o volume Preboot corresponde a disk5s2.
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

# Agora monte o volume Preboot.
diskutil mount disk5s2

# Acesse o volume Preboot
# Observe que o diretório do volume Preboot é /System/Volumes/Preboot.
cd /System/Volumes/Preboot

# Obtenha o UUID.
ls
 46923F6E-968E-46E9-AC6D-9E6141DF52FD
 CD844C38-1A25-48D5-9388-5D62AA46CFB8

# Caso apareçam vários, (ex.: dual boot de várias versões do macOS),
# será necessário determinar qual o UUID é o correto.
# A maneira mais fácil de fazer isso é imprimindo o valor de .disk_label.contentDetails
# para cada volume.
cat ./46923F6E-968E-46E9-AC6D-9E6141DF52FD/System/Library/CoreServices/.disk_label.contentDetails
 Big Sur HD%

cat ./CD844C38-1A25-48D5-9388-5D62AA46CFB8/System/Library/CoreServices/.disk_label.contentDetails
 Catalina HD%

# Então, copie os arquivos da Inicialização Segura
# Substitua o CD844C38-1A25-48D5-9388-5D62AA46CFB8 pelo valor do seu UUID.
cd ~
sudo cp -a /usr/standalone/i386/. /System/Volumes/Preboot/CD844C38-1A25-48D5-9388-5D62AA46CFB8/System/Library/CoreServices
```

## Preso em `OCABC: Memory pool allocation failure - Not Found`

Isso se deve a configurações incorretas na BIOS. Verifique as seguintes opções:

* Veja se o `Above4GDecoding` está habilitado.
* Veja se o CSM está desativado (ativar o modo Windows8.1/10 WHQL pode ter o mesmo efeito em algumas placas).
  * Observe que, em alguns notebooks, o CSM precisa estar habilitado.
* Veja se a BIOS está atualizada (Z390 e HEDT são conhecidos por terem firmwares mal feitos).

## Preso em `Buffer Too Small`

* Habilite a opção `Above4GDecoding` na BIOS.

## Preso em `Plist only kext has CFBundleExecutable key`

Opção `Executable path` faltante ou incorreta na `config.plist`. Deve ser resolvido ao executar novamente a função de *snapshots* do ProperTree (Cmd/Ctrl+R).

## Preso em `This version of Mac OS X is not supported: Reason Mac...`

Esse erro acontece quando a SMBIOS não é mais suportada por aquela versão do macOS. Certifique-se de que os valores no caminho `PlatformInfo->Generic` estão com `Automatic` ativado. Para obter uma lista completa das SMBIOS suportadas e seus respecitvos sistemas operacionais, veja: [Escolhendo a SMBIOS Correta](../../extras/smbios-support.md).

::: details SMBIOS Suportadas no macOS 10.15 Catalina

* iMac13,x+
* iMacPro1,1
* MacPro6,1+
* MacMini6,x+
* MacBook8,1+
* MacBookAir5,x+
* MacBookPro9,x+

:::

::: details SMBIOS Suportadas no macOS 11 Big Sur

* iMac14,4+
* iMacPro1,1
* MacPro6,1+
* MacMini7,1+
* MacBook8,1+
* MacBookAir6,x+
* MacBookPro11,x+

:::

## Erros de `Couldn't allocate runtime area`

Veja o guia [Calculando o Valor de Slide do KASLR](../../extras/kaslr-fix.md).

## Preso em `RTC...`, `PCI Configuration Begins`, `Previous Shutdown...`, `HPET`, `HID: Legacy...`

Essas mensagens acontecem no momento em que a maioria dos dispositivos PCI são configurados pela primeira vez, e é onde a maioria dos problemas de inicialização podem ocorrer. Outros nomes incluem:

* `apfs_module_start...`,
* `Waiting for Root device`,
* `Waiting on...IOResources...`,
* `previous shutdown cause...`

Os principais lugares a se verificar são:

* **Falta do Patch de EC**:
  * Certifique-se de que a SSDT EC está presente tanto no diretório `EFI/OC/ACPI` quanto no caminho `ACPI -> Add`. **Verifique DUAS VEZES se está ativado.**
  * Caso não possua uma SSDT EC, baixe-a aqui: [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/).
* **Conflito de IRQ**:
  * Mais comum em notebooks mais antigos e em computadores pré-montados. Execute a opção FixHPET do SSDTTime e adicione o arquivo SSDT-HPET.aml resultante, bem como os patches de ACPI, na `config.plist` (a SSDT não funcionará sem os patches de ACPI).
* **Problema de Alocação de PCI**:
  * **ATUALIZE A BIOS**. Certifique-se de estar usando a versão mais recente. A maioria das OEMs possuem códigos de alocação de PCI muito quebrados em firmwares antigas, especialmente em computadores AMD.
  * Certifique-se de que a opção `Above4GDecoding` está habilitada na BIOS. Se a opção não estiver disponível, adicione `npci=0x2000` nos argumentos de inicialização.
    * Algumas placas X99 e X299 (ex.: GA-X299-UD4) podem precisar que tanto o argumento de inicialização quanto a opção Above4G estejam ligadas.
    * Observação sobre CPU AMD: **Não mantenha as duas opções, `Above4GDecoding` e npci nos argumentos de inicialização, ligados ao mesmo tempo. Elas vão conflitar.**
    * Observações sobre BIOS de 2020 em diante: ao ativar a opção `Above4GDecoding`, a opção `Resizable BAR Support` pode surgir. Certifique-se de mantê-la **DESLIGADA** em vez de `Auto`.
  * Outras configurações de BIOS importantes: CSM deve estar desativado, Modo Windows 8.1/10 UEFI deve estar habilitado.
* **Problemas de NVMe ou SATA**:
  * Às vezes, ao usar um controlador SATA ruim ou uma unidade NVMe não suportada, o macOS pode travar aqui. Coisas a se verificar:
    * Não utilizar SSDs NVMe Samsung PM981 ou Micron 2200S.
    * Atualizar o firmware do Samsung 970 Evo Plus. Firmwares antigos são conhecidos por causar instabilidade e travamentos. Veja esta [página](https://www.samsung.com/semiconductor/minisite/ssd/download/tools/)) (em inglês) para obter mais detalhes.
    * Desativar o *hot-plug* de SATA na BIOS (é mais comum causar problemas em computadores baseados em CPUs AMD).
    * Garantir que as unidades NVMe estão configuradas para o modo NVMe na BIOS (algumas BIOS têm um bug que permite configurar unidades NVMe como SATA).
* **NVRAM Falhando**:
  * Problema comum em HEDT e placas-mãe série 300. Existem alguns caminhos a se tomar:
    * Intel Série 300 Consumer: Veja os [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para criar uma `SSDT-PMC.aml`.
    * HEDT (ex.: X99): Veja [Emulando a NVRAM](https://deomkds.github.io/OpenCore-Post-Install/misc/nvram.html) para interromper a escrita na NVRAM. Observe que, para a instalação, não há a necessidade de executar o script. Basta configurar a `config.plist`.
* **RTC Faltando**:
  * Comumente encontrado em placas Intel Série 300+ (ex.: Z370, Z490), causado pelo relógio RTC estar desativado por padrão. Veja os [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para criar uma `SSDT-AWAC.aml`.
  * Placas X99 e X299 possuem dispositivos RTC quebrados que precisarão ser consertados com a `SSDT-RTC0-RANGE`. Veja os [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para saber como criá-la.
  * Algum programador de firmware bêbado na HP também desabilitou o RTC no HP 250 G6, sem que houvesse uma forma de reativá-lo.
    * Modelos conhecidos afetados: `HP 15-DA0014dx`, `HP 250 G6`.
    * Para os usuários que foram amaldiçoados com tal hardware, será preciso criar um relógio RTC falso para o macOS brincar. Veja os [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para obter mais detalhes. Veja também a imagem de exemplo abaixo:

Exemplo de como um RTC desativado sem que haja uma forma de ativá-lo se parece (observe que não há um valor para reativá-lo, como em `STAS`):

![](../../images/troubleshooting/troubleshooting-md/rtc.png)

## Preso em `ACPI table loading` na B550

![](../../images/troubleshooting/troubleshooting-md/OC_catalina.jpg)

Caso esteja ficando travado na ou próximo da parte onde as tabelas ACPI são carregadas em placas-mãe AMD B550 ou A520, adicione a seguinte SSDT:

* [SSDT-CPUR.aml](https://github.com/deomkds/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-CPUR.aml)

E lembre-se de adicionar essa SSDT tanto no diretório `EFI/OC/ACPI` **quanto na** `config.plist`, no caminho `ACPI -> Add` (a função de *snapshot* do ProperTree pode fazer isso por você).

## "Waiting for Root Device" ou Erro do Sinal de Proibido

* Outros nomes: Sinal de Pare, *Scrambled*

Isso é geralmente visto como um erro de SATA ou USB. Algumas maneiras de corrigir podem ser:

### Problemas de USB

Essa solução presume que o pendrive de instalação estaja sendo iniciado e não o macOS em si.

* Caso esteja atingindo o limite de 15 portas, é possível contornar o problema temporariamente usando a opção `XhciPortLimit`. Porém, para uso no longo prazo, é recomendado criar um [Mapa de USB](https://deomkds.github.io/OpenCore-Post-Install/usb/).
  * Ative a opção no caminho `Kernel -> Quirks -> XhciPortLimit -> YES`.

* Outro problema pode ser que certos firmwares não transmitirão a posse da USB para o macOS.
  * Ative a opção no caminho `UEFI -> Quirks -> ReleaseUsbOwnership -> YES`.
  * Ativar a opção `XHCI Handoff` na BIOS também pode resolver este problema.

* Às vezes, se o pendrive for conectado em uma porta 3.x, conectá-lo em uma porta 2.0 pode resolver o problema.

* Para CPUs AMD 15h e 16h, talvez seja preciso adicionar o seguinte:
  * [XLNCUSBFix.kext](https://cdn.discordapp.com/attachments/566705665616117760/566728101292408877/XLNCUSBFix.kext.zip)

* Se a *kext* `XLNCUSBFix` não funcionar, tente o seguinte:
  * [AMD StopSign-fixv5](https://cdn.discordapp.com/attachments/249992304503291905/355235241645965312/StopSign-fixv5.zip)

* Usuários de placas X299: ative a opção `Above4GDecoding` na BIOS.
  * Bug estranho de firmware na X299 no qual a USB para de funcionar por causa disso.

* Portas USB faltando na ACPI:
  * Para CPUs Intel Coffee Lake e mais antigas, é recomendado utilizar a *kext* [USBInjectAll](https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/).
  * Para CPUs Intel Ice Lake e Comet Lake, é recomendado utilizar a [SSDT-RHUB](https://github.com/deomkds/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-RHUB.aml).
    * A opção `7. USB Reset` do SSDTTime faz a mesma coisa.
  * Em AMD, use a opção `7. USB Reset` do SSDTTime e adicone a SSDT-RHUB fornecida na pasta EFI e na `config.plist`.
  
### Problemas de SATA

Em algumas raras ocasiões, principalmente em notebooks, o controlador SATA não é oficialmente suportado pelo macOS. Para resolver isso, será preciso fazer algumas coisas:

* Configurar a SATA para o modo AHCI na BIOS:
  * O macOS não oferece suporte a hardware RAID ou modo IDE de maneira apropriada.
  * Observe que unidades que estejam utilizando a tecnologia Intel Rapid Storage (RST, soft RAID para Windows e Linux) não serão acessíveis no macOS.
* [SATA-unsupported.kext](https://github.com/khronokernel/Legacy-Kexts/blob/master/Injectors/Zip/SATA-unsupported.kext.zip)
  * Adiciona suporte para controladores SATA obscuros, mais comuns em notebooks.
  * Para controladores SATA muito antigos, a *kext* [AHCIPortInjector.kext](https://www.insanelymac.com/forum/files/file/436-ahciportinjectorkext/) pode ser mais apropriada.
* [AppleAHCIPort.kext do Catalina com patches](https://github.com/deomkds/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip)
  * Para usuários que estejam executando o macOS 11 Big Sur e tenham problemas. Essa *kext* é um *backport* da *kext* funcional do Catalina. Não é necessário usar `SATA-unsupported` junto com esta *kext*.

Observe que esses problemas somente surgirão após instalar o macOS na unidade. Iniciar o instalador a partir de um pendrive não causará erros de SATA.

## Kernel Panic por causa da IOPCIFamily na X99

Aqueles que estejam usando a plataforma X99 da Intel, vejam o seguinte:

* Se os seguintes patches de *kernel* estão ativados:
  * `AppleCpuPmCfgLock`
  * `AppleXcpmCfgLock`
  * `AppleXcpmExtraMsrs`
* Se possui instaladas as seguintes SSDTs:
  * `SSDT-UNC` (caso contrário, veja os [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) para criá-la).

## Preso em ou próximo a `IOConsoleUsers: gIOScreenLock...`/`gIOLockState (3...`

Isso acontece antes da GPU ser corretamente inicializada. Verifique o seguinte:

* Se a GPU suporta UEFI (GTX 7XX/2013 em diante).
* Se o CSM está desabilitado na BIOS.
  * Pode precisar ser ativad em notebooks.
* Forçar a velocidade do link da PCIe 3.0.
* Verifique mais de uma vez se a propriedade `ig-platform-id` e `device-id` são válidos ao usar uma GPU integrada.
  * GPUs integradas UHD 630 de desktops podem precisar usar o valor `00009B3E`.
* Tentar várias [correções da WhateverGreen](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) (em inglês).
  * Argumento de inicialização `-igfxmlr`. Isso também pode se manifestar como um erro de "Divide by Zero" (dividir por zero).
* Usuários de GPUs integradas Coffee Lake talvez precisem do argumento `igfxonln=1` no macOS 10.15.4 Catalina ou mais novo.

## Tela Distorcida em Notebooks

Habilite o CSM nas configurações da UEFI. Pode aparecer como "Boot legacy ROMs" ou outra configuração "Legacy".

## Tela Preta Após `IOConsoleUsers: gIOScreenLock...` na Navi

* Adicione `agdpmod=pikera` aos argumentos de inicialização.
* Alterne entre diferentes saídas de vídeo.
* Tente executar com a SMBIOS do MacPro7,1 e com o argumento de inicialização `agdpmod=ignore`.

Usuários de Navi da MSI talvez precisem aplicar o patch mencionado aqui: [Installer not working with 5700XT #901](https://github.com/acidanthera/bugtracker/issues/901) (em inglês).

Especificamente, adicione a seguinte entrada no caminho `Kernel -> Patch`:

::: details Patch para Navi da MSI

```
Base:
Comment: Patch de Bug de VBIOS para Navi
Count: 1
Enabled: YES
Find: 4154592C526F6D2300
Identifier: com.apple.kext.AMDRadeonX6000Framebuffer
Limit: 0
Mask:
MinKernel: 19.00.00
MaxKernel: 19.99.99
Replace: 414D442C526F6D2300
ReplaceMask:
Skip: 0
```

:::

Observação: o macOS 11 Big Sur não precisa mais desse patch para placas Navi da MSI.

## Kernel Panic `Cannot perform kext summary`

Geralmente visto como um problema que circunda o *prelinked kernel*. Especificamente, é o macOS tendo problemas para interpretar o que foi injetado. Verifique o seguinte:

* As *kexts* estão na ordem correta (*master* primeiro, depois os *plugins*, Lilu sempre antes dos *plugins*).
* *Kexts* executáveis realmente possuem os executáveis e as *kexts* de *plist* sem executáveis (ex.: `USBmap.kext`, `XHCI-unspported.kext`, entre outras não possuem executáveis).
* Não incluir várias vezes a mesma *kext* na `config.plist` (ex.: incluir várias cópias da VoodooInput dentro de várias *kexts*) Recomenda-se escolher a primeira *kext* na lista presente no arquivo `config.plist` e desativar as restantes.

Observação: este erro pode parecer muito similar ao [Kernel Panic em `Invalid frame pointer`](#kernel-panic-em-invalid-frame-pointer).

## Kernel Panic `AppleIntelMCEReporter`

O suporte a dois *sockets* está quebrado no macOS Catalina. Um fato curioso sobre firmwares AMD é que algumas placas reportam múltiplas CPUs. Para corrigir isso, adicione a *kext* [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip) tanto no diretório `EFI/OC/Kexts` quanto no caminho `Kernel -> Add` na `config.plist`.

## Kernel Panic `AppleIntelCPUPowerManagement`

Provavelmente é devido à falta da NullCPUPowerManagement (ou à presença de uma versão defeituosa dela). Para corrigir, remova a NullCPUPowerManagement do caminho `Kernel -> Add` e do diretório `EFI/OC/Kexts`, e então habilite a opção `DummyPowerManagement` no caminho `Kernel -> Emulate`.

* **Observação**: em CPUs Intel mais antigas (isto é, Penryn e anteriores), pode ser causado por conflitos de IRQ ou pelo dispositivo HPET estar desabilitado. Para resolver, existem duas opções:
  * [Opção FixHPET do SSDTTime](https://deomkds.github.io/Getting-Started-With-ACPI/ssdt-methods/ssdt-easy.html).
  * Forçar o dispositivo HPET a ligar.
  
::: details Forçando o dispositivo HPET a ligar

No caminho `ACPI -> Patch`:

| Comment | String | Force HPET Online |
| :--- | :--- | :--- |
| Enabled | Boolean | YES |
| Count | Number | 0 |
| Limit | Number | 0 |
| Find | Data | A010934F53464C00 |
| Replace | Data | A40A0FA3A3A3A3A3 |

:::

## Kernel Panic `AppleACPIPlatform` no macOS 10.13 High Sierra

![](../../images/troubleshooting/troubleshooting-md/KA5UOGV.png)

O macOS 10.13 High Sierra é muito mais exigente com as tabelas ACPI, [especificamente no que se refere a um bug na maneira como os cabeçalhos eram manuseados](https://alextjam.es/debugging-appleacpiplatform/) (em inglês). Para resolver, habilite a opção `NormalizeHeaders` no caminho `ACPI -> Quirks` na `config.plist`.

## macOS Congelado Antes do Login

Este é um exemplo comum de um TSC ferrado. Na maioria dos sistemas, basta adicionar a [CpuTscSync](https://github.com/lvs1974/CpuTscSync).

A maneira mais comum de ver o problema de TSC:

Exemplo 1    |  Exemplo 2
:-------------------------:|:-------------------------:
![](../../images/troubleshooting/troubleshooting-md/asus-tsc.png)  |  ![](../../images/troubleshooting/troubleshooting-md/asus-tsc-2.png)

## Teclado Funciona Mas o Trackpad Não

Certifique-se de que a VoodooInput está listada *antes* das *kexts* VoodooPS2 e VoodooI2C na `config.plist`.

::: details Solução de Problemas com a VoodooI2C

Verifique a ordem em que as *kexts* estão sendo carregadas. Faça com que ela combine com o que foi mostrado na seção [Juntando os Arquivos](../../ktext.md):

1. VoodooGPIO, VoodooInput, e VoodooI2CServices em qualquer ordem (encontradas no diretório `VoodooI2C.kext/Contents/PlugIns`).
2. VoodooI2C
3. *Kexts* satélite e *plugins*.

Certifique-se de ter a `SSDT-GPIO` no diretório `EFI/OC/ACPI` e no caminho `ACPI -> Add` na `config.plist`. Se ainda tiver problemas, veja a [página de GPIO do guia Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/Laptops/trackpad.html).

:::

## `kextd stall[0]: AppleACPICPU`

Isso pode ser causado pela falta de um emulador de SMC ou pela presença de um que esteja quebrado. Certifique-se do seguinte:

* Lilu e VirtualSMC estão ambas no diretório `EFI/OC/Kexts` e na `config.plist`.
* Lilu vem antes da VirtualSMC na lista de *kexts*.
* Último recurso é tentar usar a FakeSMC. **Não ative a VirtualSMC e a FakeSMC ao mesmo tempo!**

## Kernel Panic na AppleIntelI210Ethernet

Aqueles que estejam usando placas-mãe Comet Lake com controlador de rede I225-V podem encontrar um *kernel panic* na inicialização por causa da *kext* do I210. Para resolver isso, certifique-se de ter o PciRoot correto para a Ethernet. Pode comumente ser:

* PciRoot(0x0)/Pci(0x1C,0x1)/Pci(0x0, 0x0)
  * Esse é o valor que as placas-mãe da Asus e da Gigabyte usam por padrão.
* PciRoot(0x0)/Pci(0x1C,0x4)/Pci(0x0,0x0)
  * Algumas OEMs podem usar esse valor.

Para aqueles que não tiverem sorte com os valores acima, será necessário encontrar manualmente o valor correto. Instale completamente o macOS e execute a ferramenta [gfxutil](https://github.com/acidanthera/gfxutil/releases):

```
/caminho/do/gfxutil | grep -i "8086:15f3"
```

Deve retornar algo parecido com isso:

```
00:1f.6 8086:15f3 /PC00@0/GBE1@1F,6 = PciRoot(0x0)/Pci(0x1F,0x6)
```

Adicione o valor que aparece no final da linha (ex.: `PciRoot(0x0)/Pci(0x1F,0x6)`) na `config.plist` com o `device-id` de `F2150000`.

## Kernel Panic em "Wrong CD Clock Frequency" em Notebook Icelake

![](../../images/troubleshooting/troubleshooting-md/cd-clock.jpg)

Para resolver este *kernel panic*, use o argumento de inicialização `-igfxcdc`.

## Kernel Panic em "cckprng_int_gen"

*Kernel panic* completo:

```
"cckprng_int_gen: generator has already been sealed"
```

É provavel de ser uma das duas coisas:

* A falta de um emulador de SMC (isto é, ausência da VirtualSMC na `config.plist` e/ou na pasta EFI).
  * Adicione a [VirtualSMC.kext](https://github.com/acidanthera/VirtualSMC/releases) na `config.plist` e na pasta EFI.
* Uso incorreto da `SSDT-CPUR`.

Para o último, certifique-se de somente usar a `SSDT-CPUR` com placas **B550 e A520**. Não use em placas X570 ou mais antigas (ex.: B450 ou A320).

## Preso em `Forcing CS_RUNTIME for entitlement` no macOS 11 Big Sur

![Créditos a Stompy pela imagem](../../images/extras/big-sur/readme/cs-stuck.jpg)

Este é o momento onde o macOS selará o volume do sistema, e onde pode parecer que o macOS tenha travado. **NÃO REINICIE** achando que travou pois pode demorar um pouco para terminar.

## Preso em `ramrod`(^^^^^^^^^^^^^)

![Créditos a Notiflux pela imagem](../../images/extras/big-sur/readme/ramrod.jpg)

Se travar próximo a seção do `ramrod` (mais especificamente, inicia, dá esse erro e reinicia novamente no mesmo erro, causando um *loop*), é sinal de que o emulador de SMC está quebrado. Para corrigir, existem duas opções:

* Certifique-se de estar usando as últimas *builds* da VirtualSMC e da Lilu, com o argumento de inicialização `vsmcgen=1`.
* Alterne para a [FakeSMC do Rehabman](https://bitbucket.org/RehabMan/os-x-fakesmc-kozlek/downloads/) (é possível usar o truque do `MinKernel`/`MaxKernel` mencionado anteriormente para restringir a FakeSMC ao macOS 11 Big Sur e superior).

E ao trocar de *kexts*, certifique-se de não ter ambas a FakeSMC e a VirtualSMC ativadas na `config.plist`, já que isso causará conflitos.

### Problemas de Máquinas Virtuais

* O VMWare 15 é conhecido por travar em `[EB|#LOG:EXITBS:START]`. O VMWare 16 resolve este problema.
