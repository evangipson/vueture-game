<template>
    <div class="column">
        <h1>Businesses for sale</h1>
        <h2>Business #1</h2>
        <p>{{generatedBusiness}}</p>
        <a class="button is-success" v-on:click="createBusiness()">Create Business</a>
        <a class="button is-info" v-on:click="buyBusiness()">Buy Business</a>
    </div>
</template>

<script>
import business from "../js/business"
import database from "../js/db"

export default {
    computed: {
        currentUserBusinessRef: {
            get: function() {
                var vm = this;
                return currentUserRef.child("businesses").on("value", function(snapshot) {
                    vm.userBusinesses = snapshot.val();
                });
            }
        }
    },
    methods: {
        createBusiness: function() {
            this.generatedBusiness = business.constructBusiness()
        },
        buyBusiness: function() {
            // Let the user know we were successful in buying the business
            this.$toast.open({
                message: 'Business Purchased!',
                type: 'is-success'
            })
        }
    },
    data() {
        return {
            userBusinesses: [],
            generatedBusiness: business.constructBusiness()
        }
    }
}
</script>