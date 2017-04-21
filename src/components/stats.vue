<template>
    <section class="section">
        <div class="container content">
            <div class="heading">
                <h1 class="title">Statistics Page</h1>
            </div>
            <p v-cloak>Server's Gold: {{serverGold}}</p>
            <p v-cloak>Total Gold: {{totalGold}}</p>
        </div>
    </section>
</template>

<script>
import database from "../js/db"

var serverGold = 0;
var totalGold = 0;

export default {
    computed: {
        serverGold: {
            get: function() {
                console.log("Logging started in computed serverGold");
                var vm = this;
                database.firebaseInterface.db.ref("/gold/server").on('value', function(snapshot) {
                    console.log("In the Firebase Promise for /gold/server");
                    console.log(serverGold);
                    console.log(snapshot.val());
                    console.log("Logging ended");
                    serverGold = snapshot.val();
                });
            }
        },
        totalGold: {
            get: function() {
                database.firebaseInterface.db.ref("/gold/total").on('value', function(snapshot) {
                    totalGold = snapshot.val();
                });
            }
        }
    },
    data() {
        return {
            serverGold: serverGold,
            totalGold: totalGold
        }
    }
}
</script>