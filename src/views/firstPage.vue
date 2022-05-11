<template>
  <div class="first_Page">
      <div class="steps"><div>1. STEP ONE</div><div>Please enter the locations you want to compare with.</div></div>
      <div class="operations"><div >Search Locations:</div>
      <div @click="searchLocations=[]" class="clickable">x Remove All </div></div>
      <div v-for="(location, index) in searchLocations"  :key="location.fullAddress">{{index+1}}: {{location.shortName}}
        <el-popover
        placement="bottom-end"
        title="Full Address"
        trigger="click"
        :content="location.fullAddress">
        <i class="el-icon-info" slot="reference"/>
    </el-popover></div>
      <el-input id="autocomplete" size="small" type="text" v-model="locationName" placeholder="Enter a location" />
       <el-button @click="addLocations" class="clickable" size=small type>Add</el-button>
      <el-button @click="locationName=''" class="clickable" size=small>Clear</el-button>
      
        <div class="steps"><div>2. STEP TWO ( Optional )</div><div>Please enter the places or  types of the places of you want to live close to below.</div></div>

        <div class="operations"><div >Search Locations:</div>
       <div @click="searchLocations2=[]" class="clickable">x Remove All </div></div>
       <div v-for="(location, index) in searchLocations2"  :key="location.fullAddress">{{index+1}}: {{location.shortName}}
        <el-popover
        placement="bottom-end"
        title="Full Address"
        trigger="click"
        :content="location.fullAddress">
        <i class="el-icon-info" slot="reference"/>
    </el-popover></div>
        <el-input id="autocomplete2" size="small" type="text" v-model="locationName1" placeholder="Enter a location" />
        <el-button @click="addLocations2" class="clickable mg-bt-10" size=small type>Add</el-button>
        <el-button @click="locationName1=''" class="clickable mg-bt-10" size=small >Clear</el-button>
        
       <div class="operations"><div >Location Types:</div>
       <div @click="LocationTypes=[]" class="clickable">x Remove All </div></div>
       <div v-for="(location, index) in LocationTypes"  :key="index">{{index+1}}: {{location}}</div>
        <el-input size="small" type="text" v-model="locationType" placeholder="Please enter a facility type" />
        <el-button @click="addLocationTypes" class="clickable mg-bt-10" size=small type>Add</el-button>
        <el-button @click="locationType=''" class="clickable mg-bt-10" size=small>Clear</el-button>
        <div class="steps"><div>3. STEP THREE</div><div>Press the search button to see the final result!</div></div>
       <div class="search mg-bt-10"><el-button @click="SearchLocations" class="clickable" size=small>Search</el-button></div>
  </div>
</template>

<script>
export default {
    name:"firstPage",
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
      console.log(googleLocation)
      this.googleLocation={'fullAddress':googleLocation.formatted_address,'shortName':googleLocation.name,"viewport":googleLocation.geometry.viewport,"id":googleLocation.place_id}
    })

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
      console.log(googleLocation2)
      this.googleLocation2={'fullAddress':googleLocation2.formatted_address,'shortName':googleLocation2.name,"viewport":googleLocation2.geometry.viewport,"id":googleLocation2.place_id}
    })



  },
  data(){
    return{
      locationName:"",
      locationName1:"",
      locationType:"",
      searchLocations:[],
      searchLocations2:[],
      LocationTypes:[],
      googleLocation:"",
      googleLocation2:""
    }
  },
  methods:{
    addLocations(){
      if (this.locationName){
      this.searchLocations.push(this.googleLocation)
      this.locationName=""
      }else{
          this.$message.error('Please add an valid address!')
      }


    },
    addLocations2(){
     if (this.locationName1){
      this.searchLocations2.push(this.googleLocation2)
      this.locationName1=""
      }else{
          this.$message.error('Please add an valid address!')
      }


    },
    addLocationTypes(){
      if (this.locationType){
      this.LocationTypes.push(this.locationType)
      this.locationType=""
      }else{
          this.$message.error('Please add an valid facility type!')
      }
    },
    SearchLocations(){
        if(this.searchLocations.length>=2){
            this.$message.success('Sucess!')
            console.log(this.searchLocations)
            console.log(this.searchLocations2)
            console.log(this.LocationTypes)
            const params={
                    searchLocations:this.searchLocations,
                    searchLocations2:this.searchLocations2,
                    LocationTypes:this.LocationTypes
                }
            console.log(params)
            this.$router.push({
                name:'secondPage',
                params:params
            }
            )

        }else{
            this.$message.error('Please enter at least two locations to be compared with!')
        }

    }
  }

}
</script>

<style lang="less" scoped>
 .first_Page {

    padding:0 20px;
    width:calc(100% - 40px);
    margin:auto;
    height:60%;
    position: fixed;
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
    }
    .el-input{
        width:100%;
        margin:20px 0;
    }
    .search {
         margin: auto;
         margin-top:20px;
         width:200px;
      .el-button{
       border: 1px solid orange;
        width:200px;
        color:orange;
    }}
    .steps{
       margin: 20px 0;
       border:1px solid orange;
       div{
         padding:10px;
         &:first-child{
         background-color: orange;
       }
       }
    
    }
  }
</style>