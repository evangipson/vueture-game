<template>
    <div>
        <hero></hero>
        <div class="container content">
            <div class="columns">
                <div class="column">
                    <business-router></business-router>
                </div>
            </div>
        </div>
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