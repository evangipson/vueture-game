<template>
    <section class="content portfolio">
        <div v-if="selected.employees > 0" class="columns">
            <div class="column">
                <h2>Available <router-link to="/staff">Staff</router-link></h2>
                <div v-for="(key, property) in availableStaff" class="card staff-member">
                    <div class="card-content">
                        <p>{{ key.name }}</p>
                        <p>{{ key.experience }}y / ${{ formatPrice(key.salary) }}</p>
                        <hr />
                        <p v-for="(key, skill) in key.skills">
                            {{skill}}
                        </p>
                    </div>
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

                        <b-table-column field="employees" label="Employees" sortable numeric
                            v-html="parseInt(employeeCount(props.row.staff))">
                        </b-table-column>
                    </template>
                </b-table>
            </div>
        </div>
    </section>
</template>

<script>
import * as Database from "../ts/db";
import * as Utils from "../ts/utilities";

export default {
    mounted: function() {
        var vm = this;
        Database.db().ref("users/" + Database.currentUser().uid + "/businesses").on("value", function(snapshot) {
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
        formatPrice: function(value) {
            let val = Utils.formatNumberAsMoney(value);
            return val;
        },
        select: function(row) {
            this.selected = row;
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