<template>
  <div class="homePage">
    <!-- <img src="../assets/neighbourhood.jpeg"/> -->
    <div class="beforeBanner">
      <img src="../assets/logo2.png"/>
    
      
      </div>
      <div class="bigTitle">Rental Rise.</div>
    <div class="block">
    <el-carousel trigger="click" height="400px" type="card">
      <el-carousel-item v-for="item in photos" :key="item">
        <img :src="item"/>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="sign">
   <!-- <div class="bigTitle">Rental Rise.</div>
      <img src="../assets/logo2.png"/> -->
  <div class="middlepart">
   <div class="Description"><span>Start to find the most appropriate rental for you today.</span>
   <div>Rental rise provide a platform for you to compare different neighbourhoods and check people's favourite neighbourhoods.</div>
   <el-button @click="logActive=2">{{logActive==2?'Start Journey':'Get Started'}}</el-button>
   </div>
   
   <div class="box" v-if="logActive==2">
   
    <div class="login">{{active==1?"Log in":"Sign up"}}</div>
   
  <div class="sigin">
    <div>Account name:</div>
   <div class="signinbox">
   <el-input v-model="accName" placeholder="Please enter your account name"></el-input>
   </div>
   </div>
   <div class="sigin">
     <div>Password:</div>
   <div class="signinbox">
   <el-input v-model="password" placeholder="Please enter your password"></el-input>
   </div>
   </div>
   <div class="sigin">
  
   <el-button v-if="active==1" @click="jumptoMain">Log in</el-button>
   <el-button v-if="active==2" >Sign up</el-button>
   </div>
     <div class="hint sigin" style="text-decoration-line:underline;" @click="active=2" v-show="active==1"> <span>Need an account?</span></div>
       <div class="hint sigin" style="text-decoration-line:underline" @click="active=2" v-show="active==1"> <span>Sign  up</span></div>
       <div class="hint sigin" style="text-decoration-line:underline" @click="active=1" v-show="active==2"> <span>Already have an account?</span></div>
       <div class="hint sigin" style="text-decoration-line:underline" @click="active=1" v-show="active==2"> <span>Log  in</span></div>
   </div>
  </div>
  </div>

  </div>
</template>

<script>
export default {
    name:"homePage",
    data(){
      return{
        password:"",
        accName:"",
        active:1,
        photos:[require('../assets/n1.jpg'),require('../assets/t11.jpg'),require('../assets/t3.jpeg'),require('../assets/t7.jpeg'),require('../assets/t8.jpeg'),require('../assets/t5.jpeg'),require('../assets/t6.jpeg'),require('../assets/t9.jpeg'),require('../assets/t10.jpeg')],
        logActive:1
      }
    },
    methods:{
      jumptoMain(){
        this.$router.push("/mainPage")
      }
    }


}
</script>

<style lang="less" scoped>
.homePage{
  width:100%;
  height:100%;
  background:rgb(255, 221, 141) ;
  .beforeBanner{
    background:rgb(255, 221, 141);

     img{
        height: 150px;
        width:300px;
        margin-left:calc(50% - 150px);
      }
  }
   .bigTitle{
      width: 100%;
      height:100px;
      line-height: 100px;
      color:black;
      font-family: 'Snell Roundhand', cursive;
      text-align: center;
      font-size: 80px;
      // img{
      //   height: 80px;
      //   width:200px;
      //   margin-top:10px;
      // }
    }
  .block{
        img {

        width: 100%;

        height: 400px;

      }
  }
  .sign{
     border: 1px solid black;
     margin:auto;
     height:600px;
     width:100%;
      //  background-size:cover; 
      // background-repeat: no-repeat; 
      //background: url("../assets/n1.jpg");
      //background: #c9deff;
         background-image: linear-gradient(180deg, #bcd5ff 0%, #c2e9fb 100%);

    .box{
      box-shadow: 0 0px 20px grey;
      border:1px solid white;
      width:600px;
      margin: auto;
      margin-top:20px;
      padding-bottom: 60px;
      background: white;
     
    }
     img{
        height: 150px;
        width:300px;
        margin-left:calc(50% - 150px);
      }
    .bigTitle{
      width: 100%;
      height:100px;
      line-height: 100px;
      color:white;
      font-family: 'Snell Roundhand', cursive;
      text-align: center;
      font-size: 80px;
      // img{
      //   height: 80px;
      //   width:200px;
      //   margin-top:10px;
      // }
    }
    .login{
      color:black;
       margin:auto;
        width:200px;
        margin-top:20px;
        font-family: 'Snell Roundhand', cursive;
      text-align: center;
      font-size: 40px;
        font-weight: bold;

    }
    .middlepart{
      display: flex;
       width:100%;
       margin-top:30px;
      justify-content: space-around;
      .Description{
        //text-align: center;
        margin-left:40px;
        width:500px;
        height: auto;
        padding: 20px;
        .el-button{
          background: rgb(255, 221, 141);
           width:130px;
          margin-top:40px;
          margin-left:165px;
        }
 
     
        span{
             font-size: 40px;}
        div{
          margin-top: 10px;
        }
        }
             
        
    }

    .sigin{
      width:380px;
 
      margin:auto;
      margin-top:30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &.hint{
        text-align: center;
        span{cursor: pointer;
        margin:auto;}
      }
      & > div{
      color:black;
      font-size:18px;
      font-weight: bold;
      
      }
      .el-button{
        width:100%;
      }

    }
    .signinbox{
       width:240px;
      border:1px solid white;
      border-radius: 10px;
      //box-shadow: 0 0px 20px white;
      
    }

  
  }
}

</style>