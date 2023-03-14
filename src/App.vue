<script setup>
import PokemonSelect from "./components/PokemonSelect.vue";
import Results from "./components/Results.vue";
import { reactive, ref, onMounted, onBeforeMount, computed } from "vue";

</script>

<template>
  <div class="container-fluid calculator">
    <div class="row">
      <div class="col">
        <div class="title attacker container mt-2 text-white">寶可夢1</div>
        <div class="card px-0 pt-1" style="width: 575px">
          <pokemon-select color="btn-info" pokemonNum="pokemon1" ></pokemon-select>  
        </div>
      </div>
      <div class="col">
        <div class="title defender container mt-4 mt-xl-2 text-white">
          寶可夢2
        </div>
        <div class="card px-0 pt-1" style="width: 575px">

          <pokemon-select color="btn-warning" pokemonNum="pokemon2" ></pokemon-select>

          <Results></Results>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
