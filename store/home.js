export const state = () => ({
  all: [],
  city_id: 1,
  locale: null,
  currency: [],
  lang: [],
  cities: "",
  slug: "syrian-pounds",
  translations: [],
  gold: [],
});

export const mutations = {
  SET_DATA(state, all) {
    state.all = all;
    state.lang = all.all_lang;
    state.cities = all.cities;
    state.currency = all.currency;
    state.translations = all.translations;
  },
  SET_DATA_GOLD(state, all) {
    state.gold = all;
  },
  SET_DATA_CITY_ID(state, id) {
    state.city_id = id;
  },
};

export const actions = {
  async get_all({ commit }, params) {
    await this.$repositories.MainPage.all(params)
      .then((result) => {
        commit("SET_DATA", result.data.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  change_city({ commit }, id) {
    commit("SET_DATA_CITY_ID", id);
  },
  async get_all_gold({ commit }, params) {
    await this.$repositories.Gold.all(params)
      .then((result) => {
        commit("SET_DATA_GOLD", result.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //for seo pages
  async get_all_pages({ commit }, params) {
    await this.$repositories.PagesData.all(params)
      .then((result) => {
        commit("SET_DATA", result.data.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async get_for_seo_pages_gold({ commit }, params) {
    await this.$repositories.PagesGold.all(params)
      .then((result) => {
        commit("SET_DATA_GOLD_PAGES", result.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
