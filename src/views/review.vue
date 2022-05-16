<template>
  <div class="communityReview">
      <div class="profileCard">
          <div><img :src="src"/></div>
          <div class="profileBody">
              <div class="profileTitle">{{title}}</div>
              <div class="writeReview"><i class="el-icon-star-off"/><i class="el-icon-edit-outline"/></div>
              <div class="profileRating">
              <div>Noisy Level 
                <el-rate
                disabled
                v-model="value1"
                :icon-classes="iconClasses1"
                void-icon-class="icon-rate-face-off"
                :colors="['#FF9900', '#F7BA2A', '#99A9BF']">
                </el-rate>
             </div>
              <div>Safety Level
                <el-rate
                v-model="value2"
                 disabled
                :icon-classes="iconClasses"
                void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
              <div>Environment
                <el-rate
                v-model="value3"
                :icon-classes="iconClasses"
                 disabled
                void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
              </div>
          </div>
      </div>
      <div class="Comments">
          <div class="comment">
          <el-avatar src="https://img.syt5.com/2021/0519/20210519083837846.jpg.420.420.jpg"></el-avatar>
          <div>The place is nice but a little bit noisy at night.</div>
          </div>
          <div class="comment">
          <el-avatar src="https://img.syt5.com/2021/0127/20210127085935853.jpg.420.420.jpg"></el-avatar>
          <div>I lived near this place and I don't like it. Prepare moving to other house.</div>
          </div>
          <div class="comment">
          <el-avatar src="https://img.syt5.com/2021/0127/20210127085207772.png.420.420.jpg"></el-avatar>
          <div>Easy to buy stuff's here!!!</div>
          </div>
          <div class="comment">
          <el-avatar src="https://img.syt5.com/2021/0826/20210826091718477.jpg.420.420.jpg"></el-avatar>
          <div>A lot of people here at night, feeling safe when i went home late.</div>
          </div>




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
        console.log(this.src)
        console.log(this.title)
    },
    data(){
        return{
            src:"",
            title:"",
            value1: 0,
            value2: 1,
            value3: 5,
            iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
            iconClasses1: ['icon-rate-face-3', 'icon-rate-face-2', 'icon-rate-face-1']
        }
    }

}
</script>

<style lang="less" scoped>
.communityReview {
    margin:40px;
    height:590px;
    margin-top:60px;
     margin-left:calc(14% + 40px);
    background: white;
    position: fixed;
    width:calc(85% - 80px);
     display: flex;
    overflow: scroll;
    .profileCard{
        box-sizing: border-box;
        width: 400px;
        height: 520px;
        border: 1px solid #a1c4fd;
        margin-left:50px;
        margin-top:30px;
        box-shadow: 0 0 8px #89b6ff;

        img{
            width:400px;
            height: 300px;
        }
        .profileBody{
            width:100%;
            .profileTitle{
                font-family: 'Courier New', Courier, monospace;
                font-size:25px;
                text-align: center;
                margin-bottom: 10px;
            }
            .writeReview{
                 margin-bottom: 10px;
                 margin-right:20px;
                 margin-left:calc(100% - 60px)
            }
            .profileRating{
                div{
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 10px;
                }
                .el-rate{
                    margin-left:20px;
                    
                }
            }
        }
    }
        .Comments{
            height:520px;
            width:600px;
            border: 1px solid #a1c4fd;
            box-shadow: 0 0 8px #89b6ff;
            margin-left:40px;
            margin-top:30px;
            padding: 30px;
            box-sizing: border-box;
            .comment{
                display: flex;
                align-items: center;
                box-shadow: 0 0 8px #89b6ff;
                background: #b6d2ff;
                padding: 20px;
                margin-bottom:30px;
                div{
                    
                    margin-left:20px;
                }

            }

        }
    }

</style>