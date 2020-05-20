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

        
        <md-table v-model="listaDePesquisa" md-sort="produto.descricao" md-sort-order="asc" table-header-color="green" class="md-primary" >
            
            <md-table-toolbar>
                <div class="md-toolbar-section-start md-accent">
                    <h1 class="md-title">Produtos</h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Buscando por descricao do produto..." v-model="filtroItem" @input="pesquisaNaTable" />
                </md-field>
            </md-table-toolbar>

            
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Produto" md-sort-by="descricao">{{ item.produto.descricao }}</md-table-cell>
                <md-table-cell md-label="Qtd" md-sort-by="quantidade">{{ item.quantidade }}</md-table-cell>
                <md-table-cell md-label="Preço" md-sort-by="preco">{{ item.preco }}</md-table-cell>
                <md-table-cell md-label="Total" md-sort-by="total">{{ item.total  }}</md-table-cell>
                
                <md-table-cell md-label="" >
                    <div class="actionsButtons">
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onEditar(itemTable)">
                            <md-icon id="iconHome">create</md-icon>
                        </md-button>
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onExcluir(itemTable)">
                            <md-icon id="iconHome">delete_forever</md-icon>
                        </md-button>
                    </div>
                </md-table-cell>
            </md-table-row>
            
        </md-table>


        <ItemPedidoModal
            v-model="showModalItemPedido"
            :item="item"
            @itemAdicionado="addProdutoNaListaDeItens"/>

        <div>

        </div>
        
    </div>
</template>

<script>

const toLower = text => {
    return text.toString().toLowerCase()
}

const pesquisaPorDescricao = (items, term) => {
    if (term) {
        return items.filter(item => toLower(item.produto.descricao).includes(toLower(term)))
    }
    return items
}

import ItemPedidoModal from '../components/ItemPedidoModal'
export default {
    name: 'Pedido',
    components: {
        ItemPedidoModal
    },

    data: () => ({
        showModalItemPedido:false,
        listaItens: [],
        listaDePesquisa:[],
        filtroItem: '',
        item:{}
    }),

    props:{
        
        pedido:{
            type: Object,
            default: () => ({ cliente: {}})
        }

    },

    methods: {

        onAdicionarProduto(){
            
            this.$delete(this.item)

            this.item = {}

            this.showModalItemPedido = true

            ///this.item = Object.assign({}, this.item, {})

            //console.log('this.item', this.item)
        },

        pesquisaNaTable () {

            this.listaDePesquisa = pesquisaPorDescricao(this.listaItens, this.filtroItem)
        },

        addProdutoNaListaDeItens(){
            
            this.listaItens.push(this.item)

            console.log('addProduto', this.listaItens)
        }
    },

    watch: {
        
        listaItens(){
            
            
            if(this.listaItens !== null ){
                this.listaDePesquisa = this.listaItens
                console.log('watch lista itens', this.listaDePesquisa)
            }

        },                

    }

    


}
</script>

<style lang="scss" scoped>

  

</style>