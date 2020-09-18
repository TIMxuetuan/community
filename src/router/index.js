import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
var outerPre = "";
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
    // path: "/About",
    path: `${outerPre}/About`,
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    // path: "/circleDetails",
    path: `${outerPre}/circleDetails`,
    name: "circleDetails",
    component: () => import("../views/circleDetails.vue")
  },
  {
    // path: "/login",
    path: `${outerPre}/circleLogin`,
    name: "circleLogin",
    component: () => import("../views/login.vue")
  },
  {
    // path: "/writeArticle",
    path: `${outerPre}/writeArticle`,
    name: "writeArticle",
    component: () => import("../views/writeArticle.vue")
  },
  {
    // path: "/myArticle",
    path: `${outerPre}/myArticle`,
    name: "myArticle",
    component: () => import("../views/myArticle.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "bbs", //打包时需要解开
  routes
});

export default router;
