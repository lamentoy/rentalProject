import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        favList:[],
        favList1:[],
    },
    mutations: {
       
        updatefavList(state,favList){
            state.favList=favList

        },
        updatefavList1(state,favList1){
            state.favList1=favList1

        }
    },
    actions: {},
  
})