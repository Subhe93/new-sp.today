<template>
  <v-container
    class="py-16 text-green1"
    :class="isArabic ? 'text-right' : 'text-left'"
    style="max-width: 1400px; border: 10px solid; padding: 30px"
  >
    <v-row>
      <v-col cols="12" :class="isArabic ? 'text-right' : 'text-left'">
        <h1 class="text-h3 font-weight-bold mb-6">
          {{ $t("terms2.title") }}
        </h1>
        <p class="text-caption mb-8">{{ $t("terms2.lastUpdated") }}</p>

        <v-divider class="my-6"></v-divider>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.introTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.introBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.definitionsTitle") }}
        </h2>
        <p class="mb-2">{{ $t("terms2.interpretation") }}</p>
        <p class="mb-6">{{ $t("terms2.definitions") }}</p>

        <ul class="mb-8" :style="{ direction: isArabic ? 'rtl' : 'ltr' }">
          <li>{{ $t("terms2.affiliate") }}</li>
          <!-- <li>{{ $t("terms2.country") }}</li> -->
          <li>{{ $t("terms2.company") }}</li>
          <li>{{ $t("terms2.device") }}</li>
          <li>{{ $t("terms2.service") }}</li>
          <li>{{ $t("terms2.termsDef") }}</li>
          <li>{{ $t("terms2.thirdParty") }}</li>
          <li>{{ $t("terms2.website") }}</li>
          <li>{{ $t("terms2.you") }}</li>
        </ul>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.acknowledgmentTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.acknowledgmentBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.linksTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.linksBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.terminationTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.terminationBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.liabilityTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.liabilityBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.disclaimerTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.disclaimerBody") }}</p>

        <v-divider class="my-6"></v-divider>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.lawTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.lawBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.disputesTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.disputesBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.euTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.euBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.usTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.usBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.severabilityTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.severabilityBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.translationTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.translationBody") }}</p>

        <h2 class="text-h6 font-weight-bold mb-2">
          {{ $t("terms2.changesTitle") }}
        </h2>
        <p class="mb-6">{{ $t("terms2.changesBody") }}</p>
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
      title: this.$t("terms2.title"),
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
  computed: {
    isArabic() {
      return this.$i18n.locale === "ar";
    },
  },
};
</script>
