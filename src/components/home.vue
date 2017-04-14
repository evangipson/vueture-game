<template>
    <section class="section">
        <div class="container content">
            <div class="heading">
                <h1 class="title">
                    Home Page
                </h1>
                <h2 class="subtitle">
                    Realtime Multiplayer Business Simulation
                </h2>
            </div>
            <p><b><em>In the future</em></b>, you shouldn't be seeing this page unless you are logged in!</p>
        </div>
        <random-number></random-number>
    </section>
</template>

<script>
import RandomNumber from "./random-number.vue"
export default {
  components: { RandomNumber },
  data () {
    return {
    }
  }
}
</script>