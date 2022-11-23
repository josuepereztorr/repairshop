import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '/customers', component: () => import('@/views/CustomersPage') },
      { path: '/appointments', component: () => import('@/views/AppointmentsPage') },
      { path: '/repair-services', component: () => import('@/views/RepairServicesPage') },
      { path: '/discounts', component: () => import('@/views/DiscountsPage') },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
