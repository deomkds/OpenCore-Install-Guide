# Convertendo as Kexts e os Drivers de Firmware

O principal a se ter em mente com o OpenCore é que ele exige que as *kexts* e os drivers de firmware sejam especificados na `config.plist`, ou eles não serão carregados. Todas as *kexts* que são atualmente suportadas pelo Clover, funcionarão no OpenCore. No entanto, muitas delas foram descontinuadas, com variantes melhores sendo integradas ao OpenCore. Já os drivers de firmware são um pouco diferentes, visto que podem de fato quebrar a inicialização.

[[toc]]

## Kexts

Na maior parte do tempo, todas as *kexts* são suportadas no OpenCore. No entanto, algumas tiveram suas funcionalidades integradas ao OpenCore:

**Kexts Integradas**

* `NullCPUPowerManagement.kext`
  * Integrada à `DummyPowerManagement` sob `Kernel -> Emulate`.
* `BT4LEContinuityFixup.kext`
  * Integrada à `ExtendBTFeatureFlags` sob `Kernel -> Quirks`.

## Drivers de Firmware

**Suportados**

* AudioDxe.efi (certifique-se de usar a versão distribuida no [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg) e **não** a versão dos repositórios do Goldfish64 e do Clover).
* CsmVideoDxe.efi(Note that [BiosVideo.efi](https://github.com/acidanthera/DuetPkg) may be preferred)
* EnhancedFatDxe.efi
* ExFatDxeLegacy.efi
* ExFatDxe.efi
* GrubEXFAT.efi
* GrubISO9660.efi
* GrubNTFS.efi
* GrubUDF.efi
* HiiDatabase.efi
* HfsPlus.efi
* HfsPlusLegacy.efi
* NTFS.efi
* NvmExpressDxe.efi
* OpenRuntime.efi
* OpenUsbKbDxe.efi
* OsxFatBinaryDrv.efi
* Ps2MouseDxe.efi
* TbtForcePower.efi
* UsbMouseDxe.efi
* VBoxExt2.efi
* VBoxExt4.efi
* VBoxHfs.efi
* VBoxIso9600.efi
* XhciDxe.efi

**Drivers provided/merged into OpenCore and so are no longer needed:**

* APFS.efi
* ApfsDriverLoader.efi
* AppleEvent.efi
* AppleGenericInput.efi
* AppleImageCodec.efi
* AppleKeyMapAggregator.efi
* AppleUiSupport.efi
* AppleUITheme.efi
* AptioInputFix.efi
* AptioMemoryFix.efi
* AudioDxe.efi(well kinda, see AudioDxe shipped with [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg))
* BootChimeDxe.efi
* DataHubDxe.efi
* EmuVariableUEFI.efi
* EnglishDxe.efi
* FirmwareVolume.efi
* HashServiceFix.efi
* SMCHelper.efi
* OcQuirks.efi
* VirtualSMC.efi

**Explicitly unsupported drivers:**

* AppleUsbKbDxe.efi(replaced with OpenUsbKbDxe.efi)
* FSInject.efi
* FwRuntimeServices.efi(replaced with OpenRuntime.efi)
* osxaptiofix2drv-free2000.efi
* osxaptiofix2drv.efi
* osxaptiofix3drv.efi
* osxaptiofixdrv.efi
* OsxFatBinaryDrv.efi
* OsxLowMemFixDrv.efi
* UsbKbDxe.efi(replaced with OpenUsbKbDxe.efi)

### AptioMemoryFix Note

Well before we actually get started on converting the Clover config, we must first talk about converting from AptioMemoryFix. The main thing to note is that it's inside of OpenCore with OpenRuntime being an extension, this means that AptioMemoryFix and that there's also a lot more settings to choose from. Please see the hardware specific sections of the OpenCore guide to know what Booter settings your system may require(HEDT like X99 and X299 should look to the closest CPU like Skylake-X should refer to Skylake guide and **read the comments** as they mention specifics for your system).
