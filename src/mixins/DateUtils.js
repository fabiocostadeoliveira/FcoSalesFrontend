export const dateUtil = {

    methods:{
        getBRFormat(date){
            return this.$moment(date).format('DD/MM/YYYY')
        },

        isValidDate(value){

            let time = null
            try {
                time = value.getTime()
            } catch (error) {
                return false
            }

            return isNaN(time) ? false : true
        },

        strToDate(strDate){
            return this.$moment(strDate, 'DD/MM/YYYY', true).toDate()
        }

    }    

}
