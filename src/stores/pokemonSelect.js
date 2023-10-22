import { ref } from "vue";
import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";

export const useSelectStore = defineStore("select", () => {
  const store = usePokemonStore();

  const imageUrl1 = ref(
    new URL(`../assets/images/default.png`, import.meta.url).href
  );

  const imageUrl2 = ref(
    new URL(`../assets/images/default.png`, import.meta.url).href
  );

  const searchInput = ref({
    pokemon1: '',
    pokemon2: ''
  })

  const clearName = (pokemonNum) => {
    searchInput.value[pokemonNum] = '';
  };

  const pokemonSelect = function (value, pokemonNum, loadPokemon) {
    try {
      store[pokemonNum].Name = value;
      if (
        Object.keys(store.pokemonList).find((key) => key === value) !==
        undefined
      ) {
        store[pokemonNum].Name = value;
        searchInput.value[pokemonNum] = value;
      } else {
        let name = Object.keys(store.pokemonList).find(
          (key) => store.pokemonList[key].name === value
        );
        if (name !== undefined) {
          store[pokemonNum].Name = name;
          value = name;
          searchInput.value[pokemonNum] = name;
        }
      }

      store[pokemonNum].num = store.pokemonList[store[pokemonNum].Name].num;
      store[pokemonNum].type1 =
        store.pokemonList[store[pokemonNum].Name].types[0];
      if (store.pokemonList[store[pokemonNum].Name].types.length > 1) {
        store[pokemonNum].type2 =
          store.pokemonList[store[pokemonNum].Name].types[1];
        store[pokemonNum].typeContent = `原屬性︰${
          store.typeList[store[pokemonNum].type1]
        }／${store.typeList[store[pokemonNum].type2]}`;
      } else {
        store[pokemonNum].typeContent = `原屬性︰${
          store.typeList[store[pokemonNum].type1]
        }`;
        store[pokemonNum].type2 = "";
      }
      store[pokemonNum].hp =
        store.pokemonList[store[pokemonNum].Name].baseStats.hp;
      store[pokemonNum].atk =
        store.pokemonList[store[pokemonNum].Name].baseStats.atk;
      store[pokemonNum].def =
        store.pokemonList[store[pokemonNum].Name].baseStats.def;
      store[pokemonNum].spa =
        store.pokemonList[store[pokemonNum].Name].baseStats.spa;
      store[pokemonNum].spd =
        store.pokemonList[store[pokemonNum].Name].baseStats.spd;
      store[pokemonNum].spe =
        store.pokemonList[store[pokemonNum].Name].baseStats.spe;

      if (loadPokemon) {
        store[pokemonNum].bp.hp = loadPokemon.hp;
        store[pokemonNum].bp.atk = loadPokemon.atk;
        store[pokemonNum].bp.def = loadPokemon.def;
        store[pokemonNum].bp.spa = loadPokemon.spa;
        store[pokemonNum].bp.spd = loadPokemon.spd;
        store[pokemonNum].bp.spe = loadPokemon.spe;
      }

      if (
        ["厄鬼椪-水井", "厄鬼椪-火灶", "厄鬼椪-礎石"].indexOf(
          store[pokemonNum].Name
        ) !== -1
      ) {
        store[pokemonNum].item = "Ogerpon Mask";
      }

      if (store[pokemonNum].num !== "default") {
        if (pokemonNum === "pokemon1") {
          imageUrl1.value = new URL(
            `https://www.serebii.net/pokemon/art/${store[pokemonNum].num}.png`
          ).href;
        } else {
          imageUrl2.value = new URL(
            `https://www.serebii.net/pokemon/art/${store[pokemonNum].num}.png`
          ).href;
        }
      } else {
        if (pokemonNum === "pokemon1") {
          imgaeUrl1.value = new URL(
            `../assets/images/default.png`,
            import.meta.url
          ).href;
        } else {
          imgaeUrl2.value = new URL(
            `../assets/images/default.png`,
            import.meta.url
          ).href;
        }
      }
    } catch (e) {
      if (pokemonNum === "pokemon1") {
        imageUrl1.value = new URL(
          `../assets/images/default.png`,
          import.meta.url
        ).href;
      } else {
        imgaeUrl2.value = new URL(
          `../assets/images/default.png`,
          import.meta.url
        ).href;
      }
      return false;
    }
  };

  return {
    imageUrl1,
    imageUrl2,
    searchInput,
    pokemonSelect,
    clearName
  };
});
