<template>
  <div class="favList">
      <div class="result">Favourite List<div  v-if="!favList.length>0">--- Your list is currently empty!</div></div>
      <div v-if="favList.length>0">

      <div  v-for='(element, index) in favList' :key="element[0]"><div class="names">{{element[0]}}</div>
      <div class='eachResult'>
          <el-rate v-model="element[5]" 
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} stars"></el-rate>
     <div v-for='(item) in element[1]' :key="element[0]+item[0]+element[2]">{{item[0]}}:{{item[1].length}}</div>
     <div class="removeFav" @click="removeFromFavorite(element,index)" >- remove from the favourites</div>
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
    },
    data(){
        return{
            favList:[]
        }
    },
    methods:{
        removeFromFavorite(element,index){
          console.log(element)
         
        this.favList.splice(index,1)
       
        this.$store.commit("updatefavList",this.favList)
        

      },
    }


}
</script>

<style lang="less" scoped>
.favList {

    padding:0 20px;
    width:calc(100% - 40px);
    margin:auto;
    height:80%;
    position: fixed;
    overflow: scroll;
    .eachResult{
        border: 1px solid orange;
        padding: 20px;
        margin-bottom:20px;
    }
    .clickable{
        cursor: pointer;
    }
    .mg-bt-10{
        margin-bottom: 10px;
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
    .result{
       margin: 20px 0;
       border:1px solid orange;
       
       color:orange;
       font-weight: bold;
       padding:10px;
    
    }
    .removeFav{
        text-align: right;
    }
    .el-rate{
         text-align: center;
         margin-bottom: 10px;
         
    }
  }

</style>