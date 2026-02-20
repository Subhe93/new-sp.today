<template>
  <div class="mt-16 mb-16">
      <v-row>
      <v-col cols="12" md="12">
        <AdBanner ad-slot="9454834179" />
      </v-col>
    </v-row>
    <v-row class="flex-column-reverse flex-md-row-reverse">
      <v-col md="8" cols="12" class="align-self-center">
        <v-row>
          <v-col md="8" cols="12" class="align-self-center">
            <h1 class="mb-5 sm-text-h4">
              {{
                $t("currency.heading.city", {
                  currency: this.$store.state.currency_prices.all[0]
                    .dest_currency_translations[0].name,
                  city: this.$store.state.currency_prices.all[0].city.translations[0]
                    .name,
                })
              }}
            </h1>
            <h2 class="text-h5">
              {{ $t("Currency exchange rates against the") }}
              {{ $store.state.home.all.translations[0].title }}
            </h2>
          </v-col>
          <v-col md="4" cols="12" class="text-end align-self-center">
            <!-- <v-menu offset-y v-if="cities[0]" class="hidden">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary"
                  class="primary--text shadow-0"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>mdi-chevron-down</v-icon>
                  {{ current_city.label }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in cities"
                  :key="index"
                  link
                  @click="ChangeCity(item)"
                >
                  <v-list-item-title>{{ item.translations[0].name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
            <v-btn
              variant="plain"
              color="transparent"
              class="primary--text shadow-0"
              @click="dwonloadPng()"
              small
              ><v-icon dark>mdi-download</v-icon>{{ $t("image_download") }}</v-btn
            >
          </v-col>
        </v-row>
        <!-- <v-col cols="12"><AdBanner ad-slot="1432549862" /></v-col> -->
      </v-col>
      <v-col md="4" cols="12" class="align-self-center">
        <h3 class="text-h5">
          {{ $moment().format("DD-MM-YYYY") }}
          {{ $t($moment().format("dddd")) }}
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" cols="12" class="text-start d-md-block d-none">
        <Converter
          :currency_prices="currency_prices"
          v-if="currency_prices[0]"
        ></Converter>
      </v-col>
      <v-col md="8" cols="12" class="text-start">
        <CurrencyTable ref="CurrencyTable"></CurrencyTable>
        <p class="color-black mt-8 mb-8">
          {{
            $t("currency.paragraph.city", {
              currency: this.$store.state.currency_prices.all[0]
                .dest_currency_translations[0].name,
              city: this.$store.state.currency_prices.all[0].city.translations[0].name,
            })
          }}
        </p>
        <hr />
        <CurrencyContent
          :currencyName="
            this.$store.state.currency_prices.all[0].dest_currency_translations[0].name
          "
          :rate="this.$store.state.currency_prices.all[0].buy_price"
        ></CurrencyContent>
        <!-- <AdBanner ad-slot="9977254291" /> -->
      </v-col>
      <v-col md="4" cols="12" class="text-start d-md-none d-block">
        <Converter
          :currency_prices="currency_prices"
          v-if="currency_prices[0]"
        ></Converter>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" cols="12" class="text-start">
        <!-- <Gold :gold="gold"></Gold> -->
      </v-col>
      <v-col md="8" cols="12" class="text-start">
        <v-row>
          <v-col cols="12">
            <!-- <Chart :chartOptions="chartOptions" :series="series"></Chart> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdBanner from "~/components/AdBanner.vue";
import { mapState } from "vuex";
export default {
  name: "index",
  head() {
    const baseUrl = "https://sp.today";
    const fullPath = this.$route.fullPath;
    const currentUrl = `${baseUrl}${fullPath}`;
    const pathWithoutLocale = (fullPath.replace(/^\/(en|ar)(\/|$)/, "$2") || "/").replace(/^$/, "/");
    const image = "/lirtna.jpg";
    const supportedLocales = ["ar", "en"];
    const metaData = {
      title: this.$t("currency.metaTitle.city", {
        currency: this.$store.state.currency_prices.all[0].dest_currency_translations[0]
          .name,
        city: this.$store.state.currency_prices.all[0].city.translations[0].name,
      }),
      description: this.$t("currency.metaDescription.city", {
        currency: this.$store.state.currency_prices.all[0].dest_currency_translations[0]
          .name,
        city: this.$store.state.currency_prices.all[0].city.translations[0].name,
      }),
    };
    return {
      title: metaData.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: metaData.description,
        },
        // Open Graph (Facebook, LinkedIn, etc.)
        {
          hid: "og:title",
          property: "og:title",
          content: metaData.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: metaData.description,
        },
        { hid: "og:image", property: "og:image", content: `${baseUrl}${image}` },
        { hid: "og:image:width", property: "og:image:width", content: "1200" },
        { hid: "og:image:height", property: "og:image:height", content: "630" },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: currentUrl },

        // Twitter Card
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: metaData.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: metaData.description,
        },
        { hid: "twitter:image", name: "twitter:image", content: `${baseUrl}${image}` },
      ],
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
      current_city: {
        label: "",
        value: "",
      },
      main_currency_chart: {
        label: "",
        value: "",
      },
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            autoSelected: "pan",
            show: false,
          },
        },
        grid: {
          borderColor: "rgba(135, 135, 135, 0.21)",
          // clipMarkers: true,
          strokeDashArray: 7,
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {},
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
      items: [{ title: "Click Me" }],
    };
  },
  components: {
    AdBanner,
    // Banner: () => import("@/components/shared/lp-banner/Banner"),
  },
  async fetch({ store, i18n, params }) {
    var obj = {
      locale: i18n.localeProperties.locale,
      seo_name: params.currency,
      city: params.city,
    };
    await store.dispatch("home/get_all", obj);
    await store.dispatch("currency_prices/get_all_pages", {
      locale: i18n.localeProperties.locale,
      seo_name: params.currency,
      city: params.city,
    });
  },
  computed: {
    ...mapState({
      currency_prices: (state) => {
        return state.currency_prices.all;
      },
      all: (state) => {
        return state.home.all;
      },
      chart: (state) => {
        return state.chart.all;
      },
      cities: (state) => {
        return state.home.cities;
      },
      city_id: (state) => {
        return state.home.city_id;
      },
      currency_id: (state) => {
        return state.home.currency_id;
      },
      locale: (state) => {
        return state.home.locale;
      },
      gold: (state) => {
        return state.home.gold;
      },
    }),
  },
  created() {
    this.getData();
    this.current_city.label = this.cities[0].translations[0].name;
    this.current_city.value = this.cities[0].id;
  },
  methods: {
    dwonloadPng() {
      this.$refs.CurrencyTable.exportToPng2();
    },
    ChangeCurrency(item) {
      this.main_currency_chart.label = item.dest_currency_translations[0].name;
      this.main_currency_chart.value = item.dest_currency.id;
      this.getDataCart(this.main_currency_chart.value);
    },
    ChangeCity(item) {
      this.current_city.label = item.translations[0].name;
      this.current_city.value = item.id;
      this.$store.dispatch("home/change_city", item.id);
      this.getData();
      this.getDataCart();
      this.getDataGold();
    },
    async getData() {
      await this.$store
        .dispatch("currency_prices/get_all_pages", {
          // source_currency_id: this.all.currency_id,
          locale: this.$i18n.localeProperties.locale,
          seo_name: this.$route.params.currency,
          city: this.$route.params.city,
          // city_id: this.city_id,
          // date: this.$moment().format("YYYY-MM-DD"),
        })
        .then(() => {
          // this.getDataCart();
          // this.getDataGold();
          this.main_currency_chart.label = this.currency_prices[0].dest_currency_translations[0].name;
          this.main_currency_chart.value = this.all.currency_id;
        })
        .catch(() => {});
    },
    async getDataCart(item) {
      await this.$store.dispatch("chart/get_all", {
        source_currency_id: this.all.currency_id,
        dest_currency_id: item ? item : this.currency_prices[0].dest_currency_id,
        city_id: this.city_id,
      });
      this.series = [];
      this.series.push({
        name: this.all.currency.translations[0].name,
        data: this.chart.value,
      });
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            type: "datetime",
            categories: [],
          },
        },
      };
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            type: "datetime",
            categories: this.chart.date,
          },
        },
      };
    },
    async getDataGold() {
      await this.$store.dispatch("home/get_all_gold", {
        currency_id: this.all.currency_id,
        city_id: this.city_id,
        locale: this.$i18n.localeProperties.locale,
        date: this.$moment().format("YYYY-MM-DD"),
      });
    },
  },
};
</script>
<style>
@media (max-width: 991px) {
  .sm-text-h4 {
    font-size: 20px !important;
  }
}
.color-black {
  color: #1c4c8c;
}
</style>
