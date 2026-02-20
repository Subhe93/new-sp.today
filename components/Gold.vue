<template>
  <div>
    <v-simple-table class="tableCurrency elevationCu">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-start w-25"></th>
            <th class="text-center w-50">{{ $t("Gold Price") }}</th>
            <th class="text-start w-25"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in $store.state.home.gold" :key="item.id">
            <td>
              {{ item.translations[0].title }}
            </td>
            <td
              class="text-center"
              :class="item.change > 0 ? 'color_green' : 'color_red'"
            >
              {{ item.price }}
              <v-icon v-if="item.change > 0" :class="item.change > 0 ? 'color_green' : ''"
                >mdi-chevron-up</v-icon
              >
              <v-icon v-if="item.change < 0" :class="item.change < 0 ? 'color_red' : ''"
                >mdi-chevron-down</v-icon
              >
              <v-icon
                v-if="item.change === 0"
                :class="item.change === 0 ? 'color_none' : ''"
                >mdi-min</v-icon
              >
              <div v-if="!isLastRow(idx) && item.price" class="gold-new-price">
                {{ $t('currency_new') }} {{ newPrice(item.price) }}
              </div>
              <div v-else-if="isLastRow(idx)" class="gold-ounce-note">
                {{ $t('meta.gold_ounce_usd_note') }}
              </div>
            </td>
            <td>
              {{ isLastRow(idx) ? 'USD' : item.currency_translations[0].symbol }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  name: "GoldTable",
  methods: {
    isLastRow(idx) {
      return idx === this.$store.state.home.gold.length - 1;
    },
    newPrice(price) {
      const num = Number(price);
      if (!Number.isFinite(num)) return "–";
      const val = num / 100;
      return val % 1 === 0 ? val.toLocaleString() : val.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 });
    },
  },
};
</script>
<style scoped>
.color_red {
  color: #af1804;
}
.color_green {
  color: #57b14d;
}
.color_none {
  color: #888;
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
.gold-new-price {
  font-size: 12px;
  font-weight: 500;
  color: #1c4c8c;
  opacity: 0.88;
  margin-top: 2px;
}
.gold-ounce-note {
  font-size: 11px;
  font-weight: 500;
  color: #1c4c8c;
  opacity: 0.75;
  margin-top: 2px;
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
.w-25 {
  width: 25% !important;
}
.w-50 {
  width: 50% !important;
}
</style>
