import { defineStore } from "pinia";
import { reactive, computed, ref } from "vue";
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
    Stellar: "虹"
  });

  const pokemon1 = reactive({
    Name: "default",
    num: 0,
    type1: "",
    type2: "",
    teraType: "None",
    typeContent: "原屬性︰",
    teraContent: "太晶化︰無",
    ability: "default",
    item: "default",
    nature: "",
    natureUp: "",
    natureDown: "",
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
    num: 0,
    type1: "",
    type2: "",
    teraType: "None",
    typeContent: "原屬性︰",
    teraContent: "太晶化︰無",
    ability: "default",
    item: "default",
    nature: "",
    natureUp: "",
    natureDown: "",
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
    single: false,
    double: true,
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

  const bpMinus = (stat, num) => {
    if (num === "pokemon1") {
      if (pokemon1.bp[stat] <= 0) {
        pokemon1.bp[stat] = 0;
      } else if (pokemon1.bp[stat] <= 4) {
        pokemon1.bp[stat] = 0;
      } else if (pokemon1.bp[stat] < 8) {
        pokemon1.bp[stat] = 4;
      } else if (pokemon1.bp[stat] > 252) {
        pokemon1.bp[stat] = 252;
      } else {
        if ((pokemon1.bp[stat] + 4) % 8 !== 0) {
          pokemon1.bp[stat] = (Math.trunc(pokemon1.bp[stat] / 8) - 1) * 8 + 4;
        } else if ((pokemon1.bp[stat] + 4) % 8 === 0) {
          pokemon1.bp[stat] = pokemon1.bp[stat] - 8;
        }
      }
    } else if (num === "pokemon2") {
      if (pokemon2.bp[stat] <= 0) {
        pokemon2.bp[stat] = 0;
      } else if (pokemon2.bp[stat] <= 4) {
        pokemon2.bp[stat] = 0;
      } else if (pokemon2.bp[stat] < 8) {
        pokemon2.bp[stat] = 4;
      } else if (pokemon2.bp[stat] > 252) {
        pokemon2.bp[stat] = 252;
      } else {
        if ((pokemon2.bp[stat] + 4) % 8 !== 0) {
          pokemon2.bp[stat] = (Math.trunc(pokemon2.bp[stat] / 8) - 1) * 8 + 4;
        } else if ((pokemon2.bp[stat] + 4) % 8 === 0) {
          pokemon2.bp[stat] = pokemon2.bp[stat] - 8;
        }
      }
    }
  };

  const bpPlus = (stat, num) => {
    if (num === "pokemon1") {
      if (pokemon1.bp[stat] < 0) {
        pokemon1.bp[stat] = 0;
      } else if (pokemon1.bp[stat] < 4) {
        pokemon1.bp[stat] = 4;
      } else if (pokemon1.bp[stat] < 12) {
        pokemon1.bp[stat] = 12;
      } else if (pokemon1.bp[stat] >= 252) {
        pokemon1.bp[stat] = 252;
      } else {
        if ((pokemon1.bp[stat] + 4) % 8 !== 0) {
          pokemon1.bp[stat] = Math.trunc(pokemon1.bp[stat] / 8) * 8 + 4;
        } else if ((pokemon1.bp[stat] + 4) % 8 === 0) {
          pokemon1.bp[stat] = pokemon1.bp[stat] + 8;
        }
      }
    } else if (num === "pokemon2") {
      if (pokemon2.bp[stat] < 0) {
        pokemon2.bp[stat] = 0;
      } else if (pokemon2.bp[stat] < 4) {
        pokemon2.bp[stat] = 4;
      } else if (pokemon2.bp[stat] < 12) {
        pokemon2.bp[stat] = 12;
      } else if (pokemon2.bp[stat] >= 252) {
        pokemon2.bp[stat] = 252;
      } else {
        if ((pokemon2.bp[stat] + 4) % 8 !== 0) {
          pokemon2.bp[stat] = Math.trunc(pokemon2.bp[stat] / 8) * 8 + 4;
        } else if ((pokemon2.bp[stat] + 4) % 8 === 0) {
          pokemon2.bp[stat] = pokemon2.bp[stat] + 8;
        }
      }
    }
  };

  const bp0 = (stat, num) => {
    if (num === "pokemon1") {
      pokemon1.bp[stat] = 0;
    } else {
      pokemon2.bp[stat] = 0;
    }
  };

  const bp252 = (stat, num) => {
    if (num === "pokemon1") {
      pokemon1.bp[stat] = 252;
    } else {
      pokemon2.bp[stat] = 252;
    }
  };

  const savePokemon = (pm) => {
    if (pm === 'pokemon1') {
      savedPokemon.value.push(
        { 
        Name: pokemon1.Name, 
        num: pokemonList[pokemon1.Name].num,
        hp: pokemon1.bp.hp,
        atk: pokemon1.bp.atk,
        def: pokemon1.bp.def,
        spa: pokemon1.bp.spa,
        spd: pokemon1.bp.spd,
        spe: pokemon1.bp.spe,
        nature: pokemon1.nature,
        plus: pokemon1.natureUp,
        minus: pokemon1.natureDown
        }
      )
    } else {
      savedPokemon.value.push(
        { 
        Name: pokemon2.Name, 
        num: pokemonList[pokemon2.Name].num,
        hp: pokemon2.bp.hp,
        atk: pokemon2.bp.atk,
        def: pokemon2.bp.def,
        spa: pokemon2.bp.spa,
        spd: pokemon2.bp.spd,
        spe: pokemon2.bp.spe,
        nature: pokemon2.nature,
        plus: pokemon2.natureUp,
        minus: pokemon2.natureDown
        }
      )
    }
    localStorage.setItem("savedPokemon", JSON.stringify(savedPokemon.value))
  }

  const loadPokemon = () => {
    savedPokemon.value = JSON.parse(localStorage.getItem("savedPokemon") || "[]")
  }

  const savedPokemon = ref([]);

  const deletePokemon = (index) =>{
    const pm = JSON.parse(JSON.stringify(savedPokemon.value))
    pm.splice(index, 1);
    localStorage.setItem("savedPokemon", JSON.stringify(pm))
    loadPokemon()
  }

  return {
    pokemonList,
    typeList,
    pokemon1,
    pokemon2,
    modifier,
    dt,
    fieldCondition,
    bpMinus,
    bpPlus,
    bp0,
    bp252,
    savePokemon,
    loadPokemon,
    deletePokemon,
    savedPokemon
  };
});
