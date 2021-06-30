<template>
    <div class="categories-wrapper" v-for="(categoryLine, index) in categoriesSorted" :key="index">
      <div class="feature-category" v-for="category in categoryLine" :key="category.id" @click="onCategoryClick(category.id)"> 
        <div class="text-container"> <strong> {{ category.name }} </strong> </div>
      </div>
    </div>
</template>

<script>
export default {
    emits: ["categoryClick"],
    props: {
        featureCategories: Array
    },
    data(){
    return{
        categoriesSorted: [],
    };
    },
    methods: {
        onCategoryClick(categoryId){
            this.$emit("categoryClick", categoryId);
        }
    },
    created(){
    /* Creating rows of two categories each */
    for(let i = 0; i < this.featureCategories.length; i++){
        if(i % 2 == 0){
        this.categoriesSorted.push([this.featureCategories[i]]);
        }
        else{
        this.categoriesSorted[this.categoriesSorted.length - 1].push(this.featureCategories[i]);
        }
    }
    }
}
</script>

<style scoped>
.categories-wrapper{
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}
.feature-category {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(45deg, rgb(13, 97, 97), rgb(12, 138, 138));
  color: rgb(159, 208, 228);
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  max-width: 46%;
  height: 150px;
  flex: 1;
  cursor: pointer;
}
.text-container {
  text-align: center;
}

@media screen and (min-width: 450px) {
  .feature-category {
    max-width: 200px;
  }
  .categories-wrapper{
    max-width: 450px;
  }
}
</style>