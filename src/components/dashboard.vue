<template>
    <div>
        <hero></hero>
        <div class="container content">
            <div class="columns">
                <div class="column">
                    <business></business>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Hero from "./hero.vue"
import Business from "./business.vue"

export default {
  components: { Hero, Business },
  data() {
    return {
    }
  }
}
</script>