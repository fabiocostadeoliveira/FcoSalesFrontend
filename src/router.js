import Vue from 'vue'
import Router from 'vue-router'
import {BASE_URL_FRONTEND} from '../src/constants/urlsBase'
import Home from './views/Home.vue'
import Pedido from '../src/views/Pedido'
import Login from '../src/views/Login'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	base: BASE_URL_FRONTEND,
	routes: [
		
		{
			path: '/',
			name: 'home',
			component: Home
		},

		{
			path: '/login',
			name: 'Login',
			component: Login
		},

		{
			path: '/Pedido',
			name: 'Pedido',
			component: Pedido,
			props: true,
			activeClass: 'active'
		},
	]

})
