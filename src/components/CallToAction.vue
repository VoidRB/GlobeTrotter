<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Typer } from "vue3-typer";
import "vue3-typer/dist/vue-typer.css";

const callsToAction = [
  "PAR TO MEX",
  "NYC TO LHR",
  "RUH TO BAH",
  "DXB TO UYL",
  "KAR TO ICN",
  "SYD TO SIN",
  "HND TO CDG",
  "GRU TO EZE",
  "GlobeTrotter.",
];

const depart = ref(null);
const dest = ref(null);
const adultPassengerCount = ref(null);
const responseData = ref(null);
const departDate = ref(null);
const token = import.meta.env.VITE_TRAVEL_API_TOKEN;
const router = useRouter();

const envTest = () => {
  console.log(token);
};

const amadeusCall = async () => {
  let formattedDepartDate = departDate.value.replace("/", "-");
  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${depart.value}&destinationLocationCode=${dest.value}&departureDate=${formattedDepartDate}&adults=${adultPassengerCount.value}&nonStop=false&max=250`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    responseData.value = response.data.data;
    console.log(responseData.value);
    localStorage.setItem("Flights", JSON.stringify(responseData.value));
    router.push({
      name: "flights",
    });
    console.log(dest.value, depart.value);
  } catch (error) {
    throw error;
  }
};
</script>
<template>
  <div
    class="flex h-full flex-col items-center justify-center bg-travelSecondary pt-10"
  >
    <Typer
      class="text-5xl font-bold md:text-8xl lg:text-9xl"
      :text="callsToAction"
      erase-style="clear"
      caret-animation="smooth"
      shuffle:true
    ></Typer>
    <div class="flex flex-col items-center gap-3 p-6 text-white">
      <p>
        *Use the IATA code for the airport that is local to you and the airport
        you wish to visit
      </p>
      <input
        v-model="depart"
        type="text"
        placeholder="Departure"
        class="border-b-2 border-white bg-transparent px-2 py-1 text-center text-2xl text-white outline-none transition-all focus:border-b-yellow-300"
      />
      <input
        v-model="dest"
        type="text"
        placeholder="Destination"
        class="border-b-2 border-white bg-transparent px-2 py-1 text-center text-2xl text-white outline-none transition-all focus:border-b-yellow-300"
      />
      <input
        type="number"
        placeholder="# of Adults"
        v-model="adultPassengerCount"
        class="border-b-2 border-white bg-transparent px-2 py-1 text-center text-2xl text-white outline-none transition-all focus:border-b-yellow-300"
      />
      <input
        type="date"
        v-model="departDate"
        class="border-b-2 border-white bg-transparent px-2 py-1 text-center text-2xl text-white outline-none transition-all focus:border-b-yellow-300"
      />
      <button @click="envTest">
        <i
          class="fa fa-search text-1xl m-3 rounded-full border-2 border-white p-3 text-white shadow transition-all hover:border-yellow-300 hover:text-yellow-300 active:text-black active:shadow-inner md:ml-3 md:mt-0"
        ></i>
      </button>
    </div>
  </div>
</template>
