# Apoiando os Guias

**Observação**: Este guia é um projeto mantido pela comunidade e não é endossado oficialmente pelo time Acidanthera. Por favor, **não os contate a respeito de problemas com este guia**.

Quer apoiar o guia? Você pode ajudar de algumas formas diferentes!

[[toc]]

Observação: para aqueles que querem contribuir financeiramente, nós realmente agradecemos, mas somos uma organização sem fins lucrativos. Fazemos isso para ensinar e não para ganhar dinheiro. Se você possui renda disponível, recomendamos fortemente que faça doações para instituições de caridade.

O guia original em inglês recomenda a instituição [Crohn's and Colitis Canada](https://crohnsandcolitis.donorportal.ca/Donation/DonationDetails.aspx?L=en-CA&G=159&F=1097&T=GENER).

## Reportando Erros e Problemas

Contribuir reportando problemas é bastante simples, mas é necessário seguir algumas regras:

* Mantenha a aba *Issues* (no GitHub) dedicada somente a problemas sobre o guia. **Não envie problemas pessoais sobre o seu hackintosh**. Lá não é o lugar de discutir problemas de instalação.
* Se estiver reportando um erro de digitação ou algum trecho que precisa ser melhorado, por favor, aponte a página onde o problema foi encontrado. Assim facilita encontrar o local exato onde a alterção precisa ser feita.

Vocẽ poderá reportar os bugs encontrados no bugtracker, quando ele estiver no ar. Muito provavelmente será neste link: [Bugtracker](https://github.com/deomkds/bugtracker).

## Contribuindo com PRs

Algumas regras ao contribuir com *pull requests* são:

* Use o cérebro (por favor).
* Revise seus envios.
* *Pull requests* podem ser negados se sentirmos que o conteúdo não combina com o guia ou que possui informações incorretas. Nesses casos, faremos o máximo para informar o motivo da rejeição ou solicitar que o conteúdo seja revisado.
  * Nós também adoraríamos que grandes *commits* viessem acompanhdos de fontes para que fosse mais fácil verificar a veracidade da informação fornecida.
* Imagens devem ser armazenadas localmente no repositório, dentro do diretório `../images/`.
* Seu PR precisa ter passado pelo processo de *linting* para identificar erros de formatação de *markdown* e ter todos os problemas corrigidos.
* Em geral, tente evitar o uso de ferramentas que não sejam do time Acidanthera quando possível. Buscamos evitar o uso de ferramentas de terceiros, porém, se não houver outra opção, é permitido fornecer um link.
  * Ferramentas explicitamente banidas:
    * UniBeast, MultiBeast e KextBeast.
      * Veja mais sobre isso aqui: [Tonymacx86-stance](https://github.com/khronokernel/Tonymcx86-stance) (em inglês).
    * TransMac
      * Conhecido por criar pendrives de instalação quebrados.
    * Instaladores do Niresh
      * Evite pirataria nos guias.

### Como Contribuir

A melhor forma de testar seus commits para ter certeza de que estão formatados corretamente é baixando o Node.js e executando o comando `npm install` para instalar as dependências. Ao executar o comando `npm run dev`, será criado um *webserver* local, o qual é possível acessar para ver as mudanças realizadas em tempo real. O comando `npm test` mostrará todos os erros de formatação e verificação ortográfica¹. Se quiser que o `markdownlint` tente corrigir os erros automaticamente, execute o comando `npm run fix-lint`.

Passo-a-passo simples:

* [Crie um fork deste repositório](https://github.com/deomkds/OpenCore-Install-Guide/fork/)
* Instale as ferramentas necessárias:
  * [Node.js](https://nodejs.org/)
* Faça suas alterações.
* Construa o site:
  * Execute `npm install` para instalar todos os plugins necessários.
  * Execute `npm run dev` para pré-visualizar o site.
    * Pode ser acessado pelo endereço `http://localhost:8080`.
* Verifique a formatação (linting) e a verificação ortográfica¹:
  * Execute `npm test`.
  * Execute `npm run lint` e `npm run spellcheck`² para rodar os testes de forma individual.
  * Execute `npm run fix-lint` para tentar corrigir os problemas encontrados.
  * Palavras não suportadas pelo revisor ortográfico padrão¹ podem ser adicionadas ao arquivo [dictionary.txt](./dictionary/dictionary.txt). Depois disso, sempre execute o comando `npm run sort-dict`².

::: details Sobre a Verificação Ortográfica

¹A verificação ortográfica foi desativada para esta versão do guia em português do Brasil, mas ainda é válida caso esteja contribuindo com alterações para o guia original em inglês.

²Esse comando é desnecessário na versão em português do Brasil.

:::

### Dicas

Algumas ferramentas para facilitar a contribuição:

* [Visual Studio Code](https://code.visualstudio.com).
* [Typora](https://typora.io) para renderização de *markdown* em tempo real.
* [TextMate](https://macromates.com) para buscar e substituir em massa e de forma fácil.
* [Github Desktop](https://desktop.github.com) para ter uma interface mais amigável.

## Contribuindo com Traduções

Embora os guias do Dortania sejam escritos primariamente em inglês, sabemos que existem muitas outras línguas no mundo e que nem todo mundo é fluente em inglês. Se você deseja ajudar a traduzir nossos guias para outras línguas, ficamos mais que felizes em ajudá-lo.

Principais detalhes para se observar:

* Traduções precisam estar em um *fork* dedicado e não serão integrados aos guias originais.
* Os *forks* precisam indicar que são traduções do guia original e que não são oficiais.
* Os *forks* também precisam obedecer nossa [licença](LICENSE.md).

Se o listado acima for cumprido, você está livre para manter sua tradução sem nenhum problema! Os sites do Dortania são construídos com o [VuePress](https://vuepress.vuejs.org), utilizam o [Travis-CI](https://travis-ci.org) para construção automatizada e são hospedados no [Github Pages](https://pages.github.com). Isso significa que o custo é zero para hospedar uma tradução.

Se você tiver alguma dúvida ou questionamentos quanto as traduções ou a hospedagem, sinta-se à vontade para acessar o nosso [Bugtracker](https://github.com/deomkds/bugtracker) (ainda não está no ar).

Traduções atuais conhecidas:

* [InyextcionES](https://github.com/InyextcionES/OpenCore-Install-Guide) (Espanhol).
* [macOS86](https://macos86.gitbook.io/guida-opencore/) (Italiano, abandonada).
* [Technopat](https://www.technopat.net/sosyal/konu/opencore-ile-macos-kurulum-rehberi.963661/) (Turco).
* [ThrRip](https://github.com/ThrRip/OpenCore-Install-Guide) (Chinês).
* [Shijuro](https://github.com/shijuro/OpenCore-Install-Guide) (Russo).

E observe que essas traduções estão sujeitas a preferências de seus autores, adaptações de linguagem e erro humano. Lembre-se disso ao lê-las, pois elas não são guias oficiais do Dortania.
