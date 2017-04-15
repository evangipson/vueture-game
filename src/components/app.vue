<template>
    <div>
        <navigation></navigation>
        <div id="app">
            <router-view></router-view>
        </div>
    </div>
</template>
<!-- Set up our export -->
<script>
import Navigation from "./navigation.vue"
export default {
  components: { Navigation },
  data () {
    return {
    }
  }
}
</script>