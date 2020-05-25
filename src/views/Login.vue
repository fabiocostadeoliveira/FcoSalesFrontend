<template>
    
    <div class="md-layout md-alignment-center-center">

        <md-card>
            <md-card-content>


                <div v-if="cadastrar">
                    <md-field>
                        <label>Usuario</label>
                        <md-input 
                            v-model="nome">
                        </md-input>
                    </md-field>
                </div>

                <div>
                    <md-field>
                        <label>Login</label>
                        <md-input 
                            v-model="login">
                        </md-input>
                    </md-field>
                </div>

                <div>
                    <md-field>
                        <label>Senha</label>
                        <md-input 
                            v-model="senha" 
                            type="password">
                        </md-input>
                    </md-field>
                </div>

            </md-card-content>

            <md-card-actions>
                
                <md-checkbox v-model="cadastrar">Cadastrar usuario?</md-checkbox>

                <md-button 
                    class="md-primary"
                    @click="onEntrar">Entrar</md-button>
            </md-card-actions>
        </md-card>
        


    </div>
</template>

<script>

import {mapMutations, mapActions} from 'vuex'

export default {
    name:'Login',

    data: () => ({
        manterConectado: false,
        login:null,
        nome:null,
        usuario:null,
        senha:null,
        cadastrar: false

    }),

    methods: {
        
        ...mapMutations(['setUsuario']),

        ...mapActions(['showSnackBar']),
        
        onEntrar(){
            
            let usuario = {
                id: null,
                nome: this.nome,
                login: this.login,
                senha: this.senha
            }

            if(this.cadastrar){
                this.salvar(usuario)
            }else{
                this.loginApp(usuario)
            }
            
            
        },

        async salvar(obj){
            try {
                
                let payload = obj
                
                let {data} = await this.$http.post('/usuarios', payload)

                data = { ...data, ...{senha:this.senha}}

                let usr = await this.autenticar(data.login, data.senha)

                if (usr === null){
                    throw  'Ocorreu algum erro no processo de cadastro/login'
                }

                this.loginApp(usr)  

            } catch (error) {
                
                this.showSnackBar('Erro ao salvar' + error)

                console.log(error.reponse)                
            }
        },

        
        async autenticar(login, senha){

            try {

                let queryParams = {
                    params: {
                        login: login,
                        senha: senha
                    }
                }
                
                let {data} = await this.$http.get('/usuarios/autenticate', queryParams)

                console.log('retorno da autenticacao',data)
                return data
            } catch (error) {

                console.log(error.reponse)
                
                return null
            }
        },
        
        async loginApp(obj){
            
            let usrAutenticado = await this.autenticar(obj.login, obj.senha) 

            if (usrAutenticado == null){
                
                this.showSnackBar('Erro ao tentar autenticar usuario, verifique a senha e o login')

                return 
            }

            localStorage.setItem('usuario', JSON.stringify(usrAutenticado));

            this.setUsuario(usrAutenticado)

            this.redirecionaParaHome()
        },

        redirecionaParaHome(usuario){
            this.$router.replace('/')
        }
    }

}
</script>

<style>

</style>