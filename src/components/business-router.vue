<template>
    <section :ref="currentUserBusinessRef" v-if="userBusinesses" class="business">
        <owned-businesses></owned-businesses>
    </section>
    <section v-else class="business">
        <new-business></new-business>
    </section>
</template>

<script>
import OwnedBusinesses from "./owned-businesses.vue";
import NewBusiness from "./new-business.vue";

export default {
    components: { OwnedBusinesses, NewBusiness },
    computed: {
        currentUserBusinessRef: function() {
            var vm = this;
            database.firebaseInterface.db.ref("/users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
                vm.userBusinesses = snapshot.val();
            });
        }
    },
    data() {
        return {
            userBusinesses: '',
        };
    }
}
</script>