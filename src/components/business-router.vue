<template>
    <section class="business content columns">
        <owned-businesses></owned-businesses>
        <new-business></new-business>
    </section>
</template>

<script>
import OwnedBusinesses from "./owned-businesses.vue";
import NewBusiness from "./new-business.vue";
import database from "../js/db";

export default {
    components: { OwnedBusinesses, NewBusiness },
    data() {
        return {
            userBusinesses: function() {
                var vm = this;
                database.firebaseInterface.db.ref("users/" + database.currentUser().uid + "/businesses").on("value", function(snapshot) {
                    if(snapshot.val() != null) {
                        return true;
                    }
                    return false;
                });
            }
        };
    }
}
</script>