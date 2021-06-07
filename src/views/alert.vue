<template>
<div>
    <div class="alert">
        <h5 class="modal-header">Cancellazione post</h5>
        <p class="modal-body">Sicur di voler cancellare il post?</p>
        <div class="modal-footer">
            <button class="btn btn-danger rounded-pill" @click="elimina()">Elimina</button>
            <button class="btn btn-primary rounded-pill" @click="annulla()">Annulla</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.crossDomain =true;

export default {
    name:'Confirm',
    props:{
        postID: String
    },
    methods:{
        annulla(){
            this.$emit('close');
        },
        elimina(){
            var formData= new FormData();
            formData.append('postId',this.postID)
            axios.post("http://localhost:80/webapp/post.php?action=delete",formData);
            this.$store.dispatch('removePost',this.postID);
            this.$router.push('/user')
        }
    }
}
</script>
<style lang="scss">
    .alert{
        width: auto;
        height: auto;
        background-color:white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
</style>