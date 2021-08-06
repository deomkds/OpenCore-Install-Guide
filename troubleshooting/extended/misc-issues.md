# Problemas Diversos

Problemas diversos que não são relacionados ao macOS propriamente ditos, como *multibooting*.

[[toc]]

## Impossível Executar `acpidump.efi`

Execute no `shell` do OpenCore:

```
shell> fs0: //substitua pela unidade correta.

fs0:\> dir //para verificar se é o diretório correto.

  Directory of fs0:\

   01/01/01 3:30p  EFI
fs0:\> cd EFI\OC\Tools //observe que usa a barra invertida.

fs0:\EFI\OC\Tools> acpidump.efi -b -n DSDT -z
```

## Corrigindo o SSDTTime: `Could not locate or download iasl!`

Isso geralmente acontece devido a presença de uma versão desatualizada do Python. Tente atualizá-lo ou adicionar o `iasl` na pasta `scripts` do SSDTTime:

* [iasl - Versão para macOS](https://bitbucket.org/RehabMan/acpica/downloads/iasl.zip)
* [iasl - Versão para Windows](https://acpica.org/downloads/binary-tools)
* [iasl - Versão para Linux](http://amdosx.kellynet.nl/iasl.zip)

## Corrigir o Python: `Python is not installed or not found on PATH`

Correção fácil. Baixe e instale a última versão do Python:

* [Python - Versão para macOS](https://www.python.org/downloads/macos)
* [Python - Versão para Windows](https://www.python.org/downloads/windows/)
* [Python - Versão para Linux](https://www.python.org/downloads/source/)

Certifique-se de adicioná-lo ao PATH:

![](../../images/troubleshooting/troubleshooting-md/python-path.png)

## O Disco de Inicialização do Windows Não Exerga Unidades em APFS

* Drivers de BootCamp desatualizados. Geralmente a versão 6.0 virá com o Brigadier. O Utilitário de BootCamp no macOS fornece versões mais novas, como a 6.1. O CorpNewt fez um *fork* do Brigadier para corrigir esses problemas também: [Brigadier do CorpNewt](https://github.com/corpnewt/brigadier) (em inglês).

## Resolção do OpenCore Incorreta

* Siga o guia [Corrigindo a Resolução e o Verbose](https://deomkds.github.io/OpenCore-Post-Install/cosmetic/verbose.html) para configurar corretamente. Configure a opção `UIScale` para `02` em telas HiDPI.
* Alguns usuários também observaram que configurar a opção `ConsoleMode` para `Max` pode causar falhas. Deixá-la vazia pode ajudar.

## A Unidade do Windows/BootCamp Não Aparece no Seletor

É importante lembrar que instalações legadas do Windows não são suportdas no OpenCore, somente instalações UEFI. A maioria das instalações hoje em dia são UEFI, no entanto, aquelas criadas pelo Assistente de BootCamp não o são. Será necessário encontrar outras formas de criar um instalador (o Google é seu amigo). Isso signifca que partições MBR/Híbridas também não funcionam e que será necessário formatar a unidade onde o macOS será instalado usando o Utilitário de Disco. Consulte o guia [Multiboot com o OpenCore](https://deomkds.github.io/OpenCore-Multiboot/) para saber mais.

Agora, para solucionar problemas:

* Certifique-se de que a opção `Misc -> Security -> ScanPolicy` está configurada para `0` de forma a exibir todos as unidades.
* Habilite a opção `Misc -> Boot -> Hideself` quando o *bootloader* do Windows estiver localizado na mesma unidade do OpenCore.

## Seleção de Disco de Inicialização Não Aplica Corretamente

Se estiver tendo problemas nos quais o painel de preferência Disco de Inicialização não aplica corretamente a opção selecionada, muito provavelmente é resultado da falta do `DevicePathsSupported` no I/O Registry. Para resolver, certifique-se de configurar a opção `PlatformInfo -> Automatic` para `TRUE`.

Exemplo de `DevicePathsSupported` faltante:

* [Default DevicePath match failure due to different PciRoot #664](https://github.com/acidanthera/bugtracker/issues/664#issuecomment-663873846) (em inglês).

## Iniciar o Windows Resulta em Tela Azul ou o Linux Trava

Isso acontece por causa de problemas de alinhamento. Certifique-se de habilitar a opção `SyncRuntimePermissions` em firmwares que surportam MATs. Verifique os logs para saber se o firmware suporta as Tabelas de Atributos de Memória (vistas geralmente em firmwares de 2018 e mais novas).

Código de erro comum do Windows:

* `0xc000000d`

## Erro ao Iniciar o Windows: `OCB: StartImage failed - Already started`

Isso acontece porque o OpenCore fica confuso ao tentar inicar o Windows e acidentalmente pensa que está iniciando o OpenCore. Pode ser evitado movendo o Windows para uma unidade dedicada *ou* adicionando um caminho de unidade personalizado sob a opção `BlessOverride`. Consulte o arquivo [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) (em inglês) para obter mais detalhes.

## Aviso do iASL: `only X unresolved`

Se encontrar um erro como esse ao tentar decompilar uma DSDT:

```
iASL Warning: There were 19 external control methods found during disassembly, but only 0 were resolved (19 unresolved)
```

Acontece quando uma tabela da ACPI exige que as outras tabelas restantes estejam presentes para referenciá-las apropriadamente. Ele não aceita a criação de DSDTs, já que o iASL é usado somente para criar algumas poucas SSDTs. Se estiver preocupado com isso, execute o seguinte:

```
iasl * [insira todos os arquivos da ACPI aqui]
```

## Inconsistência de Relógio Entre o macOS e o Windows

Isso se deve ao fato do macOS tratar o horário da BIOS/firmware UEFI como UTC enquanto o Windows o trata como fuso horário local. Será necessário forçar um dos sistemas operacionais a tratar o relógio da BIOS de maneira diferente. É altamente recomendado modifica o Windows pois é muito mais fácil, rápido e seguro:

* [Instale os utilitáios do BootCamp](https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootcamp.html)
* [Modifique o Registro do Windows](https://superuser.com/q/494432) [Download](https://github.com/deomkds/blob/master/OpenCore-Install-Guide/extra-files/clockfix.zip)
