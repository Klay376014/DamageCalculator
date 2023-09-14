<script setup>
import { computed, reactive, ref, watch } from "vue";
import Tera from "./TeraSelect.vue";
import BasicSetting from "./BasicSetting.vue";
import NatureAndMoves from "./NatureAndMoves.vue";
import Abilities from "./Abilities.vue";
import Items from "./Items.vue";
import Conditions from "./Conditions.vue";
import Field from "./Field.vue";
import { usePokemonStore } from "../stores/pokemon";

const store = usePokemonStore();

const props = defineProps({
  color: String,
  pokemonNum: String,
});

const selectedPokemon = reactive({
  Name: "default",
});

const searchInput = ref('');

const clearName = ()=>{
  searchInput.value = '';
}

const imageUrl = ref(
  new URL(`../assets/images/default.png`, import.meta.url).href
);

const pokemonSelect = function (event) {
  if (props.pokemonNum == "pokemon1") {
    try {
      store.pokemon1.Name = event.target.value;
      if (
        Object.keys(store.pokemonList).find(
          (key) => key === event.target.value
        ) !== undefined
      ) {
        store.pokemon1.Name = event.target.value;
      } else {
        let name = Object.keys(store.pokemonList).find(
          (key) => store.pokemonList[key].name === event.target.value
        );
        if (name !== undefined) {
          store.pokemon1.Name = name;
          event.target.value = name;
          searchInput.value = name;
        }
      }

      store.pokemon1.num = store.pokemonList[store.pokemon1.Name].num;
      store.pokemon1.type1 = store.pokemonList[store.pokemon1.Name].types[0];
      if (store.pokemonList[store.pokemon1.Name].types.length > 1) {
        store.pokemon1.type2 = store.pokemonList[store.pokemon1.Name].types[1];
        store.pokemon1.typeContent = `原屬性︰${
          store.typeList[store.pokemon1.type1]
        }／${store.typeList[store.pokemon1.type2]}`;
      } else {
        store.pokemon1.typeContent = `原屬性︰${
          store.typeList[store.pokemon1.type1]
        }`;
        store.pokemon1.type2 = "";
      }
      store.pokemon1.hp = store.pokemonList[store.pokemon1.Name].baseStats.hp;
      store.pokemon1.atk = store.pokemonList[store.pokemon1.Name].baseStats.atk;
      store.pokemon1.def = store.pokemonList[store.pokemon1.Name].baseStats.def;
      store.pokemon1.spa = store.pokemonList[store.pokemon1.Name].baseStats.spa;
      store.pokemon1.spd = store.pokemonList[store.pokemon1.Name].baseStats.spd;
      store.pokemon1.spe = store.pokemonList[store.pokemon1.Name].baseStats.spe;

      if(store.pokemon1.num!=='default'){
        imageUrl.value = new URL(
        `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${store.pokemon1.num}.png`,
        ).href;
      }else{
        imgaeUrl.value = new URL(`../assets/images/default.png`, import.meta.url).href;
      }
    } catch (e) {
      imageUrl.value = new URL(
        `../assets/images/default.png`,
        import.meta.url
      ).href;
      return false;
    }
  } else {
    try {
      store.pokemon2.Name = event.target.value;

      if (
        Object.keys(store.pokemonList).find(
          (key) => key === event.target.value
        ) !== undefined
      ) {
        store.pokemon2.Name = event.target.value;
      } else {
        let name = Object.keys(store.pokemonList).find(
          (key) => store.pokemonList[key].name === event.target.value
        );
        if (name !== undefined) {
          store.pokemon2.Name = name;
          event.target.value = name;
          searchInput.value = name;
        }
      }

      store.pokemon2.num = store.pokemonList[store.pokemon2.Name].num;
      store.pokemon2.type1 = store.pokemonList[store.pokemon2.Name].types[0];
      if (store.pokemonList[store.pokemon2.Name].types.length > 1) {
        store.pokemon2.type2 = store.pokemonList[store.pokemon2.Name].types[1];
        store.pokemon2.typeContent = `原屬性︰${
          store.typeList[store.pokemon2.type1]
        }／${store.typeList[store.pokemon2.type2]}`;
      } else {
        store.pokemon2.typeContent = `原屬性︰${
          store.typeList[store.pokemon2.type1]
        }`;
        store.pokemon2.type2 = "";
      }
      store.pokemon2.hp = store.pokemonList[store.pokemon2.Name].baseStats.hp;
      store.pokemon2.atk = store.pokemonList[store.pokemon2.Name].baseStats.atk;
      store.pokemon2.def = store.pokemonList[store.pokemon2.Name].baseStats.def;
      store.pokemon2.spa = store.pokemonList[store.pokemon2.Name].baseStats.spa;
      store.pokemon2.spd = store.pokemonList[store.pokemon2.Name].baseStats.spd;
      store.pokemon2.spe = store.pokemonList[store.pokemon2.Name].baseStats.spe;

      if(store.pokemon2.num!=='default'){
        imageUrl.value = new URL(
        `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${store.pokemon2.num}.png`,
        ).href;
      }else{
        imgaeUrl.value = new URL(`../assets/images/default.png`, import.meta.url).href;
      }
    } catch (e) {
      imageUrl.value = new URL(
        `../assets/images/default.png`,
        import.meta.url
      ).href;
      return false;
    }
  }
};

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
          :src="imageUrl"
          class="d-block mx-auto"
          loading="lazy"
        />
      </div>
      <div class="form-group col-8 col-xl-4 mt-2 position-relative">
        <input
          class="form-control"
          list="pokemonList"
          id="searchList"
          placeholder="選擇寶可夢"
          @change="pokemonSelect($event)"
          v-model="searchInput"
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
        <span class="material-symbols-outlined position-absolute clear" @click="clearName(e)">close</span>
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
        <Tera
          :pokemonNum="props.pokemonNum"
          @terastal="teraChange"
        ></Tera>
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
