<template>
  <div class="first_Page">
    <el-steps :active="activeStep" :align-center="true">
    <el-step title="Step 1" description="Enter the locations to compare."></el-step>
    <el-step title="Step 2" description="Enter the places or keywords of facility to calculate."></el-step>
    <el-step title="Step 3" description="Seach and get results."></el-step>
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
import step1 from './compare/mstep1.vue'
import step2 from './compare/mstep2.vue'
import result from './compare/mresult.vue'
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
  
   
    background: white;
    position: fixed;
    width:100vw;
    height:73vh;
    overflow: scroll;
    .el-steps{
      width:100vw;
      margin:auto;
      margin-top:4vh;
      margin-bottom:4vh;
     
     
      // /deep/ .el-step__head{
      
      // }
    }
    .step1{
       padding-top:2vh;
      border-top: 1px solid #a1c4fd;
    }
  
    .clickable{
        cursor: pointer;
    }
    .mg-bt-10{
        margin-bottom: 10px;
    }
    .stepChange{
      width:100%;
      text-align: center;
      margin-bottom:2vh;
   .el-button{
     height: 30px;
      width:90px;
      font-size:12px;
      margin-right:20px;
      border: 1px solid #a1c4fd;
     padding: 0;
       margin-top:2vh;
     }}
  }
</style>