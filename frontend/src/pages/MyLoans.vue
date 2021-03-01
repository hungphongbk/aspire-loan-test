<template>
  <div>
    <h4>
      My Loans<q-btn
        icon="add_circle"
        push
        color="primary"
        class="q-ml-xl"
        label="Register"
        @click="dialog = true"
      ></q-btn>
    </h4>
    <div v-if="list.length === 0" class="text-center">
      <p>
        You don't have any registered loan.
        <a href="javascript:void(0)" @click="dialog = true">Create now!</a>
      </p>
    </div>
    <div v-else class="row q-gutter-sm">
      <div v-for="item in list" :class="$style.LoanItem" :key="item.id">
        <q-card flat bordered>
          <q-card-section>
            <div class="row justify-between">
              <div class="row items-center">
                <q-icon
                  name="credit_card"
                  color="primary"
                  size="2rem"
                  class="q-mr-md"
                ></q-icon>
                <div>
                  <span class="text-grey">LD0000{{ item.id }}</span>
                  <div class="text-h6">{{ item.amount }} VND</div>
                </div>
              </div>
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
            <template v-if="item.status === 'approved'">
              <hr />
              <div class="row justify-between items-center">
                <div>
                  <p>
                    <span class="text-grey">Next payment: </span
                    >{{ item.nextPayment }}
                  </p>
                  <p>
                    <span class="text-grey">Num of next payment periods: </span
                    >{{ item.term - item.paymentHistory.length }}
                  </p>
                </div>
                <q-btn
                  color="primary"
                  label="Pay"
                  push
                  size="md"
                  icon="attach_money"
                />
              </div>
            </template>
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
        approved: ["positive", "done"],
        rejected: ["positive", "error_outline"]
      }[item.status];
    })
  },
  beforeMount() {
    this.$store.dispatch("loan/get");
  }
};
</script>
<style module lang="scss">
.LoanItem {
  composes: col-6 col-md-4 from global;
  hr {
    border: none;
    height: 1px;
    background-color: #ccc;
  }
  p {
    margin-bottom: 0.3rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
