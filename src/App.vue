<template>
  <div id="app">
    <router-view />
    <!-- <SearchAutocomplete />
    <InputCard />
    <ChartComponent />
    <DefermentTable />
    <div> {{ noAccounts }} </div> -->
  </div>
</template>

<script>
// import ChartComponent from './components/ChartComponent.vue'
// import SearchAutocomplete from './components/SearchAutocomplete.vue'
// import InputCard from './components/InputCard.vue'
// import DefermentTable from './components/DefermentTable.vue'
// import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    // SearchAutocomplete,
    // ChartComponent,
    // InputCard,
    // DefermentTable,
    //HomePage
  },
  setup() {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
