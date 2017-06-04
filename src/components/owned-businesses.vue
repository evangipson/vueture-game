<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Owned Businesses</p>
        </header>
        <div class="card-content">
            <div v-if="userBusinesses">
                <ul>
                    <li v-for="(key, value) in userBusinesses">
                        <em><b><router-link to="/portfolio">{{key.name}}</router-link></b></em>: {{key.class}} {{key.type}}
                    </li>
                </ul>
                <div class="submit-button">
                    <button class="button content is-primary" v-on:click="removeUserBusiness()">Remove User Businesses</button>
                </div>
            </div>
            <p v-else>None</p>
        </div>
    </div>
</template>

<script>
import * as Database from "../ts/db";

export default {
    mounted: function() {
        var vm = this;
        Database.db().ref("users/" + Database.currentUser().uid + "/businesses").on("value", function(snapshot) {
            vm.userBusinesses = snapshot.val();
        });
    },
    methods: {
        removeUserBusiness: function() {
            Database.db().ref("users/" + Database.currentUser().uid + "/businesses").remove();
            // Let the user know we were successful in updating
            this.$toast.open({
                message: 'All businesses removed!',
                type: 'is-info'
            })
        }
    },
    data() {
        return {
            userBusinesses: ''
        };
    }
}
</script>