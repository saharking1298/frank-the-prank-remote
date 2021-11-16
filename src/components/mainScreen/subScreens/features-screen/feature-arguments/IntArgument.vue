<template>
    <div>
        <label for=""> Enter {{ argument.title }}:</label>
        <input type=number v-model="number" :placeholder="argument.title" @keydown.enter="fillNext(argument.id)" ref="focusArea" @focus="setFocusedArgument(argument.id)">
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
            if(value === this.argument.id){
                this.$refs['focusArea'].focus();
            }
        },
    }
}
</script>

<style>

</style>