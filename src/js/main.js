import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    //mode: "history",
    routes: [
        { path: "/slave", component: require("../components/slave.vue") }
    ]
});

new Vue({
    el: "#app",
    router
});