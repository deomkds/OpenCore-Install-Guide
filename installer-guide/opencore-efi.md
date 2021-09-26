# Adicionado os Arquivos Base do OpenCore

Para configurar a estrutura da pasta do OpenCore, será necessário baixar a pasta EFI encontrada na página [Lançamentos do OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases/). Observe que tudo estará dentro da pasta IA32 ou dentro da pasta X64, a primeira sendo necessária para firmwares 32 bits e a última para firmwares 64 bits.

![](../images/installer-guide/opencore-efi-md/ia32-x64.png)

Sobre as versões DEBUG e RELEASE:

* **DEBUG**: ajuda muito a resolver bugs, mas adiciona atrasos notáveis na inicialização (isto é, de 3 a 5 segundos para chegar no seletor). Uma vez instalado, é fácil mudar para a versão RELEASE.
* **RELEASE**: Inicialização muito mais rápida, mas não oferece basicamente nenhuma informação de DEBUG, o que torna a solução de problemas muito mais difícil.

E uma vez baixado, coloque a pasta EFI (do OpenCorePkg) na raiz da partição EFI:

![](../images/installer-guide/opencore-efi-md/efi-moved.png)

**Observação**:

* **Usuários de Windows:** coloque a pasta EFI na raiz do pendrive de boot criado anteriormente.
* **Usuários de Linux:** usar a partição `OPENCORE` criada anteriormente.
  * Observe que o método 1 somente cria uma partição, enquanto que o método 2 cria duas partições.

Agora, abra a pasta EFI e veja o que há dentro dela:

![Pasta EFI de base](../images/installer-guide/opencore-efi-md/base-efi.png)

Algo notável logo de cara é que ela vem com vários arquivos nas pastas `Drivers` e `Tools`. A maioria não será necessária:

* **Mantenha somente os seguintes arquivos na pasta Drivers** (se houver):

| Driver | Status | Descrição |
| :--- | :--- | :--- |
| OpenUsbKbDxe.efi | <span style="color:#30BCD5"> Opcional </span> | Necessário para sistemas não UEFI (anteriores a 2012) |
| OpenPartitionDxe.efi | ^^ | Necessário para iniciar a partição de Recuperação do OS X 10.7 Lion e do 10.9 Mavericks. |
| OpenRuntime.efi | <span style="color:red"> Necessário </span> | Necessário para o funcionamento normal. |

::: details Mais informações sobre os drivers fornecidos

* AudioDxe.efi
  * Não tem nada a ver com suporte de áudio no macOS.
* CrScreenshotDxe.efi
  * Usado para conseguir capturas de tela na UEFI. Desnecessário para este guia.
* HiiDatabase.efi
  * Usado para corrigir a interface gráfica (como o OpenShell.efi) em CPUs Sandy Bridge ou mais antigas.
  * Não é usado para dar boot.
* NvmExpressDxe.efi
  * Usado em CPUs Haswell ou mais antigas quando não há um driver NVMe integrado no firmware.
  * Não use a não ser que saiba o que está fazendo.
* OpenCanopy.efi
  * É a interface gráfica opcional do OpenCore. Como configurá-lo será abordado no guia de [pós-instalação](https://dortania.github.io/OpenCore-Post-Install/cosmetic/gui.html), portanto, remova-o por enquanto.
* OpenHfsPlus.efi
  * Versões de código aberto do driver de HFS+. Meio lento. Recomenda-se não utilizá-lo a não ser que saiba o que está fazendo.
* OpenPartitionDxe.efi
  * Necessários para iniciar a partição de Recuperação do OS X 10.7 Lion ao 10.9 Mavericks.
    * Observação: Usuários do OpenDuet (isto é, aqueles que não tem UEFI), já terão este driver integrado, o que torna sua instalação desnecessária.
* OpenUsbKbDxe.efi
  * Usado para o seletor do OpenCore em **computadores antigos que usam o DuetPkg**. [Não recomendado e até mesmo perigoso em computadores com CPUs Ivy Bridge ou mais novas](https://applelife.ru/threads/opencore-obsuzhdenie-i-ustanovka.2944066/page-176#post-856653).
* Ps2KeyboardDxe.efi + Ps2MouseDxe.efi
  * Auto-explicativo. Usuários de teclado e mouse USB não precisam desses drivers.
  * Lembre-se: PS2 ≠ USB.
* UsbMouseDxe.efi
  * Ideia similar ao OpenUsbKbDxe. Só deve ser necessário em computadores antigos que usam o DuetPkg.
* XhciDxe.efi
  Usado para computadores com CPUs Sandy Bridge ou mais antigas, nas quais não há um driver de XHCI integrado ao firmware.
  * Só é necessário se estiver usando uma placa de expansão USB 3.0 em um computador mais antigo.

:::

* **Mantenha os seguintes arquivos na pasta Tools:**

| Ferramenta | Status | Descrição |
| :--- | :--- | :--- |
| OpenShell.efi | <span style="color:#30BCD5"> Opcional </span> | Recomendado pois facilita o _debugging_. |

Uma pasta EFI limpa:

![EFI Limpa](../images/installer-guide/opencore-efi-md/clean-efi.png)

Agora, adicione os **seus** drivers (.efi) de firmware necessários dentro da pasta _Drivers_ e as Kexts/tabelas ACPI em suas respectivas pastas. Veja [Juntando os Arquivos](../ktext.md) para mais informações sobre quais arquivos é preciso usar.

* Por favor, observe que os drivers UEFI do Clover não são suportados no OpenCore! EmuVariableUEFI, AptioMemoryFix, OsxAptioFixDrv, entre outros. Por favor, leia o guia [Convertendo os drivers de firmware do Clover](https://github.com/dortania/OpenCore-Install-Guide/blob/master/clover-conversion/clover-efi.md) para mais informações sobre drivers suportados e sobre quais já foram integrados ao OpenCore.

Veja um exemplo de como uma pasta EFI preenchida ***pode*** parecer (a sua certamente será diferente):

![Pasta EFI Preenchida](../images/installer-guide/opencore-efi-md/populated-efi.png)

**Lembrete**:

* SSDTs e DSDTs personalizadas (`.aml`) vão na pasta ACPI.
* As kexts (`.kext`) vão na pasta Kexts
* Drivers de firmware (`.efi`) vão na pasta Drivers.

## Finalizando

Depois de tudo terminado, acesse o guia [Juntando os Arquivos](../ktext.md) e obtenha as kexts e os drivers de firmware necessários para continuar com a configuração do OpenCore.
