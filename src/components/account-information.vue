<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Account</p>
        </header>
        <div class="card-content">
            <p class="currency">Total: <sup>$</sup>{{dollars}}<sup>.{{cents}}</sup></p>
        </div>
    </div>
</template>
<!-- Set up our export -->
<script>
import database from "../js/db";
import utils from "../ts/utilities.ts";

export default {
    computed: {
        dollars: {
            get: function() {
                return this.money.split(".")[0];
            }
        },
        cents: {
            get: function() {
                return this.money.split(".")[1];
            }
        }
    },
    mounted: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/money").on("value", function(snapshot) {
            vm.money = utils.formatNumberAsMoney(snapshot.val());
        });
    },
    data () {
        return {
            money: "0.00"
        };
    }
}
</script>