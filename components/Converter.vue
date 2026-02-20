<template>
  <div class="elevation_card">
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="text-center top_card">{{ $t("Currency Converter") }}</v-col>
      <v-col cols="12" class="ma-0 pb-0 pt-0 text-center">
        <v-row class="ma-0 pa-0">
          <v-col cols="12" class="text-center ma-0 pa-0">
            <v-radio-group v-model="radioGroup" row class="text-center flex_space_around">
              <v-radio @click="ChangePrice()" :label="$t('Buy Price')" value="buy"></v-radio>
              <v-radio @click="ChangePrice()" :label="$t('Sell Price')" value="sell"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="ma-0 pb-0 pt-0">
        <v-row class="ma-0 pa-0">
          <v-col cols="6" class="ma-0 custom_padding">
            <div class="text-center">
              <v-menu :close-on-click="closeOnClick" v-if="currency_prices[0]">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="secondary" dense class="primary--text mnue-height w-100 shadow-0" v-bind="attrs" v-on="on">
                    {{ sec_text }}
                    <v-icon dark>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(item, index) in currency_prices" :key="index" link @click="ChangePrice(item)">
                    <v-list-item-title>{{ item.dest_currency_translations[0].name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="6" class="ma-0 custom_padding">
            <v-text-field
              solo
              dense
              type="text"
              background-color="secondary"
              class="primary--text width_auto shadow-0 w-100 centered-input"
              v-model="from"
              placeholder=""
              @focus="clearInput('from')"
              @blur="restorePlaceholder('from')"
              @input="convertFrom()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-col cols="6" class="ma-0 custom_padding">
            <div class="text-center">
              <v-menu :close-on-click="closeOnClick" v-if="all.currency">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="secondary" dense class="primary--text mnue-height w-100 shadow-0" v-bind="attrs" v-on="on">
                    {{ main_text }}
                    <v-icon dark>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(item, index) in currency_prices" :key="index" link>
                    <v-list-item-title>{{ item.dest_currency_translations[0].name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="6" class="ma-0 custom_padding">
            <v-text-field
              solo
              dense
              type="text"
              background-color="secondary"
              class="primary--text width_auto shadow-0 w-100 centered-input"
              v-model="to"
              placeholder=""
              @focus="clearInput('to')"
              @blur="restorePlaceholder('to')"
              @input="convertTo()"
            ></v-text-field>

          </v-col>
          <v-row class="pa-0 ma-0">
            <v-col cols="12" class="text-center  ma-0 pt-0">
              <div v-if="toNewFormatted" class="converter-new-price mt-2">

                <span class="converter-new-price__value">{{ toNewFormatted }}</span>
                <span class="converter-new-price__unit">{{ main_text }}</span>
                <span class="converter-new-price__badge">{{ $t("currency_new") }}</span>
              </div>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      closeOnClick: true,
      radioGroup: "buy",
      from: "",
      to: "",
      buy: 0,
      sell: 0,
      main_text: "",
      sec_text: "",
      original_from: "",
      original_to: "",
    };
  },

  computed: {
    ...mapState({
      all: (state) => state.home.all,
      currency_prices: (state) => state.currency_prices.all,
    }),
    toNewFormatted() {
      const num = parseFloat(this.to);
      if (!Number.isFinite(num) || num === 0) return "";
      const val = num / 100;
      return val % 1 === 0 ? String(val) : val.toFixed(2);
    },
  },

  methods: {
    ChangePrice(item) {
      if (item) {
        this.sec_text = item.dest_currency_translations[0].name;
        this.buy = item.buy_price;
        this.sell = item.sell_price;
      }
      this.convertFrom();
    },

    convertFrom() {
      if (!this.from) {
        this.to = "";
        return;
      }
      const amount = parseFloat(this.from);
      if (!isNaN(amount)) {
        this.to = (this.radioGroup === "buy" ? amount * this.buy : amount * this.sell).toFixed(2);
      }
    },

    convertTo() {
      if (!this.to) {
        this.from = "";
        return;
      }
      const amount = parseFloat(this.to);
      if (!isNaN(amount)) {
        this.from = (this.radioGroup === "buy" ? amount / this.buy : amount / this.sell).toFixed(2);
      }
    },

    clearInput(field) {
      this[`original_${field}`] = this[field]; // حفظ القيمة الأصلية
      this[field] = ""; // مسح الحقل عند التركيز
    },

    restorePlaceholder(field) {
      if (!this[field]) {
        this[field] = this[`original_${field}`]; // استعادة القيمة الأصلية إذا لم يتم إدخال شيء جديد
      }
    },
  },

  created() {
    this.main_text = this.all.currency.translations[0].name;
    this.buy = this.currency_prices[0].buy_price;
    this.sell = this.currency_prices[0].sell_price;
    this.sec_text = this.currency_prices[0].dest_currency_translations[0].name;
    this.from = 1;
    this.ChangePrice();
  },
};
</script>

<style>
.top_card {
  border-bottom: 1px solid #99a0ab !important;
  height: 48px;
  padding: 12px 16px;
  color: #1c4c8c;
  font-weight: 500;
}
.mnue-height {
  height: 38px !important;
}
.elevation_card {
  border: 1px solid #99a0ab;
  border-radius: 10px !important;
}
.shadow-0 {
  box-shadow: unset !important;
}
.centered-input input {
  text-align: center;
}
.custom_padding {
  padding: 0px 15px !important;
}

.converter-new-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  padding: 8px 12px;
  background: linear-gradient(135deg, rgba(12, 51, 46, 0.08) 0%, rgba(12, 51, 46, 0.04) 100%);
  border-radius: 10px;
  border: 1px solid rgba(12, 51, 46, 0.15);
}
.converter-new-price__badge {
  font-size: 11px;
  font-weight: 600;
  color: #1c4c8c;
  opacity: 0.85;
  letter-spacing: 0.02em;
}
.converter-new-price__value {
  font-size: 15px;
  font-weight: 700;
  color: #1c4c8c;
  font-variant-numeric: tabular-nums;
}
.converter-new-price__unit {
  font-size: 11px;
  color: #1c4c8c;
  opacity: 0.7;
}
</style>
