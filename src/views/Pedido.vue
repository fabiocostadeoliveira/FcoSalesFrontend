<template>
    <div> 

        <div class="md-layout md-gutter">

            <div class="md-layout-item md-size-15">
                <md-field>
                    <label>Numero do Pedido</label>
                    <md-input 
                        disabled
                        v-model="pedidoLocal.numero">
                    </md-input>
                </md-field>
            </div>
            
            <div class="md-layout-item md-size-15">
                <md-field>
                    <label>Data do Pedido</label>
                    <md-input 
                        v-model="pedidoLocal.data"
                        disabled>
                    </md-input>
                </md-field>
            </div>
        </div>


        <div class="md-layout md-gutter">
            
            <div class="md-layout-item md-size-20">
                <md-autocomplete 
                    :disabled="desativado"
                    v-model="clienteSelecionado" 
                    :md-options="filtroClientes"
                    >
                    <label>Selecione o cliente</label>

                    <template slot="md-autocomplete-cliente" slot-scope="{ cliente }">                        
                        <md-highlight-text :md-term="cliente.nome">{{ cliente }}</md-highlight-text>
                    </template>

                </md-autocomplete>
            </div>

            <div class="md-layout-item md-size-20">
                <md-field>
                    <label>CNPJ Cliente</label>
                    <md-input
                        disabled 
                        v-model="pedidoLocal.cliente.cnpj"
                        >
                    </md-input>
                </md-field>
            </div>
            
            <div class="md-layout-item md-size-40">
                <md-field>
                    <label>Razão Social</label>
                    <md-input
                        :disabled="desativado"
                        v-model="pedidoLocal.cliente.nome"
                        >
                    </md-input>
                </md-field>
            </div>
            
            <div class="md-layout-item md-size-20">
                <md-field>
                    <label>Telefone</label>
                    <md-input 
                        :disabled="desativado"
                        v-model="pedidoLocal.cliente.telefone"
                        >
                    </md-input>
                </md-field>
            </div>

        </div>


        <div class="md-layout md-gutter">

            <div class="md-layout-item md-size-50">
                <md-field>
                    <label>Email</label>
                    <md-input
                        :disabled="desativado" 
                        v-model="pedidoLocal.cliente.email">
                    </md-input>
                </md-field>
            </div>

        </div>

        <div class="md-alignment-right-space-around">
            <md-button 
                class="md-button"
                @click="onAdicionarProduto">
                <h2>Adicionar Produto</h2>
            </md-button>

            <md-button 
                class="md-button md-accent"
                @click="onGravar">
                <h2>Gravar</h2>
            </md-button>

            <md-button 
                class="md-button md-accent"
                @click="voltarParaHome">
                <h2>Voltar</h2>
            </md-button>

            <md-button 
                class="md-button md-accent"
                @click="onGravar">
                <h2>Finalizar</h2>
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
import {dateUtil} from '../mixins/DateUtils'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {ACAO_INSERIR_PEDIDO, ACAO_EDITAR_PEDIDO} from '../constants/acoes'

export default {
    name: 'Pedido',
    mixins: [dateUtil],
    components: {
        ItemPedidoModal
    },
    data: () => ({
        showModalItemPedido:false,
        listaItens: [],
        listaDePesquisa:[],
        clienteSelecionado: null,
        listaClientes:[],
        filtroItem: '',
        item:{},
        pedidoLocal:{ numero: null, cliente:{}},
        estaSalvando:false,
        desativado:null
    }),

    props:{
        
        pedido:{
            type: Object,
            default: () => ({ cliente: {}})
        },
    },

    methods: {

        ...mapActions(['showSnackBar']),

        ...mapMutations(['setAcao']),

        onAdicionarProduto(){
            
            this.item = {}

            this.showModalItemPedido = true
        },

        pesquisaNaTable () {

            this.listaDePesquisa = pesquisaPorDescricao(this.listaItens, this.filtroItem)
        },

        addProdutoNaListaDeItens(){
            
            this.listaItens.push(this.item)
        },

        configurarAcoes(){
            
            if (this.acao === ACAO_INSERIR_PEDIDO)
                
                this.configuraNovo()
            else if(this.acao === ACAO_EDITAR_PEDIDO)

                this.configuraEditar()
        },

        configuraNovo(){
            
            this.pedidoLocal.data = this.getBRFormat(new Date())
        },

        configuraEditar(){

            this.pedidoLocal = {...this.pedido}
        },

        async onGravar(){
            
            try {
                this.estaSalvando = true

                let payload = this.retornaDadosParaSalvar()

                let {data} = await this.$http.post('/pedidos', payload)

                this.pedidoLocal.numero = data.id

                this.setAcao(ACAO_EDITAR_PEDIDO)

                this.showSnackBar('SALVO COM SUCESSO')

            } catch (error) {
                
                let defaultMessage = error?.response?.data?.errors[0]?.defaultMessage || ''
                
                this.showSnackBar('Erro ao salvar pedido' + (defaultMessage != '' ? ': ' + defaultMessage : '.') )
            }
        },

        retornaDadosParaSalvar(){

            return this.newPedidoParaSalvar(this.pedidoLocal.cliente.id, this.listaItens)
        },

        newPedidoParaSalvar(clienteId, itens){

            let newItens = itens.map( (i) => ({produtoId:i.produto.id, quantidade:i.quantidade}))
    
            return {
                clienteId:clienteId,
                itens:newItens
            }
        },

        async carregarClientes(){

            try {
                
                let {data} = await this.$http.get('/clientes')

                this.listaClientes = data
            } catch (error) {

                this.showSnackBar('Erro ao consultar clientes')
            }
        },

        voltarParaHome(){
            this.$router.replace('/')
        },
    },

    computed:{

        ...mapGetters(['acao']),
        
        filtroClientes(){
            
            return this.listaClientes.map(x=>({
                    'id':x.id,
                    'nome':x.nome,
                    'toLowerCase':()=>x.nome.toLowerCase(),
                    'toString':()=>x.nome
                }))
        }

    },

    watch: {
        
        listaItens(){

            if(this.listaItens !== null ){
                this.listaDePesquisa = this.listaItens
            }
        },
        
        clienteSelecionado(){

            let cliente = this.clienteSelecionado || null
            
            if(cliente !== null){
                this.pedidoLocal.cliente = this.listaClientes.find( (el) => el.id == cliente.id)
            }else{
                this.pedidoLocal.cliente = {}
            }
        },

        acao(){
            this.desativado = this.acao === ACAO_INSERIR_PEDIDO ? false : true
        }

    },

    mounted(){
        if( this.acao === null || this.acao === undefined )
            this.voltarParaHome()

        this.configurarAcoes()

        this.carregarClientes()
    },

}
</script>

<style lang="scss" >


    .md-menu-content {
        z-index: 111000 !important;
    }
  

</style>