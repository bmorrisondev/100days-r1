import axios from 'axios'

export default {
    async getCustomers () {
        let axiosOptions = {
            method: 'get',
            url: `${process.env.VUE_APP_BASEURL}/customer`
        }

        let response = await axios(axiosOptions)
        return response.data
    },

    async createCustomers (customersData) {
        let axiosOptions = {
            method: 'post',
            url: `${process.env.VUE_APP_BASEURL}/customer`,
            data: customersData
        }

        let response = await axios(axiosOptions)
        return response.data
    }
}