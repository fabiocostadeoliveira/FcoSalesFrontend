import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        
        isOpenDialogProjectHantle: false,

        isOpenDialogTaskHantle: false,

        snackbarVisible: false,

        messageSnackBar: '',

        mainListProjects: [],

        mainListTasks: [],

        detailsProject: {}
    },


    mutations: {
        
        alternateDialogProjectHandle(state){
            state.isOpenDialogProjectHantle = !state.isOpenDialogProjectHantle
        },

        alternateDialogTaskHandle(state){
            state.isOpenDialogTaskHantle = !state.isOpenDialogTaskHantle
        },

        setSnackbarVisible(state, payload){
            state.snackbarVisible = payload
        },

        setMessageSnackBar(state, payload){
            state.messageSnackBar = payload
        },

        setMainListProjects(state, payload){
            state.mainListProjects = payload
        },

        setMainListTasks(state, payload){
            state.mainListTasks = payload
        },

        setDetailsProject(state, payload){
            
            if (payload == null)
                state.detailsProject = {
                    completedPercentage: 0.00,
                    totalTasks:0,
                    willBeLate: false
                }
            else
                state.detailsProject = payload
        }

    },

    getters: {
        
        isOpenDialogProjectHantle: state => state.isOpenDialogProjectHantle,

        isOpenDialogTaskHantle: state => state.isOpenDialogTaskHantle,

        isSnackbarVisible: state => state.snackbarVisible,

        messageSnackBar: state => state.messageSnackBar,

        mainListProjects: state => state.mainListProjects,

        mainListTasks: state => state.mainListTasks,

        detailsProject: state => state.detailsProject,

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

        loadMainListProjects({ commit }){

            axios.get('/projects').then((response) =>{
                commit('setMainListProjects', response.data)
            })
        },

        loadMainListTasks({ commit }, payload){
            
            let queryParams = {
                params: {
                    projectId: payload.projectId 
                }
            }

            axios.get('/projects/details', queryParams)
                .then((response) => {
                    
                    let {data} = response || null
                    
                    commit('setDetailsProject', data)
                })
            
            axios.get('/tasks/byProject', queryParams )
                .then((response) =>{
                    
                    commit('setMainListTasks', response.data)
                })
        }
    }

    

})