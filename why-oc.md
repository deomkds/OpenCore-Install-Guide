# Motivos para Usar o OpenCore

Esta seção contém uma breve descrição dos motivos pelos quais a comunidade tem transicionado para o OpenCore e busca derrubar alguns mitos comuns que circulam por aí. Aqueles que só querem instalar o macOS podem pular esta página.

[[toc]]

## Recursos do OpenCore

* Suporte a mais sistemas!
  * O OpenCore agora suporta mais versões do OS X e macOS nativamente, sem os hacks dolorosos que o Clover e o Chameleon precisavam implementar.
  * Isso inclui versões desde o antigo Mac OS X 10.4 Tiger até as últimas builds do macOS 11 Big Sur!
* Em média, os sistemas com OpenCore iniciam mais rapidamente do que aqueles que usam Clover, pois muitos dos patches passaram a ser desnecessários.
* Maior estabilidade geral, pois os patches conseguem ser muito mais precisos:
  * [Atualização do macOS 10.15.4](https://www.reddit.com/r/hackintosh/comments/fo9bfv/macos_10154_update/) (em inglês).
  * Sem necessidade de atualizar os patches de AMD a cada nova pequena atualização de segurança.
* Maior segurança geral em vários aspectos:
  * Sem necessidade de desativar a Proteção de Integridade do Sistema (SIP, em inglês);
  * Suporte nativo ao FileVault 2;
  * [Cofres](https://deomkds.github.io/OpenCore-Post-Install/universal/security.html#Vault) que permitem a criação de snapshots da EFI, evitando modificações indesejadas.
  * Suporta a verdadeira Inicialização Segura.
    * Tanto a do firmware UEFI quanto a fornecida pela Apple.
* Suporte à reinicialização pelo Bootcamp e à seleção de disco de inicialização por meio da leitura de variáveis de NVRAM criadas pelo painel de preferência Disco de Inicialização, assim como nos Macs de verdade.
* Suporte a atalhos de teclado na inicialização via `boot.efi`:
  * Segure `Option` ou `Esc` durante a inicialização para escolher outra unidade;
  * Segure `Command + R` para acessar o modo de recuperação;
  * Segure `Command + Option + P + R` para redefinir a NVRAM.

## Suporte de Software

Suporte a outros softwares é o maior motivo para escolher usar o OpenCore.

* *Kexts* não serão mais testadas no Clover:
  * Encontrou um bug em uma *kext*? Muitos desenvolvedores, incluindo o [Acidanthera](https://github.com/acidanthera), criador de várias *kexts* famosas, não oferecem suporte para usuários de outros *bootloaders*.
* Muitos drivers de firmware estão sendo integrados ao OpenCore:
  * [Suporte ao APFS](https://github.com/acidanthera/AppleSupportPkg)
  * [Suporte ao FileVault](https://github.com/acidanthera/AppleSupportPkg)
  * [Patches de Firmware](https://github.com/acidanthera/AptioFixPkg)
* [Patches para AMD](https://github.com/AMD-OSX/AMD_Vanilla/tree/opencore):
  * Possui um computador AMD? Os patches de *kernel* necessários para iniciar o macOS não mais suportam o Clover, apenas o OpenCore.

## Injeção de Kexts

Para entender melhor o sistema de injeção de *kexts* do OpenCore, primeiro é preciso ver como o Clover funciona:

1. Aplica-se um patch para violar o SIP.
2. Aplica-se um patch para ativar o código zumbi do XNU responsável pela injeção de *kexts*.
3. Aplicam-se patches para resolver condições de corrida na injeção de *kexts*.
4. Injeta as *kexts*.
5. Aplica-se um patch para reestabelecer o SIP.

Aspectos interessantes do método do Clover:

* Utiliza o código zumbi contido no XNU que não é usado desde o OS X 10.7 Lion (impressionante como a Apple não removeu este código ainda).
  * Atualizações do sistema geralmente quebram este patch, como ocorreu recentemente no macOS 10.14.4 Mojave e na macOS 10.15 Catalina.
* Desativa o SIP e tenta reativá-lo (nem é preciso dizer muito).
* É provável que quebre com o macOS 11 Big Sur.
* Suporta versões anteriores do OS X, até o Mac OS X 10.5 Leopard.

Agora, observe o método do OpenCore:

1. Coleta o *prelinked kernel* e as *kexts* a serem injetadas.
2. Reconstrói o cache com as novas *kexts* ainda no ambiente EFI.
3. Adiciona esse novo cache no sistema.

Aspectos interessantes do método do OpenCore:

* Independe do sistema, pois o formato do *prelinked kernel* é o mesmo desde o Mac OS X 10.6 Snow Leopard (v2) e é pouco provável que perca suporte.
  * O OpenCore também oferece suporte ao *prelinked kernel* v1 (encontrado no Mac OS X 10.4 Tiger e no Mac OS X 10.5 Leopard), *cacheless*, Mkext e KernelCollections, o que significa que há suporte apropriado para todos as versões do OS X/macOS Intel.
* Muito mais estável, pois envolve menos pacthes.

# Fraquezas do OpenCore

O OpenCore possui suporte a maior parte das funcionalidades do Clover por meio das *quirks*. No entanto, durante a transição, é preciso ter muita atenção às funções que o OpenCore não suporta, pois detalhes como esses podem afetar sua instalação.

* Não suporta inicialização de sistemas operacionais baseados em MBR.
  * É possível contornar esse problema fazendo o OpenCore carregar o rEFInd antes de carregar o sistema.
* Não suporta aplicação de patches na VBIOS em sistemas baseados em UEFI.
  * Mas pode ser feito pelo macOS.
* Não suporta injeção automática de propriedades de dispositivos para GPUs antigas.
  * Isto é, `InjectIntel`, `InjectNvidia` e `InjectAti`.
  * Pode ser feito manualmente: [Patching de GPU](https://deomkds.github.io/OpenCore-Post-Install/gpu-patching/)
* Não suporta correção de conflitos de IRQ.
  * Pode ser resolvido com o [SSDTTime](https://github.com/corpnewt/SSDTTime).
* Não suporta a geração de P-State e C-State em CPUs mais antigas.
* Não suporta correção de Target Bridge da ACPI.
* Não suporta a injeção de UUID de hardware.
* Não detecta automaticamente a maioria dos `bootloaders` de Linux.
  * Pode ser resolvido adicionando uma linha na seção `BlessOverride`
* Não suporta os vários patches para XCPM do Clover.
  * Como os patches de XCPM para Ivy Bridge.
* Não suporta esconder unidades específicas.
* Não suporta mudar configurações durante a execução.
* Não aplica o patch de valor da PCIRoot UID.
* Injeta dados e a aplica patches de ACPI em todos os sistemas, não só no macOS.

# Mitos Comuns

## O OpenCore é instável por ser beta

Resposta curta: Não.

Resposta longa: O número de versão do OpenCore não representa a qualidade do projeto. Na verdade, é só uma forma de de ver os passos que foram tomados ao longo do tempo. O Acidanthera ainda tem muitos planos para o futuro do OpenCore, incluindo maior refinamento e suporte a mais recursos.

A título de exemplo, o OpenCore passa por aditorias de segurança para garantir que está em conformidade com a Inicialização Segura da UEFI. É o único *bootloader* de *hackintosh* que passa por essas revisões rigorosas e que possui esse tipo de suporte.

Originalmente, a versão 0.6.1 foi desenvolvida para ser a versão de lançamento oficial do OpenCore. Isso porque ela teria o suporte adequado à Inicialização Segura da UEFI/Apple e marcaria o aniversário de 1 ano desde a primeira disponibilização da ferramenta ao público. No entanto, devido às circunstâncias envolvendo o macOS 11 Big Sur e o trabalho de reescrita do *prelinker* no OpenCore para suportá-lo, foi decidido adiar o lançamento oficial da versão 1.0.0 para outro ano.

Cronograma atual:

* 2019: Ano do Beta
* 2020: Ano da Inicialização Segura
* 2021: Ano do Refinamento

Então, não veja o número da versão como um impedimento à sua utilização.

## O OpenCore sempre injeta dados de SMBIOS e ACPI em outros SOs

Por padrão, o OpenCore tratará todos os sistemas operacionais de maneira igualitária quando o assunto é informação de ACPI e SMBIOS. O motivo para tal comportamento é que:

* Permite suporte adequado à inicialização de múltiplos sistemas operacionais, como acontece no [BootCamp](https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootcamp.html).
* Evita a utilização de DSDTs mal feitas e encoraja práticas adequadas de ACPI.
* Evita casos raros onde a informação é injetada várias vezes, como acontece com o Clover.
  * Por exemplo, como lidar com a injeção de dados de SMBIOS e ACPI uma vez que o `boot.efi` tenha sido iniciado e cancelado logo em seguida? As mudanças já teriam sido feitas na memória e tentar desfazê-las poderia ser bastante perigoso. Este é o motivo pelo qual o método do Clover não é bem visto.

Tendo dito isso, existem *quirks* no OpenCore que permitem fazer com que a injeção de SMBIOS seja limitada ao macOS, aplicando patches no local onde o sistema lê as informações de SMBIOS. As *quirks* `CustomSMIOSGuid` e `CustomSMBIOSMode` (esta configurada para `Custom`) são utilizados para tal, mas podem parar de funcionar no futuro. Por isso essa opção só é recomendada para os casos em que a injeção de dados causar falhas reais em outros sistemas operacionais. Portanto, mantenha essas *quirks* desligadas.

## O OpenCore exige uma reinstalação do sistema

Caso a instalação do macOS esteja limpa, de forma alguma. Isto é, caso o sistema operacional não tenha sido alterado, como acontece na instalação de *kexts* de terceiros no volume do sistema ou em outras modificações não suportadas pela Apple. Quando o sistema é alterado drasticamente, tanto pelo usuário quanto por utilitários de terceiros (como o Hackintool), é recomendado reinstalar o sistema para evitar quaisquer problemas no futuro.

Observação especial para usuários do Clover: é necessário redefinir a NVRAM ao instalar o OpenCore. Muitas das variáveis do Clover podem entrar em conflito com o OpenCore e o macOS.

* Observação: é fato conhecido que notebooks Thinkpad podem brickar após uma redefinição de NVRAM pelo OpenCore. Por isso, é recomendado que a NVRAM seja redefinida por meio de uma atualização de BIOS nesses computadores.

## O OpenCore não suporta todas as versões do macOS

A partir do OpenCore 0.6.2, é possível iniciar todas as versões do macOS para Intel, desde o antigo OS X 10.4 Tiger. No entando, o suporte adequado dependerá do seu hardware. Saiba mais na página de [Limitações de Hardware](macos-limits.md).

::: details Galeria de Instalações do macOS

O Acidanthera testou várias versões do sistema, enquanto o Khronokernel instalou vários macOS e OS X em um HP DC 7900 (Core 2 Quad Q8300) antigo. Aqui está uma pequena galeria do que foi testado:

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

## O OpenCore não suporta hardware antigo

Até o presente momento, a maioria dos hardwares Intel são suportados, desde que o sistema operacional também ofereca suporte! Verifique a página de [Limitações de Hardware](macos-limits.md) para obter mais informações a respeito de qual hardware é suportado em quais versões do OS X/macOS.

Atualmente, CPUs Intel da série Yonah e posterior foram testados adequadamente com o OpenCore.

## O OpenCore não suporta iniciar Windows ou Linux

O OpenCore funciona da mesma forma como qualquer outro *bootloader*. Ele respeita outros sistemas operacionais do mesmo jeito. Para qualquer sistema operacional que armazene o *bootloader* com um nome irregular ou em um caminho incomum, basta adicioná-lo à seção `BlessOverride`.

## Legalidade de um Hackintosh

*Hackintoshes* se encontram em uma área nebulosa da lei, principalmente porque, embora não seja ilegal, exige que o Acordo de Licença de Usuário Final (EULA, em inglês) seja violado.

Motivos pelos quais não é ilegal:

* O macOS é baixado diretamente de um [servidor da Apple](https://github.com/acidanthera/OpenCorePkg/blob/0.6.9/Utilities/macrecovery/macrecovery.py#L125).
* Tudo é feito sem a intenção de lucrar. Somente para aprendizado e uso pessoal.
  * Aqueles que planejam usar seus *hackintoshes* para trabalho ou pretendem revendê-los, deveriam verificar o caso da [Psystar](https://en.wikipedia.org/wiki/Psystar_Corporation) (em inglês) e também a legislação local.

Embora o EULA permita a instalação do macOS apenas em Macs reais ou máquinas virtuais sendo executadas em Macs genuínos ([seções 2B-i e 2B-iii](https://www.apple.com/legal/sla/docs/macOSBigSur.pdf)), não existe, nos Estados Unidos, lei vigente que proíba tal violação. No entanto, sites que reempacotam e modificam os instaladores do macOS correm o risco de sofrer uma [notificação DMCA](https://pt.wikipedia.org/wiki/Digital_Millennium_Copyright_Act).

* **IMPORTANTE**: Nada disso constitui aconselhamento jurídico, portanto realize avaliações adequadas e sempre discuta o assunto com um advogado.

## O macOS não suporta GPUs da Nvidia

Devido a problemas envolvendo o suporte da Nvidia em versões mais novas do macOS, vários usuários chegaram à conclusão de que o macOS não oferece atualmente e nunca ofereceu suporte a GPUs Nvidia. No entanto, a Apple ainda suporta alguns Macs com GPUs Nvidia no macOS mais recente, como é o caso do MacBook Pro de 2013, que utiliza uma GPU Kepler.

Isso só se torna um problema com as GPUs mais novas da Nvidia, pois a Apple nunca as adotou em Macs mais novos e portanto nunca receberam suporte oficial no sistema. Em vez disso, os usuários passaram a depender da Nvidia e de seus drivers de terceiros, os Web Drivers. Então, após a Apple ter lançado a Inicialização Segura, a Nvidia não pôde mais oferecer suporte aos Web Drivers e deixou de publicá-los para plataformas mais novas, limitando o suporte ao macOS 10.13 High Sierra.

Para mais informações sobre suporte, acesse: [Guia de Compra de GPUs](https://deomkds.github.io/GPU-Buyers-Guide/).
