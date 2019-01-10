<template>
    <v-layout row>
        <v-flex sm12>
            <v-toolbar class="minimal-toolbar">
                <v-toolbar-items>
                    <v-btn flat @click="isAddingCustomer = true">Add Customer</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-data-table :headers="headers" :items="customers" class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.firstName }}</td>
                    <td>{{ props.item.lastName }}</td>
                </template>
            </v-data-table>
        </v-flex>

        <v-dialog v-model="isAddingCustomer" max-width="450">
            <v-card>
                <v-card-title class="headline">New Customer</v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="First Name*" required v-model="newCustomer.firstName"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Last Name*" required v-model="newCustomer.lastName"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" flat="flat" @click="isAddingCustomer = false">
                        Cancel
                    </v-btn>

                    <v-btn color="green darken-1" flat="flat" @click="saveNewCustomer({ keepDialogOpen: true })">
                        Save & New
                    </v-btn>

                    <v-btn color="green darken-1" flat="flat" @click="saveNewCustomer()">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import CustomerApiService from '@/services/CustomersApiService'
import uuidv4 from 'uuid/v4'

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
            customers: [],
            isAddingCustomer: false,
            newCustomer: {
                id: null,
                firstName: null,
                lastName: null
            }
        }
    },
    created: function() {
        this.getCustomerData()
        this.generateNewCustomer()
    },
    methods: {
        async generateNewCustomer () {
            let newCustomer = {
                id: uuidv4(),
                firstName: null,
                lastName: null
            }

            this.newCustomer = newCustomer
        },

        async getCustomerData() {
            this.customers = await CustomerApiService.getCustomers()
        },

        async saveNewCustomer(keepDialogOpen) {
            await CustomerApiService.createNewCustomers(this.newCustomer)
            this.generateNewCustomer()
            if(!keepDialogOpen) {
                this.isAddingCustomer = false
            }
            this.getCustomerData()
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
