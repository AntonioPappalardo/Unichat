<template>
    <div class="messageApp">
 
      <div class="messages">
          <div class="message" v-for="(message, index) in messages" :key="index" @click="goTochat(message.chanelId)">
              <div class="image">
                  <div v-if="getUserImmage(message)!==''">
                  </div>
                  <div v-else class="profile">
                      {{getUserProfile(message)}}
                  </div>
              </div>
              <div class="bodychat">
                  <div class="userchat">
                      {{getUserName(message)}}
                  </div>
                  <div class="lastMessage">
                    <p class="notRead" v-if="!isread">{{getLastMessage(message).body}}</p>
                    <p v-else>{{getLastMessage(message).body}}</p>
                  </div>
              </div>
              <div class="data">
                 {{getLastMessage(message).time}}
              </div>
          </div>
      </div>
    </div>
</template>
<script>

export default {
    name: 'message',
    data(){
        return{
            searchcontact:"",
            user:"",
            isread:false
        }
    },
    computed:{
        messages(){
            return this.$store.getters.getChats(this.$session.get('user'));
        },
        isuser(){
            return this.$session.get('user').id===this.post.userId
        },
    },
    watch:{
       
    },
    methods:{
        getUserByMessage(message){
            return this.$store.getters.getUserByMessage(message,this.$session.get('user').id);
        },
        getUserImmage(message){
            return this.getUserByMessage(message).imgprofile;
        },
        getUserProfile(message){
            return this.getUserByMessage(message).profile;
        },
        getUserName(message){
            return this.getUserByMessage(message).name;
        },
        getLastMessage(message){
           let msg=message.messages[0];
           this.isread=msg.read;
           return msg;
        },
        goTochat(id){
             this.$router.push({name:'chat', params : {'chanelId': id}})
        }

    },
    components:{

    }

}
</script>


<style lang="scss" scoped>
    .messageApp{
        max-height: calc(100vh - 150px);
        min-height: 500px;
        background-color: rgba(220, 245, 241, 0.85);
        overflow-y: scroll;
        max-width: auto;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        .headerMessage{
            display: flex;
            padding-top: 10px;
            justify-content: center;
            width: max-content;
            min-width: 400px;
        }

        .messages{
            padding-top: 20px;
            display: grid;
            grid-row-gap: 10px;
            .message{
                margin: 5px;
                padding: 10px;
                display: grid;
                grid-template-columns: 50px calc(100vw - 675px) 25px; 
                border: 0.5px solid black;
                border-radius: 25px;
                .image{
                    display: flex;
                    width: 50px;
                    height: 50px;
                    background-color: rgb(170, 170, 170);
                    border-radius: 25px;
                    align-items: center;
                    justify-content: center;
                }
                .bodychat{
                    height: 50px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .data{
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                }
            }
        }


    }

</style>