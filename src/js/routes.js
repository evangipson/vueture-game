import Vue from "vue";
import VueRouter from "vue-router";
import database from "./db";

// 0. Announce to vue we are using vue-router to handle routes
Vue.use(VueRouter);

// 1. Define route components
// These can be imported from other files
import DashboardView from "../components/dashboard.vue";
import LoginView from "../components/login.vue";
import StatsView from "../components/stats.vue";
import ProfileView from "../components/profile.vue";
import NewBusinessView from "../components/new-business.vue";

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
// Route will need loggedInOnly if authentication is required.
const routes = [
    {
        path: '/',
        component: DashboardView,
        // Meta properties set up per the documentation here: https://router.vuejs.org/en/advanced/meta.html
        meta: { loggedInOnly: true }
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/stats',
        component: StatsView,
        meta: { loggedInOnly: true }
    },
    {
        path: '/profile',
        component: ProfileView,
        meta: { loggedInOnly: true }
    },
    {
        path: '/new-business',
        component: NewBusinessView,
        meta: { loggedInOnly: true }
    }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter({
    routes
});

// 4. Augment router with any custom routing logic
router.beforeEach((to, from, next) => {
    // Access our meta property from the route
    if (to.matched.some(record => record.meta.loggedInOnly) && database.currentUser() === null) {
        next("/login");
    }
    // TODO: Investigate why I need this and the line in login.vue
    // router.go("/")-ing me.
    else if(to.path == "/login" && database.currentUser()) {
        next("/");
    }
    else {
        next();
    }
});

export default router;