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
  inject: ["hideToast"],
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
    searchFeature(searchInput){
      this.searchFilter = "title";
      this.filterText = searchInput.trim().toLowerCase();
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