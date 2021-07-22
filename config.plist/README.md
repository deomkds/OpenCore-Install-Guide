# Configuração da config.plist

Agora que todas as *kexts* (`.kext`), SSDTs (`.aml`) e drivers de firmware (`.efi`) estão instalados, o pendrive começa a se parecer com isso:

![Pasta EFI Preenchhida](../images/installer-guide/opencore-efi-md/populated-efi.png)

* **Observação**: seu pendrive **será diferente**. Cada computador exigirá coisas diferentes.

## Criando a Sua config.plist

Primeiramente, será necessário obter a `sample.plist` do [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases). Ela pode ser encontrada dentro da pasta `Docs`:

![](../images/config/config-universal/sample-location.png)

Agora, mova-a para dentro da partição EFI do pendrive (chama-se BOOT no Windows), sob o diretório `EFI/OC/`. Renomeie-a para `config.plist`.

![](../images/config/config-universal/renamed.png)

## Adicionando as SSDTs, Kexts e Drivers de Firmware

Para o restante deste guia, será preciso um pouco de edição de arquivos `.plist`. E neste guia, serão utilizadas as ferramentas ProperTree e GenSMBIOS para ajudar a automatizar parte do trabalho tedioso:

* [ProperTree](https://github.com/corpnewt/ProperTree)
  * Editor de arquivos `.plist` universal.
* [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS)
  * Para gerar os dados da SMBIOS.

Então, é hora de abrir o ProperTree e editar a `config.plist`:

* `ProperTree.command`
  * Para macOS.
  * Dica: existe um utilitário chamado `buildapp.command` dentro da pasta `Scripts` que permite transformar o ProperTree em um aplicativo dedicado no macOS.
* `ProperTree.bat`
  * Para Windows.

Uma vez que o ProperTree esteja sendo executado, abra o seu arquivo `config.plist` pressionando **Cmd/Ctrl + O** e selecionando o arquivo `config.plist` que está dentro do pendrive.

Depois de abrir o arquivo de configuração, pressione **Cmd/Ctrl + Shift + R** e aponte para a sua pasta `EFI/OC` para criar uma "*Snapshot* Limpa":

* Isto removerá todas as entradas do arquivo `config.plist` e então adiciona todas as suas SSDTs, *kexts* e drivers de firmware nas seções certas.
* Pressionar **Cmd/Ctrl + R** é outra opção para adicionar todos os seus arquivos, mas manterá as entradas desativadas caso tenham sido configuradas assim antes. Útil para quando estiver solucionando problemas, mas desnecessário neste momento.

![](../images/config/config-universal/before-snapshot.png)

Feito isso, você verá todas as suas SSDTs, *kexts* e drivers de firmware preenchidos na `config.plist`:

![](../images/config/config-universal/after-snapshot.png)

* **Observação:** Se aparecer um pop-up dizendo "Disable the following kexts with Duplicate CFBundleIdentifiers?" ("Desativar as seguintes *kexts* com CFBundleIdentifiers duplicados?), pressione "Yes". Isso garante que não há *kexts* duplicadas sendo injetadas, já que algumas kexts podem conter os mesmos plugins (ex.: VoodooInput está presente tanto na VoodooPS2 quanto na pasta de plugins da VoodooI2C).

![](../images/config/config-universal/duplicate.png)

Se desejar limpar um pouco o arquivo, pode remover as entradas iniciadas em `#WARNING`. Elas não causam nenhum problema estando presentes, então é questão de preferência pessoal.

## Selecionando a Sua Plataforma

Agora vem a parte importante: selecionar o caminho da configuração. Cada plataforma possui suas peculiaridades únicas que devem ser levadas em conta. Por isso que conhecer bem o seu hardware é super importante. Veja a seguir o que fazer:

### Desktop Intel

* Observação: A série NUC da Intel é considerada hardware de notebook. Nessas situações, recomenda-se seguir a seção de [Notebook Intel](#notebook-intel).

| Codenome | Série | Período |
| :--- | :--- | :--- |
| [Yonah, Conroe e Penryn](../config.plist/penryn.md) | E8XXX, Q9XXX, [Info 1](https://en.wikipedia.org/wiki/Yonah_(microprocessor)), [Info 2](https://en.wikipedia.org/wiki/Penryn_(microarchitecture)) | 2006 a 2009 |
| [Lynnfield e Clarkdale](../config.plist/clarkdale.md) | 5XX-8XX | 2010 |
| [Sandy Bridge](../config.plist/sandy-bridge.md) | 2XXX | 2011 |
| [Ivy Bridge](../config.plist/ivy-bridge.md) | 3XXX | 2012 |
| [Haswell](../config.plist/haswell.md) | 4XXX | 2013 a 2014 |
| [Skylake](../config.plist/skylake.md) | 6XXX | 2015 a 2016 |
| [Kaby Lake](../config.plist/kaby-lake.md) | 7XXX | 2017 |
| [Coffee Lake](../config.plist/coffee-lake.md) | 8XXX-9XXX | 2017 a 2019 |
| [Comet Lake](../config.plist/comet-lake.md) | 10XXX | 2020 |

### Notebook Intel

| Codenome | Série | Período |
| :--- | :--- | :--- |
| [Clarksfield e Arrandale](../config-laptop.plist/arrandale.md) | 3XX-9XX | 2010 |
| [Sandy Bridge](../config-laptop.plist/sandy-bridge.md) | 2XXX | 2011 |
| [Ivy Bridge](../config-laptop.plist/ivy-bridge.md) | 3XXX | 2012 |
| [Haswell](../config-laptop.plist/haswell.md) | 4XXX | 2013 a 2014 |
| [Broadwell](../config-laptop.plist/broadwell.md) | 5XXX | 2014 a 2015 |
| [Skylake](../config-laptop.plist/skylake.md) | 6XXX | 2015 a 2016 |
| [Kaby Lake e Amber Lake](../config-laptop.plist/kaby-lake.md) | 7XXX | 2017 |
| [Coffee Lake e Whiskey Lake](../config-laptop.plist/coffee-lake.md) | 8XXX | 2017 a 2018 |
| [Coffee Lake Plus e Comet Lake](../config-laptop.plist/coffee-lake-plus.md) | 9XXX-10XXX | 2019 a 2020 |
| [Ice Lake](../config-laptop.plist/icelake.md) | 10XXX | 2019 a 2020 |

### Intel HEDT (Desktop de Alta Performance)

Essa seção inclui tanto hardware de entusiastas quando de servidores.

| Codenome | Série | Período |
| :--- | :--- | :--- |
| [Nehalem e Westmere](../config-HEDT/nehalem.md) | 9XX, X3XXX, X5XXX, [Info 1](https://en.wikipedia.org/wiki/Nehalem_(microarchitecture)), [Info 2](https://en.wikipedia.org/wiki/Westmere_(microarchitecture)) | 2008 a 2010 |
| [Sandy/Ivy Bridge-E](../config-HEDT/ivy-bridge-e.md) | 3XXX, 4XXX | 2011 a 2013 |
| [Haswell-E](../config-HEDT/haswell-e.md) | 5XXX | 2014 |
| [Broadwell-E](../config-HEDT/broadwell-e.md) | 6XXX | 2016 |
| [Skylake/Cascade Lake-X/W](../config-HEDT/skylake-x.md) | 7XXX, 9XXX, 10XXX | 2017 a 2019 |

### AMD

| Codenome | Série | Período |
| :--- | :--- | :--- |
| [Bulldozer/Jaguar](../AMD/fx.md) | [É bem estranho.](https://en.wikipedia.org/wiki/List_of_AMD_processors#Bulldozer_architecture;_Bulldozer,_Piledriver,_Steamroller,_Excavator_(2011%E2%80%932017)) | [A AMD era bem ruim com nomes na época](https://en.wikipedia.org/wiki/List_of_AMD_processors#Bulldozer_architecture;_Bulldozer,_Piledriver,_Steamroller,_Excavator_(2011%E2%80%932017)) |
| [Zen](../AMD/zen.md) | 1XXX, 2XXX, 3XXX, 5XXX | 2017 a 2020 |

* Observação: ~~3ª Geração de Threadripper (39XX) não é suportada. 1ª e 2ª gerações, no entanto, são suportadas.~~
  * As últimas versões de BIOS e do OpenCore corrigiram esse problema. Todos as plataformas Threadripper são suportadas agora.
