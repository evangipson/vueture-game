<template>
    <nav class="nav is-info has-shadow">
        <div class="nav-left">
            <router-link class="nav-item button is-large is-info is-outlined" to='/' exact>
                <i class="material-icons md-32">fiber_smart_record</i> Vueture 
            </router-link>
        </div>
        <!-- Hamburger Menu for mobile -->
        <span id="nav-toggle" onclick="document.getElementById('nav-toggle').classList.toggle('is-active');document.getElementById('nav-menu').classList.toggle('is-active')" class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </span>
        <div id="nav-menu" class="nav-right nav-menu">
            <router-link active-class="is-active" class="nav-item is-tab is-large" to="/" exact>Home</router-link>
            <router-link active-class="is-active" class="nav-item is-tab is-large" to="/foo">Foo</router-link>
            <router-link active-class="is-active" class="nav-item is-tab is-large" to="/bar">Bar</router-link>
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