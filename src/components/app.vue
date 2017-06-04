<template>
    <div id="app">
        <navigation :authenticated="authenticated"></navigation>
        <router-view></router-view>
    </div>
</template>
<!-- Set up our export -->
<script>
import Navigation from "./navigation.vue";
import * as Database from "../ts/db";

export default {
  props: ["authenticated"],
  components: { Navigation },
  computed: {
        authenticated: {
            get: function() {
                return Database.currentUser() == null ? false : true;
            }
        }
  },
  data () {
    return {
    };
  }
}
</script>