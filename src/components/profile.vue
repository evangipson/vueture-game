<template>
    <section class="section columns">
        <div class="column is-half is-offset-one-quarter">        
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">User Profile</p>
                </header>
                <div class="card-content">
                    <form id="form">
                        <b-field :ref="userNameRef" label="Username">
                            <b-input
                                :placeholder="userName"
                                v-model="user.name">
                            </b-input>
                        </b-field>
                    </form>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item is-enabled" v-on:click="updateUser($event)">Update Info</a>
                </footer>
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
        }
    },
    // methods
    methods: {
        updateUser(e) {
            e.preventDefault();
            // Write out this user to the userRef
            currentUserRef.update({
                name: this.user.name
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
            user: {
                name: ''
            },
            userName: ''
        }
    }
}
</script>