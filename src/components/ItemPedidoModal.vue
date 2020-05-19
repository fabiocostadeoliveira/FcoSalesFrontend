<template>
    <div>


        <md-dialog 
            :md-active.sync="show"
            :md-click-outside-to-close="false"
            :md-close-on-esc="false">

            <md-dialog-title>Adicionar Item</md-dialog-title>
            
            <md-dialog-content class="modalContent">

                <md-autocomplete 
                    v-model="itemSelecionado" 
                    :md-options="filtroProdutos"
                    >
                    <label>Country</label>

                    <template slot="md-autocomplete-item" slot-scope="{ item }">                        
                        <md-highlight-text :md-term="item.nome">{{ item }}</md-highlight-text>
                    </template>

                </md-autocomplete>
                
                <md-field>
                    <label>Quantidade</label>
                    <md-input 
                        v-model="item.quantidade">
                    </md-input>                    
                </md-field>

                <md-field>
                    <label>Preço</label>
                    <md-input 
                        v-model="item.preco">
                    </md-input>                    
                </md-field>

                <md-field>
                    <label>Total</label>
                    <md-input 
                        v-model="item.total">
                    </md-input>                    
                </md-field>

            </md-dialog-content>
            
            <md-dialog-actions>
                <md-button                
                    class="md-accent"
                    @click="onCancelar">Cancelar</md-button>
                
                <md-button 
                    :disabled="isDisabledSaveButtom"
                    class="md-accent" 
                    @click="addItem">Add</md-button>
            </md-dialog-actions>

        </md-dialog>



    </div>
</template>

<script>
export default {
    name: 'ItemPedidoModal', 
    components: {

    },

    props:{
        
        show:{
            type: Boolean,
            default: () => (false)
        },

        item:{
            type: Object,
            default: () => ({})
        }
        
    },

    data: () =>({
        
        value: null,
        itemSelecionado:null,
        itens:[
            {nome:'vassoura', id:1 },
            {nome:'sabonete', id:2 },
            {nome:'televisao', id:3},
        ],
        
        colors: [
        { name: 'Aqua', color: '#00ffff' },
        { name: 'Aquamarine', color: '#7fffd4' },
        { name: 'Azure', color: '#f0ffff' },
        { name: 'Beige', color: '#f5f5dc' },
        { name: 'Black', color: '#000000' },
        { name: 'Blue', color: '#0000ff' },
        { name: 'Brown', color: '#a52a2a' },
        { name: 'Crimson', color: '#dc143c' },
        { name: 'Cyan', color: '#00ffff' },
        { name: 'Deep Pink', color: '#ff1493' },
        { name: 'Dim Gray', color: '#696969' },
        { name: 'Fuchsia', color: '#ff00ff' },
        { name: 'Gold', color: '#ffd700' },
        { name: 'Gray', color: '#808080' },
        { name: 'Green', color: '#008000' },
        { name: 'Green Yellow', color: '#adff2f' },
        { name: 'Grey', color: '#808080' },
        { name: 'Hotpink', color: '#ff69b4' },
        { name: 'Indigo', color: '#4b0082' },
        { name: 'Ivory', color: '#fffff0' },
        { name: 'Khaki', color: '#f0e68c' },
        { name: 'Lavender', color: '#e6e6fa' },
        { name: 'Lime', color: '#00ff00' },
        { name: 'Magenta', color: '#ff00ff' },
        { name: 'Maroon', color: '#800000' },
        { name: 'Navy', color: '#000080' },
        { name: 'Olive', color: '#808000' },
        { name: 'Orange', color: '#ffa500' },
        { name: 'Orange Red', color: '#ff4500' },
        { name: 'Pale Golden Rod', color: '#eee8aa' },
        { name: 'Pale Green', color: '#98fb98' },
        { name: 'Pink', color: '#ffc0cb' },
        { name: 'Purple', color: '#800080' },
        { name: 'Red', color: '#ff0000' },
        { name: 'Royal Blue', color: '#4169e1' },
        { name: 'Sea Green', color: '#2e8b57' },
        { name: 'Silver', color: '#c0c0c0' },
        { name: 'Sky Blue', color: '#87ceeb' },
        { name: 'Slate Blue', color: '#6a5acd' },
        { name: 'Slate Grey', color: '#708090' },
        { name: 'Teal', color: '#008080' },
        { name: 'Turquoise', color: '#40e0d0' },
        { name: 'Violet', color: '#ee82ee' },
        { name: 'White', color: '#ffffff' },
        { name: 'Yellow', color: '#ffff00' }
      ]
    }),

    methods:{

        addItem(){

        },

        onCancelar(){
            this.show = false
        }

    },

    computed: {

        isDisabledSaveButtom(){
            return true
        },

        filtroProdutos(){
            console.log('chama aqui')
            return this.itens.map(x=>({
                        'id':x.id,
                        'nome':x.nome,
                        'toLowerCase':()=>x.nome.toLowerCase(),
                        'toString':()=>x.nome
                        
                    }))

        }


    },

    watch:{

        itemSelecionado(){
            console.log('selecionou esse obj', this.itemSelecionado)
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