<template>
    <div class="w-full px-4 sm:px-6 lg:px-8">
        <h2 class="text-lg leading-6 font-medium text-gray-900 text-left">Inputs</h2>
        <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 p-5">
            <!-- <h1 class="text-left pl-5 pt-3">Oil</h1> -->
                <!-- Card -->
                <div class="relative col-span-1 shadow-md bg-white flex">
                    <div class="p-5 bg-navy flex-shrink-0 flex items-center justify-center w-24 text-white text-sm font-medium rounded-l-md">
                        <img :src="OilBarrel" />
                    </div>
                    <div class="w-0 items-center m-auto p-5 flex-1 bg-white rounded-r-md truncate">
                        <dl>
                            <div class="inline-block w-full">
                                <dt class="text-sm font-medium text-black truncate float-left">
                                    Average Oil Price
                                </dt>
                                <button v-show="!editing_avg_oil" @click="editing_avg_oil = true;" class="float-right"> <PencilIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
                                <button v-show="editing_avg_oil" @click="editing_avg_oil = false;" class="float-right"> <XIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
                            </div>
                            <dd>
                                <input v-show="editing_avg_oil" type="number" name="avg_oil_price" id="avg_oil_ref" v-model="avg_oil_ref" @input="onChange" :placeholder="'$' + main.getOldInputs.avg_oil" class="shadow-sm h-8 pl-3 focus:ring-navy focus:border-navy block w-full sm:text-sm border-2 border-gray-200 rounded-md" />
                                <span v-show="!editing_avg_oil" @dblclick="editing_avg_oil=true" class="float-left text-2xl">${{main.getOldInputs.avg_oil}}</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="relative col-span-1 shadow-md bg-white flex">
                    <div class="p-5 bg-lightgold flex-shrink-0 flex items-center justify-center w-24 text-white text-sm font-medium rounded-l-md">
                        <img :src="CalendarMonth" />
                    </div>
                    <div class="w-0 items-center m-auto p-5 flex-1 bg-white rounded-r-md truncate">
                        <dl>
                            <div class="inline-block w-full">
                                <dt class="text-sm font-medium text-black truncate float-left">
                                    Latest Oil Price
                                </dt>
                                <button v-show="!editing_latest_oil" @click="editing_latest_oil = true;" class="float-right"> <PencilIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
                                <button v-show="editing_latest_oil" @click="editing_latest_oil = false;" class="float-right"> <XIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
                            </div>
                            <dd>
                                <input v-show="editing_latest_oil" type="number" name="latest_oil_price" id="latest_oil_ref" v-model="latest_oil_ref" @input="onChange" :placeholder="'$' + main.getOldInputs.latest_oil" class="shadow-sm h-8 pl-3 focus:ring-lightnavy focus:border-lightnavy block w-full sm:text-sm border-2 border-gray-200 rounded-md" />
                                <span v-show="!editing_latest_oil" @dblclick="editing_latest_oil=true" class="float-left text-2xl">${{main.getOldInputs.latest_oil}}</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="relative col-span-1 shadow-md bg-white flex">
                    <div class="p-5 bg-gray flex-shrink-0 flex items-center justify-center w-24 text-white text-sm font-medium rounded-l-md">
                        <img :src="FormatColorReset" />
                    </div>
                    <div class="w-0 items-center m-auto p-5 flex-1 bg-white rounded-r-md truncate">
                        <dl>
                            <div class="inline-block w-full">
                                <dt class="text-sm font-medium text-black truncate float-left">
                                    Non Producing Oil
                                </dt>
                                <button v-show="!editing_non_prod" @click="editing_non_prod = true;" class="float-right"> <PencilIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
                                <button v-show="editing_non_prod" @click="editing_non_prod = false;" class="float-right"> <XIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
                            </div>
                            <dd>
                                <input v-show="editing_non_prod" type="number" name="non_prod_bbls" id="non_prod_ref" v-model="non_prod_bbls_ref" @input="onChange" :placeholder="main.getInputs.non_prod_bbls.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' BBLs'" class="shadow-sm h-8 pl-3 focus:ring-lightgold focus:border-lightgold block w-full sm:text-sm border-2 border-gray-200 rounded-md" />
                                <span v-show="!editing_non_prod" @dblclick="editing_non_prod=true" class="float-left text-2xl">{{main.getInputs.non_prod_bbls.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' BBLs'}}</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="relative col-span-1 shadow-md bg-white flex">
                    <div class="p-5 bg-navy flex-shrink-0 flex items-center justify-center w-24 text-white text-sm font-medium rounded-l-md">
                        <img :src="Payments" />
                    </div>
                    <div class="w-0 items-center m-auto p-5 flex-1 bg-white rounded-r-md truncate">
                        <dl>
                            <div class="inline-block w-full">
                                <dt class="text-sm font-medium text-black truncate float-left">
                                    Account Value
                                </dt>
                                <button v-show="!editing_account_value" @click="editing_account_value = true;" class="float-right"> <PencilIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
                                <button v-show="editing_account_value" @click="editing_account_value = false;" class="float-right"> <XIcon class="h-5 w-5 text-black" aria-hidden="true" /> </button>
                            </div>
                            <dd>
                                <input v-show="editing_account_value" type="number" name="non_prod_oil" id="non_prod_ref" v-model="account_value_ref" @input="onChange" :placeholder="'$' + (main.getOldInputs.account_value ? main.commaSeparate(main.getOldInputs.account_value) : main.commaSeparate(main.getAccount.total_landholding_value))" class="shadow-sm h-8 pl-3 focus:ring-gray focus:border-gray block w-full sm:text-sm border-2 border-gray-200 rounded-md" />
                                <span v-show="!editing_account_value" @dblclick="editing_account_value=true" class="float-left text-2xl">${{main.getOldInputs.account_value ? main.commaSeparate(main.getOldInputs.account_value) : main.commaSeparate(main.getAccount.total_landholding_value)}}</span>
                            </dd>
                            </dl>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import * as Realm from "realm-web";
