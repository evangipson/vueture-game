<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Account</p>
        </header>
        <div :ref="moneyRef" class="card-content">
            <p class="account-value">Total: <sup>$</sup>{{money}}<sup>.00</sup></p>
        </div>
    </div>
</template>
<!-- Set up our export -->
<script>
import database from "../js/db"

export default {
  computed: {
    moneyRef: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/gold").on("value", function(snapshot) {
            vm.money = snapshot.val();
        });
    }
  },
  data () {
    return {
        money: ''
    }
  }
}
</script>