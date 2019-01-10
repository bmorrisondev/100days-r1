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

    async createNewCustomers (customerData) {
        let axiosOptions = {
            method: 'post',
            url: `${process.env.VUE_APP_BASEURL}/customer`,
            data: {
                id: customerData.id,
                firstName: customerData.firstName,
                lastName: customerData.lastName
            }
        }

        let response = await axios(axiosOptions)
        return response.data
    }
}
