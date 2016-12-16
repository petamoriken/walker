import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    //mode: "history",
    routes: [{
        path: "/",
        component: require("../components/game.vue")
    }, {
        path: "/tutorial",
        component: require("../components/tutorial.vue")
    }]
});

const vue = new Vue({
    el: "#app",
    router
});

const tutorialCompleted = localStorage.getItem("tutorial");

if(!tutorialCompleted) {
    window.vue = vue;
}