import Vue from "vue";

export async function login({ commit }, loginFormData) {
  const { data } = await Vue.axios.post("/auth/login", loginFormData);
  commit("login", { auth: data });
}
