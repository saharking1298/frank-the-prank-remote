<template>
    <login-screen v-if="currentScreen === 'remoteLoginScreen'"> </login-screen>
    <main-screen :currentHost="currentHost" v-else-if="currentScreen === 'mainScreen'"></main-screen>
    <settings-screen v-else-if="currentScreen === 'settingsScreen'"> </settings-screen>
    <host-login-screen v-else-if="currentScreen === 'hostLoginScreen'"> </host-login-screen>
    <toast-message :toast-message="currentToast.message" :toast-duration="currentToast.duration" :toast-style="currentToast.style" :toast-activator="toastActivator" :toast-hider="toastHider"> </toast-message>
</template>

<script>
import ToastMessage from './components/ToastMessage.vue';
import MainScreen from './components/MainScreen.vue';
import LoginScreen from './components/LoginScreen.vue';
import socket from './socket';
import SettingsScreen from './components/SettingsScreen.vue';
import HostLoginScreen from './components/HostLoginScreen.vue';
const { createHash } = require('crypto');
export default {
  components: { ToastMessage, MainScreen, LoginScreen, SettingsScreen, HostLoginScreen },
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
            featureCategories: [{name: "All Categories", id: "all"}, {name: "Mouse & Keyboard", id: "mouseKeyboard"}, {name: "Multimedia", id: "multimedia"}, {name: "Power Control", id: "power"}, {name: "Trickshots", id: "tricks"}, {name: "Loops", id: "loops"}, {name: "Advanced Control", id: "control"}],
            allFeatures: [
                {name: 'click', categoryId: 'mouseKeyboard', description: 'Clicks the mouse in a certain loaction on the screen', arguments: [{id: 'button', dataType: 'choice', title: 'The button to press', choices: ['Left', 'Right', 'Middle'], manipulator: (choice) => {return choice.toLowerCase()}}]},
                {name: 'type', categoryId: 'mouseKeyboard', description: 'Sends a virtual input to the keyboard', arguments: [{id: 'text', dataType: 'string', title: 'The text to write'}]},
                {name: 'move', categoryId: 'mouseKeyboard', description: 'Moves the mouse cursor to specific screen coordinates', arguments: [{id: 'xPos', dataType: 'int', title: 'The X position'}, {id: 'yPos', dataType: 'int', title: 'The Y position'}]},
                {name: 'mup', categoryId: 'mouseKeyboard', description: 'Moves the mouse cursor up X amount of pixels', arguments: [{id: 'numOfPixels', dataType: 'int', title: 'The number of pixels to go up'}]},
                {name: 'mdown', categoryId: 'mouseKeyboard', description: 'Moves the mouse cursor down X amount of pixels', arguments: [{id: 'numOfPixels', dataType: 'int', title: 'The number of pixels to go down'}]},
                {name: 'mright', categoryId: 'mouseKeyboard', description: 'Moves the mouse cursor right X amount of pixels', arguments: [{id: 'numOfPixels', dataType: 'int', title: 'The number of pixels to go right'}]},
                {name: 'mleft', categoryId: 'mouseKeyboard', description: 'Moves the mouse cursor left X amount of pixels', arguments: [{id: 'numOfPixels', dataType: 'int', title: 'The number of pixels to go left'}]},
                {name: 'url', categoryId: 'multimedia', description: "Opens a specific URL in the host's browser", arguments: [{id: 'url', dataType: 'string', title: 'The URL to open'}]},
                {name: 'say', categoryId: 'multimedia', description: 'Activates a text to speech on the host computer', arguments: [{dataType: 'string', id:'textToSay', title: 'The text to say'}]},
                {name: 'msgbox', categoryId: 'multimedia', description: 'Displays a message box on the screen', arguments: [{id: 'title', dataType: 'string', title: 'Message box title'}, {id: 'content', dataType: 'string', title: 'Message box content'}]},
                {name: 'play', categoryId: 'multimedia', description: 'Plays a track in Ftp media player'},
                {name: 'pause', categoryId: 'multimedia', description: 'Pauses a track in Ftp media player'},
                {name: 'stop', categoryId: 'multimedia', description: 'Stops the current track in Ftp media player'},
                {name: 'cd', categoryId: 'tricks', description: "Opens or close the host's CD-ROM drive"},
                {name: 'crazy', categoryId: 'tricks', description: 'Causing the mouse to look like it is haunted', arguments: [{id: 'status', dataType: 'choice', title: 'Crazy state', choices: ['On', 'Off'], manipulator: (choice) => {return choice.toLowerCase()}}]},
                {name: 'cmd', categoryId: 'control', description: "Executes a script on the command prompmt", arguments: [{id: 'cmd', dataType: 'string', title: 'The command to excecute'}]},
                {name: 'reset', categoryId: 'control', description: "Relaunch Ftp Host app on the host computer"},
                {name: 'exit', categoryId: 'control', description: "Exits Ftp app on the host computer. You won't be able to bring it back on until you do it manually!"},
                {name: 'timed', categoryId: 'control', description: "Set a timer to send an action"},
                {name: 'window', categoryId: 'control', description: "Open, close, resize or manipulate an open window"},
                {name: 'setvol', categoryId: 'control', description: "Sets the host sound volume (0 - 100)", arguments: [{id: 'volume', dataType: 'int', title: 'The volume to set (0 - 100)', min: 0, max: 100}]},
                {name: 'volup', categoryId: 'control', description: "Increase the volume of the host compuer", arguments: [{id: 'volume', dataType: 'int', title: 'The volume to increase (1 - 100)', min: 1, max: 100}]},
                {name: 'voldown', categoryId: 'control', description: "Decrease the volume of the host compuer", arguments: [{id: 'volume', dataType: 'int', title: 'The volume to decrease (1 - 100)', min: 1, max: 100}]},
                {name: 'screen', categoryId: 'control', description: 'Switch the display settings to the choosen mode', arguments: [{id: 'screen', dataType: 'choice', title: 'The screen mode to set', choices: ['Main', 'Second', 'Duplicate', 'Extend']}]},
                {name: 'back', categoryId: 'control', description: "Launch alt + f4 to exit all kinds of focused applications"},
                {name: 'wait', categoryId: 'control', description: "A building-block to create a delay between two actions in a cloud function"},
                {name: 'loop', categoryId: 'loops', description: "Loop a certain feature or cloud function a certain number of times"},
                {name: 'tloop', categoryId: 'loops', description: "Loop a certain feature or cloud function until the timer stops"},
                {name: 'shutdown', categoryId: 'power', description: "Shutting down the host computer"},
                {name: 'restart', categoryId: 'power', description: "Restarts the host computer. Ftp might not be there when it is back up!"},
                {name: 'sleep', categoryId: 'power', description: "Sets the host computer to sleep mode"},
            ]
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
        };
    },
    methods: {
        hash(string) {
            return createHash('sha256').update(string).digest('hex');
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
            this.directTalk({namespace: "feature", eventName: featureName, eventArgs: featureArgs});
            const toast = {
                message: `Feature "${featureName}" has been sent to host.`,
                style: "fit-style",
                duration: 3
            }
            this.showToast(toast);
        },
        registerSocketEvents() {
            this.io.socket.on('partnerStatus', (status) => {
                if(status === 'terminated') {
                    this.setHostStatus('unconnected');
                    const toast = {
                        message: `You have been kicked by a remote with higher priority`,
                        style: "fit-style",
                        duration: 5
                    };
                    this.showToast(toast);
                    this.logoutFromHost(false);
                }
                else {
                    this.setHostStatus(status);
                }
            });
            this.io.socket.on('connect', () => {
                console.log('Frank The Prank has connected to socket.')
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
        async directTalk(content){
            const status = await this.listen("directTalk", content);
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
</style>