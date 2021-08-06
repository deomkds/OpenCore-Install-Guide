# VMware Fusion

## Exigências

* VMware Fusion.
* Java (anbos JRE e JDK funcionam).
* Um computador executando o macOS.
* O Instalador do macOS desejado salvo na pasta `/Aplicativos`.
* Um disco rígido ou SSD externo, conectado pela USB, ou uma unidade interna que pode ser usada completamente.

## Convertendo a Mídia de Instalação

O VMWare não pode usar a imagem de disco original diretamente, então será criada uma VMDK linkada, que perimitirá sua utilização como um disco rígido virtual no VMware Fusion.

Baixe o raw2vmdk [aqui](../../extra-files/raw2vmdk.jar) e coloque-o no mesmo diretório onde está o arquivo `.img`. Então, execute o seguinte comando no Terminal:

```bash
### Mude "Install macOS Big Sur Beta" se o nome do arquivo .img for diferente.
java -jar raw2vmdk.jar "Install macOS Big Sur Beta.img" "Install macOS Big Sur Beta.vmdk"
```

Isso criará um arquivo VMDK que faz referência ao arquivo `.img` (a imagem de disco original) e que o VMWare usará. Se pretende mover o arquivo VMDK ou transferi-lo para outro computador, será necessário mover o arquivo `.img` junto.

## Instalando o macOS 11 Big Sur no VMware Fusion

Existem duas opções: usar um disco não formatado ou usar um dispositivo USB inteiro. Os passos entre eles não são muito diferentes, então serão apresentados juntos a seguir.

1. (Pule este passo se estiver usando um dispositivo USB) Para usar um disco não formatado, conecte a unidade que servirá de alvo para a instalação do macOS e crie um disco rígido virtual que o referencia para usar no Fusion.

    Observação: Pode ser necessário remover as partições do disco antes de usá-lo.

    ```bash
    diskutil list
    # localize o disco externo correto e substitua o "/dev/disk3" abaixo com o caminho do dispositivo.
    sudo /Applications/VMware\ Fusion.app/Contents/Library/vmware-rawdiskCreator create /dev/disk3 fullDevice RawHDD ide
    ```

2. Então, inicie o VMWare Fusion. A tela inicial será exibida. Se não acontecer, feche qualquer janela que tenha sido aberta e selecione a opção `Arquivo` > `Novo` na barra de menus.
    ![](../../images/extras/big-sur/fusion/homepage.png)
3. Selecione a opção "Criar uma máquina virtual personalizada" e escolha macOS 10.15 Catalina (já que 10.16/11 não está disponível).
    ![](../../images/extras/big-sur/fusion/choose-os.png)
4. Selecione a opção "Usar um disco virtual existente" na tela abaixo.
    ![](../../images/extras/big-sur/fusion/choose-virtual-disk.png)
5. Então, clique em "Escolher disco virtual" e selecione o arquivo VMDK `Install macOS Beta.vmdk` criado anteriormente. Se quiser garantir que o VMware não copie o disco para o local onde a máquina virtual será armazenada (por exemplo, se estiver com pouco espaço em disco), selecione a opção "Compartilhar este disco virtual com a máquina virtual que a criou".
    ![](../../images/extras/big-sur/fusion/choose-virtual-disk-finder.png)
    Terminado, deve ficar mais ou menos assim.
    ![](../../images/extras/big-sur/fusion/choose-virtual-disk-filled.png)
6. Clique em "Continuar" e então clique em "Personalizar Configurações". Certifique-se de salvar a máquina virtual em um lugar diferente da unidade onde o macOS será instalado.

    Terminado, deverá ser exibida uma tela parecida com esta.
    ![](../../images/extras/big-sur/fusion/vm-settings-home.png)
