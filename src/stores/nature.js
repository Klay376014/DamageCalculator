import { defineStore } from "pinia";
import { ref } from "vue";
import { usePokemonStore } from "./pokemon";
import NatureList from "../nature.json";


/**
 * 判斷性格的增減項並調整value
 * @date 2023/11/10 - 下午3:00:59
 *
 * @param {string} nature
 * @returns {{natureUp: string, natureDown: string, values: { atk: number; def: number; spa: number; spd: number; spe: number; }}}
 */
function modifyNatureValue(nature) {
  const values = {
    atk: 1,
    def: 1,
    spa: 1,
    spd: 1,
    spe: 1
  }
  const natureInfo = NatureList.find(item => item.name === nature)
  const natureUp = natureInfo.boost;
  if (natureUp) {
    values[natureUp] = 1.1
  }
  const natureDown = natureInfo.weaken
  if (natureDown) {
    values[natureDown] = 0.9
  }
  return {
    natureUp,
    natureDown,
    values
  }
}

export const useNatureStore = defineStore("nature", () => {
  const store = usePokemonStore();

  const atkNature = ref(1);
  const defNature = ref(1);
  const spaNature = ref(1);
  const spdNature = ref(1);
  const speNature = ref(1);

  const atkNature2 = ref(1);
  const defNature2 = ref(1);
  const spaNature2 = ref(1);
  const spdNature2 = ref(1);
  const speNature2 = ref(1);

  const natureChange = (nature, pokemonNum) => {
    store[pokemonNum].nature = nature;
    const { values, natureDown, natureUp } = modifyNatureValue(nature)
    if (pokemonNum === "pokemon1") {
      store.pokemon1.natureUp = natureUp
      store.pokemon1.natureDown = natureDown
      atkNature.value = values.atk;
      defNature.value = values.def;
      spaNature.value = values.spa;
      spdNature.value = values.spd;
      speNature.value = values.spe;
    } else {
      store.pokemon2.natureUp = natureUp
      store.pokemon2.natureDown = natureDown
      atkNature2.value = values.atk;
      defNature2.value = values.def;
      spaNature2.value = values.spa;
      spdNature2.value = values.spd;
      speNature2.value = values.spe;
    }
  };
  const level = ref(50);
  const level2 = ref(50);

  const levelChange = (newLevel) => {
    level.value = newLevel;
  };
  const levelChange2 = (newLevel) => {
    level2.value = newLevel;
  };
  return {
    atkNature,
    defNature,
    spaNature,
    spdNature,
    speNature,
    natureChange,
    atkNature2,
    defNature2,
    spaNature2,
    spdNature2,
    speNature2,
    level,
    levelChange,
    level2,
    levelChange2,
  };
});
