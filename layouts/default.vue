<template>
  <v-app dark>
    <!--v-if="$route.name!=='login'"-->
    <Header1 />
    <v-main>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-W5KQNCWG"
          height="0"
          width="0"
          style="display: none; visibility: hidden"
        ></iframe>
      </noscript>
      <v-container md>
        <nuxt />
      </v-container>
    </v-main>
    <Footer1 />
  </v-app>
</template>

<script>
export default {
  // head() {
  //   return this.$nuxtI18nHead();
  // },
  head() {
    if (process.server) {
      return this.$nuxtI18nHead();
    } else {
      const lang = this.$i18n.locale || "ar";
      const dir = this.$i18n.dir || (lang === "ar" ? "rtl" : "ltr");

      return {
        htmlAttrs: {
          lang,
          dir,
        },
        meta: [
          { charset: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          {
            hid: "description",
            name: "description",
            content: "Your custom description here",
          },
        ],
        link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      };
    }
  },
  components: {
    Header1: () => import("@/layouts/sections/Header"),
    Footer1: () => import("@/layouts/sections/Footer"),
  },
  methods: {},
  // mounted() {
  //   if (process.client) {
  //     const script = document.createElement("script");
  //     script.setAttribute("data-ad-client", "ca-pub-9653005764752290");
  //     script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  //     script.async = true;
  //     script.crossOrigin = "anonymous";
  //     document.head.appendChild(script);
  //   }
  // },
};
</script>

<style>
#__nuxt {
  overflow-x: hidden;
}
.flex-cont {
  display: flex;
  margin-top: 10px;
}
.flex-cont > div > .flex-div {
  background-color: #d7f1f7 !important;
  border-color: #d7f1f7 !important;
  display: block;
  width: auto;
  height: 46px;
  min-width: 82px;
  padding: 0 20.4444444444px;
  border-radius: 8px;
  text-align: center;
  text-decoration: unset;
}
@media (max-width: 991px) {
  .header-logo {
    width: 40px !important;
  }
}
</style>
