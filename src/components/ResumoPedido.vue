<template>
    <div class="md-layout md-gutter">

        <div class="dadosResumo">
            <!-- <span>Resumo do Pedido:</span> -->

            <span>Usuario: {{ data.nomeUsuario }}</span>

            <span>Situação: {{ data.situacao | situacaoPedido }} </span>

        </div>

        <div class="dadosResumo">
            <div>
                <span>Quantidade de Produtos: {{ data.qtdProdutos}}</span>
            </div>

            <div>
                <span>Quantidade de Itens: {{ data.qtdItens }} </span>
            </div>

            <div>
                <span>Total do Pedido: {{ data.totalPedido | monetario }}</span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'ResumoPedido',
    
    components:[

    ],

    props:{
        data:{
            type: Object,
            default: () => ({})
        }
    },

    data:() =>({


    }),

    methods:{

    },

    computed:{

    }


}
</script>

<style>

    .dadosResumo{
		width: 100%;
		display: flex;
		justify-content: space-between;
        padding-left: 100px;
        padding-right: 100px;
	}

</style>