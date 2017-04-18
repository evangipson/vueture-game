import Vue from "vue"
import VueRouter from "vue-router"
import database from "./db"

// 0. Announce to vue we are using vue-router to handle routes.
Vue.use(VueRouter);

// 1. Define route components.
// These can be imported from other files
const HomeView = () => System.import('../components/home.vue');
const LoginView = () => System.import('../components/login.vue');
const StatsView = () => System.import('../components/stats.vue');

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
// Route will need loggedInOnly if authentication is required.
const routes = [
    {
        path: '/',
        component: HomeView,
        // Meta properties set up per the documentation here: https://router.vuejs.org/en/advanced/meta.html
        meta: {loggedInOnly: true }
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/stats',
        component: StatsView,
        meta: {loggedInOnly: true }
    }
];
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    // Access our meta property from the route
    if (to.matched.some(record => record.meta.loggedInOnly) && database.currentUser() == null) {
        next("/login");
    }
    else {
        next();
    }
});

export default router;