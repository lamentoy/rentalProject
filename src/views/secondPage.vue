<template>
  <div class="second_Page">
     <div class='result'>Result showing</div>
    
      <div  v-for='(element,index) in results' :key="element[0]"><div class="names">{{element[0]}}</div>
      <div class="ratings">
          <el-rate v-model="element[5]" 
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} stars"></el-rate>
            <div @click="addtoFavorite(element,index)" v-if="!fav[index]" >+ add to favourites</div>
            <div @click="removeFromFavorite(element,index)" v-if="fav[index]" >- remove from favourites</div>
      </div>
      <div v-if="searchLocations2.length>0" >
        <div class="smallTitle">Distance and time taken to desired locations</div>
        <div class='eachResult' v-for='(des,index) in element[3]' :key="element[0]+des[0]">
            {{index+1}}. {{des[0]}}:
            <div>Distance:{{des[1]}}</div>
            <div>Minimal duration:{{des[2]}}</div>
        </div>
     </div>
     <div v-if="LocationTypes.length>0">
         <div class="smallTitle">Number of facilities users would like to have</div>
         <div class='eachResult'><div v-for='(item) in element[4]' :key="element[0]+item[0]+element[2]">{{item[0]}}:{{item[1].length}}</div>
         </div>
     </div>
     <div class="smallTitle">Nearby essential facilities</div>
     <div class='eachResult'><div v-for='(item) in element[1]' :key="element[0]+item[0]+element[2]">{{item[0]}}:{{item[1].length}}</div>
     </div>
      
     </div>
    
     <!-- <div id="map" v-if="mapShown"></div> -->
     
  </div>
</template>

