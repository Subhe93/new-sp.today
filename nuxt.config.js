export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  // head: {
  //   titleTemplate: "%s - Lirtna",
  //   title: "Lirtna",
  //   htmlAttrs: {
  //     // lang: "ar",
  //     // dir: "rtl",
  //   },
  //   meta: [
  //     { charset: "utf-8" },
  //     { name: "viewport", content: "width=device-width, initial-scale=1" },
  //     { hid: "description", name: "description", content: "" },
  //     { name: "format-detection", content: "telephone=no" },
  //   ],
  //   link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  // },
  head() {
    if (process.server) {
    const i18nHead = this.$nuxtI18nHead({
      addSeoAttributes: true,
      addDirAttribute: true,
    });
    return {
      htmlAttrs: {
        // myAttribute: "My Value",
        ...i18nHead.htmlAttrs,
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My Custom Description",
        },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
        ...i18nHead.meta,
      ],
      // script: [
      //   {
      //     // src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1176759147887391',
      //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9653005764752290',
      //     async: true,
      //     crossorigin: 'anonymous'
      //   }
      // ],
      // script: process.client
      //   ? [
      //       {
      //         src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9653005764752290",
      //         async: true,
      //         crossorigin: "anonymous",
      //       },
      //     ]
      //   : [],
      script: [
        {
          hid: 'gtm-script',
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W5KQNCWG');`,
          type: 'text/javascript',
          charset: 'utf-8'
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'gtm-script': ['innerHTML']
      },
      link: [
        {
          hid: "apple-touch-icon",
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },

        { rel: "icon", type: "image/png", href: "/favicon.png" },

        ...i18nHead.link,
      ],
    };
  }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/style.scss"],

  // Customize the progress-bar color
  loading: {
    color: "DodgerBlue",
    height: "5px",
    continuous: true,
    duration: 3000,
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vuetify.js" },
    { src: "~/plugins/i18n.js" },
    { src: "~/plugins/repositories.js" },
    { src: "~/plugins/apex-chart.js", mode: "client" },
    // { src: "~/plugins/chart.js", mode: "client" },
  ],
  axios: {
    baseURL: process.env.APIURL || "https://api.sp.today/api/v1/",
    // baseURL: process.env.APIURL || "http://127.0.0.1:8000/api/v1/",
  },
  publicRuntimeConfig: {
    OBJURL: process.env.OBJURL || "https://api.sp.today/files/",
    // OBJURL: process.env.OBJURL || "http://127.0.0.1:8000/storage/",
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "@nuxtjs/i18n",
    "@nuxtjs/moment",
    '@nuxtjs/pwa',
    //  '@nuxtjs/gtm',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/scss/variables.scss"],
    optionsPath: "./vuetify.options.js",
    treeShake: true,
    options: {
      customProperties: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
        extractCSS: true,
    optimizeCSS: true,
    babel: {
      compact: true,
    },
  },
  // modern: 'client',
  render: {
    http2: {
      push: true, // HTTP/2 server push
    }
  },

  moment: {
    // defaultLocale: "ar",
    // locales: ["ar", "en"],
  },
  i18n: {
    lazy: true,
    langDir: "lang/",
    strategy: "prefix_except_default",
    defaultLocale: "ar",
    defaultDirection: "rtl",
    baseUrl: "https://sp.today",
    detectBrowserLanguage: false,
    vueI18n: {
      locale: "ar",
      fallbackLocale: "ar",
    },
    locales: [
      {
        file: "ar.js",
        dir: "rtl",
        code: "ar",
        iso: "ar-SUA",
        locale: 1,
        title: "العربية",
      },
      {
        file: "en.js",
        dir: "ltr",
        code: "en",
        iso: "en-US",
        locale: 2,
        title: "English",
      },
    ],
  },
  pwa: {
    manifest: {
      name: 'Lirtna',
      short_name: 'Lirtna',
      lang: 'ar'
    }
  },
  gtm: {
    id: 'GTM-W5KQNCWG',
    enabled: true,
    debug: false,
    pageTracking: true,
  }
};
