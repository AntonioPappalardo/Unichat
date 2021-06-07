import Vue from 'vue'
import Vuex  from 'vuex'  //import della libreria principale dello store

//import dei file json dove sono salvati i dati 
import Posts from '../JSON_FILES/posts.json'
import Comments from '../JSON_FILES/comments.json'
import Users from '../JSON_FILES/users.json'
import Messages from '../JSON_FILES/message.json'

Vue.use(Vuex) // utilizzo di vuex 

export const store =  new Vuex.Store({ //creazione dello store
  state: {    //lo state rappresenta i dati
    Posts,
    Comments,
    Users,
    Messages
  },
  getters:{
    getPosts: state => {
      return state.Posts;
    },
    getUsers: state => {
      return state.Users;
    },
    getPostByID: (state) => (id) => {
     return state.Posts.find(post => post.id===id)
    },
    getComments: state =>{
      return state.Comments;
    },
    getCommentByID: (state) => (id) =>{
      return state.Comments.find(comment => comment.id===id)
    },
    getCommentsByPost :(state) => (id)=>{
      return state.Comments.filter(comment => comment.postId===id)
    },
    getUserByID: (state) => (id)=>{
      return state.Users.find(user => user.id===id)
    },
    getUserByLogin: (state)=>(username,password)=>{
      return state.Users.find(user => (user.username===username && user.password===password))
    },
    getUserByName: (state) => (name)=>{
      return state.Users.find(user => user.username=== name);
    },
    getPostByUser: (state) => (id)=>{
      return state.Posts.filter(post => post.userId===id);
    },
    getCommentByUser: (state) => (id)=>{
      return state.Comments.filter(comment => comment.userId===id)
    },
    getUserByComment: (state) =>(comment)=>{
      return state.Users.find(user => user.id===comment.userId)
    },
    getChats: (state) =>(user) =>{
      return state.Messages.filter(message => ((message.contact.person1===user.id)||(message.contact.person2===user.id)))
    },
    getUserByMessage: (state) =>(message,id)=>{
      return state.Users.find(user=> (user.id!==id)&&((message.contact.person1===user.id)||(message.contact.person2===user.id)))
    },
    getChat:(state) => (id) =>{
      return state.Messages.find(chat=> chat.chanelId===id);
    },
    getMessages:(state) => (id) =>{
      var x= state.Messages.find(chat=> chat.chanelId===id).messages.reverse();
      state.Messages.find(chat=> chat.chanelId===id).messages.reverse()
      
      return x;
    }
    
    
    
  },

  mutations: {
    removeUser(state,id){
      state.Users=state.Users.filter(user => user.id !==id); 
    },
    removePostUser(state,id){
      state.Posts=state.Posts.filter(post => post.userId !==id );

    },
    removeCommentUser(state,id){
      state.Comments=state.Comments.filter(comment =>comment.userId !==id)
    },
    removeComment(state,id){
      state.Comments=state.Comments.filter(comment => comment.id!==id);
    },
    removePost(state,id){
      state.Posts=state.Posts.filter(post => post.id !==id);
    },
    
    createPost :(state,post) =>{
      state.Posts.push(post);
    },
    createMessage :(state,msg) =>{
      state.Messages.find(chat=> chat.chanelId===msg.chanel).messages.reverse().push(msg.message);
      state.Messages.find(chat=> chat.chanelId===msg.chanel).messages.reverse()
    }
  },
  actions: {
    removeUser({commit}, id){
      commit('removeUser',id);
      commit('removePostUser',id);
      commit('removeCommentUser',id)
    },
    removeComment({commit},id){
      commit('removeComment',id)
    },
    removePost({commit},id){
      commit('removePost',id);
    },
    createPost({commit},post){
      commit('createPost',post)
    },
    createMessage({commit},msg){
      commit('createMessage',msg)
    }
  },
})
