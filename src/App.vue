<template>
	<div id="app">
		
		<md-toolbar id="menuBar" class="md-primary">
			<span id="labelProjectManager" class="md-title">Gerenciador de Vendas</span>  
			<span>{{ acaoGeral }}</span>
			<md-button 
				class="md-icon-button" 
				to="/">
				<md-icon id="iconHome">home</md-icon>
			</md-button>
		</md-toolbar>


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
		usuarioConectado:null

	}),

	methods:{
		...mapMutations(['setSnackbarVisible']),

		iniciarApp(){

			let usuarioStorage = localStorage.getItem('usuario') || null

			let usuarioJson = null

			if (usuarioStorage != null )
				usuarioJson = JSON.parse(usuarioStorage) || null

			
			if(usuarioJson === null){
				this.$router.replace('/login').catch( err => {})
			}

			this.usuarioConectado = {id:usuarioJson.id, nome: usuarioJson.nome}
		}
	},

	computed:{

		...mapGetters(['isSnackbarVisible', 'messageSnackBar']),
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

</style>
