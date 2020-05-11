<template>
    <div class="menuItem" v-on:click="menuItemClicked">
        {{itemTitle}}
    </div>
</template>

<script>
export default {
    name:'MenuItem',
    props:[
        'itemID',
        'itemTitle',
        'selected'
    ],
    methods:{
        menuItemClicked(){
            //console.log(this.itemID);
            this.$emit("update-menu-item", this.itemID);
        }
    }
}
</script>

<style scoped>
    .menuItem{
        font-size: 1.5em;
        padding-top: 0.125em;
        padding-bottom: 0.125em;
    }
</style>