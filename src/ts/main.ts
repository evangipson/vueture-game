import Buefy from "buefy";
import Vue from "vue";
import App from "../components/app.vue";
import * as Database from "./db";
import Router from "./routes";

// Link buefy so we can use those beufytul components
Vue.use(Buefy);
// Link up firebase using our config and callbacks
Database.fireInit(fireStatus);

function fireStatus(loggedIn): void {
    // Make sure to inject the router with the router option to make the
    // whole app router-aware.
    new Vue({
        el: "#app",
        router: Router,
        render: (h) => h(App),
    }).$mount("#app");
}