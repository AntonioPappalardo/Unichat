<template>
    <div class="post">
        <Confirm :postID=this.postID v-if="showAlert" id="overlay" v-on:close="showAlert=false"/>
        <div class="headPost">
            <i class="fa fa-arrow-left" @click="back()"></i>
            <p class="author">created By: {{userPost.name}}</p>
            <button class="canc" @click="canc()" v-if="isuser"><i class="fas fa-trash-alt">Elimina</i></button>
        </div>
        <h2 class="title">{{post.title}}</h2>
        <div class="body">{{post.body}}</div>
        <div class="comments">
            <div class="commentsHeader">
                Commenti:
            </div>
            <div v-for="(comment, index) in comments" :key="index" class="comment">
                <div class="author">{{getUserbyComment(comment)}}</div>
                <h2 @click="commentClick(comment.id)">{{comment.name}}</h2>
            </div>
            <Comment :commentID="commentID" :isuser="isuser" v-if="showComment" id="overlay" v-on:close="showComment=false"/>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Comment from '@/views/Comment.vue'
import Confirm from '@/views/alert.vue'
export default {
    name: 'post',
    data(){
        return{
            id : 0,
            showComment: false,
            showAlert:false,
            
        }
    },
    computed:{
        post(){
            this.id=this.$route.params.postID;
            return this.$store.getters.getPostByID(this.id);
        },
        comments(){
            return this.$store.getters.getCommentsByPost(this.id)
        },
        userPost(){
             return this.$store.getters.getUserByID(this.post.userId);
        },
        isuser(){
            return this.$session.get('user').id===this.post.userId
        },
        ...mapGetters(
            [
            'getUserByComment'
            ]
        )
    },
    watch:{
       
    },
    methods:{

        getUserbyComment(comment){
          return  this.$store.getters.getUserByComment(comment).name
        },
        commentClick(id){
            this.commentID=id;
            this.showComment=true

        },
        back(){
            this.$router.go(-1)
        },
        canc(){
            this.postID=this.id;
            this.showAlert=true;
        }
    },
    components:{
        Comment,
        Confirm
    }

}
</script>


<style lang="scss" scoped>
    .post{
        height: calc(100vh - 100px);
        background-color: rgba(220, 245, 241, 0.85);
        overflow-y: scroll;
        width: auto;
        .headPost{
            display: grid;
            grid-template-columns: 25px auto min-content;
            align-items: center;
            .author{
                color: rgb(66, 66, 66);
                font-size: 12px;
                line-height: 10px;
            }
            .canc{
                border-radius: 10px;
                background-color:white;
                color:royalblue;   
            }
        }
        .title{
            padding: 15px;
        }
        .body{
            width: 500px;
            font-size: 20px;
            line-height: 25px;
        }
        .comments{
            display: grid;
            grid-row-gap: 10px;
            padding: 15px;               
            
            .comment{
                padding-left: 16px;
                border: 1px ridge rgb(66, 66, 66);
                .author{
                    font-weight: 600;
                    font-size: 16px;
                    color: rgb(65, 65, 65)
                }
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