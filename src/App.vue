<template>
  <div class="application">
    <Header />
    <!-- <div class="contentArea"> -->
      <NavigationMenu v-bind:menuItems="menuItems" 
                      v-on:update-menu-item="updateSelectedMenu"
      />
      <component :is="currentApp"></component>
    </div>
  <!-- </div> -->
</template>

<script>

import Header from "./components/header/Header.vue";
import NavigationMenu from "./components/navigation/NavigationMenu.vue";
// import Invoices from './components/Invoices/Invoices.vue';
import NewInvoice from './components/Invoices/NewInvoice/NewInvoice.vue';
import Clients from './components/Clients/Clients.vue';

export default {
  name: 'App',
  components: {
    Header,
    NavigationMenu,
    NewInvoice,
    // Invoices,
    Clients,
    
  },
  data(){
    return {
      menuItems:[
        {
          menuID: 'newInvoice',
          menuText: 'New Invoices',
          selected: true,
          componentName:"NewInvoice" 
        },
        {
          menuID:'clients',
          menuText: 'Clients',
          selected: false,
          componentName:"Clients"

        },

      ],
      currentApp: "NewInvoice"
      
    }
  },
  methods: {
    updateSelectedMenu(itemID){
      this.menuItems.map(menuItem=>{
        if(menuItem.menuID === itemID){
          menuItem.selected = true;
          this.updateMenu();    
        
        } else {
          menuItem.selected = false;
        }
        
        
      })
    },
    updateMenu(){
      let menuItem = this.menuItems.find(menuItem =>{ return menuItem.selected === true})
      this.currentApp = menuItem.componentName

    },

  }
}
</script>





<style>

  *{
    background-color: rgba(225, 230, 249, 1);
    color: rgba(54, 93, 128, 1);
    margin:0;

  }

  .application{
    height: 100vh;
    /* max-width: 1200px; */
    display: grid;
    grid-template-columns: 180px 10fr;
    grid-template-rows:  10fr 80fr;

  }

  

</style>