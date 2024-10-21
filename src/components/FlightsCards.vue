<script setup>
import { onMounted, ref } from "vue";
import airports from "airport-codes";
import { useRouter } from "vue-router";

const flightsLocal = ref(null);
const flightsLocalSliced = ref([]);
const upperLimit = ref(0);
const lowerLimit = ref(5);
const width = ref();
const limitBasedOnWidth = ref();
const router = useRouter();

width.value = window.screen.availWidth;

if (width.value >= 1024) {
  limitBasedOnWidth.value = 12;
} else {
  limitBasedOnWidth.value = 5;
}

onMounted(() => {
  if (localStorage.getItem("Flights")) {
    flightsLocal.value = JSON.parse(localStorage.getItem("Flights"));
  }
  flightsLocalSliced.value = flightsLocal.value;
});

lowerLimit.value = 0;
upperLimit.value = limitBasedOnWidth.value;

const incLimits = () => {
  if (upperLimit.value >= flightsLocalSliced.value.length) {
    console.log("upperLimit is too much");
  } else {
    lowerLimit.value = lowerLimit.value + 5;
    upperLimit.value = upperLimit.value + 5;
  }
};

const decLimits = () => {
  if (lowerLimit.value <= 0) {
    console.log("lowerLimit is too little");
    console.log(flightsLocalSliced.length);
  } else {
    lowerLimit.value = lowerLimit.value - 5;
    upperLimit.value = upperLimit.value - 5;
  }
};

const toLocalStorage = (flight) => {
  localStorage.setItem("FlightCheckOut", JSON.stringify(flight));
  console.log(flight);
  router.push({
    name: "checkout",
  });
};
</script>
<template>
  <div class="mx-3 flex w-full items-center justify-center">
    <button
      class="fa fa-arrow-left text-1xl rounded-full border-2 border-white p-2 text-white shadow transition-all hover:border-yellow-300 hover:text-yellow-300 active:text-black active:shadow-inner"
      @click="decLimits"
    ></button>

    <div class="grid gap-6 lg:grid-cols-3">
      <section
        v-for="flight in flightsLocalSliced.slice(lowerLimit, upperLimit)"
        @click="toLocalStorage(flight)"
        class="cursor-pointer flex-col rounded-md bg-white p-1 px-2 shadow-sm ring-2 ring-slate-400 transition-all hover:shadow-2xl hover:ring-yellow-300 lg:p-2"
      >
        <section class="flex w-full justify-between text-2xl">
          <h1 class="w-1/3 truncate text-start">
            {{
              airports
                .findWhere({
                  iata: flight.itineraries[0].segments[0].departure.iataCode,
                })
                .get("name")
            }}
          </h1>
          <i class="fa-solid fa-plane self-end"></i>
          <h1 class="w-1/3 truncate text-end">
            {{
              airports
                .findWhere({
                  iata: flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.iataCode,
                })
                .get("name")
            }}
          </h1>
        </section>
        <section class="flex justify-between text-slate-500">
          <p>
            Terminal
            {{ flight.itineraries[0].segments[0].departure.terminal }}
          </p>
          <p
            v-if="
              flight.itineraries[0].segments[
                flight.itineraries[0].segments.length - 1
              ].arrival.terminal
            "
          >
            Terminal
            {{
              flight.itineraries[0].segments[
                flight.itineraries[0].segments.length - 1
              ].arrival.terminal
            }}
          </p>
          <p v-else>Main Terminal</p>
        </section>
        <section class="flex w-full justify-between">
          <div class="flex gap-2">
            <i class="fa-regular fa-clock self-center"></i>
            <p>
              {{
                flight.itineraries[0].duration
                  .replace("PT", "")
                  .replace("H", " H ")
                  .replace("M", " m ")
              }}
            </p>
          </div>
          <p class="self-end text-sm text-slate-500">
            Layovers : {{ flight.itineraries[0].segments.length }}
          </p>
          <div class="flex gap-2">
            <h1>
              {{ flight.price.currency }}
            </h1>
            <h1>
              {{ flight.price.total }}
            </h1>
          </div>
        </section>
      </section>
    </div>
    <button
      class="fa fa-arrow-right text-1xl rounded-full border-2 border-white p-2 text-white shadow transition-all hover:border-yellow-300 hover:text-yellow-300 active:text-black active:shadow-inner"
      @click="incLimits"
    ></button>
  </div>
</template>
