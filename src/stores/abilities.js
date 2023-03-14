import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import abilities from "../pokemonAbility.json";

export const useAbilityStore = defineStore("ability", () => {
  const abilityList = reactive(abilities);

  return{
    abilityList,
  }
});
