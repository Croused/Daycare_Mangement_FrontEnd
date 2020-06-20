<template>
  <b-col class="BalanceCol">
      <b-row class="BalanceHeader">
        New Balance
      </b-row>
      <b-row class="BalanceAmount">
        ${{ getPastDueBalance + getInvoice.invoiceBalance }}
      </b-row>
  </b-col>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name:'CurrentBalance',
    computed: {
      ...mapGetters(['getPastDueBalance', 'getInvoice'])
    },
  }
</script>

<style scoped>
  .BalanceHeader{
    justify-content: center;
    font-size:1.5em;
  }
  .BalanceAmount{
    justify-content: center;
    font-size:1.75em;
  }
</style>
