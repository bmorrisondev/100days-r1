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
                    <td>
                        <a href="#" @click="editCustomer(props.item)">Edit</a> |
                        <router-link :to="{ name: 'customerdetail', params: { customerId: props.item._id }}">Details</router-link>
                    </td>
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

        <v-dialog v-model="isEditingCustomer" max-width="450">
            <v-card>
                <v-card-title class="headline">Edit Customer</v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="First Name*" required v-model="editingCustomer.firstName"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Last Name*" required v-model="editingCustomer.lastName"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" flat="flat" @click="isEditingCustomer = false">
                        Cancel
                    </v-btn>

                    <v-btn color="green darken-1" flat="flat" @click="updateCustomer()">
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
                },
                {
                    text: 'Actions',
                    align: 'left',
                    value: 'actions'
                }
            ],
            customers: [],
            isAddingCustomer: false,
            newCustomer: {
                id: null,
                firstName: null,
                lastName: null
            },
            isEditingCustomer: false,
            editingCustomer: {
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

        async clearEditingCustomer() {
            let newCustomer = {
                id: null,
                firstName: null,
                lastName: null
            }

            this.editingCustomer = newCustomer
        },

        async getCustomerData() {
            this.customers = await CustomerApiService.getCustomers()
        },

        async saveNewCustomer(keepDialogOpen) {
            await CustomerApiService.createNewCustomers([this.newCustomer])
            this.generateNewCustomer()
            if(!keepDialogOpen) {
                this.isAddingCustomer = false
            }
            this.getCustomerData()
        },

        async editCustomer(customer) {
            this.editingCustomer = customer
            this.isEditingCustomer = true
        },

        async updateCustomer() {
            await CustomerApiService.updateCustomer(this.editingCustomer)
            this.isEditingCustomer = false
            this.clearEditingCustomer()
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
