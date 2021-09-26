(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{366:function(e,a,o){e.exports=o.p+"assets/img/populated-efi.8d46cc52.png"},544:function(e,a,o){e.exports=o.p+"assets/img/ia32-x64.aa5dccd9.png"},545:function(e,a,o){e.exports=o.p+"assets/img/efi-moved.87262fda.png"},546:function(e,a,o){e.exports=o.p+"assets/img/base-efi.7500e22d.png"},547:function(e,a,o){e.exports=o.p+"assets/img/clean-efi.10fb2a26.png"},674:function(e,a,o){"use strict";o.r(a);var t=o(29),s=Object(t.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"adicionado-os-arquivos-base-do-opencore"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adicionado-os-arquivos-base-do-opencore"}},[e._v("#")]),e._v(" Adicionado os Arquivos Base do OpenCore")]),e._v(" "),t("p",[e._v("Para configurar a estrutura da pasta do OpenCore, será necessário baixar a pasta EFI encontrada na página "),t("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Lançamentos do OpenCorePkg"),t("OutboundLink")],1),e._v(". Observe que tudo estará dentro da pasta IA32 ou dentro da pasta X64, a primeira sendo necessária para firmwares 32 bits e a última para firmwares 64 bits.")]),e._v(" "),t("p",[t("img",{attrs:{src:o(544),alt:""}})]),e._v(" "),t("p",[e._v("Sobre as versões DEBUG e RELEASE:")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("DEBUG")]),e._v(": ajuda muito a resolver bugs, mas adiciona atrasos notáveis na inicialização (isto é, de 3 a 5 segundos para chegar no seletor). Uma vez instalado, é fácil mudar para a versão RELEASE.")]),e._v(" "),t("li",[t("strong",[e._v("RELEASE")]),e._v(": Inicialização muito mais rápida, mas não oferece basicamente nenhuma informação de DEBUG, o que torna a solução de problemas muito mais difícil.")])]),e._v(" "),t("p",[e._v("E uma vez baixado, coloque a pasta EFI (do OpenCorePkg) na raiz da partição EFI:")]),e._v(" "),t("p",[t("img",{attrs:{src:o(545),alt:""}})]),e._v(" "),t("p",[t("strong",[e._v("Observação")]),e._v(":")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Usuários de Windows:")]),e._v(" coloque a pasta EFI na raiz do pendrive de boot criado anteriormente.")]),e._v(" "),t("li",[t("strong",[e._v("Usuários de Linux:")]),e._v(" usar a partição "),t("code",[e._v("OPENCORE")]),e._v(" criada anteriormente.\n"),t("ul",[t("li",[e._v("Observe que o método 1 somente cria uma partição, enquanto que o método 2 cria duas partições.")])])])]),e._v(" "),t("p",[e._v("Agora, abra a pasta EFI e veja o que há dentro dela:")]),e._v(" "),t("p",[t("img",{attrs:{src:o(546),alt:"Pasta EFI de base"}})]),e._v(" "),t("p",[e._v("Algo notável logo de cara é que ela vem com vários arquivos nas pastas "),t("code",[e._v("Drivers")]),e._v(" e "),t("code",[e._v("Tools")]),e._v(". A maioria não será necessária:")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Mantenha somente os seguintes arquivos na pasta Drivers")]),e._v(" (se houver):")])]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"left"}},[e._v("Driver")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Status")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Descrição")])])]),e._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("OpenUsbKbDxe.efi")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"},attrs:{rowspan:"2"}},[t("span",{staticStyle:{color:"#30BCD5"}},[e._v(" Opcional ")])]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Necessário para sistemas não UEFI (anteriores a 2012)")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("OpenPartitionDxe.efi")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Necessário para iniciar a partição de Recuperação do OS X 10.7 Lion e do 10.9 Mavericks.")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("OpenRuntime.efi")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("span",{staticStyle:{color:"red"}},[e._v(" Necessário ")])]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Necessário para o funcionamento normal.")])])])]),e._v(" "),t("details",{staticClass:"custom-block details"},[t("summary",[e._v("Mais informações sobre os drivers fornecidos")]),e._v(" "),t("ul",[t("li",[e._v("AudioDxe.efi\n"),t("ul",[t("li",[e._v("Não tem nada a ver com suporte de áudio no macOS.")])])]),e._v(" "),t("li",[e._v("CrScreenshotDxe.efi\n"),t("ul",[t("li",[e._v("Usado para conseguir capturas de tela na UEFI. Desnecessário para este guia.")])])]),e._v(" "),t("li",[e._v("HiiDatabase.efi\n"),t("ul",[t("li",[e._v("Usado para corrigir a interface gráfica (como o OpenShell.efi) em CPUs Sandy Bridge ou mais antigas.")]),e._v(" "),t("li",[e._v("Não é usado para dar boot.")])])]),e._v(" "),t("li",[e._v("NvmExpressDxe.efi\n"),t("ul",[t("li",[e._v("Usado em CPUs Haswell ou mais antigas quando não há um driver NVMe integrado no firmware.")]),e._v(" "),t("li",[e._v("Não use a não ser que saiba o que está fazendo.")])])]),e._v(" "),t("li",[e._v("OpenCanopy.efi\n"),t("ul",[t("li",[e._v("É a interface gráfica opcional do OpenCore. Como configurá-lo será abordado no guia de "),t("a",{attrs:{href:"https://dortania.github.io/OpenCore-Post-Install/cosmetic/gui.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("pós-instalação"),t("OutboundLink")],1),e._v(", portanto, remova-o por enquanto.")])])]),e._v(" "),t("li",[e._v("OpenHfsPlus.efi\n"),t("ul",[t("li",[e._v("Versões de código aberto do driver de HFS+. Meio lento. Recomenda-se não utilizá-lo a não ser que saiba o que está fazendo.")])])]),e._v(" "),t("li",[e._v("OpenPartitionDxe.efi\n"),t("ul",[t("li",[e._v("Necessários para iniciar a partição de Recuperação do OS X 10.7 Lion ao 10.9 Mavericks.\n"),t("ul",[t("li",[e._v("Observação: Usuários do OpenDuet (isto é, aqueles que não tem UEFI), já terão este driver integrado, o que torna sua instalação desnecessária.")])])])])]),e._v(" "),t("li",[e._v("OpenUsbKbDxe.efi\n"),t("ul",[t("li",[e._v("Usado para o seletor do OpenCore em "),t("strong",[e._v("computadores antigos que usam o DuetPkg")]),e._v(". "),t("a",{attrs:{href:"https://applelife.ru/threads/opencore-obsuzhdenie-i-ustanovka.2944066/page-176#post-856653",target:"_blank",rel:"noopener noreferrer"}},[e._v("Não recomendado e até mesmo perigoso em computadores com CPUs Ivy Bridge ou mais novas"),t("OutboundLink")],1),e._v(".")])])]),e._v(" "),t("li",[e._v("Ps2KeyboardDxe.efi + Ps2MouseDxe.efi\n"),t("ul",[t("li",[e._v("Auto-explicativo. Usuários de teclado e mouse USB não precisam desses drivers.")]),e._v(" "),t("li",[e._v("Lembre-se: PS2 ≠ USB.")])])]),e._v(" "),t("li",[e._v("UsbMouseDxe.efi\n"),t("ul",[t("li",[e._v("Ideia similar ao OpenUsbKbDxe. Só deve ser necessário em computadores antigos que usam o DuetPkg.")])])]),e._v(" "),t("li",[e._v("XhciDxe.efi\nUsado para computadores com CPUs Sandy Bridge ou mais antigas, nas quais não há um driver de XHCI integrado ao firmware.\n"),t("ul",[t("li",[e._v("Só é necessário se estiver usando uma placa de expansão USB 3.0 em um computador mais antigo.")])])])])]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Mantenha os seguintes arquivos na pasta Tools:")])])]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"left"}},[e._v("Ferramenta")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Status")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Descrição")])])]),e._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("OpenShell.efi")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("span",{staticStyle:{color:"#30BCD5"}},[e._v(" Opcional ")])]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[e._v("Recomendado pois facilita o "),t("em",[e._v("debugging")]),e._v(".")])])])]),e._v(" "),t("p",[e._v("Uma pasta EFI limpa:")]),e._v(" "),t("p",[t("img",{attrs:{src:o(547),alt:"EFI Limpa"}})]),e._v(" "),t("p",[e._v("Agora, adicione os "),t("strong",[e._v("seus")]),e._v(" drivers (.efi) de firmware necessários dentro da pasta "),t("em",[e._v("Drivers")]),e._v(" e as Kexts/tabelas ACPI em suas respectivas pastas. Veja "),t("RouterLink",{attrs:{to:"/ktext.html"}},[e._v("Juntando os Arquivos")]),e._v(" para mais informações sobre quais arquivos é preciso usar.")],1),e._v(" "),t("ul",[t("li",[e._v("Por favor, observe que os drivers UEFI do Clover não são suportados no OpenCore! EmuVariableUEFI, AptioMemoryFix, OsxAptioFixDrv, entre outros. Por favor, leia o guia "),t("a",{attrs:{href:"https://github.com/dortania/OpenCore-Install-Guide/blob/master/clover-conversion/clover-efi.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Convertendo os drivers de firmware do Clover"),t("OutboundLink")],1),e._v(" para mais informações sobre drivers suportados e sobre quais já foram integrados ao OpenCore.")])]),e._v(" "),t("p",[e._v("Veja um exemplo de como uma pasta EFI preenchida "),t("em",[t("strong",[e._v("pode")])]),e._v(" parecer (a sua certamente será diferente):")]),e._v(" "),t("p",[t("img",{attrs:{src:o(366),alt:"Pasta EFI Preenchida"}})]),e._v(" "),t("p",[t("strong",[e._v("Lembrete")]),e._v(":")]),e._v(" "),t("ul",[t("li",[e._v("SSDTs e DSDTs personalizadas ("),t("code",[e._v(".aml")]),e._v(") vão na pasta ACPI.")]),e._v(" "),t("li",[e._v("As kexts ("),t("code",[e._v(".kext")]),e._v(") vão na pasta Kexts")]),e._v(" "),t("li",[e._v("Drivers de firmware ("),t("code",[e._v(".efi")]),e._v(") vão na pasta Drivers.")])]),e._v(" "),t("h2",{attrs:{id:"finalizando"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#finalizando"}},[e._v("#")]),e._v(" Finalizando")]),e._v(" "),t("p",[e._v("Depois de tudo terminado, acesse o guia "),t("RouterLink",{attrs:{to:"/ktext.html"}},[e._v("Juntando os Arquivos")]),e._v(" e obtenha as kexts e os drivers de firmware necessários para continuar com a configuração do OpenCore.")],1)])}),[],!1,null,null,null);a.default=s.exports}}]);