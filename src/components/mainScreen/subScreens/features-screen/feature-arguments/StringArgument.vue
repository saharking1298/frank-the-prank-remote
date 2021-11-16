<template>
    <div>
        <label for=""> Enter {{ argument.title }}:</label>
        <input type=text v-model="text" :placeholder="argument.title" @keydown.enter="fillNext(argument.id)" ref="focusArea">
    </div>
</template>

<script>
export default {
    props: {
        argument: {
            type: Object,
            required: true,
        },
        focusActivator: {
            type: String,
            required: true
        }
    },
    inject: ['updateArgValue'],
    data() {
        return {
            text: '',
        };
    },
    watch: {
        text(){
            this.updateArgValue(this.argument.id, this.text);
        },
        focusActivator(value) {
            if(value === this.argument.id){
                this.$refs['focusArea'].focus();
            }
        },
    }
}
</script>

<style>

</style>