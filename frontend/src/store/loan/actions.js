import Vue from "vue";

export async function get({ commit }) {
  const { data } = await Vue.axios.get("/loan/");
  commit("get", { data });
}
export async function submit({ dispatch }, form) {
  await Vue.axios.post("/loan/submit", form);
  await dispatch("get");
}
