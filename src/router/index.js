import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
