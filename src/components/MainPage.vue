<template>
  <div class="MainPage">
    <el-header >
      <span>sign up</span><span>log in</span>
    </el-header>
   <div>
     <router-view></router-view>
   </div>
    <el-footer>
    <div @click="jumptoSearch">Search</div>
    <div @click="jumptoFav">Favourite List</div>
    </el-footer>
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
  .el-header{
    background-color: orange;
  // background: linear-gradient(to right, #f2709c, #ff9472);
    text-align: right;
    width:100%;
    height:20%;
   span{
     margin-left:10%;
     line-height: 60px;
  
   }
  }
 
 
  .el-footer{
    background-color:orange;
    width:100%;
    height:20%;
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
