import Vuex from 'vuex';
import Vue from 'vue';
import parents from './modules/Parents';
// import invoices from './modules/Invoices'
import newinvoice from './modules/NewInvoice';
//Load Vuex
Vue.use(Vuex);


//create store
export default new Vuex.Store({
    modules:{
         parents,
        // invoices
        newinvoice
    }
});
