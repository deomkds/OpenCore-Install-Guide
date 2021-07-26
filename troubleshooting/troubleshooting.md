# Solução de Problemas

Essa seção é dedicada àqueles que não estejam conseguindo iniciar tanto o OpenCore quanto o macOS ou tendo problemas dentro do macOS. Se estiver com dúvidas a respeito do momento exato no processo de inicialização do macOS que está travando, ler a página sobre o [Processo de Inicialização do macOS](../troubleshooting/boot.md) pode ajudar a clarificar um pouco as coisas.

**E se o seu problema não for abordado aqui, por favor, leia a documentação oficial do OpenCore: [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) (em inglês)**. Este documento possui muito mais detalhes técnicos sobre como o OpenCore funciona e apresenta informações muito mais detalhadas a respeito das *quirks* suportadas.

## Sumário

Se não tiver ideia de onde está travando, veja a página: [Entendendo o Processo de Inicialização do macOS](../troubleshooting/boot.md).

* [Problemas de Inicialização do OpenCore](./extended/opencore-issues.md)
  * Esta seção se refere ao processo de iniciar a partir do pendrive e como acessar o seletor do OpenCore. Qualquer coisa após o seletor, como iniciar o macOS, consulte abaixo.
* [Problemas no Espaço do Kernel](./extended/kernel-issues.md)
  * Cobre tudo que pode ocorrer nos primeiros momentos da inicialização, desde o momento em que o macOS é selecionado no menu do OpenCore, até a parte imediatamente antes da logo da Apple e antes da interface do instalador carregar.
* [Problemas no Espaço de Usuário](./extended/userspace-issues.md)
  * Cobre o processo de carregamento da interface gráfica de usuário do macOS e da instalação do macOS no disco.
* [Problemas de Pós-instalação](./extended/post-issues.md)
  * Cobre os problemas que podem ocorrer depois da instalação do macOS, após a inicialização completa.
* [Problemas Diversos](./extended/misc-issues.md)
  * Cobre problemas que podem ocorrer depois da instalação ou com outros sistemas operacionais.
