import Vue from "vue";
import Router from "vue-router";
import axios from "axios";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/Dashborad",
      meta: {
        title: "Dashborad",
      },
    },
    {
      path: "/Dashborad",
      name: "Dashborad",
      meta: {
        title: "Dashborad",
      },
      component: () => import("@/views/Dashborad.vue"),
      children: [
        {
          path: "/Dashborad/Last24hours",
          name: "Last 24 hours",
          component: () => import("@/views/Dashborad/Last24hours.vue"),
        },
        {
          path: "/Dashborad/Nodes",
          name: "Nodes",
          component: () => import("@/views/Dashborad/Nodes.vue"),
        },
      ],
    },
    {
      path: "/Jobs",
      name: "Jobs",
      meta: {
        title: "Jobs",
      },
      component: () => import("@/views/Jobs.vue"),
      children: [
        {
          path: "/Jobs/Job/:id",
          name: "Job",
          component: () => import("@/views/Jobs/Job.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/Report",
      name: "Report",
      meta: {
        title: "Report",
      },
      component: () => import("@/views/Report.vue"),
    },
    {
      path: "/Setting",
      name: "Setting",
      meta: {
        title: "Setting",
      },
      component: () => import("@/views/Setting.vue"),
      children: [
        {
          path: "/Setting/System",
          name: "System",
          component: () => import("@/views/Setting/System.vue"),
        },
        {
          path: "/Setting/User",
          name: "User",
          component: () => import("@/views/Setting/User.vue"),
        },
        {
          path: "/Setting/Endpoint",
          name: "Endpoint",
          component: () => import("@/views/Setting/Endpoint.vue"),
        },
        {
          path: "/Setting/Node",
          name: "Node",
          component: () => import("@/views/Setting/Node.vue"),
        },
        {
          path: "/Setting/Notification",
          name: "Notification",
          component: () => import("@/views/Setting/Notification.vue"),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
  Vue.prototype.$http = axios;
  next();
});

export default router;
