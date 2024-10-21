<script setup>
import FlightsCards from "@/components/FlightsCards.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toHomeView = () => {
  router.push({
    name: "Home",
  });
};
</script>
<template>
  <div class="mb-6 mt-3 flex items-center">
    <button
      class="fa fa-arrow-left text-1xl m-3 rounded-full border-2 border-white p-2 text-white shadow transition-all hover:border-yellow-300 hover:text-yellow-300 active:text-black active:shadow-inner"
      @click="toHomeView"
    ></button>
    <h1 class="text-3xl font-bold text-white">Flights</h1>
  </div>
  <div class="flex flex-col items-center">
    <FlightsCards />
  </div>
</template>
