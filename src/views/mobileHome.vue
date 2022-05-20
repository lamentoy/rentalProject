<template>
  <div class="mobilehomePage">
      <div class="mtitle">Rental Rise.</div>
      <img src="../assets/logo2.png"/>
      <div class="box">
      <div class="Login"> {{active==1?'Log in':'Sign up'}}</div>
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
       <div>
       <el-button v-if="active==1" @click="jumptoMain">Log in</el-button>
       <el-button v-if="active==2">Sign up</el-button>
       </div>
       <div class="hint" style="text-decoration-line:underline" @click="active=2" v-show="active==1"> Need an account?</div>
       <div class="hint" style="text-decoration-line:underline" @click="active=2" v-show="active==1"> Sign  up</div>
       <div class="hint" style="text-decoration-line:underline" @click="active=1" v-show="active==2"> Already have an account?</div>
       <div class="hint" style="text-decoration-line:underline" @click="active=1" v-show="active==2"> Log  in</div>
       </div>
  

  

  </div>
</template>

<script>
export default {
    name:"mobilehomePage",
    data(){
      return{
        password:"",
        accName:"",
        active:1,
      }
    },
    methods:{
      jumptoMain(){
        this.$router.push("/mobileMain")
      }
    }


}
</script>

<style lang="less" scoped>
.mobilehomePage{

  width:100vw;
  height:100vh;
  background-image: url("../assets/n1.jpg");
  background-size:cover;
  background-attachment: fixed;
  overflow: hidden;
  background-repeat: no-repeat;
  text-align: center;
   padding-top:14vh;
   box-sizing: border-box;
  .mtitle{
     font-size:3rem;
     font-family: 'Snell Roundhand', cursive;
     margin-bottom: 3vh;

  }
  img{
      width:50vw;
      height: 12vh;
  }
  .box{
      //border: 1px solid black;
      width:60vw;
      padding:8vw;
      padding-top:1rem;
      margin:auto;
     // background: white;
     // box-shadow:0 0 0.8rem grey;
      .Login{
          margin-bottom:9vw;
          span{
              text-decoration-line: underline;
              font-size:1.2rem;
              &:nth-of-type(1){
                  margin-right: 2vh;
              }
              &:nth-of-type(2){
                  margin-left: 2vh;
              }
          }
      }
  }

  .el-button{
        width:60vw;
         margin-top:2rem;
         background:rgb(74, 107, 190);
         color:white;
          margin-bottom:3vw;
  }

  .sigin{
      text-align: left;
      font-size: 0.8rem;
  }

  .hint{
      font-weight: bold;
  }
 
//   .img{
//       position: fixed;
//   }
//   .sign{
//      border: 1px solid black;
//      margin:auto;
//      height:800px;
//      width:100%;
//        background-size:cover; 
//       background-repeat: no-repeat; 
//       background: url("../assets/n1.jpg");

//     .box{
//       box-shadow: 0 0px 20px grey;
//       border:1px solid white;
//       width:600px;
//       margin: auto;
//       margin-top:20px;
//       padding-bottom: 60px;
//     }
    
//     .login{
//       color:black;
//        margin:auto;
//         width:200px;
//         margin-top:50px;
//         font-family: 'Snell Roundhand', cursive;
//       text-align: center;
//       font-size: 60px;
//         font-weight: bold;

//     }
//     .sigin{
//       width:20%;
 
//       margin:auto;
//       margin-top:100px;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       & > div{
//       color:black;
//       font-size:20px;
//       font-weight: bold;
      
//       }
//       .el-button{
//         width:100%;
//       }

//     }
//     .signinbox{
//        width:240px;
//       border:1px solid white;
//       border-radius: 10px;
//       //box-shadow: 0 0px 20px white;
      
//     }

  
  //}
}

</style>