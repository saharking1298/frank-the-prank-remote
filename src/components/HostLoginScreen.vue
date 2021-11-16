<template>
    <div class="background"> </div>
    <div class="host-login-screen fade-in">
        <h2> Connect To Host: </h2>
        <div class="form container credentials">
            <div class="form-group">
                <label for="host-id-input"> Enter host Id: </label>
                <input type="text" class="form-control" v-model="hostIdInput" id="host-id-input" ref="hostIdInput" @keydown.enter="focus('passwordInput')" :autocomplete="allowSuggestions ? 'on': 'off'" placeholder="Type Host Id Here...">
            </div>
            <div class="form-group">
                <label for="password-input"> Enter host password: </label>
                <input class="form-control" type="password" v-model="passwordInput" id="password-input" ref="passwordInput" placeholder="Type Host Password Here..." @keydown.enter="connect">
            </div>
            <button @click.prevent="connect" id="connect-btn"> Connect To Host </button>
        </div>
        <p class="continue" @click="setMainScreen('mainScreen')"> Or continue without connecting to host </p>
    </div>
</template>

<script>
export default {
    inject: ["setMainScreen", "connectToHost", "listen", "showToast", "hideToast", "setHostStatus"],
    watch: {
        hostIdInput(){
            this.allowSuggestions = true;
            this.hideToast();
        }
    },
    data(){
        return{
            hostIdInput: '',
            passwordInput: '',
            allowSuggestions: false,
        };
    },
    mounted(){
        this.focus("hostIdInput");
        // this.allowSuggestions = true;
    },
    methods: {
        async connect(){
            const hostId = this.hostIdInput.trim();
            const password = this.passwordInput.trim();
            let toast = {style: 'fit-style', duration: 5};
            if (hostId === ''){
                toast.message = "Please enter a host Id.";
                this.showToast(toast);
            }
            else{
                const status = await this.connectToHost(hostId, password);
                if(status.approved){
                    this.setMainScreen("mainScreen");
                    this.setHostStatus("online");
                }
                else{
                    toast.message = "Connection Failed: " + status.message;
                    this.showToast(toast);
                }
            }
        },
        focus(refName){
            this.$refs[refName].focus();
        },
    }
}
</script>

<style scoped>
.background{
    background: linear-gradient(100deg, #05445E, #0C2D48);
}
h2{
    margin-top: 16px;
    margin-bottom: 22px;
    text-align: center;
    color: rgb(123, 172, 212);
}
label{
    color: rgba(241, 249, 255, 0.788);
}
#connect-btn{
    display: block;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(63, 118, 143, 0.89);
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 15px;
    border: 2px solid rgba(119, 158, 177, 0.89);
    color: rgb(189, 206, 214);
    font-size: 1.05em;
}
.continue{
    text-align: center;
    color: rgba(241, 249, 255, 0.514);
    text-decoration: underline;
    user-select: none;
    cursor: pointer;
}
.credentials{
    margin-bottom: 30px;
}
</style>