<template>
  <input type="text" v-model="searchInput" @input="search('keydown')" @keydown.enter="search('enter')" placeholder="Search a feature...">
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
        search(mode){
            this.$emit("searchFeature", this.searchInput, mode);
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