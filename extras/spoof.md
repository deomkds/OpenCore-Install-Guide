# Desativando a GPU

Então você precisa esconder sua GPU não suportada? Bem, com o OpenCore as coisas são um pouco diferentes. Sendo mais específico, é preciso especificar qual é o dispositivo exato que se quer falsificar. Existem 3 maneiras de se fazer isso:

* Por Argumento de Inicialização
  * Desativa todas as GPUs exceto a GPU integrada Intel.
* Por DeviceProperties
  * Desativa GPUs por slot.
* Por SSDT
  * Desativa GPUs por slot.

**O CSM precisa estar desligado na BIOS para a falsificação funcionar corretamente, especialmente em computadores baseados em CPUs AMD.**

### Por Argumento de Inicialização

De longe, o método mais simples. Só é necessário adicionar o seguinte argumento de inicialização (*boot-arg*):

`-wegnoegpu`

Observe que isso desativará todas as GPUs, exceto as integradas da Intel.

### Por DeviceProperties

É bastante simples. Encontre a rota PCI com o [gfxutil](https://github.com/acidanthera/gfxutil/releases) (em inglês) e então crie uma nova seção de DeviceProperties contendo sua falsificação:

```
path/to/gfxutil -f GFX0
```

E a saída resultará em algo similar a isso:

```
DevicePath = PciRoot(0x0)/Pci(0x1,0x0)/Pci(0x0,0x0)/Pci(0x0,0x0)/Pci(0x0,0x0)
```

Com isso, navegue até `Root -> DeviceProperties -> Add` e adicione a rota de PCI com as seguintes propriedades:

| Chave | Tipo | Valor |
| :--- | :--- | :--- |
| name | data | 23646973706C6179 |
| IOName | string | #display |
| class-code | data | FFFFFFFF |

![](../images/extras/spoof-md/config-gpu.png)

### Por SSDT

Existem várias maneiras de encontrar o caminho, mas geralmente a mais fácil é acessar o Gerenciador de Dispositivos no Windows e descobrir o caminho da PCI.

Exemplo de caminho de dispositivo para `\_SB.PCI0.PEG0.PEGP`:

```

    DefinitionBlock ("", "SSDT", 2, "DRTNIA", "spoof", 0x00000000)
    {
       External (_SB_.PCI0.PEG0.PEGP, DeviceObj)

       Method (_SB.PCI0.PEG0.PEGP._DSM, 4, NotSerialized)
       {
          If ((!Arg2 || !(_OSI ("Darwin"))))
          {
             Return (Buffer (One)
             {
                0x03
             })
          }

          Return (Package (0x0A)
          {
             "name",
             Buffer (0x09)
             {
                "#display"
             },

             "IOName",
             "#display",
             "class-code",
             Buffer (0x04)
             {
                0xFF, 0xFF, 0xFF, 0xFF
             },
          })
       }
    }

```

Uma cópia dessa SSDT pode ser encontrada aqui: [Spoof-SSDT.dsl](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/Spoof-SSDT.dsl). Será necessário usar o [MaciASL](https://github.com/acidanthera/MaciASL/releases) para compilar a SSDT. Lebre-se que `.aml` é compilada e `.dsl` é o código fonte. Para compilar com o MaciASL, selecione `File -> Save As -> ACPI Machine Language`.

Fonte: CorpNewt

## Seleção de GPU no Windows

Dependendo da configuração do seu computador, é possível que o Windows esteja renderizando jogos ou aplicativos usando uma GPU não desejada.

Muitos usuários têm somente duas GPUs. Nvidia e a Intel HD/UHD integrada. Já que a Nvidia não funciona mais no macOS, esses usuários conectam seus monitores nas portas HDMI/DP de suas placas-mãe por pura conveniencia. Como resultado disso, o Windows renderiza todos os jogos e aplicativos por meio da GPU integrada da Intel. É possível redirecionar um jogo ou aplicativo específico para uma GPU diferente acessando `Configurações > Sistema > Monitores > Configurações Gráficas`.

![Créditos da Imagem à CorpNewt](../images/extras/spoof-md/corp-windows.png)

O jogo ou aplicativo renderizado terá seu buffer copiado para a GPU integrada, que é então exibida no monitor. Isso traz algumas desvantagens:

* GSync deixará de funcionar.
* Não será mais possível abrir as configurações da Nvidia. Essa função exige que o monitor esteja conectado diretamente na GPU.
* Taxa de quadros menor.
* Latência de entrada maior.
* Limite de atualização de quadros.

Se sua placa-mãe só possui uma porta HDMI para a GPU integrada, a taxa de atualização máxima para a especificação 2.1 é de [120Hz](https://www.hdmi.org/spec21Sub/EightK60_FourK120) (em inglês). Assume-se que a placa-mãe e o monitor seguem a mesma especificação. Isso significa que um monitor de 144Hz só consegue enxergar um máximo de 120Hz conforme determinado pelo hardware. Essa limitação *não* se aplica se sua placa possuir uma porta DP para a GPU integrada.

Se houver mais de duas GPUs (AMD, Nvidia e Intel), essa configuração é limitada. Um monitor conectado à GPU AMD significa que o Windows somente permitira esoclher a GPU AMD ou a GPU integrada da Intel. A GPU Nvidia não será exibida. Essa [limitação foi removida](https://pureinfotech.com/windows-10-21h1-new-features/#:~:text=Graphics%20settings) em versões mais novas do Windows.

Como recomendaçõa, se você usa ambos os sistemas operacionais igualmente e prefere não ter desvantagens, a melhor opção é usar um *switch* HDMI ou DP.
