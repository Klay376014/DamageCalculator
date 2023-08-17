import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";
import { UseDamageStore } from "./damage";
import { useNatureStore } from "./nature";
import { useAbilityStore } from "./abilities";
import { useItemStore } from "./items";

export const UseDefenseStore = defineStore("def", () => {
  const pm = usePokemonStore();
  const dm = UseDamageStore();
  const nt = useNatureStore();
  const abi = useAbilityStore();
  const it = useItemStore();

  const defModifier = (attacker, defender, category) => {
    let result = 1;
    let d = 100;
    let dUp = 2;
    let dDown = 2;
    let cat = "Physical";

    if (category === "Physical" || pm[attacker].move.num === 473 || pm[attacker].move.num === 540) {
      d = pm[defender].stat.def;
      dm.detailStat.defender.def = pm[defender].bp.def + "Def";
      if (attacker === "pokemon1") {
        if (nt.defNature2 > 1) {
          dm.detailStat.defender.nature = "+";
        } else if (nt.defNature2 < 1) {
          dm.detailStat.defender.nature = "-";
        }
      } else {
        if (nt.defNature > 1) {
          dm.detailStat.defender.nature = "+";
        } else if (nt.defNature < 1) {
          dm.detailStat.defender.nature = "-";
        }
      }
      dUp = pm[defender].statModifier.defUp;
      dDown = pm[defender].statModifier.defDown;
    } else if (category === "Special") {
      d = pm[defender].stat.spd;
      dm.detailStat.defender.def = pm[defender].bp.spd + "Spd";
      if (attacker === "pokemon1") {
        if (nt.spdNature2 > 1) {
          dm.detailStat.defender.nature = "+";
        } else if (nt.spdNature2 < 1) {
          dm.detailStat.defender.nature = "-";
        }
      } else {
        if (nt.spdNature > 1) {
          dm.detailStat.defender.nature = "+";
        } else if (nt.spdNature < 1) {
          dm.detailStat.defender.nature = "-";
        }
      }
      dUp = pm[defender].statModifier.spdUp;
      dDown = pm[defender].statModifier.spdDown;
      cat = category;
    }
    if (dUp > 2) {
      dm.detailStat.defender.defUp = "+" + (dUp - 2);
    } else if (dDown > 2) {
      dm.detailStat.defender.defUp = (2 - dDown).toString();
    }

    let ratio = criticalJudge(attacker, dUp, dDown);

    result = Math.round(
      (Math.trunc(d * (pm[attacker].move.num === 533 ? 1 : ratio)) *
        Math.round(
          Math.round(
            Math.round(
              Math.trunc(4096 * weatherDef(defender, cat)) *
                defModifierAbility(attacker, defender, cat)
            ) * defModifierItem(defender, cat)
          ) * defModifierAura(attacker, defender, cat)
        )) /
        4096 -
        0.001
    );

    return result;
  };

  const criticalJudge = (attacker, dUp, dDown) => {
    if (pm[attacker].condition.criticalHit) {
      if (dUp > dDown) {
        return 1;
      }
    }

    return dUp / dDown;
  };

  const weatherDef = (defender, cat) => {
    if (pm[defender].teraType !== "None") {
      if (
        cat === "Physical" &&
        pm[defender].teraType == "Ice" &&
        pm.fieldCondition.weather.snow
      ) {
        dm.detailStat.defender.weather = "下雪";
        return 1.5;
      } else if (
        cat === "Special" &&
        pm[defender].teraType == "Rock" &&
        pm.fieldCondition.weather.sandstorm
      ) {
        dm.detailStat.defender.weather = "沙暴";
        return 1.5;
      } else {
        return 1;
      }
    } else {
      if (
        cat === "Physical" &&
        (pm[defender].type1 == "Ice" || pm[defender].type2 == "Ice") &&
        pm.fieldCondition.weather.snow
      ) {
        dm.detailStat.defender.weather = "下雪";
        return 1.5;
      } else if (
        cat === "Special" &&
        (pm[defender].type1 == "Rock" || pm[defender].type2 == "Rock") &&
        pm.fieldCondition.weather.sandstorm
      ) {
        dm.detailStat.defender.weather = "沙暴";
        return 1.5;
      } else {
        return 1;
      }
    }
  };

  const defModifierAbility = (attacker, defender, cat) => {
    let defAbi = pm[defender].ability;
    let atk = pm[defender].stat.atk;
    let def = pm[defender].stat.def;
    let spa = pm[defender].stat.spa;
    let spd = pm[defender].stat.spd;
    let spe = pm[defender].stat.spe;

    if (defAbi === "Fur Coat" && cat === "Physical") {
      //毛皮大衣
      dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
      return 2;
    }

    if (defAbi === "Quark Drive") {
      //夸克充能
      if (
        pm.fieldCondition.field.electric ||
        pm[defender].item === "Booster Energy"
      ) {
        if (def > atk && def >= spa && def >= spd && def >= spe) {
          if (cat === "Physical" || pm[attacker].move.num === 473 || pm[attacker].move.num === 540) {
            dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
          }
          return 1.3;
        } else if (spd > atk && spd > def && spd > spa && spd >= spe) {
          if (cat === "Special") {
            dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
          }
          return 1.3;
        }
      }
    }

    if (defAbi === "Protosynthesis") {
      //古代活性
      if (
        pm.fieldCondition.weather.sun ||
        pm[defender].item === "Booster Energy"
      ) {
        if (def > atk && def >= spa && def >= spd && def >= spe) {
          if (cat === "Physical" || pm[attacker].move.num === 473 || pm[attacker].move.num === 540) {
            dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
          }
          return 1.3;
        } else if (spd > atk && spd > def && spd > spa && spd >= spe) {
          if (cat === "Special") {
            dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
          }
          return 1.3;
        }
      }
    }

    return 1;
  };

  const defModifierItem = (defender, cat) => {
    let item = pm[defender].item;
    if (
      (item === "Assault Vest" && cat === "Special") || //突擊背心
      (item === "Eviolite" &&
        pm.pokemonList[pm[defender].Name].evos !== undefined) //進化奇石
    ) {
      dm.detailStat.defender.item = it.itemList[item].name;
      return 1.5;
    }
    return 1;
  };

  const defModifierAura = (attacker, defender, cat) => {
    if (
      (cat === "Physical" || pm[attacker].move.num === 473 || pm[attacker].move.num === 540) &&
      pm.fieldCondition.aura.swordOfRuin &&
      (pm[defender].Name !== "古劍豹" ||
        (pm[defender].Name === "古劍豹" && pm[defender].ability !== "default"))
    ) {
      //災禍之劍
      dm.detailStat.defender.swordOfRuin = "災禍之劍"
      return 0.75;
    } else if (
      cat === "Special" &&
      pm.fieldCondition.aura.beadsOfRuin &&
      (pm[defender].Name !== "古玉魚" ||
        (pm[defender].Name === "古玉魚" && pm[defender].ability !== "default"))
    ) {
      //災禍之玉
      dm.detailStat.defender.beadsOfRuin = "災禍之玉"
      return 0.75;
    } else {
      return 1;
    }
  };

  return {
    defModifier,
  };
});
