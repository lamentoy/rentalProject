<template>
  <div class="firstStep">
       
    <div class="SearchBox">
      <el-input id="autocomplete"  type="text" v-model="locationName" placeholder="Please enter a location to add" prefix-icon="el-icon-search"/>
      </div>  
      <div class="buttons">
         <el-button @click="addLocations" class="clickable" >Add</el-button>
         <el-button @click="locationName=''" class="clickable" >Clear</el-button>  
      </div>
     <div class="operations"><div class="opTitle" >Location List:</div>
      <el-button @click="clearlocations" ><i class="el-icon-close"/> Remove All </el-button></div>
      <div class="tagsLoc" v-for="(location,index) in searchLocations"  :key="location.fullAddress"><el-tag effect="plain">{{location.shortName}}
        <el-popover
        placement="bottom-end"
        title="Full Address"
        trigger="click"
        :content="location.fullAddress">
        <i class="el-icon-info" slot="reference"/>

    </el-popover>
    <i class="el-icon-close" @click="removeLocation(index)"/>
    </el-tag></div>
    <el-empty v-if="searchLocations.length==0" description="The list is currently empty." :image-size="45"></el-empty>
   </div>
</template>

<script>
export default {
    name:"mfirstStep",
    mounted(){
    const LocationSearch=new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        bounds: window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(-25.274398, 133.775136)
        )
      }
    )
     LocationSearch.setComponentRestrictions({
    country: ["au"],
    });

    LocationSearch.addListener("place_changed", ()=>{
      let googleLocation=LocationSearch.getPlace()
      if(googleLocation.photos){
          this.url=googleLocation.photos[0].getUrl()
      }
      else{
          this.url=require('../../assets/city.jpeg')
      }
      this.googleLocation={'fullAddress':googleLocation.formatted_address,'shortName':googleLocation.name,"viewport":googleLocation.geometry,"id":googleLocation.place_id,"url":this.url}
    })
  },
  data(){
    return{
      locationName:"",
    
      searchLocations:[],
    
      googleLocation:"",
      url:"",

    }
  },
  methods:{
    addLocations(){
      if (this.locationName && this.googleLocation){
      this.searchLocations.push(this.googleLocation)
      this.locationName=""
      this.googleLocation=""
      this.$emit('getLocations', this.searchLocations)
      }else{
          this.$message.error('Please add an valid address!')
      }


    },
    clearlocations(){
        this.searchLocations=[]
        this.$emit('getLocations', this.searchLocations)

    },
    removeLocation(index){
         this.searchLocations.splice(index,1)
         this.$emit('getLocations', this.searchLocations)

    },
    
  }

}
</script>

<style lang="less" scoped>
 .firstStep {

     z-index:1;
    margin:auto;
    margin-top:1vh;
    
    width:85vw;
    overflow: scroll;
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
        border-bottom: 1px solid #a1c4fd;
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
            margin-top:2vh;
            
           float:left;
           margin-right:20px;
        }

    .SearchBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom:1vh;
        .el-input{
            width:100vw;
        }
   
        
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
       margin-bottom:3vh;
     }

  
  }
</style>