<template>
    <div class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:max-w-full lg:mx-auto lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div class="flex-1 min-w-0">
                <!-- Profile -->
                <div class="flex items-center truncate">
                    <div class="hidden h-16 w-16 rounded-full sm:block bg-navy text-white font-sans text-4xl"><p class="pt-2.5">{{main.getAccount.name[0]}}</p></div>
                    <div>
                    <div class="flex items-center">
                        <div class="sm:hidden h-16 w-16 rounded-full sm:block bg-navy text-white font-sans text-4xl"><p class="align-middle">1</p></div>
                        <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">{{main.getAccount.name}}</h1>
                    </div>
                    <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt class="sr-only">Company</dt>
                        <dd v-if="main.getAccount.confirmed_email_addresses" class="flex items-center text-sm text-gray-500 font-medium sm:mr-6">
                            <MailIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {{main.getAccount.confirmed_email_addresses}}
                        </dd>
                        <dt class="sr-only">Account type</dt>
                        <dd v-if="main.getAccount.entity_type" class="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                            <UserCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {{main.getAccount.entity_type}}
                        </dd>
                    </dl>
                    </div>
                </div>
                </div>
                <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4 h-full">
                    <button @click="main.resetInputs()" class="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                        Reset
                    </button>
                    <button type="button" @click="main.setOldInputs()" :disabled="disabled" class="mt-5 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy hover:bg-lightnavy">
                        Run Analysis
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useAccountStore} from "../store/useStore";
import { MailIcon, UserCircleIcon } from '@heroicons/vue/outline';

import { watch, ref } from 'vue';

export default {
    name: 'HeaderComponent',
    components: {
        MailIcon,
        UserCircleIcon
    },
    setup() {
        // get pinia store
        const main = useAccountStore();
        let disabled = ref(true);

        // Disable buttons if input is the same as old input
        watch(() => main.$state.inputs, function() {
            if (JSON.stringify(main.getInputs) !== JSON.stringify(main.getOldInputs)) {
                console.log("wtf")
                disabled.value = false;
            } else {
                disabled.value = true;
            }
        }, {deep: true});

        watch(() => main.$state.oldInputs, function() {
            disabled.value = true;
        }, {deep: true})

        return {
            main,
            disabled
        }
    }
}
</script>