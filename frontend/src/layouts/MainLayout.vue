<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Aspire Loan
        </q-toolbar-title>
        <div>
          <user-info />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import UserInfo from "components/UserInfo";
export default {
  name: "MainLayout",
  components: { UserInfo },
  computed: {
    isAdmin() {
      return this.$store.getters["user/isAdmin"];
    }
  },
  // watch: {
  //   isAdmin(newVal) {
  //     if (newVal === true && !/^\/admin/.test(this.$router.currentRoute.path)) {
  //       this.$router.push("/admin");
  //     }
  //   }
  // },
  mounted() {
    if (
      this.isAdmin === true &&
      !/^\/admin/.test(this.$router.currentRoute.path)
    ) {
      this.$router.push("/admin");
    }
  }
};
</script>
