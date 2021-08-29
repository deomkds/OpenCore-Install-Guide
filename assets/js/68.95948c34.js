(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{623:function(e,t,a){"use strict";a.r(t);var l=a(28),v=Object(l.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"convertendo-patches-comuns-de-kexts-e-de-kernel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#convertendo-patches-comuns-de-kexts-e-de-kernel"}},[e._v("#")]),e._v(" Convertendo Patches Comuns de Kexts e de Kernel")]),e._v(" "),a("h2",{attrs:{id:"convertendo-um-patch-manualmente"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#convertendo-um-patch-manualmente"}},[e._v("#")]),e._v(" Convertendo um Patch Manualmente")]),e._v(" "),a("p",[e._v("Ao converter um patch de kext/kernal para o OpenCore, será necessário observar o seguinte:")]),e._v(" "),a("ul",[a("li",[e._v("Não existe paridade para o recurso "),a("code",[e._v("InfoPlistPatch")]),e._v(".")]),e._v(" "),a("li",[e._v("O equivalente da opção "),a("code",[e._v("MatchOS")]),e._v(" são as opções "),a("code",[e._v("MinKernel")]),e._v(" e "),a("code",[e._v("MaxKernel")]),e._v(".")]),e._v(" "),a("li",[e._v("Os dois tipos de patches ("),a("em",[e._v("kext")]),e._v(" e kernel) são inseridos no caminho "),a("code",[e._v("Kernel -> Patch")]),e._v(". Para informar se o patch é de kernel ou de uma "),a("em",[e._v("kext")]),e._v(" específica, utilize a opção "),a("code",[e._v("Identifier")]),e._v(".")])]),e._v(" "),a("p",[e._v("Observe o exemplo:")]),e._v(" "),a("p",[a("strong",[e._v("KernelToPatch (Clover)")]),e._v(":")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[e._v("Chave")]),e._v(" "),a("th",{staticStyle:{"text-align":"left"}},[e._v("Tipo")]),e._v(" "),a("th",{staticStyle:{"text-align":"left"}},[e._v("Valor")])])]),e._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Comment")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("String")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("cpuid_set_cpufamily - forca CPUFAMILY_INTEL_PENRYN")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Disabled")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Boolean")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("False")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("MatchBuild")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("String")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("18G95,18G103")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("MatchOS")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("String")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("10.14.6")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Find")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Data")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("31db803d4869980006755c")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Replace")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Data")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("bbbc4fea78e95d00000090")])])])]),e._v(" "),a("p",[e._v("No OpenCore, as opções são:")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("Comment")]),e._v(": Disponível tanto no Clover quanto no OpenCore.")]),e._v(" "),a("li",[a("code",[e._v("Disabled")]),e._v(": No OpenCore, use "),a("code",[e._v("Enabled")]),e._v(".")]),e._v(" "),a("li",[a("code",[e._v("MatchBuild")]),e._v(": No OpenCore, use "),a("code",[e._v("MinKernel")]),e._v(" e "),a("code",[e._v("MaxKernel")]),e._v(". Veja abaixo para mais informações.")]),e._v(" "),a("li",[a("code",[e._v("MatchOS")]),e._v(": No OpenCore, use "),a("code",[e._v("MinKernel")]),e._v(" e "),a("code",[e._v("MaxKernel")]),e._v(". Veja abaixo para mais informações.")]),e._v(" "),a("li",[a("code",[e._v("Find")]),e._v(": Disponível tanto no Clover quanto no OpenCore.")]),e._v(" "),a("li",[a("code",[e._v("Replace")]),e._v(": Disponível tanto no Clover quanto no OpenCore.")]),e._v(" "),a("li",[a("code",[e._v("MaskFind")]),e._v(": No OpenCore, use "),a("code",[e._v("Mask")]),e._v(".")]),e._v(" "),a("li",[a("code",[e._v("MaskReplace")]),e._v(": Disponível tanto no Clover quanto no OpenCore.")])]),e._v(" "),a("p",[e._v("Então, o patch anterior ficaria dessa forma:")]),e._v(" "),a("p",[a("strong",[e._v("Kernel -> Patch (OpenCore)")]),e._v(":")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[e._v("Chave")]),e._v(" "),a("th",{staticStyle:{"text-align":"left"}},[e._v("Tipo")]),e._v(" "),a("th",{staticStyle:{"text-align":"left"}},[e._v("Valor")])])]),e._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Comment")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("String")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("cpuid_set_cpufamily - força CPUFAMILY_INTEL_PENRYN")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Enabled")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Boolean")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("True")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("MinKernel")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("String")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("18.7.0")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("MaxKernel")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("String")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("18.7.0")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Find")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Data")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("31db803d4869980006755c")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Replace")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Data")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("bbbc4fea78e95d00000090")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Identifier")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("String")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("kernel")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Limit")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Number")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("0")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Count")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Number")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("0")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Skip")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Number")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("0")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("Mask")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Data")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}})]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("ReplaceMask")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Data")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}})])])]),e._v(" "),a("p",[e._v("Nas opções "),a("code",[e._v("MinKernel")]),e._v(" e "),a("code",[e._v("MaxKernel")]),e._v(", utilize o link a seguir para ver os valores possíveis. A versão 18G95 possui um kernel cuja versão é "),a("code",[e._v("18.7.0")]),e._v(" e a 18G103, "),a("code",[e._v("18.7.0")]),e._v(" também. Note que ambas as versões utilizam o mesmo kernel.")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://en.wikipedia.org/wiki/MacOS_Mojave#Release_history",target:"_blank",rel:"noopener noreferrer"}},[e._v("macOS Mojave: Release history"),a("OutboundLink")],1),e._v(" (em inglês).")])]),e._v(" "),a("p",[e._v("Defina a opção "),a("code",[e._v("Identifier")]),e._v(" como "),a("code",[e._v("kernel")]),e._v(" ou a "),a("em",[e._v("kext")]),e._v(" que deseja aplicar o patch (ex.: "),a("code",[e._v("com.apple.iokit.IOGraphicsFamily")]),e._v(").")]),e._v(" "),a("p",[e._v("Quanto as opções "),a("code",[e._v("Limit")]),e._v(", "),a("code",[e._v("Count")]),e._v(" e "),a("code",[e._v("Skip")]),e._v(", elas são configuradas para "),a("code",[e._v("0")]),e._v(" de forma que serão aplicadas a todas as instâncias. As opções "),a("code",[e._v("Mask")]),e._v(" e "),a("code",[e._v("ReplaceMask")]),e._v(" podem ser deixadas vazias pois o Clover não suporta máscaras (até bem recentemente, mas isso não será abordado aqui).")]),e._v(" "),a("h2",{attrs:{id:"patches-comuns-no-opencore-e-cia"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#patches-comuns-no-opencore-e-cia"}},[e._v("#")]),e._v(" Patches Comuns no OpenCore e Cia")]),e._v(" "),a("p",[e._v("Uma breve seção que menciona os patches de "),a("em",[e._v("kexts")]),e._v(" e de kernel que foram absorvidas pelo OpenCore ou por outras "),a("em",[e._v("kexts")]),e._v(". Essa lista não está copmpleta e qualquer outro patch que tenha sido deixado de fora pode ser incluída por meio da abertura de um novo "),a("a",{attrs:{href:"https://github.com/deomkds/OpenCore-Vanilla-Desktop-Guide/issues",target:"_blank",rel:"noopener noreferrer"}},[e._v("issue"),a("OutboundLink")],1),e._v(". Toda ajuda é bem-vinda!")]),e._v(" "),a("h3",{attrs:{id:"patches-de-kernel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#patches-de-kernel"}},[e._v("#")]),e._v(" Patches de Kernel")]),e._v(" "),a("p",[e._v("Para obter uma lista completa dos patches suportados pelo OpenCore, veja o arquivo "),a("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/blob/master/Library/OcAppleKernelLib/CommonPatches.c",target:"_blank",rel:"noopener noreferrer"}},[e._v("/Library/OcAppleKernelLib/CommonPatches.c"),a("OutboundLink")],1),e._v(" (em inglês).")]),e._v(" "),a("p",[a("strong",[e._v("Patches Gerais")]),e._v(":")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("MSR 0xE2 _xcpm_idle instant reboot")]),e._v(" © Pike R. Alpha\n"),a("ul",[a("li",[a("code",[e._v("Kernel -> Quirks -> AppleXcpmCfgLock")])])])])]),e._v(" "),a("p",[a("strong",[e._v("Patches específicos de HEDT")]),e._v(":")]),e._v(" "),a("p",[e._v("Todos os patches a seguir podem ser encontrados no caminho "),a("code",[e._v("Kernel -> Quirk -> AppleXcpmExtraMsrs")]),e._v(" na "),a("code",[e._v("config.plist")]),e._v(".")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("_xcpm_bootstrap")]),e._v(" por Pike R. Alpha")]),e._v(" "),a("li",[a("code",[e._v("xcpm_pkg_scope_msrs")]),e._v(" por Pike R. Alpha")]),e._v(" "),a("li",[a("code",[e._v("_xcpm_SMT_scope_msrs")]),e._v(" Patch nº 1 por Pike R. Alpha")]),e._v(" "),a("li",[a("code",[e._v("_xcpm_SMT_scope_msrs")]),e._v(" Patch nº 2 por Pike R. Alpha")]),e._v(" "),a("li",[a("code",[e._v("_xcpm_core_scope_msrs")]),e._v(" por Pike R. Alpha")]),e._v(" "),a("li",[a("code",[e._v("_xcpm_ performance_patch")]),e._v(" por Pike R. Alpha")]),e._v(" "),a("li",[e._v("Patches de MSR xcpm nº 1 e nº 2 por Pike R. Alpha")]),e._v(" "),a("li",[a("code",[e._v("/0x82D390/MSR_PP0_POLICY 0x63a xcpm support")]),e._v(" patches nº 1 e nº 2 por Pike R. Alpha")])]),e._v(" "),a("h3",{attrs:{id:"patches-de-kexts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#patches-de-kexts"}},[e._v("#")]),e._v(" Patches de Kexts")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("Disable Panic Kext logging")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("Kernel -> Quirks -> PanicNoKextDump")])])])]),e._v(" "),a("li",[e._v("Patch 1 de Ícone de Unidade Externa para AppleAHCIPort\n"),a("ul",[a("li",[a("code",[e._v("Kernel -> Quirks -> ExternalDiskIcons")])])])]),e._v(" "),a("li",[e._v("Ativador do TRIM em SSD\n"),a("ul",[a("li",[a("code",[e._v("Kernel -> Quirks -> ThirdPartyDrives")])])])]),e._v(" "),a("li",[e._v("Limite de portas USB\n"),a("ul",[a("li",[a("code",[e._v("Kernel -> Quirks -> XhciPortLimit")])])])]),e._v(" "),a("li",[e._v("Patch de DP/HDMI por FredWst\n"),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/acidanthera/AppleALC/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("AppleALC"),a("OutboundLink")],1),e._v(" + "),a("a",{attrs:{href:"https://github.com/acidanthera/whatevergreen/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("WhateverGreen"),a("OutboundLink")],1)])])]),e._v(" "),a("li",[e._v("Patch para IOPCIFamily\n"),a("ul",[a("li",[a("code",[e._v("Kernel -> Quirks -> IncreasePciBarSize")])])])]),e._v(" "),a("li",[e._v("Desativar a verificação de board-ID\n"),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/acidanthera/whatevergreen/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("WhateverGreen"),a("OutboundLink")],1)])])]),e._v(" "),a("li",[e._v("Patch de AppleHDA\n"),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/acidanthera/AppleALC/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("AppleALC"),a("OutboundLink")],1)])])]),e._v(" "),a("li",[e._v("Patches de IONVMe\n"),a("ul",[a("li",[e._v("Desnecessário a partir do macOS 10.13 High Sierra.")]),e._v(" "),a("li",[e._v("Para o gerenciamento de energia no macOS 10.14 Mojave ou mais novo: "),a("a",{attrs:{href:"https://github.com/acidanthera/NVMeFix/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("NVMeFix"),a("OutboundLink")],1),e._v(".")])])])])])}),[],!1,null,null,null);t.default=v.exports}}]);