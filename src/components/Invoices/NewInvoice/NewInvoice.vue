<template>
  <div class="newInvoiceApp">
    <b-form 
      @submit="onSubmit($event)"
      @reset="onReset($event)"
      class="formArea"
    >
      
      <div class="clientSelectArea">
        <b-form-select class="mb-3 clientSelect" @change="selectNewParent($event)">
          <b-form-select-option 
            v-for="parent in allParents"
            :key="parent.parentID"
            :value="parent.parentID"
          >
          {{parent.firstName}} {{ parent.lastName}}
          </b-form-select-option>
        </b-form-select>
      </div>
      <b-container class="invoiceTopDiv">
        <b-row>
          <b-col class="parentInfo">
            <div class="">Name: {{getInvoiceParentInfo.firstName}} {{getInvoiceParentInfo.lastName}}</div>
            <div class="">Address: {{getInvoiceParentInfo.address}}</div>
            <div class="">Emaail Address: {{getInvoiceParentInfo.email}}</div>
          </b-col>
          <b-col>
            <b-row>
              <PastDueBalance />
              <CurrentBalance />
            </b-row>
          </b-col>
        </b-row>
        <b-row class="" >
            <NewInvoiceForm />
        </b-row>
          <b-row >
          <div class='invoiceLineRowHeader'>
            <div class="childNameHeader"> 
              Child
            </div>
            <div class="costInformationHeader">
              Week Details
            </div>
            <div class="dateRangeHeader">
              Week
            </div>
            <div class="deleteButtonHeader">
              
            </div>
          </div>
        </b-row>
        <InvoiceLine 
          v-for="line in getInvoice.invoiceLines"
          :key="line.invoiceLineID"
          :invoiceLine ="line"
        />

      </b-container>
    </b-form>
  </div>
</template>

<script>
  import PastDueBalance from "./PastDueBalance.vue";
  import CurrentBalance from "./CurrentBalance.vue";
  import NewInvoiceForm from "./NewInvoiceForm.vue";
  import InvoiceLine from './InvoiceLine.vue';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'NewInvoice',
    components:{
      PastDueBalance,
      CurrentBalance,
      NewInvoiceForm,
      InvoiceLine,
    },
    data(){
      return{
        selectedParentID: ""
      }
    },
    computed: {
      ...mapGetters(['getInvoiceParentInfo', 'getInvoice', 'allParents', 'getPastDueBalance'])
    },
    methods:{
      selectNewParent(e){
        //console.log(e.target.options[e.target.options.selectedIndex].value);
        //console.log(e);
        this.updateParentInfo(e);
        this.updateDisplayBalance(e);

      },
      onSubmit(event){
        event.preventDefault();
        console.log("Submit was pushed");
      },
      onReset(event){
        event.preventDefault();
        console.log("Reset was pushed");
      },
      ...mapActions(['initializeParents', 'initializeParent', 'updateParentInfo', 'intializePDBalance', 'updateDisplayBalance']),
    },
    created(){
      this.initializeParents();
      this.initializeParent();
      this.intializePDBalance();
    }  
      
  }
</script>

<style>
  .formArea{
    margin: 1em;
  }
  
  .newInvoiceApp{
    border: 1px solid;
    grid-column: 2/3;
    grid-row: 2/3;
    padding: 0.1em;
  }

  .clientSelectArea{
    display:flex;
    justify-content: center;


  }
  .clientSelect{
    text-align: center;
    margin-left:25%;
    margin-right: 25%;
  }
  

  .invoiceLineRowHeader{
    border: 1px solid red;
    padding: 0.1em;
    display: grid;
    grid-template-columns: 1.5fr 3fr 2fr .1fr;
    width: 100%;
  }
  .childNameHeader{
    grid-column: 1/2;
    display:flex;
    justify-content: center;
    align-items: center;
    
  }
  .costInformationHeader{
    grid-column: 2/3;
    display:flex;
    justify-content: center;
    align-items: center;
    
  }
  .dateRangeHeader{
    grid-column: 3/4;
    display:flex;
    justify-content: center;
    align-items: center;
    
  }
  .deleteButtonHeader
  {
    grid-column: 4/5;
    display:flex;
    justify-content: center;
    align-items: center;
    
  }

</style>