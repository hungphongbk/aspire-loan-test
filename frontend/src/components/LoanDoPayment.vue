<template>
  <q-dialog :value="open" @input="value => $emit('input', value)">
    <q-card style="min-width: 350px;">
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
export default {
  name: "LoanDoPayment",
  props: {
    open: Boolean
  },
  model: {
    prop: "open",
    event: "input"
  }
};
</script>
<style module></style>
