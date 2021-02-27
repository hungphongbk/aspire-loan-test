<template>
  <div>
    <q-avatar size="2rem" color="white" text-color="primary" icon="person" />
    <span :class="$style.UserName"
      >{{ user.firstName }} {{ user.lastName }}</span
    >
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  computed: {
    user() {
      return this.$store.state.user.me;
    }
  },
  beforeMount() {
    this.$store.dispatch("user/me");
  }
};
</script>
<style module>
.UserName {
  margin-left: 0.4rem;
  font-size: 0.9rem;
}
</style>
