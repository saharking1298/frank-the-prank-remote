<template>
    <login-screen v-if="currentScreen === 'remoteLoginScreen'"> </login-screen>
    <main-screen :currentHost="currentHost" v-else-if="currentScreen === 'mainScreen'"></main-screen>
    <settings-screen v-else-if="currentScreen === 'settingsScreen'"> </settings-screen>
    <host-login-screen v-else-if="currentScreen === 'hostLoginScreen'"> </host-login-screen>
    <toast-message :toast-message="currentToast.message" :toast-duration="currentToast.duration" :toast-style="currentToast.style" :toast-activator="toastActivator" :toast-hider="toastHider"> </toast-message>
    <modal-popup :modal="modal" v-if="modal.visible"> </modal-popup>
</template>

<script>
import ToastMessage from './components/ToastMessage.vue';
import ModalPopup from './components/ModalPopup.vue';
import MainScreen from './components/MainScreen.vue';
import LoginScreen from './components/LoginScreen.vue';
import socket from './socket';
import SettingsScreen from './components/SettingsScreen.vue';
import HostLoginScreen from './components/HostLoginScreen.vue';
import {featureCategories, allFeatures} from './scripts/features';
const { createHash } = require('crypto');
export default {
  components: { ToastMessage, MainScreen, LoginScreen, SettingsScreen, HostLoginScreen, ModalPopup },
    data(){
        return {
            io: {socket: null},
            hostStatus: {status: 'unconnected'},
            currentScreen: "remoteLoginScreen",  
            // "mainScreen",
            currentHost: "",
            currentToast: {},
            toastActivator: false,
            toastHider: false,
            modal: {visible: false},
            featureCategories, 
            allFeatures,
        };
    },
    provide() {
        return {
            showToast: this.showToast,
            hideToast: this.hideToast,
            setMainScreen: this.setScreen,
            hostStatus: this.hostStatus,
            io: this.io,
            featureCategories: this.featureCategories,
            allFeatures: this.allFeatures,
            setHostStatus: this.setHostStatus,
            directTalk: this.directTalk,
            sleep: this.sleep,
            listen: this.listen,
            connectToHost: this.connectToHost,
            sendActionGlobal: this.sendActionGlobal,
            hash: this.hash,
            initSocket: this.initSocket,
            logoutFromHost: this.logoutFromHost,
            showModal: this.showModal,
            hideModal: this.hideModal,
        };
    },
    methods: {
        hash(string) {
            return createHash('sha256').update(string).digest('hex');
        },
        showModal(modal) {
            modal.visible = true;
            this.modal = modal;
        },
        hideModal() {
            this.modal = {visible: false};
        },
        initSocket(auth) {
            this.io.socket = socket(auth);
            this.registerSocketEvents();
            this.io.socket.connect();
        },
        setScreen(screenId){
            this.currentScreen = screenId;
        },
        showToast(toastObject){
            this.currentToast = toastObject;
            this.toastActivator = !this.toastActivator;
        },
        hideToast(){
            this.toastHider = !this.toastHider;
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        setHostStatus(status){
            this.hostStatus.status = status;
        },
        sendActionGlobal(featureName, featureArgs){
            this.directTalk('features.activate', {featureName, featureArgs});
            const toast = {
                message: `Feature "${featureName}" has been sent to host.`,
                duration: 3
            };
            this.showToast(toast);
        },
        registerSocketEvents() {
            this.io.socket.on('partnerStatus', (status) => {
                if(status === 'terminated') {
                    this.setHostStatus('unconnected');
                    const toast = {
                        message: `You have been kicked by a remote with higher priority`,
                        duration: 5
                    };
                    this.showToast(toast);
                    this.logoutFromHost(false);
                }
                else {
                    this.setHostStatus(status);
                }
            });
            this.io.socket.on('connect', async () => {
                console.log('Frank The Prank has connected to socket.')
                if(this.currentHost !== '') {
                    const hostStatus = await this.listen('remote.host.getStatus');
                    this.setHostStatus(hostStatus.status);
                }
            });
            this.io.socket.on('disconnect', () => {
                console.log('Frank The Prank has disconnected from socket.')
            });
        },
        logoutFromHost(action=true) {
            this.setHostStatus("unconnected");
            if(this.currentHost !== ''){
                this.currentHost = '';
                if(action) {
                    this.io.socket.emit('remote.host.disconnect');
                }
            }
        },
        async directTalk(name, content){
            const status = await this.listen("directTalk", {name, event: content});
            console.log(status);
            return status;
        },
        async connectToHost(hostId, password){
            const status = await this.listen("remote.host.connect", hostId, password);
            if (status.success){
                this.currentHost = hostId;
            }
            return status;
        },
        async listen(event, ...args){
            let response;
            this.io.socket.emit(event, ...args, (output) => {
                response = output;
            });
            while(!response){
                await this.sleep(10);
            }
            return response;
        }
    },
    created() {
        for(let i = 0; i < this.allFeatures.length; i++){
            this.allFeatures[i]["categoryName"] = this.featureCategories.find(category => category.id === this.allFeatures[i].categoryId).name;
            if(!this.allFeatures[i]["arguments"]){
                this.allFeatures[i]["arguments"] = [];
            }
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
*{
    font-family: 'Jost', sans-serif;
}
.background{
    animation: fadeIn ease 0.6s;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
}
body{
    background-color: rgba(197, 206, 214);
}
.flexbox{
    display: flex;
}
.fas{
    cursor: pointer;
}
.fade-in{
    animation: fadeIn ease 0.8s;
}
fade-in-quick{
    animation: fadeIn ease 0.4s;
}
@keyframes fadeIn{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
@keyframes fadeOut{
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.action-btn {
    font-size: 1.03em;
    font-weight: bold;
    border-radius: 15px;
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 1px;
    user-select: none;
    cursor: pointer;
    transition: all 0.15s;
}
</style>