<template>
  <div class="MainPage">
    <el-header >
    </el-header>
   <div>
     <router-view></router-view>
   </div>
    <div class="foot">
    <div @click="jumptoSearch">Search</div>
    <div @click="jumptoFav">Favourite List</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MainPage',
  data(){
    return{
      activate:"Search"
      
    }
  },
  methods:{
    jumptoFav(){
      if(this.activate!="fav"){
       this.activate="fav"
      this.$router.push('/favList')}
     

    },
    jumptoSearch(){
      if(this.activate!="Search"){
      this.activate="Search"
      this.$router.push('/filltheform')}
    }
  }
  
  

}
</script>


<style lang='less' scoped>
.MainPage{
    width:100%;
    height:100%;
  .el-header{
   // background-color: rgb(10, 56, 100);
   background: linear-gradient(to right, #f2709c, #ff9472);
    text-align: right;
    width:100%;
    height:20%;
   span{
     margin-left:10%;
     line-height: 60px;
  
   }
  }
 
 
  .foot{
    background:url("../assets/neighbourhood.jpeg");
    width:100%;
    height:30%;
    text-align: right;
    position:fixed;
    bottom:0;
    display:flex;
    justify-content: center;
    align-content: center;
    div{
      width:50%;
      line-height: 60px;
      text-align: center;
    }
    
  
  }
}
</style>