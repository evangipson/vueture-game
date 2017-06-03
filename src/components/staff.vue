<template>
    <section class="staff content columns">
        <!-- User has selected staff member to interview, show businesses! -->
        <div class="column" v-if="availableStaff && staffInterview">
            <h2>Where should {{selectedStaff.name.split(" ")[0]}} work?</h2>
            <div class="columns">
                <div class="column is-one-quarter-desktop">
                    <div style="display: inline-block" class="card">
                        <div class="card-content">
                            <h3>{{ selectedStaff.name }}</h3>
                            <p>Expected Salary: ${{ formatPrice(selectedStaff.salary) }}</p>
                            <p>Year(s) experience: {{ selectedStaff.experience }}</p>
                            <p style="color: white" :style="{ background: selectedStaff.portrait }">Favorite color: {{ selectedStaff.portrait }}</p>
                            <hr />
                            <p><b>Skills:</b></p>
                            <p v-for="(key, skill) in selectedStaff.skills">
                                {{skill}}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="column is-three-quarters-desktop">
                    <b-table
                        :data="userBusinesses"
                        :bordered="isBordered"
                        :striped="isStriped"
                        :narrowed="isNarrowed"
                        :mobile-cards="hasMobileCards"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :pagination-simple="isPaginationSimple"
                        :selected.sync="selectedBusiness"
                        @click="select($event)"
                        class="business-table">
                        <template scope="props">
                            <b-table-column field="name" label="Name" sortable>
                                {{ props.row.name }}
                            </b-table-column>

                            <b-table-column field="type" label="Type" sortable>
                                {{ props.row.type }}
                            </b-table-column>

                            <b-table-column field="class" label="Class" sortable>
                                {{ props.row.class }}
                            </b-table-column>

                            <b-table-column field="employees" label="Employees" sortable numeric
                                v-html="parseInt(employeeCount(props.row.staff))">
                            </b-table-column>
                        </template>
                    </b-table>
                </div>
            </div>
            <div v-if="selectedBusiness.name" class="submit-button">
                <a class="button is-primary" v-on:click="hireStaffAtBusiness($event)">Send {{ selectedStaff.name.split(" ")[0] }} to interview at {{ selectedBusiness.name }}</a>
            </div>
            <div class="submit-button">
                <a class="button is-medium is-primary" v-on:click="takebackInterview()">Interview Another Candidate</a>
            </div>
        </div>
        <!-- We have some staff, let's allow the user to interview them. -->
        <div class="column" v-else-if="availableStaff">
            <h2>Interview Candidates</h2>
            <div v-for="(key, property) in availableStaff" class="card staff-member" v-on:click="toggleActiveStaff($event, key)">
                <div class="card-content">
                    <h3>{{ key.name }}</h3>
                    <p>Expected Salary: ${{ formatPrice(key.salary) }}</p>
                    <p>Year(s) experience: {{ key.experience }}</p>
                    <div v-if="key.favoriteJob.length > 1">
                        <p><b>Favorite Businesses:</b></p>
                        <p v-for="favoriteJob in key.favoriteJob">{{ favoriteJob }}</p>
                    </div>
                    <p v-else><b>Favorite Business:</b> {{ key.favoriteJob[0] }}</p>
                    <p style="color: white; margin-top: 1rem;" :style="{ background: key.portrait }">Favorite color: {{ key.portrait }}</p>
                    <hr />
                    <p><b>Skills:</b></p>
                    <p v-for="(key, skill) in key.skills">
                        {{skill}}
                    </p>
                </div>
            </div>
            <div v-if="selectedStaff.name" class="submit-button">
                <a class="button is-medium is-primary" v-on:click="interviewStaff($event)">Interview {{ selectedStaff.name.split(" ")[0] }}</a>
            </div>
            <div class="submit-button">
                <a class="button is-medium is-primary" v-on:click="generateStaff()">Generate New Staff</a>
            </div>
        </div>
        <!-- We don't have any staff! -->
        <div class="column" v-else>
            <h2>No Staff Available</h2>
            <div class="submit-button">
                <a class="button is-medium is-primary" v-on:click="generateStaff()">Generate New Staff</a>
            </div>
        </div>
    </section>
