<template>
    <div class="top-bar">
        <i class="fas fa-cog settings" @click="openSettings"></i>
        <span> {{ hostConnectionStatus }} </span>
        <status-indicator :status="hostStatus.status"> </status-indicator>
        <i class="fas fa-sign-in-alt log-out" @click="logOut"></i>
    </div>
</template>

<script>
import StatusIndicator from '../StatusIndicator.vue';
export default {
    components: { StatusIndicator },
    methods: {
        openSettings(){
            this.setMainScreen("settingsScreen");
        },
        logOut(){
            this.logoutFromHost();
            this.setMainScreen("hostLoginScreen");
        }
    },
    computed: {
        hostConnectionStatus(){
            if(this.currentHost === ''){
                return("Not connected to host");
            }
            else{
                return("Connected to host: " + this.currentHost);
            }
        }
    },
    inject: ["setMainScreen", "hostStatus", "setHostStatus", "io", "logoutFromHost"],
    props: ["current-host"]
}
</script>

<style scoped>
.top-bar{
    background-image: linear-gradient(45deg, rgb(12, 138, 138), rgb(13, 97, 97));
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    height: 50px;
    position: fixed;
    top: 0;
}
.top-bar>span{
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
}
.settings{
    color: aliceblue;
    position: fixed;
    font-size: 1.7em;
    margin-left: 15px;
    margin-top: 10px;
}
.log-out{
    position: fixed;
    color: aliceblue;
    font-size: 1.7em;
    margin-top: 10px;
    right: 20px;
}
</style>