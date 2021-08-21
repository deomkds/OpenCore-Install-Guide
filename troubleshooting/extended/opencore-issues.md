# Problemas de Inicialização do OpenCore

Problemas que podem ocorrer a partir da primeira inicialização do pendrive até o momento imediatamente anterior à escolha do instalador do macOS no seletor.

[[toc]]

## Preso em uma Tela Preta Antes do Seletor

Isso é provavelmente um erro no firmware do computador ou no OpenCore. Especificamente, o OpenCore está tendo problemaspara carregar todos os drivers e exibir o menu. A melhor maneira de diagnosticar isso é usando a [versão de depuração do OpenCore](./../debug.md) para checar os logs e ver se o OpenCore de fato carregou e o que pode estar causando o problema.

**Situações em Que o OpenCore Não Tenha Carregado**:

* Se não houver nenhum log presente mesmo após instalar a versão de depuração do OpenCore com a opção `Target` configurada para `67`, provavelmente há um problema com:
  * Estrutura de pastas no pendrive incorreta.
    * Consulte a seção [Iniciar o OpenCore Reinicia na BIOS](#iniciar-o-opencore-reinicia-na-bios) para obter mais informações.
  * O firmware não suporta UEFI.
    * Será necessário configurar o DuetPkg. Isso é abordado nas páginas de instalação tanto para [macOS](../../installer-guide/mac-install.md) quanto para [Windows](../../installer-guide/winblows-install.md).

**Situações em Que o OpenCore Tenha Sido Carregado**:

* Verifique a última linha registrada no log. Provavelmente, haverá um driver `.efi` que foi carregado ou alguma asserção (ASSERT).
  * Em caso de asserções, é interessante informar aos desenvolvedores sobre o problema por meio deste link: [Bugtracker do Acidanthera](https://github.com/acidanthera/bugtracker) (em inglês).
  * Em caso de travamentos em drivers `.efi`, verifique o seguinte:
    * **Problemas de Carregamento do HfsPlus.efi:**
      * Tente usar o [HfsPlusLegacy.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlusLegacy.efi).
      * É recomendado para CPUs que não oferecem suporte ao RDRAND. Relevante principalmente para CPUs i3 Ivy Bridge de 3ª geração e mais antigas.
      * Uma outra opção é usar o [VBoxHfs.efi](https://github.com/acidanthera/AppleSupportPkg/releases/tag/2.1.7), no entanto ele é muito mais devagar do que o `HfsPlusLegacy.efi`.
    * **Problemas de Carregamento do HiiDatabase.efi:**
      * É provável que o firmware do computador já tenha suporte a HiiDatabase, e por isso o driver possa estar conflitando. Simplesmente remova-o já que ele não é necessário.

## Parado em `no vault provided!`

Desabilite os Cofres (Vaulting) na `config.plist`, configurando a opção `Misc -> Security -> Vault` para:

* `Optional`

Se o `sign.command` já tiver sido executado, será necessário restaurar o arquivo `OpenCore.efi`, já que a assinatura RSA-2048 de 256 bytes foi inserida nele. Baixe uma cópia limpa do `OpenCore.efi` aqui: [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases).

**Observação**: a função de Cofre (Vault) e o FileVault são duas coisas completamente diferentes. Consulte a página [Segurança e FileVault](https://deomkds.github.io/OpenCore-Post-Install/universal/security.html) para obter mais informações.

## Parado em `OC: Invalid Vault mode`

É provavelmente um erro de digitação. As opções do OpenCore são sensíveis a maiúsculas e minúsculas, então verifique o arquivo `config.plist` com atenção. A forma correta de configurar a opção `Misc -> Security -> Vault` é `**O**ptional` (com a letra [O](https://pt.wikipedia.org/wiki/O) maiúscula).

## Partições do macOS Não São Exibidas

Coisas a se verificar:

* Opção `ScanPolicy` configurada para `0` de forma a exibir todas as unidades.
* Ter instalado os drivers de firmware apropriados, tais como o `HfsPlus.efi` (Observe que o ApfsDriverLoader não deve ser utilizado a partir da versão 0.5.8 do OpenCore).
* Configure a opção `UnblockFsConnect` para `YES` na seção `UEFI -> Quirks` da `config.plist`. Necessário em alguns computadores HP.
* Configure o **SATA Mode** para `AHCI` na BIOS.
* Configure a opção `UEFI -> APFS` para exibir unidades formatadas em APFS:
  * **EnableJumpstart**: YES
  * **HideVerbose**: NO
  * Ao executar versões mais antigas do macOS 10.13 High Sierra (como a 10.13.5 ou mais antiga), configure as seguintes opções:
    * **MinDate**: `-1`
    * **MinVersion**: `-1`

## Parado em `OCB: OcScanForBootEntries failure - Not Found`

Isso se deve ao fato do OpenCore não conseguir encontrar nenhuma unidade com a configuração atual da opção `ScanPolicy`. Configurá-la para `0` permitirá que todas as opções de inicialização sejam exibidas.

* `Misc -> Security -> ScanPolicy -> 0`

## Parado em `OCB: failed to match a default boot option`

Mesma correção que `OCB: OcScanForBootEntries failure - Not Found`. O OpenCore é incapaz de encontrar quaisquer unidades com a opção `ScanPolicy` configurada como está atualmente. Configurá-la para `0` permitirá que todas as opções de inicialização sejam exibidas.

* `Misc -> Security -> ScanPolicy -> 0`

## Parado em `OCB: System has no boot entries`

Mesma correção que as de cima:

* `Misc -> Security -> ScanPolicy -> 0`

## Parado em `OCS: No schema for DSDT, KernelAndKextPatch, RtVariable, SMBIOS, SystemParameters...`

Isso se deve ao fato de estar usando uma configuração do Clover com o OpenCore ou usando um configurador como os configuradores do Clover e OpenCore do Mackie. Será necessário começar novamente e criar uma nova `config.plist` ou encontrar todo o lixo que deve ser removido da `config.plist` atual. **Este é o motivo pelo qual não oferecemos suporte para configuradores. Eles são conhecidos por causarem esse tipo de problema.**

* Observção: esses mesmos problemas podem ocorrer também caso arquivos de configuração antigos sejam misturados com versões novas do OpenCore. Por favor, atualize-os da maneira correta.

## Parado em `OC: Driver XXX.efi at 0 cannot be found`

Isso se dá pelo fato de haver uma entrada na `config.plist` que não está presente na partição EFI. Para resolver:

* Garanta que os drivers da pasta `EFI/OC/Drivers` sejam os mesmos listados na seção `UEFI -> Drivers` da sua `config.plist`.
  * Se não, pressione Cmd/Ctrl+R no ProperTree para capturar uma nova *snapshot* da `config.plist`.

Observe que as entradas são sensíveis a maiúsculas e minúsculas.

## Receiving "Failed to parse real field of type 1"

Isso se deve a um valor configurado para `real` quando não deveria ser. Geralmente, acontece quando o Xcode converte o valor de `HaltLevel` por acidente:

```xml
<key>HaltLevel</key>
 <real>2147483648</real>
```

Para corrigir, substitua `real` por `integer`:

```xml
<key>HaltLevel</key>
 <integer>2147483648</integer>
```

## Opções no Seletor Não São Selecionáveis

Isso se deve a algumas coisa:

* Driver de teclado incompatível:
  * Desabilite a opção `PollAppleHotKeys` e habilite a opção `KeySupport`, então remova o driver [OpenUsbKbDxe](https://github.com/acidanthera/OpenCorePkg/releases) da seção `UEFI -> Drivers` na `config.plist`.
  * Se isso não funcioar, inverta: desative a opção `KeySupport`, então adicione o driver [OpenUsbKbDxe](https://github.com/acidanthera/OpenCorePkg/releases) na seção `UEFI -> Drivers` na `config.plist`.

* Driver de teclado PS2 faltando (ingore se estiver usando um teclado USB):
  * Enquanto a maioria dos firmwares o incluem por padrão, alguns notebooks e PCs mais antigos ainda podem precisar do [Ps2KeyboardDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases) para funcionar corretamente. Lembre-se de adicionar na `config.plist` também.

## SSDTs Não São Adicionadas

No OpenCore, existem algumas verificações de segurança extras em se tratando de arquivos da ACPI. Especificamente, o cabeçalho do tamanho da tabela deve ser igual ao tamanho do arquivo. Esse erro é, na verdade, culpa do iASL e ocorre ao compilar o arquivo. Um exemplo de como encontrá-lo:

```c
* Original Table Header:
*     Signature        "SSDT"
*     Length           0x0000015D (349)
*     Revision         0x02
*     Checksum         0xCF
*     OEM ID           "ACDT"
*     OEM Table ID     "SsdtEC"
*     OEM Revision     0x00001000 (4096)
*     Compiler ID      "INTL"
*     Compiler Version 0x20190509 (538510601)
```

Os valores importantes são o `Length` e o `checksum`. Se a SSDT tem 347 bytes, é preciso mudar o `Length` para `0x0000015B (347)`(o `015B` está em hexadecimal).

A melhor maneira de corrigir isto é baixando uma versão mais nova do iASL ou a versão do [MaciASL](https://github.com/acidanthera/MaciASL/releases) mantida pelo Acidanthera. Então, refaça a SSDT nela.

* Observação: o MaciASL distribuído pelo Rehabman é passível de corromper as tabelas da ACPI. Por favor, evite-a já que o repositório não é mais mantido.

## Iniciar o OpenCore Reinicia na BIOS

* Estrutura de pasta EFI incorreta. Garanta que todos os arquivos do OpenCore estão dentro de uma pasta EFI localizada na ESP (partição EFI do sistema).

::: details Exemplo de Estrutura de Pastas

![Estrutura de Diretório na Documentação do OpenCore](../../images/troubleshooting/troubleshooting-md/oc-structure.png)

:::

## Erro `OCABC: Incompatible OpenRuntime r4, require r10`

Versão desatualizada do `OpenRuntime.efi`. Certifique-se de usar versões do `BOOTx64.efi`, `OpenCore.efi` e `OpenRuntime.efi` retirados **da mesma _build_**. Qualquer diferença de versão impedirá a inicialização do OpenCore.

* **Observação**: `FwRuntimeServices` foi renomeado para `OpenRuntime` a partir da versão 0.5.7 do OpenCore.

## Erro `Failed to open OpenCore image - Access Denied`

Nas firmwares de dispositivos Microsoft Surface mais novos, carregar o OpenCore resultará em uma violação de segurança mesmo quando a Inicialização Segura estiver desligada. Para resolver, ative a opção `UEFI -> Quirks -> DisableSecurityPolicy` na `config.plist`. Veja essa página para obter mais detalhes: [Failed to open OpenCore image - Access Denied #1446](https://github.com/acidanthera/bugtracker/issues/1446) (em inglês).

## Erro `OC: Failed to find SB model disable halting on critical error`

Isso é um erro de digitação. Garanta que a opção `Misc -> Security -> SecureBootModel` na `config.plist` está configurada para Disable**d**, com um [d](https://pt.wikipedia.org/wiki/D) no final.
