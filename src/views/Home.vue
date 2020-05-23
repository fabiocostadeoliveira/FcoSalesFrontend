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
                
                <md-table-cell md-label="Ações" >
                    <div class="actionsButtons">
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onEditarPedido(item)">
                            <md-icon id="iconHome">create</md-icon>
                        </md-button>
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onExcluirPedido(item)">
                            <md-icon id="iconHome">delete_forever</md-icon>
                        </md-button>
                    </div>
                </md-table-cell>

                <!-- <md-table-cell md-label="Excluir" >
                    <div class="actionsButtons">
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onExcluirPedido(item)">
                            <md-icon id="iconHome">delete_forever</md-icon>
                        </md-button>
                    </div>
                </md-table-cell> -->

            </md-table-row>
        </md-table>

        <md-dialog-confirm            
            :md-active.sync="mostraModalDeletarPedido"
            md-title="Deseja excluir o pedido ?"
            md-content="Isso irá excluir permanentemente o pedido."
            md-confirm-text="Confirmar"
            md-cancel-text="Cancelar"            
            @md-confirm="onConfirmaModalDeletarPedido" />        


    </div>
  
</template>

<script>

const toLower = text => {
    return text.toString().toLowerCase()
}

const pesquisaPedidos = (items, term) => {
    if (term) {
        
        return items.filter(item => {
            return item.id == term
                || toLower(item.cliente.nome).includes(toLower(term))
                || toLower(item.cliente.cnpj).includes(toLower(term))
                || item.data.includes(term)                
        })
    }
    return items
}

import {ACAO_INSERIR_PEDIDO, ACAO_EDITAR_PEDIDO} from '../constants/acoes'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'Pedido',
    components:{

    },

    data: () => ({
        mostraModalDeletarPedido: false,
        filtroItem: '',
        listaDePesquisa:[],
        listaPesquisaPedidos:[],
        pedidoParaDelecao:null,

    }),

    methods: {

        ...mapActions(['showSnackBar']),

        ...mapMutations(['setAcao']),

        novoPedido(){
            return {
                cliente: {}
            }
        },

        copiaPedido(){

        },
        
        onNovoPedido(){

            this.setAcao(ACAO_INSERIR_PEDIDO)
            
            this.$router.push({ name: 'Pedido', params: {pedido: this.novoPedido()} })
        },

        pesquisaNaTable () {

            this.listaPesquisaPedidos = pesquisaPedidos(this.listaPedidosHome, this.filtroItem)
        },

        //TODO - deixar esse metodo generico
        findIndicePedidoNaLista(elemento, arr){
            
            for (let index = 0; index < arr.length; index++) {
                
                const elArray = arr[index];
                
                if(this.itensSaoIguais(elArray, elemento)){
                    return index
                }
            }
            return -1
        },

        //TODO - deixar esse metodo generico
        itensSaoIguais(el1, el2){
            
            return el1.produto.id == el2.produto.id &&
                    el1.quantidade == el2.quantidade &&
                    el1.preco == el2.preco &&
                    el1.total == el2.total
        },

        onExcluirPedido(item){

            this.pedidoParaDelecao = item

            this.mostraModalDeletarPedido = true
        },

        async onConfirmaModalDeletarPedido(){

            try {
                
                await this.$http.delete('/pedidos/' + this.pedidoParaDelecao.id)

            } catch (error) {

                //TODO - deixar tratamento de msg de response generico
                let defaultMessage = error?.response?.data?.errors[0]?.defaultMessage || ''

                this.showSnackBar('Erro ao salvar pedido' + (defaultMessage != '' ? ': ' + defaultMessage : '.') )
            }
            
            this.carregaPedidos()

            this.showSnackBar('PEDIDO FOI EXCLUIDO')
        },

        onEditarPedido(item){
            
            let pedidoEdt = this.listaPedidosHome.find( (p) => p.id == item.id )

             this.setAcao(ACAO_EDITAR_PEDIDO)

            this.$router.push({ name: 'Pedido', params: {pedido: pedidoEdt} })
        },

        carregaPedidos(){
            
            this.$store.dispatch('carregaListaPedidosHome')
        }

    },

    computed:{
        ...mapGetters(['acao', 'listaPedidosHome'])
    },

    watch:{


        listaPedidosHome(){

            if(this.listaPedidosHome !== null ){
            
                this.listaPesquisaPedidos = this.listaPedidosHome
            }
        },
    },

    mounted(){
        
        this.carregaPedidos()
    }
}
</script>

<style lang="scss">

    .md-theme-default.md-dialog-fullscreen.md-dialog-container{
        transform: none; 
    }

    .md-menu-content {
        z-index: 100000 !important;
    }

</style>