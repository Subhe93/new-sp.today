<template>
  <div class="mt-16 mb-16">
    <v-row>
      <v-col cols="12" md="12">
        <AdBanner ad-slot="9454834179" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1 class="mb-5 sm-text-h4">
          {{ $t("meta.gold_prices_in_syria") }}
        </h1>
        <h2 class="text-h5 mb-2" style="line-height: 25px;">
          {{ $t("meta.gold_subtitle") }}
        </h2>
        <h3 class="text-h5 mt-5">
          {{ $moment().format("DD-MM-YYYY") }}
          {{ $t($moment().format("dddd")) }}
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <GoldRichTable :gold="gold" />
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="pa-4 mb-4 elevation-0 no-shadow">
          <h2 class="text-h4 mb-2">{{ $t('meta.gold_table_title') }}</h2>
          <p>{{ $t('meta.gold_table_note') }}</p>
        </v-card>
        <v-card class="pa-4 mb-4 elevation-0 no-shadow">
          <h2 class="text-h4 mb-2">{{ $t('meta.gold_types_title') }}</h2>
          <ul class="gold-ul">
            <li class="mb-2">{{ $t('meta.gold_type_21') }}</li>
            <li class="mb-2">{{ $t('meta.gold_type_18') }}</li>
            <li class="mb-2">{{ $t('meta.gold_type_ounce') }}</li>
            <li class="mb-2">{{ $t('meta.gold_type_pound') }}</li>
          </ul>
        </v-card>
        <v-card class="pa-4 mb-4 elevation-0 no-shadow">
          <h2 class="text-h4 mb-2">{{ $t('meta.gold_factors_title') }}</h2>
          <ul class="gold-ul">
            <li class="mb-2">{{ $t('meta.gold_factor_ounce') }}</li>
            <li class="mb-2">{{ $t('meta.gold_factor_usd') }}</li>
            <li class="mb-2">{{ $t('meta.gold_factor_supply') }}</li>
            <li class="mb-2">{{ $t('meta.gold_factor_craft') }}</li>
          </ul>
        </v-card>
        <v-card class="pa-4 mb-4 elevation-0 no-shadow">
          <p>{{ $t('meta.gold_footer') }}</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GoldRichTable from '~/components/GoldRichTable.vue';
import { mapState } from 'vuex';
export default {
  name: 'GoldPage',
  components: {GoldRichTable },
  head() {
    const image = "/lirtna.jpg";
    const baseUrl = "https://sp.today";
    const fullPath = this.$route.fullPath;
    const currentUrl = `${baseUrl}${fullPath}`;
    const pathWithoutLocale = (fullPath.replace(/^\/(en|ar)(\/|$)/, "$2") || "/").replace(/^$/, "/");
    const supportedLocales = ["ar", "en"];
    return {
      title: this.$t("meta.gold_title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("meta.gold_description"),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.$t("meta.gold_description"),
        },
        {
          hid: "author",
          name: "author",
          content: "iwings",
        },
        {
          hid: "publisher",
          name: "publisher",
          content: "iwings",
        },
        {
          hid: "robots",
          name: "robots",
          content: "index, follow",
        },
        // Open Graph
        {
          hid: "og:title",
          property: "og:title",
          content: this.$t("meta.gold_title"),
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$t("meta.gold_description"),
        },
        {
          hid: "og:image",
          property: "og:image",
          content: `${baseUrl}${image}`,
        },
        { hid: "og:image:width", property: "og:image:width", content: "1200" },
        { hid: "og:image:height", property: "og:image:height", content: "630" },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: currentUrl },
        // Twitter Card
        { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.$t("meta.gold_title"),
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.$t("meta.gold_description"),
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: `${baseUrl}${image}`,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: currentUrl,
        },
        ...supportedLocales.map((locale) => ({
          rel: "alternate",
          hreflang: locale,
          href: locale === "ar" ? `${baseUrl}${pathWithoutLocale}` : `${baseUrl}/en${pathWithoutLocale}`,
        })),
        {
          rel: "alternate",
          hreflang: "x-default",
          href: `${baseUrl}${pathWithoutLocale}`,
        },
      ],
    };
  },
  async fetch({ store, i18n }) {
    // Fetch only gold data
    await store.dispatch('home/get_all', {
      locale: i18n.localeProperties.locale,
      slug: 'syrian-pounds',
    });
    await store.dispatch('home/get_all_gold', {
      currency_id: store.state.home.all.currency_id,
      city_id: store.state.home.city_id,
      locale: i18n.localeProperties.locale,
      date: new Date().toISOString().slice(0, 10),
    });
  },
  computed: {
    ...mapState({
      gold: (state) => state.home.gold,
    }),
  },
};
</script>

<style>
@media (max-width: 991px) {
  .sm-text-h4 {
    font-size: 20px !important;
  }
}
.no-shadow {
  box-shadow: none !important;
}
.gold-ul {
  margin: 0;
  padding-inline-start: 20px;
}
</style>
