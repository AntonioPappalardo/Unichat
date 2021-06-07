<template>
<div>
    
    <div class="form">
        <div class="intestation">
         <i class="far fa-window-close" @click="$emit('close')"></i>
        </div>
        <h2>Creazione di un Post</h2>
        <div class="title">
           Title: <input type="text" class="titlePost" v-model="title">
        </div>
        <div class="body">
           Body: <br> <textarea class="BodyPost" rows="4" cols="30" v-model="body"/>
        </div>
        <div class="invio">
            <button @click="send">Crea</button>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios'
axios.defaults.crossDomain =true;

export default {
    name:'NewPost',
    data(){
        return{
            title:"",
            body:"",
            id:"0"
        }
    },
    methods:{   
        send(){

            var formData= new FormData();
            
            formData.append('userID',this.$session.get('user').id);
            formData.append('title',this.title);
            formData.append('body',this.body);
           
            axios.post("http://localhost:80/webapp/post.php?action=create",formData).then(
                (response)=>{
                    this.id=response.data.id;
                 
                    var post={
                        "userId":this.$session.get('user').id,
                        "id":this.id,
                        "title":this.title,
                        "body":this.body
                    }
                    this.$store.dispatch('createPost',post);
                    this.$emit('close')
                }
            );
            
        }
    }

}


</script>


<style lang="scss" scoped>
.form{
    .intestation{
        display: flex;
        justify-content: flex-end;
    }

    width: 250px;
    height: 250px;
    padding: 10px;
    background-color: antiquewhite;
    display: grid;
    grid-row-gap: 10px;
    flex-direction: column;
    .title{
        align-content: center;
        .titlePost{
            border-radius: 8px;
        }
    }
    .body{
        align-content: center;
        .BodyPost{
            border-radius: 8px;
            resize: none;
        }
    }
    .invio{
        display: flex;
        justify-content: flex-end;
    }

}
</style>