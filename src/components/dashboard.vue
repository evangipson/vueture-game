<template>
    <div>
        <hero></hero>
        <div class="container content">
            <div class="columns">
                <div class="column">
                    <h1 :ref="currentUserNameRef" class="title">
                        Welcome back {{currentUserName}}
                    </h1>
                    <business></business>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Hero from "./hero.vue"
import Business from "./business.vue"
import database from "../js/db"

export default {
  components: { Hero, Business },
  computed: {
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
        currentUserName: database.currentUser().email,
    }
  }
}
</script>