import { defineStore } from "pinia";
import { ref } from "vue";
import pm from "../pokedex_speedtier.json";

export const useSpeedTierStore = defineStore("SpeedTier", () => {
  const list = ref(pm);

  let newList = Object.entries(list.value).sort(
    (a, b) => b[1].baseStats.spe - a[1].baseStats.spe
  );

  return {
    list,
    newList,
  };
});
