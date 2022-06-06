<template>
  <div class="password">
       <div class="result">Password Management</div>
      <el-form>
          <el-form-item label="Current Password">
          <el-input></el-input>
          </el-form-item>
          <el-form-item label="New Password">
          <el-input></el-input>
          </el-form-item>
          <el-button>Submit</el-button>
      </el-form>
  </div>
</template>

<script>
export default {
    name:"changePassword",

}
</script>

<style lang="less" scoped>
.password{
    margin:40px;
    height:calc(90% - 60px);
     margin-left:calc(14% + 40px);
    background: white;
    position: fixed;
    width:calc(85% - 80px);
    overflow: scroll;
    padding: 20px;
    box-sizing: border-box;
    .result{
        font-size:18px;
        padding-left:20px;
        border-left: 4px solid #a1c4fd;
         color:#6999e7;
        font-weight: bold;
    }
    .el-form{
        margin:auto;
        width:600px;
        height:300px;
        margin-top:calc(8%)
    }
}

</style>