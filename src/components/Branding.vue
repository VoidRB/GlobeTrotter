<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex w-full items-center justify-center bg-travelPrimary py-3">
    <RouterLink :to="{ name: 'Home' }" class="flex gap-2">
      <i
        class="items-center rounded-md border-2 border-black bg-yellow-300 font-bold text-black"
      >
        <i class="fa fa-arrow-up rotate-45 px-1.5 text-2xl font-extrabold"></i>
      </i>
      <h1 class="text-2xl font-bold text-white">GlobeTrotter</h1>
    </RouterLink>
  </div>
</template>
