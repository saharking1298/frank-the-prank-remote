<template>
    <div id="str-arg">
        <label for=""> Enter {{ argument.title }}:</label>
        <input type=text v-model="text" :placeholder="argument.title" @keydown.enter="fillNext(argument.id)" ref="focusArea" @focus="setFocusedArgument(argument.id)">
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
    inject: ['updateArgValue', 'setFocusedArgument', 'fillNext'],
    methods: {
        focusIfNeeded(focusValue) {
             if(focusValue === this.argument.id){
                this.$refs['focusArea'].focus();
            }
        },
    },
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
           this.focusIfNeeded(value);
        },
    },
    mounted() {
        this.focusIfNeeded(this.focusActivator);
    },
}
</script>

<style scoped>
#str-arg{
    color: rgba(255, 255, 255, 0.637);
}
input{
    margin-top: 3px;
    margin-left: 0px;
    margin-right: 0px;
    width: 100%;
}
</style>