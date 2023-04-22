<template>
    <div class="background"> </div>
    <div class="feature-sender fade-in">
        <div class="flexbox">
            <i class="fas fa-arrow-left back-arrow" @click="back"></i>
            <h2> Send an action: {{ feature.name }} </h2>
        </div>
        <div class="description">
             <h3 class="description-heading"> Feature Description: </h3>
            <span class="info"> {{ feature.description }}. </span>
        </div>
        <h3 class="argument-heading"> Arguments </h3>
        <div v-if="feature.arguments.length > 0" class="arguments-section">
            <div v-for="argument in feature.arguments" :key="argument.id">
                <int-argument v-if="argument.dataType === 'int'" :argument="argument" :focusActivator="focusedArgument"> </int-argument>
                <float-argument v-else-if="argument.dataType === 'float'" :argument="argument"> </float-argument>
                <string-argument v-else-if="argument.dataType === 'string'" :argument="argument" :focusActivator="focusedArgument">

                </string-argument>
                <text-argument v-else-if="argument.dataType === 'text'" :argument="argument"> </text-argument>
                <choice-argument v-else-if="argument.dataType === 'choice'" :argument="argument"> </choice-argument>
                 <dynamic-argument v-else-if="argument.dataType === 'dynamic'" :argument="argument"> </dynamic-argument>
            </div>
        </div>
        <p v-else class="info"> Looks like this feature doesn't take any arguments. <br>
                                You can send it right away!
        </p>
    </div>
    <button @click="sendAction" id="send-btn"> Send Action! </button>
</template>

<script>
import ChoiceArgument from './feature-arguments/ChoiceArgument.vue';
import FloatArgument from './feature-arguments/FloatArgument.vue';
import IntArgument from './feature-arguments/IntArgument.vue';
import StringArgument from './feature-arguments/StringArgument.vue';
import TextArgument from './feature-arguments/TextArgument.vue';
import DynamicArgument from './feature-arguments/DynamicArgument.vue';
export default {
    components: { StringArgument, TextArgument, FloatArgument, ChoiceArgument, IntArgument, DynamicArgument },
    data() {
        return {
            argumentValues: [],
            argumentNames: [],
            argTypes: {int: 0, float: 0.0, string: '', text: '', choice: ''},
            focusedArgument: '',
        };
    },
    created() {
        for(let arg in this.feature.arguments){
            this.argumentValues.push(this.argTypes[arg.dataType]);
            this.argumentNames.push(this.feature.arguments[arg].id);
        }
        if(this.feature.arguments.length > 0){
            this.fillNext();
        }
    },
    provide() {
        return {
            updateArgValue: this.updateArgValue,
            fillNext: this.fillNext,
            setFocusedArgument: this.setFocusedArgument,
        };
    },
    props: {
        feature: {
           type: Object,
            // required: true,
        }
    },
    inject: ["showToast", "setSubScreen", "directTalk", "sendActionGlobal"],
    methods: {
        updateArgValue(argName, argValue){
            let i = this.argumentNames.findIndex(value => {
                return value === argName;
            });
            this.argumentValues[i] = argValue;
        },
        sendAction(){
            if(this.argsValid()){
                this.sendActionGlobal(this.feature.name, this.argumentValues);
                this.setSubScreen("featureCategories");
            }
        },
        setFocusedArgument(value){
            this.focusedArgument = value;
        },
        argsValid(){
            let valid = true;
            for(let i = 0; i < this.feature.arguments.length; i++){
                if([undefined, ''].includes(this.argumentValues[i])){
                    valid = false;
                    break;
                }
            }
            return valid;

        },
        fillNext(argName){
            let index = this.argumentNames.findIndex(value => value === argName);
            let valid = this.argsValid();
            if(index === this.argumentNames.length - 1){
                if(valid){
                    this.sendAction();
                }
            }
            else{
                this.focusedArgument = this.argumentNames[index + 1];
            }
        },
        back(){
            this.setSubScreen("featureSearch");
        },
        focus(refName){
            this.$refs[refName].focus();
        },
    }
}
</script>

<style scoped>
h2{
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4px;
    color: rgba(232, 255, 255, 0.904);
}
h3{
    margin: 0;
    color: rgba(240, 248, 255, 0.836);
}
#send-btn{
    display: block;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 60px;
    cursor: pointer;
    background-color: rgb(26, 86, 90);
    padding-right: 12px;
    padding-left: 12px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 30px;
    font-size: 1.09em;
    color: rgba(194, 248, 255, 0.89);
    font-weight: 600;
    border: 2px solid rgb(5, 67, 71);
}
.description{
    margin-bottom: 6px;
}
.arguments-section{
    margin-top: 10px;
}

.background{
    background-image: linear-gradient(45deg,rgb(26, 86, 90), rgb(38, 141, 148), rgb(38, 141, 148));
    top: 50px;
}
.feature-sender{
    min-height: calc(100vh - 110px);
    margin-left: 10px;
    margin-right: 10px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgba(23, 116, 119, 0.568);
    background: rgba(255, 255, 255, 0.055);
    box-shadow: 0 0 2px 2px rgba(23, 116, 119, 0.568);
}
.back-arrow{
    margin-top: 3px;
    margin-left: 12px;
    color: rgb(18, 98, 109);
    cursor: pointer;
}
.info{
    margin-top: 5px;
    margin-bottom: 3px;
    font-size: 0.97em;
    color: rgba(255, 255, 255, 0.699);
}
</style>