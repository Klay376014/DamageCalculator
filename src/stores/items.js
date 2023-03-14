import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import items from "../pokemonItem.json";

export const useItemStore = defineStore("item", () => {
  const itemList = reactive(items);

  return {
    itemList,
  };
});
