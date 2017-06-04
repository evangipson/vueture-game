import Vue from "vue";
import VueRouter from "vue-router";
import * as Database from "./db";

// 0. Announce to vue we are using vue-router to handle routes
Vue.use(VueRouter);

// 1. Define route components
// These can be imported from other files
import AboutView from "../components/about.vue";
import DashboardView from "../components/dashboard.vue";
import LoginView from "../components/login.vue";
import NewBusinessView from "../components/new-business.vue";
import PortfolioView from "../components/portfolio.vue";
import ProfileView from "../components/profile.vue";
import RegisterView from "../components/register.vue";
import StaffView from "../components/staff.vue";
import StatsView from "../components/stats.vue";

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
// Route will need loggedInOnly if authentication is required.
const routes: any = [
    {
        path: "/",
        component: DashboardView,
        // Meta properties set up per the documentation here: https://router.vuejs.org/en/advanced/meta.html
        meta: { loggedInOnly: true }
    },
    {
        path: "/login",
        component: LoginView,
    },
    {
        path: "/about",
        component: AboutView,
    },
    {
        path: "/register",
        component: RegisterView,
    },
    {
        path: "/stats",
        component: StatsView,
        meta: { loggedInOnly: true },
    },
    {
        path: "/profile",
        component: ProfileView,
        meta: { loggedInOnly: true },
    },
    {
        path: "/new-business",
        component: NewBusinessView,
        meta: { loggedInOnly: true },
    },
    {
        path: "/portfolio",
        component: PortfolioView,
        meta: { loggedInOnly: true },
    },
    {
        path: "/staff",
        component: StaffView,
        meta: { loggedInOnly: true },
    },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
let router = new VueRouter({
    routes,
});

// 4. Augment router with any custom routing logic
router.beforeEach((to, from, next) => {
    // Access our meta property from the route
    if (to.matched.some((record) => record.meta.loggedInOnly) && Database.currentUser() === null) {
        next("/login");
    }
    // TODO: Investigate why I need this and the line in login.vue
    // router.go("/")-ing me.
    else if (to.path === "/login" && Database.currentUser()) {
        next("/");
    }
    else {
        next();
    }
});

// 5. After the router loads up the router, define custom logic.
router.afterEach((to, from) => {
    // Scroll the user to the topmost, leftmost point before each route.
    window.scrollTo(0, 0);
});

export default router;