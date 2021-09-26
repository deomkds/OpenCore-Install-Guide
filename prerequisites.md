# Começando com o OpenCore

Antes de pularmos de cabeça na criação de um sistema baseado no OpenCore, precisamos revisar algumas coisas.

## Pré-requisitos

1. <span style="color:red">_**[CRUCIAL]**_</span> Tempo e paciência.
   * Não comece esse tutorial se tiver prazos ou trabalhos importantes a fazer. *Hackintoshes* não são computadores de trabalho nos quais você deva confiar.
2. <span style="color:red">_**[CRUCIAL]**_</span> **CONHEÇA SEU HARDWARE**
   * O modelo e a geração do seu processador.
   * A marca e o modelo da sua placa de vídeo.
   * O tipo e o modelo dos seus dispositivos de armazenamento (HDD/SSD, NVMe/AHCI/RAID/IDE).
   * O modelo do seu desktop/laptop se for OEM.
   * O modelo do seu **chipset de Ethernet**.
   * O modelo do chipset do seu Wi-Fi/Bluetooth.
3. <span style="color:red">_**[CRUCIAL]**_</span> **CONHECIMENTO BÁSICO DE LINHA DE COMANDO E DE COMO USAR UM TERMINAL/PROMPT DE COMANDO**
   * Não só é [CRUCIAL] como é a base de todo este guia. Não poderemos ajudá-lo se não souber como usar o comando `cd` para abrir um diretório ou deletar um arquivo.
4. <span style="color:red">_**[CRUCIAL]**_</span> Um computador que seja compatível, de acordo com a seção de  _**Compatibilidade**_.
   * [Limitações de Hardware](macos-limits.md)
5. <span style="color:red">_**[CRUCIAL]**_</span> Ter no mínimo:
   * Um pendrive de 16GB se for usar o macOS para criar o pendrive de boot.
   * Um pendrive de 4GB se for usar o Windows ou um Linux para criar o pendrive de boot.
6. <span style="color:red">_**[CRUCIAL]**_</span> Uma **conexão Ethernet** (nada de adaptadores Wi-Fi USB, adaptadores de Ethernet USB talvez funcionem dependendo do suporte que ela tiver ao macOS) e é preciso saber o modelo da placa Ethernet (LAN).
   * É preciso ter uma porta Ethernet física ou um adaptador USB compatível com o macOS. Caso possua uma [placa Wi-Fi compatível](https://deomkds.github.io/Wireless-Buyers-Guide/), também é possível utilizá-la.
     * Note que a maioria das placas Wi-Fi não são suportadas pelo macOS.
   * Para aqueles que não possam usar a ethernet, mas possuem um smartphone Android, é possível conectá-lo ao Wi-Fi e então compartilhar a internet usando o [HoRNDIS](https://joshuawise.com/horndis#available_versions).
7. <span style="color:red">_**[CRUCIAL]**_</span> **Sistema Operacional instalado e funcional:**
   * Seja:
     * macOS (quanto mais recente, melhor)
     * Windows (Windows 10, 1703 ou mais novo)
     * Linux (limpo e funcionando corretamente, com Python 2.7 ou posterior)
   * Para usuários de Windows ou Linux, é preciso ter **15GB** de espaço livre no disco onde se está trabalhando. No Windows, a unidade do sistema (C:) deve possuir pelo menos **15GB** de espaço livre.
   * Para usuários do macOS, é preciso ter **30GB** de espaço livre na unidade do sistema.
   * A maioria das ferramentas utilizadas neste guia necessitarão ter uma [instalação do Python](https://www.python.org/downloads/)
