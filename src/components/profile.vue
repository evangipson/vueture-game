<template>
    <section class="section columns">
        <div class="column is-half is-offset-one-quarter">        
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">User Profile</p>
                </header>
                <div class="card-content">
                    <form id="form" v-on:submit.prevent="updateUserSettings">
                        <b-field label="username">
                            <b-input value=""
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

var currentUserRef = database.firebaseInterface.db.ref("users/" + database.currentUser().uid)

export default {
    // methods
    methods: {
        updateUser(e) {
            e.preventDefault();
            // Write out this user to the userRef
            currentUserRef.update({
                name: this.user.name
            });
        }
    },
    data() {
        return {
            user: {
                name: ''
            }
        }
    }
}
</script>