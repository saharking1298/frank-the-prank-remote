<template>
    <div>
        <label for=""> Choose {{ argument.title }}: </label>
        <!--
        <select v-model="choice">
            <option v-for="(choice, index) in argument.choices" :key="index" :value="choice"> {{ choice }} </option>
        </select>
        -->
        <div v-for="(choice, index) in argument.choices" :key="index">
            <input type="radio" :value="choice" v-model="currentChoice" :id="choice + '-el'">
            <label :for="choice + '-el'"> {{ choice }} </label>
        </div>
        
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
        const initalChoice = this.argument.choices[0];
        return {
            currentChoice: initalChoice,
        };
    },
    methods: {
        updateChoice(choice){
            if(this.argument.manipulator){
                choice = this.argument.manipulator(choice);
            }
            this.updateArgValue(this.argument.id, choice);
        },
    },
    watch: {
        currentChoice(choice) {
            this.updateChoice(choice);
        },
    },
    mounted() {
        this.updateChoice(this.currentChoice); 
    },
}
</script>

<style>

</style>