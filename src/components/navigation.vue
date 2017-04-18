<template>
    <nav class="nav is-info has-shadow">
        <div class="nav-left">
            <router-link class="nav-item button is-large is-info is-outlined" to='/' exact>
                <i class="material-icons md-32">fiber_smart_record</i> Vueture 
            </router-link>
        </div>
        <!-- Hamburger Menu for mobile -->
        <span id="nav-toggle" onclick="document.getElementById('nav-toggle').classList.toggle('is-active');document.getElementById('nav-menu').classList.toggle('is-active')" class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </span>
        <div id="nav-menu" class="nav-right nav-menu">
            <router-link active-class="is-active" class="nav-item is-tab is-large" to="/" exact>Dashboard</router-link>
            <router-link active-class="is-active" class="nav-item is-tab is-large" to="/stats">Stats</router-link>
            <a class="nav-item is-tab is-large" v-if="authenticated" v-on:click="logUserOut">Log Out</a>
            <router-link active-class="is-active"  v-else class="nav-item is-tab is-large" to="/login">Login</router-link>
        </div>
    </nav>
</template>
<!-- Set up our export -->
<script>
import database from "../js/db"
import router from "../js/routes"
export default {
  methods: {
      logUserOut: function() {
        database.logout();
      }
  },
  computed: {
      authenticated: {
          get: function() {
              return database.currentUser() == null ? false : true;
          }
      }
  },
  data () {
    return {
    }
  }
}
</script>