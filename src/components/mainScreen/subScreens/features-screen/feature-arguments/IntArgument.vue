<template>
    <div id="int-arg">
        <label :for="argument.id + '-el'"> Enter {{ argument.title }}:</label>
        <input type=number v-model="number" :placeholder="argument.title" @keydown.enter="fillNext(argument.id)" ref="focusArea" @focus="setFocusedArgument(argument.id)" :id="argument.id + '-el'">
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
    inject: ['updateArgValue', 'fillNext', 'setFocusedArgument'],
    methods: {
        focusIfNeeded(focusValue) {
             if(focusValue === this.argument.id){
                this.$refs['focusArea'].focus();
            }
        },
    },
    data() {
        return {
            number: '',
        };
    },
    watch: {
        number() {
            let num = parseInt(this.number);
            if (isNaN(num)){
                num = undefined;
            }
            this.updateArgValue(this.argument.id, num);
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
#int-arg{
    color: rgba(255, 255, 255, 0.637);
}
input{
    margin-top: 3px;
    margin-left: 0px;
    margin-right: 0px;
    width: 100%;
}
</style>