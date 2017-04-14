<template>
    <div id="app">
        <navigation></navigation>
        <router-view></router-view>
    </div>
</template>
<!-- Set up our export -->
<script>
import Navigation from './navigation.vue'
export default {
  components: { Navigation },
  data () {
    return {
    }
  }
}
</script>