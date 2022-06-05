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
      <div class='eachResult'>
          
     <div class="mainContent1" v-for='(item) in element[1]' :key="element[0]+item[0]+element[2]"><i class="el-icon-school" style="color:darkblue"/>{{item[0]}}:{{item[1].length}}</div>
      
      </div>
      </div>
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
            favList:[]
        }
    },
    methods:{
        removeFromFavorite(index){
        this.favList.splice(index,1)
       
        this.$store.commit("updatefavList",this.favList)
        

      },
       removeLocation(index){
          this.favList1.splice(index,1)
       
        this.$store.commit("updatefavList1",this.favList1)

    }
    }


}
</script>

<style lang="less" scoped>
.favList {

    
    z-index:1;
    margin-bottom:10px;
    padding: 2vw;
    margin-top:1vh;  
    width:96vw;
    overflow: scroll;
    .el-empty{
         margin-left: calc(50vw - 160px)
         
    }
    .result{
       
        font-size:18px;
        padding-left:20px;
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