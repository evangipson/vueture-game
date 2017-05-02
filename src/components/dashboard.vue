<template>
    <div>
        <hero></hero>
        <div class="container content">
            <div class="columns">
                <div class="column is-two-thirds">
                    <h1 :ref="currentUserNameRef" class="title">
                        Welcome back {{currentUserName}}
                    </h1>
                    <business></business>
                </div>
                <div class="column">
                    <b><em>Profile Information</em></b>
                    <ul>
                        <li>User email: {{user.email}}</li>
                        <li>User UID: {{user.uid}}</li>
                        <li :ref="currentUserGoldRef">User Money: {{currentUserGold}}</li>
                        <li v-if="user.emailVerified">You've validated your email.</li>
                        <li v-else>You haven't validated your email. But I haven't sent any yet so don't worry!</li>
                    </ul>
                </div>
            </div>
            <random-number></random-number>
        </div>
    </div>
</template>

<script>
import RandomNumber from "./random-number.vue"
import Hero from "./hero.vue"
import Business from "./business.vue"
import database from "../js/db"

export default {
  components: { RandomNumber, Hero, Business },
  computed: {
    authenticated: {
        get: function() {
            return database.currentUser() == null ? false : true;
        }
    },
    currentUserGoldRef: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/gold").on("value", function(snapshot) {
            vm.currentUserGold = snapshot.val();
        });
    },
    currentUserNameRef: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/name").on("value", function(snapshot) {
            vm.currentUserName = snapshot.val();
        });
    }
  },
  data() {
    return {
        user: database.currentUser(),
        currentUserGold: '',
        currentUserName: database.currentUser().email,
    }
  }
}
</script>