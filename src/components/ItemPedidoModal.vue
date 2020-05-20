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
                    :disabled="addDesabilitado"
                    class="md-accent" 
                    @click="addItem">Add</md-button>
            </md-dialog-actions>

        </md-dialog>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'

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
        }
        
    },

    data: () =>({
        produtoSelecionado: null,
        listaProdutos:[],
        testeValor:0,
        quantidade: 1

    }),

    methods:{
        
        ...mapMutations(['setMessageSnackBar']),

        addItem(){

            this.updateItem()

            this.$emit('input', false)

            this.$emit('itemAdicionado')

        },

        updateItem(){

            this.$set(this.item, 'produto', this.produtoSelecionado)

            this.$set(this.item, 'quantidade', this.quantidade)

            this.$set(this.item, 'preco', this.precoProduto)

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

                this.setMessageSnackBar('Erro ao consultar produtos')
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

        addDesabilitado(){
            return this.valorTotalItem > 0 ? false : true

        },

        filtroProdutos(){
            
            return this.listaProdutos.map(x=>({
                        'id':x.id,
                        'descricao':x.descricao,
                        'toLowerCase':()=>x.descricao.toLowerCase(),
                        'toString':()=>x.descricao
                        
                    }))
        }
    },

    watch:{

        value(){
            if (this.value === true)
                this.carregaProdutos()
        },

        item:{
            handler(val){
                if (Object.keys(val)){
                    this.produtoSelecionado = null
                    this.quantidade = 1
                }
            },
            deep: true
        }

    },

    filters:{

        monetario(valor){

            if (typeof valor !== "number") {
                return valor;
            }
            
            let formatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            });
            
            return formatter.format(valor);
        }
    }
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

    .md-theme-default.md-dialog-fullscreen.md-dialog-container{
        transform: none; 
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
    z-index: 111000 !important;
  }

</style>