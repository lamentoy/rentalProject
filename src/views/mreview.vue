<template>
  <div class="communityReview">
      <div class="titleName"><span/>Community Review Page</div>
      <div class="profileCard">
          <div><img :src="src"/></div>
          <div class="profileBody">
              <div class="profileTitle">{{title}}</div>
              <div class="favLists">
                <div class="favIcon clickable" @click="addtoFavorite()" v-if="!favLoc" ><img src="../assets/addFav.png" /></div>
                <div class="favIcon clickable" @click="removeFromFavorite()" v-if="favLoc" ><img src="../assets/removeFav.png" /></div>
              <div class="writeReview" @click="dialogVisible=true"><i class="el-icon-star-off"/><i class="el-icon-edit-outline"/></div>
              </div>
              <div class="profileRating">
              <div>Noisy Level:
                <el-rate
                disabled
                show-score
                v-model.number="value1"
                :icon-classes="iconClasses1"
                disabled-void-color="rgb(198, 209, 222)"
                score-template="  Level {value}"
                disabled-void-icon-class="icon-rate-face-off"
                :colors="['#FF9900', '#F7BA2A', '#99A9BF']">
                </el-rate>
             </div>
              <div>Safety Level:
                <el-rate
                v-model.number="value2"
                disabled
                show-score
                :icon-classes="iconClasses"
                score-template="  Level {value}"
                disabled-void-color="rgb(198, 209, 222)"
                disabled-void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
              <div>Environment:
                <el-rate
                v-model.number="value3"
                disabled
                :icon-classes="iconClasses"
                show-score
                score-template="  Level {value}"
                disabled-void-color="rgb(198, 209, 222)"
                disabled-void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
               
              </div>
              <div class="profileFooter"><i class="el-icon-info"/>Average rating ({{people}} ratings in total)</div>
          </div>
      </div>
      <div class="Comments">
          <div class="comment">
          <div class="peoples">
          <el-avatar src="https://img.syt5.com/2021/0519/20210519083837846.jpg.420.420.jpg"></el-avatar>
          <span>Josh</span>
          </div>
          <div>The place is nice but a little bit noisy at night.</div>
          <div class="timestampS">Published at: 20:18:05 06/05/2022</div>
          
          </div>
          <div class="comment">
          <div class="peoples">
          <el-avatar src="https://img.syt5.com/2021/0127/20210127085935853.jpg.420.420.jpg"></el-avatar>
          <span>Kate</span>
          </div>
          <div>I lived near this place and I don't like it. Prepare moving to other house.</div>
          <div class="timestampS">Published at: 06:14:43 12/05/2022</div>
          </div>
          <div class="comment">
              <div class="peoples">
          <el-avatar src="https://img.syt5.com/2021/0127/20210127085207772.png.420.420.jpg"></el-avatar>
          <span>Elisa</span>
          </div>
          <div>Easy to buy stuff's here!!!</div>
          <div class="timestampS">Published at: 19:18:23 24/05/2022</div>
          </div>
          <div class="comment">
          <div class="peoples">
           <el-avatar src="https://img.syt5.com/2021/0826/20210826091718477.jpg.420.420.jpg"></el-avatar>
          <span>Lanbert</span>
          </div>
          <div>A lot of people here at night, feeling safe when i went home late.</div>
          <div class="timestampS">Published at: 21:38:10 01/06/2022</div>
          </div>
          <div  v-if="comments.length>0">
          <div class="comment myself" v-for="(c,index) in comments" :key="index+c">
            <div class="peoples">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
             <span>me</span>
          </div>
    
          <div>{{c[0]}}</div>
          <div class="timestampS">Published at: {{c[1]}} {{c[2]}}</div>
          </div>
          </div>




      </div>
      <el-dialog
      title="Rating and Comments"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      :modal="false"
      width="80vw"
      >
      <div class="profileRating">
              <div>Noisy Level 
                <el-rate
                v-model.number="value4"
                show-score
                :icon-classes="iconClasses1"
                score-template="  Level {value}"
                text-color="#ff9900"
                void-icon-class="icon-rate-face-off"
                :colors="['#FF9900', '#F7BA2A', '#99A9BF']">
                </el-rate>
             </div>
              <div>Safety Level
                <el-rate
                v-model.number="value5"
                :icon-classes="iconClasses"
                text-color="#ff9900"
                score-template="  Level {value}"
                show-score
                void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
              <div>Environment
                <el-rate
                v-model.number="value6"
                :icon-classes="iconClasses"
                score-template="  Level {value}"
                text-color="#ff9900"
                show-score
                void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
              <div>Comments:
                  <el-input type="textarea" v-model="comment"></el-input>
              </div>
              <div class="buttons">
              <el-button @click="submitComments">Submit</el-button>
              <el-button @click="cancelComments">Cancel</el-button>
              </div>
        </div>

      </el-dialog>
      <div class="firstline"><el-button v-if="result" @click="resultPage">Back to result page</el-button>
      <el-button v-if="!result" @click="$router.push('/mcommunity')">Back to community page</el-button>
      </div>
  </div>
</template>

