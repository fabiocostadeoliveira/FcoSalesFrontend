<template>
    
    <div class="md-layout md-alignment-center-center">

        <md-card>
            <md-card-content>
                <div>
                    <md-field>
                        <label>Usuario</label>
                        <md-input 
                            v-model="usuario">
                        </md-input>
                    </md-field>
                </div>

                <div>
                    <md-field>
                        <label>Password toggle</label>
                        <md-input 
                            v-model="senha" 
                            type="password">
                        </md-input>
                    </md-field>
                </div>

            </md-card-content>

            <md-card-actions>
                <md-button 
                    class="md-primary"
                    @click="onEntrar">Entrar</md-button>
            </md-card-actions>
        </md-card>
        


    </div>
</template>

<script>

import {mapMutations} from 'vuex'

export default {
    name:'Login',

    data: () => ({
        manterConectado: false,
        usuario:null,
        senha:null

    }),

    methods: {
        
        ...mapMutations(['setUsuario']),
        
        onEntrar(){
            let usuario = {
                id: 1,
                nome: this.usuario                
            }
            
            localStorage.setItem('usuario', JSON.stringify(usuario));

            this.setUsuario(usuario)

            this.$router.replace('/')
        }
    }

}
</script>

<style>

</style>