<template>
    <section>
        <div class="section columns">
            <div class="column is-half is-offset-one-quarter">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">User Profile</p>
                    </header>
                    <div class="card-content">
                        <form id="form">
                            <b-field :ref="userNameRef" label="Username">
                                <b-input
                                    v-model="userName">
                                </b-input>
                            </b-field>
                        </form>
                        <ul>
                            <li>User email: {{user.email}}</li>
                            <li>User UID: {{user.uid}}</li>
                            <li :ref="currentUserGoldRef">User Money: {{currentUserGold}}</li>
                            <li v-if="user.emailVerified">You've validated your email.</li>
                            <li v-else>You haven't validated your email. But I haven't sent any yet so don't worry!</li>
                        </ul>
                    </div>
                    <footer class="card-footer">
                        <a class="card-footer-item is-enabled" v-on:click="updateUser()">Update Info</a>
                    </footer>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import database from "../js/db"

export default {
    computed: {
        userNameRef: function() {
            var vm = this;
            database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/name").on("value", function(snapshot) {
                vm.userName = snapshot.val();
            });
        },
        currentUserGoldRef: function() {
            var vm = this;
            database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/gold").on("value", function(snapshot) {
                vm.currentUserGold = snapshot.val();
            });
        }
    },
    // methods
    methods: {
        updateUser() {
            // Write out this user to the userRef
            database.firebaseInterface.db.ref("users/" + database.currentUser().uid).update({
                name: this.userName
            });
            // Let the user know we were successful in updating
            this.$toast.open({
                message: 'Profile updated!',
                type: 'is-info'
            })
        }
    },
    data() {
        return {
            user: database.currentUser(),
            userName: '',
            currentUserGold: '',
        }
    }
}
</script>