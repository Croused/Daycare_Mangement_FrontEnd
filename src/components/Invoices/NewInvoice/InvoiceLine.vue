<template>
  <b-row class='invoiceLineRow'>
    <!-- {{invoiceLineID}}
    {{ getInvoiceLines.find(lineID=>{ return lineID.invoiceLineID == invoiceLineID}).startDate}}
     -->

      <div class="childName"> 
        {{getChildren.find( child => child.childID === invoiceLine.childID).firstName}} {{getChildren.find( child => child.childID === invoiceLine.childID).lastName}}
      </div>
      <div class="costInformation">
        {{ getCareTypes.find(types=>{ return types.careTypeID === invoiceLine.careTypeID}).label}} ${{ getCareTypes.find(types=>{ return types.careTypeID === invoiceLine.careTypeID}).cost}} x {{invoiceLine.careQuantity}} days for ${{ invoiceLine.lineCost}}
      </div>
      <div class="dateRange">
       Week Of {{invoiceLine.startDate}}
      </div>
      <div class="deleteButton">
        <b-button variant="outline-danger">X</b-button>
      </div>
  </b-row>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
  name:'InvoiceLine',
  props:[
    'invoiceLine',
  ],
  computed: {
    ...mapGetters(['getChildren', 'getCareTypes']),
  }

}
</script>

<style scoped>
  .invoiceLineRow{
    border: 1px solid red;
    padding: 0.1em;
    display: grid;
    grid-template-columns: 1.5fr 3fr 2fr .1fr;
  }
  .childName{
    grid-column: 1/2;
    display:flex;
    justify-content: center;
    align-items: center;
    
  }
  .costInformation{
    grid-column: 2/3;
    display:flex;
    justify-content: center;
    align-items: center;
    
  }
  .dateRange{
    grid-column: 3/4;
    display:flex;
    justify-content: center;
    align-items: center;
    
  }

  .deleteButton{
    grid-column: 4/5;
    display:flex;
    justify-content: center;
    align-items: center;
    
  }

</style>