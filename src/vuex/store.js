import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        
        snackbarVisible: false,

        messageSnackBar: '',

        acao: null,

        listaPedidosHome: []
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

        setListaPedidosHome(state, payload){
            state.listaPedidosHome = payload
        }
    },

    getters: {
        
        isSnackbarVisible: state => state.snackbarVisible,

        messageSnackBar: state => state.messageSnackBar,

        acao: state => state.acao,

        listaPedidosHome: state => state.listaPedidosHome
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

        carregaListaPedidosHome( { commit } ){
            
            axios.get('/pedidos/orderByDateDesc').then( (response) => {
                
                let dados = response.data || []

                commit('setListaPedidosHome', dados)
            })
        }
    }
})