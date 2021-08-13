const {
    description
} = require('../package')

module.exports = {
    title: 'Guia de Instalação do OpenCore',
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ["link", {
            rel: "'stylesheet",
            href: "styles/website.css"
        },]
    ],
    base: '/OpenCore-Install-Guide/',
	
	watch: {
	    $page(newPage, oldPage) {
	      if (newPage.key !== oldPage.key) {
	        requestAnimationFrame(() => {
	          if (this.$route.hash) {
	            const element = document.getElementById(this.$route.hash.slice(1));

	            if (element && element.scrollIntoView) {
	              element.scrollIntoView();
	            }
	          }
	        });
	      }
	    }
	  },
	
	markdown: {
		extendMarkdown: md => {
			md.use(require('markdown-it-multimd-table'), {
				rowspan: true,
			});
		}
	},
	
    theme: 'vuepress-theme-succinct',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: true,
        repo: 'https://github.com/deomkds/OpenCore-Install-Guide',
		editLinks: true,
		editLinkText: 'Ajude-nos a melhorar esta página!',
        logo: 'homepage.png',
        nav: [{
            text: 'Outros Guias',
            ariaLabel: 'Language Menu',
            items: [{
                text: 'Site Original (em inglês)',
                link: 'https://deomkds.github.io/'
            },
            {
                text: 'Primeiros Passos com a ACPI',
                link: 'https://deomkds.github.io/Getting-Started-With-ACPI/'
            },
            {
                text: 'Pós-instalação do OpenCore',
                link: 'https://deomkds.github.io/OpenCore-Post-Install/'
            },
            {
                text: 'Multiboot com o OpenCore',
                link: 'https://deomkds.github.io/OpenCore-Multiboot/'
            },
            {
                text: 'Guia de Compra de GPUs',
                link: 'https://deomkds.github.io/GPU-Buyers-Guide/'
            },
            {
                text: 'Guia de Compra de Wi-Fi',
                link: 'https://deomkds.github.io/Wireless-Buyers-Guide/'
            },
            {
                text: 'Guia de Compra Anti-Hackintosh',
                link: 'https://deomkds.github.io/Anti-Hackintosh-Buyers-Guide/'
            },
            ]
        },
        ],
        sidebar: [{
            title: 'Introdução',
            collapsable: false,
            sidebarDepth: 1,
            children: [
				    'prerequisites',
				    'macos-limits',
				    'find-hardware',
            'terminology',
            'why-oc',
            ]
        },
        {
            title: 'Pendrive de Boot',
            collapsable: false,
            sidebarDepth: 1,
            children: [{
                title: 'Criando o Pendrive',
                collapsable: true,
                path: '/installer-guide/',
                sidebarDepth: 1,
                children: [
                    '/installer-guide/mac-install',
                    '/installer-guide/winblows-install',
                    '/installer-guide/linux-install',
                ],
            },
                '/installer-guide/opencore-efi',
                'ktext',
            ['https://deomkds.github.io/Getting-Started-With-ACPI/', 'Primeiros Passos com a ACPI'],
                '/config.plist/',
            ]
        },
        {
            title: 'Configuração',
            collapsable: false,
            sidebarDepth: 1,
            children: [{
                title: 'Desktop com Intel',
                collapsable: true,
				sidebarDepth: 1,
                children: [
                    ['/config.plist/penryn', 'Penryn'],
                    ['/config.plist/clarkdale', 'Clarkdale'],
                    ['/config.plist/sandy-bridge', 'Sandy Bridge'],
                    ['/config.plist/ivy-bridge', 'Ivy Bridge'],
                    ['/config.plist/haswell', 'Haswell'],
                    ['/config.plist/skylake', 'Skylake'],
                    ['/config.plist/kaby-lake', 'Kaby Lake'],
                    ['/config.plist/coffee-lake', 'Coffee Lake'],
                    ['/config.plist/comet-lake', 'Comet Lake'],
                ]
            },
            {
                title: 'Laptop com Intel',
                collapsable: true,
				sidebarDepth: 1,
                children: [
                    ['/config-laptop.plist/arrandale', 'Arrandale'],
                    ['/config-laptop.plist/sandy-bridge', 'Sandy Bridge'],
                    ['/config-laptop.plist/ivy-bridge', 'Ivy Bridge'],
                    ['/config-laptop.plist/haswell', 'Haswell'],
					['/config-laptop.plist/broadwell', 'Broadwell'],
                    ['/config-laptop.plist/skylake', 'Skylake'],
                    ['/config-laptop.plist/kaby-lake', 'Kaby Lake'],
                    ['/config-laptop.plist/coffee-lake', 'Coffee Lake e Whiskey Lake'],
					['/config-laptop.plist/coffee-lake-plus', 'Coffee Lake Plus e Comet Lake'],
                    ['/config-laptop.plist/icelake', 'Ice Lake'],
                ]
            },
            {
                title: 'Intel HEDT',
                collapsable: true,
				sidebarDepth: 1,
                children: [
                    '/config-HEDT/nehalem',
                    '/config-HEDT/ivy-bridge-e',
                    '/config-HEDT/haswell-e',
                    '/config-HEDT/broadwell-e',
                    '/config-HEDT/skylake-x',
                ]
            },
            {
                title: 'Desktop com AMD',
                collapsable: true,
				sidebarDepth: 1,
                children: [
                    '/AMD/fx',
                    '/AMD/zen',
                ]
            },
            ]
        },
        {
            title: 'Instalação',
            collapsable: false,
            children: [
                '/installation/installation-process',
            ]
        },
        {
            title: 'Solução de Problemas',
            collapsable: false,
            children: [
                '/troubleshooting/troubleshooting',
				{
            		title: 'Problemas Comuns',
            		collapsable: false,
		            children: [
		                '/troubleshooting/extended/opencore-issues',
						'/troubleshooting/extended/kernel-issues',
						'/troubleshooting/extended/userspace-issues',
						'/troubleshooting/extended/post-issues',
						'/troubleshooting/extended/misc-issues',
		            ]
				},
                '/troubleshooting/debug',
                '/troubleshooting/boot',
				'/troubleshooting/kernel-debugging',
            ]
        },
        {
            title: 'Pós-instalação',
            collapsable: false,
            children: [
                ['https://deomkds.github.io/OpenCore-Post-Install/', 'Pós-Instalação'],
                {
                    title: 'Universal',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        ['https://deomkds.github.io/OpenCore-Post-Install/universal/security', 'Segurança e FileVault'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/universal/audio', 'Consertando o Áudio'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/universal/oc2hdd', 'Iniciando sem Pendrive'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/universal/update', 'Atualizando o OpenCore, as kexts e o macOS'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/universal/drm', 'Consertando a DRM'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/universal/iservices', 'Consertando os iServiços'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/universal/pm', 'Consertanto o Gerenciamento de Energia'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/universal/sleep', 'Consertando a Suspensão'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/usb/', 'Consertando a USB'],
                    ]
                },
                {
                    title: 'Problemas de Laptops',
                    collapsable: true,
                    children: [
                        ['https://deomkds.github.io/OpenCore-Post-Install/laptop-specific/battery', 'Consertando Níveis de Bateria'],

                    ]
                },
                {
                    title: 'Cosméticos',
                    collapsable: true,
                    children: [
                        ['https://deomkds.github.io/OpenCore-Post-Install/cosmetic/verbose', 'Consertando a Resolução e o modo Verbose'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/cosmetic/gui', 'Adicionando GUI e som de boot'],
                    ]
                },
                {
                    title: 'Multiboot',
                    collapsable: true,
                    children: [
						['https://deomkds.github.io/OpenCore-Multiboot/', 'Multiboot no OpenCore'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootstrap', 'Configurando o LauncherOption'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/multiboot/bootcamp', 'Instalando o BootCamp'],
                    ]
                },
                {
                    title: 'Diversos',
                    collapsable: true,
                    children: [
                        ['https://deomkds.github.io/OpenCore-Post-Install/misc/rtc', 'Consertando o RTC'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/misc/msr-lock', 'Consertando o CFG Lock'],
                        ['https://deomkds.github.io/OpenCore-Post-Install/misc/nvram', 'NVRAM Emulada'],
                    ]
                },
            ]
        },
        {
            title: 'Extras',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                '/extras/kaslr-fix',
                '/extras/spoof',
                '/extras/big-sur/',
                {
                    title: 'Convertendo do Clover',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/clover-conversion/clover-conversion', 'Introdução'],
                        ['/clover-conversion/clover-boot-arg', 'Argumentos de Inicialização'],
                        ['/clover-conversion/clover-config', 'Propriedades Comuns'],
                        ['/clover-conversion/clover-efi', 'Kexts e Drivers'],
                        ['/clover-conversion/clover-patch','Patches de Kernel e de Kexts'],
                    ]
                },
                '/extras/smbios-support.md',
            ]
        },
        {
            title: 'Outros',
            collapsable: false,
            children: [
                ['/misc/progress', 'Progresso da Tradução'],
                ['CONTRIBUTING', 'Contribuindo'],
                ['/misc/credit', 'Créditos'],
            ]
        },
        ],
    },
    plugins: [
        '@vuepress/plugin-back-to-top',
        'vuepress-plugin-smooth-scroll',
        ['vuepress-plugin-medium-zoom',
            {
                selector: "img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }],
    ]
}
