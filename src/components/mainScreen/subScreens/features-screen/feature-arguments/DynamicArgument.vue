<template>
    <choice-argument :argument="result" :updated="updated"> </choice-argument>
</template>

<script>
import ChoiceArgument from './ChoiceArgument.vue';
export default {
    components: {ChoiceArgument},
    props: {
        argument: {
            type: Object,
            required: true,
        }
    },
    inject: ["hostStatus", "directTalk"],
    data(){
        return {
            result:  {
                id: this.argument.id,
                title: this.argument.title,
                dataType: "choice",
                choices: []
            },
            updated: false,

        };
    },
    async created() {
        const data = await this.directTalk("arguments.dynamic.fetch", this.argument.fetch);

        const isString = val => {
            return typeof val === 'string' || val instanceof String; 
        }

        const choiceValidators = {
            array: val => {
                // Checking if the value is an array of strings
                if (Array.isArray(val)) {
                    for(let i = 0; i < data.length; i++) {
                        if (!isString(val[i])) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            },
            object: val => {
                if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
                    for(const entry in val) {
                        const value = val[entry];
                        if (!isString(value)) {
                            return false;
                        }
                    }
                    return true; 
                }
                return false;
            }
        };

        let choices = [];
        let translators = null;

        if (choiceValidators.array(data)) {
            choices = data;
        }
        else if (choiceValidators.object(data)) {
            translators = [];
            for (let entry in data) {
                choices.push(entry);
                translators.push(data[entry]);
            }
        }
        else if (isString(data)) {
            // not
        }
       
        this.result.choices = choices;
        this.result.translators = translators;
        this.updated = true;
    }
}
</script>

<style>

</style>