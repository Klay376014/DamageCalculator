<script setup>
  import { onMounted, ref, watch } from "vue";
  import { usePokemonStore } from "../stores/pokemon";
  import { useSelectStore } from "../stores/pokemonSelect";

  const store = usePokemonStore();
  const select = useSelectStore();

  const props = defineProps({
    pokemonNum: String,
  });

  const selected = (pokemon) => {
    select.pokemonSelect(pokemon.Name, props.pokemonNum, pokemon);
  };

  onMounted(() => {
    store.loadPokemon();
  });

  const imageUrl = (num) => {
    if (num === "default") {
      return new URL(`../assets/images/default.png`, import.meta.url).href;
    }
    return new URL(
      `https://www.serebii.net/pokemon/art/${num}.png`
    ).href;
  };
</script>
<template>
  <div
    class="modal fade"
    id="loadPokemon"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">載入寶可夢</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body py-2 border-bottom"
          v-for="(pokemon, index) in store.savedPokemon"
        >
          <div class="d-flex justify-content-between w-100">
            <div>
              <img :src="imageUrl(pokemon.num)" width="70" />
            </div>
            <div class="d-flex align-items-center fw-bold">
              <table class="modal-table">
                <tbody>
                  <tr>
                    <td class="px-2">{{ `H${pokemon.hp}` }}</td>
                    <td class="px-2">{{ `A${pokemon.atk}` }}</td>
                    <td class="px-2">{{ `B${pokemon.def}` }}</td>
                  </tr>
                  <tr>
                    <td class="px-2">{{ `C${pokemon.spa}` }}</td>
                    <td class="px-2">{{ `D${pokemon.spd}` }}</td>
                    <td class="px-2">{{ `S${pokemon.spe}` }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex align-items-center">
              <button
                type="button"
                class="btn btn-outline-light border-0 p-0 lh-1"
                data-bs-dismiss="modal"
              >
                <span
                  class="material-symbols-outlined"
                  @click="selected(pokemon)"
                >
                  done
                </span>
              </button>
              <button
                type="button"
                class="btn btn-outline-light border-0 p-0 lh-1 ms-1 ms-md-3"
              >
                <span
                  class="material-symbols-outlined"
                  @click="store.deletePokemon(index)"
                >
                  delete
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
