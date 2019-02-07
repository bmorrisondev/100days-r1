<template>
    <v-layout row>
        <v-flex sm12>
            <v-toolbar class="minimal-toolbar">
                <v-toolbar-items>
                    <v-btn flat @click="isAddingCustomer = true">Add Customer</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <h1>{{ customer.firstName }} {{ customer.lastName }}</h1>
        </v-flex>
    </v-layout>
</template>

<script>
import CustomerApiService from '@/services/CustomersApiService'

export default {
    name: 'CustomersDetail',
    props: {
        customerId: String
    },
    data: function() {
        return {
            customer: {
                id: null,
                firstName: null,
                lastName: null
            }
        }
    },
    created: function() {
        this.getCustomerData()
    },
    methods: {
        async getCustomerData() {
            let response = await CustomerApiService.getCustomers(this.customerId)
            this.customer = response[0]
        }
    }
}
</script>

<style>
.minimal-toolbar {
    box-shadow: none;
    margin-bottom: 10px;
    border: 1px solid #aaa;
    border-radius: 3px;
}
</style>
