import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import move from "../pokemonMove.json";

export const useMoveStore = defineStore("move", () => {
  const moveList = reactive(move);

  const typeList = reactive({
    Fire: "火",
    Water: "水",
    Grass: "草",
    Electric: "電",
    Normal: "普",
    Flying: "飛",
    Ice: "冰",
    Fighting: "格",
    Poison: "毒",
    Ghost: "鬼",
    Psychic: "超",
    Bug: "蟲",
    Rock: "岩",
    Ground: "地",
    Dragon: "龍",
    Dark: "惡",
    Steel: "鋼",
    Fairy: "妖",
  });

  const categoryList = reactive({
    Physical: "物理",
    Special: "特殊"
  })

  return {
    moveList,
    typeList,
    categoryList,
  };
});