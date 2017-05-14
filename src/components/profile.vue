<template>
    <div class="section columns">
        <div class="column is-12-mobile is-half-desktop is-offset-one-quarter-desktop">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">User Profile</p>
                </header>
                <div class="card-content">
                    <form id="form">
                        <b-field label="Username">
                            <b-input
                                v-model="userName">
                            </b-input>
                        </b-field>
                    </form>
                    <ul>
                        <li>User email: {{user.email}}</li>
                        <li class="currency">User Money: <sup>$</sup>{{dollars}}<sup>.{{cents}}</sup></li>
                        <li v-if="user.emailVerified">You've validated your email!</li>
                        <li v-else>You haven't validated your email. But I haven't sent any yet so don't worry.</li>
                    </ul>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item is-enabled" v-on:click="updateUser()">Update Info</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import database from "../js/db";
import utils from "../js/utilities";

var currentUserRef = {};

export default {
    mounted: function() {
        // Fill our firebase-y variables
        currentUserRef = database.firebaseInterface.db.ref("users/" + database.currentUser().uid);
        this.user = database.currentUser();
        var vm = this;
        currentUserRef.child("name").on("value", function(snapshot) {
            vm.userName = snapshot.val();
        });
        currentUserRef.child("gold").on("value", function(snapshot) {
            vm.currentUserGold = utils.formatNumberAsMoney(snapshot.val());
        });
    },
    computed: {
        dollars: {
            get: function() {
                return this.currentUserGold.split(".")[0];
            }
        },
        cents: {
            get: function() {
                return this.currentUserGold.split(".")[1];
            }
        }
    },
    // methods
    methods: {
        updateUser() {
            // Write out this user to the userRef
            currentUserRef.update({
                name: this.userName
            });
            // Let the user know we were successful in updating
            this.$toast.open({
                message: 'Profile name updated, ' + this.userName + '!',
                type: 'is-info'
            });
        }
    },
    data() {
        return {
            user: '',
            userName: '',
            currentUserGold: ''
        };
    }
}
</script>