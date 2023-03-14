import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";

export const UseDefenseStore = defineStore("def", () => {
  const pm = usePokemonStore();

  const defModifier = (attacker, defender, category) => {
    let result = 1;
    let d = 100;
    let dUp = 2;
    let dDown = 2;
    let cat = "Physical";

    if (category === "Physical" || pm[attacker].move.num === 473) {
      d = pm[defender].stat.def;
      dUp = pm[defender].statModifier.defUp;
      dDown = pm[defender].statModifier.defDown;
    } else if (category === "Special") {
      d = pm[defender].stat.spd;
      dUp = pm[defender].statModifier.spdUp;
      dDown = pm[defender].statModifier.spdDown;
      cat = category;
    }

    let ratio = criticalJudge(attacker, dUp, dDown);

    result = Math.round(
      (Math.trunc(d * (pm[attacker].move.num === 533 ? 1 : ratio)) *
        Math.round(
          Math.round(
            Math.round(
              Math.trunc(4096 * weatherDef(defender, cat)) *
                defModifierAbility(defender, cat)
            ) * defModifierItem(defender, cat)
          ) * defModifierAura(attacker, cat)
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
        return 1.5;
      } else if (
        cat === "Special" &&
        pm[defender].teraType == "Rock" &&
        pm.fieldCondition.weather.sandstorm
      ) {
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
        return 1.5;
      } else if (
        cat === "Special" &&
        (pm[defender].type1 == "Rock" || pm[defender].type2 == "Rock") &&
        pm.fieldCondition.weather.sandstorm
      ) {
        return 1.5;
      } else {
        return 1;
      }
    }
  };

  const defModifierAbility = (defender, cat) => {
    let defAbi = pm[defender].ability;
    let atk = pm[defender].stat.atk;
    let def = pm[defender].stat.def;
    let spa = pm[defender].stat.spa;
    let spd = pm[defender].stat.spd;
    let spe = pm[defender].stat.spe;

    if (defAbi === "Fur Coat" && cat === "Physical") {
      //毛皮大衣
      return 2;
    }

    if (defAbi === "Quark Drive") {
      //夸克充能
      if (
        pm.fieldCondition.field.electric ||
        pm[defender].item === "Booster Energy"
      ) {
        if (def > atk && def >= spa && def >= spd && def >= spe) {
          return 1.3;
        } else if (spd > atk && spd > def && spd > spa && spd >= spe) {
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
          return 1.3;
        } else if (spd > atk && spd > def && spd > spa && spd >= spe) {
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
      (item === "Eviolite" && pm[defender].evos !== undefined) //進化奇石
    ) {
      return 1.5;
    }
    return 1;
  };

  const defModifierAura = (attacker, cat) => {
    if (
      (cat === "Physical" || pm[attacker].move.num === 473) &&
      pm.fieldCondition.aura.swordOfRuin
    ) {
      //災禍之間
      return 0.75;
    } else if (cat === "Special" && pm.fieldCondition.aura.beadsOfRuin) {
      //災禍之鼎
      return 0.75;
    } else {
      return 1;
    }
  };

  return {
    defModifier,
  };
});
