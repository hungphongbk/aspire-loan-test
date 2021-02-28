import Vue from "vue";

export async function get({ commit }) {
  const { data } = await Vue.axios.get("/loan/");
  commit("get", { data });
}
