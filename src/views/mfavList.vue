<template>
  <div class="favList">
      <div class="result">Favourite Locations</div>
      <el-empty v-if="favList1.length==0" description="The list is currently empty." :image-size="320"></el-empty>
      <div v-if="favList1.length>0" class="resultbody1">
          <el-tag
            v-for="(tag,index) in favList1"
            :key="tag"
            type="warning"
            effect="plain">
            {{tag}}
            <i class="el-icon-close" @click="removeLocation(index)"/>
            </el-tag>
      </div>
      <div class="result">Preferred Results</div>
      <el-empty v-if="favList.length==0" description="The list is currently empty." :image-size="320"></el-empty>
      <div v-if="favList.length>0" class="resultbody">
      
      <div  v-for='(element, index) in favList' :key="element[0]">
          <div class="firstLine">
          <div class="names"><i class="el-icon-location-information"/>{{element[0]}}</div>
         <div class="ratings">
         <el-rate v-model="element[5]" 
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} stars"></el-rate>
                <div class="favIcon" @click="removeFromFavorite(index)"><img src="../assets/removeFav.png" /></div>
         </div>
          </div>
        <el-button style="margin-left:20px;margin-top:1vh" @click="initMap(element,1,0)" type="text" icon="el-icon-s-shop">show on map</el-button>
    
      <div class='eachResult'>
          
     <div class="mainContent1" v-for='(item) in element[1]' :key="element[0]+item[0]+element[2]"><i class="el-icon-school" style="color:darkblue"/>{{item[0]}}:{{item[1].length}}</div>
      
      </div>
      </div>
      </div>
       <div class="showMap" v-show="mapShown">
      <div class="title"><div>{{mapType}} near {{mapTitle}}</div><i class="el-icon-close" @click="mapShown=false"></i></div>
      <div id="map"></div>
      </div>

  </div>
</template>

<script>
export default {
    name:"fav_list",
    mounted(){
        this.favList = this.$store.state.favList
        this.favList1 = this.$store.state.favList1
    },
    data(){
        return{
            favList1:[],
            favList:[],
            mapShown:false,
             mapTitle:"",
             mapType:""
        }
    },
    methods:{
        removeFromFavorite(index){
        this.$confirm("Are you sure to remove it from the list?", "Hint",{
            cancelButtonText:"cancel",
            confirmButtonText:"confirm",
            type:"warning"
        }).then(()=>{ this.favList.splice(index,1)
       
        this.$store.commit("updatefavList",this.favList)
         this.$message.success('Removed successfully!')}).catch(()=> {
    
       })
        // this.favList.splice(index,1)
       
        // this.$store.commit("updatefavList",this.favList)
        
        

      },
       removeLocation(index){
           this.$confirm("Are you sure to remove it from the list?", "Hint",{
            cancelButtonText:"cancel",
            confirmButtonText:"confirm",
            type:"warning"
        }).then(()=>{
            this.favList1.splice(index,1)
       
        this.$store.commit("updatefavList1",this.favList1)
        this.$message.success('Removed successfully!')
        }).catch(()=> {
    
       })
          

    },
    initMap(element,index1,index2) {
        this.mapShown=true
      
        const center = { lat: element[6], lng: element[7] };
        this.mapTitle=element[0]
        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: center,
            scrollwheel: false,
            clickableIcons:false,
        });
        // The marker, positioned at Uluru
        const marker=new window.google.maps.Marker({
            position: center,
            map: map,
            title: this.mapTitle
        });
        const infoWindow = new window.google.maps.InfoWindow();
        marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(element[0]);
      infoWindow.open(marker.getMap(), marker);
    });
    if(index1==1){
       const essential=element[1]
       this.mapType="Essential facilities"
       essential.forEach((places)=>{
           const title = places[0]
           const location=places[1]
           
           location.forEach((l1)=>{
               const geo = l1.geometry.location
               const marker1=new window.google.maps.Marker({
                position: geo,
                map: map,
                title: `${title}`,
                 });
                 marker1.addListener("click", () => {
                infoWindow.close();
                infoWindow.setContent(l1.name);
                infoWindow.open(marker1.getMap(), marker1);
                 });
        

           })

       })}
       if(index1==4){
           const essential=element[4][index2]
           const title = essential[0]
           this.mapType=title
       essential[1].forEach((l1)=>{
           
               const geo = l1.geometry.location
               const marker1=new window.google.maps.Marker({
                position: geo,
                map: map,
                title: `${title}`,
                 });
                 marker1.addListener("click", () => {
                infoWindow.close();
                infoWindow.setContent(l1.name);
                infoWindow.open(marker1.getMap(), marker1);
                 });
        


       })

       }
       
        }
    }


}
</script>

<style lang="less" scoped>
.favList {

    
    z-index:1;
    margin-bottom:10px;
    padding: 4vw;
    margin-top:1vh;  
    width:96vw;
    height: 60vh;
    overflow: scroll;
    .showMap{
        position: fixed;
        background: white;
        box-shadow: 0 0 2px #7d9cce;
        z-index: 2;
        left:5vw;
        top:18vh;
        overflow: scroll;
        width:90vw;
        .title{
            display: flex;
            align-items: center;
            padding:20px;
             justify-content: space-between;
             font:16px;
             color: #174287;
        }
        i{
            cursor: pointer;
        }
     
    #map{
        height: 60vh;
        width:90vw;
    }}
    .el-empty{
         margin-left: calc(50vw - 160px)
         
    }
    .result{
       
        font-size:18px;
        padding-left:20px;
        color:#6999e7;
        font-weight: bold;
        border-left: 4px solid #a1c4fd;
    }
    .resultbody1{
        display: flex;
        flex-wrap: wrap;
        border-top: 1px  solid #a1c4fd;
          margin-top:10px;
          margin-bottom: 15px;
         .el-tag{
             margin-top:1vh;
             background-image: linear-gradient(120deg, #2464cb 0%, #7ad5ff 100%);
             color: white;
             border:1px  solid #a1c4fd;
            box-shadow: 0 1px 8px rgba(0,0,0,0.2);
            margin-right: 15px;
         }}
    .resultbody{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
         border-top: 1px  solid #a1c4fd;
         margin-top:1vh;

        & > div{
            width:90vw;
            margin-top:4vh;
            margin-left:3vw;
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
                 .mainContent{
                     padding:20px;
                     display:flex;
                    justify-content: space-between;
                    flex-wrap: wrap;


                 }
                 .mainContent1{
                     padding:10px;
                     float: left;
                     margin-bottom: 10px;
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