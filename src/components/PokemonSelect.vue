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

const imageUrl = ref(
  new URL(`../assets/images/${selectedPokemon.Name}.png`, import.meta.url).href
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
        }
      }

      imageUrl.value = new URL(
        `../assets/images/${store.pokemon1.Name}.png`,
        import.meta.url
      ).href;

      store.pokemon1.type1 = store.pokemonList[store.pokemon1.Name].types[0];
      if (store.pokemonList[store.pokemon1.Name].types.length > 1) {
        store.pokemon1.type2 = store.pokemonList[store.pokemon1.Name].types[1];
        store.pokemon1.typeContent = `原有屬性︰${
          store.typeList[store.pokemon1.type1]
        }／${store.typeList[store.pokemon1.type2]}`;
      } else {
        store.pokemon1.typeContent = `原有屬性︰${
          store.typeList[store.pokemon1.type1]
        }`;
      }
      store.pokemon1.hp = store.pokemonList[store.pokemon1.Name].baseStats.hp;
      store.pokemon1.atk = store.pokemonList[store.pokemon1.Name].baseStats.atk;
      store.pokemon1.def = store.pokemonList[store.pokemon1.Name].baseStats.def;
      store.pokemon1.spa = store.pokemonList[store.pokemon1.Name].baseStats.spa;
      store.pokemon1.spd = store.pokemonList[store.pokemon1.Name].baseStats.spd;
      store.pokemon1.spe = store.pokemonList[store.pokemon1.Name].baseStats.spe;
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
        }
      }

      imageUrl.value = new URL(
        `../assets/images/${store.pokemon2.Name}.png`,
        import.meta.url
      ).href;

      store.pokemon2.type1 = store.pokemonList[store.pokemon2.Name].types[0];
      if (store.pokemonList[store.pokemon2.Name].types.length > 1) {
        store.pokemon2.type2 = store.pokemonList[store.pokemon2.Name].types[1];
        store.pokemon2.typeContent = `原有屬性︰${
          store.typeList[store.pokemon2.type1]
        }／${store.typeList[store.pokemon2.type2]}`;
      } else {
        store.pokemon2.typeContent = `原有屬性︰${
          store.typeList[store.pokemon2.type1]
        }`;
      }
      store.pokemon2.hp = store.pokemonList[store.pokemon2.Name].baseStats.hp;
      store.pokemon2.atk = store.pokemonList[store.pokemon2.Name].baseStats.atk;
      store.pokemon2.def = store.pokemonList[store.pokemon2.Name].baseStats.def;
      store.pokemon2.spa = store.pokemonList[store.pokemon2.Name].baseStats.spa;
      store.pokemon2.spd = store.pokemonList[store.pokemon2.Name].baseStats.spd;
      store.pokemon2.spe = store.pokemonList[store.pokemon2.Name].baseStats.spe;
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
      store.pokemon1.teraContent = "　太晶化︰無";
    } else {
      store.pokemon1.teraType = tera;
      store.pokemon1.teraContent = `　太晶化︰${store.typeList[tera]}`;
    }
  } else {
    if (tera == "None") {
      store.pokemon2.teraType = tera;
      store.pokemon2.teraContent = "　太晶化︰無";
    } else {
      store.pokemon2.teraType = tera;
      store.pokemon2.teraContent = `　太晶化︰${store.typeList[tera]}`;
    }
  }
};
</script>
<template v-if="store.pokemonList">
  <div class="d-flex" style="height: 50px">
    <img
      :src="imageUrl"
      width="70"
      height="70"
      class="ms-3 pb-1"
      loading="lazy"
    />
    <label for="searchList" class="form-label"></label>
    <input
      class="form-control pokemonSelect mt-3"
      list="pokemonList"
      id="searchList"
      placeholder="選擇寶可夢"
      @change="pokemonSelect($event)"
    />
    <datalist id="pokemonList">
      <optgroup>
        <option v-for="(pokemon, chName) in store.pokemonList" :value="chName">
          {{ chName }}
        </option>
      </optgroup>
      <optgroup>
        <option v-for="pokemon in store.pokemonList" :value="pokemon.name">
          {{ pokemon.name }}
        </option>
      </optgroup>
    </datalist>

    <div class="type fw-bold ms-4">
      <table style="height: 60px">
        <tbody>
          <tr>
            <td class="align-middle" style="white-space: pre-line">
              {{
                `${
                  props.pokemonNum == "pokemon1"
                    ? store.pokemon1.typeContent
                    : store.pokemon2.typeContent
                }\n`
              }}
              {{
                props.pokemonNum == "pokemon1"
                  ? store.pokemon1.teraContent
                  : store.pokemon2.teraContent
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Tera
      :className="props.color"
      :pokemonNum="props.pokemonNum"
      @terastal="teraChange"
    ></Tera>
  </div>

  <div class="card-body">
    <basic-setting :pokemonNum="props.pokemonNum"></basic-setting>
    <div class="container moves ms--1">
      <NatureAndMoves :pokemonNum="props.pokemonNum"></NatureAndMoves>
      <Abilities :pokemonNum="props.pokemonNum"></Abilities>
      <Items :pokemonNum="props.pokemonNum"></Items>
      <Conditions :pokemonNum="props.pokemonNum"></Conditions>
      <Field v-if="props.pokemonNum == 'pokemon1'"></Field>
    </div>
  </div>
</template>
<style></style>