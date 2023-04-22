<template>
    <div id="choice-arg">
        <label class="arg-title"> Choose {{ argument.title }}: </label>
        <select v-if="displayDropdown" v-model="currentChoice" class="dropdown">
            <option v-for="(choice, index) in argument.choices" :key="index" :value="index"> {{ choice }} </option>
        </select>
        <div v-else class="radio-section">
            <div v-for="(choice, index) in argument.choices" :key="index">
                <label class="radio-label">
                    <input type="radio" class="radio-btn" :value="index" v-model="currentChoice">
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
        },
        updated: {
            type: Boolean,
            required: false
        }
    },
    inject: ['updateArgValue'],
    data() {
        return {
            currentChoice: 0,
        };
    },
    computed: {
        displayDropdown() {
            if (this.argument.choices.length > 10) {
                return true;
            }
            for(let choice of this.argument.choices) {
                if (choice.length > 40) {
                    return true;
                } 
            }
            return false;
        }
    },
    methods: {
        updateChoice(choice){
            if (this.argument.translators){
                choice = this.argument.translators[choice];
            }
            else {
                choice = this.argument.choices[choice];
            }
            if(this.argument.manipulator){
                choice = this.argument.manipulator(choice);
            }
            this.updateArgValue(this.argument.id, choice);
        },
    },
    watch: {
        currentChoice(value) {
            this.updateChoice(value);
        },
        updated() {
            if (this.argument.choices.length > 0) {
                this.updateChoice(0);
            }
        }
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
.dropdown {
    width: 95%;
}
</style>