import Vue from "vue";

export async function login({ commit, dispatch }, loginFormData) {
  const { data } = await Vue.axios.post("/auth/login", loginFormData);
  commit("login", { auth: data });
}
export async function me({ commit }) {
  const { data } = await Vue.axios.get("/auth/me");
  commit("me", { data });
}
