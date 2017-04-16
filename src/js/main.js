import Vue from "vue"
import router from "./routes"
import App from "../components/app.vue"
import Buefy from "buefy"
import database from "./db"

// Link buefy so we can use those beufytul components
Vue.use(Buefy);
// Link up firebase using our config and callbacks
database.fireInit(fireStatus);

function fireStatus(loggedIn) {
    // Make sure to inject the router with the router option to make the
    // whole app router-aware.
    const app = new Vue({
        el: "#app",
        router,
        render: h => h(App)
    }).$mount('#app');
}