# Por que o OpenCore em vez do Clover e outros

Esta seção contém uma breve descrição dos motivos pelos quais a comunidade tem transicionado para o OpenCore e busca derrubar alguns mitos comuns da comunidade. Aqueles que só querem instalar o macOS podem pular esta página.

* [Por que o OpenCore em vez do Clover e outros](#por-que-o-opencore-em-vez-do-clover-e-outros)
  * Recursos do OpenCore
  * Suporte de Software
  * Injeção de Kexts
* [Fraquezas do OpenCore](#fraquezas-do-opencore)
* [Mitos Comuns](#mitos-comuns)
  * O OpenCore é instável por ser beta?
  * O OpenCore sempre injeta dados de SMBIOS e ACPI em outros SOs?
  * O OpenCore requer uma instalação limpa?
  * O OpenCore não suporta todas as versões do macOS?

## Recursos do OpenCore

* Suporte a mais sistemas!
  * O OpenCore agora suporta mais versões do OS X e macOS nativamente, sem os hacks dolorosos que o Clover e o Chameleon precisavam implementar.
  * Inclui versões desde o antigo Mac OS X 10.4 Tiger às últimas builds do macOS Big Sur!
* Em média, sistemas com o OpenCore iniciam mais rapidamente do que aqueles usando Clover, pois menos patches desnecessários precisam ser feitos.
* Maior estabilidade geral pois os patches podem ser muito mais precisos:
  * [Atualização do macOS 10.15.4](https://www.reddit.com/r/hackintosh/comments/fo9bfv/macos_10154_update/) (em inglês).
  * Sem necessidade de atualizar os patches de AMD a cada nova pequena atualização de segurança. 
* Maior segurança geral em vários aspectos:
  * Sem necessidade de desativar a Proteção de Integridade do Sistema (SIP);
  * Suporte integrado ao FileVault 2;
  * [Cofres](https://deomkds.github.io/OpenCore-Post-Install/universal/security.html#Vault) permitindo a criação de snapshots da EFI para evitar modificações indesejadas.
  * Suporte à inicialização segura real.
    * Tanto a UEFI quando a da Apple.
* Suporte a troca pelo Bootcamp e a seleção de discos de inicialização por meio da leitura de variáveis de NVRAM criadas pelo painel de preferência Disco de Inicialização, assim como nos Macs de verdade.
* Suporte a atalhos de teclado na inicialização via `boot.efi`:
  * Segure `Option` ou `Esc` durante a inicialização para escolher outra unidade;
  * Segure `Command + R` para acessar o modo de recuperação;
  * Segure `Command + Option + P + R` para redefinir a NVRAM.
    
## Suporte de Software

Suporte a softwares é o maior motivo para deixar de usar outros bootloaders. 

* Kexts deixam de ser testadas no Clover:
  * Encontrou um bug em uma kext? Muitos desenvolvedores, incluindo a organização [Acidanthera](https://github.com/acidanthera), criadores de várias kexts famosas, não oferecem suporte para não usuários do OpenCore.
* Muitos drivers de firmware estão sendo integrados ao OpenCore:
  * [Suporte ao APFS](https://github.com/acidanthera/AppleSupportPkg)
  * [Suporte ao FileVault](https://github.com/acidanthera/AppleSupportPkg)
  * [Patches de Firmware](https://github.com/acidanthera/AptioFixPkg)
* [Patches para AMD](https://github.com/AMD-OSX/AMD_Vanilla/tree/opencore):
  * Possui um computador AMD? Os patches de kernel necessários para iniciar o macOS não mais suportam o Clover, apenas o OpenCore.

## Injeção de Kexts

Para entender melhor o sistema de injeção de kexts do OpenCore, primeiro é preciso ver como o Clover funciona:

1. Aplica um patch para violar o SIP.
2. Aplica um patch para ativar o código zumbi do XNU responsável pela injeção de kexts.
3. Aplica patches para resolver condições de corrida na injeção de kexts.
4. Injeta as kexts.
5. Aplica um patch para retomar a integridade do SIP.

Aspectos interessantes do método do Clover:

* Utilizar código zumbi do XNU que não é usado desde o OS X 10.7 Lion (impressionante como a Apple não removeu este código ainda).
  * Atualizações do sistema geralmente quebram este patch, como ocorreu recentemente na 10.14.4 e na 10.15.
* Desativa o SIP e tenta reativá-lo (não é preciso dizer muito).
* É provável que quebre com o macOS 11.0 (Big Sur). 
* Suporta versões do OS X anteriores, até o 10.5.

Agora, observe o método do OpenCore:

1. Pega o prelinked kernel e as kexts prontas para serem injetadas 
2. Reconstrói o cache com as novas kexts ainda no ambiente EFI
3. Adiciona esse novo cache no sistema

Aspectos interessantes do método do OpenCore:

* Independe do sistema, pois o formato do prelinked kernel é o mesmo desde o 10.6 (v2), muito mais difícil de perder suporte.
  * O OpenCore também suporta prelinked kernel v1 (encontrado no 10.4 e no 10.5), cacheless, Mkext e KernelCollections, o que significa que possui suporte apropriado para todos as versões do OS X/macOS para Intel.
* Muito mais estabilidade pois envolve bem menos pacthes.

# OpenCore's shortcomings

The majority of Clover's functionality is actually supported in OpenCore in the form of some quirk, however when transitioning you should pay close attention to OpenCore's missing features as this may or may not affect yourself:

* Does not support booting MBR-based operating systems
  * Work around is to chain-load rEFInd once in OpenCore
* Does not support UEFI-based VBIOS patching
  * This can be done in macOS however
* Does not support automatic DeviceProperty injection for legacy GPUs
  * ie. InjectIntel, InjectNvidia and InjectAti
  * This can be done manually however: [GPU patching](https://dortania.github.io/OpenCore-Post-Install/gpu-patching/)
* Does not support IRQ conflict patching
  * Can be resolved with [SSDTTime](https://github.com/corpnewt/SSDTTime)
* Does not support P and C state generation for older CPUs
* Does not support Target Bridge ACPI patching
* Does not support Hardware UUID Injection
* Does not support auto-detection for many Linux bootloader
  * Can be resolved by adding an entry in `BlessOverride`
* Does not support many of Clover's XCPM patches
  * ie. Ivy Bridge XCPM patches
* Does not support hiding specific drives
* Does not support changing settings within OpenCore's menu
* Does not patch PCIRoot UID value
* Does not support macOS-only ACPI injection and patching

# Common Myths

## Is OpenCore unstable as it's a beta

Short Answer: No

Long Answer: No

OpenCore's version number does not represent the quality of the project. Instead, it's more of a way to see the stepping stones of the project. Acidanthera still has much they'd like to do with the project including overall refinement and more feature support.

For example, OpenCore goes through proper security audits to ensure it complies with UEFI Secure Boot, and is the only Hackintosh bootloader to undergo these rigorous reviews and have such support.

Version 0.6.1 was originally designed to be the official release of OpenCore as it would have proper UEFI/Apple Secure Boot, and would be the 1 year anniversary of OpenCore's release as a public tool. However, due to circumstances around macOS Big Sur and the rewriting of OpenCore's prelinker to support it, it was decided to push off 1.0.0 for another year.

Current road map:

* 2019: Year of Beta
* 2020: Year of Secure Boot
* 2021: Year of Refinement

So please do not see the version number as a hindrance, instead as something to look forward to.

## Does OpenCore always inject SMBIOS and ACPI data into other OSes

By default, OpenCore will assume that all OSes should be treated equally in regards to ACPI and SMBIOS information. The reason for this thinking consists of three parts:

* This allows for proper multiboot support, like with [BootCamp](https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp.html)
* Avoids poorly made DSDTs and encourages proper ACPI practices
* Avoids edge cases where info is injected several times, commonly seen with Clover
  * i.e. How would you handle SMBIOS and ACPI data injection once you booted boot.efi, but then get kicked out? The changes are already in memory and so trying to undo them can be quite dangerous. This is why Clover's method is frowned upon.

However, there are quirks in OpenCore that allow for SMBIOS injection to be macOS-limited by patching where macOS reads SMBIOS info from. The `CustomSMIOSGuid` quirk with `CustomSMBIOSMode` set to `Custom` can break in the future and so we only recommend this option in the event of certain software breaking in other OSes. For best stability, please disable these quirks.

## Does OpenCore require a fresh install

Not at all in the event you have a "Vanilla" installation – what this refers to is whether the OS has tampered in any way, such as installing 3rd party kexts into the system volume or other unsupported modifications by Apple. When your system has been heavily tampered with, either by you or 3rd party utilities like Hackintool, we recommend a fresh install to avoid any potential issues.

Special note for Clover users: please reset your NVRAM when installing with OpenCore. Many of Clover variables can conflict with OpenCore and macOS.

* Note: Thinkpad laptops are known to be semi-bricked after an NVRAM reset in OpenCore, we recommend resetting NVRAM by updating the BIOS on these machines.

## Does OpenCore only support limited versions of macOS

As of OpenCore 0.6.2, you can now boot every Intel version of macOS going all the way back to OS X 10.4! Proper support however will depend on your hardware, so please verify yourself: [Hardware Limitations](macos-limits.md)

::: details macOS Install Gallery

Acidanthera has tested many versions, and I myself have run many versions of OS X on my old HP DC 7900 (Core2 Quad Q8300). Here's just a small gallery of what I've tested:

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.4-Tiger.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.5-Leopard.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.6-Snow-Loepard.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.7-Lion.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.8-MountainLion.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.9-Mavericks.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.10-Yosemite.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.12-Sierra.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.13-HighSierra.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.15-Catalina.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/11-Big-Sur.png)

:::

## Does OpenCore support older hardware

As of right now, the majority of Intel hardware is supported so long as the OS itself does! However please refer to the [Hardware Limitations page](macos-limits.md) for more info on what hardware is supported in what versions of OS X/macOS.

Currently, Intel's Yonah and newer series CPUs have been tested properly with OpenCore.

## Does OpenCore support Windows/Linux booting

OpenCore works in the same fashion as any other boot loader, so it respects other OSes the same way. For any OSes where their bootloader has an irregular path or name, you can simply add it to the BlessOverride section.

## Legality of Hackintoshing

Where hackintoshing sits is in a legal grey area, mainly that while this is not illegal we are in fact breaking the EULA. The reason this is not illegal:

* We are downloading macOS from [Apple's servers directly](https://github.com/acidanthera/OpenCorePkg/blob/0.6.9/Utilities/macrecovery/macrecovery.py#L125)
* We are doing this as a non-profit origination for teaching and personal use
  * People who plan to use their Hackintosh for work or want to resell them should refer to the [Psystar case](https://en.wikipedia.org/wiki/Psystar_Corporation) and their regional laws

While the EULA states that macOS should only be installed on real Macs or virtual machines running on genuine Macs ([sections 2B-i and 2B-iii](https://www.apple.com/legal/sla/docs/macOSBigSur.pdf)), there is no enforceable law that outright bans this. However, sites that repackage and modify macOS installers do potentially risk the issue of [DMCA takedowns](https://en.wikipedia.org/wiki/Digital_Millennium_Copyright_Act) and such.

* **Note**: This is not legal advice, so please make the proper assessments yourself and discuss with your lawyers if you have any concerns.

## Does macOS support Nvidia GPUs

Due to issues revolving around Nvidia support in newer versions of macOS, many users have somehow come to the conclusion that macOS never supported Nvidia GPUs and don't at this point. However, Apple actually still maintains and supports Macs with Nvidia GPUs in their latest OS, like the 2013 MacBook Pro models with Kepler GPUs.

The main issue has to do with any newer Nvidia GPUs, as Apple stopped shipping machines with them and thus they never had official OS support from Apple. Instead, users had to rely on Nvidia for 3rd party drivers. Due to issues with Apple's newly introduced Secure Boot, they could no longer support the Web Drivers and thus Nvidia couldn't publish them for newer platforms limiting them to mac OS 10.13, High Sierra.

For more info on OS support, see here: [GPU Buyers Guide](https://dortania.github.io/GPU-Buyers-Guide/)
