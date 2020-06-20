<template>
  <b-col class="pastDueBalanceCol">
      <b-row class="pastDueBalanceHeader">
        Past Due
      </b-row>
      <b-row class="pastDueBalanceAmount">
        ${{ getPastDueBalance }}
      </b-row>
  </b-col>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name:'PastDueBalance',
    computed: {
      ...mapGetters(['getPastDueBalance'])
    },

  }
</script>

<style scoped>
  ;
  .pastDueBalanceHeader{
    justify-content: center;
    font-size:1.5em;
  }
  .pastDueBalanceAmount{
    justify-content: center;
    font-size:1.75em;
  }
</style>



