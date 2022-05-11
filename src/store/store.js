import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        favList:[]
    },
    mutations: {
       
        updatefavList(state,favList){
            state.favList=favList

        }
    },
    actions: {},
  
})