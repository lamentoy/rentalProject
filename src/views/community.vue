<template>
  <div class="community" :class="{loadings: loading===true}">
      <div class="searchBack">
      <div class="searchBox">
      <el-input id="autoComplete" prefix-icon="el-icon-position" v-model="inputText" placeholder="Enter the location you want to search about"/>
      <img @click="jumpToReview({urls:require('../assets/city.jpeg'),title:googleLocation.shortName})" src="../assets/search.png"/>
      </div>
      </div>
      <div class="areas">
       <div class="Title">Top 5 Favourites </div>
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
      <div class="topSearch" :class="{loadings: loading===true}" v-loading.target.lock="loading">
         
          <div v-for="item in locations" :key="item.urls">
              <img :src="item.urls"/>
              <div @click="jumpToReview(item)">{{item.title}}</div>
          </div>

      </div>
      
  </div>
</template>

<script>
import cities from '../api/au.json'
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
      //console.log(googleLocation)
      this.googleLocation={'fullAddress':googleLocation.formatted_address,'shortName':googleLocation.name,"viewport":googleLocation.geometry.viewport,"id":googleLocation.place_id}
    })


    },
    data(){
        return{
            inputText:"",
            googleLocation:"",
            value:"melbourne",
            locations:[{'urls':require('../assets/qv.jpeg'),"title":'QV'},{'urls':require('../assets/dock.jpeg'),"title":'Victoria Harbour'},{'urls':require('../assets/southern.jpeg'),"title":'565 Flinders Street'},{'urls':require('../assets/M.jpeg'),"title":'M City'},{'urls':require('../assets/Z.jpeg'),"title":'Zetland'}],
            cities:cities,
            loading:false

        }
    },
    watch:{
        value(newVal,oldVal){
            this.loading=true
            console.log(newVal)
            console.log(oldVal)
             this.loading=false


        }
    },
    methods:{
        jumpToReview(item){
            this.$router.push(
                {
                    name:'review',
                    params:{"src":item.urls,"title":item.title}
                }
            )
        }
    }

}
</script>

<style lang="less" scoped>
.community{
    //margin:40px;
    height:calc(100% - 60px);
    background: white;
    position: fixed;
    margin-left:14%;
    width:86%;
    overflow: scroll;
    &.loadings{
        overflow:hidden;
    }
       .el-loading-mask{
        height:2000px;

    }
   // padding-bottom: 20px;
//    .foot{
//        width:100%;
//        height: 20px;
//    }
    .searchBack{
         //background:url("../assets/neighbourhood.jpeg");
         padding-top:20px;
         height:80px;

    }
    .searchBox{
        width:50%;
        img{
            width:30px;
            height:30px;
        }
        margin:auto;
        display: flex;
        align-items: center;
    }
    .areas{
        display: flex;
        align-items: center;
        .el-select{
            width:200px;
            height:80px;
            margin-left:20px;

        }
    }
    .Title{
        margin-left:20px;
       padding-left:20px;
       margin-right:50%;
        width:160px;
        margin-bottom:40px;
        font-size:18px;
        color:rgb(3, 3, 155);
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