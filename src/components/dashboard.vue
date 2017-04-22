<template>
    <div>
        <hero></hero>
        <div class="container content">
            <div class="columns">
                <div class="column is-half">
                    <div class="heading">
                        <h1 class="title">
                            Home Page
                        </h1>
                    </div>
                    <p>Pretty soon you'll be creating businesses from here!</p>
                </div>
                <div class="column">
                    <b><em>Profile Information</em></b>
                    <ul>
                        <li>User email: {{user.email}}</li>
                        <li>User UID: {{user.uid}}</li>
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
import database from "../js/db"

export default {
  components: { RandomNumber, Hero },
  computed: {
      authenticated: {
          get: function() {
              return database.currentUser() == null ? false : true;
          }
      }
  },
  data() {
    return {
        user: database.currentUser()
    }
  }
}
</script>