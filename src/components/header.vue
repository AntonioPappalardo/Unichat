<template>
 <div class="header">
   <div></div>
    <h2> Università Degli Studi di Salerno Dipartimento di Informatica</h2>
    <div>
      <div v-if="this.$session.exists()">
        <router-link to="/user" class="aa">{{this.$session.get('user').name}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'Header',
   
    data(){
      return{
        log:false
      }
    },
    watch:{
      computed:{
        log(){
          return this.$session.exists();
        }
      }
    }
}
</script>
<style lang="scss">

a{
  
  color: blue;
}
.aa{
  color: white;
  text-decoration: none;
}
.header{
      height: 100px;
      display: grid;
      grid-template-columns: 100px calc(100vw - 100px - 100px) 100px;
      align-items: center;
      justify-items: center;

      @media only screen and (max-width: 425px){
        h2{
        font-size: 10px;
        font-weight: bold;
      }
      }
    
    }
</style>