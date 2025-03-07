<template>
    <div>
        <md-dialog 
            :md-active.sync="value"
            :md-click-outside-to-close="false"
            :md-close-on-esc="false">

            <md-dialog-title>Adicionar Item</md-dialog-title>
            
            <md-dialog-content class="modalContent">

                <md-autocomplete 
                    v-model="produtoSelecionado" 
                    :md-options="filtroProdutos"
                    >
                    <label>Produto</label>

                    <template slot="md-autocomplete-item" slot-scope="{ item }">                        
                        <md-highlight-text :md-term="item.nome">{{ item }}</md-highlight-text>
                    </template>

                </md-autocomplete>
                
                <md-field>
                    <label>Quantidade</label>
                    <md-input 
                        type="number"
                        v-model="quantidade">
                    </md-input>                    
                </md-field>

                <md-field>
                    <label>Preço</label>
                    <md-input                         
                        disabled
                        :value="precoProduto | monetario">
                    </md-input>                    
                </md-field>

                <md-field>
                    <label>Total</label>
                    <md-input 
                        disabled                        
                        :value="valorTotalItem | monetario" >
                    </md-input>                    
                </md-field>

            </md-dialog-content>
            
            <md-dialog-actions>
                <md-button                
                    class="md-accent"
                    @click="onCancelar">Cancelar</md-button>
                
                <md-button 
                    :disabled="confirmarDesabilitado"
                    class="md-accent" 
                    @click="confirmarItem">Confirmar</md-button>
            </md-dialog-actions>

        </md-dialog>
    </div>
</template>

<script>

const converteItemParaSeletor = (x) => ({
                        'id':x.id,
                        'descricao':x.descricao,
                        'toLowerCase':()=>x.descricao.toLowerCase(),
                        'toString':()=>x.descricao
                        })


import {mapMutations, mapActions} from 'vuex'
import {ACAO_INSERIR_ITEM,ACAO_EDITAR_ITEM} from '../constants/acoes'
export default {
    name: 'ItemPedidoModal', 
    components: {

    },

    props:{
        
        value:{
            type: Boolean,
            required: true
        },

        item:{
            type: Object,
            default: () => ({})
        },

        acao: {
            type: String,
            default: () => ('')
        }
        
    },

    data: () =>({
        produtoSelecionado: null,
        listaProdutos:[],
        testeValor:0,
        quantidade: 1

    }),

    methods:{
        
        ...mapActions(['showSnackBar']),

        confirmarItem(){

            this.updateItem()

            this.emitirEventos()
        },

        emitirEventos(){
            
            this.$emit('input', false)

            if (this.acao === ACAO_INSERIR_ITEM)
                
                this.$emit('itemAdicionado')
            else
            if(this.acao === ACAO_EDITAR_ITEM)
                
                this.$emit('itemEditado')
        },

        updateItem(){

            this.$set(this.item, 'produto', this.produtoSelecionado)

            this.$set(this.item.produto, 'preco', this.precoProduto)

            this.$set(this.item, 'quantidade', this.quantidade)

            this.$set(this.item, 'total', this.valorTotalItem)
        },

        onCancelar(){
            this.$emit('input', false)
        },

        async carregaProdutos(){

            try {
                
                let {data} = await this.$http.get('/produtos')

                this.listaProdutos = data

            } catch (error) {

                this.showSnackBar('Erro ao consultar produtos')
            }
        },
    },

    computed: {

        isDisabledSaveButtom(){
            return true
        },

        precoProduto(){
            if (this.produtoSelecionado === null)
                return null

            let filterPreco = this.listaProdutos
                .filter( (p) => p.id == this.produtoSelecionado.id)
                .map( (p) => p.preco)

            let preco = filterPreco[0] || null

            return preco
        },

        valorTotalItem(){
            
            let preco = this.precoProduto || 0
            let qtd = this.quantidade || 0

            if (qtd === 0 || preco === 0)
                return 0

            return preco * qtd
        },

        confirmarDesabilitado(){
            return this.valorTotalItem > 0 ? false : true

        },

        filtroProdutos(){
            return this.listaProdutos.map(converteItemParaSeletor)
        }
    },

    watch:{

        async value(){

            if (this.value === true){
                this.carregaProdutos()
            }
        },

        item:{
            handler(val){
                if (this.acao === ACAO_INSERIR_ITEM){

                    this.produtoSelecionado = null

                    this.quantidade = 1
                }else if(this.acao === ACAO_EDITAR_ITEM){
                    
                    let produto = this.listaProdutos.find( (p) => p.id = this.item.produto.id)

                    if (produto)
                        this.produtoSelecionado = converteItemParaSeletor(produto)

                    this.quantidade = this.item.quantidade
                }
            },
            deep: true
        }

    },

    async mounted(){

        await this.carregaProdutos()
    },
}
</script>

<style lang="scss" >

    .modalContent {
        width: 100%;        
        min-width: 600px;
    }

    .styleTemplate{
        display: flex;
        flex-direction: row;        
        align-items: center;
    }

    .color {
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 16px;
        border: 1px solid rgba(#000, .12);
    }

    .md-helper-text {
        display: flex;
        align-items: center;

        .color {
            width: 12px;
            height: 12px;
            margin-left: 4px;
            }
        }

    .md-menu-content {
        z-index: 100000 !important;
    }

</style>