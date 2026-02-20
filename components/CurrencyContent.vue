<template>
  <div class="currency-table">
    <h2 class="table-title">
      {{ $t("currency_table.title", { currency: currencyName }) }}
    </h2>

    <p class="table-subtitle">{{ currencyName }} {{ $t("currency_table.syp_only") }}</p>

    <table class="table">
      <thead>
        <tr>
          <th>{{ currencyName }}</th>
          <th>{{ $t("currency_table.syp_only") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="amount in amounts" :key="amount">
          <td>{{ formatNumber(amount) }} {{ currencyName }}</td>
          <td>
            {{ formatNumber(amount * rate) }} {{ $t("currency_table.syp_only") }}
            <div class="text-caption mt-0 pt-0" style="opacity: 0.9">
              {{ $t("currency_new") }} {{ formatNumber((amount * rate) / 100) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CurrencyTable",
  props: {
    currencyName: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      amounts: [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000],
    };
  },
  methods: {
    formatNumber(number) {
      return number;
    },
  },
};
</script>

<style scoped>
.currency-table {
  max-width: 100%;
  margin: 0 auto;
  padding: 24px;
}

.table-title {
  font-size: 20px;
  font-weight: 600;
  text-align: start;
  margin-bottom: 8px;
}

.table-subtitle {
  font-size: 16px;
  text-align: start;
  margin-bottom: 20px;
  color: #555;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 0;
  text-align: start;
  color: #1c4c8c;
}

th {
  font-weight: 600;
}

tbody tr:not(:last-child) td {
  border-bottom: 1px solid #eee;
}
</style>
