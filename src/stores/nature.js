import { defineStore } from "pinia";
import { ref } from "vue";
import { usePokemonStore } from "./pokemon";

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
    if (pokemonNum === "pokemon1") {
      atkNature.value = 1;
      defNature.value = 1;
      spaNature.value = 1;
      spdNature.value = 1;
      speNature.value = 1;

      if (nature == "timid") {
        speNature.value = 1.1;
        store.pokemon1.natureUp = "spe";
        atkNature.value = 0.9;
        store.pokemon1.natureDown = "atk";
      } else if (nature == "hasty") {
        speNature.value = 1.1;
        store.pokemon1.natureUp = "spe";
        defNature.value = 0.9;
        store.pokemon1.natureDown = "def";
      } else if (nature == "jolly") {
        speNature.value = 1.1;
        store.pokemon1.natureUp = "spe";
        spaNature.value = 0.9;
        store.pokemon1.natureDown = "spa";
      } else if (nature == "naive") {
        speNature.value = 1.1;
        store.pokemon1.natureUp = "spe";
        spdNature.value = 0.9;
        store.pokemon1.natureDown = "spd";
      } else if (nature == "calm") {
        spdNature.value = 1.1;
        store.pokemon1.natureUp = "spd";
        atkNature.value = 0.9;
        store.pokemon1.natureDown = "atk";
      } else if (nature == "gentle") {
        spdNature.value = 1.1;
        store.pokemon1.natureUp = "spd";
        defNature.value = 0.9;
        store.pokemon1.natureDown = "def";
      } else if (nature == "careful") {
        spdNature.value = 1.1;
        store.pokemon1.natureUp = "spd";
        spaNature.value = 0.9;
        store.pokemon1.natureDown = "spa";
      } else if (nature == "sassy") {
        spdNature.value = 1.1;
        store.pokemon1.natureUp = "spd";
        speNature.value = 0.9;
        store.pokemon1.natureDown = "spe";
      } else if (nature == "modest") {
        spaNature.value = 1.1;
        store.pokemon1.natureUp = "spa";
        atkNature.value = 0.9;
        store.pokemon1.natureDown = "atk";
      } else if (nature == "mild") {
        spaNature.value = 1.1;
        store.pokemon1.natureUp = "spa";
        defNature.value = 0.9;
        store.pokemon1.natureDown = "def";
      } else if (nature == "rash") {
        spaNature.value = 1.1;
        store.pokemon1.natureUp = "spa";
        spdNature.value = 0.9;
        store.pokemon1.natureDown = "spd";
      } else if (nature == "quiet") {
        spaNature.value = 1.1;
        store.pokemon1.natureUp = "spa";
        speNature.value = 0.9;
        store.pokemon1.natureDown = "spe";
      } else if (nature == "bold") {
        defNature.value = 1.1;
        store.pokemon1.natureUp = "def";
        atkNature.value = 0.9;
        store.pokemon1.natureDown = "atk";
      } else if (nature == "impish") {
        defNature.value = 1.1;
        store.pokemon1.natureUp = "def";
        spaNature.value = 0.9;
        store.pokemon1.natureDown = "spa";
      } else if (nature == "lax") {
        defNature.value = 1.1;
        store.pokemon1.natureUp = "def";
        spdNature.value = 0.9;
        store.pokemon1.natureDown = "spd";
      } else if (nature == "relaxed") {
        defNature.value = 1.1;
        store.pokemon1.natureUp = "def";
        speNature.value = 0.9;
        store.pokemon1.natureDown = "spe";
      } else if (nature == "lonely") {
        atkNature.value = 1.1;
        store.pokemon1.natureUp = "atk";
        defNature.value = 0.9;
        store.pokemon1.natureDown = "def";
      } else if (nature == "adamant") {
        atkNature.value = 1.1;
        store.pokemon1.natureUp = "atk";
        spaNature.value = 0.9;
        store.pokemon1.natureDown = "spa";
      } else if (nature == "naughty") {
        atkNature.value = 1.1;
        store.pokemon1.natureUp = "atk";
        spdNature.value = 0.9;
        store.pokemon1.natureDown = "spd";
      } else if (nature == "brave") {
        atkNature.value = 1.1;
        store.pokemon1.natureUp = "atk";
        speNature.value = 0.9;
        store.pokemon1.natureDown = "spe";
      }
    } else {
      atkNature2.value = 1;
      defNature2.value = 1;
      spaNature2.value = 1;
      spdNature2.value = 1;
      speNature2.value = 1;

      if (nature == "timid") {
        speNature2.value = 1.1;
        store.pokemon2.natureUp = "spe";
        atkNature2.value = 0.9;
        store.pokemon2.natureDown = "atk";
      } else if (nature == "hasty") {
        speNature2.value = 1.1;
        store.pokemon2.natureUp = "spe";
        defNature2.value = 0.9;
        store.pokemon2.natureDown = "def";
      } else if (nature == "jolly") {
        speNature2.value = 1.1;
        store.pokemon2.natureUp = "spe";
        spaNature2.value = 0.9;
        store.pokemon2.natureDown = "spa";
      } else if (nature == "naive") {
        speNature2.value = 1.1;
        store.pokemon2.natureUp = "spe";
        spdNature2.value = 0.9;
        store.pokemon2.natureDown = "spd";
      } else if (nature == "calm") {
        spdNature2.value = 1.1;
        store.pokemon2.natureUp = "spd";
        atkNature2.value = 0.9;
        store.pokemon2.natureDown = "atk";
      } else if (nature == "gentle") {
        spdNature2.value = 1.1;
        store.pokemon2.natureUp = "spd";
        defNature2.value = 0.9;
        store.pokemon2.natureDown = "def";
      } else if (nature == "careful") {
        spdNature2.value = 1.1;
        store.pokemon2.natureUp = "spd";
        spaNature2.value = 0.9;
        store.pokemon2.natureDown = "spa";
      } else if (nature == "sassy") {
        spdNature2.value = 1.1;
        store.pokemon2.natureUp = "spd";
        speNature2.value = 0.9;
        store.pokemon2.natureDown = "spe";
      } else if (nature == "modest") {
        spaNature2.value = 1.1;
        store.pokemon2.natureUp = "spa";
        atkNature2.value = 0.9;
        store.pokemon2.natureDown = "atk";
      } else if (nature == "mild") {
        spaNature2.value = 1.1;
        store.pokemon2.natureUp = "spa";
        defNature2.value = 0.9;
        store.pokemon2.natureDown = "def";
      } else if (nature == "rash") {
        spaNature2.value = 1.1;
        store.pokemon2.natureUp = "spa";
        spdNature2.value = 0.9;
        store.pokemon2.natureDown = "spd";
      } else if (nature == "quiet") {
        spaNature2.value = 1.1;
        store.pokemon2.natureUp = "spa";
        speNature2.value = 0.9;
        store.pokemon2.natureDown = "spe";
      } else if (nature == "bold") {
        defNature2.value = 1.1;
        store.pokemon2.natureUp = "def";
        atkNature2.value = 0.9;
        store.pokemon2.natureDown = "atk";
      } else if (nature == "impish") {
        defNature2.value = 1.1;
        store.pokemon2.natureUp = "def";
        spaNature2.value = 0.9;
        store.pokemon2.natureDown = "spa";
      } else if (nature == "lax") {
        defNature2.value = 1.1;
        store.pokemon2.natureUp = "def";
        spdNature2.value = 0.9;
        store.pokemon2.natureDown = "spd";
      } else if (nature == "relaxed") {
        defNature2.value = 1.1;
        store.pokemon2.natureUp = "def";
        speNature2.value = 0.9;
        store.pokemon2.natureDown = "spe";
      } else if (nature == "lonely") {
        atkNature2.value = 1.1;
        store.pokemon2.natureUp = "atk";
        defNature2.value = 0.9;
        store.pokemon2.natureDown = "def";
      } else if (nature == "adamant") {
        atkNature2.value = 1.1;
        store.pokemon2.natureUp = "atk";
        spaNature2.value = 0.9;
        store.pokemon2.natureDown = "spa";
      } else if (nature == "naughty") {
        atkNature2.value = 1.1;
        store.pokemon2.natureUp = "atk";
        spdNature2.value = 0.9;
        store.pokemon2.natureDown = "spd";
      } else if (nature == "brave") {
        atkNature2.value = 1.1;
        store.pokemon2.natureUp = "atk";
        speNature.value = 0.9;
        store.pokemon1.natureDown = "spe";
      }
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
