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
                        <button class="button is-primary is-large" v-bind:class="formInvalid" v-on:click="submit($event)">Log In</button>
                    </form>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import db from "../js/db"

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var userRef = db.database().ref("users");

export default {
    // firebase binding
    // https://github.com/vuejs/vuefire
    firebase: {
        users: userRef
    },
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
                return "is-disabled";
            }
            else {
                return "";
            }
        }
    },
    // methods
    methods: {
        submit(e) {
            e.stopPropagation();
            if (this.isValid) {
                userRef.push(this.newUser)
                this.newUser.email = ''
                this.newUser.password = ''
            }
        }
    },
    data() {
        return {
            newUser: {
                email: '',
                password: ''
            }
        }
    }
}
</script>