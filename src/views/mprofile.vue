<template>
  <div class="profile">
       <div class="result">Profile</div>
      <div class="content">
          <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <div>Username:    Lily</div>
       <div>Gender:
            <el-radio v-model="radio" label="1">Female</el-radio>
           <el-radio v-model="radio" label="2">Male</el-radio>
           <el-radio v-model="radio" label="3">Secret</el-radio>
       </div>
       <div>Age: Secret</div>
      </div>
  </div>
</template>

<script>
export default {
    name:"profileAcc",
    data(){
        return{
            radio:"3"
        }
    }

}
</script>

<style lang="less" scoped>
.profile{
    height:80vh;
    background: white;
    position: fixed;
    width:100vw;
    overflow: scroll;
    padding: 20px;
    box-sizing: border-box;
    background: #dae8ff;
    .result{
        font-size:18px;
        padding-left:20px;
        border-left: 4px solid #a1c4fd;
         color:#6999e7;
        font-weight: bold;
    }
    .content{
        margin:auto;
    
        box-shadow: 0 0 4px #a6caff;
        margin-top:80px;
        border:1px solid #a1c4fd;
        text-align: center;
         background: white;
        padding: 20px;
        div{
            margin-top: 20px;
            padding-bottom:10px;
        }
    }
}

</style>