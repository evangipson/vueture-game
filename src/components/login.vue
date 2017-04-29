<template>
    <section class="section columns">
        <div class="column is-half is-offset-one-quarter">        
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Vueture Login</p>
                </header>
                <div class="card-content">
                    <form id="form">
                        <b-field label="Email"
                                :type="userNameType"
                                :message="userNameMessage">
                            <b-input type="email"
                                value=""
                                v-model="newUser.email">
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
                    <a :class="formValid" class="card-footer-item" v-on:click="logInUser($event)">Sign In</a>
                    <a :class="formValid" class="card-footer-item" v-on:click="registerUser($event)">Sign Up</a>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
import database from "../js/db"
import router from "../js/routes"

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var startingMoney = 10000;
var usersRef = database.firebaseInterface.db.ref("users")

export default {
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
    },
    watch: {
        // whenever authReturnCode changes
        authReturnCode: function (newVal, oldVal) {
            // Unsuccessful login for various reasons
            if(newVal === 1) {
                console.log("setting usernameMessage to can't find anyone by that email");
                this.userNameMessage = "Can't find anyone by that email - do you need to register?";
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
                }, 2000);
            }
        }
    },
    // methods
    methods: {
        logInUser(e, createUser) {
            e.preventDefault();
            // Need to cast "this" because promises just don't understand
            var vm = this;
            database.firebaseInterface.auth.signInWithEmailAndPassword(this.newUser.email, this.newUser.password).then(function() {
                vm.authReturnCode = 0;
                if(createUser) {
                    var currentUserUID = database.currentUser().uid;
                    // Write out this user to the userRef and use the UID for the name
                    usersRef.update({
                        [currentUserUID]:{
                            gold: startingMoney
                        }
                    });
                }
                // I need this here as well as the route.beforeEach rule
                // that checks your router.path == "/login" w/ a redirect to home.
                // TODO: Remove this and figure out why I need it.
                router.push({path:"/"});
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
        },
        registerUser(e) {
            e.preventDefault();
            // Need to cast "this" because promises just don't understand
            var vm = this;
            database.firebaseInterface.auth.createUserWithEmailAndPassword(this.newUser.email, this.newUser.password).then(function() {
                // Passing in true here to indicate we want to create a user in the DB
                vm.logInUser(e, true);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/email-already-in-use") {
                    vm.authReturnCode = 3;
                }
                // ...
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