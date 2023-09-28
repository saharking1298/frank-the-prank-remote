<template>
  <div class="bottom-bar">
      <div class="bottom-nav-item" v-for="(screen, index) in screens" :key="screen.id" :class="{selected: currentScreen === screen.id, noBorder: index === screens.length - 1}" @click="changeScreen(screen.id)"> {{ screen.name }} </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            screens: [{name: "Features", id: "features"}, {name: "Flows", id:"flows"}, {name: "File Browser", id:"files"}]
        };
    },
    methods: {
        changeScreen(screenId){
            this.$emit('setScreen', screenId);
        }
    },
    props: ['current-screen']
}
</script>

<style scoped>
.bottom-bar {
    width: 100%;
    margin: 0;
    display: flex;
    background-color: rgb(13, 113, 113);
    position: fixed;
    left: 0;
    bottom: 0;
    color: rgb(191, 225, 238);
    border-top: 2px solid black;
}
.bottom-nav-item {
    border-right: 2px solid black;
    text-align: center;
    flex: 1;
}
.bottom-nav-item:hover {
    cursor: pointer;
}
.noBorder {
    border-right: 0px;
}
.selected {
    background-color: rgb(10, 80, 80);
    color: rgba(191, 225, 238, 0.8);
}
</style>