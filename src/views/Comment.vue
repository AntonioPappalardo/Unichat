<template>
     <div>
         <div class="comment">
             <div class="intestation">
                 <p class="author">{{user.name}}</p>
                <i class="far fa-window-close" @click="$emit('close')"></i>
            </div>
            <div>
                <p class="title">{{comment.name}}</p>
                <p class="body">{{comment.body}}</p>
            </div>
            <div>
                <button @click="removeComment()" v-if="showDel">Elimina commento</button>
            </div>
         </div>
    </div>
</template>
<script>
export default {
    name: 'comment',
    data(){
        return{
            id:0
        }
    },
    props:{
        commentID: Number
    },
    computed:{
        comment(){
            this.id= this.commentID;
            return this.$store.getters.getCommentByID(this.id)
        },
        user(){
            return this.$store.getters.getUserByID(this.comment.userId);
        },
        showDel(){
            return this.isuser || this.$session.get('user').id===this.comment.userId
        }
    },
    methods:{
        removeComment(){
            var formData= new FormData();
            formData.append('commentId',this.id)
            axios.post("http://localhost:80/webapp/comment.php?action=delete",formData);
            this.$store.dispatch('removeComment',this.id);
            this.$emit('close');
        }
        
    }
    

}
</script>

<style lang="scss" scoped>
div{
.comment{
    height: auto;
    min-width: 290px;
    width: min-content;
    padding: 15px;
    margin: 0px 50px;
    background-color: white;
    display: grid;
    grid-row-gap: 5px;
    .intestation{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;


        .author{
            font-weight: bold;
        }
    }
    .title{
        width: max-content;
        font-weight: bold;
        font-size: 16px;
            

    }

}
}
</style>