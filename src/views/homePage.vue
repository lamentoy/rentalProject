<template>
  <div class="homePage">
    <!-- <img src="../assets/neighbourhood.jpeg"/> -->
  <div class="sign">
   <div class="bigTitle">Rental Rise.</div>
   <div class="box">
    <div class="login">Log in</div>
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
  
   <el-button @click="jumptoMain">Log in</el-button>
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
  .sign{
     border: 1px solid black;
     margin:auto;
     height:800px;
     width:100%;
       background-size: cover; 
      background-repeat: no-repeat; 
      background: url("../assets/neighbourhood.jpeg");

    .box{
      box-shadow: 0 0px 20px white;
      border:1px solid black;
      width:600px;
      margin: auto;
      margin-top:20px;
      padding-bottom: 60px;
    }
    .bigTitle{
      width: 100%;
      height:100px;
      line-height: 100px;
      color:white;
      font-family: 'Snell Roundhand', cursive;
      text-align: center;
      font-size: 100px;
    }
    .login{
      color:white;
       margin:auto;
        width:200px;
        margin-top:50px;
        font-family: 'Snell Roundhand', cursive;
      text-align: center;
      font-size: 60px;
        font-weight: bold;

    }
    .sigin{
      width:400px;
 
      margin:auto;
      margin-top:100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div{
      color:white;
      font-size:20px;
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