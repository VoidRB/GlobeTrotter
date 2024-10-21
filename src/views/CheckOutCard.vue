<script setup>
import airports from "airport-codes";
defineProps({
  flight: {
    type: Object,
    default: { message: "No object exists" },
  },
});
</script>

<template>
  <div class="flex size-full items-center p-4">
    <div
      class="m-4 flex size-full flex-col rounded-md bg-white p-4 shadow-sm ring-2 ring-slate-400"
    >
      <section
        class="flex flex-col justify-evenly text-5xl font-bold drop-shadow-2xl lg:flex-row"
      >
        <div class="flex flex-col items-center justify-center">
          <h1 class="mb-2 font-thin text-slate-500">Destination</h1>
          <h1 class="text-center font-semibold">
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
        </div>
        <h1>
          <div class="flex flex-col items-center">
            <h1 class="mb-2 font-thin text-slate-500">Departure</h1>
            <h1 class="text-center font-semibold">
              {{
                airports
                  .findWhere({
                    iata: flight.itineraries[0].segments[0].departure.iataCode,
                  })
                  .get("name")
              }}
            </h1>
          </div>
        </h1>
      </section>
      <hr class="my-5 w-full border-2 border-yellow-300" />
      <section class="flex w-1/2 flex-col gap-2 px-4 text-3xl">
        <div class="flex justify-between">
          <h1 class="text-slate-500">
            Flights&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </h1>

          <p v-for="segment in flight.itineraries[0].segments">
            {{ segment.departure.iataCode }}
            <i class="fa fa-plane text-slate-500"></i>
            {{ segment.arrival.iataCode }}
          </p>
        </div>
        <div class="flex justify-between">
          <h1 class="text-slate-500">Durations</h1>

          <p v-for="segment in flight.itineraries[0].segments">
            <i class="fa-regular fa-clock self-center"></i>
            {{
              segment.duration
                .replace("PT", "")
                .replace("H", " H ")
                .replace("M", " m ")
            }}
          </p>
        </div>
      </section>
      <hr class="my-10 w-full border-2 border-yellow-300" />
      <section class="text-3xl">
        <div class="mb-10">
          <p class="px-4 pb-4 text-slate-500">Aircraft Number(s)</p>
          <p class="px-8" v-for="segment in flight.itineraries[0].segments">
            {{ segment.aircraft.code }}
          </p>
        </div>
        <hr class="my-10 w-full border-2 border-yellow-300" />
        <p class="px-4 pb-4 text-slate-500">Price Totals</p>
        <div class="flex gap-10 px-8">
          <p>{{ flight.price.currency }}</p>
          <p>{{ flight.price.total }}</p>
        </div>
      </section>
    </div>
  </div>
</template>
