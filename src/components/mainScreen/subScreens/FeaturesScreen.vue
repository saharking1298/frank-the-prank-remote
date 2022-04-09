<template>
  <div id="wrapper">
    <search-feature @search-feature="searchFeature" :clear-input-detector="clearInputDetector" v-if="currentSubScreen !== 'featureSender'"> </search-feature>
    <category-view :feature-categories="featureCategories" v-if="currentSubScreen === 'featureCategories'" @category-click="onCategoryClick"> </category-view>
    <feature-view v-else-if="currentSubScreen === 'featureSearch'" :searchFilter="searchFilter" :filterText="filterText" :allCategories="featureCategories" @open-feature-sender="openFeatureSender"> </feature-view>
    <feature-sender v-else-if="currentSubScreen === 'featureSender'" :feature="featureSenderCurrent"> </feature-sender>
  </div>
</template>

<script>
import CategoryView from './features-screen/CategoryView.vue';
import FeatureView from './features-screen/FeaturesView.vue';
import SearchFeature from './features-screen/SearchFeature.vue';
import FeatureSender from './features-screen/FeatureSender.vue';
import {detectKeyCombination} from '../../../scripts/QuickBarShortcuts';
export default {
  components: { CategoryView, SearchFeature, FeatureView, FeatureSender },
  data(){
    return{
      clearInputDetector: false,
      searchFilter: 'title',
      filterText: '',
      currentSubScreen: 'featureCategories',
      featureSenderCurrent: {},
    };
  },
  props: {
    featureCategories: {
      type: Array,
      required: true
    }
  },
  inject: ["hideToast", "sendActionGlobal"],
  provide() {
    return {
      setSubScreen: this.setSubScreen,
    };
  },
  methods: {
    setSubScreen(screen){
      this.clearSearchInput();
      this.currentSubScreen = screen;
    },
    openFeatureSender(feature){
      this.featureSenderCurrent = feature;
      this.setSubScreen("featureSender")
    },
    searchFeature(searchInput, mode){
      this.filterText = searchInput.trim().toLowerCase();
      let str = searchInput.trim();
      let special = true;
      if(mode === 'enter'){
        const keyCombination = detectKeyCombination(str);

        /* Quick type */
        if(str.startsWith('"') && str.endsWith('"') && str.length > 2){
          this.sendActionGlobal("type", [str.substring(1, str.length - 1)]);
        }
        /* Key Combination */
        else if(keyCombination.detected){
          if(keyCombination.times > 1){
            this.sendActionGlobal("loop", [keyCombination.times, 0, ["keys", [keyCombination.keys]]]);
          }
          else if(keyCombination.times === 1){
            this.sendActionGlobal("keys", [keyCombination.keys]);
          }
          else{
            special = false;
          }
        }
        else{
          special = false;
        }
        if(special){
          this.setSubScreen("featureCategories");
          return;
        }
      }
      this.searchFilter = "title";
      if(this.filterText === ''){
        this.currentSubScreen = 'featureCategories';
      }
      else{
        this.currentSubScreen = "featureSearch";
      }
    },
    onCategoryClick(categoryId){
      this.searchFilter = "category";
      this.filterText = categoryId; 
      this.currentSubScreen = "featureSearch";
    },
    clearSearchInput(){
      this.clearInputDetector = !this.clearInputDetector;
    }
  },
  watch: {
    currentSubScreen(value){
      if(value !== 'featureCategories'){
        this.hideToast();
      }
    }
  },
  computed: {
    showCategories(){
      return this.searchInput === '';
    }
  }
}
</script>

<style scoped>
#wrapper{
  margin-top: 60px;
  margin-bottom: 20px;
}
</style>