<template>
    <div id="choice-arg">
        <label class="arg-title"> Choose {{ argument.title }}: </label>
        <select v-if="argument.choices.length > 10" v-model="currentChoice">
            <option v-for="(choice, index) in argument.choices" :key="index" :value="choice"> {{ choice }} </option>
        </select>
        <div v-else class="radio-section">
            <div v-for="(choice, index) in argument.choices" :key="index">
                <label class="radio-label">
                    <input type="radio" class="radio-btn" :value="choice" v-model="currentChoice">
                    <span> {{ choice }} </span>
                </label>
            </div>
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

<style scoped>
#choice-arg{
    color: rgba(255, 255, 255, 0.637);
}
input{
    width: auto;
}
.radio-btn{
    display: inline;
    margin: 0;
    margin-right: 8px;
}
.radio-label{
    margin: 0;
}
.radio-section{
    width: 100%;
}
.arg-title{
    font-size: 1.05em;
}
</style>