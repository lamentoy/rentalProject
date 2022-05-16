<template>
  <div class="first_Page">
    <el-steps :active="activeStep">
    <el-step title="Step 1" description="Enter the locations you want to compare in this step."></el-step>
    <el-step title="Step 2" description="Enter the places you want to live close to or keywords of facility you would like to have around."></el-step>
    <el-step title="Step 3" description="Seach and get the comparision results."></el-step>
  </el-steps>
  <step1 class="step1" v-show="activeStep==1" @getLocations="getLocations"/>
   <step2 class="step1" v-show="activeStep==2" @getLocations2="getLocations2" @getKeyWord="getKeyWord"/>
   <result class="step1" v-if="activeStep==3" :searchLocations2="searchLocations2" :searchLocations="searchLocations" :LocationTypes="LocationTypes"/>
  <div class="stepChange">
     <el-button @click="changeStep(1)"  v-if="activeStep!=1">Back</el-button>
     <el-button @click="changeStep(2)" v-if="activeStep!=3">Next</el-button>
  </div>
  </div>

</template>

<script>
import step1 from './compare/step1.vue'
import step2 from './compare/step2.vue'
import result from './compare/result.vue'
export default {
    name:"firstPage",
    components:{step1,step2,result},
    mounted(){

  },
  data(){
    return{
      activeStep:1,
      searchLocations:[],
      searchLocations2:[],
      LocationTypes:[],


     
    }
  },
  methods:{
    changeStep(index){
      if(index==1){
        this.activeStep--

      }
      else if(index==2){
        if(this.activeStep==1){
          if(this.searchLocations.length>=2){
             this.activeStep++

          }else{
             this.$message.error('Please enter at least two locations to be compared with!')
          }
        }else{
        this.activeStep++
        }
        
      }
      console.log(this.activeStep)
    },
    getLocations(value){
      console.log(value)
      this.searchLocations=value

    },
    getLocations2(value){
      console.log(value)
      this.searchLocations2=value
     // this.compareocation=value

    },
    getKeyWord(value){
      console.log(value)
      this.LocationTypes=value
     // this.compareocation=value

    },
   
    
  }

}
</script>

<style lang="less" scoped>
 .first_Page {
    margin:40px;
    height:calc(90% - 60px);
     margin-left:calc(14% + 40px);
    background: white;
    position: fixed;
    width:calc(85% - 80px);
    overflow: scroll;
    .el-steps{
      width:80%;
      margin:auto;
      margin-top:40px;
      margin-bottom:20px;
     
      // /deep/ .el-step__head{
      
      // }
    }
    .step1{
       padding-top:15px;
      border-top: 1px solid #a1c4fd;
    }
  
    .clickable{
        cursor: pointer;
    }
    .mg-bt-10{
        margin-bottom: 10px;
    }
    .stepChange{
      width:"100%";
      text-align: center;
      margin-bottom:10px;
   .el-button{
     height: 35px;
      width:90px;
      font-size:12px;
      margin-right:20px;
      border: 1px solid #a1c4fd;
     
     }}
  }
</style>