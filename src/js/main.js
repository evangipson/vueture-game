import Vue from "vue"
import router from "./routes"
import Navigation from "../components/navigation.vue"
import App from "../components/app.vue"

// Register our components
Vue.component("navigation", {template: Navigation});

// Create a story as soon as we have
// the DOMContentLoaded event fire off.
document.addEventListener("DOMContentLoaded", function() {
    // Make sure to inject the router with the router option to make the
    // whole app router-aware.
    const app = new Vue({
        el: "#app",
        router,
        render: h => h(App)
    }).$mount('#app');
});