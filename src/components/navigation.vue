<template>
    <div>
        <h1><router-link to='/'>Vueture</router-link></h1>
        <h3>Your random number is <em>{{randomNumber}}</em>!</h3>
        <nav>
            <p>
                <!-- use router-link component for navigation. -->
                <!-- specify the link by passing the `to` prop. -->
                <!-- <router-link> will be rendered as an `<a>` tag by default -->
                <router-link to="/foo">Go to Foo</router-link>
                <router-link to="/bar">Go to Bar</router-link>
            </p>
        </nav>
    </div>
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