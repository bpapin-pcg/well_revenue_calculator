import {defineStore} from "pinia";

export const useAlertStore = defineStore("alertStore", {
    state: () => ({
        error: "",
        success: "",
        loading: false,
    }),
    getters: {
        getError: (state) => {
           return state.error
        },
        getSuccess: (state) => {
            return state.success
        },
        getLoading: (state) => {
            return state.loading
        }
    },
    actions: {
        resetError() {
            this.error = "";
        },
        resetSuccess() {
            this.success = "";
        },
        setError(msg) {
            this.error = msg;
            setTimeout(() => {this.error = ""}, 3000);
        },
        setSuccess(msg) {
            this.success = msg;
            setTimeout(() => {this.error = ""}, 3000);
        },
        setLoading(loading) {
            this.loading = loading;
            setTimeout(() => {this.loading = false}, 3000);
        }
    }
})