<script setup>
import { RouterView } from "vue-router";
import Branding from "./components/Branding.vue";
</script>

<template>
  <div class="flex h-screen w-full flex-col bg-travelSecondary">
    <Branding />
    <RouterView />
  </div>
</template>
