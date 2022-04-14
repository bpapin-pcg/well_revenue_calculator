<template>
  <div class="flex-1 flex">
    <div class="relative w-full text-gray-400 focus-within:text-gray-600">
      <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
        <SearchIcon class="h-5 ml-2 w-5" aria-hidden="true" />
      </div>
      <input class="block w-full h-full pl-8 pr-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 sm:text-sm" type="search" autocomplete="off" placeholder="Search for an Account" v-model="search" @input="onChange"/>
      <nav v-show="isOpen" class="h-96 overflow-y-auto" aria-label="Directory">
        <ul v-click-outside="handleClickOutside" role="list" class="relative text-left z-10 divide-y divide-gray-200 bg-white">
          <li v-for="result in results" :key="result._id" @click="setResult(result)">
            <div class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-300 focus-within:ring-2 focus-within:ring-inset max-h-10 focus-within:ring-indigo-500">
              <div class="flex-1 min-w-0">
                <!-- Extend touch target to entire panel -->
                <span class="absolute inset-0" aria-hidden="true" />
                <span class="['truncate', selected && 'font-semibold']">
                  {{ result.name }}
                </span>
                <span :class="['ml-2 truncate text-gray-500', active ? 'text-indigo-200' : 'text-gray-500']">
                  {{ result.confirmed_email_addresses }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>

import * as Realm from "realm-web";
import {ref, onMounted} from 'vue';
import {useAccountStore} from "../store/useStore";
import { SearchIcon } from '@heroicons/vue/solid';
import router from '../router/index.js';
import {useRoute} from 'vue-router';
const app = new Realm.App({ id: "well_revenue_calculator__dev-usdew" });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const accountCollection = mongodb.db("Dev").collection("Accounts");

const {
  BSON: { ObjectId },
} = Realm;

export default {
  name: 'SearchAutocomplete',
  components: {
    SearchIcon
  },
  setup() {
    let search = ref('');
    let results = ref([]);
    let isOpen = ref(false);
    const route = useRoute();

    const main = useAccountStore();

    function setResult(result) {
      search.value = result.name;
      main.setAccount(result);
      isOpen.value = false;
      router.push('/account/' + result._id)
    }

    onMounted(async () => {
      if (route.params.id) {
        let account = await getAccount(route.params.id)
        search.value = account.name;
        main.setAccount(account);
      }
    });

    async function getAccount(id) {
      const acct_query = { 
        _id: ObjectId(id)
      };
      const fields_to_return = {
        name: 1,
        _id: 1,
        confirmed_email_addresses: 1,
        total_landholding_value: 1,
        entity_type: 1
      }
      return await accountCollection.findOne(acct_query, fields_to_return);
    }

    async function onChange() {
      if (search.value.length !== 0) {
          let fuzzy = null;
          // activate fuzzy search only when input is greater than 4 characters
          if (search.value.length > 4) {
              fuzzy = {
                    maxEdits: 2
                }
          }
          let pipeline = [
              {
                  $search: {
                      index: "searchAccounts",
                      autocomplete: {
                        query: search.value,
                        path: 'name',
                        tokenOrder: "sequential",
                        fuzzy
                      },
                  }
              },
              {
                  $project: {
                    "name": 1,
                    "_id": 1,
                    "confirmed_email_addresses": 1,
                    "total_landholding_value": 1,
                    "entity_type": 1
                  }
              },
          ];
          let searchResults = await accountCollection.aggregate(pipeline);
          results.value = searchResults;
          isOpen.value = true;
      } else {
        isOpen.value = false;
      }
    }
    
    function handleClickOutside() {
      isOpen.value = false;
    }

    return {
      search,
      results,
      isOpen,
      setResult,
      onChange,
      handleClickOutside,
      main,
      router
    }
  }
}
</script>