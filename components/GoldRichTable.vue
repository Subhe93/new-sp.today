<template>
  <div>
    <v-simple-table class="tableCurrency elevationCu">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-start">{{ $t('meta.gold_col_type') }}</th>
            <th class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{ $t('meta.gold_col_buy_price') }}</span>
                </template>
                <span>{{ $t('meta.gold_col_buy_price') }}</span>
              </v-tooltip>
            </th>
            <th class="text-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{ $t('meta.gold_col_sell_price') }}</span>
                </template>
                <span>{{ $t('meta.gold_col_sell_price') }}</span>
              </v-tooltip>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in $store.state.home.gold" :key="item.id">
            <td class="type-cell">
              {{ item.translations[0].title }}
            </td>
            <td class="text-center price-cell">
              {{ item.buy_price ? Number(item.buy_price).toLocaleString() : '-' }}
              <span class="text-caption">
                {{ idx === $store.state.home.gold.length - 1 ? 'USD' : item.currency_translations[0].symbol }}
              </span>
              <div v-if="!isLastRow(idx) && item.buy_price" class="gold-new-price">
                {{ $t('currency_new') }} {{ newPrice(item.buy_price) }}
              </div>
              <div v-else-if="isLastRow(idx)" class="gold-ounce-note">
                {{ $t('meta.gold_ounce_usd_note') }}
              </div>
            </td>
            <td class="text-center price-cell">
              {{ item.sell_price ? Number(item.sell_price).toLocaleString() : '-' }}
              <span class="text-caption">
                {{ idx === $store.state.home.gold.length - 1 ? 'USD' : item.currency_translations[0].symbol }}
              </span>
              <div v-if="!isLastRow(idx) && item.sell_price" class="gold-new-price">
                {{ $t('currency_new') }} {{ newPrice(item.sell_price) }}
              </div>
              <div v-else-if="isLastRow(idx)" class="gold-ounce-note">
                {{ $t('meta.gold_ounce_usd_note') }}
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  name: "GoldRichTable",
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
  overflow: hidden;
  font-family: 'Tajawal', 'Cairo', Arial, sans-serif;
}
.tableCurrency tr th, .tableCurrency tr td {
  font-size: 16px;
  padding: 12px 8px;
}
.tableCurrency th {
  font-weight: bold;
  background: #f3f6fa;
}
.tableCurrency td.text-center {
  text-align: center !important;
}
.type-cell {
  font-size: 16px;
  font-weight: 500;
  color: #0c332e;
}
.price-cell {
  font-weight: bold;
  color: #0c332e;
  font-size: 17px;
}
.tableCurrency tbody tr:nth-child(odd) {
  background-color: #f7f7fa;
}
.tableCurrency tbody tr:nth-child(even) {
  background-color: #ffffff;
}
.elevationCu {
  border: 1px solid #99a0ab;
  border-radius: 10px !important;
}
.gold-new-price {
  font-size: 12px;
  font-weight: 500;
  color: #0c332e;
  opacity: 0.88;
  margin-top: 2px;
}
.gold-ounce-note {
  font-size: 11px;
  font-weight: 500;
  color: #0c332e;
  opacity: 0.75;
  margin-top: 2px;
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
</style> 