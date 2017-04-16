<template>
    <section class="section">
        <div class="container content">
            <section class="columns">
                <div class="column is-half is-offset-one-quarter">
                    <form id="form">
                        <div class="heading">
                            <h1 class="title">Login Page</h1>
                        </div>
                        <b-field label="Email">
                            <b-input type="email"
                                value=""
                                v-model="newUser.email">
                            </b-input>
                        </b-field>
                        <b-field label="Password">
                            <b-input type="password"
                                value=""
                                minlength="8"
                                maxlength="30"
                                v-model="newUser.password"
                                password-reveal>
                            </b-input>
                        </b-field>
                        <button class="button is-primary is-large" v-bind:class="formInvalid" v-on:click="logInUser($event)">Log In</button>
                        <button class="button is-success is-large" v-bind:class="formInvalid" v-on:click="registerUser($event)">Register</button>
                    </form>
                    <div v-if="couldntFindUser" class="error-section">
                        <p>Couldn't find that user!</p>
                    </div>
                    <div v-if="wrongPassword" class="error-section">
                        <p>Password doesn't match ours!</p>
                    </div>
                    <div v-if="sameUser" class="error-section">
                        <p>User already exists with that email!</p>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import database from "../js/db"
import router from "../js/routes"

var couldntFindUser = false;
var wrongPassword = false;
var sameUser = false;

// Try to log the user in initially - we might have storage locally!
if(database.currentUser() != null) {
    if(database.login(database.currentUser().email, database.currentUser().password)) {
        router.go("/");
    }
}

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    // computed property for form validation state
    computed: {
        validation: function () {
            return {
                email: emailRE.test(this.newUser.email),
                password: !!this.newUser.password.trim() && this.newUser.password.length >= 8
            }
        },
        isValid: function () {
            var validation = this.validation
            return Object.keys(validation).every(function (key) {
                return validation[key]
            })
        },
        formInvalid: function() {
            if(!this.validation.email || !this.validation.password) {
                return "is-disabled"
            }
            else {
                return ""
            }
        }
    },
    // methods
    methods: {
        logInUser(e) {
            e.stopPropagation();
            var loginReturn = database.login(this.newUser.email, this.newUser.password)
            if (loginReturn == 1) {
                this.couldntFindUser = true
            }
            else if(loginReturn == 2) {
                this.wrongPassword = true
            }
        },
        registerUser(e) {
            e.stopPropagation();
            var signinReturn = database.signup(this.newUser.email, this.newUser.password)
            if (signinReturn == 1) {
                this.sameUser = true
            }
        },
    },
    data() {
        return {
            newUser: {
                email: '',
                password: ''
            },
            couldntFindUser: couldntFindUser,
            wrongPassword: wrongPassword,
            sameUser: sameUser
        }
    }
}
</script>