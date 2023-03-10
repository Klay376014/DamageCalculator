import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import pokemon from "../pokedex_version2.json";
import { useNatureStore } from "./nature";
import damageTaken from "../typeDamageTaken.json";

export const usePokemonStore = defineStore("pokemon", () => {
  const nt = useNatureStore();
  const pokemonList = reactive(pokemon);
  const dt = reactive(damageTaken);

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

  const pokemon1 = reactive({
    Name: "default",
    type1: "",
    type2: "",
    teraType: "None",
    typeContent: "原有屬性︰",
    teraContent: "　太晶化︰無",
    ability: "default",
    item: "default",
    hp: 100,
    atk: 100,
    def: 100,
    spa: 100,
    spd: 100,
    spe: 100,
    iv: {
      hp: 31,
      atk: 31,
      def: 31,
      spa: 31,
      spd: 31,
      spe: 31,
    },
    bp: {
      hp: 0,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
      max: computed(() => {
        return (
          508 -
          pokemon1.bp.hp -
          pokemon1.bp.atk -
          pokemon1.bp.def -
          pokemon1.bp.spa -
          pokemon1.bp.spd -
          pokemon1.bp.spe
        );
      }),
    },
    stat: {
      hp: computed(() => {
        return Math.trunc(
          ((pokemon1.hp * 2 +
            pokemon1.iv.hp +
            (pokemon1.bp.hp % 8 === 4 || pokemon1.bp.hp === 0
              ? pokemon1.bp.hp
              : pokemon1.bp.hp - 4) /
              4) *
            nt.level) /
            100 +
            10 +
            parseInt(nt.level)
        );
      }),
      atk: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon1.atk * 2 +
              pokemon1.iv.atk +
              (pokemon1.bp.atk % 8 === 4 || pokemon1.bp.atk === 0
                ? pokemon1.bp.atk
                : pokemon1.bp.atk - 4) /
                4) *
              nt.level) /
              100 +
              5
          ) * nt.atkNature
        );
      }),
      def: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon1.def * 2 +
              pokemon1.iv.def +
              (pokemon1.bp.def % 8 === 4 || pokemon1.bp.def === 0
                ? pokemon1.bp.def
                : pokemon1.bp.def - 4) /
                4) *
              nt.level) /
              100 +
              5
          ) * nt.defNature
        );
      }),
      spa: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon1.spa * 2 +
              pokemon1.iv.spa +
              (pokemon1.bp.spa % 8 === 4 || pokemon1.bp.spa === 0
                ? pokemon1.bp.spa
                : pokemon1.bp.spa - 4) /
                4) *
              nt.level) /
              100 +
              5
          ) * nt.spaNature
        );
      }),
      spd: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon1.spd * 2 +
              pokemon1.iv.spd +
              (pokemon1.bp.spd % 8 === 4 || pokemon1.bp.spd === 0
                ? pokemon1.bp.spd
                : pokemon1.bp.spd - 4) /
                4) *
              nt.level) /
              100 +
              5
          ) * nt.spdNature
        );
      }),
      spe: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon1.spe * 2 +
              pokemon1.iv.spe +
              (pokemon1.bp.spe % 8 === 4 || pokemon1.bp.spe === 0
                ? pokemon1.bp.spe
                : pokemon1.bp.spe - 4) /
                4) *
              nt.level) /
              100 +
              5
          ) * nt.speNature
        );
      }),
    },
    statModifier: {
      atkUp: 2,
      defUp: 2,
      spaUp: 2,
      spdUp: 2,
      speUp: 2,
      atkDown: 2,
      defDown: 2,
      spaDown: 2,
      spdDown: 2,
      speDown: 2,
    },
    move: {},
    condition: {
      helpingHand: false,
      burned: false,
      charge: false,
      criticalHit: false,
      powerSpot: false,
      lightScreen: false,
      reflect: false,
      steelySpirit: false,
      friendGuard: false,
    },
  });

  const pokemon2 = reactive({
    Name: "default",
    type1: "",
    type2: "",
    teraType: "None",
    typeContent: "原有屬性︰",
    teraContent: "　太晶化︰無",
    ability: "default",
    item: "default",
    hp: 100,
    atk: 100,
    def: 100,
    spa: 100,
    spd: 100,
    spe: 100,
    iv: {
      hp: 31,
      atk: 31,
      def: 31,
      spa: 31,
      spd: 31,
      spe: 31,
    },
    bp: {
      hp: 0,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
      max: computed(() => {
        return (
          508 -
          pokemon2.bp.hp -
          pokemon2.bp.atk -
          pokemon2.bp.def -
          pokemon2.bp.spa -
          pokemon2.bp.spd -
          pokemon2.bp.spe
        );
      }),
    },
    stat: {
      hp: computed(() => {
        return Math.trunc(
          ((pokemon2.hp * 2 +
            pokemon2.iv.hp +
            (pokemon2.bp.hp % 8 === 4 || pokemon2.bp.hp === 0
              ? pokemon2.bp.hp
              : pokemon2.bp.hp - 4) /
              4) *
            nt.level2) /
            100 +
            10 +
            parseInt(nt.level2)
        );
      }),
      atk: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon2.atk * 2 +
              pokemon2.iv.atk +
              (pokemon2.bp.atk % 8 === 4 || pokemon2.bp.atk === 0
                ? pokemon2.bp.atk
                : pokemon2.bp.atk - 4) /
                4) *
              nt.level2) /
              100 +
              5
          ) * nt.atkNature2
        );
      }),
      def: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon2.def * 2 +
              pokemon2.iv.def +
              (pokemon2.bp.def % 8 === 4 || pokemon2.bp.def === 0
                ? pokemon2.bp.def
                : pokemon2.bp.def - 4) /
                4) *
              nt.level2) /
              100 +
              5
          ) * nt.defNature2
        );
      }),
      spa: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon2.spa * 2 +
              pokemon2.iv.spa +
              (pokemon2.bp.spa % 8 === 4 || pokemon2.bp.spa === 0
                ? pokemon2.bp.spa
                : pokemon2.bp.spa - 4) /
                4) *
              nt.level2) /
              100 +
              5
          ) * nt.spaNature2
        );
      }),
      spd: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon2.spd * 2 +
              pokemon2.iv.spd +
              (pokemon2.bp.spd % 8 === 4 || pokemon2.bp.spd === 0
                ? pokemon2.bp.spd
                : pokemon2.bp.spd - 4) /
                4) *
              nt.level2) /
              100 +
              5
          ) * nt.spdNature2
        );
      }),
      spe: computed(() => {
        return Math.trunc(
          Math.trunc(
            ((pokemon2.spe * 2 +
              pokemon2.iv.spe +
              (pokemon2.bp.spe % 8 === 4 || pokemon2.bp.spe === 0
                ? pokemon2.bp.spe
                : pokemon2.bp.spe - 4) /
                4) *
              nt.level2) /
              100 +
              5
          ) * nt.speNature2
        );
      }),
    },
    statModifier: {
      atkUp: 2,
      defUp: 2,
      spaUp: 2,
      spdUp: 2,
      speUp: 2,
      atkDown: 2,
      defDown: 2,
      spaDown: 2,
      spdDown: 2,
      speDown: 2,
    },
    move: {},
    condition: {
      helpingHand: false,
      burned: false,
      charge: false,
      criticalHit: false,
      powerSpot: false,
      lightScreen: false,
      reflect: false,
      steelySpirit: false,
      friendGuard: false,
    },
  });

  const modifier = reactive({
    atk: (value, pm) => {
      if (pm == "pokemon1") {
        pokemon1.statModifier.atkUp = 2;
        pokemon1.statModifier.atkDown = 2;
        if (value > 0) {
          pokemon1.statModifier.atkUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon1.statModifier.atkDown = 2 - value;
        }
      } else {
        pokemon2.statModifier.atkUp = 2;
        pokemon2.statModifier.atkDown = 2;
        if (value > 0) {
          pokemon2.statModifier.atkUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon2.statModifier.atkDown = 2 - value;
        }
      }
    },
    def: (value, pm) => {
      if (pm == "pokemon1") {
        pokemon1.statModifier.defUp = 2;
        pokemon1.statModifier.defDown = 2;
        if (value > 0) {
          pokemon1.statModifier.defUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon1.statModifier.defDown = 2 - value;
        }
      } else {
        pokemon2.statModifier.defUp = 2;
        pokemon2.statModifier.defDown = 2;
        if (value > 0) {
          pokemon2.statModifier.defUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon2.statModifier.defDown = 2 - value;
        }
      }
    },
    spa: (value, pm) => {
      if (pm == "pokemon1") {
        pokemon1.statModifier.spaUp = 2;
        pokemon1.statModifier.spaDown = 2;
        if (value > 0) {
          pokemon1.statModifier.spaUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon1.statModifier.spaDown = 2 - value;
        }
        console.log(
          pokemon1.statModifier.spaUp + "\n" + pokemon1.statModifier.spaDown
        );
      } else {
        pokemon2.statModifier.spaUp = 2;
        pokemon2.statModifier.spaDown = 2;
        if (value > 0) {
          pokemon2.statModifier.spaUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon2.statModifier.spaDown = 2 - value;
        }
      }
    },
    spd: (value, pm) => {
      if (pm == "pokemon1") {
        pokemon1.statModifier.spdUp = 2;
        pokemon1.statModifier.spdDown = 2;
        if (value > 0) {
          pokemon1.statModifier.spdUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon1.statModifier.spdDown = 2 - value;
        }
      } else {
        pokemon2.statModifier.spdUp = 2;
        pokemon2.statModifier.spdDown = 2;
        if (value > 0) {
          pokemon2.statModifier.spdUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon2.statModifier.spdDown = 2 - value;
        }
      }
    },
    spe: (value, pm) => {
      if (pm == "pokemon1") {
        pokemon1.statModifier.speUp = 2;
        pokemon1.statModifier.speDown = 2;
        if (value > 0) {
          pokemon1.statModifier.speUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon1.statModifier.speDown = 2 - value;
        }
      } else {
        pokemon2.statModifier.speUp = 2;
        pokemon2.statModifier.speDown = 2;
        if (value > 0) {
          pokemon2.statModifier.speUp = 2 + parseInt(value);
        } else if (value < 0) {
          pokemon2.statModifier.speDown = 2 - value;
        }
      }
    },
  });

  const fieldCondition = reactive({
    single: true,
    double: false,
    weather: {
      sun: false,
      rain: false,
      sandstorm: false,
      snow: false,
    },
    field: {
      electric: false,
      psychic: false,
      grassy: false,
      misty: false,
    },
    aura: {
      tabletsOfRuin: false,
      swordOfRuin: false,
      vesselOfRuin: false,
      beadsOfRuin: false,
      fairyAura: false,
      darkAura: false,
    },
  });

  return {
    pokemonList,
    typeList,
    pokemon1,
    pokemon2,
    modifier,
    dt,
    fieldCondition,
  };
});
