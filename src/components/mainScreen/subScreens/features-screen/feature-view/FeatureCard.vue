<template>
    <div class="feature-card">
        <div class="info">
            <strong class="feature-name"> {{feature.name}} </strong>
            <strong class="feature-category">{{feature.categoryName}} </strong>
        </div>
        <p class="description"> {{feature.description}} </p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props: {feature: Object}
}
</script>

<style scoped>
.feature-card{
    height: fit-content;
    width: 90%;
    background-color: rgb(12, 138, 138);
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 6px;
    cursor: pointer;
}
.info{
    margin-top: 5px;
    margin-bottom: 3px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
}
.feature-name{
    margin-right: 20px;
    font-size: 1.1em;
    color: rgb(159, 215, 236);
}
.feature-category{
    text-align: left;
    font-size: 1.02em;
    color: rgb(58, 211, 127);
}
.description{
    font-size: 0.96em;
    color: rgba(240, 248, 255, 0.575);
    text-align: center;
    padding-bottom: 5px;
}
p{
    margin: 0;
}
</style>