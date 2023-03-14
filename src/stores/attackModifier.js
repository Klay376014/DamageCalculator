import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";

export const UseAttackStore = defineStore("atk", () => {
  const pm = usePokemonStore();

  const atkModifier = (attacker, defender, category) => {
    let result = 1;
    let a = 100;
    let aUp = 2;
    let aDown = 2;
    let cat = "Physical";

    if (pm[attacker].move.num === 776) {
      //撲擊
      a = pm[attacker].stat.def;
      aUp = pm[attacker].statModifier.defUp;
      aDown = pm[attacker].statModifier.defDown;
    } else if (pm[attacker].move.num === 492) {
      //欺詐
      a = pm[defender].stat.atk;
      aUp = pm[defender].statModifier.atkUp;
      aDown = pm[defender].statModifier.atkDown;
    } else if (category === "Physical") {
      a = pm[attacker].stat.atk;
      aUp = pm[attacker].statModifier.atkUp;
      aDown = pm[attacker].statModifier.atkDown;
    } else if (category === "Special") {
      a = pm[attacker].stat.spa;
      aUp = pm[attacker].statModifier.spaUp;
      aDown = pm[attacker].statModifier.spaDown;
      cat = category;
    }

    let ratio = criticalJudge(attacker, aUp, aDown);

    result = Math.round(
      (Math.trunc(a * ratio) *
        Math.round(
          Math.round(
            Math.round(
              Math.round(4096 * atkModifierAbility1(attacker, defender, cat)) *
                atkModifierAbility2(attacker, defender)
            ) * atkModifierItem(attacker, cat)
          ) * atkModifierAura(attacker, cat)
        )) /
        4096 -
        0.001
    );

    return result;
  };

  const criticalJudge = (attacker, aUp, aDown) => {
    if (pm[attacker].condition.criticalHit) {
      if (aUp < aDown) {
        return 1;
      }
    }

    return aUp / aDown;
  };

  const atkModifierAbility1 = (attacker, defender, cat) => {
    let atkAbi = pm[attacker].ability;
    let atk = pm[attacker].stat.atk;
    let def = pm[attacker].stat.def;
    let spa = pm[attacker].stat.spa;
    let spd = pm[attacker].stat.spd;
    let spe = pm[attacker].stat.spe;
    let moveType = pm[attacker].move.type;

    if (atkAbi === "Quark Drive") {
      //夸克充能
      if (
        pm.fieldCondition.field.electric ||
        pm[attacker].item === "Booster Energy"
      ) {
        if (atk >= def && atk >= spa && atk >= spd && atk >= spe) {
          return 1.3;
        } else if (spa > atk && spa > def && spa >= spd && spa >= spe) {
          return 1.3;
        }
      }
    }

    if (atkAbi === "Protosynthesis") {
      //古代活性
      if (
        pm.fieldCondition.weather.sun ||
        pm[attacker].item === "Booster Energy"
      ) {
        if (atk >= def && atk >= spa && atk >= spd && atk >= spe) {
          return 1.3;
        } else if (spa > atk && spa > def && spa >= spd && spa >= spe) {
          return 1.3;
        }
      }
    }

    if (atkAbi === "Orichalcum Pulse") {
      //緋紅脈動
      if (cat === "Physical" && pm.fieldCondition.weather.sun) {
        return 1.333;
      }
    }

    if (atkAbi === "Hadron Engine") {
      //強子引擎
      if (cat === "Special" && pm.fieldCondition.field.electric) {
        return 1.333;
      }
    }

    if (
      (atkAbi === "Overgrow" && moveType === "Grass") ||
      (atkAbi === "Blaze" && moveType === "Fire") ||
      (atkAbi === "Torrent" && moveType === "Water") ||
      (atkAbi === "Swarm" && moveType === "Bug") ||
      (atkAbi === "Flash Fire" && moveType === "Fire") ||
      (atkAbi === "Solar Power" &&
        cat === "Special" &&
        pm.fieldCondition.weather.sun) ||
      (atkAbi === "Plus Minus" && cat === "Special") ||
      (atkAbi === "Guts" &&
        cat === "Physical" &&
        pm[attacker].condition.burned) ||
      (atkAbi === "Rocky Payload" && moveType === "Rock")
    ) {
      return 1.5;
    }

    if (
      ((atkAbi === "Huge Power" || atkAbi === "Pure Power") &&
        cat === "Physical") ||
      atkAbi === "Stakeout"
    ) {
      return 2;
    }
    return 1;
  };

  const atkModifierAbility2 = (attacker, defender) => {
    let defAbi = pm[defender].ability;
    let moveType = pm[attacker].move.type;

    if (
      (defAbi === "Thick Fat" && (moveType === "Fire" || moveType === "Ice")) ||
      (defAbi === "Purifying Salt" && moveType === "Ghost")
    ) {
      return 0.5;
    }

    return 1;
  };

  const atkModifierItem = (attacker, cat) => {
    let item = pm[attacker].item;
    if (
      (item === "Choice Band" && cat === "Physical") ||
      (item === "Choice Specs" && cat === "Special")
    ) {
      return 1.5;
    }
    if (item === "Light Ball" && pm[attacker].Name === "皮卡丘") {
      console.log("OK");
      return 2;
    }

    return 1;
  };

  const atkModifierAura = (attacker, cat) => {
    if (
      (cat === "Physical" ||
        pm[attacker].move.num === 776 ||
        pm[attacker].move.num === 492) &&
      pm.fieldCondition.aura.tabletsOfRuin
    ) {
      //災禍之間
      return 0.75;
    } else if (cat === "Special" && pm.fieldCondition.aura.vesselOfRuin) {
      //災禍之鼎
      return 0.75;
    } else {
      return 1;
    }
  };

  return {
    atkModifier,
  };
});
