(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{359:function(t,e,a){t.exports=a.p+"assets/img/populated-efi.8d46cc52.png"},449:function(t,e,a){t.exports=a.p+"assets/img/sample-location.f9079cbf.png"},450:function(t,e,a){t.exports=a.p+"assets/img/renamed.9b06868d.png"},451:function(t,e,a){t.exports=a.p+"assets/img/before-snapshot.f2dccade.png"},452:function(t,e,a){t.exports=a.p+"assets/img/after-snapshot.0dfaaf2b.png"},453:function(t,e,a){t.exports=a.p+"assets/img/duplicate.b628676a.png"},639:function(t,e,a){"use strict";a.r(e);var i=a(28),r=Object(i.a)({},(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("h1",{attrs:{id:"configuracao-da-config-plist"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#configuracao-da-config-plist"}},[t._v("#")]),t._v(" Configuração da config.plist")]),t._v(" "),i("p",[t._v("Agora que todas as "),i("em",[t._v("kexts")]),t._v(" ("),i("code",[t._v(".kext")]),t._v("), SSDTs ("),i("code",[t._v(".aml")]),t._v(") e drivers de firmware ("),i("code",[t._v(".efi")]),t._v(") estão instalados, o pendrive começa a se parecer com isso:")]),t._v(" "),i("p",[i("img",{attrs:{src:a(359),alt:"Pasta EFI Preenchhida"}})]),t._v(" "),i("ul",[i("li",[i("strong",[t._v("Observação")]),t._v(": seu pendrive "),i("strong",[t._v("será diferente")]),t._v(". Cada computador exigirá coisas diferentes.")])]),t._v(" "),i("h2",{attrs:{id:"criando-a-sua-config-plist"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#criando-a-sua-config-plist"}},[t._v("#")]),t._v(" Criando a Sua config.plist")]),t._v(" "),i("p",[t._v("Primeiramente, será necessário obter a "),i("code",[t._v("sample.plist")]),t._v(" do "),i("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("OpenCorePkg"),i("OutboundLink")],1),t._v(". Ela pode ser encontrada dentro da pasta "),i("code",[t._v("Docs")]),t._v(":")]),t._v(" "),i("p",[i("img",{attrs:{src:a(449),alt:""}})]),t._v(" "),i("p",[t._v("Agora, mova-a para dentro da partição EFI do pendrive (chama-se BOOT no Windows), sob o diretório "),i("code",[t._v("EFI/OC/")]),t._v(". Renomeie-a para "),i("code",[t._v("config.plist")]),t._v(".")]),t._v(" "),i("p",[i("img",{attrs:{src:a(450),alt:""}})]),t._v(" "),i("h2",{attrs:{id:"adicionando-as-ssdts-kexts-e-drivers-de-firmware"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#adicionando-as-ssdts-kexts-e-drivers-de-firmware"}},[t._v("#")]),t._v(" Adicionando as SSDTs, Kexts e Drivers de Firmware")]),t._v(" "),i("p",[t._v("Para o restante deste guia, será preciso um pouco de edição de arquivos "),i("code",[t._v(".plist")]),t._v(". E neste guia, serão utilizadas as ferramentas ProperTree e GenSMBIOS para ajudar a automatizar parte do trabalho tedioso:")]),t._v(" "),i("ul",[i("li",[i("a",{attrs:{href:"https://github.com/corpnewt/ProperTree",target:"_blank",rel:"noopener noreferrer"}},[t._v("ProperTree"),i("OutboundLink")],1),t._v(" "),i("ul",[i("li",[t._v("Editor de arquivos "),i("code",[t._v(".plist")]),t._v(" universal.")])])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://github.com/corpnewt/GenSMBIOS",target:"_blank",rel:"noopener noreferrer"}},[t._v("GenSMBIOS"),i("OutboundLink")],1),t._v(" "),i("ul",[i("li",[t._v("Para gerar os dados da SMBIOS.")])])])]),t._v(" "),i("p",[t._v("Então, é hora de abrir o ProperTree e editar a "),i("code",[t._v("config.plist")]),t._v(":")]),t._v(" "),i("ul",[i("li",[i("code",[t._v("ProperTree.command")]),t._v(" "),i("ul",[i("li",[t._v("Para macOS.")]),t._v(" "),i("li",[t._v("Dica: existe um utilitário chamado "),i("code",[t._v("buildapp.command")]),t._v(" dentro da pasta "),i("code",[t._v("Scripts")]),t._v(" que permite transformar o ProperTree em um aplicativo dedicado no macOS.")])])]),t._v(" "),i("li",[i("code",[t._v("ProperTree.bat")]),t._v(" "),i("ul",[i("li",[t._v("Para Windows.")])])])]),t._v(" "),i("p",[t._v("Uma vez que o ProperTree esteja sendo executado, abra o seu arquivo "),i("code",[t._v("config.plist")]),t._v(" pressionando "),i("strong",[t._v("Cmd/Ctrl + O")]),t._v(" e selecionando o arquivo "),i("code",[t._v("config.plist")]),t._v(" que está dentro do pendrive.")]),t._v(" "),i("p",[t._v("Depois de abrir o arquivo de configuração, pressione "),i("strong",[t._v("Cmd/Ctrl + Shift + R")]),t._v(" e aponte para a sua pasta "),i("code",[t._v("EFI/OC")]),t._v(' para criar uma "'),i("em",[t._v("Snapshot")]),t._v(' Limpa":')]),t._v(" "),i("ul",[i("li",[t._v("Isto removerá todas as entradas do arquivo "),i("code",[t._v("config.plist")]),t._v(" e então adiciona todas as suas SSDTs, "),i("em",[t._v("kexts")]),t._v(" e drivers de firmware nas seções certas.")]),t._v(" "),i("li",[t._v("Pressionar "),i("strong",[t._v("Cmd/Ctrl + R")]),t._v(" é outra opção para adicionar todos os seus arquivos, mas manterá as entradas desativadas caso tenham sido configuradas assim antes. Útil para quando estiver solucionando problemas, mas desnecessário neste momento.")])]),t._v(" "),i("p",[i("img",{attrs:{src:a(451),alt:""}})]),t._v(" "),i("p",[t._v("Feito isso, você verá todas as suas SSDTs, "),i("em",[t._v("kexts")]),t._v(" e drivers de firmware preenchidos na "),i("code",[t._v("config.plist")]),t._v(":")]),t._v(" "),i("p",[i("img",{attrs:{src:a(452),alt:""}})]),t._v(" "),i("ul",[i("li",[i("strong",[t._v("Observação:")]),t._v(' Se aparecer um pop-up dizendo "Disable the following kexts with Duplicate CFBundleIdentifiers?" ("Desativar as seguintes '),i("em",[t._v("kexts")]),t._v(' com CFBundleIdentifiers duplicados?), pressione "Yes". Isso garante que não há '),i("em",[t._v("kexts")]),t._v(" duplicadas sendo injetadas, já que algumas kexts podem conter os mesmos plugins (ex.: VoodooInput está presente tanto na VoodooPS2 quanto na pasta de plugins da VoodooI2C).")])]),t._v(" "),i("p",[i("img",{attrs:{src:a(453),alt:""}})]),t._v(" "),i("p",[t._v("Se desejar limpar um pouco o arquivo, pode remover as entradas iniciadas em "),i("code",[t._v("#WARNING")]),t._v(". Elas não causam nenhum problema estando presentes, então é questão de preferência pessoal.")]),t._v(" "),i("h2",{attrs:{id:"selecionando-a-sua-plataforma"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#selecionando-a-sua-plataforma"}},[t._v("#")]),t._v(" Selecionando a Sua Plataforma")]),t._v(" "),i("p",[t._v("Agora vem a parte importante: selecionar o caminho da configuração. Cada plataforma possui suas peculiaridades únicas que devem ser levadas em conta. Por isso que conhecer bem o seu hardware é super importante. Veja a seguir o que fazer:")]),t._v(" "),i("h3",{attrs:{id:"desktop-intel"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#desktop-intel"}},[t._v("#")]),t._v(" Desktop Intel")]),t._v(" "),i("ul",[i("li",[t._v("Observação: A série NUC da Intel é considerada hardware de notebook. Nessas situações, recomenda-se seguir a seção de "),i("a",{attrs:{href:"#notebook-intel"}},[t._v("Notebook Intel")]),t._v(".")])]),t._v(" "),i("table",[i("thead",[i("tr",[i("th",{staticStyle:{"text-align":"left"}},[t._v("Codenome")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Série")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Período")])])]),t._v(" "),i("tbody",[i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/penryn.html"}},[t._v("Yonah, Conroe e Penryn")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("E8XXX, Q9XXX, "),i("a",{attrs:{href:"https://en.wikipedia.org/wiki/Yonah_(microprocessor)",target:"_blank",rel:"noopener noreferrer"}},[t._v("Info 1"),i("OutboundLink")],1),t._v(", "),i("a",{attrs:{href:"https://en.wikipedia.org/wiki/Penryn_(microarchitecture)",target:"_blank",rel:"noopener noreferrer"}},[t._v("Info 2"),i("OutboundLink")],1)]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2006 a 2009")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/clarkdale.html"}},[t._v("Lynnfield e Clarkdale")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("5XX-8XX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2010")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/sandy-bridge.html"}},[t._v("Sandy Bridge")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2011")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/ivy-bridge.html"}},[t._v("Ivy Bridge")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("3XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2012")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/haswell.html"}},[t._v("Haswell")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("4XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2013 a 2014")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/skylake.html"}},[t._v("Skylake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("6XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2015 a 2016")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/kaby-lake.html"}},[t._v("Kaby Lake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("7XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2017")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/coffee-lake.html"}},[t._v("Coffee Lake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("8XXX-9XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2017 a 2019")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config.plist/comet-lake.html"}},[t._v("Comet Lake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("10XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2020")])])])]),t._v(" "),i("h3",{attrs:{id:"notebook-intel"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#notebook-intel"}},[t._v("#")]),t._v(" Notebook Intel")]),t._v(" "),i("table",[i("thead",[i("tr",[i("th",{staticStyle:{"text-align":"left"}},[t._v("Codenome")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Série")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Período")])])]),t._v(" "),i("tbody",[i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/arrandale.html"}},[t._v("Clarksfield e Arrandale")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("3XX-9XX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2010")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/sandy-bridge.html"}},[t._v("Sandy Bridge")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2011")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/ivy-bridge.html"}},[t._v("Ivy Bridge")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("3XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2012")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/haswell.html"}},[t._v("Haswell")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("4XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2013 a 2014")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/broadwell.html"}},[t._v("Broadwell")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("5XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2014 a 2015")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/skylake.html"}},[t._v("Skylake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("6XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2015 a 2016")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/kaby-lake.html"}},[t._v("Kaby Lake e Amber Lake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("7XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2017")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/coffee-lake.html"}},[t._v("Coffee Lake e Whiskey Lake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("8XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2017 a 2018")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/coffee-lake-plus.html"}},[t._v("Coffee Lake Plus e Comet Lake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("9XXX-10XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2019 a 2020")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-laptop.plist/icelake.html"}},[t._v("Ice Lake")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("10XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2019 a 2020")])])])]),t._v(" "),i("h3",{attrs:{id:"intel-hedt-desktop-de-alta-performance"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#intel-hedt-desktop-de-alta-performance"}},[t._v("#")]),t._v(" Intel HEDT (Desktop de Alta Performance)")]),t._v(" "),i("p",[t._v("Essa seção inclui tanto hardware de entusiastas quando de servidores.")]),t._v(" "),i("table",[i("thead",[i("tr",[i("th",{staticStyle:{"text-align":"left"}},[t._v("Codenome")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Série")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Período")])])]),t._v(" "),i("tbody",[i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-HEDT/nehalem.html"}},[t._v("Nehalem e Westmere")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("9XX, X3XXX, X5XXX, "),i("a",{attrs:{href:"https://en.wikipedia.org/wiki/Nehalem_(microarchitecture)",target:"_blank",rel:"noopener noreferrer"}},[t._v("Info 1"),i("OutboundLink")],1),t._v(", "),i("a",{attrs:{href:"https://en.wikipedia.org/wiki/Westmere_(microarchitecture)",target:"_blank",rel:"noopener noreferrer"}},[t._v("Info 2"),i("OutboundLink")],1)]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2008 a 2010")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-HEDT/ivy-bridge-e.html"}},[t._v("Sandy/Ivy Bridge-E")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("3XXX, 4XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2011 a 2013")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-HEDT/haswell-e.html"}},[t._v("Haswell-E")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("5XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2014")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-HEDT/broadwell-e.html"}},[t._v("Broadwell-E")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("6XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2016")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/config-HEDT/skylake-x.html"}},[t._v("Skylake/Cascade Lake-X/W")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("7XXX, 9XXX, 10XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2017 a 2019")])])])]),t._v(" "),i("h3",{attrs:{id:"amd"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#amd"}},[t._v("#")]),t._v(" AMD")]),t._v(" "),i("table",[i("thead",[i("tr",[i("th",{staticStyle:{"text-align":"left"}},[t._v("Codenome")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Série")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Período")])])]),t._v(" "),i("tbody",[i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/AMD/fx.html"}},[t._v("Bulldozer/Jaguar")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[i("a",{attrs:{href:"https://en.wikipedia.org/wiki/List_of_AMD_processors#Bulldozer_architecture;_Bulldozer,_Piledriver,_Steamroller,_Excavator_(2011%E2%80%932017)",target:"_blank",rel:"noopener noreferrer"}},[t._v("É bem estranho."),i("OutboundLink")],1)]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[i("a",{attrs:{href:"https://en.wikipedia.org/wiki/List_of_AMD_processors#Bulldozer_architecture;_Bulldozer,_Piledriver,_Steamroller,_Excavator_(2011%E2%80%932017)",target:"_blank",rel:"noopener noreferrer"}},[t._v("A AMD era bem ruim com nomes na época"),i("OutboundLink")],1)])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[i("RouterLink",{attrs:{to:"/AMD/zen.html"}},[t._v("Zen")])],1),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("1XXX, 2XXX, 3XXX, 5XXX")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("2017 a 2020")])])])]),t._v(" "),i("ul",[i("li",[t._v("Observação: "),i("s",[t._v("3ª Geração de Threadripper (39XX) não é suportada. 1ª e 2ª gerações, no entanto, são suportadas.")]),t._v(" "),i("ul",[i("li",[t._v("As últimas versões de BIOS e do OpenCore corrigiram esse problema. Todos as plataformas Threadripper são suportadas agora.")])])])])])}),[],!1,null,null,null);e.default=r.exports}}]);