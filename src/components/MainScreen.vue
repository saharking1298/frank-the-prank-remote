<template>
    <div class="fade-in">
        <top-bar :current-host="currentHost"> </top-bar>
        <features-screen v-show="currentScreen === 'features'" :feature-categories="featureCategories"> </features-screen>
        <files-screen v-if="currentScreen === 'files'"> </files-screen>
        <bottom-bar :current-screen="currentScreen" @setScreen="setScreen"> </bottom-bar>
    </div>
</template>

<script>
import TopBar from './mainScreen/TopBar.vue';
import BottomBar from './mainScreen/BottomBar.vue';
import FeaturesScreen from './mainScreen/subScreens/FeaturesScreen.vue';
import FilesScreen from './mainScreen/subScreens/FilesScreen.vue';

export default {
    components: { TopBar, FeaturesScreen, FilesScreen, BottomBar },
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
            if(!this.allFeatures[i]["arguments"]){
                this.allFeatures[i]["arguments"] = [];
            }
        }
    }
}
</script>

<style>

</style>