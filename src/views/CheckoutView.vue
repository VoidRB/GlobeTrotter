<script setup>
import { onMounted, ref } from "vue";
import CheckOutCard from "./CheckOutCard.vue";
const flight = ref();

if (localStorage.getItem("FlightCheckOut")) {
  flight.value = JSON.parse(localStorage.getItem("FlightCheckOut"));

  console.log(flight.value);
} else {
  console.log("No Flight to send to  Checkout");
}
onMounted(() => {});
</script>
<template>
  <CheckOutCard :flight="flight" />
</template>
