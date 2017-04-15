import Vue from "vue"
import VueRouter from "vue-router"

// 0. Announce to vue we are using vue-router to handle routes.
Vue.use(VueRouter);

// 1. Define route components.
// These can be imported from other files
const HomeView = () => System.import('../components/home.vue');
const LoginView = () => System.import('../components/login.vue');
const BarView = () => System.import('../components/bar.vue');

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/bar', component: BarView }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default new VueRouter({
    routes
});