<script>
import '../assets/fonts/style.css'
export default {
    name:"reviewPage",
    mounted(){
        this.src=this.$route.params.src
        this.title=this.$route.params.title
        let pre=this.$route.params.pre
        this.favList = this.$store.state.favList1
        if(pre==1){
            this.result=true
             this.searchLocations=this.$route.params.searchLocations
            this.searchLocations2=this.$route.params.searchLocations2
            this.LocationTypes=this.$route.params.LocationTypes

        }
        this.checkFav()
 
    },
    data(){
        return{
            src:"",
            title:"",
            value1: 4,
            value2: 4,
            value3: 3,
            value4: 0,
            value5: 0,
            value6: 0,
             favLoc:false,
            searchLocations:[],
            searchLocations2:[],
            LocationTypes:[],
           // "searchLocations":this.searchLocations,"searchLocations2":this.searchLocations2,"LocationTypes":this.LocationTypes
            result:false,
            comment:'',
            comments:[],
            people:10,
            iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
            iconClasses1: ['icon-rate-face-3', 'icon-rate-face-2', 'icon-rate-face-1'],
            dialogVisible:false
        }
    },
    methods:{
        submitComments(){
            if(this.comment!=""){
            this.comments.push([this.comment,new Date().toLocaleTimeString(),new Date().toLocaleDateString()])
            this.people+=1
            this.value1= ((this.value4+this.value1*(this.people-1))/this.people).toFixed(1)
            this.value2= ((this.value5+this.value2*(this.people-1))/this.people).toFixed(1)
            this.value3= ((this.value6+this.value3*(this.people-1))/this.people).toFixed(1)
            this.comment=""
            this.value4=0
            this.value5=0
            this.value6=0
            this.dialogVisible=false
            this.$message.success('Comment submitted!')

            }
            else{
                this.$message.error('Please enter a valid comment')
            }
        },
        addtoFavorite(){
            this.favList.push(this.title)
            this.$store.commit("updatefavList1",this.favList)
            this.favLoc=true
            this.$message.success('You like the place!')
        },
        removeFromFavorite(){
            this.index=this.favList.indexOf(this.title)
            this.favList.splice(this.index,1)
             this.$store.commit("updatefavList1",this.favList)
            this.favLoc=false
            this.$message.error('You unlike the place!')
        },
        checkFav(){
            this.index=this.favList.indexOf(this.title)
            if(this.index==-1){
                this.favLoc=false

            }else{
                this.favLoc=true
            }
        },
        cancelComments(){
            this.dialogVisible=false
            this.comment=""
            this.value4= 0
            this.value5= 0
            this.value6= 0

        },
        resultPage(){
            this.$router.push(
                {
                    name:'mfirstPage',
                    params:{"pre":2,"searchLocations":this.searchLocations,"searchLocations2":this.searchLocations2,"LocationTypes":this.LocationTypes}
                }
            )

        },
        
    
    }

}
</script>

<style lang="less" scoped>
.communityReview {
    margin-top:2vh;
    height: 60vh;
    width:100vw;
    background: white;
    position: fixed;
    overflow: scroll;
    .profileCard{
        box-sizing: border-box;
        width: 90vw;
        border: 1px solid #a1c4fd;
        margin-left:5vw;
        margin-top:2vh;
        box-shadow: 0 0 8px #89b6ff;

        img{
            width:90vw;
            height: 300px;
        }
        .profileBody{
            width:90vw;
             overflow: scroll;
            .profileTitle{
                font-family: 'Courier New', Courier, monospace;
                font-size:25px;
                text-align: center;
                margin-bottom: 10px;
            }
            .profileFooter{
                 margin-bottom: 20px;
                 margin-right:20px;
                text-align: right;
                i{
                    color:orange;
                }
                font-size: 12px;
                
                //align-items: center;

            
            }
            .favLists{
                display: flex;
                justify-content: space-between;
                margin: 20px;
                margin-top:0;
                .favIcon, img{
                         width:16px;
                         height: 16px;
                     }
                div{
                     cursor: pointer;
                }
            .writeReview{
                 cursor: pointer;
            }}
            .profileRating{
                 padding-left: 30px;
                 padding-right:30px;
                div{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
                .el-rate{
                    margin-left:20px;
                    
                }
            }
        }
    }
        .Comments{
            width:90vw;
            margin-left:5vw;
            border: 1px solid #a1c4fd;
            box-shadow: 0 0 8px #89b6ff;
             overflow: scroll;
           
            margin-top:2vh;
            padding: 30px;
            box-sizing: border-box;
            .comment{
                position: relative;
                display: flex;
                align-items: center;
                box-shadow: 0 0 8px #89b6ff;
                background: #b6d2ff;
                padding: 20px;
                margin-bottom:30px;
                .timestampS{
                    position: absolute;
                    bottom:6px;
                    right:8px;
                    font-size: 12px;
                }
                &.myself{
                    background: white;
                }
                .peoples{
                    align-items: center;
                    justify-content: center;
                    padding: 5px;
                    display: flex;
                    flex-direction:column;
                    .span{
                        font-weight: bold;
                    }
                    // border:1px solid black;
                    // background: #d9e4f4;
                    
                   
                    
                }
                div:nth-of-type(2){
                     word-break: break-word;
                   // overflow: scroll;
                   margin-left:20px;

                }

            }

        }
        .firstline{
        .el-button{
            margin-top:2vh;
             height:30px;
            width:200px;
            padding: 0;
            margin-left:calc(50% - 100px)
        }}
        .titleName{
            text-align: center;
            display: flex;
            align-items: center;
             color:#6999e7;
        font-weight: bold;
            height:30px;
            width:250px;
            padding: 0;
            border-radius: 3px 3px 0 0;
            span{
                display: inline-block;
                height: 20px;
                margin:5px;
                margin-left:15px;
                 margin-right:10px;
                width:5px;
                background: #89b6ff;
            }
        }
        .el-dialog{
           padding: 20px;
            text-align: center;

            .buttons{
                width:100%;
               
                .el-button{
                    background:#a1c4fd;
                }
                
            }
            .profileRating{

                div{
                    //display: flex;
                    margin-bottom: 10px;
                    
                   
                }
                .el-rate{
                   // margin-left:20px;
                    
                }
            }
        }
    }

</style>