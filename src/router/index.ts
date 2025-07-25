// 管理路由
import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false });
// 导入 layout
import layout from "@/views/layout/index.vue";
let router = createRouter({
  // 设置路由模式
  history: createWebHistory(),

  // 设置路由对象
  routes: [
    {
      path: "/",

      component: layout,
      redirect: "/home", // 根路径重定向到 /home
      children: [
        { path: "/home", component: () => import("@/views/home/index.vue") },
        { path: "/mint", component: () => import("@/views/Mint/index.vue") },
        {
          path: "/shop",
          component: () => import("@/views/shopping/index.vue"),
        },
        {
          path: "/nft",
          component: () => import("@/views/nft/index.vue"),
        },
        {
          path: "/nft/detail",
          component: () => import("@/views/nft/nftdetail.vue"),
        },
        { path: "/new", component: () => import("@/views/shopping/New.vue") },
        {
          path: "/newDetail",
          component: () => import("@/views/shopping/newDetail.vue"),
        },
        {
          path: "/newBuy",
          component: () => import("@/views/shopping/newBuy.vue"),
        },
        {
          path: "/hotEvent",
          component: () => import("@/views/shopping/hotEvent.vue"),
        },
        {
          path: "/eventDetail",
          component: () => import("@/views/shopping/eventDetail.vue"),
        },
        {
          path: "/hotMovie",
          component: () => import("@/views/shopping/hotMovie.vue"),
        },
        { path: "/ai", component: () => import("@/views/ai/index.vue") },
        { path: "/ai/vote", component: () => import("@/views/ai/vote.vue") },
        {
          path: "/aidetail",
          component: () => import("@/views/ai/aidetail.vue"),
        },
        { path: "/my", component: () => import("@/views/my/index.vue") },
        { path: "/my/order", component: () => import("@/views/my/Order.vue") },
        {
          path: "/my/protocol",
          component: () => import("@/views/my/UserAgreement.vue"),
        },
        {
          path: "/my/Activities",
          component: () => import("@/views/my/Activities.vue"),
        },
        // {
        //   path: "/collection",
        //   component: () => import("@/views/collection/index.vue"),
        // },
        {
          path: "/casting",
          component: () => import("@/casting.vue"),
        },
      ],
    },
  ],
});

// 在路由切换前显示进度条
router.beforeEach((to, from, next) => {
  NProgress.start(); //进度条开始
  next();
});

// 在路由切换后结束进度条
router.afterEach(() => {
  NProgress.done(); //进度条结束
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // 平滑滚动
  });
});

// 暴露路由对象
export default router;
