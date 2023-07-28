<script setup>
import PokemonSelect from "../components/PokemonSelect.vue";
import Results from "../components/Results.vue";
</script>
<template>
  <div class="container-fluid mt-3">
    <div class="row d-flex">
      <div class="col-md-6 p-0 px-lg-2 mb-3">
        <div class="card card-1 ps-3">寶可夢1</div>
        <div class="card-body">
          <pokemon-select
            color="btn-primary"
            pokemonNum="pokemon1"
          ></pokemon-select>
        </div>
      </div>
      <div class="col-md-6 p-0 px-lg-2">
        <div class="card card-2 ps-3">寶可夢2</div>
        <div class="card-body">
          <pokemon-select
            color="btn-secondary"
            pokemonNum="pokemon2"
          ></pokemon-select>
          <Results></Results>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>