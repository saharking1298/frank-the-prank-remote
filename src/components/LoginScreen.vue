<template>
    <div class="background"> </div>
    <div class="login-screen fade-in">
        <h2> Frank The Prank - Login/Register </h2>
        <form>
            <div class="form container">
                <div class="credentials">
                    <div class="form-group">
                        <label for="username-input"> Enter your username: </label>
                        <input type="text" class="form-control" id="username-input" v-model="username" required placeholder="Type Your Username here..." @keydown.enter.prevent="focusOn('passwordInput')">
                    </div>
                    <div class="form-group">
                        <label for="password-input"> Enter your password: </label>
                        <input type="password" class="form-control" id="password-input" v-model="password" required placeholder="Type Your Password here..." minlength="8" ref="passwordInput">
                    </div>
                </div>
                <div class="login-register-choice flexbox">
                    <div class="choice choice-left" :class="{'choice-selected': currentChoice === 'Login'}" @click="setChoice('Login')"> Login </div>
                    <div class="choice choice-right" :class="{'choice-selected': currentChoice === 'Register'}" @click="setChoice('Register')"> Register </div>
                </div>
                <button id="login" @click.prevent="login"> {{ currentChoice }} </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    inject: ["io", "showToast", "hideToast", "setMainScreen", "listen", "hash", "initSocket"],
    data() {
        return {
            redirectTarget: "hostLoginScreen", // "mainScreen",
            currentChoice: "Login",
            username: '',
            password: '',
        };
    },
    mounted(){

    },
    methods: {
        setChoice(choice){
            this.currentChoice = choice;
        },
        focusOn(element){
            this.$refs[element].focus();
        },
        login(){
            const passwordValidator = (password) => {
                // The password must be at least 8 characters long, and contain at least one number, one letter
                const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                return regex.test(password.trim());
            };
            let toast = {duration: 5};
            this.username = this.username.trim();
            if(this.username === ''){
                toast.message = "Please enter your username";
                this.showToast(toast);
            }
            else if(this.password === ''){
                toast.message = "Please enter your password";
                this.showToast(toast);
            }
            else if(this.currentChoice === 'Login' || passwordValidator(this.password)){
                const hashedPassword = this.hash(this.password);
                this.initSocket({
                    actionType: this.currentChoice.toLowerCase(),
                    clientType: 'remote',
                    username: this.username,
                    password: hashedPassword
                });
                this.io.socket.once('connect', () => {
                    this.setMainScreen(this.redirectTarget);
                });
                this.io.socket.on('connect_error', (err) => {
                    const toast = {duration: 3, message: "Connection failed. Message: " + err.message};
                    this.showToast(toast);
                });
            }
            else {
                toast.message = "Password must be at least 8 characters long, and contain at least one number, one letter.";
                this.showToast(toast);
            }

        }
    }
}
</script>

<style scoped>
#login{
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
.background{
    background: linear-gradient(100deg, #05445E, #0C2D48);
}
.credentials{
    margin-bottom: 30px;
}
.login-register-choice{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    border-radius: 15px;
}
.choice{
    flex: 1;
    text-align: center;
    border: 2px solid black;
    color: rgba(189, 206, 214, 0.801);
    border-color: rgba(240, 248, 255, 0.664);
    background-color: #0090b4;
    cursor: pointer;
}
.choice-left{
    border-radius: 15px 0 0 15px;
}
.choice-right{
    border-radius: 0 15px 15px 0;
    border-left-width: 0;
}
.choice-selected{
    background-color: #06647c !important;
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
</style>