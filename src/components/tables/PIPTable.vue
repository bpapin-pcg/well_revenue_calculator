<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white text-left shadow overflow-hidden sm:rounded-lg w-1/2">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl p-3 font-semibold text-gray-900 text-left">Personal Investment Plan</h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" @click="onSubmit" class="inline-flex items-center ml-2 justify-center rounded-md border border-transparent bg-white text-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-lightnavy hover:text-white focus:outline-none focus:ring-2 sm:w-auto">Generate PIP</button>
      </div>
    </div>
    <div v-if="main.getAcctAnalysis.personal_investment_plan" class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt class="text-sm py-5 font-medium text-gray-500">Years Invested</dt>
            <div>
              <button v-show="!editing_years" @click="editing_years = true;" class="float-right py-5"> <PencilIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
              <button v-show="editing_years" @click="editing_years = false;" class="float-right py-5"> <XIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
              <input v-show="editing_years" type="number" v-model="years_invested_ref" class="shadow-sm h-8 my-3 pl-3 focus:ring-lightgold focus:border-lightgold block w-36 sm:text-sm border-2 border-gray-200 rounded-md" />
              <dd v-show="!editing_years" @dblclick="editing_years=true" class="mt-1 py-5 text-sm text-gray-900 sm:mt-0">{{ personal_investment_plan.years_invested }}</dd>
            </div>
        </div>
        <div class="bg-white px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt class="text-sm py-5 font-medium text-gray-500">Interest Rate</dt>
            <div>
              <button v-show="!editing_interest" @click="editing_interest = true;" class="float-right py-5"> <PencilIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
              <button v-show="editing_interest" @click="editing_interest = false;" class="float-right py-5"> <XIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
              <input v-show="editing_interest" type="number" v-model="interest_rate_ref" class="shadow-sm h-8 my-3 pl-3 focus:ring-lightgold focus:border-lightgold block w-36 sm:text-sm border-2 border-gray-200 rounded-md" />
              <dd v-show="!editing_interest" @dblclick="editing_interest=true" class="mt-1 py-5 text-sm text-gray-900 sm:mt-0">{{ personal_investment_plan.interest_rate * 100 }}%</dd>
            </div>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Annual Interest Revenue</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">${{ main.commaSeparate(personal_investment_plan.annual_interest_revenue) }}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Interest Revenue Accrued</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">${{ main.commaSeparate(personal_investment_plan.interest_revenue_accrued) }}</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Total Revenue Accrued</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0">${{ main.commaSeparate(personal_investment_plan.total_revenue_accrued) }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import * as Realm from "realm-web";
import {watch, ref, reactive, toRefs} from 'vue';
import { PencilIcon, XIcon } from '@heroicons/vue/outline';
import {useAccountStore} from "../../store/useStore";
import {useAlertStore} from "../../store/alertStore";

const app = new Realm.App({ id: "well_revenue_calculator__dev-usdew" });

export default {
    name: 'PIPTable',
    components: {
      PencilIcon,
      XIcon
    },
    setup() {
        // get pinia store
        const main = useAccountStore();
        const alertStore = useAlertStore();

        let editing_years = ref(false);
        let editing_interest = ref(false);

        let personal_investment_plan = ref({});

        // Using this as onMounted, when acctAnalysis is set, we need to add the pip vales to this ref
        watch(() => main.$state.acctAnalysis, function() {
          // IMPORTANT: personal_investment_plan is now a reference to the global state, any modifications to this will change the acctAnalysis object in pinia
          personal_investment_plan.value = main.getAcctAnalysis.personal_investment_plan
        })

        // How we need to set refs for inputs
        const initialState = {
          years_invested_ref: null,
          interest_rate_ref: null
        }

        // input fields
        let formFields = reactive({ ...initialState });

        async function onSubmit() {
          const user = await app.logIn(Realm.Credentials.anonymous());

          // Only update the fields that have input values in them
          if (!this.years_invested_ref) {
            this.years_invested_ref = main.getAcctAnalysis.personal_investment_plan.years_invested;
          }
          if (!this.interest_rate_ref) {
            this.interest_rate_ref = main.getAcctAnalysis.personal_investment_plan.interest_rate;
          }
          const data = await user.functions.buildPIPObject(main.getAcctAnalysis.cash_deal.pcg_offer, this.years_invested_ref, this.interest_rate_ref);
          Object.assign(personal_investment_plan.value, data); // Remember this needs to be a deep copy so we must use object assign
        }

        return {
            main,
            editing_years,
            editing_interest,
            PencilIcon,
            XIcon,
            personal_investment_plan,
            onSubmit,
            ...toRefs(formFields)
        }
    }
}
</script>
