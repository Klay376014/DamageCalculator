<script setup>
  import Tera from "./TeraSelect.vue";
  import BasicSetting from "./BasicSetting.vue";
  import NatureAndMoves from "./NatureAndMoves.vue";
  import Abilities from "./Abilities.vue";
  import Items from "./Items.vue";
  import Conditions from "./Conditions.vue";
  import Field from "./Field.vue";
  import { usePokemonStore } from "../stores/pokemon";
  import { useSelectStore } from "../stores/pokemonSelect";

  const store = usePokemonStore();
  const select = useSelectStore();

  const props = defineProps({
    color: String,
    pokemonNum: String,
  });

  const teraChange = (tera) => {
    if (props.pokemonNum == "pokemon1") {
      if (tera == "None") {
        store.pokemon1.teraType = tera;
        store.pokemon1.teraContent = "太晶化︰無";
      } else {
        store.pokemon1.teraType = tera;
        store.pokemon1.teraContent = `太晶化︰${store.typeList[tera]}`;
      }
    } else {
      if (tera == "None") {
        store.pokemon2.teraType = tera;
        store.pokemon2.teraContent = "太晶化︰無";
      } else {
        store.pokemon2.teraType = tera;
        store.pokemon2.teraContent = `太晶化︰${store.typeList[tera]}`;
      }
    }
  };
</script>
<template v-if="store.pokemonList">
  <div class="container px-0 w-100 m-auto">
    <div
      class="row d-flex justify-content-center justify-content-xl-around align-items-center px-0 pt-0 pokemon-select"
    >
      <div class="col-3 col-xl-2">
        <img
          :src="
            props.pokemonNum === 'pokemon1'
              ? select.imageUrl1
              : select.imageUrl2
          "
          class="d-block mx-auto"
          loading="lazy"
        />
      </div>
      <div class="form-group col-8 col-xl-4 mt-2 position-relative">
        <input
          class="form-control"
          list="pokemonList"
          id="searchList"
          :placeholder="
            select.searchInput[props.pokemonNum] === ''
              ? '選擇寶可夢'
              : select.searchInput[props.pokemonNum]
          "
          @change="select.pokemonSelect($event.target.value, props.pokemonNum)"
          v-model="select.searchInput[props.pokemonNum]"
        />
        <datalist id="pokemonList">
          <optgroup>
            <option
              v-for="(pokemon, chName) in store.pokemonList"
              :value="chName"
            >
              {{ chName }}
            </option>
          </optgroup>
          <optgroup>
            <option v-for="pokemon in store.pokemonList" :value="pokemon.name">
              {{ pokemon.name }}
            </option>
          </optgroup>
        </datalist>
        <span
          class="material-symbols-outlined position-absolute clear"
          @click="select.clearName(props.pokemonNum)"
          >close</span
        >
      </div>
      <div class="col-5 col-xl-3 mt-2">
        <p class="mb-0">
          {{
            `${
              props.pokemonNum == "pokemon1"
                ? store.pokemon1.typeContent
                : store.pokemon2.typeContent
            }\n`
          }}
        </p>
        <p class="mb-0">
          {{
            props.pokemonNum == "pokemon1"
              ? store.pokemon1.teraContent
              : store.pokemon2.teraContent
          }}
        </p>
      </div>
      <div class="tera col-4 col-xl-2 mt-2">
        <Tera :pokemonNum="props.pokemonNum" @terastal="teraChange"></Tera>
      </div>
    </div>
  </div>

  <basic-setting :pokemonNum="props.pokemonNum"></basic-setting>
  <NatureAndMoves :pokemonNum="props.pokemonNum"></NatureAndMoves>
  <Abilities :pokemonNum="props.pokemonNum"></Abilities>
  <Items :pokemonNum="props.pokemonNum"></Items>
  <Conditions :pokemonNum="props.pokemonNum"></Conditions>
  <Field v-if="props.pokemonNum == 'pokemon1'"></Field>
</template>
<style></style>
