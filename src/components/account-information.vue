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
import * as Database from "../ts/db";
import * as Utils from "../ts/utilities";

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
        Database.db().ref("users/" + Database.currentUser().uid + "/money").on("value", function(snapshot) {
            vm.money = Utils.formatNumberAsMoney(snapshot.val());
        });
    },
    data () {
        return {
            money: "0.00"
        };
    }
}
</script>