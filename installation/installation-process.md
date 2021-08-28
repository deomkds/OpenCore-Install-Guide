# Processo de Instalação

Agora que a configuração do OpenCore está terminada, finalmente é possível iniciar o macOS. Ainda há algumas coisas que precisam ser feitas:

* Ativar as melhores opções para o macOS na BIOS.
* Ler o guia [Multiboot com o OpenCore](https://deomkds.github.io/OpenCore-Multiboot/) assim como o guia [Configurando o LauncherOption](https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootstrap).
  * Relevante principalmente para aqueles que possuem uma única unidade com vários sistemas operacionais.
* Ter uma cópia do guia de [Solução de Problemas](../troubleshooting/troubleshooting.md) por perto.
* Ler sobre o [processo de inicialização do macOS](../troubleshooting/boot.md).
  * Pode ajudar *hackintoshers* de primeira viagem a entender melhor onde podem estar ficando travados.
* E uma tonelada de paciência.

## Verificando Seu Trabalho

Uma última coisa a ser abordada antes de iniciar é a forma como a EFI é configurada.

EFI Boa | EFI Ruim
:-------------------------:|:-------------------------:
![](../images/installation/install-md/good-efi.png)  |  ![](../images/installation/install-md/bad-efi.png)
Pasta EFI presente na partição EFI. | Pasta EFI faltando.
Arquivos ACPI estão compilados (`.aml`). | Arquivos ACPI não estão compilados (`.dsl`).
A DSDT não está presente. | A DSDT está presente.
Drivers (`.efi`) desnecessários foram removidos. | Drivers padrão estão presentes.
Ferramentas (`.efi`) desenecessárias removidas. | Ferramentas padrão estão presentes.
Todos os arquivos da pasta `Kexts` terminam em `.kext`. | Código fonte e pastas estão presentes.
O arquivo `config.plist` está presente em `EFI/OC`. | Não renomeou nem colocou o arquivo `.plist` no local certo.
Somente as *kexts* necessárioas estão presentes. | Baixou todas as *kexts* listadas.

## Iniciando o Pendrive com o OpenCore

Agora está tudo pronto para finalmente conectar o pendrive no computador e iniciar a partir dele. Lembre-se de que a maioria dos notebooks e alguns desktops ainda iniciarão por padrão a unidade interna com Windows. Será necessário selecionar manualmente o OpenCore nas opções de inicialização da BIOS. Será preciso verificar o manual de usuário ou pesquisar no Google para descobrir qual tecla ou combinação de teclas são necessárias para acessar a BIOS e o menu de inicialização (ex.: Esc, F2, F10, F12 etc.).

Uma vez iniciado a partir do pendrive, as seguintes opções de inicialização serão exibidas:

1. Windows
2. macOS Base System (External) / Install macOS Big Sur (External) / *Nome do Pendrive* (External)
3. OpenShell.efi
4. Reset NVRAM

Neste caso, selecione a **opção 2**. Dependendo da maneira como o instalador foi criado, ele pode aparecer tanto como **"macOS Base System (External)"**, **"Install macOS Big Sur (External)"** ou **"*Nome do Seu Pendrive* (External)"**

## Instalador do macOS

Após iniciar o pendrive, acompanhar todo o texto do modo *verbose* ser exibido e chegar no instalador, há algumas coisas para se ter em mente.

* A unidade onde o macOS será instalado **precisa** tanto usar o Esquema de Partição GUID **quanto** estar formatada em APFS.
  * Os usuários de macOS 10.13 High Sierra que estejam instalando em HDs e todos os usuários de macOS 10.12 Sierra precisarão formatar a unidade em macOS Reg. Cronológico (HFS+).
* A unidade também **precisa** ter uma partição de 200MB.
  * Por padrão, o macOS criará automaticamente a partição de 200MB em unidades recém formatadas.
  * Veja o guia [Multiboot com o OpenCore](https://deomkds.github.io/OpenCore-Multiboot/) para obter mais informações sobre como particionar uma unidade do Windows.

Uma vez iniciada a instalação, será necessário aguardar até que o computador seja reiniciado. Mais uma vez, inicie o pendrive com o OpenCore, mas em vez de selecionar o instalador que está no pendrive ou a partição de recuperação, será necessário escolher o instalador do macOS que está no disco para continuar. A maçã deverá ser exibida e, após alguns minutos, deverá aparecer um temporizador na parte de baixo da tela dizendo "x minutos restantes". É um ótimo momento para beber alguma coisa ou pegar algo para comer, já que esse processo demora um pouco. O computador pode reiniciar algumas outras vezes, mas se tudo correr bem, a tela de "Configure o Seu Mac" deverá ser exibida.

Você conseguiu! 🎉

Agora, leia as páginas do guia de [Pós-instalação do OpenCore](https://deomkds.github.io/OpenCore-Post-Install/) para terminar de configurar o computador.
