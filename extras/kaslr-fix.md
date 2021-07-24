# Calculando o Valor de Slide do KASLR

Essa seção é para aqueles usuários que queiram entender e corrigir o erro "Couldn't allocate runtime area", mais comum em placas-mãe Z390, X99 e X299.

* Observação: é necessário usar o OpenCore. O Clover não é mais suportado.

## Definição de KASLR

KASLR significa, em inglês, *Kernel Address Space Layout Randomization* (Aleatorização do Leiaute do Espaço de Endereços do Kernel). É usado para fins de segurança. Mais precisamente, o KASLR dificulta que invasores descubram onde os objetos importantes estão na memória, já que as posições são aleatórias entre computadores e inicializações. Uma explicação mais aprofundada sobre o KASLR pode ser encontrada [aqui](https://lwn.net/Articles/569635/) (em inglês).

Isso se torna um problema quando aparecem computadores com mapas de memória pequenos ou que possuem muitos dispositivos presentes. Embora seja bastante provável haver espaço para o *kernel* operar, existem muitas outras áreas livres onde o *kernel* não cabe completamente. É nesse cenário que entra o `slide=xxx`. Em vez de deixar que o macOS escolha uma área aleatória para operar a cada inicialização, ele é forçado a operar em um local em que se sabe que irá funcionar.

## Para Quem Se Aplica

Como mencionado anteriormente, essa opções são para usuários que não possuem espaço suficiente para o *kernel* ou em situações em que ele se move para lugares muito pequenos. Geralmente resultará em um erro como esse ao iniciar:

```
Error allocating 0x1197b pages at 0x0000000017a80000 alloc type 2
Couldn't allocate runtime area
```

Com algumas variações:

```
Only 244/256 slide values are usable!
```

Ou até mesmo travamentos ao executar o macOS:

```
panic(cpu 6 caller 0xffffff801fc057ba): a freed zone element has been modified in zone kalloc.4096: expected 0x3f00116dbe8a46f6 but found 0x3f00116d00000000
```

A melhor parte sobre esses erros é que eles podem ser aleatórios. Isso também explica por que ligar e desligar o computador 20 vezes pode resolver o problema, embora temporariamente.

Fato curioso: leva mais ou menos 31ms para o *kernel* encontrar uma área de operação. Configurar um valor de `slide` manulmente pode, em média, reduzir o tempo de inicialização por incríveis 0,207%!!!

## Como Corrigir

A solução real para isso é bastante simples, na verdade. Será necessário:

* **Usuários do OpenCore**:
  * [OpenRuntime](https://github.com/acidanthera/OpenCorePkg/releases)
  * [OpenShell](https://github.com/acidanthera/OpenCorePkg/releases) (Não se esqueça de ativá-lo no caminho `Root -> Misc -> Tools`).

E também será preciso alterar a `config.plist`, na seção `Booter`:

* **AvoidRuntimeDefrag**: YES
  * Corrige serviços UEFI em tempo de execução, como a data, a hora, a NVRAM, o controle de energia etc.
* **DevirtualiseMmio**: YES
  * Reduz a quantidade de memória reservada, expande as opções de valores do `slide=N` e ajuda bastante a corrigir problemas de alocação de memória em placas-mãe Z390.
* **EnableSafeModeSlide**: YES
  * Permite que as variáveis `slide` possam ser usadas no modo de segurança.
* **ProtectUefiServices**: NO
  * Protege os serviços de UEFI para que eles não sejam sobrescritos pelo firmware. Relevante principalmente em máquinas virtuais, computadores série 300 e mais novos baseados em Ice Lake e Comet Lake.
* **ProvideCustomSlide**: YES
  * Isso garante que o *kernel* somente escolherá regiões boas e evitará aquelas que podem resultar em falhas de inicialização. Ainda é aleatório, mas omite as regiões ruins na aleatorização.
* **RebuildAppleMemoryMap**: YES
  * Gera um mapa de memória compatível com o macOS, mas pode não funcionar em alguns firmwares de notebooks OEM. Se encontrar falhas precoces na inicialização, desative esta opção. Isso garante que o mapa de memória se encaixará naquilo que o kernel espera.

## Preparando a BIOS

O motivo pelo qual é preciso redefinir o mapa de memória é porque ele precisa ser mais determinístico. A ideia é que haja menos variação entre inicializações para que aconteçam menos casos nos quais o kernel não encontra espaço suficiente para operar (mapas de memória não são sempre consistentes nas inicializações). Para isso:

* Atualize a BIOS (extremamente importante, pois BIOS mais antigas são conhecidas por terem problemas de mapa de memória, especialmente na Z390).
* Limpe o CMOS.
* Ative configurações necessárias na BIOS:
  * `Above4GDecoding`: Isso permite que dispositivos utilizem as regiões de memória acima dos 4GB. Significa que o macOS terá mais espaço onde se enfiar, mas pode ser problemático em algumas placas-mãe X99 e X299, então é recomendado testar com essa opção ligada e desligada.
    * Observação: em BIOS que suportam `Resizable BAR Support`, ativar o `Above4GDecoding` habilitará a opção. Tenha certeza de que o suporte a BAR esteja desativado se a opção aparecer.
  * `Boot Options -> Windows8.1/10 mode`: Isso garantirá que nenhum lixo legado antigo seja carregado. Fato curioso: `Other OS` foi feito para iniciar versões antigas do Windows e não outros sistemas operacionais.
* Desative o máximo de dispositivos desnecessários na BIOS (isso significa que haverá menos variação no mapa de memória a cada inicialização, o que diminui as chances de ocorrerem falhas na inicialização). Configurações comuns:
  * `CSM`: para suporte a SOs antigos; adiciona um monte de lixo desnecessário. Também pode fazer o *shell* parar de funcionar, impedindo a sua inicialização.
  * `Intel SGX`: Software Guard Extensions. Ocupa muito espaço na memória e não faz nada no macOS.
  * `Parallel Port`: o macOS nem consegue enxergar as portas paralelas.
  * `Serial Port`: eu gostaria de saber quantos de vocês estão depurando um *kernel*...
  * `iGPU`: não é ideal, mas alguns computadores possuem mapas tão lotados que a GPU integrada simplesmente não cabe.
  * `Thunderbolt`: muitos *hackintoshes* nem possuem portas Thunderbolt funcionais, e as placas que não têm portas Thunderbolt mas possuem essa opção só desperdiçam ainda mais espaço.
  * `LED lighting`: desculpa, cara, mas é hora de cair fora.
  * `Legacy USB`: mais porcaria antiga.

## Inicialização de Teste

Com a EFI ajustada, a `config.plist` e a BIOS configuradas, é hora de testar a nova configuração. Se ainda tiver problemas, será necessário mergulhar mais fundo e calcular o valor de `slide`.

## Encontrando o Valor de Slide

Abra o `shell` EFI no seu gerenciador de *boot* preferido e execute o `memmap`. Isso exibirá uma lista de todas as páginas e seus tamanhos. Aqui é onde a diversão começa.

Exemplo do que será exibido:

| Tipo | Início | Fim | Nº de Páginas | Atributos |
| :--- | :--- | :--- | :--- | :--- |
| RT_Data | 0000000000000000 | 0000000000000FFF | 0000000000000001 | 800000000000000F |
| Disponível | 0000000000001000 | 0000000000057FFF | 0000000000000057 | 000000000000000F |
| Reservado | 0000000000058000 | 0000000000058FFF | 0000000000000001 | 000000000000000F |
| Disponível | 0000000000059000 | 000000000008FFFF | 0000000000000037 | 000000000000000F |
| RT_Code | 0000000000090000 | 0000000000090FFF | 0000000000000001 | 800000000000000F |
| Disponível | 0000000000091000 | 000000000009DFFF | 000000000000000D | 000000000000000F |
| Reservado | 000000000009E000 | 000000000009FFFF | 0000000000000002 | 000000000000000F |
| Disponível | 0000000000100000 | 000000005B635FFF | 000000000005B536 | 000000000000000F |
| BS_Data | 000000005B636000 | 000000005B675FFF | 0000000000000040 | 000000000000000F |
| Disponível | 000000005B676000 | 000000006AF77FFF | 000000000000F902 | 000000000000000F |
| LoaderCode | 000000006AF78000 | 000000006B155FFF | 00000000000001DE | 000000000000000F |
| BS_Data | 000000006B156000 | 000000006B523FFF | 00000000000003CE | 000000000000000F |
| ACPI_NVS | 000000006B524000 | 000000006B524FFF | 0000000000000001 | 000000000000000F |
| BS_Data | 000000006B526000 | 000000006B625FFF | 0000000000000100 | 000000000000000F |
| Disponível | 000000006B626000 | 000000006B634FFF | 000000000000000F | 000000000000000F |

Agora a pergunta que fica é: como diabos isso é convertido para um valor de `slide`. Bem, é bastante simples. O ponto de interesse é o maior valor disponível dentro da coluna `Início`. Nesse exemplo, o `000000006B626000` é o maior valor. Observe que esses valores estão em hexadecimal, então se houver múltiplos valores próximos uns aos outros, talvez seja necessário convertê-los para decimal. Para calcular o valor de `slide`, utilize a calculadora integrada do macOS, que possui uma função de programação acessível ao pressionar ⌘+3:

`000000006B626000` = `0x6B626000`

(`0x6B626000` - `0x100000`)/`0x200000` = `0x35A`

E para verificar se o valor está correto:

`0x100000` + (`0x35A` * `0x200000`) = `0x6B500000`

Sempre que o valor retornado **não** for o original (`0x6B500000` vs `0x6B626000`), simplesmente adicione 1 ao valor de `slide` final. Isso acontece por causa de arredondamento. Por exemplo, o valor `0x35A` convertido para decimal se torna `858`, que, somado a 1, resultará em `slide=859`.

> Mas espere só um segundo! Deu um valor maior do que 256!

Correto. Isso é causado por mapas de memória que incluem setores `Above4GDecoding`, os quais não podem ser utilizados. Então será necessário continuar descendo na lista até encontrar um valor que seja pequeno o suficiente (neste caso seria `0000000000100000`).

E só para deixar a fórmula um pouco mais clara:

(HEX - `0x100000`)/`0x200000` = Valor de `slide` em hexadecimal.

`0x100000` + (valor de `slide` em hexadecimal * `0x200000`) = valor hexadecimal original (se não for, some 1 ao valor de `slide`).

Agora acesse a `config.plist` e adicione o valor de `slide` junto com o restante dos argumentos de inicialização (neste caso seria `slide=0` ao usar `0x100000`). Se este valor ainda resultar em erros, então avance para o segundo maior valor da coluna `Início` e assim por diante.

Ao calcular o valor de `slide`, às vezes o valor retornado pode ser muito pequeno, como `slide=-0.379150390625`. Nesses casos, arredonde para `slide=0`.

E para os usuários que estejam tendo problemas para encontrar os valores de `slide`, também podem digitar `$slide [insira o maior valor da coluna Nº de Páginas]` no canal #Sandbox no Discor do [r/Hackintosh](https://discord.gg/u8V7N5C) (em inglês).

> Mas isso é tããããããããão difícil

Bom, não esquenta, pois há uma solução simples. Após abrir o `memmap` no `shell`, execute:

```
shell> fs0: //Substitua pelo seu pendrive.

fs0:\> dir //Para verificar que se trada do diretório correto. Se não, tente fs1 e assim por diante.

Directory of fs0:\
01/01/01 3:30p   EFI

fs0:\> memmap > memmap.txt
```

Isso criará um arquivo `memmap.txt` na raíz da sua partição EFI. Agora, poste o arquivo no Discord do r/Hackintosh, no canal #Sandbox e digite `$slide [insira um link para o arquivo memmap.txt]`.

## Usando o DevirtualiseMmio

O DevirtualiseMmio é uma *quirk* interessante. Isso porque ela contorna um grande problema com dispositivos PCI em alguns computadores, como em placas-mãe Z390 e praticamente todas as placas HEDT, como a X99 e a X299. O que ela faz é acessar as regiões de MMIO e remover os atributos de tempo de execução, permitindo que sejam usados como espaço onde o *kernel* pode caber confortavelmente. Combinada com a *quirk* `ProvideCustomSlide`, é possível manter o recurso de segurança do `slide` ao mesmo tempo em que se torna possível iniciar o sistema.

Para computadores extremamente problemáticos, como o Threadripper TRX40 19H, é preciso encontrar as regiões específicas que não são necessárias para o funcionamento normal. É nesse momento em que o  `MmioWhitelist` entra. Observe que o processo de *whitelisting* não é necessário na maioria dos computadores.

Execute a versão de depuração do OpenCore com a opção DevirtualiseMmio e observe as seguintes informações no log:

```
21:495 00:009 OCABC: MMIO devirt start
21:499 00:003 OCABC: MMIO devirt 0x60000000 (0x10000 pages, 0x8000000000000001) skip 0
21:503 00:003 OCABC: MMIO devirt 0xFE000000 (0x11 pages, 0x8000000000000001) skip 0
21:506 00:003 OCABC: MMIO devirt 0xFEC00000 (0x1 pages, 0x8000000000000001) skip 0
21:510 00:003 OCABC: MMIO devirt 0xFED00000 (0x1 pages, 0x8000000000000001) skip 0
21:513 00:003 OCABC: MMIO devirt 0xFEE00000 (0x1 pages, 0x800000000000100D) skip 0
21:516 00:003 OCABC: MMIO devirt 0xFF000000 (0x1000 pages, 0x800000000000100D) skip 0
21:520 00:003 OCABC: MMIO devirt end, saved 278608 KB
```

* Observação: Veja a página [Depurando o OpenCore](../troubleshooting/debug.md) para descobrir como ativar o arquivo de log.

Neste exemplo, há 6 regiões que precisam ser verificadas para descobrir quais são ruins. A melhor estratégia é bloquear todas as seções de MMIO, *exceto* uma, e tentar cada uma delas até obter uma lista das regiões boas.

Agora, o exemplo acima será utilizado para criar uma MmioWhitelist. Primeiramente, é preciso converter os endereços de hexadecimal para decimal:

* MMIO devirt 0x60000000 -> 1610612736
* MMIO devirt 0xFE000000 -> 4261412864
* MMIO devirt 0xFEC00000 -> 4273995776
* MMIO devirt 0xFED00000 -> 4275044352
* MMIO devirt 0xFEE00000 -> 4276092928
* MMIO devirt 0xFF000000 -> 4278190080

Então, adicione cada um deles no caminho `Root > Booter > MmioWhitelist`, no arquivo `config.plist`. Crie uma entrada para cada linha e preencha as chaves da seguinte maneira:

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| Address | Number | 1610612736 |
| Comment | String | Qualquer coisa que identifique os endereços, veja o exemplo na imagem abaixo. |
| Enabled | Boolean | YES |

Deve ficar assim quando terminado:

![](../images/extras/kaslr-fix-md/mmio-white.png)
