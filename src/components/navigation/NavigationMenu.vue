<template>
    <div class="navMenu">
        <div class="menuList">
            <div v-bind:key="item.menuID" v-for="item of menuItems">
                <MenuItem v-bind:itemID="item.menuID" 
                          v-bind:itemTitle="item.menuText"
                          class="menuItem"
                          v-bind:class="{ selectedMenuItem: item.selected }"
                          v-on:update-menu-item="updateMenu" 
                />
            </div>
        </div>
    </div>
</template>


<script>
import MenuItem from "./MenuItem.vue"
export default {
    name:"NavigationMenu",
    components:{
        MenuItem
    },
    props:[
        'menuItems',
        'currentItem'
    ],
    methods:{
        updateMenu(itemID){
            this.$emit('update-menu-item', itemID)
        }
    }
}
</script>

<style scoped>
    .navMenu{
        height: 99%;
        grid-column: 1/2;
        grid-row: 2/3;
        border: 1px solid;
    }
    .menuList{
        text-align: center;
    }

    .menuItem:hover{
        background-color:rgba(195, 214, 237, 1);
    }

    .selectedMenuItem{
        background-color:rgba(170, 200, 226, 1);
        font-weight: 600;
    }
</style>