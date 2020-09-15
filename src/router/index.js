import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/circleDetails",
    name: "circleDetails",
    component: () => import("../views/circleDetails.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/writeArticle",
    name: "writeArticle",
    component: () => import("../views/writeArticle.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "",
  routes
});

export default router;
