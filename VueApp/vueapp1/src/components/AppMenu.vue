<template>
    <v-menu v-model="isMenuDisplayed">
        <v-list>
            <v-list-tile @click="$router.push('customers')">
                <v-list-tile-title>Customers</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'AppMenu',
    props: {
        isMenuDisplayed: Boolean
    }
}
</script>

<style>

</style>
