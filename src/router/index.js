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
  },
  {
    // path: "/myArticle",
    path: `${outerPre}/adminPostType`,
    name: "adminPostType",
    component: () => import("../views/adminPostType.vue")
  },
  {
    // path: "/myArticle",
    path: `${outerPre}/adminCircle`,
    name: "adminCircle",
    component: () => import("../views/adminCircle.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "bbs", //打包时需要解开
  routes
});

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 在此判断是否含有权限 或者是否用户一登录 否则跳转登录
  let communityToken = localStorage.getItem("communityToken") || "";
  console.log(communityToken);
  let timeOut = "";
  if (communityToken != null && communityToken != "") {
    timeOut = JSON.parse(communityToken).startTime + 1800000;
  } else {
    timeOut = 0;
  }
  console.log(timeOut < Date.now());
  if (timeOut < Date.now() && to.path.indexOf("circleLogin") == -1) {
    // this.$message({
    //   message: "已过期，请重新登录",
    //   offset: 100,
    //   showClose: true,
    //   type: "error"
    // });
    next("circleLogin");
    return;
  }
  // if (to.fullPath.indexOf("http://") > -1) {
  //   console.log(to.path.substr(to.path.indexOf("http://")));
  //   window.location.href = to.path.substr(to.path.indexOf("http://"));
  //   return;
  // }

  // if (
  //   localStorage.getItem("timeout") < Date.now() &&
  //   to.path.indexOf("login") == -1
  // ) {
  //   next("/login");
  //   return;
  // }
  // console.log(store.state.global.userInfo);
  next();
});

export default router;
