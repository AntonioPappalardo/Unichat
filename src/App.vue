<template>
  <div id="app">
    <div class="section">
      <Header/>   <!--utilizzo del componente header-->
      <div class="section2">
        <div class="content"  v-if="this.$route.path!=='/'">  <!--controllo del path-->
          <div class="sidebar">
            <div class="links">

              <!--link ai vali componenti tramite router-->

              <router-link to="/PostList">PostList</router-link>
              <router-link to="/Message">Message</router-link>
            </div>
          </div>
          <div class="content2">
            <router-view/>              <!--vista del componente da visualizzare-->
          </div>
        </div>
        <div v-else class="contentLogin">   <!--else del controllo del path-->
          <div class="log">
            <router-view/>            <!--vista del componente da visualizzare, ovvero il login -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.crossDomain =true;
import  PostList from '@/views/PostList'  // import della componente PostList
import Header from '@/components/header'  // import della componente Header
import { store } from './store/index'   // import dello store
export default {
  name: 'app',
  store,    // utilizzo dello store

// variabili utilizzate
  components: {
    PostList,
    Header
  },

  // variabili
  data(){
    return{
      id: 0,
      isUser: this.$route.path=="/user"
    }
  },
  mounted: function(){
    this.getAll();
  },
  methods:{
    getAll: function(){
      // chiamata delle api per la creazione dei file json contenenti i dati del database
      axios.get("http://localhost:80/webapp/user.php?action=read");
      axios.get("http://localhost:80/webapp/post.php?action=read");
      axios.get("http://localhost:80/webapp/comment.php?action=read");
    }
  }
}
</script>

<style lang="scss">
#app{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .section{
    display:flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-image: url("pics/back1.jpg");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
      
    .section2{
      height: calc(100vh - 100px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
        
      .content{
        height: calc(100vh - 100px);
        display: grid;
        grid-template-columns: 20% calc(100vw - 20%);
        justify-items: center;
        .sidebar{
          height: 100%;
          width: 100%;
          align-content: center;
          display: grid;
          .links{
            padding: 10px;
            height: 70px;
            width: 70%;
            background-color: beige;
            display: grid;
            grid-row-gap: 10px;+
              a{
                display: block;
                text-decoration: none;
              }
            
          }
        }
        .content2{
          margin-left: 10px;
          width: auto;
          height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          
        }
      }
      .footer{
        height: 50px;
        
      }
      .contentLogin{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: calc(100vh - 100px);
      }
    }
  }

}

</style>
