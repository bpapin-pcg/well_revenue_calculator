<template>
    <div class="flex flex-row p-8 space-x-6">
        <div class="bg-white overflow-hidden shadow-md rounded-lg w-1/2">
            <div class="px-4 py-5 sm:p-6">
                <canvas id="well_rev_chart" />
            </div>
        </div>
        <div class="bg-white overflow-hidden shadow-md rounded-lg w-1/2">
            <div class="px-4 py-5 sm:p-6">
                <canvas id="investment_chart" />
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js'
import { buildDataObject, buildChartDatasets } from '../well-revenue-data.js'
import * as Realm from "realm-web";
import {watch, ref} from 'vue';
import { useAccountStore } from "../store/useStore";
import { useAlertStore } from "../store/alertStore";
import { onMounted } from "vue";
import { useRoute } from 'vue-router';
// import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const app = new Realm.App({ id: "well_revenue_calculator__dev-usdew" });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const accountAnalysisCollection = mongodb.db("Dev").collection("AccountAnalysis");

const {
  BSON: { ObjectId },
} = Realm;

export default {
    name: 'ChartComponent',
    setup() {
        // get pinia store
        const main = useAccountStore();
        const alertStore = useAlertStore();
        const route = useRoute();

        let wellRevenueChartData = [];
        let investmentChartData = [];
        let well_chart_labels = [`Last Reported Monthly Production Revenue @ $${main.getOldInputs.latest_oil} Oil Average`, 
                `Currently Permitted & Being Drilled Wells Revenue @ ${main.getOldInputs.non_prod_bbls.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/BBL @ $55 Oil`, 
                `Historical Well Production Revenue To Date @ $${main.getOldInputs.avg_oil} Average`, 
                `Projected Royalty Revenue Total @ $${main.getOldInputs.avg_oil} Oil Average`];
        let investment_chart_labels = ["PCG Cash Offer", "PCG Deferment Option 1 @ 8%", 
            "PCG Deferment Option 2 @ 10%",
            "PCG Investor Program After 4 Years", 
            "Personal Investment Plan @ 8% After 4 Years"];
        let well_chart_title = "Net Revenues Minus 35% Tax";
        let investment_chart_title = "Cash Deal/Investment";
        var well_rev_chart;
        var investment_chart;
    
        onMounted(() => {
            alertStore.setLoading(true);
            getChartData(route.params.id);
            // mount empty chart every page load, then update data instead of remounting when data changes
            well_rev_chart = new Chart(document.getElementById('well_rev_chart'), buildDataObject(well_chart_labels, [0, 0, 0, 0], well_chart_title));
            investment_chart = new Chart(document.getElementById('investment_chart'), buildDataObject(investment_chart_labels, [0, 0, 0, 0, 0], investment_chart_title));
        })

        watch(() => route.params.id, () => {
            // Start loading
            alertStore.setLoading(true);
            getChartData(route.params.id);
        })

         async function getChartData(account_id) {

            const acct_query = { 
                account_id: ObjectId(account_id)
            };

            const accountAnalysisData = await accountAnalysisCollection.findOne(acct_query);

            if (accountAnalysisData) {
                main.setAcctAnalysis(accountAnalysisData);
            } else {
                alertStore.setLoading(false);
                alertStore.setError("No Account Analysis found for " + account_id)
            }
        }

        watch(() => main.$state.acctAnalysis, function() {
            
            let acctAnalysis = main.getAcctAnalysis;

            // Need to initialize these again so that labels update with most current data from pinia store
            well_chart_labels = [`Last Reported Monthly Production Revenue @ $${main.getOldInputs.latest_oil} Oil Average`, 
            `Currently Permitted & Being Drilled Wells Revenue @ ${main.getOldInputs.non_prod_bbls.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/BBL @ $${main.getOldInputs.avg_oil} Oil`, 
            `Historical Well Production Revenue To Date @ $${main.getOldInputs.avg_oil} Average`, 
            `Projected Royalty Revenue Total @ $${main.getOldInputs.avg_oil} Oil Average`];

            // Need to initialize these again so that labels update with most current data from pinia store
            investment_chart_labels = ["PCG Cash Offer"];
            for (let option of acctAnalysis.deferment_options) {
                investment_chart_labels.push(`PCG Deferment Option ${option.option_number} @ ${option.interest_rate * 100}%`);
            }
            investment_chart_labels.push("PCG Investor Program After 3 Years"); 
            investment_chart_labels.push(`Personal Investment Plan @ 8% After ${acctAnalysis.personal_investment_plan.years_invested} Years`);

            formatDataForChart(acctAnalysis);
        }, {deep: true});
    
        function formatDataForChart(data) {
            //Reset chart data each time this is called
            wellRevenueChartData = [];
            investmentChartData = [];

            // Update chart datasets each time this is called
            if (well_rev_chart) {
                wellRevenueChartData.push(Math.round(data.last_month_revenue.net_revenue * 100) / 100);
                wellRevenueChartData.push(Math.round(data.non_producing_revenue.net_revenue * 100) / 100);
                wellRevenueChartData.push(Math.round(data.historical_revenue.net_revenue * 100) / 100);
                wellRevenueChartData.push(Math.round(data.projected_royalty_revenue * 100) / 100);
                well_rev_chart.config.data.datasets = buildChartDatasets(wellRevenueChartData);
                well_rev_chart.config.data.labels = well_chart_labels;
                well_rev_chart.update();
            }
            if (investment_chart) {
                investmentChartData.push(data.cash_deal.pcg_offer);
                for (let option of data.deferment_options) {
                    investmentChartData.push(Math.round(option.payments[option.payments.length - 1].revenue * 100) / 100);
                }
                investmentChartData.push(Math.round(data.a_plus.total_revenue_accrued * 100) / 100);
                investmentChartData.push(Math.round(data.personal_investment_plan.total_revenue_accrued * 100) / 100);
                investment_chart.config.data.datasets = buildChartDatasets(investmentChartData);
                investment_chart.config.data.labels = investment_chart_labels;
                investment_chart.update();
            }
            // Stop loading
            alertStore.setLoading(false);
        }
        return {
            getChartData,
            formatDataForChart
        }
    }
}
</script>
