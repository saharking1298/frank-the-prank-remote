<template>
  <div class="custom-toast fade-in" :class="toastStyle" v-if="visible"> {{ toastMessage }} </div>
</template>

<script>
export default {
    data(){
        return {
            visible: false,
            currentTimeoutId: 0,
        };
    },
    props: {
        toastActivator: Boolean,
        toastMessage: String,
        toastStyle: String,
        toastDuration: Number,
        toastHider: Boolean,
    },
    created(){
        this.visible = true;
        this.setTimer();
    },
    watch: {
        toastActivator() {
            this.hideToast();
            this.visible = true;
            this.setTimer();
        },
        toastHider(){
            this.hideToast();
        }
    },
    methods: {
        hideToast(){
            try{
                clearTimeout(this.currentTimeoutId);
            }
            catch(e){
                /* tslint:disable:no-empty */
            }
            this.visible = false;
        },
        setTimer(){
            let that = this;
             this.currentTimeoutId = setTimeout(function(){
                that.visible = false;
            }, this.toastDuration * 1000);
        }
    }
}
</script>

<style scoped>
.custom-toast{
    position: fixed;
    width: fit-content;
    left: 50%;
    transform: translateX(-50%);
    bottom: 40px;
    padding: 3px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 30px;
    font-size: 1.05em;
    z-index: 100;
}
.red-style{
    background-color: tomato;
    border: 2px solid rgb(211, 68, 43);
    color: rgb(150, 40, 20);
}
.fit-style{
    background-color: rgb(12, 138, 138);
    color: rgb(1, 68, 68);
    border: 2px solid rgb(12, 92, 92);
}
</style>