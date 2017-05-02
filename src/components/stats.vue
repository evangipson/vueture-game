<template>
    <section class="section">
        <div class="container content">
            <div class="heading">
                <h1 class="title">Statistics Page</h1>
            </div>
            <ul>
                <li :ref="goldRef">{{gold}}</li>
            </ul>
        </div>
    </section>
</template>

<script>
import database from "../js/db"

export default {
    computed: {
        goldRef: function() {
            var vm = this;
            database.firebaseInterface.db.ref("/gold").on("value", function(snapshot) {
                vm.gold = snapshot.val();
            });
        }
    },
    data() {
        return {
            gold: ''
        }
    }
}
</script>