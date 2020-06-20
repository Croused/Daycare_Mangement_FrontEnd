<template>
    <div class="header">
        {{Header}}
    </div>
    
</template>



<script>
export default {
    name: 'Header',
    data(){
        return {Header:"Jen's Daycare"};
    }
}
</script>

<style scoped>
    .header{
        text-align: center;
        background-color: rgba(170, 200, 226, 1);
        font-size: 3em;
        grid-column: 1/3;
        grid-row: 1/2;
    }

</style>