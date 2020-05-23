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


import {mapGetters, mapMutations} from 'vuex'
export default {
	name: 'App',
	components: {
		
	},

	data: () => ({
		isSnackbarVisibleLocal: false,
		acaoGeral:'',
		snackBarConfiguration: {
			position: 'center',
			duration: 10000
		},

	}),

	methods:{
		...mapMutations(['setSnackbarVisible']),
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
