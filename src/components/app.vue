<template>
    <div>
        <navigation></navigation>
        <div id="app">
            <hero></hero>
            <router-view></router-view>
        </div>
    </div>
</template>
<!-- Set up our export -->
<script>
import Navigation from "./navigation.vue"
import Hero from "./hero.vue"
export default {
  components: { Navigation, Hero },
  data () {
    return {
    }
  }
}
</script>