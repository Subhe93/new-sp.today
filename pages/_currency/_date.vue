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
            <h2 class="text-h5">
              {{ $t("Currency exchange rates against the") }}
              {{ $store.state.home.all.translations[0].title }}
            </h2>
          </v-col>
          <v-col md="4" cols="12" class="text-end align-self-center">
            <v-menu offset-y v-if="cities[0]">
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
            </v-menu>
            <!-- <v-btn
              variant="plain"
              color="transparent"
              class="primary--text shadow-0"
              @click="dwonloadPng()"
              ><v-icon dark>mdi-download</v-icon></v-btn
            > -->
          </v-col>
        </v-row>
        <!-- <v-col cols="12"><AdBanner ad-slot="1432549862" /></v-col> -->
      </v-col>
      <v-col md="4" cols="12" class="align-self-center">
        <h3 class="text-h5">
          {{ $route.params.date }}
          {{ $t($moment($route.params.date).format("dddd")) }}
        </h3>
        <v-row class="flex-cont d-md-flex d-none">
          <v-col md="6">
            <nuxt-link
              alt="Link"
              class="flex-div"
              :to="
                localePath({
                  name: 'currency-date',
                  params: { currency: $route.params.currency, date: previousDate },
                })
              "
            >
              {{ $t("Previous Day") }}
              <br />
              {{ previousDate }}
            </nuxt-link>
          </v-col>

          <v-col md="6">
            <nuxt-link
              alt="Link"
              class="flex-div"
              v-if="
                $moment(new Date()).format('YYYY-MM-DD') >=
                $moment($route.params.date).add(1, 'day').format('YYYY-MM-DD')
              "
              :to="
                localePath({
                  name: 'currency-date',
                  params: {
                    currency: $route.params.currency,
                    date: $moment($route.params.date).add(1, 'day').format('YYYY-MM-DD'),
                  },
                })
              "
            >
              {{ $t("Next Day") }}
              <br />
              {{ $moment($route.params.date).add(1, "day").format("YYYY-MM-DD") }}
            </nuxt-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" cols="12" class="text-start d-md-flex d-none">
        <Converter
          :currency_prices="currency_prices"
          v-if="currency_prices[0]"
        ></Converter>
      </v-col>
      <v-col md="8" cols="12" class="text-start">
        <v-row
          class="flex-cont d-md-none d-flex mb-3"
          style="margin-top: -20px !important"
        >
          <v-col md="6">
            <nuxt-link
              alt="Link"
              class="flex-div"
              :to="
                localePath({
                  name: 'currency-date',
                  params: { currency: $route.params.currency, date: previousDate },
                })
              "
            >
              {{ $t("Previous Day") }}
              <br />
              {{ previousDate }}
            </nuxt-link>
          </v-col>

          <v-col md="6">
            <nuxt-link
              alt="Link"
              class="flex-div"
              v-if="
                $moment(new Date()).format('YYYY-MM-DD') >=
                $moment($route.params.date).add(1, 'day').format('YYYY-MM-DD')
              "
              :to="
                localePath({
                  name: 'currency-date',
                  params: {
                    currency: $route.params.currency,
                    date: $moment($route.params.date).add(1, 'day').format('YYYY-MM-DD'),
                  },
                })
              "
            >
              {{ $t("Next Day") }}
              <br />
              {{ $moment($route.params.date).add(1, "day").format("YYYY-MM-DD") }}
            </nuxt-link>
          </v-col>
        </v-row>
        <CurrencyTable ref="CurrencyTable"></CurrencyTable>
        <!-- <AdBanner ad-slot="9977254291" /> -->
      </v-col>
      <v-col md="4" cols="12" class="text-start d-md-none d-flex">
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
          <v-col md="8" cols="12" class="align-self-center">
            <h2 class="text-h5">
              {{ $t("Currency exchange rates against the") }}
              {{ $store.state.home.all.translations[0].title }}
              {{ $t("in the previous days") }}
            </h2>
          </v-col>
          <v-col md="4" cols="12" class="text-end align-self-center">
            <v-menu offset-y v-if="currency_prices[0]">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary"
                  class="primary--text shadow-0"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>mdi-chevron-down</v-icon>
                  {{ main_currency_chart.label }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in currency_prices"
                  :key="index"
                  link
                  @click="ChangeCurrency(item)"
                >
                  <v-list-item-title>{{
                    item.dest_currency_translations[0].name
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <Chart :chartOptions="chartOptions" :series="series"></Chart>
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
  name: "currency-date",
  head() {
    const baseUrl = "https://sp.today";
    const fullPath = this.$route.fullPath;
    const currentUrl = `${baseUrl}${fullPath}`;
    const pathWithoutLocale = (fullPath.replace(/^\/(en|ar)(\/|$)/, "$2") || "/").replace(/^$/, "/");
    const image = "/lirtna.jpg";
    const supportedLocales = ["ar", "en"];
    return {
      title: this.$t("meta.exchange_title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("meta.exchange_description"),
        },
        // Open Graph (Facebook, LinkedIn, etc.)
        {
          hid: "og:title",
          property: "og:title",
          content: this.$t("meta.exchange_title"),
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$t("meta.exchange_description"),
        },
        { hid: "og:image", property: "og:image", content: `${baseUrl}${image}` },
        { hid: "og:image:width", property: "og:image:width", content: "1200" },
        { hid: "og:image:height", property: "og:image:height", content: "630" },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: currentUrl },

        // Twitter Card
        { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.$t("meta.exchange_title"),
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.$t("meta.exchange_description"),
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
    console.log(params);
    var obj = {
      locale: i18n.localeProperties.locale,
      slug: params.currency,
      date: params.date,
    };
    await store.dispatch("home/get_all", obj);
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
      previousDate() {
        return this.$moment(this.$route.params.date)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
      },
      // nextDate() {
      //   return this.$moment(this.$route.params.date).add(1, "day").format("YYYY-MM-DD");
      // },
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
        .dispatch("currency_prices/get_all", {
          source_currency_id: this.all.currency_id,
          locale: this.$i18n.localeProperties.locale,
          city_id: this.city_id,
          date: this.$route.params.date,
        })
        .then(() => {
          this.getDataCart();
          this.getDataGold();
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
        date: this.$route.params.date,
      });
    },
  },
};
</script>