<script>
import axios from "axios"
export default {
    name:"secondPage",
    mounted(){
       
        this.searchLocations=this.$route.params.searchLocations
        this.searchLocations2=this.$route.params.searchLocations2
        this.LocationTypes=this.$route.params.LocationTypes
        this.favList = this.$store.state.favList
        // this.initMap()
        if(this.searchLocations){
        this.searchNearbyLocations()
        sessionStorage.setItem('params', JSON.stringify(this.$route.params));
        let data = sessionStorage.getItem('params');
          
        }else{
            let data = JSON.parse(sessionStorage.getItem('params'));
          
            this.searchLocations=data.searchLocations
            this.searchLocations2=data.searchLocations2
            this.LocationTypes=data.LocationTypes
           
            this.searchNearbyLocations()
        }
   
  },
  data(){
    return{
        searchLocations:[],
        searchLocations2:[],
        LocationTypes:[],
        types:["hospital","restaurant","supermarket","pharmacy"],
        results:[],
        favList:[],
        fav:[],
        mapShown:true
      
    }
  },
  methods:{
      searchNearbyLocations(){
        for(let i =0;i<this.searchLocations.length;i++){
            if( this.searchLocations[i].viewport.Ab){
              var lat = this.searchLocations[i].viewport.Ab.h
              var lng= this.searchLocations[i].viewport.Va.h
            }else{
                 lat = this.searchLocations[i].viewport.south
               lng= this.searchLocations[i].viewport.west
            }
              let added=this.checkIfAdded(this.searchLocations[i].shortName)
              this.fav.push(added)
              this.results.push([this.searchLocations[i].shortName,[],added,[],[]])
              this.distanceMatrix(this.searchLocations[i].id,i)
              for(let j =0;j<this.types.length;j++){
              const URL=`api/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=${this.types[j]}&radius=500&key=AIzaSyDYmXO6pRRuMXAAMe2dlaWaynac17ZZMUE`;
        
            axios.get(URL).then(async response=>{
                  let  result= await response.data.results
                  this.results[i][1].push([this.types[j],result])
                  this.rateThePlace()
                  
                  
              })
              .catch(error=>{
                  console.log(error.message)
              })
              }
              const URL1=`api/maps/api/place/nearbysearch/json?location=${lat},${lng}&keyword=tram_stop&radius=500&key=AIzaSyDYmXO6pRRuMXAAMe2dlaWaynac17ZZMUE`;
        
              axios.get(URL1).then(async response=>{
                  let result= await response.data.results
                  this.results[i][1].push(["tram stop",result])
                  this.rateThePlace()
                  
                  
              })
              .catch(error=>{
                  console.log(error.message)
              })

              if(this.LocationTypes.length>0){
                for(let k =0;k<this.LocationTypes.length;k++){
                const URL2=`api/maps/api/place/nearbysearch/json?location=${lat},${lng}&keyword=${this.LocationTypes[k]}&radius=500&key=AIzaSyDYmXO6pRRuMXAAMe2dlaWaynac17ZZMUE`;
        
                 axios.get(URL2).then(async response=>{
                  let result= await response.data.results
                  this.results[i][4].push([this.LocationTypes[k],result])
                  this.rateThePlace()
                  
                  
              })
              .catch(error=>{
                  console.log(error.message)
              })
             
              }}
          }
          
          

      },
      addtoFavorite(element,index){
          if(this.favList && this.favList.length>0){
              this.favList.push(element)
          }else{
              this.favList = []
              this.favList.push(element)
          }
          this.$store.commit("updatefavList",this.favList)
          this.fav.splice(index,1,true)
   
        
      },
      distanceMatrix(id,index){
        for(let i =0;i<this.searchLocations2.length;i++){
            // const lat1 = this.searchLocations2[i].viewport.Ab.h
            // const lng1= this.searchLocations2[i].viewport.Va.h
            const id2=this.searchLocations2[i].id
            var axios = require('axios');
            var config = {
            method: 'get',
            url: `api/maps/api/distancematrix/json?origins=place_id:${id}&destinations=place_id:${id2}&key=AIzaSyDYmXO6pRRuMXAAMe2dlaWaynac17ZZMUE`,
            headers: { }
            };

            axios(config)
            .then( (response)=> {
            let k=response.data.rows[0].elements[0];
            let distance=k.distance.text;
            let duration=k.duration.text;
            this.results[index][3].push([this.searchLocations2[i].shortName,distance,duration])
            })
            .catch(function (error) {
            console.log(error);
            });}
          

      },
      removeFromFavorite(element,index){
          
          for(let i=0;i<this.favList.length;i++){
              if(this.favList[i][0]==element[0]){
                  this.favList.splice(i,1)
              }
          }
        this.$store.commit("updatefavList",this.favList)
        this.fav.splice(index,1,false)

      },
      checkIfAdded(name){
          var k=false
   
          if(this.favList && this.favList.length>0){
          this.favList.forEach(item=>{
              if(item[0]==name){
                  k=true
              }
  

          })
           }
          return k

      },
      jumptoSearch(){

     
        sessionStorage.removeItem('params');
        this.$router.push('/filltheform')
    },
  
      rateThePlace(){
          this.results.forEach(result=>{
              let rating=0;
              result[1].forEach(item=>{
                  if(item[0]=="hospital"){
                      if(item[1].length<2){
                          rating+=item[1].length/2
                      }else{
                          rating+=1
                      }

                  }
                  if(item[0]=="restaurant"){
                      if(item[1].length<8){
                          rating+=item[1].length/8
                      }else{
                          rating+=1
                      }

                  }
                  if(item[0]=="supermarket"){
                      if(item[1].length<2){
                          rating+=item[1].length/2
                      }else{
                          rating+=1
                      }

                  }
                  if(item[0]=="tram stop"){
                      if(item[1].length<4){
                          rating+=item[1].length/4
                      }else{
                          rating+=1
                      }

                  }
                  if(item[0]=="pharmacy"){
                      if(item[1].length<2){
                          rating+=item[1].length/2
                      }else{
                          rating+=1
                      }

                  }
                  
              })
              result.splice(5,1,rating)
          }
          )
          
      },
//     initMap() {
 
//   const uluru = { lat: -25.344, lng: 131.031 };
  
//   const map = new window.google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: uluru,
//   });

//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });

// }
      

  
  }

}
</script>

<style lang="less" scoped>
 .second_Page {

    padding:0 20px;
    width:calc(100% - 40px);
    margin:auto;
    height:50%;
    position: fixed;
    overflow: scroll;
    #map{
        height:400px;
        width:100%;
    }
    .eachResult{
        border: 1px solid orange;
        padding: 20px;
        margin-bottom:20px;
    }
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
    .result{
       margin: 20px 0;
       border:1px solid orange;
       
       color:orange;
       font-weight: bold;
       padding:10px;
    
    }
    .names{
        background-color: orange;
        text-align: center;
        font-weight: bold;
        font: 14px;
        color:white;
        width:100%;
        box-sizing: border-box;
        padding: 10px; 
    }
    .ratings{
        display:flex;
         margin:10px;
        justify-content: space-around;
        font:8px;
     
    }
    .el-rate{
         text-align: center;
         margin-right: 10px;
         
    }
  }
</style>