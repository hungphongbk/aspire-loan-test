import Vue from "vue";
export async function getCustomerList({ commit }) {
  const { data } = await Vue.axios.get("/admin/customers");
  commit("getCustomerList", { data });
}
export async function addCustomer({ commit, dispatch }, form) {
  await Vue.axios.post("/admin/customers", form);
  await dispatch("getCustomerList");
}
