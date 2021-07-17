# Convertendo do Clover para o OpenCore

O OpenCore possui paridade de recursos para a maioria das funções oferecidas pelo Clover. No entanto, muitas outras funções não existem. Essa página comenta sobre o que é possível de ser portado do Clover e o que não é.

Para começar, eis alguns recursos que podem ser úteis:

* [Convertendo a Config.plist](../clover-conversion/clover-config.md)
* [Convertendo Kexts e Drivers de Firmware](../clover-conversion/clover-efi.md)
* [Convertendo os Argumentos de Inicialização](../clover-conversion/clover-boot-arg.md)
* [Convertendo Patches Comuns de Kexts e de Kernel](../clover-conversion/clover-patch.md)

## Limpando a Sujeira do Clover no macOS

Para os usuários de NVRAM emulada, o Clover provavelmente instalou alguns arquivos que são uma dor de cabeça para remover. Será necessário desativar o SIP para excluí-los.

Acesse os diretórios abaixo e exclua os seguintes arquivos:

* `/Volumes/EFI/EFI/CLOVER/drivers64UEFI/EmuVariableUefi-64.efi`
* `/Volumes/EFI/nvram.plist`
* `/etc/rc.clover.lib`
* `/etc/rc.boot.d/10.save_and_rotate_boot_log.local`
* `/etc/rc.boot.d/20.mount_ESP.local`
* `/etc/rc.boot.d/70.disable_sleep_proxy_client.local.disabled`
* `/etc/rc.shutdown.d/80.save_nvram_plist.local​`

Se as seguintes pastas estiverem vazias, as exclua também:

* `/etc/rc.boot.d`
* `/etc/rc.shutdown.d​`

Usuários do Painel de Preferências do Clover também precisarão excluir esses arquivos:

* `/Library/PreferencePanes/Clover.prefPane`
* `/Library/Application\ Support/clover`

## Removendo Kexts do macOS (S/L/E e L/E)

Uma tradição comum com o Clover era a instalação de *kexts* no macOS, especificamente na pasta `/System/Library/Extensions` e `/Library/Extensions`. O motivo para tal era que a injeção de *kexts* do Clover era conhecida por falhar em atualizações do macOS ou mesmo espontaneamente. Agora, com o OpenCore, foi desenvolvido um mecanismo de injeção muito mais robusto e estável que é muito mais difícil de quebrar. Então é a hora de fazer uma faxina no sistema.

**Observação**: O OpenCore não injetará as *kexts* que já estejam presentes no *kernelcache*, então fazer essa limpeza também resolverá os problemas relacionados a isso.

Abra uma janela do Terminal e execute o seguinte comando:

```
sudo kextcache -i /
```

Esse comando denunciará qualquer *kext* que não deveria estar instalado tanto na `/S/L/E` quanto na `/L/E`.

**Remova todas as _kexts_ relacionadas ao hackintosh**:

```
sudo -s
touch /Library/Extensions /System/Library/Extensions​
kextcache -i /​
```

* **Observação:** usuários do macOS 10.15 Catalina precisam executar o comando `mount -uw /` para montar a unidade do sistema com permissões de leitura e escrita.

## Limpando a Sujeira do Clover no Firmware

A outra coisa que o Clover pode ter escondido são variáveis de NVRAM. Isso é ruim pois o OpenCore não sobrescreve as variáveis a não ser que seja explicitamente comandado por meio do recurso `Delete` encontrado no caminho `NVRAM -> Delete` na `config.plist`. Para consertar isso, será necessário limpar essas variáveis por meio do recurso `ClearNvram` do OpenCore.

Na sua `config.plist`, configure a opção:

* `Misc -> Security -> AllowNvramReset -> True`

E na primeira inicialização do OpenCore, selecione a opção de inicialização `Reset NVRAM`. Isso redefinirá a NVRAM e reiniciará o sistema quando terminado.

* Observação: notebooks Thinkpad costumam ficar semi-brickados depois de uma redefinição de NVRAM no OpenCore. Recomenda-se redefinir a NVRAM por meio de uma atualização de BIOS nesses computadores.

## Opcional: Evitar a Injeção de SMBIOS em Outros Sistemas Operacionais

Por padrão, o OpenCore injetará os dados da SMBIOS em todos os sistemas operacionais. O motivo para esse comportamento é explicado em duas partes:

* Permite o suporte apropriado a *multiboot* pelo [BootCamp](https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootcamp.html).
* Evita casos raros nos quais a informação é injetada várias vezes, algo comum no Clover.

No entanto, existem *quirks* no OpenCore que permitem que a injeção de SMBIOS seja limitada ao macOS somente. Funciona a partir da aplicação de patches onde o macOS lê as informações da SMBIOS. Essas *quirks* podem parar de funcionar no futuro e usá-las só é recomendado no caso em que outros softwares deixem de funcionar ao usar o modo padrão. Para manter a estabilidade dos sistemas, evite usar essas opções sempre que possível.

Para ativar a injeção de SMBIOS somente no macOS, altere as seguintes opções na `config.plist`:

* `Kernel -> Quirks -> CustomSMBIOSGuid -> True`
* `PlatformInfo -> UpdateSMBIOSMode -> Custom`
