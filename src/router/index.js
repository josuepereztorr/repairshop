import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("@/views/CustomersPage"),
      },
      {
        path: "/appointments",
        component: () => import("@/views/AppointmentsPage"),
      },
      {
        path: "/services",
        component: () => import("@/views/ServicesPage"),
      },
      {
        path: "/discounts",
        component: () => import("@/views/DiscountsPage"),
      },
    ],
  },
  {
    path: "/home",
    component: () => import("@/layouts/WebPageLayout.vue"),
    children: [
      {
        path: "/home",
        component: () => import("@/views/ScheduleAppWebPage.vue"),
      },
      // {
      //   path: "/schedule-appointment",
      //   component: () => import("@/views/ScheduleAppWebPage.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
