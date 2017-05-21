<template>
    <nav class="nav is-info has-shadow">
        <div class="nav-left">
            <router-link id="logo" class="nav-item button is-large is-info is-outlined" to='/' exact>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 22">
                    <g class="vueture-logo">
                        <circle cx="9" cy="12" r="8"/>
                        <path d="M17 4.26v2.09c2.33.82 4 3.04 4 5.65s-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z"/>
                    </g>
                </svg>
                <p>Vueture</p>
            </router-link>
        </div>
        <!-- Hamburger Menu for mobile -->
        <span id="nav-toggle" v-on:click="handleNavToggle()" class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </span>
        <div id="nav-menu"  v-on:click="handleNavClicks()" class="nav-right nav-menu">
            <router-link active-class="is-active" class="nav-item is-tab is-large" to="/" exact>Dashboard</router-link>
            <router-link active-class="is-active" class="nav-item is-tab is-large" to="/profile">Profile</router-link>
            <router-link active-class="is-active" class="nav-item is-tab is-large" to="/portfolio">Portfolio</router-link>
            <router-link active-class="is-active" v-if="availableBusinesses" class="nav-item is-tab is-large" to="/staff">Staff</router-link>
            <a class="nav-item is-tab is-large" v-if="authenticated" v-on:click="logUserOut">Log Out</a>
            <router-link active-class="is-active"  v-else class="nav-item is-tab is-large" to="/login">Login</router-link>
        </div>
    </nav>
</template>
<!-- Set up our export -->
<script>
import database from "../js/db"
import router from "../js/routes"

export default {
    mounted: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
            vm.availableBusinesses = snapshot.val();
        });
    },
    methods: {
        logUserOut: function() {
            database.logout();
        },
        handleNavToggle: function() {
            document.getElementById('nav-toggle').classList.toggle('is-active');
            document.getElementById('nav-menu').classList.toggle('is-active');
        },
        handleNavClicks: function() {
            var mobileNavToggle = document.getElementById("nav-toggle");
            if(mobileNavToggle.classList.contains("is-active")) {
                mobileNavToggle.click();
            }
        }
    },
    computed: {
        authenticated: {
            get: function() {
                return database.currentUser() == null ? false : true;
            }
        }
    },
    data () {
        return {
            availableBusinesses: ''
        }
    }
}
</script>