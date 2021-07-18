# Convertendo Propriedades Comuns do Clover para o OpenCore

Esta página é voltada para os usuários que possam estar tendo problemas ao migrar do Clover para o OpenCore devido a necessidade de usar *quirks* antigas ou pelo fato do arquivo `Configuration.pdf` não ser muito voltado para usuários de notebooks.

# Drivers de Firmware e Kexts

Veja a página sobre [Drivers de Firmware e Kexts](../clover-conversion/clover-efi.md).

# ACPI

**ACPI Renames**:

Com a transição do Clover para o OpenCore, é uma boa ideia começar a remover os patches desnecessários que possam ter sido mantidos ao longo do tempo.

* Patches de EHCI: recomenda-se desligar o controlador com a [SSDT-EHCx_OFF](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-EHCx_OFF.dsl). Usuários de CPUs Skylake ou mais novas não possuem um controlador EHCI e não precisam se preocupar com isso.
  * Substituir EHC1 por EH01.
  * Substituir EHC2 por EH02.
* Patches de XHCI: desnecessários após criar uma [*kext* injetora](https://github.com/corpnewt/USBMap).
  * Substituir XHCI por XHC.
  * Substituir XHC1 por XHC.
* Patches de SATA: agora são puramente cosméticos no macOS.
  * Substituir SAT0 por SATA.
  * Substituir SAT1 por SATA.
* Patches de IMEI: gerenciados pela [WhateverGreen](https://github.com/acidanthera/whatevergreen/releases).
  * Substituir HECI por IMEI.
  * Substituir HEC1 por IMEI.
  * Substituir MEI por IMEI.
  * Substituir IDER por MEID.
* Patches de GFX: gerenciados pela [WhateverGreen](https://github.com/acidanthera/whatevergreen/releases).
  * Substituir GFX0 por IGPU.
  * Substituir PEG0 por GFX0.
  * Substituir PEGP por GFX0.
  * Substituir SL01 por PEGP.
* Patches de EC: veja uma solução melhor no guia [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/).
  * Substituir EC0 por EC.
  * Substituir H_EC por EC.
  * Substituir ECDV por EC.
  * Substituir PGEC por EC.
* Renomeações de Áudio: gerenciados pela [AppleALC](https://github.com/acidanthera/AppleALC).
  * Substituir HDAS por HDEF.
  * Substituir CAVS por HDEF.
  * Substituir AZAL por HDEF.
  * Substituir ALZA por HDEF.
  * Substituir B0D3 por HDAU.
* Correção de bug de RTC na BIOS das placas Z390: veja uma solução melhor no guia [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/) (SSDT-AWAC).
  * Substituir STAS por [vazio].
  * Corrigir bug de dispositivo de DSDT (RTC) na BIOS de palcas Z390.
  * Corrigir bug de RTC em série 300.
* Patches de NVMe: O [NVMeFix](https://github.com/acidanthera/NVMeFix) corrige o gerenciamento de energia.
  * Substituir PXSX por ANS1.
  * Substituir PXSX por ANS2.
* Patches de Airport/Wi-Fi: [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup).
  * Substituir PXSX por ARPT.
* Outros patches puramente cosméticos:
  * Substituir LPC0 por LPCB (use [SSDT-SBUS-MCHC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl) para corrigir o suporte ao SMBUS).
  * Substituir PC00 por PCIO.
  * Substituir FPU por MATH.
  * Substituir TMR por TIMR.
  * Substituir PIC por IPIC.
  * Substituir GBE1 por ETH0.

**Patches**

* Patches de TgtBridge:
  * `ACPI -> Patch -> ... -> Base`

* DisableASPM:
  * `DeviceProperties -> Add -> PciRoot... -> pci-aspm-default | Data | <00>`

* HaltEnabler:
  * `ACPI -> Quirks -> FadtEnableReset -> YES`

**Fixes**:

* **FixAirport**:
  * [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup)
* **FixIPIC**:
  * Use o [SSDTTime](https://github.com/corpnewt/SSDTTime) do CorpNewt para criar uma SSDT apropriada, `FixHPET - Patch out IRQ Conflicts`.
* **FixSBUS**:
  * [SSDT-SBUS-MCHC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl).
* **FixShutdown**:
  * [FixShutdown-USB-SSDT](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/FixShutdown-USB-SSDT.dsl)
  * [Patch de `_PTS` para `ZPTS`](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/FixShutdown-Patch.plist)
  * Isso não afetará instalações do Windows ou do Linux, já que somente adiciona métodos faltantes que deveriam estar presentes logo de inicio. *Culpa dos desenvolvedores de firmware*.
* **FixDisplay**:
  * Patch de *framebuffer* manual. A `WhateverGreen` já faz a maior parte do trabalho.
* **FixHDA**:
  * Gerenciado pela `AppleALC`.
* **FixHPET**:
  * Use o [SSDTTime](https://github.com/corpnewt/SSDTTime) do CorpNewt para criar uma SSDT apropriada, `FixHPET - Patch out IRQ Conflicts`.
* **FixSATA**:
  * `Kernel -> Quirks -> ExternalDiskIcons -> YES`.
* **FixADP1**:
  * Renomeia o dispositivo `AC0_` para `ADP1`. Consulte a página [Rename-SSDT](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/Rename-SSDT.dsl) para obter um exemplo.
  * Também injeta `Name (_PRW, Package (0x02) {0x1C,0x03})` no dispositivo se não estiver presente. [Fonte](https://github.com/CloverHackyColor/CloverBootloader/blob/81f2b91b1552a4387abaa2c48a210c63d5b6233c/rEFIt_UEFI/Platform/FixBiosDsdt.cpp#L1677-L1692) (em inglês).
* **FixRTC**:
  * Use o [SSDTTime](https://github.com/corpnewt/SSDTTime) do CorpNewt para cria uma SSDT apropriada, `FixHPET - Patch out IRQ Conflicts`.
* **FixTMR**:
  * Use o [SSDTTime](https://github.com/corpnewt/SSDTTime) do CorpNewt para cria uma SSDT apropriada, `FixHPET - Patch out IRQ Conflicts`.
* **AddPNLF**:
  * Veja a página sobre [SSDT-PNLF](https://deomkds.github.io/Getting-Started-With-ACPI/Laptops/backlight.html).
* **AddMCHC**:
  * [SSDT-SBUS-MCHC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl) (em inglês).
* **AddIMEI**:
  * [SSDT-SBUS-MCHC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl) (em inglês).
  * A `WhateverGreen` também lida com a correção de nomes do IMEI.
  * Para CPUs Sandy Bridge em placas Z77 ou CPUs Ivy Bridge em placas Z67, o IMEI precisa ser falsificado: [SSDT-IMEI](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-IMEI.dsl) (em inglês).
* **FakeLPC**:
  * `DeviceProperties -> Add -> PciRoot... -> device-id`.
  * Será necessário falsificá-lo para um controlador LPC que já esteja presente na `AppleLPC`.
* **FixIntelGfx**:
  * A `WhateverGreen` já lida com isso.
* **AddHDMI**:
  * A `WhateverGreen` já lida com isso.

**DropTables**:

* `ACPI -> Delete`

**SSDT**:

* **PluginType**:
  * [SSDT-PLUG](https://deomkds.github.io/Getting-Started-With-ACPI/)
  * Veja o guia de [Primeiros Passos com a ACPI](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/plug.html) para obter mais detalhes.

* **Generate P States**: [ssdtPRGen.sh](https://github.com/Piker-Alpha/ssdtPRGen.sh) para CPUs Sandy Bridge e Ivy Bridge.
* **Generate C States**: [ssdtPRGen.sh](https://github.com/Piker-Alpha/ssdtPRGen.sh) para CPUs Sandy Bridge e Ivy Bridge.

# Boot

**Boot Argument**:

* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> boot-args`

**NeverHibernate**:

* `Misc -> Boot -> HibernateMode -> None`

**Default Boot Volume**:

* `Misc -> Security -> AllowSetDefault -> True`
  * Pressione Ctrl+Enter no seletor para definir o dispositivo padrão.
* Uma alternativa é usar o painel de preferência Disco de Inicialização do macOS, como nos Macs de verdade.

# Gráficos de Boot

**DefaultBackgroundColor**:

* `NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14 -> DefaultBackgroundColor`
  * `00000000`: Syrah Black (preto)
  * `BFBFBF00`: Light Gray (cinza)
  * Para calcular um valor personalizado, converta um valor `RGB` para `HEX`.

**EFILoginHiDPI**:

* *Flag* do Clover somente. Para configurar o escalonamento da interface do OpenCore, veja UIScale e `UEFI -> Output`.

**flagstate**:

* `NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14 -> flagstate | Data | <>`
  * 0 -> `<00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000` (extraída de um Mac de verdade).
  * A localização da NVRAM precisa ser checada duas vezes nesse caso.

**UIScale**:

* `NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14 -> UIScale | Data | <>`
  * 1 -> `<01>`
  * 2 -> `<02>`

# CPU

**Type**:

* `PlatformInfo -> Generic -> ProcessorType`
* Veja o arquivo [AppleSmBios.h](https://github.com/acidanthera/OpenCorePkg/blob/master/Include/Apple/IndustryStandard/AppleSmBios.h) (em inglês) para obter uma lista de todos os valores suportados.

**HWPEnable**: uma alternativa melhor é gerenciar de maneira apropriada o `MSR 0x770` com a [HWPEnable](https://github.com/headkaze/HWPEnable).

**QEMU**: Suporte apropriado a VM/KVM já está implementado no OpenCore.

**TurboDisable**: uma alternativa melhor é controlar as frequências com a [CPUFriend](https://github.com/acidanthera/CPUFriend) ou o [ssdtPRGen](https://github.com/Piker-Alpha/ssdtPRGen.sh).

# Devices

**USB**:

* FixOwnership: `UEFI -> Quirk -> ReleaseUsbOwnership`
* ClockID: `DeviceProperties -> Add -> PciRoot... -> AAPL,clock-id`
* HighCurrent: `DeviceProperties -> Add -> PciRoot... -> AAPL, HighCurrent`
  * Irrelevante no OS X 10.11 El Capitan e superior.
  * Uma variação mais nova é tanto ter as `PowerProperties` definidas na `IOUSBHostFamily.kext -> AppleUSBHostPlatformProperties` ou adicionadas por meio da SSDT USBX em SMBIOS Skylake ou mais novas.

**Audio**:

Para o seguinte, será necessário saber o PciRoot do controlador de áudio do seu computador, bem como o seu nome (comumente conhecido como HDEF, mas também pode ser HDAS, HDAU e coisas do tipo). Pode ser encontrado usando a ferramenta [gfxutil](https://github.com/acidanthera/gfxutil/releases) (em inglês):

```
path/to/gfxutil -f HDEF
```

* Inject: `DeviceProperties -> Add -> PciRoot... -> layout-id`
* AFGLowPowerState: `DeviceProperties -> Add -> PciRoot... -> AFGLowPowerState -> <01000000>`
* ResetHDA: `UEFI -> Audio -> ResetTrafficClass`
  * Como opção, ainda existe o argumento de inicialização `alctsel=1` da AppleALC ou o [JackFix](https://github.com/fewtarius/jackfix) (em inglês).

**Add Properties**:

* Não existe um equivalente. Será necessário especificar por meio de um caminho de PciRoot.

**Properties**:

* `DeviceProperties -> Add`

**FakeID**:
Para o seguinte, será necessário saber a PciRoot do dispositivo e aplicar as propriedades dele com a opção `DeviceProperties -> Add`. O caminho de PciRoot pode ser encontrado utilizando a ferramenta [gfxutil](https://github.com/acidanthera/gfxutil/releases) (em inglês).

* **USB**
  * `device-id`
  * `device_type`
  * `device_type`
* **IMEI**
  * `device-id`
  * `vendor-id`

* **WIFI**
  * `name`
  * `compatible`

* **LAN**
  * `device-id`
  * `compatible`
  * `vendor-id`

* **XHCI**
  * `device-id`
  * `device_type: UHCI`
  * `device_type: OHCI`

device_type: EHCI

* `device-id`
* `AAPL,current-available`
* `AAPL,current-extra`
* `AAPL,current-available`
* `AAPL,current-extra`
* `AAPL,current-in-sleep`
* `built-in`

device_type: XHCI

* `device-id`
* `AAPL,current-available`
* `AAPL,current-extra`
* `AAPL,current-available`
* `AAPL,current-in-sleep`
* `built-in`

**ForceHPET**:

* `UEFI -> Quirks -> ActivateHpetSupport`

# Desativar Drivers

Simplesmente não os adicione na opção `UEFI -> Drivers`. Alternativamente, adicione um `#` na frente do nome do driver na `config.plist`. Dessa forma o OpenCore não o carregará.

# GUI

# Graphics

* Observação: PciRoot... deve ser substituido por

**InjectIntel**:

* [Patches de GMA](https://deomkds.github.io/OpenCore-Post-Install/gpu-patching/).

**InjectAti**:

* `DeviceProperties -> Add -> PciRoot... -> device-id`
  * Ex.: `<B0670000>` para a R9 390X.
* `DeviceProperties -> Add -> PciRoot... -> @0,connector-type`
  * Talvez seja preciso adicionar conectores adicionais (ex.: @1,connector-type, @2,connector-type) para a quantidade de portas que seu computador possuir. Veja aqui uma lsita dos tipos de conectores:

```
LVDS                    <02 00 00 00>
DVI (Dual Link)         <04 00 00 00>
DVI (Single Link)       <00 02 00 00>
VGA                     <10 00 00 00>
S-Video                 <80 00 00 00>
DP                      <00 04 00 00>
HDMI                    <00 08 00 00>
DUMMY                   <01 00 00 00>
```

**InjectNvidia**:

* [Patches de Nvidia](https://deomkds.github.io/OpenCore-Post-Install/gpu-patching/).

**FakeIntel**:

* `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0) -> device-id`
  * Ex.: `66010003` para a HD 4000.
* `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0) -> vendor-id -> <86800000>`

**FakeAti**:

* `DeviceProperties -> Add -> PciRoot... -> device-id`
  * Ex.: `<B0670000>` para a R9 390X.
* `DeviceProperties -> Add -> PciRoot... -> ATY,DeviceID`
  * Ex.: `<B067>` para a R9 390X.
* `DeviceProperties -> Add -> PciRoot... -> @0,compatible`
  * Ex.: `ATY,Elodea` para a HD 6970M.
* `DeviceProperties -> Add -> PciRoot... -> vendor-id-> <02100000>`
* `DeviceProperties -> Add -> PciRoot... -> ATY,VendorID -> <0210>`

**Observação**: Veja a página sobre [renomear GPUs](https://deomkds.github.io/Getting-Started-With-ACPI/Universal/spoof.html) para descobrir como fazer uma SSDT para falsificar uma GPU. Injetar `DeviceProperties` pelo OpenCore aparenta falhar às vezes ao tentar falsificar uma GPU.

Para outros como `InjectAti`, veja o arquivo [Sample.dsl](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/Sample.dsl) (em inglês) na documentação da `WhateverGreen`.

**Custom EDID**

* Documentação sobre EDID da [WhateverGreen](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md#edid) (em inglês).

**Dual Link**:

* `DeviceProperties -> Add -> PciRoot... -> AAPL00,DualLink`
  * 1 -> `<01000000>`
  * 0 -> `<00000000>`

**NVCAP**

* [Patches de Nvidia](https://deomkds.github.io/OpenCore-Post-Install/gpu-patching/)

**display-cfg**:

* `DeviceProperties -> Add -> PciRoot... -> @0,display-cfg`
* Veja o post de fassl sobre esse assunto: [Injeção de Nvidia](https://www.insanelymac.com/forum/topic/215236-nvidia-injection/) (em inglês).

**LoadVBios**:

* Veja o arquivo [sample.dsl](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/Sample.dsl) (em inglês) para obter mais informações a respeito da injeção de VBIOS personalizadas.

**PatchVBios**: Veja `LoadVBIOS`.

**NvidiaGeneric**:

* `DeviceProperties -> Add -> PciRoot... -> model | string | Add the GPU name`

**NvidiaSingle**: Veja o guia sobre como [desativar GPUs não suportadas](https://deomkds.github.io/OpenCore-Post-Install/).

**NvidiaNoEFI**:

* `DeviceProperties -> Add -> PciRoot... -> NVDA,noEFI | Boolean | True`
* Veja o comentário de FredWst para mais informações: [GT 640 scramble](https://www.insanelymac.com/forum/topic/306156-clover-problems-and-solutions/?do=findComment&comment=2443062) (em inglês).

**ig-platform-id**:

* `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0) -> APPL,ig-platform-id`

**BootDisplay**:

* `DeviceProperties -> Add -> PciRoot... ->  @0,AAPL,boot-display`

**RadeonDeInit**:

Na maioria dos casos, é recomendável usar a `WhateverGreen`, que lida com isso automaticamente. Essa SSDT não é necessária caso a `WhateverGreen` seja utilizada.

* [Radeon-DeInit-SSDT](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/Radeon-DeInit-SSDT.dsl)
  * Observe que esse arquivo foi feito para GPUs nomeadas como GFX0 na DSDT. Ajuste suas configurações conforme necessário.

# Kernel and Kext Patches

**KernelPm**:

* `Kernel -> Quirks -> AppleXcpmCfgLock -> YES`
* Observe que o Clover aplica este patch automaticamente, mesmo se não estiver configurado, nos casos em que encontra um MSR E2 trancado, então talvez seja necessário utilizar a opção `AppleXcpmCfgLock` mesmo quando ela não era configurada no Clover.

**AppleIntelCPUPM**:

* `Kernel -> Quirks -> AppleCpuPmCfgLock -> YES`

**DellSMBIOSPatch**:

Uma *quirk* esquisita para computadores Dell com APTIO V.

* `Kernel -> Quirks -> CustomSMBIOSGuid -> YES`
* `PlatformInfo -> UpdateSMBIOSMode -> Custom`

**KextsToPatch**:

* `Kernel -> Patch`
* Veja a página [Convertendo Patches Comuns de Kexts e de Kernel](../clover-conversion/clover-patch.md) para mais informações.

**KernelToPatch**:

* `Kernel -> Patch`
* Veja a página [Convertendo Patches Comuns de Kexts e de Kernel](../clover-conversion/clover-patch.md) para mais informações.

**ForceKextsToLoad**:

* `Kernel -> Force`

**Kernel LAPIC**:

* `Kernel -> Quirks -> LapicKernelPanic -> YES`

**KernelXCPM**:

* `Kernel -> Quirks -> AppleXcpmExtraMsrs -> YES`

Para uma longa lista de patches, compare o arquivo do OpenCore [CommonPatches.c](https://github.com/acidanthera/OpenCorePkg/blob/master/Library/OcAppleKernelLib/CommonPatches.c) (em inglês) com o arquivo do Clover [kernel_patcher.c](https://github.com/CloverHackyColor/CloverBootloader/blob/master/rEFIt_UEFI/Platform/kernel_patcher.cpp) (em inglês). Alguns patches não foram transferidos para o OpenCore, então se estiver tendo problemas, esses são os arquivos para se verificar. Um exemplo é a conversão do [`KernelIvyBridgeXCPM()`](https://github.com/CloverHackyColor/CloverBootloader/tree/1a02f530db91fdfa6880295b6a8b3f096c29e7cc/rEFIt_UEFI/Platform/kernel_patcher.cpp#L1617-L1719) (em inglês) para o OpenCore:

```
Base: _xcpm_bootstrap
Comment: _xcpm_bootstrap (Ivy Bridge) 10.15
Count: 1
Enabled: YES
Find: 8D43C43C22
Identifier: kernel
Limit: 0
Mask: FFFF00FFFF
MinKernel: 19.
MaxKernel: 19.99.99
Replace: 8D43C63C22
ReplaceMask: 0000FF0000
Skip: 0
```

[Fonte](https://github.com/khronokernel/OpenCore-Vanilla-Desktop-Guide/issues/32) (em inglês).

Para CPUs de entrada Haswell e superiores, como Celerons, veja esta página [Bugtracker Issues 365](https://github.com/acidanthera/bugtracker/issues/365) (em inglês) para obter uma lista dos patches recomendados.

**USB Port Limit Patches**:

* `Kernel -> Quirks -> XhciPortLimit -> YES`

**External Icons Patch**:

* `Kernel -> Quirks -> ExternalDiskIcons -> YES`
* Usado quando os discos internos são vistos como externos pelo macOS.

**AppleRTC**

Problema com o AppleRTC. Uma correção bastante simples:

* `Kernel -> Quirks -> DisableRtcChecksum -> YES`

**Observação**: Se ainda tiver problemas, será necessário usar a [RTCMemoryFixup](https://github.com/acidanthera/RTCMemoryFixup/releases) e excluir os alcances. Veja essa página [aqui](https://github.com/acidanthera/bugtracker/issues/788#issuecomment-604608329) (em inglês) para mais informações.

Os argumentos de inicialização a seguir devem conseguir lidar com 99% dos casos (use em conjunto com a `RTCMemoryFixup`):

```
rtcfx_exclude=00-FF
```

Se funcionar, reduza vagarosamente a área excluída até encontrar a parte na qual o macOS está ficando agarrado.

**FakeCPUID**:

* `Kernel -> Emulate`:
  * `CpuidMask`: `<Clover_FCPUID_Extended_to_4_bytes_Swapped_Bytes> | 00 00 00 00 | 00 00 00 00 | 00 00 00 00`.
    * Ex.: (`0x0306A9`): `A9060300 00000000 00000000 00000000`.
  * `CpuidData` (troque `00` por `FF` se for necessário usar um valor maior).
    * Ex.: `FFFFFFFF 00000000 00000000 00000000`.

Observação: encontrar CPUIDs para Intel pode ser um pouco mais complicado do que olhar no Intel ARK. A maneira mais fácil de encontrá-los é por meio das notas de atualização do [microcódigo Intel](https://support.microsoft.com/pt-br/topic/resumo-das-atualiza%C3%A7%C3%B5es-de-microc%C3%B3digo-da-intel-08c99af2-075a-4e16-1ef1-5f6e4d8637c4) lançados pela Microsoft.

# Rt Variables

**ROM**:

* Não existe equivalente direto para `UseMacAddr0`, já que é necessário fornecer sua própria ROM de hardware. Pode ser encontrada em `Preferências do Sistema -> Rede -> Avançado -> Hardware`
* Também verifique que o `en0` ainda está configurada como `built-in` ao executar o OpenCore. O iMessage e o iCloud podem parar de funcionar quando não há a propriedade `built-in` no `en0`.

**MLB**:

* `PlatformInfo -> Generic -> MLB`

**BooterConfig**:

* `NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14-> UIScale`:

  * 0x28: `Data | <01>`
  * 0x2A: `Data | <02>`

**CsrActiveConfig**:

* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config`:

  * 0x0: `00000000`
  * 0x3: `03000000`
  * 0x67: `67000000`
  * 0x3E7: `E7030000`

# SMBIOS

**Product Name**:

* `PlatformInfo -> Generic -> SystemProductName`

**Serial Number**:

* `PlatformInfo -> Generic -> SystemSerialNumber`

**Board Serial Number**:

* `PlatformInfo -> Generic -> MLB`

**SmUUID**:

* `PlatformInfo -> Generic -> SystemUUID`

**Memory**:

* `PlatformInfo -> CustomMemory -> True`
* `PlatformInfo -> Memory`
  * Veja o arquivo [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) (em inglês) para mais informações.

**Slots AAPL Injection**:

* `DeviceProperties -> Add -> PciRoot... -> APPL,slot-name | string | Add slot`

# System Parameters

**CustomUUID**:

* Descontinuado e não recomendado até mesmo no Clover. Não existe equivalente no OpenCore.
* Mais informações sobre o porquê: [Hardware UUID injection for OpenCore #711](https://github.com/acidanthera/bugtracker/issues/711) (em inglês).

**InjectSystemID**:

* Também descontinuada, já que era usada para replicar os UUIDs de usuário do Chameleon.

**BacklightLevel**:

* Propriedade definida na NVRAM.
* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> backlight-level | Data | <Insert value>`
  * 0x0101 -> `<0101>`

**InjectKexts**:

* Sem equivalentes, mas não existem mais desculpas para manter a `FakeSMC` dentro do macOS.

**NoCaches**:

* Isso só funciona até o OS X 10.7 Lion no Clover e o OpenCore exige um sistema operacional que suporte um kernel *prelinked* (OS X 10.7 Lion), então é impossível existir um equivalente.

**ExposeSysVariables**:

* Basta adicionar as propriedades de SMBIOS no `PlatformInfo`.
* Uma *quirk* confusa, para ser honesto. Nem é mais mencionada nas versões mais recentes da documentação do Clover no fórum AppleLife.

**NvidiaWeb**:

* Isso só aplica `sudo nvram nvda_drv=1` em todas as inicializações. Para obter um efeito similar, configure a seguinte opção conforme abaixo:
* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> nvda_drv: <31>`

# Status

Nota do tradutor: isso estava presente no guia original, resolvi manter pois o texto realmente parece inacabado.

**Seções 100% terminadas**:

* Boot Graphics
* Disable Drivers
* KernelAndKextPatches
* RTVariables
* SMBIOS
* SystemParameters

**Seções parcialmente terminadas**:

* Acpi
* Boot
* CPU
* Device

**Seções faltantes**:

* GUI
