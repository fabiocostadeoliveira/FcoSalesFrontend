<template>
    <div> 

        <div class="md-layout md-gutter">

            <div class="md-layout-item">
                <md-field>
                    <label>Numero do Pedido</label>
                    <md-input 
                        v-model="pedido.numero"
                        disabled
                        >
                    </md-input>
                </md-field>
            </div>
            
            <div class="md-layout-item">
                <md-field>
                    <label>Data do Pedido</label>
                    <md-input 
                        v-model="pedido.data"
                        disabled
                        >
                    </md-input>
                </md-field>
            </div>

        </div>


        <div class="md-layout md-gutter">

            
            <div class="md-layout-item">
                <md-field>
                    <label>Selecione Cliente</label>
                    <md-input 
                        v-model="pedido.cliente.nome"
                        >
                    </md-input>
                </md-field>
            </div>
            
            <div class="md-layout-item">
                <md-field>
                    <label>Razão Social</label>
                    <md-input 
                        v-model="pedido.cliente.nome"
                        >
                    </md-input>
                </md-field>
            </div>
            
            <div class="md-layout-item">
                <md-field>
                    <label>CNPJ Cliente</label>
                    <md-input 
                        v-model="pedido.cliente.cnpj"
                        >
                    </md-input>
                </md-field>
            </div>

        </div>


        <div class="md-layout md-gutter">

            <div class="md-layout-item">
                <md-field>
                    <label>Telefone</label>
                    <md-input 
                        v-model="pedido.cliente.email"
                        >
                    </md-input>
                </md-field>
            </div>
            
            <div class="md-layout-item">
                <md-field>
                    <label>Email</label>
                    <md-input 
                        v-model="pedido.cliente.email">
                    </md-input>
                </md-field>
            </div>

        </div>

        
        
        <div>

            <md-button 
                class="md-button"
                @click="onAdicionarProduto">
                <h2>Adicionar Produto</h2>
            </md-button>

        </div>


        <ItemPedidoModal
            :show="showModalItemPedido"/>
        
    </div>
</template>

<script>

import ItemPedidoModal from '../components/ItemPedidoModal'
export default {
    name: 'Pedido',
    components: {
        ItemPedidoModal
    },

    data: () => ({
        showModalItemPedido:false
    }),

    props:{
        
        pedido:{
            type: Object,
            default: () => ({ cliente: {}})
        }

    },

    methods: {

        onAdicionarProduto(){
            console.log('aaaaaa')
            this.showModalItemPedido = true
        }
        
    }


}
</script>

<style lang="scss" scoped>

  

</style>