<template>
    <div class="flexbox">
        <i class="fas fa-arrow-left back-arrow" @click="back"></i>
        <strong> {{ outputText }} </strong>
    </div>
    <feature-card v-for="feature in filteredFeatures" :key="feature.name" :feature="feature" @click="cardClick(feature)"> </feature-card>
</template>

<script>
import FeatureCard from './feature-view/FeatureCard.vue'
export default {
    components: {
        FeatureCard
    },
    data(){
        return{
            filteredFeatures: [],
        };
    },
    computed: {
        outputText(){
            if (this.searchFilter === 'title'){
                return `Search results for "${this.filterText}"`;
            }
            else{
                const categoryName = this.allCategories.find(category => category.id === this.filterText).name;
                return `Features in "${categoryName}"`;
            }
        }
    },
    emits: ["goBack", "openFeatureSender"],
    inject: ["setSubScreen"],
    methods: {
        cardClick(feature){
            this.$emit("openFeatureSender", feature)
        },
        back(){
            this.setSubScreen('featureCategories');
        },
        filterResults(){
            const allFeatures = this.$parent.$parent.allFeatures;
            switch(this.searchFilter){
                case 'category':
                    if(this.filterText === 'all'){
                        this.filteredFeatures = allFeatures;
                    }
                    else{
                        this.filteredFeatures = allFeatures.filter(feature => feature.categoryId == this.filterText);
                    }
                    break;
                case 'title':
                    this.filteredFeatures = allFeatures.filter(feature => feature.name.indexOf(this.filterText) !== -1);
                    break;
                case 'all':
                    this.filteredFeatures = allFeatures;
                    break;
            }
        }
    },
    watch: {
        searchFilter(){
            this.filterResults();
        },
        filterText(){
            this.filterResults();
        }
    },
    props: {
        searchFilter: String,
        filterText: String,
        allCategories: Array,
    },
    created(){
        this.filterResults();
    }
}
</script>

<style scoped>
strong{
    width: 100%;
    display: block;
    text-align: center;
}
.back-arrow{
    margin-top: 3px;
    margin-left: 12px;
    color: rgb(23, 116, 119);
    cursor: pointer;
}
</style>