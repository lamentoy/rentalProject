<template>

  <div class="first_Page">
    <el-steps :active="activeStep">
    <el-step title="Step 1" description="Enter the neighbourhoods you want to compare in this step."></el-step>
    <el-step title="Step 2" description="Enter the places you want to live close to or keywords of facility you would like to have around.(Optional)"></el-step>
    <el-step title="Step 3" description="Seach and get the comparision results."></el-step>
  </el-steps>
  <div class="title">Compare different neighbourhoods in three steps.</div>
  <step1 class="step1" v-show="activeStep==1" @getLocations="getLocations" />
   <step2 class="step1" v-show="activeStep==2" @getLocations2="getLocations2" @getKeyWord="getKeyWord"/>
   <result class="step1" v-if="activeStep==3" :searchLocations2="searchLocations2" :searchLocations="searchLocations" :LocationTypes="LocationTypes"/>
  <div class="stepChange">
     <el-button @click="changeStep(1)"  v-if="activeStep==2">Back</el-button>
     <el-button @click="changeStep(2)" v-if="activeStep!=3">Next</el-button>
     <el-button @click="changeStep(3)" class="again" v-if="activeStep==3 && pre==2">Search Again</el-button>
     <el-button @click="changeStep(1)"  v-if="activeStep==3 && pre!=2">Back</el-button>
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
      let pre=this.$route.params.pre
        if(pre==2){
            this.result=true
             this.searchLocations=this.$route.params.searchLocations
            this.searchLocations2=this.$route.params.searchLocations2
            this.LocationTypes=this.$route.params.LocationTypes
            this.activeStep=3
            this.pre=2


        }
     

  },
  data(){
    return{
      activeStep:1,
      searchLocations:[],
      searchLocations2:[],
      LocationTypes:[],
      pre:0,


     
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
      else if(index==3){
        this.activeStep=1
        this.pre=0
      
      }

    },
    getLocations(value){
  
      this.searchLocations=value

    },
    getLocations2(value){
     
      this.searchLocations2=value
     // this.compareocation=value

    },
    getKeyWord(value){

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
    .title{
      width:80%;
      margin:auto;
       margin-top:20px;
       font-size: 20px;
       color: #6999e7;
       text-align: center;
       font-weight: bold;
    }
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

     
     }
     .again{
        width:120px;
     }}
  }
</style>