# Descobrindo Especificações

Esta seção é basicamente um mini guia sobre como descobrir as informações de hardware do seu computador atual. É mais relevante para usuários de notebooks e computadores pré-montados, visto que neles é mais difícil obter as especificações de hardware. Caso você já saiba as especificações do seu computador, pode pular esta página e ir direto ao guia [Criando o Pendrive](./installer-guide/).

Para esta seção, presume-se que o usuário possui Linux ou Windows instalado:

* [Descobrindo Especificações pelo Windows](#descobrindo-especificações-pelo-windows)
* [Descobrindo Especificações pelo Linux](#descobrindo-especificações-pelo-linux)

## Descobrindo Especificações pelo Windows

Existem duas principais opções:

* O Gerenciador de Dispositivos, que já vem integrado ao Windows.
* O software [AIDA64](https://www.aida64.com/downloads).

Devido à interface de usuário mais amigável, é recomendado baixar e instalar o AIDA64, visto que é muito mais fácil coletar as especificações por ele. De qualquer maneira, ambos os métodos para obter as especificações de hardware serão abordadas.

### Modelo da CPU

| AIDA64 | Gerenciador de Dispositivos |
| :--- | :--- |
| ![](./images/finding-hardware-md/cpu-model-aida64.png) | ![](./images/finding-hardware-md/cpu-model-devicemanager.png) |

### Modelo da GPU

| AIDA64 | Gerenciador de Dispositivos |
| :--- | :--- |
| ![](./images/finding-hardware-md/GPU-model-aida64.png) | ![](./images/finding-hardware-md/GPU-model-devicemanager.png) |

### Modelo do Chipset

| AIDA64 | Gerenciador de Dispositivos |
| :--- | :--- |
| ![](./images/finding-hardware-md/chipset-model-aida64.png) | ![](./images/finding-hardware-md/chipset-model-devicemanager.png) |

* Observação: O chipset e outros recursos estarão presentes no mesmo [die (ou pastilha)](https://pt.wikipedia.org/wiki/Die_(circuito_integrado)), em vez de estarem em chips dedicados. Isso significa que é um pouco mais difícil determinar o modelo exato do chipset.

### Tipo de Conexão de Teclado, Trackpad e Touchscreen 

| Gerenciador de Dispositivos |
| :--- |
| ![](./images/finding-hardware-md/trackpad-model-devicemanager.png) |

Infelizmente, o AIDA64 não fornece informação útil sobre dispositivos apontadores, por isso recomenda-se usar o Gerenciador de Dispositivos para isso.

* Esses dispositivos podem ser encontrados sob as seguintes opções:
  * `Dispositivos de Interface Humana`
  * `Teclados`
  * `Mouse e Outros Dispositivos Apontadores`

* Para saber o tipo exato da conexão de um dispositivo, selecione o dispositivo apontador e então acesse `Visualizar -> Dispositivo por Conexão`. Isso mostrará se é pela PS2, I2C, SMBus, USB etc.

Dependendo do dispositivo, ele pode aparecer sob múltiplos nomes e conexões. Os principais para se atentar são:

::: details SMBus

Estes aparecerão como diretamente como dispositivos PCI, como `Synaptics SMBus Driver` ou `ELAN SMBus Driver`.

* Dispositivos Synaptics aparecerão tanto sob PS2, como `Synaptics PS2 device`/`Synaptics Pointing Device` quanto sob PCI, como `Synaptics SMBus Driver`.

![](./images/finding-hardware-md/Windows-SMBus-Device.png)

Como é possível ver, existem dois dispositivos Synaptics na imagem à esquerda. No entanto, ao olhar mais de perto, é possível ver que o dispositivo de cima é PS2, enquanto que o de baixo é SMBus. Embora seja possível usar o *trackpad* em ambos os modos, o SMBus geralmente fornece um suporte melhor a gestos e maior precisão.

:::

::: details USB

| Dispositivos por Tipo | Dispositivos por Conexão |
| :--- | :--- |
| ![](./images/finding-hardware-md/USB-trackpad-normal.png) | ![](./images/finding-hardware-md/USB-trackpad-by-connection.png)

Estes aparecerão como `Trackpad Compatível com PS2`, e também sob USB ao trocar a visualização para `Dispositivos por Conexão`.

:::

::: details I2C

![](./images/finding-hardware-md/i2c-trackpad.png)

Estes quase sempre aparecerão como um dispositivo Microsoft HID, embora possam aparecer como outros *trackpads* também. No entanto, sempre aparecerão sob I2C.

:::
  
### Codec de Áudio

| AIDA64 | Gerenciador de Dispositivos |
| :--- | :--- |
| ![](./images/finding-hardware-md/audio-controller-aida64.png) | ![](./images/finding-hardware-md/audio-controller-aida64.png.png) |

Por causa da maneira como certas OEMs exibem os nomes de dispositivos, a informação mais precisa que se pode extrair pelo Gerenciador de Dispositivos é por meio do PCI ID (ex.: pci 14F1,50F4). Isso significa que será necessário pesquisar o ID e descobrir o Device ID exato. Entretanto, o AIDA64 é capaz de mostrar o nome correto, o que facilita as coisas para o usuário final.

### Modelos de Controladores de Rede

| AIDA64 | Gerenciador de Dispositivos |
| :--- | :--- |
| ![](./images/finding-hardware-md/nic-model-aida64.png) | ![](./images/finding-hardware-md/nic-model-devicemanager.png) |

Por causa da maneira como certas OEMs exibem os nomes de dispositivos, a informação mais precisa que se pode extrair pelo Gerenciador de Dispositivos é por meio do PCI ID (ex.: `PCI\VEN_14E4&DEV_43A0`, que corresponde ao Vendor ID `14E4` e ao Device ID `43A0`). Isso significa que será necessário pesquisar o ID e descobrir o Device ID exato. Entretanto, o AIDA64 é capaz de mostrar o nome correto, o que facilita as coisas para o usuário final.

### Modelo de Unidade de Armazenamento

| AIDA64 | Gerenciador de Dispositivos |
| :--- | :--- |
| ![](./images/finding-hardware-md/disk-model-aida64.png) | ![](./images/finding-hardware-md/disk-model-devicemanager.png) |

Por causa da pouca informação fornecida pelas OEMs sobre as unidades de armazenamento, será necessário pesquisar qual modelo combina com o nome exibido.

## Descobrindo Especificações pelo Linux

Para descobrir as especificações pelo Linux, as seguintes ferramentas serão necessárias:

* `cat`
* `pciutils`
* `dmidecode`

A seguir está uma lista de comandos a serem executados no terminal. O bom é que muitas distros Linux já vem com essas ferramentas pré-instaladas. Se não estiverem, é quase certo estarem disponíveis no gerenciador de pacotes específico da distro.

### Modelo da CPU

```sh
cat /proc/cpuinfo | grep -i "model name"
```

### Modelo da GPU

```sh
lspci | grep -i --color "vga\|3d\|2d"
```

### Modelo do Chipset

```sh
dmidecode -t baseboard
```

### Tipo de Conexão do Teclado, Trackpad e Touchscreen

```sh
dmesg | grep -i input
```

### Codec de Áudio

```sh
aplay -l
```

### Modelo de Controlador de Rede

Informação básica:

```sh
lspci | grep -i network
```

Informação mais aprofundada:

```sh
lshw -class network
```

### Modelo de Unidade de Armazenamento

```sh
lshw -class disk -class storage
```
