<template>
    <div class="column">
        <h2>Owned Businesses</h2>
        <p :ref="currentUserBusinessRef" v-if="userBusinesses">{{this.userBusinesses}}</p>
        <p v-else>None</p>
        <h2>Business for sale</h2>
        <p>{{this.generatedBusiness}}</p>
        <a class="button is-success" v-on:click="createBusiness()">Create Business</a>
        <a class="button is-info" v-on:click="buyBusiness()">Buy Business</a>
    </div>
</template>

<script>
import business from "../js/business"
import database from "../js/db"

export default {
    computed: {
        currentUserBusinessRef: function() {
            var vm = this;
            database.firebaseInterface.db.ref("/users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
                vm.userBusinesses = snapshot.val();
            });
        }
    },
    methods: {
        createBusiness: function() {
            this.generatedBusiness = business.constructBusiness();
        },
        buyBusiness: function() {
            currentUserBusinessRef.push().set(this.generatedBusiness);
            // Let the user know we were successful in buying the business
            this.$toast.open({
                message: 'Business Purchased!',
                type: 'is-success'
            });
        }
    },
    data() {
        return {
            userBusinesses: '',
            generatedBusiness: business.constructBusiness()
        }
    }
}
</script>