</template>

<script>
import database from "../js/db";
import router from "../js/routes";
import * as Staff from "../ts/staff";
import * as Utils from "../ts/utilities";

export default {
    mounted: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff").on("value", function(snapshot) {
            vm.availableStaff = snapshot.val();
        });
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
            // Turn userBusinesses into an array
            var databaseObj = snapshot.val();
            // Save our businesses for later use
            vm.availableBusinesses = databaseObj;
            var returnArray = [];
            for(var business in databaseObj) {
                if(databaseObj.hasOwnProperty(business)) {
                    returnArray.push(databaseObj[business]);
                }
            }
            vm.userBusinesses = returnArray;
        });
    },
    methods: {
        // Clears all "active" classes on all staff cards.
        clearActiveOptions: function() {
            var staffCards = document.getElementsByClassName("staff-member");
            for(var card in staffCards) {
                if(staffCards.hasOwnProperty(card)) {
                    staffCards[card].classList.remove("active");
                }
            }
        },
        toggleActiveStaff: function(event, staff) {
            this.clearActiveOptions();
            this.selectedStaff = staff;
            event.currentTarget.classList.add("active");
        },
        // List the businesses so we can interview the staff!
        interviewStaff: function() {
            this.staffInterview = true;
        },
        // Go back to the "staff hiring" page
        takebackInterview: function() {
            this.selectedBusiness = {};
            this.selectedStaff = "";
            this.staffInterview = false;
        },
        hireStaffAtBusiness: function() {
            // Find out which business and staff we have to update in the database
            var businessKey = "";
            var staffKey = "";
            for(var business in this.availableBusinesses) {
                if(this.availableBusinesses[business].name === this.selectedBusiness.name) {
                    businessKey = business;
                }
            }
            for(var staff in this.availableStaff) {
                if(this.availableStaff[staff].name === this.selectedStaff.name) {
                    staffKey = staff;
                }
            }
            if(businessKey !== "" && staffKey !== "") {
                // Add the staff member to the businesses section of the user
                database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses/" + businessKey + "/staff").push().update(this.selectedStaff);
                // remove the staff that was hired
                database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff/" + staffKey).remove();
                // Let the user know we were successful in updating
                this.$toast.open({
                    message: "Hired " + this.selectedStaff.name.split(" ")[0] + " at " + this.selectedBusiness.name + "!",
                    type: "is-info"
                });
                // Redirect to a specified route
                router.push({path:"/"});
            }
            else {
                console.log("There was an error hiring the employee!");
            }
        },
        formatPrice: function(value) {
            let val = Utils.formatNumberAsMoney(value);
            return val;
        },
        select: function(row) {
            this.selectedBusiness = row;
        },
        generateStaff: function() {
            var staffMember = {};
            if(!this.availableStaff) {
                for(var i = 0; i < 5; i++) {
                    staffMember = Staff.createStaff();
                    database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff").push().update(staffMember);
                }
            }
            else {
                this.availableStaff = "";
                this.selectedStaff = "";
                this.clearActiveOptions();
                database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff").remove();
                // WHACHYA SAY- WHACHYA SAY- WHACHYA SAY- WHAT!!!
                this.generateStaff();
            }
        },
        employeeCount: function(staffObj) {
            var returnArray = [];
            if(staffObj) {
                for(var staff in staffObj) {
                    if(staffObj.hasOwnProperty(staff)) {
                        returnArray.push(staffObj[staff]);
                    }
                }
            }
            return returnArray.length;
        }
    },
    data() {
        return {
            userBusinesses: [],
            selectedBusiness: {},
            isBordered: false,
            isStriped: true,
            isNarrowed: false,
            hasMobileCards: true,
            isPaginated: true,
            isPaginationSimple: true,
            perPage: 5,
            availableStaff: '',
            availableBusinesses: '',
            staffInterview: '',
            selectedStaff: ''
        };
    }
}
</script>