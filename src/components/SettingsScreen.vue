<template>
    <div class="background"></div>
    <div class="user-settings fade-in">
        <i class="fas fa-arrow-left back-arrow" @click="back"></i>
        <h2> User Settings </h2>
    </div>
    <section>
        <h3> Owned Hosts & Tokens: </h3>
        <p> Here are the host Ids you own and their tokens.</p>
        <div class="host-card flexbox" v-for="(host, index) in ownedHosts" :key="host.hostId">
            <div class="host-card-id"> {{ host.hostId }} </div>
            <div class="left-wrapper">
                <span class="host-card-token"> {{ host.token }} </span>
                <i class="fas fa-redo host-card-reload" @click="changeHostToken(host.hostId)"></i>
                <i class="fas fa-trash-alt host-card-delete" @click="deleteHost(host.hostId, index)"></i>
            </div>
        </div>
        <div class="flexbox register-host">
            <input id="id-input" type="text" v-model="hostIdInput" @keydown.enter="registerHost" placeholder="Type here a new Id...">
            <button id="add-host-btn" @click="registerHost"> Add </button>
        </div>
    </section>

</template>

<script>
export default {
    inject: ["setMainScreen", "showToast", "hideToast", "socket", "listen"],

    data() {
        return {
            ownedHosts: [],
            hostIdInput: "",
        }
    },
    methods: {
        back() {
            this.setMainScreen("mainScreen");
        },
        async deleteHost(hostId, hostIndex){
            await this.listen("deleteHost", hostId);
            this.ownedHosts.splice(hostIndex, 1);
        },
        async registerHost(){
            this.hostIdInput = this.hostIdInput.trim();
            if(this.hostIdInput === '') return;
            const status = await this.listen("registerHost", this.hostIdInput);
            if(!status.approved){
                this.showToast({duration: 5, style: "fit-style", message: status.message});
            }
            else{
                this.ownedHosts.push({hostId: this.hostIdInput, token: status.token});
            }
            this.hostIdInput = "";
        },
        async getOwnedHosts(){
            let output = await this.listen("getOwnedHosts");
            let hosts;
             if(output.approved){
                    hosts = output.hosts;
            } else{
                hosts = [];
            }
            return hosts;
        },
        async changeHostToken(hostId){
            const status = await this.listen("changeHostToken", hostId);

            if(status.approved){
                this.ownedHosts.find(host => host.hostId === hostId).token = status.token;
            }
            else{
                console.log("Shitttt")
            }
        }
    },
    async created() {
        this.hideToast();
        this.ownedHosts = await this.getOwnedHosts();
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
h3{
   text-align: center;
    color: rgba(123, 172, 212, 0.781);
    font-size: 1.22em;
}
p{
    color: rgba(240, 248, 255, 0.822);
    text-align: center;
}
.host-card{
    margin-top: 5px;
    margin-bottom: 10px;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
    box-shadow: 0 0 2px 1px rgba(240, 248, 255, 0.616);
    background-color: rgba(240, 248, 255, 0.096);
    padding: 2px;
    padding-left: 8px;
    padding-left: 8px;
    border-radius: 6px;
    color: rgba(240, 248, 255, 0.822);
    position: relative;
    max-width: 800px;
    transition: background 0.2s, box-shadow 0.2s;
}
.host-card:hover{
    background-color: rgba(240, 248, 255, 0.05);
    box-shadow: 0 0 6px 2px rgba(240, 248, 255, 0.616);
}
.host-card-id{
    margin-right: 10px;
}
.host-card-token{
    margin-right: 10px;
}
.register-host{
    width: 90%;
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
}
.left-wrapper {
    position: absolute;
    width: max-content;
    right: 10px;
}
button{
    margin-left: 20px;
}
.back-arrow{
    position: absolute;
    margin-top: 5px;
    margin-left: 20px;
    color: aliceblue;
    cursor: pointer;
}
.host-card-delete{
    margin-left: 8px;
}
#id-input{
    margin-right: 5px;
    border-radius: 5px;
    margin-top: 5px;
    border: 2px solid white;
}
#add-host-btn{
    margin-top: 6px;
    margin-left: 5px;
    background: rgba(240, 248, 255, 0.151);
    box-shadow: 0 0 2px 1px rgba(240, 248, 255, 0.616);
    color: rgba(240, 248, 255, 0.74);
    border-radius: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 8px;
    padding-right: 8px;
    border: 0;
    height: min-content;
    transition: all 0.25s;
}
#add-host-btn:hover{
    background-color: rgba(240, 248, 255, 0.05);
    box-shadow: 0 0 6px 2px rgba(240, 248, 255, 0.616);
}
</style>