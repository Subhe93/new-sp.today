<template>
  <v-container
    fluid
    class="pa-0 mt-12"
    :dir="isArabic ? 'rtl' : 'ltr'"
    style="max-width: 1200px"
    :class="isArabic ? 'text-right' : 'text-left'"
  >
    <v-row no-gutters>
      <!-- Left Section -->
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column justify-center px-10 md:py-16 bg-white"
        :class="
          isArabic
            ? 'd-flex flex-column align-end text-right'
            : 'd-flex flex-column align-start text-left'
        "
      >
        <h1 class="text-h2 font-weight-bold mb-4 w-100">
          {{ $t("about") }}
        </h1>
        <div class="w-100">
          <div
            class="mb-2 w-100"
            style="height: 4px; width: 60px; background-color: #1c4c8c"
          ></div>
        </div>
        <p class="text-body-1 mb-6 mt-2 w-100">
          {{ $t("aboutText") }}
        </p>
        <p class="mb-6 w-100" style="font-size: 20px">
          {{ $t("aboutText2") }}
        </p>
        <!-- <v-btn class="rounded-pill px-8" width="50%" color="green1" dark>
          {{ $t("showDetails") }}
        </v-btn> -->
      </v-col>

      <!-- Right Section -->
      <v-col cols="12" md="6" class="pa-0 floating-image2">
        <v-img :src="mapImage" alt="Map image" cover height="100%">
          <!-- Floating box right -->
          <div
            class="position-absolute px-8 py-4"
            style="
              top: 20%;
              right: 10%;
              background: #1a1a2c;
              color: white;
              border-radius: 12px;
              background: #1c4c8c;
            "
          >
            <div class="text-caption">
              {{ $t("exchangeRate") }}
            </div>
            <!-- <div class="text-h6">$25.70%</div> -->
            <!-- You could replace this with a chart later -->
          </div>

          <!-- Another floating box -->
          <div
            class="position-absolute px-8 py-4"
            style="
              bottom: 15%;
              left: 10%;
              background: #1c4c8c;
              color: white;
              border-radius: 12px;
            "
          >
            <div class="text-caption">{{ $t("goldExchange") }}</div>
            <ul class="text-caption pa-0 ma-0" style="list-style: none">
              <!-- <li class="text-h6">USD — 15.98</li>
              <li class="text-h6">EUR — 13.76</li> -->
            </ul>
          </div>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    const baseUrl = "https://sp.today";
    const fullPath = this.$route.fullPath;
    const currentUrl = `${baseUrl}${fullPath}`;
    const pathWithoutLocale = (fullPath.replace(/^\/(en|ar)(\/|$)/, "$2") || "/").replace(/^$/, "/");
    const supportedLocales = ["ar", "en"];
    return {
      title: this.$t("about"),
      link: [
        { rel: "canonical", href: currentUrl },
        ...supportedLocales.map((locale) => ({
          rel: "alternate",
          hreflang: locale,
          href: locale === "ar" ? `${baseUrl}${pathWithoutLocale}` : `${baseUrl}/en${pathWithoutLocale}`,
        })),
        { rel: "alternate", hreflang: "x-default", href: `${baseUrl}${pathWithoutLocale}` },
      ],
    };
  },
  data() {
    return {
      mapImage: require("../assets/map-about.png"),
    };
  },
  computed: {
    isArabic() {
      return this.$i18n.locale === "ar";
    },
  },
  watch: {
    "$i18n.locale"(newLocale) {
      document.dir = newLocale === "ar" ? "rtl" : "ltr";
    },
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    },
  },
  mounted() {
    // Set initial direction
    document.dir = this.$i18n.locale === "ar" ? "rtl" : "ltr";
  },
};
</script>

<style scoped>
.position-absolute {
  position: absolute;
}
</style>
