<template>
    <div>
        <div class="md-layout">
            <md-button 
                class="md-button" 
                @click="onNovoPedido">
                <h2>Novo Pedido</h2>
            </md-button>
        </div>

<!--         
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Data Inicio" md-sort-by="startDate">{{ item.startDate }}</md-table-cell>
            <md-table-cell md-label="Data Fim" md-sort-by="endDate">{{ item.endDate }}</md-table-cell>
            <md-table-cell md-label="Finalizada" md-sort-by="finished">{{ item.finished | labelFinished }}
            </md-table-cell>
            <md-table-cell md-label="" >
                <div class="actionsButtons">
                    <md-button 
                        class="md-icon-button md-accent"       
                        @click="onEdit(item)">
                        <md-icon id="iconHome">create</md-icon>
                    </md-button>
                    <md-button 
                        class="md-icon-button md-accent"       
                        @click="onDelete(item)">
                        <md-icon id="iconHome">delete_forever</md-icon>
                    </md-button>
                </div>
            </md-table-cell>

        </md-table-row> -->



    </div>
  
</template>

<script>
export default {
    name: 'Pedido',
    components:{

    },

    data: () => ({

    }),

    methods: {

        onNovoPedido(){
            console.log('aaaa')
            
            this.$router.push({ name: 'Pedido', params: {pedido:{} }})
        }
    }

    


}
</script>

<style>

</style>