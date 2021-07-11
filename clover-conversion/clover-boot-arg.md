# Convertendo os Argumentos de Inicialização

Esta seção é usada principalmente para explicar quais argumentos de inicialização (*boot-args* ou *flags*) não são mais relevantes. É bastante comum encontrar usuários que ainda estejam utilizando argumentos antigos que exercem pouco ou nenhum efeito nas novas versoes do macOS, ou que não possuem muita utilidade no OpenCore.

Esta lista é baseada na memória de um ser incomodado por ver essas *flags* ainda aparecerem.

::: details Informação do Texto Original

This list is based of memory and an annoyed self with seeing these flags keep popping up, got other flags to add then I recommend [opening an issue](https://github.com/khronokernel/OpenCore-Vanilla-Desktop-Guide/issues). All help is welcomed!

Vou traduzir essa parte assim que tiver um bugtracker no ar.

:::

## Flags do macOS

**dart=0**:

* Usado para desativar o suporte ao VT-D.
* Quando essa *flag* estava presente, o Clover descartava a tabela DMAR da ACPI.
* Essa bandeira também necessita que o SIP seja desativado no macOS 10.15 Catalina. No OpenCore, essa flag não é mais recomendada e foi substituida pela *quirk* `Kernel -> Quirks -> DisableIoMapper`.

**kext-dev-mode=1**:

* Usado para permitir o carregamento de *kexts* não assinadas. *Flag* presente só no OS X 10.10 Yosemite.
* Alterar o bit `CSR_ALLOW_UNSIGNED_KEXTS` na variável de NVRAM `csr-active-config` para obter o mesmo resultado em versões mais novas.
* Isso não é necessário no OpenCore devido ao método de injeção de *kernel* usado, que envolve anexar ao *prelinked kernel*.

## Flags de Kexts

**nvda_drv=1**:

* Usado para ativar os Web Drivers da Nvidia. Não funciona mais no macOS 10.12 Sierra.
* Esta *flag* foi, na verdade, transformada no argumento `nvda_drv_vrl=1` para o macOS 10.12 Sierra e 10.13 High Sierra.

## Flags do Chameleon

Por algum motivo, as pessoas continuaram usando essas *flags* no Clover, sem efeito algum. Realmente precisamos esse trem com o OpenCore.

**PCIRootUID=Value**

* Isso configura o `_UID` do `Device (PCI0)` para qualquer que seja o valor. É supostamente necessário ao usar GPUs antigas da AMD, mas isso é questionável. Ironicamente, o Clover ainda usa essa *flag*, mas a maioria dos usuários a conhecem do Chameleon. [Fonte](https://github.com/CloverHackyColor/CloverBootloader/blob/81f2b91b1552a4387abaa2c48a210c63d5b6233c/rEFIt_UEFI/Platform/FixBiosDsdt.cpp#L1630-L1674) (em inglês).

**GraphicsEnabler=Yes/No**

* A opção equivalente a isso no Clover era `InjectAMD/Nvidia` que não existe no OpenCore. O mais próximo disso é usar a [WhateverGreen](https://github.com/acidanthera/WhateverGreen).

**IGPEnabler=Yes/No**

* A mesma ideia do `GraphicsEnabler`. No Clover, a equivalente era a opção `InjectIntel`, então, para conseguir um efeito parecido, é possível usar o patch de *framebuffer* da [WhateverGreen](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) (em inglês).

**-f**

* Ativa a inicialização sem *cache* no Chameleon e no Clover. O OpenCore possui uma opção um pouco diferente: `Kernel -> Scheme -> KernelCache` configurada para `Cacheless`.
  * Atualmente, inicialização sem *cache* só é suportada em *kernels* (kernéis?) de 64 bits, do Mac OS X 10.6 Snow Leopard ao OS X 10.9 Mavericks.
