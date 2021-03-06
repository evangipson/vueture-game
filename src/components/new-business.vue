<template>
    <section class="content columns">
        <div class="business column">
            <!-- The last menu in business creation -->
            <div v-if="typeSelected && classSelected">
                <div class="columns">
                    <div class="column is-half is-offset-one-quarter">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">Business Contract</p>
                            </header>
                            <div class="card-content">
                                <p>Okay, you have a great idea! I can see your {{selectedBusinessClass}} {{selectedBusinessType}} business succeeding. The only thing it needs is a name!</p>
                                <b-field label="Business Name">
                                    <b-input
                                        v-model="businessName">
                                    </b-input>
                                </b-field>
                                <p v-if="businessCostAsMoney" class="currency">Total: <sup>$</sup>{{dollars}}<sup>.{{cents}}</sup></p>
                            </div>
                            <footer class="card-footer">
                                <a class="card-footer-item is-enabled" v-on:click="buyBusiness()">Start Business</a>
                                <a class="card-footer-item is-enabled" v-on:click="getNewBusinessName()">Generate New Name</a>
                            </footer>
                        </div>
                        <div v-if="selectedBusinessType" class="submit-button">
                            <a class="button is-medium is-primary" v-on:click="resetBusinessName()">Reselect Business Class</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Business class selection cards -->
            <div v-else-if="typeSelected && !classSelected">
                <h3>How big do you think your {{selectedBusinessType}} Business should be?</h3>
                <div v-for="businessClass in businessClasses" class="card business-class" v-on:click="toggleActiveOption($event)">
                    <div class="card-content">
                        <h4>{{ businessClass }}</h4>
                    </div>
                </div>
                <div v-if="selectedBusinessClass" class="submit-button">
                    <a class="button is-medium is-primary" v-on:click="pickBusinessClass()">Name Business</a>
                </div>
                <div class="submit-button">
                    <a class="button is-medium is-info is-outlined" v-on:click="resetBusinessClass()">Reselect Business Type</a>
                </div>
            </div>
            <!-- Business type selection cards -->
            <div v-else>
                <h3>What type of Business do you want to start?</h3>
                <div v-for="(key, value) in businessTypes" class="card business-type" v-on:click="toggleActiveOption($event)">
                    <div class="card-content">
                        <h4>{{ value }}</h4>
                    </div>
                </div>
                <div v-if="selectedBusinessType" class="submit-button">
                    <a class="button is-medium is-primary" v-on:click="pickBusinessType()">Pick your Business Class</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Router from "../ts/routes";
import * as Database from "../ts/db";
import * as Utils from "../ts/utilities";
import * as Business from "../ts/business";

// List all types of business cards used for our clearActiveOptions function.
var businessCardTypes = [ "business-type", "business-class" ];

