<template>
  <div>
    <!-- <v-card>
      <v-card-text> -->
    <!-- <v-btn @click="exportToPng">Export as PNG</v-btn>
    <v-btn @click="exportToPng2">Export as PNG 2</v-btn> -->
    <div
      ref="myDiv"
      class="bg-primary"
      style="
        font-family: 'Tajawal', sans-serif !important;
        border-radius: 10px;
        background: #1c4c8c;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <div
        ref="divCaption"
        style="display: none"
        class="flex-row align-center bg-primary flex-no-wrap pa-5"
      >
        <div>
          <v-img
            width="70px"
            style=""
            alt="Lirtna Logo"
            src="/lirtna-logo.png"
          />
        </div>
        <div class="white--text mr-2">
          <div class="white--text text-h4" style="line-height: 25px">
            {{ $t("exchange_title_export") }}
          </div>

          <span lass="white--text">
            {{ $moment().format("DD-MM-YYYY") }}
            {{ $t($moment().format("dddd")) }}
          </span>
        </div>
      </div>
      <v-simple-table class="tableCurrency elevationCu">
        <template v-slot:default>
          <thead>
            <tr>
              <th style="min-width: 170px" class="text-start">
                {{ $t("Currency") }}
              </th>
              <th class="text-start">{{ $t("Sell Price") }}</th>
              <th class="text-start">{{ $t("Buy Price") }}</th>
              <th ref="thHide" class="text-start">{{ $t("Exchage Rate") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in $store.state.currency_prices.all" :key="item.id">
              <td>
                <nuxt-link
                  alt="Link"
                  class="d-block text-decoration-none text-pri"
                  :to="
                    item.city
                      ? '/currency/' +
                        item.dest_currency.seo_name +
                        '/' +
                        item.city.slug
                      : '/currency/' + item.dest_currency.seo_name
                  "
                >
                  <v-img
                    alt="Flag"
                    style="vertical-align: text-bottom"
                    class="d-inline-block"
                    :src="$config.OBJURL + item.dest_currency.icon"
                    width="30px"
                  ></v-img>

                  <span class="text--bold text-pri" style="font-weight: 600">
                    {{ item.dest_currency_translations[0].name }}
                  </span>
                  <span style="text-bold text-pri" v-if="item.city"
                    >-
                    {{ item.city?.translations[0].name }}
                  </span>
                  <span
                    ><small>
                      ({{ item.dest_currency_translations[0].symbol }})</small
                    ></span
                  >
                </nuxt-link>
              </td>
              <td>
                <nuxt-link
                  alt="Link"
                  class="d-block text-decoration-none text-pri"
                  style="font-weight: 600"
                  :to="
                    item.city
                      ? '/currency/' +
                        item.dest_currency.seo_name +
                        '/' +
                        item.city.slug
                      : '/currency/' + item.dest_currency.seo_name
                  "
                >
                  {{ item.sell_price }}
                  <div class="text-caption mt-0 pt-0" style="font-weight: 400; opacity: 0.9">
                    {{ $t("currency_new") }} {{ newPrice(item.sell_price) }}
                  </div>
                </nuxt-link>
              </td>
              <td>
                <nuxt-link
                  alt="Link"
                  class="d-block text-decoration-none text-pri"
                  style="font-weight: 600"
                  :to="
                    item.city
                      ? '/currency/' +
                        item.dest_currency.seo_name +
                        '/' +
                        item.city.slug
                      : '/currency/' + item.dest_currency.seo_name
                  "
                >
                  {{ item.buy_price }}
                  <div class="text-caption mt-0 pt-0" style="font-weight: 400; opacity: 0.9">
                    {{ $t("currency_new") }} {{ newPrice(item.buy_price) }}
                  </div>
                </nuxt-link>
              </td>
              <td
                ref="tdHide"
                :class="item.change > 0 ? 'color_green' : 'color_red'"
              >
                <nuxt-link
                  alt="Link"
                  class="d-block text-decoration-none"
                  :to="
                    item.city
                      ? '/currency/' +
                        item.dest_currency.seo_name +
                        '/' +
                        item.city.slug
                      : '/currency/' + item.dest_currency.seo_name
                  "
                >
                  {{ item.change }}%
                  <v-icon
                    v-if="item.change > 0"
                    :class="item.change > 0 ? 'color_green' : ''"
                    >mdi-chevron-up</v-icon
                  >
                  <v-icon
                    v-if="item.change < 0"
                    :class="item.change < 0 ? 'color_red' : ''"
                    >mdi-chevron-down</v-icon
                  >
                  <v-icon
                    v-if="item.change === 0"
                    :class="item.change === 0 ? 'color_none' : ''"
                    >mdi-min</v-icon
                  ></nuxt-link
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "CurrencyTable",
  props: {
    currency: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    newPrice(price) {
      const num = Number(price);
      if (!Number.isFinite(num)) return "–";
      const val = num / 100;
      return val % 1 === 0 ? val.toLocaleString() : val.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 });
    },
    // async exportToPng() {
    //   const html2canvas = (await import("html2canvas")).default;
    //   const node = this.$refs.myDiv;
    //   const divCaption = this.$refs.divCaption;

    //   if (!node) {
    //     console.error("Target not found");
    //     return;
    //   }
    //   if (divCaption) {
    //     divCaption.style.display = "flex";
    //   }

    //   // Ensure fonts are loaded before rendering
    //   await document.fonts.ready;

    //   const canvas = await html2canvas(node, {
    //     useCORS: true,
    //     backgroundColor: null,
    //     scale: 2,
    //   });

    //   const dataUrl = canvas.toDataURL("image/png");

    //   const link = document.createElement("a");
    //   link.download = "export.png";
    //   link.href = dataUrl;
    //   link.click();
    // },
    async exportToPng2() {
      console.log("export");
      const domtoimage = (await import("dom-to-image-more")).default;
      const node = this.$refs.myDiv;
      const divCaption = this.$refs.divCaption;
      const thHide = this.$refs.thHide;
      const tdHideList = this.$refs.tdHide;
      node.classList.add("story-mode");
      if (!node) {
        console.error("Target not found");
        return;
      }
      if (divCaption) {
        divCaption.style.display = "flex";
        thHide.style.display = "none";
        const tdHideList = this.$refs.tdHide;
        if (Array.isArray(tdHideList)) {
          tdHideList.forEach((el) => {
            if (el && el.style) el.style.display = "none";
          });
        }
        await this.$nextTick();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      await document.fonts.ready;

      domtoimage
        .toPng(node, {
          quality: 1,
          cacheBust: true,
          useCORS: true,
          style: {
            fontFamily: window.getComputedStyle(node).fontFamily,
          },
          scale: 3,
        })
        .then((dataUrl) => {
          if (divCaption) {
            node.classList.remove("story-mode");
            divCaption.style.display = "none";
            thHide.style.display = "table-cell";
            if (Array.isArray(tdHideList)) {
              tdHideList.forEach((el) => {
                if (el && el.style) el.style.display = "table-cell";
              });
            }
          }

          const link = document.createElement("a");
          link.download =
            "Lirtna-" + this.$moment().format("DD-MM-YYYY") + ".png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          if (divCaption) {
            node.classList.remove("story-mode");
            divCaption.style.display = "none";
            thHide.style.display = "table-cell";
            if (Array.isArray(tdHideList)) {
              tdHideList.forEach((el) => {
                if (el && el.style) el.style.display = "table-cell";
              });
            }
          }
          console.error("Export failed", error);
        });
    },
  },
};
</script>
<style scoped>
.story-mode {
  width: 480px;
  height: 853px; /* 9:16 = 720:1280 */
  aspect-ratio: 9 / 16;
  overflow: hidden;
  padding: 10px;
}
.text-pri {
  color: #1c4c8c !important;
}
.color_red {
  color: #af1804;
}
.color_green {
  color: #57b14d;
}
.tableCurrency {
  width: 100%;
}
.tableCurrency tr th {
  font-weight: 500 !important;
  font-size: 16px !important;
  color: #1c4c8c !important;
  /* color: #1c4c8c !important; */
}
.elevationCu {
  border: 1px solid #99a0ab;
  border-radius: 10px !important;
}
table > thead > tr:last-child > th {
  border-bottom: 1px solid #99a0ab !important;
}
table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid rgba(0, 0, 0, 0) !important;
}
.story-mode
  table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid rgba(0, 0, 0, 0.4) !important;
}
table > tbody tr:nth-child(odd) {
  background-color: #1c4c8c09;
}
@media (max-width: 991px) {
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th,
  .v-data-table > .v-data-table__wrapper > table > thead > tr > td,
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    padding: 0 4px !important;
  }
}
</style>
