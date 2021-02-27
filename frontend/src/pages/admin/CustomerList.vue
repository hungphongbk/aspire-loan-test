<template>
  <div>
    <h4>Customer Management</h4>
    <q-table :data="list" :columns="columns" row-key="id">
      <template v-slot:top>
        <q-btn color="primary" label="Add new customer" />
        <q-space />
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  name: "CustomerList",
  data() {
    return {
      list: [],
      columns: [{ name: "ID" }, { name: "Name" }, { name: "E-mail" }]
    };
  }
};
</script>
<style module></style>
