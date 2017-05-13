<template>
    <section class="content columns">
        <div class="business column">
            <!-- The last menu in business creation -->
            <div v-if="typeSelected && classSelected">
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
                    </div>
                    <footer class="card-footer">
                        <a class="card-footer-item is-enabled" v-on:click="buyBusiness()">Start Business</a>
                        <a class="card-footer-item is-enabled" v-on:click="getNewBusinessName()">Rename Business</a>
                    </footer>
                </div>
                <div v-if="selectedBusinessType" class="submit-button">
                    <a class="button is-medium is-primary" v-on:click="resetBusinessName()">Reslect Business Class</a>
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
import business from "../js/business";
import database from "../js/db";
import utils from "../js/utilities";
import router from "../js/routes";

// List all types of business cards used for our clearActiveOptions function.
var businessCardTypes = [ "business-type", "business-class" ];

export default {
    mounted: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
            vm.userBusinesses = snapshot.val();
        });
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
                        if(allTypeCards[card].innerText == vm.selectedBusinessType) {
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
        },
        pickBusinessClass: function() {
            this.getNewBusinessName();
            this.classSelected = true;
        },
        buyBusiness: function() {
            database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").push().update({
                name: this.businessName,
                type: this.selectedBusinessType,
                class: this.selectedBusinessClass
            });
            // Let the user know we were successful in updating
            this.$toast.open({
                message: this.businessName + ' purchased!',
                type: 'is-success'
            });
            this.resetBusinessCreationProgress();
            // Redirect to a specified route
            router.push({path:"/"});
        },
        getNewBusinessName: function() {
            var bizName = "";
            if(this.selectedBusinessType) {
                bizName = utils.randomElement(business.model.type[this.selectedBusinessType].names);
            }
            this.businessName = bizName;
        }
    },
    data() {
        return {
            userBusinesses: '',
            businessTypes: business.model.type,
            selectedBusinessType: '',
            typeSelected: false,
            businessClasses: business.model.class,
            selectedBusinessClass: '',
            classSelected: false,
            businessName: ''
        };
    }
}
</script>