export default {
    mounted: function() {
        var vm = this;
        Database.db().ref("users/" + Database.currentUser().uid + "/businesses").on("value", function(snapshot) {
            vm.userBusinesses = snapshot.val();
        });
        Database.db().ref("users/" + Database.currentUser().uid + "/money").on("value", function(snapshot) {
            vm.playerMoney = snapshot.val();
        });
    },
    computed: {
        dollars: {
            get: function() {
                return this.businessCostAsMoney.split(".")[0];
            }
        },
        cents: {
            get: function() {
                return this.businessCostAsMoney.split(".")[1];
            }
        }
    },
    methods: {
        // Clears all "active" classes on all business cards.
        clearActiveOptions: function() {
            var allCardsOfType = [];
            for(var cardType in businessCardTypes) {
                if(businessCardTypes.hasOwnProperty(cardType)) {
                    allCardsOfType = document.getElementsByClassName(businessCardTypes[cardType]);
                    for(var card in allCardsOfType) {
                        if(allCardsOfType.hasOwnProperty(card)) {
                            allCardsOfType[card].classList.remove("active");
                        }
                    }
                }
            } 
        },
        toggleActiveOption: function(event) {
            // Set the relevant vue data
            if(event.currentTarget.classList.contains("business-type")) {
                this.selectedBusinessType = event.currentTarget.innerText.trim();
            }
            else if(event.currentTarget.classList.contains("business-class")) {
                // Select the one we picked!
                this.selectedBusinessClass = event.currentTarget.innerText.trim();
            }
            this.clearActiveOptions();
            // Then finally make the one the user clicked the "active" one.
            event.currentTarget.classList.add("active");
        },
        // Disables the progress in creating a business.
        resetBusinessCreationProgress: function() {
            this.resetBusinessClass();
            this.clearActiveOptions();
            /* Now tell the program we haven't hit that plus, or selected
             * a business type, so it will go back. */
            this.typeSelected = false;
            // Wipe the user's type if they had one.
            this.selectedBusinessType = '';
        },
        resetBusinessClass: function() {
            this.classSelected = false;
            this.selectedBusinessClass = '';
            this.clearActiveOptions();
            // Now tell the program we haven't selected a type so it will go back.
            this.typeSelected = false;
            /* Now make the correct active type ... active after a VERY slight pause
             * to give the DOM time to reload the cards. */
            var vm = this;
            setTimeout(function() {
                var allTypeCards = document.getElementsByClassName("business-type");
                for(var card in allTypeCards) {
                    if(allTypeCards.hasOwnProperty(card)) {
                        if(allTypeCards[card].innerText.trim() == vm.selectedBusinessType) {
                            allTypeCards[card].classList.add("active");
                        }
                    }
                }
            }, 50);
        },
        pickBusinessType: function() {
            this.typeSelected = true;
        },
        // Called when you want to back out of the name creation
        resetBusinessName: function() {
            this.classSelected = false;
            var vm = this;
            setTimeout(function() {
                var allClassCards = document.getElementsByClassName("business-class");
                for(var card in allClassCards) {
                    if(allClassCards.hasOwnProperty(card)) {
                        if(allClassCards[card].innerText.trim() == vm.selectedBusinessClass) {
                            allClassCards[card].classList.add("active");
                        }
                    }
                }
            }, 50);
        },
        pickBusinessClass: function() {
            this.getNewBusinessName();
            /* The businessCost will be stored as a "money format" in businessCostAsMoney
             * because I do actual calculations with businessCost, so I can't
             * have that looking like money. */
            var temporaryBusinessCost = Business.calculateCost(this.selectedBusinessClass);
            this.businessCostAsMoney = Utils.formatNumberAsMoney(temporaryBusinessCost);
            this.businessCost = temporaryBusinessCost;
            // Now flag the page to go to the "name" section!
            this.classSelected = true;
        },
        buyBusiness: function() {
            if(Number(this.businessCost) < this.playerMoney) {
                // Update the database with the user's new business
                Database.db().ref("users/" + Database.currentUser().uid + "/businesses").push().update({
                    name: this.businessName,
                    type: this.selectedBusinessType,
                    class: this.selectedBusinessClass
                    // TODO: value: Business.calculateValue(this.selectedBusinessType, this.selectedBusinessClass)
                });
                // And take their money!
                Database.db().ref("users/" + Database.currentUser().uid).update({
                    money: (this.playerMoney - this.businessCost).toFixed(2)
                });
                // Let the user know we were successful in updating
                this.$toast.open({
                    message: this.businessName + ' purchased!',
                    type: 'is-success'
                });
                this.resetBusinessCreationProgress();
                // Redirect to a specified route
                Router.push({path:"/"});
            }
            else {
                // Let the user know we were successful in updating
                this.$toast.open({
                    message: "Couldn't afford " + this.businessName + "!",
                    type: "is-info"
                });
            }
        },
        getNewBusinessName: function() {
            var bizName = "";
            var oldBizName = this.businessName;
            if(this.selectedBusinessType) {
                bizName = Utils.randomElement(Business.model.type[this.selectedBusinessType].names);
                // Ensure we don't get a duplicate
                while(bizName === oldBizName) {
                    bizName = Utils.randomElement(Business.model.type[this.selectedBusinessType].names);
                }
            }
            this.businessName = bizName;
        }
    },
    data() {
        return {
            userBusinesses: '',
            businessTypes: Business.model.type,
            selectedBusinessType: '',
            typeSelected: false,
            businessClasses: Business.model.class,
            selectedBusinessClass: '',
            classSelected: false,
            businessName: '',
            playerMoney: '',
            businessCostAsMoney: '',
            businessCost: ''
        };
    }
}
</script>