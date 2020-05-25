<template>
	<div id="app" class="page-container ">
		
		<md-toolbar id="menuBar" class="md-primary">
			
			<div class="menuPrincipal">

				<div>
					<md-button class="md-icon-button" @click="showNavigation = true">
						<md-icon>menu</md-icon>
					</md-button>

					<md-button 
						class="md-icon-button" 
						to="/">
						<md-icon id="iconHome">home</md-icon>
					</md-button>

				</div>
				
				<div class="">
					<span id="labelProjectManager" class="md-title">Gerenciador de Vendas</span>  					
					
				</div>

				<div>
					
					<span v-if="usuario.nome !== undefined"> Usuario: {{ usuario.nome }}</span>
					<md-button 
						class="md-icon-button"
						@click="onLogout">
						<md-icon id="iconHome">exit_to_app</md-icon>
						<md-tooltip md-direction="left">Logout</md-tooltip>
					</md-button>
				</div>
			</div> 
		</md-toolbar>

			
		<md-drawer :md-active.sync="showNavigation" md-swipeable>
			<md-toolbar class="md-transparent" md-elevation="0">
				<span class="md-title">Fco Sales</span>
			</md-toolbar>

			<md-list>
				<md-list-item
					to="/Cliente">
					<md-icon>move_to_inbox</md-icon>
					<span class="md-list-item-text">Clientes</span>
				</md-list-item>

				<md-list-item
					to="/">
					<md-icon>move_to_inbox</md-icon>
					<span class="md-list-item-text">Pedidos</span>
				</md-list-item>

			</md-list>
		</md-drawer>



		<md-snackbar 
			:md-position="snackBarConfiguration.position" 
			:md-duration="snackBarConfiguration.duration" 
			:md-active.sync="isSnackbarVisibleLocal" 
			md-persistent>
			
			<span>{{ messageSnackBar }}</span>
			
		</md-snackbar>

		<md-content>
			<router-view></router-view>        
		</md-content>
	</div>
</template>

<script>


import Login from '../src/views/Login'
import {mapGetters, mapMutations} from 'vuex'
export default {
	name: 'App',
	components: {
		Login
	},

	data: () => ({
		isSnackbarVisibleLocal: false,
		acaoGeral:'',
		snackBarConfiguration: {
			position: 'center',
			duration: 10000
		},
		usuarioConectado:null,
		estaLogado: false,
		showNavigation: false
	}),

	methods:{
		...mapMutations(['setSnackbarVisible', 'setUsuario']),

		iniciarApp(){

			let usuarioStorage = localStorage.getItem('usuario') || null

			let usuarioJson = null

			if (usuarioStorage != null ){
				usuarioJson = JSON.parse(usuarioStorage) || null
			}

			if(usuarioJson === null){
				this.login()
				return
			}

			console.log('setar usuario', usuarioJson)
			this.setUsuario(usuarioJson)
		},

		onLogout(){

			this.setUsuario({})

			localStorage.removeItem('usuario')

			this.login()
		},

		login(){
			this.$router.replace('/login').catch( err => {})
		}
	},

	computed:{

		...mapGetters(['isSnackbarVisible', 'messageSnackBar','usuario']),

		mostraUsuario(){
			console.log('keys:', Object.keys(this.usuario ))
			return Object.keys(this.usuario) > 0 ? true : false
		}
	},

	watch: {
		isSnackbarVisibleLocal(value){
			this.setSnackbarVisible(value)
		},

		isSnackbarVisible(newValue) {
			this.isSnackbarVisibleLocal = newValue
		}
	},		


	mounted(){

		this.iniciarApp()
	}
}
</script>

<style>

	.md-theme-default.md-dialog-fullscreen.md-dialog-container{
		transform: none;
	}

	.md-theme-default .md-dialog-container {
		transform: none;
	}

	.menuPrincipal{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

</style>
