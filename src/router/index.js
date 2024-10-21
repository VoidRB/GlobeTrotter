import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/flights",
      name: "flights",
      component: () => import("@/views/FlightsView.vue"),
      meta: {
        title: "Flights",
      },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/CheckoutView.vue"),
      meta: {
        title: "Checkout",
      },
    },
    {
      path: "/:catchall(.*)",
      name: "NotFound",
      component: () => import("@/views/NotFoundView.vue"),
      meta: {
        title: "404 Not Found",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | GlobeTrotter`;
  next();
});

export default router;
