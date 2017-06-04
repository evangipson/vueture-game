<template>
  <div>
    <hero></hero>
    <section class="content columns">
      <div class="column is-half">
        <account-information></account-information>
        <div class="card">
            <div class="card-content">
                <ul>
                  <li>Lost? <a href="https://github.com/evangipson/vueture-game/wiki">Read the Wiki</a>!</li>
                  <li>Curious? <a href="https://github.com/evangipson/vueture-game">Read the code</a>!</li>
                  <li>Love numbers? <router-link to="/stats">Check out some stats</router-link>!</li>
                </ul>
            </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="columns">
          <div style="text-align:center" class="column">
            <h2><b>Action Center</b></h2>
          </div>
        </div>
        <div class="columns">
          <!-- card with link to new business -->
          <!-- maybe use the plus on a smaller scale? -->
          <div v-if="availableBusinesses" class="column is-half">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Interview Somebody!</p>
              </header>
              <router-link to="/staff">
                <div class="card-content plus-center">
                  <svg id="newStaffPlus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 42 42" xml:space="preserve">
                    <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22"></polygon>
                  </svg>
                </div>
              </router-link>
            </div>
          </div>
          <!-- card with link to new staff -->
          <div :class="[availableBusinesses ? 'column is-half' : 'column']">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Start a New Business!</p>
              </header>
              <router-link to="/new-business">
                <div class="card-content plus-center">
                  <svg id="newBusinessPlus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 42 42" xml:space="preserve">
                    <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22"></polygon>
                  </svg>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Hero from "./hero.vue";
import AccountInformation from "./account-information.vue";
import * as Database from "../ts/db";

export default {
    components: { Hero, AccountInformation },
    mounted: function() {
        var vm = this;
        Database.db().ref("users/" + Database.currentUser().uid + "/businesses").on("value", function(snapshot) {
            vm.availableBusinesses = snapshot.val();
        });
    },
    data() {
        return {
            availableBusinesses: ""
        }
    }
}
</script>