<template>
    <div> 

        <div class="md-layout md-gutter">

            <div class="md-layout-item md-size-10">
                <md-field>
                    <label>Pedido</label>
                    <md-input 
                        disabled
                        v-model="pedidoLocal.id">
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

            <div class="md-layout-item md-size-20">
                <md-autocomplete 
                    :disabled="somenteConsulta"
                    v-model="clienteSelecionado"                  
                    :md-options="filtroClientes">

                    <label>Selecione o cliente</label>

                    <template slot="md-autocomplete-cliente" slot-scope="{ item, term }">                        
                        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
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

            <div class="md-layout-item md-size-20">
                <md-field>
                    <label>Razão Social</label>
                    <md-input
                        disabled
                        v-model="pedidoLocal.cliente.nome"
                        >
                    </md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-15">
                <md-field>
                    <label>Telefone</label>
                    <md-input 
                        :disabled="somenteConsulta"
                        v-model="pedidoLocal.cliente.telefone"
                        >
                    </md-input>
                </md-field>
            </div>

        </div>


        <div class="md-layout md-gutter">
            

        </div>


        <div class="md-layout md-gutter">

            <div class="md-layout-item md-size-40">
                <md-field>
                    <label>Email</label>
                    <md-input
                        :disabled="somenteConsulta" 
                        v-model="pedidoLocal.cliente.email">
                    </md-input>
                </md-field>
            </div>

            <ResumoPedido
                :data="resumoPedido"/>

        </div>

        <div class="md-alignment-right-space-around">
            <md-button
                v-if="!somenteConsulta"  
                class="md-button"
                @click="onAdicionarProduto">
                <h2>Adicionar Produto</h2>
            </md-button>

            <md-button
                v-if="!somenteConsulta" 
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
                v-if="!somenteConsulta" 
                class="md-button md-accent"
                @click="onFinalizar">
                <h2>Finalizar</h2>
            </md-button>
        </div>

        <md-table v-model="listaDePesquisa" md-sort="descricao" md-sort-order="asc" table-header-color="green" class="md-primary" >
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
                <md-table-cell md-label="Preço" md-sort-by="preco">{{ item.produto.preco | monetario }}</md-table-cell>
                <md-table-cell md-label="Total" md-sort-by="total">{{ item.total | monetario }}</md-table-cell>
                
                <md-table-cell 
                    v-if="!somenteConsulta" 
                    md-label="" >
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


        <ItemPedidoModal
            v-model="showModalItemPedido"
            :item="item"
            :acao="acaoItem"
            @itemAdicionado="addProdutoNaListaDeItens"
            @itemEditado="atualizaProdutoNaListaDeItens"/>

        <md-dialog-confirm
            :md-active.sync="mostraModalFinalizar"
            md-title="Finalizar Pedido ?"
            md-content="Voce nao podera mais altera-lo"
            md-confirm-text="Confirmar"
            md-cancel-text="Cancelar"            
            @md-confirm="onConfirmaModalFinalizar" />        

        <md-dialog-confirm            
            :md-active.sync="mostraModalDeletarItem"
            md-title="Deseja excluir o item ?"            
            md-confirm-text="Confirmar"
            md-cancel-text="Cancelar"            
            @md-confirm="onConfirmaModalDeletarItem" />        

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

//TODO - converter para componente ...seletor de cliente
const converteClienteParaSeletor = (c) =>{
    return { 'id':c.id,
             'nome':c.nome,
             'toLowerCase':()=>c.nome.toLowerCase(),
             'toString':()=>c.nome }
}

import ItemPedidoModal from '../components/ItemPedidoModal'
import ResumoPedido from '../components/ResumoPedido'
import {dateUtil} from '../mixins/DateUtils'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {ACAO_INSERIR_PEDIDO, 
        ACAO_EDITAR_PEDIDO,
        ACAO_CONSULTA_PEDIDO,
        ACAO_INSERIR_ITEM,
        ACAO_EDITAR_ITEM} from '../constants/acoes'

