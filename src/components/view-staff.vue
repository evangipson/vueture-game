<template>
    <section class="content columns">
        <div class="column is-12-mobile is-three-quarters-desktop">
            <h2>Staff Available</h2>
            <div v-for="(key, property) in availableStaff" class="card" v-on:click="hireStaff($event)">
                <div class="card-content">
                    <h4>Name: {{ key.name }}</h4>
                    <p>Favorite color: {{ key.portrait }}</p>
                    <p>Skills: {{ key.portrait }}</p>
                    <ul>
                        <li v-for="(key, skill) in key.skills">
                            {{skill}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import database from "../js/db";
import staff from "../js/staff";

export default {
    mounted: function() {
        var vm = this;
        var staffMember = {};
        database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff").on("value", function(snapshot) {
            vm.availableStaff = snapshot.val();
            if(!vm.availableStaff) {
                for(var i = 0; i < 5; i++) {
                    staffMember = staff();
                    database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/staff").push().update(staffMember);
                }
            }
        });
    },
    methods: {
        hireStaff(staff) {
            console.log(staff);
        }
    },
    data() {
        return {
            availableStaff: ''
        };
    }
}
</script>