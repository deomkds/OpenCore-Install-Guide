(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{493:function(e,a,t){e.exports=t.p+"assets/img/config-gpu.65a08c27.png"},494:function(e,a,t){e.exports=t.p+"assets/img/corp-windows.cba6825c.png"},664:function(e,a,t){"use strict";t.r(a);var o=t(29),s=Object(o.a)({},(function(){var e=this,a=e.$createElement,o=e._self._c||a;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"desativando-a-gpu"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#desativando-a-gpu"}},[e._v("#")]),e._v(" Desativando a GPU")]),e._v(" "),o("p",[e._v("Então você precisa esconder sua GPU não suportada? Bem, com o OpenCore as coisas são um pouco diferentes. Sendo mais específico, é preciso especificar qual é o dispositivo exato que se quer falsificar. Existem 3 maneiras de se fazer isso:")]),e._v(" "),o("ul",[o("li",[e._v("Por Argumento de Inicialização\n"),o("ul",[o("li",[e._v("Desativa todas as GPUs exceto a GPU integrada Intel.")])])]),e._v(" "),o("li",[e._v("Por DeviceProperties\n"),o("ul",[o("li",[e._v("Desativa GPUs por slot.")])])]),e._v(" "),o("li",[e._v("Por SSDT\n"),o("ul",[o("li",[e._v("Desativa GPUs por slot.")])])])]),e._v(" "),o("p",[o("strong",[e._v("O CSM precisa estar desligado na BIOS para a falsificação funcionar corretamente, especialmente em computadores baseados em CPUs AMD.")])]),e._v(" "),o("h3",{attrs:{id:"por-argumento-de-inicializacao"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#por-argumento-de-inicializacao"}},[e._v("#")]),e._v(" Por Argumento de Inicialização")]),e._v(" "),o("p",[e._v("De longe, o método mais simples. Só é necessário adicionar o seguinte argumento de inicialização ("),o("em",[e._v("boot-arg")]),e._v("):")]),e._v(" "),o("p",[o("code",[e._v("-wegnoegpu")])]),e._v(" "),o("p",[e._v("Observe que isso desativará todas as GPUs, exceto as integradas da Intel.")]),e._v(" "),o("h3",{attrs:{id:"por-deviceproperties"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#por-deviceproperties"}},[e._v("#")]),e._v(" Por DeviceProperties")]),e._v(" "),o("p",[e._v("É bastante simples. Encontre a rota PCI com o "),o("a",{attrs:{href:"https://github.com/acidanthera/gfxutil/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("gfxutil"),o("OutboundLink")],1),e._v(" (em inglês) e então crie uma nova seção de DeviceProperties contendo sua falsificação:")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("path/to/gfxutil -f GFX0\n")])])]),o("p",[e._v("E a saída resultará em algo similar a isso:")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("DevicePath = PciRoot(0x0)/Pci(0x1,0x0)/Pci(0x0,0x0)/Pci(0x0,0x0)/Pci(0x0,0x0)\n")])])]),o("p",[e._v("Com isso, navegue até "),o("code",[e._v("Root -> DeviceProperties -> Add")]),e._v(" e adicione a rota de PCI com as seguintes propriedades:")]),e._v(" "),o("table",[o("thead",[o("tr",[o("th",{staticStyle:{"text-align":"left"}},[e._v("Chave")]),e._v(" "),o("th",{staticStyle:{"text-align":"left"}},[e._v("Tipo")]),e._v(" "),o("th",{staticStyle:{"text-align":"left"}},[e._v("Valor")])])]),e._v(" "),o("tbody",[o("tr",[o("td",{staticStyle:{"text-align":"left"}},[e._v("name")]),e._v(" "),o("td",{staticStyle:{"text-align":"left"}},[e._v("data")]),e._v(" "),o("td",{staticStyle:{"text-align":"left"}},[e._v("23646973706C6179")])]),e._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[e._v("IOName")]),e._v(" "),o("td",{staticStyle:{"text-align":"left"}},[e._v("string")]),e._v(" "),o("td",{staticStyle:{"text-align":"left"}},[e._v("#display")])]),e._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[e._v("class-code")]),e._v(" "),o("td",{staticStyle:{"text-align":"left"}},[e._v("data")]),e._v(" "),o("td",{staticStyle:{"text-align":"left"}},[e._v("FFFFFFFF")])])])]),e._v(" "),o("p",[o("img",{attrs:{src:t(493),alt:""}})]),e._v(" "),o("h3",{attrs:{id:"por-ssdt"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#por-ssdt"}},[e._v("#")]),e._v(" Por SSDT")]),e._v(" "),o("p",[e._v("Existem várias maneiras de encontrar o caminho, mas geralmente a mais fácil é acessar o Gerenciador de Dispositivos no Windows e descobrir o caminho da PCI.")]),e._v(" "),o("p",[e._v("Exemplo de caminho de dispositivo para "),o("code",[e._v("\\_SB.PCI0.PEG0.PEGP")]),e._v(":")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v('\n    DefinitionBlock ("", "SSDT", 2, "DRTNIA", "spoof", 0x00000000)\n    {\n       External (_SB_.PCI0.PEG0.PEGP, DeviceObj)\n\n       Method (_SB.PCI0.PEG0.PEGP._DSM, 4, NotSerialized)\n       {\n          If ((!Arg2 || !(_OSI ("Darwin"))))\n          {\n             Return (Buffer (One)\n             {\n                0x03\n             })\n          }\n\n          Return (Package (0x0A)\n          {\n             "name",\n             Buffer (0x09)\n             {\n                "#display"\n             },\n\n             "IOName",\n             "#display",\n             "class-code",\n             Buffer (0x04)\n             {\n                0xFF, 0xFF, 0xFF, 0xFF\n             },\n          })\n       }\n    }\n\n')])])]),o("p",[e._v("Uma cópia dessa SSDT pode ser encontrada aqui: "),o("a",{attrs:{href:"https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/Spoof-SSDT.dsl",target:"_blank",rel:"noopener noreferrer"}},[e._v("Spoof-SSDT.dsl"),o("OutboundLink")],1),e._v(". Será necessário usar o "),o("a",{attrs:{href:"https://github.com/acidanthera/MaciASL/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("MaciASL"),o("OutboundLink")],1),e._v(" para compilar a SSDT. Lebre-se que "),o("code",[e._v(".aml")]),e._v(" é compilada e "),o("code",[e._v(".dsl")]),e._v(" é o código fonte. Para compilar com o MaciASL, selecione "),o("code",[e._v("File -> Save As -> ACPI Machine Language")]),e._v(".")]),e._v(" "),o("p",[e._v("Fonte: CorpNewt")]),e._v(" "),o("h2",{attrs:{id:"selecao-de-gpu-no-windows"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#selecao-de-gpu-no-windows"}},[e._v("#")]),e._v(" Seleção de GPU no Windows")]),e._v(" "),o("p",[e._v("Dependendo da configuração do seu computador, é possível que o Windows esteja renderizando jogos ou aplicativos usando uma GPU não desejada.")]),e._v(" "),o("p",[e._v("Muitos usuários têm somente duas GPUs. Nvidia e a Intel HD/UHD integrada. Já que a Nvidia não funciona mais no macOS, esses usuários conectam seus monitores nas portas HDMI/DP de suas placas-mãe por pura conveniencia. Como resultado disso, o Windows renderiza todos os jogos e aplicativos por meio da GPU integrada da Intel. É possível redirecionar um jogo ou aplicativo específico para uma GPU diferente acessando "),o("code",[e._v("Configurações > Sistema > Monitores > Configurações Gráficas")]),e._v(".")]),e._v(" "),o("p",[o("img",{attrs:{src:t(494),alt:"Créditos da Imagem à CorpNewt"}})]),e._v(" "),o("p",[e._v("O jogo ou aplicativo renderizado terá seu buffer copiado para a GPU integrada, que é então exibida no monitor. Isso traz algumas desvantagens:")]),e._v(" "),o("ul",[o("li",[e._v("GSync deixará de funcionar.")]),e._v(" "),o("li",[e._v("Não será mais possível abrir as configurações da Nvidia. Essa função exige que o monitor esteja conectado diretamente na GPU.")]),e._v(" "),o("li",[e._v("Taxa de quadros menor.")]),e._v(" "),o("li",[e._v("Latência de entrada maior.")]),e._v(" "),o("li",[e._v("Limite de atualização de quadros.")])]),e._v(" "),o("p",[e._v("Se sua placa-mãe só possui uma porta HDMI para a GPU integrada, a taxa de atualização máxima para a especificação 2.1 é de "),o("a",{attrs:{href:"https://www.hdmi.org/spec21Sub/EightK60_FourK120",target:"_blank",rel:"noopener noreferrer"}},[e._v("120Hz"),o("OutboundLink")],1),e._v(" (em inglês). Assume-se que a placa-mãe e o monitor seguem a mesma especificação. Isso significa que um monitor de 144Hz só consegue enxergar um máximo de 120Hz conforme determinado pelo hardware. Essa limitação "),o("em",[e._v("não")]),e._v(" se aplica se sua placa possuir uma porta DP para a GPU integrada.")]),e._v(" "),o("p",[e._v("Se houver mais de duas GPUs (AMD, Nvidia e Intel), essa configuração é limitada. Um monitor conectado à GPU AMD significa que o Windows somente permitira esoclher a GPU AMD ou a GPU integrada da Intel. A GPU Nvidia não será exibida. Essa "),o("a",{attrs:{href:"https://pureinfotech.com/windows-10-21h1-new-features/#:~:text=Graphics%20settings",target:"_blank",rel:"noopener noreferrer"}},[e._v("limitação foi removida"),o("OutboundLink")],1),e._v(" em versões mais novas do Windows.")]),e._v(" "),o("p",[e._v("Como recomendaçõa, se você usa ambos os sistemas operacionais igualmente e prefere não ter desvantagens, a melhor opção é usar um "),o("em",[e._v("switch")]),e._v(" HDMI ou DP.")])])}),[],!1,null,null,null);a.default=s.exports}}]);