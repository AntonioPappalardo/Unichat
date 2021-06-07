<template>
    <div class="ChatPage">
        <div class="chatHeader">
            <i class="fa fa-arrow-left" @click="back()"></i>
            <div class="UserInfo">
                <div class="userImage">
                    {{user2.profile}}
                </div>
                <div class="UserName">
                {{user2.name}}
                </div>
            </div>
        </div>
        <div class="chatBody">
            <div class="chatmessage" v-for="(message,index) in messages" :key="index">
                <div v-if="message.from==user1.id" class="sendMessage">
                    <div class="bg-primary text-white rounded-pill bodyMessage"> 
                        {{message.body}}
                    </div>
                    
                    <div class="messageTime">
                    {{message.time}}    
                    </div>     
                </div>
                <div v-else class="receivedMessage">
                   <div class=" bg-info text-white rounded-pill bodyMessage"> 
                        {{message.body}}
                    </div>
                    <div class="messageTime">
                    {{message.time}}    
                    </div>  
                </div>
            </div>
        </div>
        <div class="chatFooter">
            <textarea class="NewMessage" rows="2" cols="100" v-model="newMessage"/>
            <i class="fas fa-paper-plane" @click="send()" id="btn"></i>
        </div>
    </div>
</template>
<script src="/server/server.js"/>
<script>

var socket=null
export default {
    name:'chat',

    data(){
        return{
            chanel:0,
            msgId:null,
            newMessage:"",

        }
    },

    
    computed:{
        chat(){
            this.chanel=this.$route.params.chanelId;
            return this.$store.getters.getChat(this.$route.params.chanelId);
        },
        messages(){
            return this.$store.getters.getMessages(this.$route.params.chanelId);;
        },
        user1(){
            this.userId=this.$session.get('user');
            return this.$session.get('user')
        },  
        user2(){
            return this.$store.getters.getUserByMessage(this.chat,this.user1.id);
        }
    },
    methods:{
        back(){
            this.$router.push('/Message')
        },
        send(){
            var d= new Date();
            var n = ""+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            
            var msg={
                from:"1",
                body:this.newMessage,
                time:n,
                read:false
            }
            var x={
                message:msg,
                chanel:this.$route.params.chanelId
            }
            this.newMessage="";
            this.$store.dispatch('createMessage',x);
        }
    },

}
</script>
<style lang="scss" scoped>
.ChatPage{
    height: calc(100vh - 150px);
    width: calc(100vw - 450px);
    background-color: rgba(220, 245, 241, 0.85);
    align-items: center;
    display: grid;
    grid-template-rows: 60px calc(100vh - 260px) 50px;

    .chatHeader{
        display: grid;
        height: 60px;
        grid-template-columns:  50px calc(100vw - 500px);
         align-items: center;
   
        .UserInfo{
            display: grid;
            grid-template-columns: 60px auto;
            align-items: center;
            
            .userImage{
                
                display: flex;
                width: 50px;
                height: 50px;
                background-color: rgb(170, 170, 170);
                border-radius: 25px;
                align-items: center;
                justify-content: center;
            }

            .UserName{
                display: flex;
                font-weight: 600;
                justify-content: center;    
            }
            
        }
    }
    .chatBody{
        background-color: white;
        display: flex;
        flex-direction: column-reverse;
        height: 100%;
        overflow-y: auto;
        width: inherit;
        .chatmessage{
            margin-top: auto;
        }
        .bodyMessage{
            display: flex;
            min-width: 200px;
            width: fit-content;
            height: 45px;
            margin-left: 10px;
            margin-right: 10px;
            max-width: 500px;
            justify-content: center;
            align-items: center;   
        }
        .messageTime{
            display: flex;
            align-items: flex-end;
            margin: 10px;

        }
        .sendMessage{
            height: 50px;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            .bodyMessage{
                background-color: rgba(154, 178, 223, 0.829);
            }
        } 
        .receivedMessage{
            height: 50px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .bodyMessage{
                background-color: rgba(160, 223, 154, 0.829);
            }
        }
    }

    .chatFooter{
        display: flex;
        align-content: flex-end;
        justify-content: space-between;
        width: inherit;
        .NewMessage{
            margin-left: 10px;
            border-radius: 8px;
            resize: none;
        }
        #btn{
            display: flex;
            color: cornflowerblue;
            align-items: center;
            padding-right: 10px;
        }
    }

}
</style>