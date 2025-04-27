import { createRouter, createWebHistory } from 'vue-router';
import Products from '@/views/Products.vue';
import Cart from '@/views/Cart.vue';

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
