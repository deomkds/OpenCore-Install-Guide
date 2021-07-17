# Convertendo Patches Comuns de Kexts e de Kernel

## Convertendo um Patch Manualmente

Ao converter um patch de kext/kernal para o OpenCore, será necessário observar o seguinte:

* Não existe paridade para o recurso `InfoPlistPatch`.
* O equivalente da opção `MatchOS` são as opções `MinKernel` e `MaxKernel`.
* Os dois tipos de patches (*kext* e kernel) são inseridos no caminho `Kernel -> Patch`. Para informar se o patch é de kernel ou de uma *kext* específica, utilize a opção `Identifier`.

Observe o exemplo:

**KernelToPatch (Clover)**:

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| Comment | String | cpuid\_set_cpufamily - forca CPUFAMILY\_INTEL_PENRYN |
| Disabled | Boolean | False |
| MatchBuild | String | 18G95,18G103 |
| MatchOS | String | 10.14.6 |
| Find | Data | 31db803d4869980006755c |
| Replace | Data | bbbc4fea78e95d00000090 |

No OpenCore, as opções são:

* `Comment`: Disponível tanto no Clover quanto no OpenCore.
* `Disabled`: No OpenCore, use `Enabled`.
* `MatchBuild`: No OpenCore, use `MinKernel` e `MaxKernel`. Veja abaixo para mais informações.
* `MatchOS`: No OpenCore, use `MinKernel` e `MaxKernel`. Veja abaixo para mais informações.
* `Find`: Disponível tanto no Clover quanto no OpenCore.
* `Replace`: Disponível tanto no Clover quanto no OpenCore.
* `MaskFind`: No OpenCore, use `Mask`.
* `MaskReplace`: Disponível tanto no Clover quanto no OpenCore.

Então, o patch anterior ficaria dessa forma:

**Kernel -> Patch (OpenCore)**:

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| Comment | String | cpuid\_set_cpufamily - força CPUFAMILY\_INTEL_PENRYN |
| Enabled | Boolean | True |
| MinKernel | String | 18.7.0 |
| MaxKernel | String | 18.7.0 |
| Find | Data | 31db803d4869980006755c |
| Replace | Data | bbbc4fea78e95d00000090 |
| Identifier | String | kernel |
| Limit | Number | 0 |
| Count | Number | 0 |
| Skip | Number | 0 |
| Mask | Data | |
| ReplaceMask | Data | |

Nas opções `MinKernel` e `MaxKernel`, utilize o link a seguir para ver os valores possíveis. A versão 18G95 possui um kernel cuja versão é `18.7.0` e a 18G103, `18.7.0` também. Note que ambas as versões utilizam o mesmo kernel.

* [macOS Mojave: Release history](https://en.wikipedia.org/wiki/MacOS_Mojave#Release_history) (em inglês).

Defina a opção `Identifier` como `kernel` ou a *kext* que deseja aplicar o patch (ex.: `com.apple.iokit.IOGraphicsFamily`).

Quanto as opções `Limit`, `Count` e `Skip`, elas são configuradas para `0` de forma que serão aplicadas a todas as instâncias. As opções `Mask` e `ReplaceMask` podem ser deixadas vazias pois o Clover não suporta máscaras (até bem recentemente, mas isso não será abordado aqui).

## Patches Comuns no OpenCore e Cia

Uma breve seção que menciona os patches de *kexts* e de kernel que foram absorvidas pelo OpenCore ou por outras *kexts*. Essa lista não está copmpleta e qualquer outro patch que tenha sido deixado de fora pode ser incluída por meio da abertura de um novo [issue](https://github.com/deomkds/OpenCore-Vanilla-Desktop-Guide/issues). Toda ajuda é bem-vinda!

### Patches de Kernel

Para obter uma lista completa dos patches suportados pelo OpenCore, veja o arquivo [/Library/OcAppleKernelLib/CommonPatches.c](https://github.com/acidanthera/OpenCorePkg/blob/master/Library/OcAppleKernelLib/CommonPatches.c) (em inglês).

**Patches Gerais**:

* `MSR 0xE2 _xcpm_idle instant reboot` © Pike R. Alpha
  * `Kernel -> Quirks -> AppleXcpmCfgLock`

**Patches específicos de HEDT**:

Todos os patches a seguir podem ser encontrados no caminho `Kernel -> Quirk -> AppleXcpmExtraMsrs` na `config.plist`.

* `_xcpm_bootstrap` por Pike R. Alpha
* `xcpm_pkg_scope_msrs` por Pike R. Alpha
* `_xcpm_SMT_scope_msrs` Patch nº 1 por Pike R. Alpha
* `_xcpm_SMT_scope_msrs` Patch nº 2 por Pike R. Alpha
* `_xcpm_core_scope_msrs` por Pike R. Alpha
* `_xcpm_ performance_patch` por Pike R. Alpha
* Patches de MSR xcpm nº 1 e nº 2 por Pike R. Alpha
* `/0x82D390/MSR_PP0_POLICY 0x63a xcpm support` patches nº 1 e nº 2 por Pike R. Alpha

### Patches de Kexts

* `Disable Panic Kext logging`
  * `Kernel -> Quirks -> PanicNoKextDump`
* Patch 1 de Ícone de Unidade Externa para AppleAHCIPort
  * `Kernel -> Quirks -> ExternalDiskIcons`
* Ativador do TRIM em SSD
  * `Kernel -> Quirks -> ThirdPartyDrives`
* Limite de portas USB
  * `Kernel -> Quirks -> XhciPortLimit`
* Patch de DP/HDMI por FredWst
  * [AppleALC](https://github.com/acidanthera/AppleALC/releases) + [WhateverGreen](https://github.com/acidanthera/whatevergreen/releases)
* Patch para IOPCIFamily
  * `Kernel -> Quirks -> IncreasePciBarSize`
* Desativar a verificação de board-ID
  * [WhateverGreen](https://github.com/acidanthera/whatevergreen/releases)
* Patch de AppleHDA
  * [AppleALC](https://github.com/acidanthera/AppleALC/releases)
* Patches de IONVMe
  * Desnecessário a partir do macOS 10.13 High Sierra.
  * Para o gerenciamento de energia no macOS 10.14 Mojave ou mais novo: [NVMeFix](https://github.com/acidanthera/NVMeFix/releases).
