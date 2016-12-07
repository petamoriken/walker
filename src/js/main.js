import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };

const router = new VueRouter({
    //mode: "history",
    routes: [
        { path: "/foo", component: Foo },
        { path: "/bar", component: Bar },
        { path: "/slave", component: require("../components/slave.vue") }
    ]
});

new Vue({
    el: "#app",
    router
});