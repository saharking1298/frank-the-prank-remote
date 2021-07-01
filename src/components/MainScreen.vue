<template>
    <div class="fade-in">
        <top-bar :current-host="currentHost"> </top-bar>
        <features-screen v-show="currentScreen === 'features'" :feature-categories="featureCategories"> </features-screen>
        <bottom-bar :current-screen="currentScreen" @setScreen="setScreen"> </bottom-bar>
    </div>
</template>

<script>
import TopBar from './mainScreen/TopBar.vue';
export default {
    components: { TopBar },
    inject: ["featureCategories", "allFeatures"],
    provide(){
        return {
            setScreen: this.setScreen,
        };
    },
    props: {
        currentHost: {
            type: String,
            required: true
        }
    },
    data(){
        return{
            currentScreen: "features",
        };
    },
    methods: {
        setScreen(screenId){
            this.currentScreen = screenId;
        },
    },
    created() {
        for(let i = 0; i < this.allFeatures.length; i++){
            this.allFeatures[i]["categoryName"] = this.featureCategories.find(category => category.id === this.allFeatures[i].categoryId).name;
            this.allFeatures[i]["arguments"] = [];
        }
    }
}
</script>

<style>

</style>