7. Primeiro, selecione "Processadores & Memória" e configure a quantidade de memória para pelo menos 4096 MB.
8. (Pule este passo se estiver usando um disco não formatado) Selecione "Mostrar Tudo" e clique em "USB & Bluetooth". Conecte o dispositivo USB e, em "Ação ao Conectar", mude para "Pergunte-me o que fazer" para "Conectar à Máquina Virtual". Deve ficar parecido com isso quando terminado (no caso, "VIA AmazonBasics Hard Drive Enclos" é o dispositivo do autor original.)
    ![](../../images/extras/big-sur/fusion/vm-settings-usb.png)
    Então, feche a janela.
9. (Pule os passos 9 ao 13 se estiver usando um dispositivo USB) Feche a janela e feche o VMware Fusion. Localize a pasta `macOS 10.15.vmwarevm` (ou seja lá qual foi o nome que você escolheu quando salvou) no Finder, clique com o botão direito e escolha a opção "Show Package Contents".

    Deve ficar como na imagem abaixo.
    ![](../../images/extras/big-sur/fusion/vm-folder.png)
10. Abra o arquivo `vmx` (não o `vmxf` ou a pasta `vmx.lck`) no Editor de Texto. Deve ficar parecido com isso:
    ![](../../images/extras/big-sur/fusion/vmx-initial.png)
11. Encontre as linhas que começam com `sata0:1`:
    ![](../../images/extras/big-sur/fusion/vmx-find.png)
12. Substitua todas as linhas que começam com `sata0:1` pelo seguinte. Substitua `<caminho/para/vmdk>` pelo caminho completo do arquivo `RawHDD.vmdk`, criado anteriormente.

    Dica: encontre-o no Finder, então clique com o botão direito, segure a tecla Opção e selecione 'Copiar "RawHDD.vmdk" com Caminho' para obter o caminho completo facilmente.

    ```
    sata0:1.fileName = "<caminho/para/vmdk>"
    sata0:1.present = "TRUE"
    sata0:1.deviceType = "rawDisk"
    ```

    Deve ficar mais ou menos assim quando terminado.
    ![](../../images/extras/big-sur/fusion/vmx-edited.png)
13. Salve o arquivo, feche o Editor de Texto e reabra o VMware Fusion. A máquina virtual deverá abrir automaticamente, mas se não acontecer, abra-a a partir da Biblioteca de Máquinas Virtuais.

14. Selecione, na barra de menus, a opção `Máquina Virtual` > `Iniciar No Firmware`, de forma que a BIOS da máquina virtual seja iniciada.

    * (Para discos não formatados) Se o macOS pedir a sua senha ao fazer isso, insira-a. Muito embora a janela mencione discos de Boot Camp, está funcionando normalmente.

    * Se receber uma mensagem de erro dizendo que o recurso está ocupado como exemplificado abaixo, execute o seguinte comando no Terminal e tente novamente:

    ```bash
    diskutil list
    # substitua o "/dev/disk3" abaixo pelo caminho de dispositivo apropriado. Para o disco não formatado, o caminho foi descoberto anteriormente.
    sudo diskutil unmountDisk /dev/disk3
    ```

    ![](../../images/extras/big-sur/fusion/vm-in-use-error.png)
15. O Gerenciador de Inicialização da Máquina Virtual deve aparecer como exibido abaixo. Selecione o primeiro disco rídigo ("EFI VMware Virtual SATA Hard Drive (0.0)"). A máquina virtual deverá começar a iniciar o instalador do macOS 11 Big Sur.
    ![](../../images/extras/big-sur/fusion/vm-boot-manager.png)
16. Termine a instalação da mesma forma como seria feita em qualquer outro dispositivo.
    Quando a instalação estiver completa e o macOS estiver na tela de boas-vindas, selecione, na barra de menus, a opção `Máquina Virtual` > `Desligar`.

    Se necessário, adicione a sua EFI configurada na partição EFI do dispositivo, então ejete-o.

    Instale o disco de volta no seu *hackintosh* e inicie normalmente. Você agora tem o macOS 11 Big Sur!
