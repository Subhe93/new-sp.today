<template>
  <div class="mt-16 mb-16">
    <h1 class="mb-2 sm-text-h4 text-center">
      {{
        $t("meta.sitemap_title") ||
        "Sitemap - Browse all days and months of Lirtna"
      }}
    </h1>
    <h2 class="mb-8 subtitle-1 text-center grey--text">
      {{
        $t("meta.sitemap_subtitle") ||
        "Browse all available days and months for currency and gold prices on Lirtna."
      }}
    </h2>
    <v-tabs
      v-model="selectedMonth"
      background-color="primary"
      dark
      class="mb-6"
      show-arrows
      mandatory
      @change="handleMonthChange"
    >
      <v-tab
        v-for="month in months"
        :key="month.value"
        :value="month.value.toString()"
      >
        {{ month.label }}
      </v-tab>
    </v-tabs>
    <v-row v-if="daysInSelectedMonth.length" :key="selectedMonth2" dense>
      <v-col
        v-for="day in daysInSelectedMonth"
        :key="`${day.year}-${day.month}-${day.day}`"
        cols="12"
        sm="6"
      >
        <v-card :to="generateLink(day)" class="sitemap-day-link" outlined hover>
          <v-card-title>
            {{ formatDay(day) }}
            <v-spacer />
            <v-icon color="primary">mdi-chevron-right</v-icon>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <div v-else class="text-center grey--text">
      {{ $t("no_days_found") || "No days found for this month." }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SitemapCalendar",
  head() {
    const baseUrl = "https://sp.today";
    const fullPath = this.$route.fullPath;
    const currentUrl = `${baseUrl}${fullPath}`;
    // path without locale prefix (prefix_except_default: ar has no prefix)
    const pathWithoutLocale = (fullPath.replace(/^\/(en|ar)(\/|$)/, "$2") || "/").replace(/^$/, "/");
    const title =
      this.$t("meta.sitemap_title") ||
      "Sitemap - Browse all days and months of Lirtna";
    const description =
      this.$t("meta.sitemap_description") ||
      "Browse all available days and months for currency and gold prices on Lirtna.";
    const image = `${baseUrl}/lirtna.jpg`;
    const supportedLocales = ["ar", "en"];
    return {
      title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: currentUrl },
        { hid: "og:image", property: "og:image", content: image },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "twitter:title", name: "twitter:title", content: title },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        { hid: "twitter:image", name: "twitter:image", content: image },
      ],
      link: [
        { rel: "canonical", href: currentUrl },
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
  data() {
    return {
      startYear: 2025,
      startMonth: 4,
      startDay: 20,
      selectedMonth: "2025-07",
      selectedMonth2: "2025-07",
    };
  },
  computed: {
    today() {
      const now = new Date();
      return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      };
    },
    months() {
      const months = [];
      let year = this.startYear;
      let month = this.startMonth;
      while (
        year < this.today.year ||
        (year === this.today.year && month <= this.today.month)
      ) {
        months.push({
          value: `${year}-${String(month).padStart(2, "0")}`,
          label:
            this.$t("months." + String(month).padStart(2, "0")) + " " + year,
        });
        month++;
        if (month > 12) {
          month = 1;
          year++;
        }
      }
      return months;
    },
    daysInSelectedMonth() {
      if (
        typeof this.selectedMonth2 !== "string" ||
        !this.selectedMonth2.includes("-")
      ) {
        return [];
      }
      const [year, month] = this.selectedMonth2.split("-").map(Number);
      const isCurrentMonth =
        year === this.today.year && month === this.today.month;
      const lastDay = isCurrentMonth
        ? this.today.day
        : new Date(year, month, 0).getDate();
      const firstDay =
        year === this.startYear && month === this.startMonth
          ? this.startDay
          : 1;
      const days = [];
      for (let d = firstDay; d <= lastDay; d++) {
        days.push({ year, month, day: d });
      }
      return days;
    },
    isArabic() {
      // Vue 2 i18n: this.$i18n.locale
      return this.$i18n && this.$i18n.locale === "ar";
    },
  },
  mounted() {
    this.$vuetify.rtl = this.isArabic;
  },

  methods: {
    generateLink(day) {
      return `/sp/${day.year}-${String(day.month).padStart(2, "0")}-${String(
        day.day
      ).padStart(2, "0")}`;
    },
    handleMonthChange(val) {
      this.selectedMonth2 = this.months[val].value;
    },
    formatDay(day) {
      if (this.$i18n.locale === "ar") {
        return `${day.day} ${this.$t(
          "months." + String(day.month).padStart(2, "0")
        )} ${day.year}`;
      }
      return `${this.$t("months." + String(day.month).padStart(2, "0"))} ${
        day.day
      }, ${day.year}`;
    },
  },
};
</script>

<style scoped>
.sitemap-day-link {
  border-bottom: 1px solid #eee;
}
</style>
