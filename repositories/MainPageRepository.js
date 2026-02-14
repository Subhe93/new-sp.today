// const resource = "main_pages_with_currency_prices";
const resource = "main_pages";
export default ($axios) => ({
  all(payload) {
    console.log(payload)
    return $axios.get(`${resource}`, { params: payload });
  },
  show(id) {
    return $axios.get(`${resource}/${id}`);
  },

  create(payload) {
    return $axios.post(`${resource}`, payload);
  },

  update(id, payload) {
    return $axios.post(`${resource}/${id}`, payload);
  },

  delete(id) {
    return $axios.delete(`${resource}/${id}`);
  },
});
