const resource = "currency_prices";
export default ($axios) => ({
  all(payload) {
    return $axios.get(`${resource}`, { params: payload });
  },
  all_pages(payload) {
    return $axios.get(`currency_price_by_pages`, { params: payload });
  },
  allChart(payload) {
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
