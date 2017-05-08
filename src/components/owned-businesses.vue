<template>
    <div class="column is-one-quarter">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Owned Businesses</p>
            </header>
            <div :ref="userBusinessesRef" class="card-content">
                <ul v-if="userBusinesses">
                    <li v-for="(key, value) in userBusinesses">
                        <em><b>{{key.name}}</b></em>: {{key.class}} {{key.type}}
                    </li>
                </ul>
                <p v-else>None</p>
            </div>
        </div>
    </div>
</template>

<script>
import database from "../js/db";

export default {
    computed: {
        userBusinessesRef: function() {
            var vm = this;
            database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
                vm.userBusinesses = snapshot.val();
            });
        }
    },
    data() {
        return {
            userBusinesses: ''
        };
    }
}
</script>