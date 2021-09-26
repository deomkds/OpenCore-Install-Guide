(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{370:function(e,o,a){e.exports=a.p+"assets/img/macrecovery.af5c41c1.png"},371:function(e,o,a){e.exports=a.p+"assets/img/download-done.05d30da0.png"},396:function(e,o,a){e.exports=a.p+"assets/img/unknown-13.2dca606f.png"},514:function(e,o,a){e.exports=a.p+"assets/img/unknown-5.0cee0d3a.png"},515:function(e,o,a){e.exports=a.p+"assets/img/unknown-6.c65407b2.png"},516:function(e,o,a){e.exports=a.p+"assets/img/unknown-8.21d65816.png"},517:function(e,o,a){e.exports=a.p+"assets/img/unknown-9.d7a601da.png"},518:function(e,o,a){e.exports=a.p+"assets/img/unknown-11.0cee0d3a.png"},519:function(e,o,a){e.exports=a.p+"assets/img/unknown-12.c65407b2.png"},520:function(e,o,a){e.exports=a.p+"assets/img/unknown-14.21d65816.png"},521:function(e,o,a){e.exports=a.p+"assets/img/unknown-15.4ec42b10.png"},522:function(e,o,a){e.exports=a.p+"assets/img/unknown-16.a34cfc74.png"},523:function(e,o,a){e.exports=a.p+"assets/img/unknown-17.d7a601da.png"},524:function(e,o,a){e.exports=a.p+"assets/img/unknown-18.4d8a1388.png"},525:function(e,o,a){e.exports=a.p+"assets/img/unknown-20.7e0e5028.png"},526:function(e,o,a){e.exports=a.p+"assets/img/unknown-21.04611101.png"},669:function(e,o,a){"use strict";a.r(o);var r=a(29),s=Object(r.a)({},(function(){var e=this,o=e.$createElement,r=e._self._c||o;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"criando-o-instalador-no-linux"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#criando-o-instalador-no-linux"}},[e._v("#")]),e._v(" Criando o Instalador no Linux")]),e._v(" "),r("p",[e._v("Embora não seja necessário ter uma instalação zerada para usar o OpenCore, alguns usuários preferem ter um sistema limpo ao atualizar seus gerenciadores de boot.")]),e._v(" "),r("p",[e._v("Para começar, tenha em mãos:")]),e._v(" "),r("ul",[r("li",[e._v("Pendrive de 4GB")]),e._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("macrecovery.py"),r("OutboundLink")],1)])]),e._v(" "),r("h2",{attrs:{id:"baixando-o-macos"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#baixando-o-macos"}},[e._v("#")]),e._v(" Baixando o macOS")]),e._v(" "),r("p",[e._v("Para iniciar, use o comando "),r("code",[e._v("cd")]),e._v(" para acessar a pasta do "),r("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("macrecovery"),r("OutboundLink")],1),e._v(" e execute um dos comandos abaixo:")]),e._v(" "),r("p",[r("img",{attrs:{src:a(370),alt:""}})]),e._v(" "),r("div",{staticClass:"language-sh extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sh"}},[r("code",[r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Ajuste o seguinte comando para a pasta correta")]),e._v("\n"),r("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" ~/Downloads/OpenCore-0/Utilities/macrecovery/\n")])])]),r("p",[e._v("Depois, execute um dos seguintes comandos dependendo do sistema que deseja iniciar:")]),e._v(" "),r("div",{staticClass:"language-sh extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sh"}},[r("code",[r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# OS X 10.7 Lion:")]),e._v("\npython ./macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download\npython ./macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# OS X 10.8 Mountain Lion:")]),e._v("\npython ./macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# OS X 10.9 Mavericks:")]),e._v("\npython ./macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# OS X 10.10 Yosemite:")]),e._v("\npython ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# OS X 10.11 El Capitan:")]),e._v("\npython ./macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# macOS 10.12 Sierra:")]),e._v("\npython ./macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# macOS 10.13 High Sierra:")]),e._v("\npython ./macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download\npython ./macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# macOS 10.14 Mojave:")]),e._v("\npython ./macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# macOS 10.15 Catalina")]),e._v("\npython ./macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Versão mais recente")]),e._v("\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# macOS 11 Big Sur")]),e._v("\npython ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download\n")])])]),r("p",[e._v("A partir daqui, execute um desses comandos numa janela do Terminal e, quando terminado, aparecerá uma mensagem similar a esta:")]),e._v(" "),r("p",[r("img",{attrs:{src:a(371),alt:""}})]),e._v(" "),r("ul",[r("li",[r("p",[r("strong",[e._v("Observação")]),e._v(": dependendo do sistema operacional, o script baixará um arquivo chamado "),r("code",[e._v("BaseSystem")]),e._v(" ou um chamado "),r("code",[e._v("RecoveryImage")]),e._v(". Ambos agem da mesma forma, então quando este guia fizer referência a "),r("code",[e._v("BaseSystem")]),e._v(", a informação também se aplica ao "),r("code",[e._v("RecoveryImage")]),e._v(".")])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Observação sobre o macOS 11 Big Sur")]),e._v(": como essa versão é nova, ainda há problemas a serem resolvidos com sertos sistemas. Para mais informações, acesse: "),r("RouterLink",{attrs:{to:"/extras/big-sur/"}},[e._v("OpenCore e o macOS 11 Big Sur")]),e._v(".")],1),e._v(" "),r("ul",[r("li",[e._v("Para usuários de primeira viagem, recomenda-se usar o macOS 10.15 Catalina.")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Observação sobre GPUs Nvidia")]),e._v(": Lembre-se de verificar se sua placa suporta as versões mais recentes do sistema operaciona. Para isso, leia as "),r("RouterLink",{attrs:{to:"/macos-limits.html"}},[e._v("Limitações de Hardware")]),e._v(".")],1)])]),e._v(" "),r("h2",{attrs:{id:"criando-o-instalador"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#criando-o-instalador"}},[e._v("#")]),e._v(" Criando o Instalador")]),e._v(" "),r("p",[e._v("Esta seção focará na forma de fazer as partições necessárioas no dispositivo USB. Fique à vontade para usar seu programa preferido, seja o "),r("code",[e._v("gdisk")]),e._v(", o "),r("code",[e._v("fdisk")]),e._v(", o "),r("code",[e._v("parted")]),e._v(", o "),r("code",[e._v("gparted")]),e._v(" ou o "),r("code",[e._v("gnome-disks")]),e._v(". Este guia focará no "),r("code",[e._v("gdisk")]),e._v(" por ser daorinha e permitir mudar o tipo de partição no futuro, o que será necessário para fazer a partição de Recuperação do macOS iniciar. A distro usada neste guia foi o Ubuntu 18.04, mas outras versões também servem.")]),e._v(" "),r("p",[e._v("Créditos ao "),r("a",{attrs:{href:"https://github.com/midi1996",target:"_blank",rel:"noopener noreferrer"}},[e._v("midi1996"),r("OutboundLink")],1),e._v(" pelo seu trabalho no "),r("a",{attrs:{href:"https://midi1996.github.io/hackintosh-internet-install-gitbook/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Guia de Instalador Online"),r("OutboundLink")],1),e._v(" (em inglês), no qual este guia foi baseado.")]),e._v(" "),r("h3",{attrs:{id:"metodo-1"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#metodo-1"}},[e._v("#")]),e._v(" Método 1")]),e._v(" "),r("p",[e._v("No Terminal:")]),e._v(" "),r("ol",[r("li",[e._v("Execute "),r("code",[e._v("lsblk")]),e._v(" e determine o bloco do seu dispositivo USB.\n"),r("img",{attrs:{src:a(514),alt:"lsblk"}})]),e._v(" "),r("li",[e._v("Execute "),r("code",[e._v("sudo gdisk /dev/<bloco do seu dispositivo USB>")]),e._v(".\n"),r("ol",[r("li",[e._v("Se perguntado qual tabela de partição usar, selecione GPT.\n"),r("img",{attrs:{src:a(515),alt:"Selecione GPT"}})]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("p")]),e._v(" para exibir as partições do bloco (e checar se é a que você procura).\n"),r("img",{attrs:{src:a(396),alt:""}})]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("o")]),e._v(" para limpar a tabela de partição e crie uma nova em GPT (se houver).\n"),r("ol",[r("li",[e._v("Confirme apertando "),r("code",[e._v("y")]),e._v(".\n"),r("img",{attrs:{src:a(516),alt:""}})])])]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("n")]),e._v(".\n"),r("ol",[r("li",[r("code",[e._v("partition number")]),e._v(": Deixe em branco para usar o valor padrão.")]),e._v(" "),r("li",[r("code",[e._v("first sector")]),e._v(": Deixe em branco para usar o valor padrão.")]),e._v(" "),r("li",[r("code",[e._v("last sector")]),e._v(": Deixe em branco para usar o disco todo.")]),e._v(" "),r("li",[r("code",[e._v("Hex code or GUID")]),e._v(": "),r("code",[e._v("0700")]),e._v(" para definir o tipo de partição como Microsoft Basic Data.")])])]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("w")]),e._v(".\n"),r("ul",[r("li",[e._v("Confirme apertando "),r("code",[e._v("y")]),e._v(".\n"),r("img",{attrs:{src:a(517),alt:""}})]),e._v(" "),r("li",[e._v("Em alguns casos, um reboot é necessário, mas é raro. Se quiser ter certeza, reinicie seu computador. Você também pode tentar reconectar seu pendrive.")])])]),e._v(" "),r("li",[e._v("Feche o "),r("code",[e._v("gdisk")]),e._v(" apertando "),r("code",[e._v("q")]),e._v(" (normalmente ele fecha sozinho).")])])]),e._v(" "),r("li",[e._v("Use o "),r("code",[e._v("lsblk")]),e._v(" para determinar os identificadores da partição.")]),e._v(" "),r("li",[e._v("Execute "),r("code",[e._v('sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<bloco da partição no dispositivo USB>')]),e._v(" para formatar seu pendrive em FAT32 usando o nome OPENCORE.")]),e._v(" "),r("li",[e._v("Então execute "),r("code",[e._v("cd")]),e._v(" para acessar o diretório "),r("code",[e._v("/OpenCore/Utilities/macrecovery/")]),e._v(" e deve encontrar uma "),r("code",[e._v(".dmg")]),e._v(" e um arquivo "),r("code",[e._v(".chunklist")]),e._v(".\n"),r("ol",[r("li",[e._v("Monte a partição do pendrive com o "),r("code",[e._v("udisksctl")]),e._v(" ("),r("code",[e._v("udisksctl mount -b /dev/<bloco da partição no dispositivo USB>")]),e._v(", não precisa de sudo na maioria dos casos) ou com o "),r("code",[e._v("mount")]),e._v(" ("),r("code",[e._v("sudo mount /dev/<bloco da partição no dispositivo USB> /onde/você/monta/partições")]),e._v(", o sudo é necessário).")]),e._v(" "),r("li",[e._v("Execute o "),r("code",[e._v("cd")]),e._v(" para acessar o seu pendrive e crie uma pasta com o "),r("code",[e._v("mkdir com.apple.recovery.boot")]),e._v(" na raiz da partição FAT32 do pendrive.")]),e._v(" "),r("li",[e._v("Agora use o comando "),r("code",[e._v("cp")]),e._v(" ou o comando "),r("code",[e._v("rsync")]),e._v(" para copiar tanto a "),r("code",[e._v("BaseSystem.dmg")]),e._v(" quanto o arquivo "),r("code",[e._v("BaseSystem.chunklist")]),e._v(" para dentro da pasta "),r("code",[e._v("com.apple.recovery.boot")]),e._v(".")])])])]),e._v(" "),r("h3",{attrs:{id:"metodo-2-caso-o-primeiro-nao-funcione"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#metodo-2-caso-o-primeiro-nao-funcione"}},[e._v("#")]),e._v(" Método 2 (caso o primeiro não funcione)")]),e._v(" "),r("p",[e._v("No Terminal:")]),e._v(" "),r("ol",[r("li",[e._v("Execute o "),r("code",[e._v("lsblk")]),e._v(" e determine o bloco do seu dispositivo USB.\n"),r("img",{attrs:{src:a(518),alt:""}})]),e._v(" "),r("li",[e._v("Execute "),r("code",[e._v("sudo gdisk /dev/<bloco do seu dispositivo USB>")]),e._v(" "),r("ol",[r("li",[e._v("Se perguntado qual tabela de partição usar, selecione GPT.\n"),r("img",{attrs:{src:a(519),alt:""}})]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("p")]),e._v(" para exibir as partições do bloco (e checar se é a que você procura).\n"),r("img",{attrs:{src:a(396),alt:""}})]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("o")]),e._v(" para limpar a tabela de partição e crie uma nova em GPT (se houver).\n"),r("ol",[r("li",[e._v("Confirme apertando "),r("code",[e._v("y")]),e._v(".\n"),r("img",{attrs:{src:a(520),alt:""}})])])]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("n")]),e._v(".\n"),r("ol",[r("li",[r("code",[e._v("partition number")]),e._v(": Deixe em branco para usar o valor padrão.")]),e._v(" "),r("li",[r("code",[e._v("first sector")]),e._v(": Deixe em branco para usar o valor padrão.")]),e._v(" "),r("li",[r("code",[e._v("last sector")]),e._v(": "),r("code",[e._v("+200M")]),e._v(" para criar uma partição de 200MB que depois será renomeada para OPENCORE.")]),e._v(" "),r("li",[r("code",[e._v("Hex code or GUID")]),e._v(": "),r("code",[e._v("0700")]),e._v(" para definir o tipo de partição como Microsoft Basic Data.\n"),r("img",{attrs:{src:a(521),alt:""}})])])]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("n")]),e._v(".\n"),r("ol",[r("li",[r("code",[e._v("partition number")]),e._v(": Deixe em branco para usar o valor padrão.")]),e._v(" "),r("li",[r("code",[e._v("first sector")]),e._v(": Deixe em branco para usar o valor padrão.")]),e._v(" "),r("li",[r("code",[e._v("last sector")]),e._v(": Deixe em branco para usar o valor padrão (ou pode usar "),r("code",[e._v("+3G")]),e._v(" se desejar particionar o resto do pendrive).")]),e._v(" "),r("li",[r("code",[e._v("Hex code or GUID")]),e._v(": "),r("code",[e._v("af00")]),e._v(" para definir o tipo de partição como Apple HFS/HFS+.\n"),r("img",{attrs:{src:a(522),alt:""}})])])]),e._v(" "),r("li",[e._v("Aperte "),r("code",[e._v("w")]),e._v(".\n"),r("ul",[r("li",[e._v("Confirme apertando "),r("code",[e._v("y")]),e._v(".\n"),r("img",{attrs:{src:a(523),alt:""}})]),e._v(" "),r("li",[e._v("Em alguns casos, um reboot é necessário, mas é raro. Se quiser ter certeza, reinicie seu computador. Você também pode tentar reconectar seu pendrive.")])])]),e._v(" "),r("li",[e._v("Feche o "),r("code",[e._v("gdisk")]),e._v(" apertando "),r("code",[e._v("q")]),e._v(" (normalmente ele fecha sozinho).")])])]),e._v(" "),r("li",[e._v("Use o "),r("code",[e._v("lsblk")]),e._v(" novamente para determinar o bloco do disco de 200MB e da outra partição.\n"),r("img",{attrs:{src:a(524),alt:""}})]),e._v(" "),r("li",[e._v("Execute "),r("code",[e._v('sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<o bloco da sua partição de 200MB>')]),e._v(" para formatar a partição de 200MB em FAT32 usando o nome OPENCORE.")]),e._v(" "),r("li",[e._v("Então execute "),r("code",[e._v("cd")]),e._v(" para acessar o diretório "),r("code",[e._v("/OpenCore/Utilities/macrecovery/")]),e._v(" e deve encontrar uma "),r("code",[e._v(".dmg")]),e._v(" e um arquivo "),r("code",[e._v(".chunklist")]),e._v(".\n"),r("ol",[r("li",[e._v("Monte a partição do pendrive com o "),r("code",[e._v("udisksctl")]),e._v(" ("),r("code",[e._v("udisksctl mount -b /dev/<bloco da partição no dispositivo USB>")]),e._v(", não precisa de sudo na maioria dos casos) ou com o "),r("code",[e._v("mount")]),e._v(" ("),r("code",[e._v("sudo mount /dev/<bloco da partição no dispositivo USB> /onde/você/monta/partições")]),e._v(", o sudo é necessário).")]),e._v(" "),r("li",[e._v("Execute o "),r("code",[e._v("cd")]),e._v(" para acessar o seu pendrive e crie uma pasta com o "),r("code",[e._v("mkdir com.apple.recovery.boot")]),e._v(" na raiz da partição FAT32 do pendrive.")]),e._v(" "),r("li",[e._v("Baixe o "),r("code",[e._v("dmg2img")]),e._v(" (disponível na maioria das distros).")]),e._v(" "),r("li",[e._v("Execute "),r("code",[e._v("dmg2img -l BaseSystem.dmg")]),e._v(" e determine qual partição tem a propriedade "),r("code",[e._v("disk image")]),e._v(".\n"),r("img",{attrs:{src:a(525),alt:""}})]),e._v(" "),r("li",[e._v("Execute "),r("code",[e._v("dmg2img -p <o número da partição> -i BaseSystem.dmg -o <o bloc da sua partição de 3GB+>")]),e._v(" para extrair e escrever a imagem de recuperação na partição do disco.\n"),r("ul",[r("li",[e._v("Vai demorar um pouco. MUITO, se estiver usando um pendrive lento (demorou mais ou menos uns 5 minutos usando um pendrive rápido com USB 2.0).\n"),r("img",{attrs:{src:a(526),alt:""}})])])])])])]),e._v(" "),r("h2",{attrs:{id:"finalizando"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#finalizando"}},[e._v("#")]),e._v(" Finalizando")]),e._v(" "),r("p",[e._v("Depois de tudo terminado, acesse o guia "),r("RouterLink",{attrs:{to:"/installer-guide/opencore-efi.html"}},[e._v("Configurando a EFI")]),e._v(" para continuar com a configuração do OpenCore.")],1)])}),[],!1,null,null,null);o.default=s.exports}}]);