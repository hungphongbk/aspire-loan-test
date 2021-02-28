<template>
  <div>
    <h4>Loan Management</h4>
    <div v-if="list.length === 0" class="text-center">
      <p>
        You don't have any registered loan.
        <a href="javascript:void(0)" @click="dialog = true">Create now!</a>
      </p>
    </div>
    <div v-else class="row q-gutter-sm">
      <div v-for="item in list" class="col-6 col-md-4" :key="item.id">
        <q-card flat bordered>
          <q-card-section>
            <div class="row justify-between">
              <div class="text-h6">{{ item.amount }} VND</div>
              <div>
                <q-icon
                  size="1.3rem"
                  :name="getItemIconAndColor(item)[1]"
                  :color="getItemIconAndColor(item)[0]"
                />
                <span
                  :class="`text-${getItemIconAndColor(item)[0]}`"
                  style="margin-left: 0.25rem;display: inline-block;vertical-align: middle"
                  >{{ item.status.toUpperCase() }}</span
                >
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <loan-register v-model="dialog" />
  </div>
</template>
<script>
import LoanRegister from "components/LoanRegister";
import { memoize } from "lodash";

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
  methods: {
    getItemIconAndColor: memoize(item => {
      return {
        pending: ["blue-grey-6", "pending"],
        success: ["positive", "done"]
      }[item.status];
    })
  },
  beforeMount() {
    this.$store.dispatch("loan/get");
  }
};
</script>
<style module></style>
