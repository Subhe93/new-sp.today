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
              background-color="secondary"
              class="primary--text width_auto shadow-0 w-100 centered-input"
              v-model="to"
              placeholder=""
              @focus="clearInput('to')"
              @blur="restorePlaceholder('to')"
              @input="convertTo()"
            ></v-text-field>
          </v-col>
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
  color: #0c332e;
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
</style>
