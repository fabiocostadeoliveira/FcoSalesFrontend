import Vue from 'vue'
import Axios from 'axios'
import {BASE_URL_API} from '../constants/urlsBase'
//import store from '../vuex/store'

export class ConfigAxios {
	constructor() {

		Axios.defaults.baseURL = BASE_URL_API
		Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
		Axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Content-Length'
		Axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
		Axios.defaults.headers.common['Access-Control-Allow-Credentials'] ='true'
		Axios.defaults.headers.common['Content-Type'] ='application/json'
		Axios.defaults.headers.common['charset'] = 'utf-8'
		Axios.defaults.crossDomain = true
    
		Vue.prototype.$http = Axios
	}
}