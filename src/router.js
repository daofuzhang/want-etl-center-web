import Vue from "vue";
import Router from "vue-router";
import axios from "axios";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/Home",
    },
    {
      path: "/Home",
      name: "Home",
      redirect: "/Dashborad",
      meta: {
        title: "Home",
      },
      component: () => import("@/views/Home.vue"),
      children: [
        {
          path: "/Dashborad",
          name: "Dashborad",
          redirect: "/Dashborad/Last24hours",
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
          path: "/Report/History",
          name: "History",
          meta: {
            title: "History",
          },
          component: () => import("@/views/Report/History.vue"),
          props: true,
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
    },
    {
      path: "/Login",
      name: "Login",
      meta: {
        title: "Login",
      },
      component: () => import("@/views/Login.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authorization = localStorage.getItem("authorization");
  if (process.env.NODE_ENV === "docker" || !process.env.VUE_APP_API_BASE_URL) {
    let protocol = window.location.protocol;
    let hostname = window.location.hostname;
    let url = protocol + "//" + hostname + ":9600/want-etl-center/";
    axios.defaults.baseURL = url;
  } else {
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
  }
  axios.defaults.headers.authorization = authorization;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error && error.response) {
        switch (error.response.status) {
          case 403:
            console.log("權限不足");
            break;
          case 404:
            console.log("找不到該頁面");
            break;
          case 500:
            console.log("伺服器出錯");
            break;
          case 503:
            console.log("服務失效");
            break;
          default:
            console.log(`連接錯誤${error.response.status}`);
        }
      } else {
        console.log("連接到服務器失敗");
      }
      next({ path: "/Login" });
      return Promise.resolve(error.response);
    }
  );

  Vue.prototype.$http = axios;
  Vue.prototype.$pageLogin = to.path === "/Login";
  if (to.path === "/Login") {
    next();
  } else {
    if (!authorization || authorization === "") {
      next({ path: "/Login" });
    } else {
      next();
    }
  }
});

export default router;
