export const state = () => ({
  all: [],
});

export const mutations = {
  SET_DATA(state, all) {
    state.all = all;
  },
};

export const actions = {
  async get_all({ commit }, params) {
    await this.$repositories.Chart.all(params)
      .then((result) => {
        commit("SET_DATA", result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
