<template>
    <div>
        <hero></hero>
        <business-router></business-router>
    </div>
</template>

<script>
import Hero from "./hero.vue"
import BusinessRouter from "./business-router.vue"

export default {
  components: { Hero, BusinessRouter },
  data() {
    return {
    }
  }
}
</script>