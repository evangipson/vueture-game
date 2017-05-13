<template>
    <section class="section">
        <div class="container content">
            <div class="heading">
                <h1 class="title">Statistics Page</h1>
            </div>
            <ul>
                <li>{{gold}}</li>
            </ul>
        </div>
        <div class="container content">
            <random-number></random-number>
        </div>
    </section>
</template>

<script>
import database from "../js/db";
import RandomNumber from "./random-number.vue";

export default {
    components: { RandomNumber },
    mounted: function() {
        var vm = this;
        database.firebaseInterface.db.ref("/gold").on("value", function(snapshot) {
            vm.gold = snapshot.val();
        });
    },
    data() {
        return {
            gold: ''
        };
    }
}
</script>