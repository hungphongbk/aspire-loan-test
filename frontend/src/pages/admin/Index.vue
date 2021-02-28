<template>
  <div :class="$style.AdminPage">
    <q-drawer :value="true" show-if-above :width="200" :breakpoint="500">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable>
            <router-link to="/admin/customers">Customers</router-link>
          </q-item>
          <q-item clickable>
            <router-link to="/admin/loans">Loans</router-link>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </div>
</template>
<script>
export default {
  name: "IndexAdmin"
};
</script>
<style module lang="scss">
.AdminPage a {
  &,
  &:hover,
  &:focus,
  &:visited {
    text-decoration: none;
    color: inherit;
  }
}
</style>
