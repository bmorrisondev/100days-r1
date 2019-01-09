<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-side-icon @click="isMenuDisplayed = !isMenuDisplayed"></v-toolbar-side-icon>
            <v-toolbar-title>Vue CRM</v-toolbar-title>
            <!-- <AppMenu :isMenuDisplayed="isMenuDisplayed" /> -->
            <!-- TODO: Move this into separate component and bind using vuex -->
            <v-menu v-model="isMenuDisplayed">
                <v-list>
                    <v-list-tile @click="$router.push('customers')">
                        <v-list-tile-title>Customers</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
                <span class="mr-2">Latest Release</span>
            </v-btn>
        </v-toolbar>

        <v-content>
            <v-container fluid fill-height>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue'

export default {
    name: 'App',
    components: {
        AppMenu
    },
    data () {
        return {
            isMenuDisplayed: null
        }
    }
}
</script>
