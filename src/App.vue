<template>
	<div id="app">
		
		<md-toolbar id="menuBar" class="md-primary">
			<span id="labelProjectManager" class="md-title">Gerenciador de Vendas</span>  
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


import {mapGetters} from 'vuex'

export default {
	name: 'App',
	components: {
		
	},

	data: () => ({
		isSnackbarVisibleLocal: false,
		snackBarConfiguration: {
			position: 'center',
			duration: 5000
		}
	}),

	methods:{

		

	},

	computed:{

		...mapGetters(['isSnackbarVisible', 'messageSnackBar']),
	}

	


}
</script>

<style>

</style>
