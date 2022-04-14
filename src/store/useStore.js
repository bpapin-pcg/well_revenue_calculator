import {defineStore} from "pinia";

export const useAccountStore = defineStore("main", {
    // TODO: refactor this state to be more specific (ex. jst for the table stuff)
    state: () => ({
        account: {
            name: "Account",
            confirmed_email_addresses: "sample@phxcapitalgroup.com",
            total_landholding_value: 0,
            entity_type: "Account",
            _id: {}
        },
        inputs: {
            type: "Custom",
            non_prod_bbls: 300000,
            avg_oil: 55,
            latest_oil: 70,
            account_value: null
        },
        oldInputs: {
            type: "Custom",
            non_prod_bbls: 300000,
            avg_oil: 55,
            latest_oil: 70,
            account_value: null
        },
        acctAnalysis: {},
    }),
    getters: {
        getAccount: (state) => {
           return state.account
        },
        getInputs: (state) => {
            return state.inputs
        },
        getOldInputs: (state) => {
            return state.oldInputs
        },
        getAcctAnalysis: (state) => {
            return state.acctAnalysis
        }
    },
    actions: {
        resetInputs() {
            this.inputs = {
                type: "Custom",
                non_prod_bbls: 300000,
                avg_oil: 55,
                latest_oil: 70,
                account_value: this.account.total_landholding_value
            };
            this.setOldInputs();
        },
        setAccount(account) {
            this.account = account;
        },
        setInputs(inputs) {
            if (inputs.non_prod_bbls) {
                this.inputs.non_prod_bbls = inputs.non_prod_bbls;
            }
            if (inputs.avg_oil) {
                this.inputs.avg_oil = inputs.avg_oil;
            }
            if (inputs.latest_oil) {
                this.inputs.latest_oil = inputs.latest_oil;
            }
            if (inputs.account_value) {
                this.inputs.account_value = inputs.account_value
            }
        },
        setAcctAnalysis(newData) {
            this.acctAnalysis = {...this.acctAnalysis, ...newData}
        },
        commaSeparate(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        setOldInputs() {
            this.oldInputs = { ...this.inputs };
        }
    }
})