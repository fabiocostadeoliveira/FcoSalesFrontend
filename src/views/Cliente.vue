<template>
    <div>
        
        <div class="md-layout-item md-size-40">
            <md-field>
                <label>CNPJ Cliente</label>
                <md-input
                    maxlength="14"
                    v-model="cliente.cnpj">
                </md-input>
            </md-field>
        </div>

        <div class="md-layout-item md-size-40">
            <md-field>
                <label>Razão Social</label>
                <md-input
                    maxlength="30"                    
                    v-model="cliente.nome">
                </md-input>
            </md-field>
        </div>

        <div class="md-layout-item md-size-40">
            <md-field>
                <label>Telefone</label>
                <md-input 
                    maxlength="12"
                    v-model="cliente.telefone">
                </md-input>
            </md-field>
        </div>

        <div class="md-layout-item md-size-40">
            <md-field :class="emailInvalido">
                <label>Email</label>
                <md-input
                    maxlength="100"
                    v-model="cliente.email">
                </md-input>
                <span class="md-error">Email invalido</span>
            </md-field>
        </div>

        <md-button
            class="md-button"
            @click="salvar">
            <h2>Salvar</h2>
        </md-button>


    </div>
</template>

<script>

import {mapActions} from 'vuex'
export default {
    name: 'Cliente',
    data: () => ({
        isEmailInvalido:false,
        cliente:{}
    }),

    methods:{

        ...mapActions(['showSnackBar']),

        validaFormulario(){
            this.isEmailInvalido = false


            if(!this.validaEmail(this.cliente.email))
                this.isEmailInvalido = true
        },

        validaEmail(email){

            if (email === undefined)
                return false

            let er = new RegExp(/^[A-Za-z0-9_\-.]+@[A-Za-z0-9_\-.]{2,}.[A-Za-z0-9]{2,}(.[A-Za-z0-9])?/)

            return er.test(email)
        },

        async salvar(){

            this.validaFormulario()

            if (!this.formularioValido) 
                return

            try {

                let payload = this.novoCliente(this.cliente.cnpj, this.cliente.nome, this.cliente.telefone, this.cliente.email)

                let {data} = await this.$http.post('/clientes', payload)
                
            } catch (error) {
                
                this.showSnackBar('Erro ao salvar cliente')
            }

            this.showSnackBar('Cliente salvo com sucesso')

            this.$router.replace('/')

        },

        novoCliente(cnpj, nome, telefone, email){
            return {
                cnpj,
                nome,
                telefone,
                email,
            }
        }


    },

    computed:{

        emailInvalido(){
			return this.isEmailInvalido ? 'md-invalid': ''
        },
        
        formularioValido(){
            return this.isEmailInvalido ? false : true
        }

    }
}
</script>

<style>

</style>