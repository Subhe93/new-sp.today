<template>
  <v-container
    class="py-16 text-green1"
    :class="
      isArabic
        ? 'flex-row-reverse align-end text-right'
        : 'flex-row align-start text-left'
    "
    style="max-width: 1400px; border: 10px solid; padding: 30px"
  >
    <h1 class="text-h3 font-weight-bold mb-6">{{ $t("privacy.title") }}</h1>
    <p class="text-caption mb-6">{{ $t("privacy.lastUpdated") }}</p>

    <v-divider class="my-6"></v-divider>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.introTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.introBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.definitionsTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.definitionsBody") }}</p>

    <ul class="mb-6" :style="{ direction: isArabic ? 'rtl' : 'ltr' }">
      <li>{{ $t("privacy.accountDefinition") }}</li>
      <li>{{ $t("privacy.affiliateDefinition") }}</li>
      <li>{{ $t("privacy.companyDefinition") }}</li>
      <li>{{ $t("privacy.cookiesDefinition") }}</li>
      <!-- <li>{{ $t("privacy.countryDefinition") }}</li> -->
      <li>{{ $t("privacy.deviceDefinition") }}</li>
      <li>{{ $t("privacy.personalDataDefinition") }}</li>
      <li>{{ $t("privacy.serviceDefinition") }}</li>
      <li>{{ $t("privacy.providerDefinition") }}</li>
      <li>{{ $t("privacy.usageDefinition") }}</li>
      <li>{{ $t("privacy.websiteDefinition") }}</li>
      <li>{{ $t("privacy.youDefinition") }}</li>
    </ul>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.collectTitle") }}
    </h2>
    <h3 class="text-subtitle-1 font-weight-bold mb-2">
      {{ $t("privacy.personalDataTitle") }}
    </h3>
    <p class="mb-4">{{ $t("privacy.personalDataBody") }}</p>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">
      {{ $t("privacy.usageDataTitle") }}
    </h3>
    <p class="mb-6">{{ $t("privacy.usageDataBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.trackingTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.trackingBody") }}</p>

    <v-divider class="my-6"></v-divider>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.cookiesTypesTitle") }}
    </h2>
    <ul class="mb-6" :style="{ direction: isArabic ? 'rtl' : 'ltr' }">
      <li>{{ $t("privacy.essentialCookies") }}</li>
      <li>{{ $t("privacy.acceptanceCookies") }}</li>
      <li>{{ $t("privacy.functionalityCookies") }}</li>
    </ul>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.dataUsageTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.dataUsageBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.sharingDataTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.sharingDataBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.retentionTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.retentionBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.transferTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.transferBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.deleteDataTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.deleteDataBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.disclosureTitle") }}
    </h2>
    <ul class="mb-6" :style="{ direction: isArabic ? 'rtl' : 'ltr' }">
      <li>{{ $t("privacy.businessTransfer") }}</li>
      <li>{{ $t("privacy.legalDisclosure") }}</li>
      <li>{{ $t("privacy.otherLegal") }}</li>
    </ul>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.securityTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.securityBody") }}</p>

    <v-divider class="my-6"></v-divider>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.childrenTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.childrenBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.externalLinksTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.externalLinksBody") }}</p>

    <h2 class="text-h5 font-weight-bold mb-3">
      {{ $t("privacy.changesTitle") }}
    </h2>
    <p class="mb-6">{{ $t("privacy.changesBody") }}</p>
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
      title: this.$t("privacy.title"),
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

<style></style>
