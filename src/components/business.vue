<template>
    <div class="column">
        <h2>Owned Businesses</h2>
        <p v-if="currentUserBusinessRef">{{this.userBusinesses}}</p>
        <h2>Businesses for sale</h2>
        <h3>Business #1</h3>
        <p>{{this.generatedBusiness}}</p>
        <a class="button is-success" v-on:click="createBusiness()">Create Business</a>
        <a class="button is-info" v-on:click="buyBusiness()">Buy Business</a>
    </div>
</template>

<script>
import business from "../js/business"
import database from "../js/db"


var currentUserBusinessRef = database.firebaseInterface.db.ref("/users/" + database.currentUser().uid + "/businesses");

export default {
    computed: {
        currentUserBusinessRef: {
            get: function() {
                var vm = this;
                return currentUserBusinessRef.on("value", function(snapshot) {
                    vm.userBusinesses = snapshot.val();
                });
            }
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