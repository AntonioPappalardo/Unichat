<template>
    <div class="login">
        <div class="alert-danger" v-if="errore" >Username o Password non corretti</div>
        <div v-on:keyup.enter="verifyLogin()">
            <span>Username:</span>
            <input type="text" v-model="username" class="input" v-on:keyup.enter="verifyLogin()">
        </div>
        <div>
            Password:
            <input type="password" v-model="password" class="input" v-on:keyup.enter="verifyLogin()">
        </div>
        <div>
            <button @click="verifyLogin()" class="btn btn-outline-dark">Login</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
            username:"",
            password:"",
            errore:false,
            user:null
        }
    }, 
    beforeCreate(){
        if(this.$session.exists()){this.$router.push("/user")}
    },
    methods:{
        verifyLogin(){
            this.user=this.$store.getters.getUserByLogin(this.username,this.password)
            if(this.user==null){this.errore=true}
            else{
                this.errore=false;
                this.$session.start();
                this.$session.set('user',this.user)
                this.$router.push("/user")
                this.$router.go("/user")

            }
        },
        islog(){
             return this.$session.exists()
        }

    },
    watch:{
        username: function() {
            this.errore=false
        },
        password: function(){
            this.errore=false
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    background-color: rgba(128, 128, 128, 0.89);
    border-radius: 15px;
    padding: 15px;
    display: grid;
    grid-row-gap: 15px;

    .alert-danger{
        border-radius:10px;
        padding: 10px;
    }
    .input{
        border-radius:10px;
    }
}
</style>