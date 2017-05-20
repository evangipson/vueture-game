<template>
    <section class="staff content columns">
        <div class="column">
            <div v-if="availableStaff">
                <h2>Staff For Hire</h2>
                <div v-for="(key, property) in availableStaff" class="card staff-member" v-on:click="hireStaff($event)">
                    <div class="card-content">
                        <h3>{{ key.name }}</h3>
                        <p>Expected Salary: ${{ formatPrice(key.salary) }}</p>
                        <p>Year(s) experience: {{ key.experience }}</p>
                        <p>Favorite color: {{ key.portrait }}</p>
                        <hr />
                        <p><b>Skills:</b></p>
                        <p v-for="(key, skill) in key.skills">
                            {{skill}}
                        </p>
                    </div>
                </div>
            </div>
            <div v-else>
                <h2>No Staff Available</h2>
            </div>
            <div class="submit-button">
                <a class="button is-medium is-primary" v-on:click="generateStaff()">Generate New Staff</a>
            </div>
        </div>
    </section>
</template>

<script>
import database from "../js/db";
import staff from "../js/staff";
import utils from "../js/utilities";

export default {
    mounted: function() {
        var vm = this;
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff").on("value", function(snapshot) {
            vm.availableStaff = snapshot.val();
        });
    },
    methods: {
        hireStaff: function(staff) {
            console.log(staff);
        },
        formatPrice: function(value) {
            let val = utils.formatNumberAsMoney(value);
            return val;
        },
        generateStaff: function() {
            var staffMember = {};
            if(!this.availableStaff) {
                for(var i = 0; i < 10; i++) {
                    staffMember = staff.createStaff();
                    database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff").push().update(staffMember);
                }
            }
            else {
                // Let the user know we were successful in updating
                this.$toast.open({
                    message: "Hire someone before generating more staff!",
                    type: "is-info"
                });
            }
        }
    },
    data() {
        return {
            availableStaff: ''
        };
    }
}
</script>