export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Dashboard",
    meta: [
      {charset: "utf-8"},
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1",
      },
      {hid: "description", name: "description", content: ""},
      {name: "format-detection", content: "telephone=no"},
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
  },

  //scss variables & mixins
  styleResources: {
    scss: ["~/assets/scss/resources.scss"],
    hoistUseStatements: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "bootstrap/scss/bootstrap-grid.scss",
    "vue-multiselect/dist/vue-multiselect.min.css",
    "~/assets/scss/app.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/mixin",
    "~/plugins/directives",
    {src: "~/plugins/jsonEditor", mode: "client"},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/fontawesome",
    "@nuxtjs/style-resources",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",

    "@nuxtjs/auth-next",
    "vue-toastification/nuxt",
    "nuxt-route-meta",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://api.dashboard.alanb.realtyna.info",
    // baseURL: "http://127.0.0.1:8000"
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "Realtyna",
      lang: "en",
      short_name: "Realtyna",
      theme_color: "#564ec1",
    },
    icon: {
      source: "`/static/pwa-icon.png",
      fileName: "pwa-icon.png",
    },
    meta: {
      mobileAppIOS: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, {isDev, isClient}) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    },
  },

  auth: {
    strategies: {
      local: {
        scheme: "~/src/strategies/refresh",
        token: {
          property: "access_token",
          maxAge: 1800,
          global: true,
          type: "Bearer",
        },
        user: {
          property: "",
          autoFetch: true,
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          login: {url: "/auth/token", method: "post"},
          refresh: {url: "/auth/token", method: "post"},
          user: {url: "/auth/person?with=products", method: "get"},
          logout: {url: "/auth/token/revoke", method: "post"},
        },
      },
    },
    redirect: {
      login: "/auth",
      logout: "/",
      callback: "/auth",
      home: "/",
    },
  },

  fontawesome: {
    component: "fa",
    icons: {
      solid: true,
      regular: true,
      brands: true,
    },
  },

  router: {
    middleware: ["auth", "authenticated", "permission"],
  },

  toast: {
    position: "bottom-right",
    timeout: 5000,
    closeOnClick: false,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__fade",
  },
  publicRuntimeConfig: {
    cognito: {
      domain: 'https://realtyna.auth.us-east-1.amazoncognito.com',
      clientId: '1397vrlg8fap3him44fsafk5pd',
      redirectUri: 'https://dashboard.alanb.realtyna.info/'
    }
  }
};
