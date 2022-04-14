<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white text-left shadow overflow-hidden sm:rounded-lg w-1/2">
      <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl p-3 font-semibold text-gray-900 text-left">A Plus Investing</h1>
      </div>
    </div>
    <div v-if="main.getAcctAnalysis.a_plus" class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Years Invested</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">{{ main.getAcctAnalysis.a_plus.years_invested }}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Interest Rate</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">{{ main.getAcctAnalysis.a_plus.interest_rate * 100 }}%</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Annual Interest Revenue</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">${{ main.commaSeparate(main.getAcctAnalysis.a_plus.annual_interest_revenue) }}</dd>
        </div>
        <!-- <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Quarterly Payment</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">${{ main.commaSeparate(main.getAcctAnalysis.a_plus.quarterly_payment) }}</dd>
        </div> -->
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Interest Revenue Accrued</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">${{ main.commaSeparate(main.getAcctAnalysis.a_plus.interest_revenue_accrued) }}</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Total Revenue Accrued</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">${{ main.commaSeparate(main.getAcctAnalysis.a_plus.total_revenue_accrued) }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import * as Realm from "realm-web";
import {watch, ref, reactive, toRefs} from 'vue';
import {useAccountStore} from "../../store/useStore";
import {useAlertStore} from "../../store/alertStore";

const app = new Realm.App({ id: "well_revenue_calculator__dev-usdew" });

export default {
    name: 'CashDealTable',
    setup() {
        // get pinia store
        const main = useAccountStore();
        const alertStore = useAlertStore();

        return {
            main
        }
    }
}
</script>
