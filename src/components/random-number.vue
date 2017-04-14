<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Random Number Generator
        </h1>
        <h2 class="subtitle">
            Your random number is... <em><strong>{{randomNumber}}</strong></em>!
        </h2>
      </div>
    </div>
  </section>
</template>

<!-- Set up our export -->
<script>
import utils from "../js/utilities"
function generateLargeRandomNumber() {
    return utils.random(-1383574.1,13135030);
};
export default {
  data () {
    return {
      randomNumber: generateLargeRandomNumber()
    }
  }
}
</script>