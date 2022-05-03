<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="flex items-center">
      <div class="flex-auto">
        <h1 class="text-xl rounded-lg font-semibold text-left">Deferment Options</h1>
      </div>
      <div class="mt-0 sm:mr-4">
        <button  v-if="!showForm" type="button" @click="addOption" class="inline-flex items-center ml-2 justify-center rounded-md border border-transparent bg-navy px-4 py-2 text-sm font-medium shadow-sm hover:bg-lightnavy text-white sm:w-auto">Add Option</button>
        <button  v-if="showForm" type="button" @click="addOption" class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 sm:w-auto">Cancel</button>
        <button type="button" @click="generateDeferment" v-if="showForm" class="inline-flex items-center ml-2 justify-center rounded-md border border-transparent bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-lightnavy focus:outline-none focus:ring-2 sm:w-auto">Generate Deferment</button>
      </div>
    </div>
    <div v-if="showForm" class="mt-5">
        <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Card -->
            <div class="p-5 shadow-md rounded-lg bg-white overflow-hidden rounded-lg">
                <div class="flex items-center">
                    <div class="w-0 flex-1">
                        <dl>
                        <dt class="text-sm font-medium text-black truncate text-left">
                            Earnest
                        </dt>
                        <dd>
                            <input type="number" v-model="custom_earnest" placeholder='$' class="shadow-sm h-10 pl-3 focus:ring-lightnavy focus:border-lightnavy block w-full sm:text-sm rounded-md" />
                        </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="p-5 shadow-md rounded-lg bg-white overflow-hidden">
                <div class="flex items-center">
                    <div class="w-0 flex-1">
                        <dl>
                        <dt class="text-sm font-medium text-black truncate text-left">
                            Number of Years
                        </dt>
                        <dd>
                            <input type="number" v-model="num_years" placeholder='#' class="shadow-sm h-10 pl-3 focus:ring-lightnavy focus:border-lightnavy block w-full sm:text-sm rounded-md" />
                        </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="p-5 shadow-md rounded-lg bg-white overflow-hidden">
                <div class="flex items-center">
                    <div class="w-0 flex-1">
                        <dl>
                        <dt class="text-sm font-medium text-black truncate text-left">
                            Interest Rate
                        </dt>
                        <dd>
                            <input type="number" v-model="interest_rate" placeholder='%' class="shadow-sm h-10 pl-3 focus:ring-lightnavy focus:border-lightnavy block w-full sm:text-sm rounded-md" />
                        </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-2 mb-5 flex flex-col rounded-lg">
      <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8 rounded-lg">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 rounded-lg">
          <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full rounded-lg">
              <thead class="bg-navy rounded-lg">
                <tr class="rounded-lg">
                  <th scope="col" class="sticky rounded-tl-lg top-0 z-5 bg-navy py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-lightgold backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Option</th>
                  <th scope="col" class="sticky top-0 z-5 bg-navy px-3 py-3.5 text-left text-sm font-semibold text-lightgold backdrop-blur backdrop-filter sm:table-cell">Payment</th>
                  <th scope="col" class="sticky top-0 z-5 bg-navy px-3 py-3.5 text-left text-sm font-semibold text-lightgold backdrop-blur backdrop-filter lg:table-cell">Installments</th>
                  <th scope="col" class="sticky rounded-tr-lg top-0 z-5 bg-navy px-3 py-3.5 text-left text-sm font-semibold text-lightgold backdrop-blur backdrop-filter">Total Revenue</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <template v-for="(option, index1) in defermentOptions" :key="index1">
                  <tr class="border-t border-gray-400">
                    <th colspan="5" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">{{option.num_years === 1 ? option.num_years + ' Year @ ' : option.num_years + ' Years @ '}}{{option.interest_rate * 100}}%</th>
                  </tr>
                  <tr class="border-gray-400 border-t">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">Earnest Payment</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(option.payments[0].amount) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left"></td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(option.payments[0].revenue) }}</td>
                  </tr>
                  <tr v-for="(payment, index2) in option.payments.slice(1, -1)" :key="index2" class="border-gray-200 border-t">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">Installment Payment {{index2 + 1}}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(payment.amount) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(payment.interest) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(payment.revenue) }}</td>
                  </tr>
                  <tr class="border-gray-200 border-t">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">Total</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(option.payments[option.payments.length - 1].amount) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(option.payments[option.payments.length - 1].interest) }}</td>
                    <td class="whitespace-nowrap px-3 font-bold py-4 text-sm text-gray-500 text-left">${{ main.commaSeparate(option.payments[option.payments.length - 1].revenue) }}</td>
                  </tr>
                </template>
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
    name: 'DefermentTable',
    setup() {
        // get pinia store
        const main = useAccountStore();
        const alertStore = useAlertStore();

        let earnest = ref(0);
        let earnestRevenue = ref(0);
        let defermentOptions = ref([]);
        let showForm = ref(false);

        //Custom variables
        const state = reactive({
            custom_earnest: null,
            num_years: null,
            interest_rate: null
        })
    
        watch(() => main.$state.acctAnalysis, function() {
            defermentOptions.value = main.getAcctAnalysis.deferment_options;
            earnest.value = defermentOptions.value[0].payments[0].amount;
            earnestRevenue.value = defermentOptions.value[0].payments[0].revenue;
        }, {deep: true});

        function addOption() {
          showForm.value = !showForm.value;
        }

        async function generateDeferment() {
            if (state.num_years < 100) {
                const user = await app.logIn(Realm.Credentials.anonymous());
                const data = await user.functions.buildDefermentObject(main.getAcctAnalysis.cash_deal.pcg_offer, this.interest_rate, defermentOptions.value.length + 1, this.num_years, this.custom_earnest);
                if (data) {
                    defermentOptions.value.push(data); // IMPORTANT: Right here defermentOptions is a reference to the store because we set it in line 137, so by pushing a new deferment, we are updating the acctAnalysis global object
                    alertStore.setSuccessMsg("Sucessfully generated deferment option")
                    this.custom_earnest = null;
                    this.num_years = null;
                    this.interest_rate = null;
                }
            }
        }

        return {
            main,
            earnest,
            earnestRevenue,
            defermentOptions,
            generateDeferment,
            addOption,
            showForm,
            ...toRefs(state)
        }
    }
}
</script>
