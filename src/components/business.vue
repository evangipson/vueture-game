<template>
    <section :ref="currentUserBusinessRef" v-if="userBusinesses" class="section columns">
        <div class="column is-half is-offset-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Owned Businesses</p>
                </header>
                <div class="card-content">
                    <p :ref="currentUserBusinessRef" v-if="userBusinesses">{{this.userBusinesses}}</p>
                    <p v-else>None</p>
                    <h2>Business for sale</h2>
                    <p>{{this.generatedBusiness}}</p>
                    <a class="button is-success" v-on:click="createBusiness()">Create Business</a>
                    <a class="button is-info" v-on:click="buyBusiness()">Buy Business</a>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item is-enabled button" v-on:click="createBusiness()">Create Business</a>
                    <a class="card-footer-item is-enabled button" v-on:click="buyBusiness()">Buy Business</a>
                </footer>
            </div>
        </div>
    </section>
    <section v-else class="section columns">
        <div class="column is-half is-offset-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Buy your first Business!</p>
                </header>
                <div v-if="generatedBusiness">
                    <p>{{this.generatedBusiness}}</p>
                </div>
                <div class="card-content">
                    <svg v-on:click="createBusiness()" id="newBusinessPlus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px" viewBox="-21 -21 84 84" xml:space="preserve">
                        <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 " style="fill: rgb(0, 0, 0);"></polygon>
                    </svg>
                </div>
            </div>
        </div>
    </section>
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
            generatedBusiness: ''
        }
    }
}
</script>

<style scoped>
    #newBusinessPlus {
        cursor: pointer;
    }
</style>