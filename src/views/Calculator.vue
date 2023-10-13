<script setup>
import { ref } from 'vue'
import PokemonSelect from "../components/PokemonSelect.vue";
import Results from "../components/Results.vue";
import LoadPokemon from "../components/LoadPokemon.vue";
import SavePokemon from "../components/SavePokemon.vue";


const activePokemon = ref('')

const openModalLoad = (pokemon) => {
  activePokemon.value = pokemon
}

const openModalSave = (pokemon) => {
  activePokemon.value = pokemon
}
</script>
<template>
  <div class="container-fluid mt-3">
    <div class="row d-flex">
      <div class="col-md-6 p-0 px-lg-2 mb-3">
        <div class="card card-1 px-3 pt-2">
          <div class="d-flex justify-content-between">
            <p class="pt-2">寶可夢1</p>
            <div class="pt-1">
              <button type="button" class="btn btn-warning rounded-pill px-2 text-black fw-bold" data-bs-toggle="modal" data-bs-target="#loadPokemon" @click="openModalLoad('pokemon1')">載入</button>
              <button type="button" class="btn btn-warning rounded-pill px-2 ms-2 text-black fw-bold" data-bs-toggle="modal" data-bs-target="#savePokemon" @click="openModalSave('pokemon1')">儲存</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <pokemon-select
            color="btn-primary"
            pokemonNum="pokemon1"
          ></pokemon-select>
        </div>
      </div>
      <div class="col-md-6 p-0 px-lg-2">
        <div class="card card-2 px-3 pt-2">
          <div class="d-flex justify-content-between">
            <p class="pt-2">寶可夢2</p>
            <div class="pt-1">
              <button type="button" class="btn btn-warning rounded-pill px-2 text-black fw-bold" data-bs-toggle="modal" data-bs-target="#loadPokemon" @click="openModalLoad('pokemon2')">載入</button>
              <button type="button" class="btn btn-warning rounded-pill px-2 ms-2 text-black fw-bold" data-bs-toggle="modal" data-bs-target="#savePokemon" @click="openModalSave('pokemon2')">儲存</button>
            </div>
          </div>
        </div>
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
  <LoadPokemon :pokemonNum="activePokemon"></LoadPokemon>
  <SavePokemon :pokemonNum="activePokemon"></SavePokemon>
</template>
<style></style>