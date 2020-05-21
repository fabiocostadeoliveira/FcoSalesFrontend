import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        
        snackbarVisible: false,

        messageSnackBar: '',

        acao: null,
    },


    mutations: {
        
        setSnackbarVisible(state, payload){
            state.snackbarVisible = payload
        },

        setMessageSnackBar(state, payload){
            state.messageSnackBar = payload
        },

        setAcao(state, payload){
            state.acao = payload
        },
    },

    getters: {
        
        isSnackbarVisible: state => state.snackbarVisible,

        messageSnackBar: state => state.messageSnackBar,

        acao: state => state.acao,
    },

    actions: {

        showSnackBar({ commit }, messageSnackBar){
            
            commit('setMessageSnackBar', messageSnackBar)
            
            commit('setSnackbarVisible', true)

            setTimeout(()=>{
                
                commit('setSnackbarVisible', false)
                
                commit('setMessageSnackBar', '')
            },4000)
        },
    }
})