export default {
    name: 'Pedido',
    mixins: [dateUtil],
    components: {
        ItemPedidoModal,
        ResumoPedido
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
        desativado:null,
        finalizar:false,
        mostraModalFinalizar: false,
        mostraModalDeletarItem: false,
        itemParaDelecao:null,
        sucessoAoGravar:false,
        itemParaEdicao:null,
        mostraModalEditarItem:null,
        acaoItem:null,
        resumoPedido:{}
    }),

    props:{
        
        pedido:{
            type: Object,
            default: () => ({ cliente: {id: 0}})
        },
    },

    methods: {

        ...mapActions(['showSnackBar']),

        ...mapMutations(['setAcao', 'carregaListaPedidosHome']),

        onAdicionarProduto(){
            
            this.item = {}

            this.acaoItem = ACAO_INSERIR_ITEM

            this.showModalItemPedido = true
        },

        pesquisaNaTable () {

            this.listaDePesquisa = pesquisaPorDescricao(this.listaItens, this.filtroItem)
        },

        addProdutoNaListaDeItens(){
            
            this.listaItens.push(this.item)
        },

        async configurarAcoes(){
            
            if (this.acao === ACAO_INSERIR_PEDIDO)
                
                this.configuraNovo()
            else if(this.acao === ACAO_EDITAR_PEDIDO)

                this.configuraEditar()
        },

        configuraNovo(){
            
            this.pedidoLocal.data = this.getBRFormat(new Date())
        },

        configuraEditar(){
            
            this.pedidoLocal = this.pedido

            // TODO - tentar deixar dentro do objeto de itens que vem dentro do this.pedido
            this.listaItens = this.pedido.itens

            let cliente = this.listaClientes.find( (c) => this.pedido.cliente.id == c.id)

            this.clienteSelecionado = converteClienteParaSeletor(cliente)
        },

        async onGravar(){
            this.sucessoAoGravar = false

            try {
                this.estaSalvando = true

                let payload = this.retornaDadosParaSalvar()

                payload = { ...{usuario:this.usuario}, ...payload}

                let response = null

                if (this.acao === ACAO_INSERIR_PEDIDO){
                    
                    response = await this.$http.post('/pedidos', payload)

                    this.pedidoLocal.id = response.data.id

                    this.setAcao(ACAO_EDITAR_PEDIDO)

                }else if(this.acao === ACAO_EDITAR_PEDIDO){

                    response = await this.$http.put('/pedidos/' + this.pedidoLocal.id, payload)
                }

                this.showSnackBar('SALVO COM SUCESSO')

                this.sucessoAoGravar = true
            } catch (error) {

                let detalhesErro = 'Detalhes: ' + error.response.data.msg 

                this.showSnackBar('Erro ao salvar pedido - ' + detalhesErro)
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

        onFinalizar(){
           
            this.confirmaFinalizacaoModal()

        },

        confirmaFinalizacaoModal(){
            this.finalizar = false
            this.mostraModalFinalizar = true
        },

        async onConfirmaModalFinalizar(){
            try {
                await this.onGravar()    

                if(this.sucessoAoGravar == false )
                    throw 'Erro ao gravar pedido'

                let response = await this.$http.put('/pedidos/finalizar/' + this.pedidoLocal.id, {})

                this.showSnackBar('Pedido finalizado com sucesso.')

                this.voltarParaHome()

            } catch (error) {

                this.showSnackBar('Erro ao finalizar pedido.')
            }
        },

        onExcluirItem(item){
            
            let indice = this.findIndiceItemNaLista(item, this.listaItens)
            
            this.itemParaDelecao = this.listaItens[indice]
            
            this.mostraModalDeletarItem = true
        },

        onConfirmaModalDeletarItem(){
            
            let indice = this.findIndiceItemNaLista(this.itemParaDelecao, this.listaItens)

            this.listaItens.splice(indice,1)
        },

        onEditarItem(item){
            
            let indice = this.findIndiceItemNaLista(item, this.listaItens)

            this.itemParaEdicao = this.listaItens[indice]

            this.item = Object.assign({}, this.item, this.itemParaEdicao)

            this.acaoItem = ACAO_EDITAR_ITEM

            this.showModalItemPedido = true

            this.$forceUpdate()
        },

        atualizaProdutoNaListaDeItens(){

            let indice = this.findIndiceItemNaLista(this.itemParaEdicao, this.listaItens)

            this.listaItens[indice] = {... this.item}

            this.atualizaResumo()
        },

        findIndiceItemNaLista(elemento, arr){
            
            for (let index = 0; index < arr.length; index++) {
                
                const elArray = arr[index];
                
                if(this.itensSaoIguais(elArray, elemento)){
                    return index
                }
            }
            return -1
        },

        itensSaoIguais(el1, el2){
            
            return el1.produto.id == el2.produto.id &&
                    el1.quantidade == el2.quantidade &&
                    el1.preco == el2.preco &&
                    el1.total == el2.total
        },

        atualizaResumo(){

            let qtdProdutos = 0

            let qtdItens = 0

            let totalPedido = 0

            let situacao = this.pedido.finalizado || false

            this.listaItens.forEach( (i) => {

                qtdProdutos += 1

                qtdItens += i.quantidade

                totalPedido += i.total
            })

            let obj = this.novoResumo(this.usuario.nome,situacao, qtdProdutos, qtdItens, totalPedido)

            this.resumoPedido = obj

        },

        novoResumo(nomeUsuario, situacao, qtdProdutos, qtdItens, totalPedido){
            return {
                nomeUsuario,
                situacao,
                qtdProdutos,
                qtdItens,
                totalPedido
            }
        }
    },

    computed:{

        ...mapGetters(['acao','usuario']),
        
        filtroClientes(){
            return this.listaClientes.map(converteClienteParaSeletor)
        },

        somenteConsulta(){
            if(this.pedidoLocal.finalizado)
                return true
            return false
        }

    },

    watch: {
        
        listaItens(){

            if(this.listaItens !== null ){
                this.listaDePesquisa = this.listaItens
            }

            this.atualizaResumo()
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
            this.desativado = this.acao === ACAO_CONSULTA_PEDIDO ? true : false
        },

        sucessoAoGravar(){
            
            this.$store.dispatch('carregaListaPedidosHome')
        }

    },


    mounted(){

        this.atualizaResumo()
    },
    
    
    async beforeMount(){
        if( this.acao === null || this.acao === undefined )
            this.voltarParaHome()

        await this.carregarClientes()

        await this.configurarAcoes()
    },
}
</script>

<style lang="scss" >

    .md-theme-default.md-dialog-fullscreen.md-dialog-container{
        transform: none; 
    }
    
    .md-menu-content {
        z-index: 100000 !important;
    }
</style>