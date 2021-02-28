<template>
  <q-layout view="hHh Lpr lff">
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
    <router-view />
  </q-layout>
</template>

<script>
import UserInfo from "components/UserInfo";
export default {
  name: "MainLayout",
  components: { UserInfo }
};
</script>
