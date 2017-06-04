<template>
    <section class="hero is-primary is-bold">
        <div class="hero-body">
            <div class="container content">
                <h1 class="title is-spaced">
                    Vueture <span class="tiny-title">Realtime Multiplayer Business Simulation</span>
                </h1>
                <h2 class="subtitle">
                    Welcome back, {{currentUserName}}.
                </h2>
            </div>
        </div>
    </section>
</template>

<!-- Set up our export -->
<script>
import * as Database from "../ts/db";

export default {
    mounted: function() {
        var vm = this;
        Database.db().ref("users/" + Database.currentUser().uid + "/name").on("value", function(snapshot) {
            var oldUserName = vm.currentUserName;
            vm.currentUserName = snapshot.val().length > 0 ? snapshot.val() : oldUserName;
        });
    },
    data () {
        return {
            user: Database.currentUser(),
            currentUserName: Database.currentUser().email,
        };
    }
}
</script>

<style scoped>
.tiny-title {
    font-size: 1.2rem;
    font-weight: 300;
    position: relative;
    margin-left: 0.5rem;
    top: -0.15rem;
}
</style>