<template>
  <div class="newInvoiceForm">
    <b-form>
      <b-container class="formContainer">
        <b-row>
          <b-col class="optionSelectCol">
            <b-row>
              Select Child
              <b-form-select v-model="childID">
                <b-form-select-option
                  v-for="child in getChildren"
                  :key="child.childID"
                  :value="child.childID"
                >
                  {{ child.firstName}} {{child.lastName}}
                </b-form-select-option>
              </b-form-select>
            </b-row>
            <b-row>
              Select Care Type
              <b-form-select v-model="careTypeID">
                <b-form-select-option
                  v-for="careType in getCareTypes"
                  :key="careType.careTypeID"
                  :value="careType.careTypeID"
                >
                {{careType.label}} ${{careType.cost}}
                </b-form-select-option>
              </b-form-select>
            </b-row>
            <b-row>
              <b-col>
                Number Of Days:
              </b-col>
              <b-col>
                <b-form-spinbutton min="1" max="5" value=1 v-model="qty"></b-form-spinbutton>
              </b-col>


            </b-row>
          </b-col>
          <b-col>
            <b-row>
              Start:
              <b-form-datepicker 
                :date-disabled-fn="dateDisabled"
                :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
                v-model="startDate"
              >
              </b-form-datepicker>
            </b-row>
            <b-row>
              End:
              <b-form-datepicker 
                :date-disabled-fn="dateDisabled"
                :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
                v-model="endDate"
              >
              </b-form-datepicker>
            </b-row>
            <b-row>
              <b-col class="formBtns">
                <b-button variant="success" @click="addLine">Add</b-button>
              </b-col>
              <b-col  class="formBtns">
                <b-button variant="info">Reset</b-button>
              </b-col>
            </b-row>
          </b-col>

        </b-row>
      </b-container>
    </b-form>
  </div>
</template>


<script>
  import { mapActions, mapGetters} from 'vuex';
  export default {
    name:"NewInvoiceForm",
    data(){
      return{
        childID:6,
        careTypeID:5,
        qty:4,
        startDate:'',
        endDate:'',
        lineCost: 1
      };
    },
    computed:{
      ...mapGetters(['getInvoice', 'getChildren', 'getCareTypes'])
    },
    methods:{
      ...mapActions(['initializeChildren', 'initializeCareTypeList', 'addInvoiceLine']),
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6 || day === 13
      },
      addLine(){
        this.lineCost = this.getCareTypes.find(type =>{ return type.careTypeID === this.careTypeID}).cost * this.qty;
        let tempObj = { 
          invoiceLineID:(-1)*Math.round(((Math.random()*1000000))),
          childID: this.childID,
          careTypeID: this.careTypeID,
          careQuantity: this.qty,
          startDate: this.startDate,
          endDate: this.endDate,
          lineCost: this.lineCost
        }
        this.addInvoiceLine(tempObj);
      }
    },
    created(){
      this.initializeChildren();
      this.initializeCareTypeList();
    }

  }
</script>

<style scoped>
  .newInvoiceForm{
    border:1px solid blue;
    width: 100%;
    
  }
  .formContainer{
    border: 1px solid green;
  }
  .optionSelectCol{
    border: 1px solid red;
  }
  .formBtns{
    display: flex;
    justify-content: center;
  }
</style>