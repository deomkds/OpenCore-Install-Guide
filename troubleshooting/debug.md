# Depurando o OpenCore

Precisando descobrir o motivo de problemas ou travamentos? Bem, você veio ao lugar certo:

* [Troca de Arquivos](#file-swaps)
* [Mudanças de Configurações](#config-changes)
* [Desativando Todos os Logs](#disabling-all-logging)

## Troca de Arquivos

Antes de começar, certifique-se de estar usando a versão de depuração `DEBUG`ou a versão `NOOPT` do OpenCore. Elas fornecerão muito mais informações do que a versão de lançamento `RELEASE`. É preciso trocar os seguintes arquivos:

* EFI/BOOT/
  * `BOOTx64.efi`
* EFI/OC/Bootstrap/
  * `Bootstrap.efi`
* EFI/OC/Drivers/
  * `OpenRuntime.efi`
  * `OpenCanopy.efi`(caso o esteja usando)
* EFI/OC/
  * `OpenCore.efi`

![](../images/troubleshooting/debug-md/replace.png)

* **Observação**: geralmente, é melhor depurar os sistemas sem o OpenCanopy. Caso seja necessário, certifique-se de estar usando a versão de depuração (`DEBUG`) do OpenCanopy ou não haverá praticamente nenhuma informação de depuração.

## Mudanças de Configurações

Então, acesse a sua `config.plist` e localize a seção `Misc`. Será necessário alterar algumas entradas aqui:

### Misc

Aqui, será necessário ativar as seguintes opções:

* **AppleDebug**: YES
  * Fornece muito mais informações de depuração, especificamente as relacionadas ao `boot.efi` e também faz com que o log seja salvo no disco.

* **ApplePanic**: YES
  * Isso permitirá que `kernel panics` sejam salvas no disco. Altamente recomendado manter o argumento de inicialização `keepsyms=1` na entrada `boot-args` para preservar a maior quantidade possível de informações.

* **DisableWatchdog**: YES
  * Desabilita o *watchdog* UEFI, usado para quando o OpenCore trava ou coisas não críticas.

* **Target**: `67`(ou calcule um abaixo)
  * Usado para habilitar diferentes níveis de depuração.

| Valor | Observação |
| :--- | :--- |
| `0x01` | Habilita os logs. |
| `0x02` | Habilita a depuração na tela. |
| `0x04` | Habilita o salvamento de logs no Data Hub. |
| `0x08` | Habilita a saída de logs na porta serial. |
| `0x10` | Habilita os logs de variávies UEFI. |
| `0x20` | Habilita os logs de variávies UEFI não voláteis. |
| `0x40` | Habilita o salvamento de logs em arquivos. |

Para calcular o valor de `Target`, use uma calculadora hexadecimal e então converta o valor para decimal. Então, armazene os valores em um arquivo `.txt` para consulta posterior.

* `0x01` — Habilita os logs.
* `0x02` — Habilita a depuração na tela.
  * Observe que isso pode aumentar bastante o tempo de inicialização em firmwares com implementações de GOP (driver de vídeo EFI) ruins.
* `0x10` — Habilita os logs de variávies UEFI.
* `0x40` — Habilita o salvamento de logs em arquivos.

`0x01` + `0x02` + `0x10` + `0x40` = `0x53`

`0x53` convertido para decimal é `83`

Então, configure `Misc` -> `Debug` -> `Target` -> `83`

* **DisplayLevel**: `2147483714`(ou calcule um valor abaixo)
  * Usado para configurar o que aparecerá no log.

| Value | Comment |
| :--- | :--- |
| `0x00000002` | DEBUG_WARN in DEBUG, NOOPT, RELEASE. |
| `0x00000040` | DEBUG_INFO in DEBUG, NOOPT. |
| `0x00400000` | DEBUG_VERBOSE in custom builds. |
| `0x80000000` | DEBUG_ERROR in DEBUG, NOOPT, RELEASE. |

  A full list can be found in [DebugLib.h](https://github.com/tianocore/edk2/blob/UDK2018/MdePkg/Include/Library/DebugLib.h).

For us we just want the following:

* `0x00000002` — DEBUG_WARN in DEBUG, NOOPT, RELEASE.
* `0x00000040` — DEBUG_INFO in DEBUG, NOOPT.
* `0x80000000` — DEBUG_ERROR in DEBUG, NOOPT, RELEASE.

Just like with `Target`, we use a HEX calculator then convert to decimal:

`0x80000042` Converted to decimal `Misc` -> `Debug` -> `DisplayLevel` -> `2147483714`

Once done, your config.plist should look like this:

![](../images/troubleshooting/debug-md/debug.png)

## Disabling all logging

To remove all file logging, and debug messages, simply swap out all your OpenCore files for those in RELEASE like we did before in [File Swap](#file-swap) section.

Lastly, to remove writing to disk set the following:

* AppleDebug = `NO`
* ApplePanic = `NO`
* Target = `0`
