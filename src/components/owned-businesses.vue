<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Owned Businesses</p>
        </header>
        <div class="card-content">
            <div v-if="userBusinesses">
                <ul>
                    <li v-for="(key, value) in userBusinesses">
                        <em><b>{{key.name}}</b></em>: {{key.class}} {{key.type}}
                    </li>
                </ul>
                <div style="text-align:center">
                    <button class="button content is-primary" v-on:click="removeUserBusiness()">Remove User Businesses</button>
                </div>
            </div>
            <p v-else>None</p>
        </div>
    </div>
</template>

<script>
import database from "../js/db";

export default {
    mounted: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
            vm.userBusinesses = snapshot.val();
        });
    },
    methods: {
        removeUserBusiness: function() {
            database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").remove();
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