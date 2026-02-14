export const state = () => ({
  all: [],
});

export const mutations = {
  SET_DATA(state, all) {
    state.all = all;
  },
  SET_DATA_CHART(state, all_chart) {
    state.all_chart = all_chart;
  },
};

export const actions = {
  async get_all({ commit }, params) {
    await this.$repositories.CurrencyPrices.all(params)
      .then((result) => {
        console.log(result.data)
        commit("SET_DATA", result.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async get_all_pages({ commit }, params) {
    await this.$repositories.CurrencyPrices.all_pages(params)
      .then((result) => {
        console.log(result.data)
        commit("SET_DATA", result.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
