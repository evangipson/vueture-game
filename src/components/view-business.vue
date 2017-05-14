<template>
    <section class="content columns">
        <div class="column is-12-mobile is-three-quarters-desktop">
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
                @click="select($event)">
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
                </template>
            </b-table>
        </div>
        <div class="column">
            <h3 class="subtitle">Selected</h3>
            <pre class="content">{{ selected }}</pre>
        </div>
    </section>
</template>

<script>
import database from "../js/db";

export default {
    mounted: function() {
        var vm = this;
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
        select: function(row) {
            this.selected = row;
        },
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
            perPage: 10
        };
    }
}
</script>