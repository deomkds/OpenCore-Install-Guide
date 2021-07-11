# Processo de Instalação

Agora que a configuração do OpenCore está terminada, finalmente é possível iniciar o macOS. Ainda há algumas coisas que precisam ser feitas:

* Ativar as melhores opções para o macOS na BIOS.
* Ler o guia [Multiboot com o OpenCore](https://deomkds.github.io/OpenCore-Multiboot/) assim como o guia [Configurando o LauncherOption](https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootstrap).
  * Relevante principalmente para aqueles que possuem uma única unidade com vários sistemas operacionais.
* Ter uma cópia do guia de [Solução de Problemas](../troubleshooting/troubleshooting.md) por perto.
* Ler sobre o [processo de inicialização do macOS](../troubleshooting/boot.md).
  * Pode ajudar *hackintoshers* de primeira viagem a entender melhor onde podem estar ficando travados.
* E uma tonelada de paciência.

## Double checking your work

One last thing we should go over before booting is how your EFI is setup:

Good EFI          |  Bad EFI
:-------------------------:|:-------------------------:
![](../images/installation/install-md/good-efi.png)  |  ![](../images/installation/install-md/bad-efi.png)
EFI folder found on EFI partition | EFI folder missing
ACPI Files are compiled(.aml) | ACPI Files are not compiled(.dsl)
DSDT is not included |* DSDT is included
Removed unneeded Drivers(.efi) | Leaves default Drivers
Removed unneeded Tools(.efi) | Leaves default Tools
All files in the Kexts folder end in .kext | Includes source code and folders
config.plist found under EFI/OC | Neither renamed or placed the .plist in right location
Only uses kexts that are needed | Downloaded every kext listed

And a reminder that slowgeek site is your friend:

* [**Sanity Checker**](https://opencore.slowgeek.com)

## Booting the OpenCore USB

So you're now ready to finally put the USB stick into your computer and boot off of it. Remember that most laptops and some desktops will still default to the internal drive with Windows, and you'll need to manually select OpenCore in the BIOS boot options. You'll need to check in the user manual or use a bit of google to find out what Fn key accesses the BIOS and boot menu(ie. Esc, F2, F10 or F12)

Once you boot the USB, you'll likely be greeted to the following boot options:

1. Windows
2. macOS Base System (External) / Install macOS Catalina (External)
3. OpenShell.efi
4. Reset NVRAM

For us, **Option 2.** is the one we want. Depending how the installer was made, it may report as either **"macOS Base System (External)"** if created in Linux or Windows and **"Install macOS Catalina (External)"** if created in macOS.

## macOS Installer

So you've finally got the installer booted, got through the verbose and hit the installer! Now that you've gotten this far,  the main things to keep in mind:

* Drives you wish to install macOS on **must** be both of GUID partition Scheme **and** APFS
  * High Sierra on HDD and all Sierra users will need to use macOS Journaled(HFS+)
* The drive **must** also have a 200MB partition
  * By default, macOS will setup freshly formatted drives with 200MB
  * See the [Multiboot Guide](https://dortania.github.io/OpenCore-Multiboot/) for more info on partitioning a Windows Drive

Once you start the installation, you will want to wait until the system restarts. You will once again want to boot into OpenCore, but rather than selecting your USB installer/recovery - you will want to select the macOS installer on the hard drive to continue installation. You should get an apple logo, and after a few minutes you should get a timer at the bottom saying "x minutes remaining". This may be a good time to get a drink or snack as this will take a while. It may restart a couple more times, but if all goes well, it should finally plop you at the "Setup your Mac screen"

You're in! 🎉
You will want to go through the Post-Installation pages to finish setting up your system.
