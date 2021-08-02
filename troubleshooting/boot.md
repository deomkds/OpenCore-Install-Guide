# Entendendo o Processo de Inicialização do macOS

Ao solucionar problemas em um *hackintosh*, pode ser um tanto difícil entender exatametne *onde* o sistema está travando, já que a palavra chave exata pode não retornar nenhum resultado quando procurada no Google. Embora esta página não seja capaz de resolver todos os problemas, pelo menos ela pode ajudar a entender melhor qual parte do processo de inicialização do macOS está travando e, quem sabe, suscitar algumas ideias dos motivos do travamento.

## Inicialização do OpenCore

Essa seção será breve, já que os problemas de inicialização do OpenCore são bastante raros e geralmente são erro do usuário.

* Ao ser iniciado, o firmware do computador procura pelos dispositivos de inicialização.
* O firmware localiza o arquivo `BOOTx64.efi` na pasta `EFI/BOOT/` no pendrive do OpenCore.
* O `BOOTx64.efi` é carregado, que carrega o `OpenCore.efi` da pasta `EFI/OC/` em sequência.
* As propriedades da NVRAM são aplicadas.
* Os drivers EFI são carregados a partir da pasta `EFI/OC/Drivers`.
* O Graphics Output Protocol (Protocolo de Saída Gráfica ou GOP) é instalado.
* As tabelas da ACPI são carregadas a partir da pasta `EFI/OC/ACPI`.
* Os dados da SMBIOS são aplicados.
* O OpenCore carrega e exibe todas as opções de inicialização possíveis.
* Você inicia o Instalador do macOS.

Caso tenha problemas de inicialização nesta parte, verifique um dos seguintes pontos:

