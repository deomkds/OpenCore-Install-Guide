# Criando o Pendrive

Exigências:

* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases), altamente recomendado usar a versão de *debug* para exibir mais informações.
* [ProperTree](https://github.com/corpnewt/ProperTree) para editar arquivos .plist (OpenCore Configurator é outra ferramenta, mas bastante desatualizada e a versão do Mackie é conhecida corromper dados. **Por favor, evite esse tipo de ferramenta a todo custo!**).
* É preciso remover o Clover do seu sistema completamente se desejar usar o OpenCore como o seu *bootloader* principal. Mantenha um backup da pasta EFI do Clover. Veja aqui o que precisa ser removido: [Convertendo do Clover](https://github.com/deomkds/OpenCore-Install-Guide/tree/master/clover-conversion)

### Instalador Online vs Offline

Instaladores offline carregam uma cópia completa do macOS, enquanto instaladores online são somente uma imagem de recuperação (~500MB) que só baixa o macOS diretamente dos servidores da Apple depois de iniciado.

* Instalador Offline
  * Só pode ser criado no macOS.
  * O Windows e o Linux não possuem os drivers APFS/HFS necessários para montar um instalador completo.
* Instalador Online
  * Pode ser criado no macOS, Linux ou Windows.
  * Exige uma conexão funcional com a internet por meio de um adaptador de rede que seja suportado pelo macOS no computador alvo.

### Criando o Instalador

Dependendo do sistema operacional a ser usado, acesse a seção correspondente sobre como criar o pendrive.

* [Usuários de macOS](../installer-guide/mac-install.md)
  * Suporta desde o Mac OS X 10.4 Tiger até o mais recente.
  * Suporta instalação em computadores antigos e com UEFI.
* [Usuários do Windows](../installer-guide/winblows-install.md)
  * Suporta desde o OS X 10.7 Lion até o mais recente.
  * Somente instalador online.
  * Suporta instalação em computadores antigos e com UEFI.
* [Usuários Linux (UEFI)](../installer-guide/linux-install.md)
  * Suporta desde o OS X 10.7 Lion até o mais recente.
  * Somente instalador online.
  * Suporta instalação apenas em computadores com UEFI.
