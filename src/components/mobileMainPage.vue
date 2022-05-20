<template>
  <div class="MainPage">
      <div class="mheader">
          <div class="logos">
          <img src="../assets/logo2.png"/>
            <div>Rental Rise.</div>
          </div>
           <div class="user"> Welcome!<div class="showUser"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
           <div class="userSetting">
            <div @click="$router.push('/mprofile')"><i class="el-icon-user"/>User Profile</div>
            <div @click="$router.push('/mpassword')"><i class="el-icon-lock"/>Change Password</div>
            <div @click="$router.push('/mfavList')"><i class="el-icon-star-off"/>Favourite List</div>
            <div @click="$router.push('/mobile')">Log out</div>
            </div>
           </div></div>
           
      </div>
      <div class="nav">
       
    <el-menu
      default-active="1"  mode="horizontal" >
      <el-menu-item index="1" @click="$router.push('/mfilltheform')">
        <i class="el-icon-house"></i>
        <span>Facility Comparision</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/mcommunity')">
        <i class="el-icon-s-home"></i>
        <span>Community Review</span>
      </el-menu-item>
    </el-menu>
    
    </div>
       <div class="mmain">
          <router-view/>
      </div>
       <div class="mfooter">
          <img src="../assets/logo.png"/>
          <div>Contact us: fakeemail@email.com</div>
      </div>

  </div>
</template>

<script>
export default {
    name:"mobileMainPage",


}
</script>

<style lang="less" scoped >
.mheader{
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    width:100vw;
    height:8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Snell Roundhand', cursive;
     border-bottom: 1px solid #db91c6;
     font-size: 1.4rem;
    // line-height: 60px;
    .nav{
        height: 6vh;
    }
    img{
         width:22vw;
        height:7vh;
    }
 
    .user{
        display: flex;
         align-items: center;
         margin-right: 2vw;
         .showUser{
          display: flex;
          height: 60px;
           align-items: center;
           &:hover .userSetting{
         display:block;
         

       }}
    }
    .logos{
         display: flex;
         align-items: center;

    }
}
.mmain{
    overflow: scroll;
    height: 77vh;
    position: fixed;
}
   .el-menu-item{
        width:50vw;
       // box-sizing: border-box;
    }

.mfooter{
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    display: flex;
    align-items: center;
    width:100vw;
    height:8vh;
    position: fixed;
    bottom:0;
    img{
         width:22vw;
        height:7vh;
    }
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
         

</style>