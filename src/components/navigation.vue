<template>
    <nav class="nav is-mobile">
        <div class="nav-left">
            <router-link class="nav-item button is-large is-dark is-outlined" to='/'>
                <i class="material-icons md-32">fiber_smart_record</i> Veuture 
            </router-link>
        </div>
        <div class="nav-right">
            <!-- use router-link component for navigation. -->
            <!-- specify the link by passing the `to` prop. -->
            <!-- <router-link> will be rendered as an `<a>` tag by default -->
            <router-link class="nav-item button is-large is-dark" to="/foo">Foo</router-link>
            <router-link class="nav-item button is-large is-dark" to="/bar">Bar</router-link>
        </div>
    </nav>
</template>
<!-- Set up our export -->
<script>
export default {
  data () {
    return {
    }
  }
}
</script>