* [Parado em `no vault provided!`](./extended/opencore-issues.md#parado-em-no-vault-provided)
* [Partições do macOS não são exibidas](./extended/opencore-issues.md#partições-do-macos-não-são exibidas)
* [Iniciar o OpenCore reinicia na BIOS](./extended/opencore-issues.md#iniciar-o-opencore-reinicia-na-bios)

Para o restante dos problemas possíveis, consulte:

* [Problemas ao Iniciar o OpenCore](./extended/opencore-issues.md)

## Entrega ao boot.efi

![](../images/troubleshooting/boot-md/1-boot-efi.png)

É aqui onde o *bootloader* (`boot.efi`) do macOS entra em cena. Especificamente, ele prepara o ambiente para o *kernel* ser carregado e é o momento no qual o OpenCore injeta as *kexts*. Se estiver travando neste momento, é bastante provável que haja um problema ao carregar o *kernel*. Os principais culpados são:

* [Preso em EndRandomSeed](./extended/kernel-issues.md#preso-em-endrandomseed)
* [Preso em `[EB|#LOG:EXITBS:START]`](./extended/kernel-issues.md#preso-em-eb-log-exitbs-start)
* [Erros de `Couldn't allocate runtime area`](./extended/kernel-issues.md#erros-de-couldn-t-allocate-runtime-area)

Para o restante dos problemas possíveis, consulte:

* [Problemas de Kernel](./extended/kernel-issues.md)

**Observação:** no macOS 10.15.4, a Apple alterou o protocolo de depuração do `boot.efi`, então as coisas terão uma aparência bastante diferente de como era antes. No entanto, as mesmas regras se aplicam.

## Entrega ao XNU/Kernel

Agora que o `boot.efi` configurou tudo, o *kernel* faz a sua mágica. Esta seção é comumente chamade de [Fase de Rooting](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KernelProgramming/booting/booting.html) (em inglês):

![](../images/troubleshooting/boot-md/2-kernel-start.png)

É nesta seção onde os dados da SMBIOS são verificados, as tabelas da ACPI e as *kexts* são carregadase o macOS tenta deixar tudo em ordem. Falhas aqui geralmente resultam de:

* SSDTs corrompidas.
* *Kexts* corrompidas (ou configuradas incorretamente na `config.plist` em `Kernel -> Add`).
* Mapa de memória bagunçado.

Consulte essas páginas para mais informações:

* [Kernel Panic `Cannot perform kext summary`](./extended/kernel-issues.md#kernel-panic-cannot-perform-kext-summary)
* [Kernel Panic em `Invalid frame pointer`](./extended/kernel-issues.md#kernel-panic-em-invalid-frame-pointer)

![](../images/troubleshooting/boot-md/5-apfs-module.png)

Agora aqui é onde acontece o `[ PCI configurations begin ]`. Essa seção pode ser encarada como o momento de testar o hardware do computador, as *kexts* e as SSDTs injetadas e quando o IOKit começa a sondar os componentes para encontrar os dispositivos aos quais se conectar.

O principal que é testado nessa parte:

* Controladores Integrados (ECs);
* Armazenamento (NVMe, SATA etc);
* PCI/e;
* NVRAM;
* RTC;
* PS2 e I2C

Para obter informações mais específicas sobre como contornar erros nesse momento, consulte:

* [Preso em `RTC...`, `PCI Configuration Begins`, `Previous Shutdown...`, `HPET`, `HID: Legacy...`](./extended/kernel-issues.md#preso-em-rtc-pci-configuration-begins-previous-shutdown-hpet-hid-legacy)

![](../images/troubleshooting/boot-md/6-USB-setup.png)

É aqui onde o limite de 15 portas e o mapeamento de USB entra, e é quando o infame erro `Waiting for Root Device` costuma aparecer. O principal a se verificar:

* ["Waiting for Root Device" ou erro do Sinal de Proibido](./extended/kernel-issues.md#waiting-for-root-device-ou-erro-do-sinal-de-proibido)

![](../images/troubleshooting/boot-md/8-dsmos-arrived.png)

É aqui onde a FakeSMC/VirtualSMC entra em cena e faz a sua mágica. A própria DSMOS (Don't Steal Mac OS ou Não Roube o Mac OS) é uma *kext* que verifica se o computador possui um chip SMC e solicita uma chave. Se a chave estiver faltando, a DSMOS não descriptografará o restante dos binários e a inicialização falhará. É possível ficar preso na AppleACPICPU também, que é basicamente o mesmo erro.

* [kextd stall[0]: AppleACPICPU](./extended/kernel-issues.md#kextd-stall-0-appleacpicpu)

```
Your karma check for today:
There once was a user that whined
his existing OS was so blind,
he'd do better to pirate an OS that ran great
but found his hardware declined.
Please don't steal Mac OS!
Really, that's way uncool.
(C) Apple Computer, Inc.
```

::: details Tradução Livre

Seu karma de hoje:
Era uma vez um usuário que reclamava
que seu SO existente só travava,
e era melhor piratear um SO que ia bem
mas descobriu que um chip lhe faltava.
Por favor, não roube o Mac OS!
Sério, não é nada legal.
(C) Apple Computer, Inc.

:::

Fonte: `Dont Steal Mac OS X.kext`

![](../images/troubleshooting/boot-md/9-audio.png)

Esta é a parte onde o driver de áudio da Apple entra e é onde a AppleALC brilha. É geralmente raro encontrar problemas nessa parte, mas se acontecer, tente desativar a AppleALC e quaisquer outras *kexts* relacionadas a áudio.

![](../images/troubleshooting/boot-md/10-GPU.png)

E aqui é onde ocorre a inicialização do driver da GPU e é onde a WhateverGreen também faz a sua mágica. Geralmente, os erros que ocorrem aqui se devem à GPU e não à WhateverGreen. Principais culpados:

* [Preso em ou próximo a `IOConsoleUsers: gIOScreenLock...`](./extended/kernel-issues.md#preso-em-ou-proximo-a-ioconsoleusers-gioscreenlock-giolockstate-3)
* [Tela preta após `IOConsoleUsers: gIOScreenLock...` em placas Navi](./extended/kernel-issues.md#tela-preta-após-ioconsoleusers-gioscreenlock-em-placas-navi)

## Entrega ao macOS

![](../images/troubleshooting/boot-md/11-boot.png)

E finalmente acabou todo aquele verboso! Se estiver travando na logo da Apple depois de tudo isso, verifique o seguinte:

* [macOS congela antes do login](./extended/kernel-issues.md#macos-congela-antes-do-login)
* [Tela preta após `IOConsoleUsers: gIOScreenLock...` em placas Navi](./extended/kernel-issues.md#black-screen-after-ioconsoleusers-gioscreenlock-on-navi)
* [Instalador do macOS congela após 30 segundos](./extended/userspace-issues.md#instalador-do-macos-congela-após-30-segundos)
