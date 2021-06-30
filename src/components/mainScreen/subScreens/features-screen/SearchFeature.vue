<template>
  <input type="text" v-model="searchInput" @input="search" @keydown.enter="search" placeholder="Search a feature...">
</template>

<script>
export default {
    data(){
        return{
            searchInput: ''
        }
    },
    props: {
        clearInputDetector: Boolean
    },
    watch: {
        clearInputDetector(){
            this.searchInput = '';
        }
    },
    methods: {
        search(){
            this.$emit("searchFeature", this.searchInput);
        }
    }
}
</script>

<style>
input {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: 10px;
}
</style>