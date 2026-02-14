const resource = "gold_price";
export default ($axios) => ({
  all(payload) {
    return $axios.get(`${resource}`, { params: payload });
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
