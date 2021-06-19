# Começando com o OpenCore

Antes de pularmos de cabeça na criação de um sistema baseado no OpenCore, precisamos revisar algumas coisas.

## Pré-requisitos

1. <span style="color:red">_**[CRUCIAL]**_</span> Tempo e paciência.
   * Não comece esse tutorial se tiver prazos ou trabalhos importantes a fazer. Hackintoshes não são computadores de trabalho nos quais você deva confiar.
2. <span style="color:red">_**[CRUCIAL]**_</span> **CONHEÇA SEU HARDWARE**
   * O modelo e a geração do seu processador.
   * A marca e o modelo da sua placa de vídeo.
   * O tipo e o modelo dos seus dispositivos de armazenamento (HDD/SSD, NVMe/AHCI/RAID/IDE).
   * O modelo do seu desktop/laptop se for OEM.
   * O modelo do seu **chipset de Ethernet**.
   * O modelo do chipset do seu Wi-Fi/Bluetooth.
3. <span style="color:red">_**[CRUCIAL]**_</span> **CONHECIMENTO BÁSICO DE LINHA DE COMANDO E DE COMO USAR UM TERMINAL/PROMPT DE COMANDO**
   * Não só é [CRUCIAL] como é a base de todo este guia. Não poderemos ajudá-lo se não souber como usar o comando `cd` para abrir um diretório ou deletar um arquivo.
4. <span style="color:red">_**[CRUCIAL]**_</span> A machine that is compatible as seen in the _**Compatibility**_ section.
   * [Hardware Limitations page](macos-limits.md)
5. <span style="color:red">_**[CRUCIAL]**_</span> A minimum of:
   * 16GB USB if you're going to use macOS to create the USB
   * 4GB USB if you're going to use Windows or Linux for USB creation
6. <span style="color:red">_**[CRUCIAL]**_</span> An **Ethernet connection** (no WiFi dongles, Ethernet USB adapter may work depending on macOS support) and you must know your LAN card's model
   * You must either have a physical Ethernet port, or a compatible macOS Ethernet dongle/adapter. In case you have a [compatible WiFi card](https://dortania.github.io/Wireless-Buyers-Guide/), you can also use that.
     * Note the majority of WiFi cards are not supported by macOS
   * For people who can't use ethernet but have an Android phone, you can connect your Android phone to WiFi and then tether it using USB with [HoRNDIS](https://joshuawise.com/horndis#available_versions).
7. <span style="color:red">_**[CRUCIAL]**_</span> **Proper OS Installation:**
   * Be it:
     * macOS (a fairly recent one would be better)
     * Windows (Windows 10, 1703 or newer)
     * Linux (Clean and properly functioning, with Python 2.7 or later)
   * For Windows or Linux users, **15GB** of free space on the drive you're working on. On Windows, your OS disk (C:) must have at least **15GB** of free space.
   * For macOS users, **30GB** of free space on the system's drive.
   * Most tools used in this guide will also require [Python installed](https://www.python.org/downloads/)
