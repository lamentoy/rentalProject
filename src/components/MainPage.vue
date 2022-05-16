<template>
  <div class="MainPage">
    <el-header >
       <div class="user"> Welcome!<div class="showUser"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <div class="userSetting">
      <div @click="$router.push('/profile')"><i class="el-icon-user"/>User Profile</div>
      <div @click="$router.push('/password')"><i class="el-icon-lock"/>Change Password</div>
      <div @click="$router.push('/favList')"><i class="el-icon-star-off"/>Favourite List</div>
      <div @click="$router.push('/')">Log out</div>
      </div>
      
    </div>
    
       </div>
        <div>Rental Rise.</div>
       <img src="../assets/logo.png"/>
    </el-header>
  
   <el-main>
    <div class="nav">
       
    <div class="MenuList"> <i class="el-icon-menu"/>Menu</div>
    <el-menu
      default-active="1">
      <el-menu-item index="1" @click="$router.push('/filltheform')">
        <i class="el-icon-house"></i>
        <span>Facility Comparision</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/community')">
        <i class="el-icon-s-home"></i>
        <span>Community Review</span>
      </el-menu-item>
    </el-menu>
    <div class="ContactDetails">
    <img src="../assets/logo2.png"/>
    <div>Contact us:<br/>fakeemail@email.com</div>
    </div>
    </div>
  <div class="router">
     <router-view></router-view>
  </div>
   </el-main>
    <!-- <div class="foot">
    <div @click="jumptoSearch">Search</div>
    <div @click="jumptoFav">Favourite List</div>
    </div> -->
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
   //background: linear-gradient(to right, #f2709c, #ff9472);
   background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
   //background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
   //background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
   img{
     width:200px;
     height:70px;
     margin-right:-40px;
   }
    padding: 0 40px;
    display:flex;
    justify-content: space-between;
    align-items: center;
     font-family: 'Snell Roundhand', cursive;
     border-bottom: 1px solid #db91c6;
     font-size: 30px;
     line-height: 60px;
     color:white;
    width:100%;
    height:60px;
    .user{
      width:160px;
      display: flex;
      justify-content: space-between;
      position: relative;
       align-items: center;
       color:rgb(12, 44, 96);
       .showUser{
          display: flex;
          height: 60px;
           align-items: center;
           &:hover .userSetting{
         display:block;
         

       }
       .userSetting{
         display: none;
         position: absolute;
          width:160px;
         font-size: 13px;
         border:1px solid  #a1c4fd;
         background: white;
         right: 0px;
         z-index:2;
         top:60px;
         font-family: Arial, Helvetica, sans-serif;
         div{
           text-align: center;
           padding: 10px;
           height:20px;
           line-height: 20px;
           &:hover{
           text-decoration-line: underline;
         }
         }}
         

       }
       
    }
  }

.el-main{
    height:calc(100% - 60px);
     background:url("../assets/neighbourhood.jpeg");
    z-index:1;
    width:100%;
   position:fixed;
    overflow: scroll;
    display:flex;
    padding: 0;
    .nav{
       height:100%;
       position: fixed;
       border-right: 1px solid #a1c4fd;
        width:14%;
       // border-right:1px solid #a6c1ee;
        background: #effaff;
        .MenuList{
          
          padding:20px 0 20px 25px;
          box-shadow: 0 0 2px #7e90a2;
          border-bottom: 1px solid white;
          text-align: left;
          i{
            margin-right:10px;
          }
        }
       .el-menu{
      width:100%;
      border:none;
      background: #effaff;
      .el-menu-item{
        border-bottom: 1px solid white;
      }
    }
    .ContactDetails{
      width:100%;
      margin-top:140%;
      text-align: center;
      font-size:14px;
      img{
     width:120%;
     margin-left:-20px;
    
     height:160px;
    
   }}

    }
 
  }

 
  .foot{
    background:url("../assets/neighbourhood.jpeg");
    width:85%;
    height:20%;
    text-align: right;
    position:fixed;
    bottom:0;
    right:0;
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