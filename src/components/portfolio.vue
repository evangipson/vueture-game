<template>
    <section class="content portfolio">
        <div v-if="selected.name" class="columns">
            <div class="column">
                <h2>Available <router-link to="/staff">Staff</router-link></h2>
                <div v-for="(key, property) in availableStaff" class="card staff-member" v-on:click="toggleActiveStaff($event, key)">
                    <div class="card-content">
                        <p>{{ key.name }}</p>
                        <p>{{ key.experience }}y / ${{ formatPrice(key.salary) }}</p>
                        <hr />
                        <p v-for="(key, skill) in key.skills">
                            {{skill}}
                        </p>
                    </div>
                </div>
                <div v-if="selectedStaff.name" class="submit-button">
                    <a class="button is-medium is-primary" v-on:click="hireStaff($event)">Hire {{selectedStaff.name.split(" ")[0]}} for {{selected.name}}</a>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <h2 v-if="userBusinesses.length > 0">Businesses Owned</h2>
                <h2 v-else>No Businesses Owned</h2>
                <b-table
                    :data="userBusinesses"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :mobile-cards="hasMobileCards"
                    :paginated="isPaginated"
                    :per-page="perPage"
                    :pagination-simple="isPaginationSimple"
                    :selected.sync="selected"
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

                        <b-table-column field="employees" label="Employees" sortable numeric>
                            {{ props.row.employees }}
                        </b-table-column>
                    </template>
                </b-table>
            </div>
        </div>
    </section>
</template>

<script>
import database from "../js/db";
import utils from "../js/utilities";

export default {
    mounted: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff").on("value", function(snapshot) {
            vm.availableStaff = snapshot.val();
        });
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
            // Turn userBusinesses into an array
            var databaseObj = snapshot.val();
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
            console.log(event);
            console.log(staff);
        },
        formatPrice: function(value) {
            let val = utils.formatNumberAsMoney(value);
            return val;
        },
        select: function(row) {
            this.selected = row;
        },
        hireStaff: function(event) {
            database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").push().update({
                name: this.businessName,
                type: this.selectedBusinessType,
                class: this.selectedBusinessClass
                // TODO: value: business.calculateValue(this.selectedBusinessType, this.selectedBusinessClass)
            });
            console.log("I'd be buying " + this.selectedStaff.name + " and placing them at " + this.selected.name + " right now!");
        }
    },
    data() {
        return {
            userBusinesses: [],
            selected: {},
            isBordered: false,
            isStriped: true,
            isNarrowed: false,
            hasMobileCards: true,
            isPaginated: true,
            isPaginationSimple: true,
            perPage: 10,
            availableStaff: '',
            selectedStaff: {}
        };
    }
}
</script>