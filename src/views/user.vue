<template>
    <div class="UserPage">
        <CreatePost id="overlay" v-if="showPostCreate" v-on:close="showPostCreate=false"/>
        <div class="LogOut"><button @click="logout" class="logoutbtn"><i class="fas fa-sign-out-alt"></i>Logout</button></div>

        <div class="UserInfo">
            <div v-if="user.sex===1" class="wlcmsg">Benvenuto nella tua Pagina Personale</div>
            <div v-else class="wlcmsg">Benvenuta nella tua Pagina Personale</div>
            <div>
                <button @click="newPost" class="NewPost"><i class="fas fa-pen-square"></i>Crea Post</button>
            </div>
        </div>
       
        <div class="UserPosts" v-if="posts.length>0">
             Post:
           <div class="post" v-for="(post,index) in posts" :key="index"  @click="posto(post.id)">
               {{post.title}}
           </div>
        </div>
        <div v-else>
            Ancora nessun Post creato
        </div>
    </div>
</template>

<script>
import CreatePost from '@/views/createPost.vue'
import {mapGetters} from 'vuex'
export default {
    name:'user',  
    data(){
        return{
            showPostCreate:false,  
        }
    },
   beforeCreate(){
     if(!this.$session.exists()){this.$router.push("/")}

   },
   methods:{
        newPost(){
            this.showPostCreate= true;
        },
       logout(){
           this.$session.destroy();
           this.$router.push("/")
           this.$router.go("/")
       },
       posto(id){
           this.$router.push({name:'post', params : {'postID': id}})
        }
   },
   computed:{
       user(){
           return this.$session.get('user')
       },
       posts(){
           return this.$store.getters.getPostByUser(this.user.id)
       }
   },
   components:{
       CreatePost
   }
}
</script>
<style lang="scss" scoped>
.UserPage{
    height: fit-content;
    max-height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    
    background-color: rgba(220, 245, 241, 0.85);
    border-style: groove;
    border-color: skyblue;
    border-radius: 5px;
    .LogOut{
        display: flex;
        justify-content: flex-end;
        padding: 10px;

        .logoutbtn{
            border-radius: 10px;
            background-color: white;
            color: royalblue;
        }
    }
    .UserPosts{
        display: grid;
        grid-row-gap: 10px;
        padding: 5px;
        overflow-y: scroll;
        .post{
            display: flex;
            justify-items: center;
            padding: 10px;
            border: 1px ridge rgb(66, 66, 66);
        }
    }
}

#overlay {
  position: fixed;
  width: 100%;
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>