import {watch, ref, reactive, toRefs, nextTick} from 'vue';
import { PencilIcon, XIcon } from '@heroicons/vue/outline';
import FormatColorReset from '../assets/format_color_reset.svg';
import OilBarrel from '../assets/oil_barrel.svg';
import CalendarMonth from '../assets/calendar_month.svg';
import Payments from '../assets/payments.svg';
import {useAccountStore} from "../store/useStore";
import {useAlertStore} from "../store/alertStore";

const app = new Realm.App({ id: "well_revenue_calculator__dev-usdew" });

const {
  BSON: { ObjectId },
} = Realm;

export default {
    name: 'InputCards',
    components: {
        PencilIcon,
        XIcon
    },
    setup() {
        // get pinia store
        const main = useAccountStore();
        const alertStore = useAlertStore();

        let editing_avg_oil = ref(false);
        let editing_latest_oil = ref(false);
        let editing_non_prod = ref(false);
        let editing_account_value = ref(false);

        // How we need to set refs for inputs
        const initialState = {
            avg_oil_ref: null,
            latest_oil_ref: null,
            non_prod_bbls_ref: null,
            account_value_ref: null
        }

        // input fields
        let formFields = reactive({ ...initialState });

        function onChange() {
            main.setInputs({
                "non_prod_bbls": this.non_prod_bbls_ref,
                "avg_oil": this.avg_oil_ref,
                "latest_oil": this.latest_oil_ref,
                "account_value": this.account_value_ref
            });
        }
    
        // Need to do this because button is in Header Component now
        // OnClick in HeaderComponent, we set old inputs to the new ones that change onKeyUp -> look at basecamp doc
        // This is when we click the button
        watch(() => main.$state.oldInputs, function() {

            alertStore.setLoading(true);

            // Reset form fields to blank
            Object.assign(formFields, initialState);

            editing_avg_oil.value = false;
            editing_latest_oil.value = false;
            editing_non_prod.value = false;
            editing_account_value.value = false;

            reanalyzeWithInputs();
        }, {deep: true});

        async function reanalyzeWithInputs() {
            let investmentData = {};
            const user = await app.logIn(Realm.Credentials.anonymous());
            const wellRevenueData = await user.functions.calculateWellRevenues(main.getAccount._id.toString(), main.getOldInputs);
            if (main.$state.oldInputs.account_value) {
                investmentData = await user.functions.calculateInvestmentOptions(main.getAccount._id.toString(), main.getOldInputs);
            }

            const data = {...wellRevenueData, ...investmentData}
            
            main.setAcctAnalysis(data);
        }

        return {
            main,
            PencilIcon,
            XIcon,
            FormatColorReset,
            OilBarrel,
            CalendarMonth,
            Payments,
            editing_avg_oil,
            editing_latest_oil,
            editing_non_prod,
            editing_account_value,
            onChange,
            ...toRefs(formFields)
        }
    }
}
</script>
