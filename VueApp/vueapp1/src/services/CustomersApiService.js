import axios from 'axios'

export default {
    async getCustomers (customerId) {
        let url = `${process.env.VUE_APP_BASEURL}/customers`

        if (customerId) {
            url = `${url}/${customerId}`
        }

        console.log(url)

        let axiosOptions = {
            method: 'get',
            url: url
        }

        let response = await axios(axiosOptions)
        return response.data.data
    },

    async createNewCustomers (customers) {
        let axiosOptions = {
            method: 'post',
            url: `${process.env.VUE_APP_BASEURL}/customers`,
            data: customers
        }

        let response = await axios(axiosOptions)
        return response.data
    },

    async updateCustomer (customer) {
        let axiosOptions = {
            method: 'put',
            url: `${process.env.VUE_APP_BASEURL}/customers/${customer._id}`,
            data: customer
        }

        let response = await axios(axiosOptions)
        return response.data
    }
}
