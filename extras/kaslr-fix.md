# Corrigindo os Valores de slide do KASLR

Essa seção é para aqueles usuários que queiram entender e corrigir o erro "Couldn't allocate runtime area", mais comum em placas-mãe Z390, X99 e X299.

* Observação: é necessário usar o OpenCore. O Clover não é mais suportado por este guia.

## O Que é KASLR?

KASLR significa, em inglês, *Kernel Address Space Layout Randomization* (Aleatorização do Leiaute do Espaço de Endereços do Kernel). É usado para fins de segurança. Mais precisamente, o KASLR dificulta que invasores descubram onde os objetos importantes estão na memória, já que as posições são aleatórias entre computadores e inicializações. Uma explicação mais aprofundada sobre o KASLR pode ser encontrada [aqui](https://lwn.net/Articles/569635/) (em inglês).

Isso se torna um problema quando aparecem computadores com mapas de memória pequenos ou que possuem muitos dispositivos presentes. Embora seja bastante provável haver espaço para o *kernel* operar, existem muitas outras áreas livres onde o *kernel* não cabe completamente. É nesse cenário que entra o `slide=xxx`. Em vez de deixar que o macOS escolha uma área aleatória para operar a cada inicialização, ele é forçado a operar em um local em que se sabe que irá funcionar.

## E Para Quem É Essa Informação

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

## Então Como Consertar Isso

A solução real para isso é bastante simples, na verdade. Será necessário:

* **Usuários do OpenCore**:
  * [OpenRuntime](https://github.com/acidanthera/OpenCorePkg/releases)
  * [OpenShell](https://github.com/acidanthera/OpenCorePkg/releases) (Não se esqueça de ativá-lo no caminho `Root -> Misc -> Tools`).

E também será preciso alterar a `config.plist`, na seção `Booter`:

* **AvoidRuntimeDefrag**: YES
  * Corrige serviços UEFI em tempo de execução, como a data, a hora, a NVRAM, o controle de energia etc.
* **DevirtualiseMmio**: YES
  * Reduz a quantidade de memória reservada. Por consequência, expande as opções de valores do `slide=N` e ajuda bastante a corrigir problemas de alocação de memória em placas-mãe Z390.
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

Abra o `shell` EFI no seu gerenciador de *boot* preferido e execute o `memap`. Isso exibirá uma lista de todas as páginas e seus tamanhos. Aqui é onde a diversão começa.

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

> But this is soooooo hard

Well fret not, for there is a simple solution. After running `memmap` in the shell, run:

```
shell> fs0: //replace with your USB

fs0:\> dir //to verify this is the right directory, if not try fs1 and so on

Directory of fs0:\
01/01/01 3:30p   EFI

fs0:\> memmap > memmap.txt
```

This will add a `memmap.txt` file to the root of your EFI, you can then proceed to drop it into the r/Hackintosh discord in the #Sandbox channel and type `$slide [insert a link to memmap.txt]`

## Using DevirtualiseMmio

DevirtualiseMmio is quite an interesting quirk, specifically in that it gets around a huge hurdle with many PCI device systems like some Z390 boards and virtually all HEDT boards like X99 and X299. How it does this is it takes MMIO regions and removes runtime attributes allowing them to be used as space for the kernel to sit comfortably, pair this with `ProvideCustomSlide` quirk means we can keep the security feature of slide while also getting a bootable machine.

For extremely problematic systems like Threadripper TRX40 19H, we need to find specific regions that aren't required for proper operation. This is where `MmioWhitelist` comes into play. Note that whitelisting isn't required for most systems

If you run the debug version of OpenCore with DevirtualiseMmio, you'll notice this in your logs:

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

* Note: See [OpenCore Debugging](../troubleshooting/debug.md) on how to enable logging to file

So we have 6 regions we need to go through and see which are bad, best idea is to block all MMIO sections *except* one and try each region to get a list of good regions.

Now lets take the above example and create our own MmioWhitelist, we'll need to first convert the address from hexadecimal to decimal:

* MMIO devirt 0x60000000 -> 1610612736
* MMIO devirt 0xFE000000 -> 4261412864
* MMIO devirt 0xFEC00000 -> 4273995776
* MMIO devirt 0xFED00000 -> 4275044352
* MMIO devirt 0xFEE00000 -> 4276092928
* MMIO devirt 0xFF000000 -> 4278190080

Should look something like this when done:

![](../images/extras/kaslr-fix-md/mmio-white.png)
