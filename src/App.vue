<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  mounted(){
    if(this.isMobile()) {
    this.$router.replace('/mobileMain');
  }else {
    this.$router.replace('/');
  }
  },
  components: {
   
  },
  methods:{
    isMobile(){
      flag=false
      let flag=navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

       return flag;
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  
}
html,body{
     width:100%;
     height:100%;
     margin:0px;
     padding:0px;

  }
</style>
