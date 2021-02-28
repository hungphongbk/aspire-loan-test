<template>
  <div>
    <h4>Loan Management</h4>
    <div v-if="list.length === 0" class="text-center">
      <p>
        You don't have any registered loan.
        <a href="javascript:void(0)" @click="dialog = true">Create now!</a>
      </p>
    </div>
    <loan-register v-model="dialog" />
  </div>
</template>
<script>
import LoanRegister from "components/LoanRegister";

export default {
  name: "LoanManagement",
  components: { LoanRegister },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    list() {
      return this.$store.state.loan.list;
    }
  },
  beforeMount() {
    this.$store.dispatch("loan/get");
  }
};
</script>
<style module></style>
