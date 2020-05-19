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

		<md-content>
			<router-view></router-view>        
		</md-content>
	</div>
</template>

<script>


export default {
	name: 'App',
	components: {
		
	},

	methods:{

		

	}

	


}
</script>

<style>

</style>
