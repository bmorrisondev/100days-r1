<template>
    <v-layout row>
        <v-flex sm12>
            <v-data-table :headers="headers" :items="customers" class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.firstName }}</td>
                    <td>{{ props.item.lastName }}</td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
import CustomerApiService from '@/services/CustomersApiService'

export default {
    name: 'CustomersIndex',
    data: function() {
        return {
            headers: [
                {
                    text: 'First Name',
                    align: 'left',
                    value: 'firstName'
                },
                {
                    text: 'Last Name',
                    align: 'left',
                    value: 'lastName'
                }
            ],

            customers: []
        }
    },
    created: function() {
        this.getCustomerData()
    },
    methods: {
        async getCustomerData() {
            this.customers = await CustomerApiService.getCustomers()
        }
    }
}
</script>

<style>

</style>
