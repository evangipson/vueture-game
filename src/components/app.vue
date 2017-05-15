<template>
    <div id="app">
        <navigation :authenticated="authenticated"></navigation>
        <router-view></router-view>
    </div>
</template>
<!-- Set up our export -->
<script>
import Navigation from "./navigation.vue"
import database from "../js/db"
export default {
  props: ["authenticated"],
  components: { Navigation },
  computed: {
        authenticated: {
            get: function() {
                return database.currentUser() == null ? false : true;
            }
        }
  },
  data () {
    return {
    }
  }
}
</script>