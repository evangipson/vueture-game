<template>
    <div>
        <hero></hero>
        <section class="section">
            <div class="container content">
                <div class="heading">
                    <h1 class="title">
                        Home Page
                    </h1>
                </div>
                <div v-if="authenticated">
                    <ul>
                        <li><b><em>Profile Information</em></b></li>
                        <li>{{user.email}}</li>
                        <li>{{user.emailVerified}}</li>
                        <li>{{user.uid}}</li>
                    </ul>
                </div>
                <div class="subtitle" v-else>
                    <h2>
                        If you were signed in, you'd see cool profile information here!
                    </h2>
                </div>
            </div>
        </section>
        <random-number></random-number>
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