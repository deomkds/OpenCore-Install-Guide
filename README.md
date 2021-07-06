---
home: true
heroImage: /dortania-logo-clear.png
heroText: Guia de Instalação do OpenCore 
actionText: Primeiros Passos→
actionLink: prerequisites.md

meta:
- name: description
  content: Tradução NÃO OFICIAL por deomkds (v0.7.0)
---

# O que é o OpenCore e para quem é este guia?

O OpenCore é um *bootloader*: um software complexo usado na preparação do sistema para executar o macOS. Mais especificamente, é o responsável por injetar dados para o sistema operacional, como o SMBIOS, as tabelas da ACPI e as kexts. Ele difere de outras ferramentas como o Clover pois foi criado com segurança e qualidade em mente, permitindo a utilização de muitos recursos encontrados nos Macs reais, como a [Proteção da Integridade do Sistema](https://support.apple.com/pt-br/HT204899) (ou SIP, na sigla em inglês) e o [FileVault](https://support.apple.com/pt-br/HT204837). Uma explicação mais profunda pode ser encontrada aqui: [Por que OpenCore em vez do Clover e outros?](why-oc.md).

Este guia (não oficial) foca especificamente em dois aspectos principais:

* Instalar o macOS em um PC baseado em x86
* Ensinar o que faz um *hackintosh* funcionar

Por este motivo, espera-se que o leitor seja capaz de ler, aprender e até mesmo utilizar o Google. Este guia não é um simples "Instale macOS com apenas 1 clique!".

Por favor, lembre-se de que o OpenCore ainda é novo e está em fase de testes. Embora estável (e provavelmente muito mais estável do que o Clover em praticamente todos os aspectos), ele ainda recebe atualizações constantes, o que significa que partes da configuração são alteradas com bastante frequência (ex.: novos *quirks* substituindo antigos).

Por fim, aqueles que estejam tendo dificuldades podem acessar tanto o [subreddit r/Hackintosh](https://www.reddit.com/r/hackintosh/) quanto o [Discord do r/Hackintosh](https://discord.gg/u8V7N5C) (em inglês) para obter ajuda.</br></br></br></br>
