<template>
    <div>
        <label for=""> Enter {{ argument.title }}:</label>
        <input type=text v-model="text" :placeholder="argument.title">
    </div>
</template>

<script>
export default {
    props: {
        argument: {
            type: Object,
            required: true,
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
        }
    }
}
</script>

<style>

</style>