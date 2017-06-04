<template>
    <section class="section columns">
        <div class="column is-12-mobile is-half-desktop">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">User Statistics</p>
                </header>
                <div class="card-content">
                    <h2 v-cloak>Registered Users: {{registeredUserNumber}}</h2>
                    <ul>
                        <li v-for="(key, value) in userBusinesses">
                            <em><b><router-link to="/portfolio">{{key.name}}</router-link></b></em>: {{key.class}} {{key.type}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="column is-12-mobile is-half-desktop">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Random Number Generator</p>
                </header>
                <div class="card-content">
                    <random-number></random-number>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import * as Database from "../ts/db";
import RandomNumber from "./random-number.vue";

export default {
    components: { RandomNumber },
    computed: {
        registeredUserNumber: {
            get: function() {
                return Object.keys(this.registeredUsers).length;
            }
        }
    },
    mounted: function() {
        var vm = this;
        Database.db().ref("/money").on("value", function(snapshot) {
            vm.money = snapshot.val();
        });
        Database.db().ref("/users").on("value", function(snapshot) {
            vm.registeredUsers = snapshot.val();
        });
    },
    data() {
        return {
            money: '',
            registeredUsers: ''
        };
    }
}
</script>