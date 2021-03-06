<template>
    <section class="section columns">
        <div class="column is-12-mobile is-half-desktop is-offset-one-quarter-desktop">
            <div class="card">
                <div class="card-content">
                    <div style="text-align: center">
                        <p>Welcome back to <b><router-link to="/about">Vueture!</router-link></b></p>
                        <p><b><router-link to="/register">Sign up</router-link></b> if you don't have an account.</p>
                    </div>
                    <hr />
                    <form id="form" v-on:keyup.enter="logInUser">
                        <b-field label="Email"
                                :type="userNameType"
                                :message="userNameMessage">
                            <b-input type="email"
                                value=""
                                v-model="newUser.email"
                                :autofocus="autofocus">
                            </b-input>
                        </b-field>
                        <b-field class="passwordLabel"
                                label="Password"
                                :type="passwordType"
                                :message="passwordMessage">
                            <b-input type="password"
                                value=""
                                minlength="8"
                                v-model="newUser.password"
                                password-reveal>
                            </b-input>
                        </b-field>
                    </form>
                </div>
                <footer class="card-footer">
                    <a :class="formValid" class="card-footer-item" v-on:click="logInUser($event)">Log In</a>
                    <router-link to="/register" class="is-enabled card-footer-item">Sign Up</router-link>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
import * as Database from "../ts/db";
import Router from "../ts/routes";

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var usersRef = {};

export default {
    mounted: function() {
        usersRef = Database.db().ref("users");
    },
    // computed property for form validation state
    computed: {
        validation: function () {
            return {
                email: emailRE.test(this.newUser.email),
                password: !!this.newUser.password.trim() && this.newUser.password.length >= 8
            };
        },
        isValid: function () {
            var validation = this.validation
            return Object.keys(validation).every(function (key) {
                return validation[key];
            });
        },
        formValid: function() {
            if(this.validation.email && this.validation.password) {
                return "is-enabled";
            }
            else {
                return "";
            }
        },
        autofocus: function() {
            // Ensure the "email" input is autofocused. Buefy really should find a way to do this!
            window.onload = function() {
                document.getElementsByTagName("input")[0].focus();
            };
        }
    },
    watch: {
        // whenever authReturnCode changes
        authReturnCode: function (newVal, oldVal) {
            // Unsuccessful login for various reasons
            if(newVal === 1) {
                this.userNameMessage = "Account not found - Sign Up to continue";
                this.userNameType = "is-danger";
            }
            else if(newVal === 2) {
                this.passwordMessage = "Password incorrect";
                this.passwordType = "is-danger";
            }
            else if(newVal === 3) {
                this.userNameMessage = "User with this email address already exists";
                this.userNameType = "is-danger";
            }
            // -1 is our "reset" flag
            else if(newVal === -1) {
                this.passwordMessage = "";
                this.passwordType = "";
                this.userNameMessage = "";
                this.userNameType = "";
            }
            // This is to "reset" the state of the form
            if(newVal > 0) {
                var vm = this;
                setTimeout(function(){
                    vm.authReturnCode = -1;
                }, 4000);
            }
        }
    },
    // methods
    methods: {
        logInUser(e, createUser) {
            e.preventDefault();
            // Need to cast "this" because promises just don't understand
            var vm = this;
            Database.auth().signInWithEmailAndPassword(this.newUser.email, this.newUser.password).then(function() {
                vm.authReturnCode = 0;
                // I need this here as well as the route.beforeEach rule
                // that checks your router.path == "/login" w/ a redirect to home.
                // TODO: Remove this and figure out why I need it.
                Router.push({path:"/"});
                // We're redirecting to "/" in the chunk above this export default
                // even though it'd fall here naturally.
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if(errorCode == "auth/user-not-found") {
                    vm.authReturnCode = 1;
                }
                else if(errorCode == "auth/wrong-password") {
                    vm.authReturnCode = 2;
                }
            });
        }
    },
    data() {
        return {
            newUser: {
                email: '',
                password: ''
            },
            authReturnCode: '',
            userNameMessage: '',
            userNameType: '',
            passwordMessage: '',
            passwordType: ''
        }
    }
}
</script>