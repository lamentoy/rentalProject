<template>
  <div class="SecondStep">
        
       <div>
        <div class="SearchBox">
        <el-input id="autocomplete2" size="small" type="text" v-model="locationName1" placeholder="Enter a location you want to live close to." />
        </div>
       <div class="buttons">
         <el-button @click="addLocations2" class="clickable mg-bt-10"  >Add</el-button>
        <el-button @click="locationName1=''" class="clickable mg-bt-10" >Clear</el-button>
       </div>
         <div class="operations"><div class="opTitle" >Location List:</div>
      <el-button @click="clearlocations" ><i class="el-icon-close"/> Remove All </el-button></div>
      <div class="tagsLoc" v-for="(location,index) in searchLocations2"  :key="location.fullAddress"><el-tag effect="plain">{{location.shortName}}
        <el-popover
        placement="bottom-end"
        title="Full Address"
        trigger="click"
        :content="location.fullAddress">
        <i class="el-icon-info" slot="reference"/>
        </el-popover>
        <i class="el-icon-close" @click="removeLocation(index)"/>
        </el-tag></div>
    <el-empty v-if="searchLocations2.length==0" description="The list is currently empty." :image-size="55"></el-empty>
     
       </div>
       <div>
       <div class="SearchBox">
        <el-input size="small" type="text" v-model="locationType" placeholder="Please enter a facility type" />
       </div>
       <div class="buttons">
         <el-button @click="addLocationTypes" class="clickable mg-bt-10" >Add</el-button>
        <el-button @click="locationType=''" class="clickable mg-bt-10">Clear</el-button>
       </div>
        <div class="operations"><div class="opTitle">Key Words:</div>
       <el-button @click="clearTypes" class="clickable"><i class="el-icon-close"/>  Remove All </el-button></div>
       <div class="tagsLoc" v-for="(location,index) in LocationTypes"  :key="location+index"><el-tag effect="plain" type="warning">{{location}}
       
        <i class="el-icon-close" @click="removeTag(index)"/>
        </el-tag></div>
       <el-empty v-if="LocationTypes.length==0" description="The list is currently empty." :image-size="55"></el-empty>
       </div>

  </div>
</template>

<script>
export default {
    name:"seconStep",
    mounted(){
   
    
 const LocationSearch2=new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete2"),
      {
        bounds: window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(-25.274398, 133.775136)
        )
      }
    )
    LocationSearch2.setComponentRestrictions({
    country: ["au"],
    });

    LocationSearch2.addListener("place_changed", ()=>{
      let googleLocation2=LocationSearch2.getPlace()
  
      this.googleLocation2={'fullAddress':googleLocation2.formatted_address,'shortName':googleLocation2.name,"viewport":googleLocation2.geometry.viewport,"id":googleLocation2.place_id}
    })



  },
  data(){
    return{
      locationName1:"",
      locationType:"",
      searchLocations2:[],
      LocationTypes:[],
      googleLocation2:""
    }
  },
  methods:{
    addLocations2(){
     if (this.locationName1 && this.googleLocation2){
      this.searchLocations2.push(this.googleLocation2)
      this.locationName1=""
       this.googleLocation2=""
      this.$emit('getLocations2', this.searchLocations2)
      }else{
          this.$message.error('Please add an valid address!')
      }
    },
    addLocationTypes(){
      if (this.locationType){
      this.LocationTypes.push(this.locationType)
      this.$emit('getKeyWord', this.LocationTypes)
      this.locationType=""
      }else{
          this.$message.error('Please add an valid facility type!')
      }
    },
    clearTypes(){
        this.LocationTypes=[]
      this.$emit('getKeyWord', this.LocationTypes)
    },
     clearlocations(){
        this.searchLocations2=[]
        this.$emit('getLocations2', this.searchLocations2)

    },
    removeLocation(index){
         this.searchLocations2.splice(index,1)
         this.$emit('getLocations2', this.searchLocations2)
    },
    removeTag(index){
         this.LocationTypes.splice(index,1)
          this.$emit('getKeyWord', this.LocationTypes)
    },
 
  }

}
</script>

<style lang="less" scoped>
 .SecondStep {

    z-index:1; 
    margin-bottom:10px;
    margin:auto;
    margin-top:1vh;  
    width:85vw;
    overflow: scroll;
    // & > div{
    //     width: 85vw;
    //     padding-right:20px;
       
    // }
    .el-icon-info{
        size:8px;
        color:orange;
    }
    .clickable{
        cursor: pointer;
    }
    .mg-bt-10{
        margin-bottom: 10px;
    }
   .operations{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #a1c4fd;
        margin-bottom: 2vh;
        padding-bottom:10px;
        font-size:13px;
        align-items: center;
         color:rgb(12, 44, 96);
        .el-button{
             height: 30px;
            width:100px;
            font-size:0.7rem;
            margin-right:20px;
            background: #effaff;
            padding: 10px 10px 10px 0px; 

        }
        .opTitle{
            border-left: 4px  solid #a1c4fd;
           
            padding-left:10px;
            display: flex;
           align-items: center;
        }
        
    }
    .tagsLoc .el-tag{
        margin-bottom:1vh;
        float:left;
        margin-right:20px;
    }
     .el-button{
            height: 30px;
             width:80px;
             padding: 0;
             margin:0;
            background: #effaff;
            font-size: 0.6rem;

          

        }
     .buttons{
       margin-bottom:2vh;
     }

  
  
   
    .SearchBox{
        margin-bottom:1vh;
         //border-bottom:1px solid #a1c4fd;
        .el-input{
            width:85vw;
            margin-bottom:1vh;

             height: 32px;
        }
   
        .el-button{
            height: 32px;
             width:60px;
             margin:0;
            background: #effaff;
            font-size:11px;
            padding: 10px; 
          

        }
    }
  }
</style>