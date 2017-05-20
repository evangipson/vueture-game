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
                </ul>
            </div>
        </div>
      </div>
        <!-- card with link to new business -->
        <!-- maybe use the plus on a smaller scale? -->
      <div class="column is-half">
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
    </section>
  </div>
</template>

<script>
import Hero from "./hero.vue";
import OwnedBusinesses from "./owned-businesses.vue";
import AccountInformation from "./account-information.vue";
import database from "../js/db";

export default {
  components: { Hero, OwnedBusinesses, AccountInformation },
  data() {
    return {
        userBusinesses: function() {
            var vm = this;
            database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
                if(snapshot.val() != null) {
                    return true;
                }
                return false;
            });
        }
    }
  }
}
</script>