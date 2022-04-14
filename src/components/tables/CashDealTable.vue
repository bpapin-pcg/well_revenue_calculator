<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900 text-left">Cash Deal</h1>
        <!-- <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p> -->
      </div>
    </div>
    <div class="mt-2 mb-5 flex flex-col">
      <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class=" ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full">
              <thead class="bg-navy">
                <tr>
                  <th scope="col" class="bg-navy rounded-tl-lg py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-lightgold sm:pl-6 lg:pl-8">Phoenix Capital Group Offer</th>
                  <th scope="col" class="bg-navy px-3 py-3.5 text-left text-sm font-semibold text-lightgold sm:table-cell">Long Term Capital Gains Tax</th>
                  <th scope="col" class="bg-navy px-3 py-3.5 text-left text-sm font-semibold text-lightgold lg:table-cell">Tax Burden</th>
                  <th scope="col" class="bg-navy rounded-tr-lg px-3 py-3.5 text-left text-sm font-semibold text-lightgold">After-Tax Profit</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-if="main.getAcctAnalysis.cash_deal" class="border-gray-400 border-t">
                    <td class="whitespace-nowrap rounded-l-lg py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">${{ main.commaSeparate(main.getAcctAnalysis.cash_deal.pcg_offer) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">{{ (main.getAcctAnalysis.cash_deal.long_term_capital_gains_tax * 100).toFixed(2) }}%</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(main.getAcctAnalysis.cash_deal.tax_burden) }}</td>
                    <td class="whitespace-nowrap rounded-r-lg px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(main.getAcctAnalysis.cash_deal.after_tax_profit) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
