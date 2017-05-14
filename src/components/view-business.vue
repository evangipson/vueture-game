<template>
    <section class="content columns">
        <div v-if="userBusinesses" class="column">
            <b-table
                :data="userBusinesses"
                :bordered="isBordered"
                :striped="isStriped"
                :narrowed="isNarrowed"
                :checkable="isCheckable"
                :mobile-cards="hasMobileCards"
                :paginated="isPaginated"
                :per-page="perPage"
                :pagination-simple="isPaginationSimple"
                :selected.sync="selected" />
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
            console.log(returnArray);
            vm.userBusinesses = returnArray;
        });
    },
    data() {
        return {
            userBusinesses: '',
            selected: {},
            isBordered: false,
            isStriped: true,
            isNarrowed: false,
            isCheckable: false,
            hasMobileCards: true,
            isPaginated: true,
            isPaginationSimple: true,
            perPage: 10
        };
    }
}
</script>