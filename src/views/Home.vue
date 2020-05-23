<template>
    <div>
        <div class="md-layout">
            <md-button 
                class="md-button" 
                @click="onNovoPedido">
                <h2>Novo Pedido</h2>
            </md-button>
        </div>

        <md-table v-model="listaPesquisaPedidos" md-sort="id" md-sort-order="desc" table-header-color="green" class="md-primary" >
            <md-table-toolbar>
                <div class="md-toolbar-section-start md-accent">
                    <h1 class="md-title">Pedidos</h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Buscando por id, cliente, data ou finalizado..." v-model="filtroItem" @input="pesquisaNaTable" />
                </md-field>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Numero" md-sort-by="id">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Data" md-sort-by="data">{{ item.data }}</md-table-cell>
                <md-table-cell md-label="Situação" md-sort-by="situacao">{{ item.finalizado }}</md-table-cell>
                <md-table-cell md-label="Razão Social" md-sort-by="razao_social">{{ item.cliente.nome  }}</md-table-cell>
                <md-table-cell md-label="CNPJ" md-sort-by="cnpj">{{ item.cliente.cnpj  }}</md-table-cell>
                
                <md-table-cell md-label="" >
                    <div class="actionsButtons">
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onEditarItem(item)">
                            <md-icon id="iconHome">create</md-icon>
                        </md-button>
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onExcluirItem(item)">
                            <md-icon id="iconHome">delete_forever</md-icon>
                        </md-button>
                    </div>
                </md-table-cell>
            </md-table-row>
        </md-table>

    </div>
  
</template>

<script>

const toLower = text => {
    return text.toString().toLowerCase()
}

const pesquisaPedidos = (items, term) => {
    if (term) {
        
        return items.filter(item => {
            console.log('pesquisa', item)
            return item.id == term
                || toLower(item.cliente.nome).includes(toLower(term))
                || toLower(item.cliente.cnpj).includes(toLower(term))
                || item.data.includes(term)                
        })
    }
    return items
}

import {ACAO_INSERIR_PEDIDO, ACAO_EDITAR_PEDIDO} from '../constants/acoes'
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: 'Pedido',
    components:{

    },

    data: () => ({
        filtroItem: '',
        listaDePesquisa:[],
        listaPesquisaPedidos:[]

    }),

    methods: {

        ...mapMutations(['setAcao']),

        novoPedido(){
            return {
                cliente: {}
            }
        },
        
        onNovoPedido(){

            this.setAcao(ACAO_INSERIR_PEDIDO)
            
            this.$router.push({ name: 'Pedido', params: {pedido: this.novoPedido()} })
        },

        pesquisaNaTable () {

            this.listaPesquisaPedidos = pesquisaPedidos(this.listaPedidosHome, this.filtroItem)
        },

        ordenaListaPedidos(v1, v2){
            if (v1.data.getTime() >= v2.data.getTime())
                return -1

            if (v1.data.getTime() <= v2.data.getTime())
                return 1
            
            return 0
        }
    },

    computed:{
        ...mapGetters(['acao', 'listaPedidosHome'])
    },

    watch:{


        listaPedidosHome(){
            console.log('aaaaaa')
            if(this.listaPedidosHome !== null ){
                this.listaPesquisaPedidos = this.listaPedidosHome
            }
        },
    },

    mounted(){
        
        this.$store.dispatch('carregaListaPedidosHome')
    }
}
</script>

<style>

</style>