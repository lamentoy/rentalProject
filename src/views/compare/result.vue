<template>
  <div class="resultPage">
      <div class='opTitle'>Result Showing</div>
      <div class="resultbody">
      <div  v-for='(element,index) in results' :key="element[0]">
        <div class="firstLine">
        <div class="names"> <i class="el-icon-location-information"/>{{element[0]}}</div>
        <div class="ratings">
                <div class="favIcon clickable" @click="addtoFavorite(element,index)" v-if="!fav[index]" ><img src="../../assets/addFav.png" /></div>
                <div class="favIcon clickable" @click="removeFromFavorite(element,index)" v-if="fav[index]" ><img src="../../assets/removeFav.png" /></div>
        </div>
        </div>
      <div v-if="searchLocations2.length>0" >
        <div class="smallTitle">Distance and time taken to desired locations</div>
        <div class='eachResult' v-for='(des) in element[3]' :key="element[0]+des[0]">
            <div><i class="el-icon-location-information"/>{{des[0]}}:</div>
            <div class="mainContent">
            <div><i class="el-icon-guide" style="color:darkblue"/>Distance:{{des[1]}}</div>
            <div><i class="el-icon-truck" style="color:darkblue"/>Minimal duration:{{des[2]}}</div>
            </div>
        </div>
     </div>
     <div v-if="LocationTypes.length>0">
         <div class="smallTitle">Number of facilities users would like to have</div>
         <div class='eachResult'><div class="mainContent1" v-for='(item) in element[4]' :key="element[0]+item[0]+element[2]"><i class="el-icon-school" style="color:darkblue"/>{{item[0]}}:{{item[1].length}}</div>
         </div>
     </div>
     <div class="smallTitle">Nearby essential facilities</div>
     <div class='eachResult'>
         <div class="mainContent1" v-for='(item) in element[1]' :key="element[0]+item[0]+element[2]"><div><i class="el-icon-school" style="color:darkblue"/>{{item[0]}}:{{item[1].length}}</div></div>
     </div>

     <div class="smallTitle">Life convenience rating</div>
     <div class='eachResult finalone'>
     <el-rate v-model="element[5]" 
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} stars"></el-rate>
      
      <div><i class="el-icon-info"/>This rating was calculated by an algorithm involving the essential facilities only. To see others' review please click the button below.</div>
     
     <el-button  @click="jumpToReview({urls:require('../../assets/city.jpeg'),title:element[0]})">Review Page</el-button>
     </div>
     </div>
      </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name:"resultPage",
    props:["searchLocations","searchLocations2","LocationTypes"],
    mounted(){
        //         console.log(this.$route.params.searchLocations)
        // console.log(this.$route.params.searchLocations2)
        // console.log(this.$route.params.LocationTypes)
        // this.searchLocations=this.$route.params.searchLocations
        // this.searchLocations2=this.$route.params.searchLocations2
        // this.LocationTypes=this.$route.params.LocationTypes
        // this.favList = this.$store.state.favList
        // // this.initMap()
        // if(this.searchLocations){
        // this.searchNearbyLocations()
        // sessionStorage.setItem('params', JSON.stringify(this.$route.params));
        // let data = sessionStorage.getItem('params');
        //     console.log('adddd',data)
        // }else{
        //     let data = JSON.parse(sessionStorage.getItem('params'));
        //     console.log(data)
        //     console.log(data.searchLocations)
        //     this.searchLocations=data.searchLocations
        //     this.searchLocations2=data.searchLocations2
        //     this.LocationTypes=data.LocationTypes
        //     console.log(data.searchLocations2)
        //     console.log(data.LocationTypes)
        //     this.searchNearbyLocations()
        // }
        this.searchNearbyLocations()
   
  },
  data(){
    return{
        types:["hospital","restaurant","supermarket","pharmacy"],
        results:[],
        favList:[],
        fav:[],
        mapShown:true
      
    }
  },
  methods:{
      searchNearbyLocations(){
          console.log("calculate")
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
                  console.log(result);
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
                  console.log(result);
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
              console.log(this.results)
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
        console.log(element)
        console.log(this.favList)
        console.log(this.results)
        
      },
      distanceMatrix(id,index){
        for(let i =0;i<this.searchLocations2.length;i++){
            // const lat1 = this.searchLocations2[i].viewport.Ab.h
            // const lng1= this.searchLocations2[i].viewport.Va.h
            const id2=this.searchLocations2[i].id
            console.log('222222',id,id2)
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
          console.log(element)
          for(let i=0;i<this.favList.length;i++){
              if(this.favList[i][0]==element[0]){
                  this.favList.splice(i,1)
              }
          }
        this.$store.commit("updatefavList",this.favList)
        this.fav.splice(index,1,false)
        console.log(element)
        console.log(this.favList)
        console.log(this.results)

      },
      jumpToReview(item){
            this.$router.push(
                {
                    name:'review',
                    params:{"src":item.urls,"title":item.title}
                }
            )
        },
      checkIfAdded(name){
          var k=false
          console.log(this.favList)
          console.log(name)
          if(this.favList && this.favList.length>0){
          this.favList.forEach(item=>{
              if(item[0]==name){
                  k=true
              }
        console.log(this.favList)

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
 .resultPage {

    z-index:1;
    margin:auto;
    margin-top:10px;
    margin-bottom:10px;
    height:55%;
    width:85%;
    overflow: scroll;
    .resultbody{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
         border-top: 1px  solid #a1c4fd;
         margin-top:15px;

        & > div{
            width:49%;
            margin-top:20px;
            box-sizing: border-box;
            border:1px  solid #a1c4fd;
            box-shadow: 0 1px 8px rgba(0,0,0,0.2);
           // text-align: center;
           
            .firstLine{
                display: flex;
                justify-content: space-between;
                background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
                 border-bottom:1px  solid #a1c4fd;
                padding: 15px;
                .names{
                width:auto;
                font-size: 18px;
                //border-bottom:2px  solid #7d9cce;
                 display: flex;
                align-items: center;
                color:rgb(12, 44, 96);
                font-weight: 14px;
                i{
                    color:red;
                    margin-right:2px;
                }
               // margin-bottom:15px;
    
                 //text-decoration-thickness: 2px;
                }
                .ratings{
                     display: flex;
                     justify-content: space-between;
                     align-items: center;
                     .favIcon, img{
                         width:16px;
                         height: 16px;
                     }
                     .favIcon{
                         margin-left:10px;
                     }

                }
            }

            .smallTitle{
                padding:15px 0;
                margin:0 15px;
                border-bottom:2px  dashed #7d9cce;
                clear:both;
            }
            .eachResult{
                 padding:15px;
                 
                 i{
                    color:red;
                    margin-right:2px;
                }
                &.finalone{
                    i{
                    color:orange;
                    margin-right:2px;
                    
                }
                font-size:12px;
                .el-rate{
                     text-align: center;
                 }
                  .el-button{
                     margin-top:10px;
                     font-size: 12px;
                     width:90px;
                     height:30px;
                     padding: 0;
                     background:#effaff;
                     margin-left:calc(50% - 45px);
                 }

                }
                 .mainContent{
                     padding:20px;
                     display:flex;
                    justify-content: space-between;
                    flex-wrap: wrap;


                 }
                 .mainContent1{
                     padding:20px;
                     float: left;
                    div{
                        width: auto;}


                 }
            }
            
        }

    }
    .clickable{
        cursor: pointer;
    }
    .mg-bt-10{
        margin-bottom: 10px;
    }

    .opTitle{
        border-left: 4px  solid #a1c4fd;
        color:rgb(12, 44, 96);
        font-weight: bold;
        padding-left:10px;
        display: flex;
        align-items: center;
    }
        
    
    .tagsLoc .el-tag{
        margin-top:10px;
        float:left;
        margin-right:20px;
    }
   
    .SearchBox{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom:10px;
         //border-bottom:1px solid #a1c4fd;
        .el-input{
            width:calc(100% - 160px);
            margin:20px 0;
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