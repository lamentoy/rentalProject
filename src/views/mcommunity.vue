<template>
  <div class="community">
       <div class="Title1">Check the community page by searching</div>
      <div class="searchBack">
      <div class="searchBox">
      <el-input id="autoComplete" prefix-icon="el-icon-position" v-model="inputText" placeholder="Enter the places you want to check comment about"/>
      <img @click="jumpToReview1({urls:url,title:googleLocation.shortName})" src="../assets/search.png"/>
      </div>
      </div>
       <div class="areas">
       <div class="Title">Check out top 5 favourite neighbourhoods in different cities </div>
       <div>
           Choose city:
       <el-select v-model="value" placeholder="Select" filterable>
           <el-option
            v-for="item in cities"
            :key="item.city"
            :label="item.city"
            :value="item.city">
           </el-option>
       </el-select>
       </div>
      </div>
      <div class="topSearch">
         
          <div v-for="item in locations" :key="item.urls">
              <img :src="item.urls"/>
              <div @click="jumpToReview(item)">{{item.title}}</div>
          </div>

      </div>
      
  </div>
</template>

<script>
import cities from '../api/cities.json'
export default {
    name:"communityPage",
    mounted(){
        const LocationSearch=new window.google.maps.places.Autocomplete(
      document.getElementById("autoComplete"),
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
      if(googleLocation.photos){
          this.url=googleLocation.photos[0].getUrl()
      }
      else{
          this.url=require('../assets/city.jpeg')
      }
 
      this.googleLocation={'fullAddress':googleLocation.formatted_address,'shortName':googleLocation.name,"viewport":googleLocation.geometry.viewport,"id":googleLocation.place_id}
    })


    },
    data(){
        return{
            inputText:"",
            googleLocation:"",
            cities:cities,
            value:"Melbourne",
            url:"",
            locations:[{'urls':require('../assets/qv.jpeg'),"title":'QV'},{'urls':require('../assets/883.jpeg'),"title":'883 collins st'},{'urls':require('../assets/southern.jpeg'),"title":'565 Flinders Street'}, {'urls':require('../assets/light.jpeg'),"title":'light house'},{'urls':require('../assets/atira.png'),"title":'Scape Peel St Student Accommodation'}]

        }
    },
     watch:{
        value(newVal,oldVal){
            this.loading=true
           
             if(newVal==oldVal){
                 this.loading=false
             }else{
                 switch(newVal) {
                    case "Melbourne":
                        this.locations=[{'urls':require('../assets/qv.jpeg'),"title":'QV'},{'urls':require('../assets/883.jpeg'),"title":'883 collins st'},{'urls':require('../assets/southern.jpeg'),"title":'565 Flinders Street'}, {'urls':require('../assets/light.jpeg'),"title":'light house'},{'urls':require('../assets/atira.png'),"title":'Scape Peel St Student Accommodation'}]
                        break;
                    case "Sydney":
                        this.locations=[{'urls':require('../assets/M.jpeg'),"title":'M City'},{'urls':require('../assets/Z.jpeg'),"title":'Zetland'},{'urls':require('../assets/green.jpeg'),"title":'Green Square'}, {'urls':require('../assets/water.webp'),"title":'Waterloo'},{'urls':require('../assets/darling.webp'),"title":'Darling square'}]
                        break;
                    case "Brisbane":
                    this.locations=[{'urls':require('../assets/garden.webp'),"title":'Garden City'},{'urls':require('../assets/sunny.jpeg'),"title":'Sunnybank'},{'urls':require('../assets/lucia.jpeg'),"title":'st Lucia'}, {'urls':require('../assets/Toowong.jpeg'),"title":'Toowong'},{'urls':require('../assets/Indoorpilly.jpeg'),"title":'Indooroopilly'}]
                        break;
                    case "Perth":
                        this.locations=[{'urls':require('../assets/crawley.jpeg'),"title":'Crawley Village'},{'urls':require('../assets/Nedlands.jpeg'),"title":'Nedlands'},{'urls':require('../assets/murray.jpeg'),"title":'Murray Street'}, {'urls':require('../assets/Cannington.webp'),"title":'Cannington'},{'urls':require('../assets/Wellington.webp'),"title":'Wellington street'}]
                        break;
                    case "Adelaide":
                        this.locations=[{'urls':require('../assets/gray.jpeg'),"title":'Grey Street'},{'urls':require('../assets/Rundle.jpeg'),"title":'Rundle Mall'},{'urls':require('../assets/y.jpeg'),"title":'Y Suits'}, {'urls':require('../assets/dwell.jpeg'),"title":'Dwell'},{'urls':require('../assets/angas.jpeg'),"title":'Angas Street'}]
                        break;
                        // code block
                    }
                 this.loading=false
             }


        }
    },
    methods:{
        jumpToReview(item){
          
            this.$router.push(
                {
                    name:'mreview',
                    params:{"src":item.urls,"title":item.title}
                }
            )
            
        },
        jumpToReview1(item){
            if(this.googleLocation.shortName){
            this.$router.push(
                {
                    name:'mreview',
                    params:{"src":item.urls,"title":item.title}
                }
            )
            }else{
            this.$message.error('Please enter a valid location')
        }
        }
    }

}
</script>

<style lang="less" scoped>
.community{
    //margin:40px;
    background: white;
    position: fixed;
    height: 60vh;
    width:100vw;
    overflow: scroll;
   // padding-bottom: 20px;
//    .foot{
//        width:100%;
//        height: 20px;
//    }
    .searchBack{
         //background:url("../assets/neighbourhood.jpeg");
         padding-top:2vh;
         height:80px;

    }
    .searchBox{
        width:90vw;
        img{
            width:8vw;
            height:4vh;
        }
        margin:auto;
        display: flex;
        align-items: center;
    }
     .areas{
       div:nth-of-type(2){
           text-align: center;
       }
        
        .el-select{
            width:130px;
            height:80px;
            margin-left:10px;

        }
    }
    .Title{
        margin-left:10px;
       padding-left:20px;
        margin-bottom:10px;
        font-size:18px;
        color:#6999e7;
        font-weight: bold;
        border-left: 4px solid #a1c4fd;
        span{
            color:rgb(3, 3, 155);
            font-weight: bold;
            font-size: 20px;
            margin-right:10px;
        }

    }
    .Title1{
        margin:10px;
         margin-top:20px;
       padding-left:20px;
        font-size:18px;
        color:#6999e7;
        font-weight: bold;
        border-left: 4px solid #a1c4fd;
        span{
            color:rgb(3, 3, 155);
            font-weight: bold;
            font-size: 20px;
            margin-right:10px;
        }

    }
    .topSearch{
        width:100%;
        height:calc(100% - 30px);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        
        & > div{
           
            width:380px;
            height: 340px;
            display:flex;
            flex-direction: column;
            align-items: center;
            //border: 1px solid rgb(3, 3, 155);
            margin-bottom: 40px;
            box-shadow: 0 0 2px rgb(3, 3, 155);

            img{
                width:380px;
            height: 300px;
            }
            div{
                margin-top:10px;
                text-decoration-line: underline;
            }
        }
    
    }
}
</style>