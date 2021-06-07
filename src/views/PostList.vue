<template>
<div class="posts">
    <h1>PostList</h1>
    <div class="post rounded-pill border border-primary" v-for="(post,index) in posts" :key="index" @click="posto(post.id)">
      {{post.title}}
    </div>
</div>
</template>
<script>


export default {
    name:'PostList',
   beforeCreate(){
     if(!this.$session.exists()){this.$router.push("/")}
   },
    computed :{
      posts(){
        return this.$store.getters.getPosts;
      }
    },
    methods: {
      posto(id){
        this.$router.push({name:'post', params : {'postID': id}})
      }
    },
   
    
}
</script>

<style lang="scss" scoped>
    .posts{
    height: calc(100vh - 150px);
    background-color: rgba(220, 245, 241, 0.85);
    border-style: groove;
    border-color: skyblue;
    border-radius: 5px;
    overflow-y: scroll;
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
</style>