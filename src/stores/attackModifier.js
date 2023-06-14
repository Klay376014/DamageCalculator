import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";
import { UseDamageStore } from "./damage";
import { useNatureStore } from "./nature";
import { useAbilityStore } from "./abilities";
import { useItemStore } from "./items";

export const UseAttackStore = defineStore("atk", () => {
  const pm = usePokemonStore();
  const dm = UseDamageStore();
  const nt = useNatureStore();
  const abi = useAbilityStore();
  const it = useItemStore();

  const atkModifier = (attacker, defender, category) => {
    let result = 1;
    let a = 100;
    let aUp = 2;
    let aDown = 2;
    let cat = "Physical";

    if (pm[attacker].move.num === 776) {
      //撲擊
      a = pm[attacker].stat.def;
      dm.detailStat.attacker.atk = pm[attacker].bp.def + "Def";
      if (attacker === "pokemon1") {
        if (nt.defNature > 1) {
          dm.detailStat.attacker.nature = "+";
        } else if (nt.defNature < 1) {
          dm.detailStat.attacker.nature = "-";
        }
      } else {
        if (nt.defNature2 > 1) {
          dm.detailStat.attacker.nature = "+";
        } else if (nt.defNature2 < 1) {
          dm.detailStat.attacker.nature = "-";
        }
      }
      aUp = pm[attacker].statModifier.defUp;
      aDown = pm[attacker].statModifier.defDown;
    } else if (pm[attacker].move.num === 492) {
      //欺詐
      a = pm[defender].stat.atk;
      dm.detailStat.attacker.atk = pm[defender].bp.atk + "Atk";
      if (attacker === "pokemon1") {
        if (nt.atkNature2 > 1) {
          dm.detailStat.attacker.nature = "+";
        } else if (nt.atkNature2 < 1) {
          dm.detailStat.attacker.nature = "-";
        }
      } else {
        if (nt.atkNature > 1) {
          dm.detailStat.attacker.nature = "+";
        } else if (nt.atkNature < 1) {
          dm.detailStat.attacker.nature = "-";
        }
      }
      aUp = pm[defender].statModifier.atkUp;
      aDown = pm[defender].statModifier.atkDown;
    } else if (category === "Physical") {
      a = pm[attacker].stat.atk;
      dm.detailStat.attacker.atk = pm[attacker].bp.atk + "Atk";
      if (attacker === "pokemon1") {
        if (nt.atkNature > 1) {
          dm.detailStat.attacker.nature = "+";
        } else if (nt.atkNature < 1) {
          dm.detailStat.attacker.nature = "-";
        }
      } else {
        if (nt.atkNature2 > 1) {
          dm.detailStat.attacker.nature = "+";
        } else if (nt.atkNature2 < 1) {
          dm.detailStat.attacker.nature = "-";
        }
      }
      aUp = pm[attacker].statModifier.atkUp;
      aDown = pm[attacker].statModifier.atkDown;
    } else if (category === "Special") {
      a = pm[attacker].stat.spa;
      dm.detailStat.attacker.atk = pm[attacker].bp.spa + "Spa";
      if (attacker === "pokemon1") {
        if (nt.spaNature > 1) {
          dm.detailStat.attacker.nature = "+";
        } else if (nt.spaNature < 1) {
          dm.detailStat.attacker.nature = "-";
        }
      } else {
        if (nt.spaNature2 > 1) {
          dm.detailStat.attacker.nature = "+";
        } else if (nt.spaNature2 < 1) {
          dm.detailStat.attacker.nature = "-";
        }
      }
      aUp = pm[attacker].statModifier.spaUp;
      aDown = pm[attacker].statModifier.spaDown;
      cat = category;
    }

    if (aUp > 2) {
      dm.detailStat.attacker.atkUp = "+" + (aUp - 2);
    } else if (aDown > 2) {
      dm.detailStat.attacker.atkUp = (2 - aDown).toString();
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
          if (cat === "Physical") {
            dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
          }
          return 1.3;
        } else if (spa > atk && spa > def && spa >= spd && spa >= spe) {
          if (cat === "Special") {
            dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
          }
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
          if (cat === "Physical") {
            dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
          }
          return 1.3;
        } else if (spa > atk && spa > def && spa >= spd && spa >= spe) {
          if (cat === "Special") {
            dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
          }
          return 1.3;
        }
      }
    }

    if (atkAbi === "Orichalcum Pulse") {
      //緋紅脈動
      if (cat === "Physical" && pm.fieldCondition.weather.sun) {
        dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
        return 1.333;
      }
    }

    if (atkAbi === "Hadron Engine") {
      //強子引擎
      if (cat === "Special" && pm.fieldCondition.field.electric) {
        dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
        return 1.333;
      }
    }

    if (atkAbi === "Transistor" && moveType === "Electric") {
      return 1.333;
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
      (atkAbi === "Rocky Payload" && moveType === "Rock") ||
      (atkAbi === "Dragon's Maw" && moveType === "Dragon")
    ) {
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
      return 1.5;
    }

    if (
      ((atkAbi === "Huge Power" || atkAbi === "Pure Power") &&
        cat === "Physical") ||
      atkAbi === "Stakeout"
    ) {
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
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
      dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
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
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.5;
    }
    if (item === "Light Ball" && pm[attacker].Name === "皮卡丘") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 2;
    }

    return 1;
  };

  const atkModifierAura = (attacker, cat) => {
    if (
      (cat === "Physical" ||
        pm[attacker].move.num === 776 ||
        pm[attacker].move.num === 492) &&
      pm.fieldCondition.aura.tabletsOfRuin &&
      (pm[attacker].Name !== "古簡蝸" ||
        (pm[attacker].Name === "古簡蝸" && pm[attacker].ability !== "default"))
    ) {
      //災禍之簡
      dm.detailStat.attacker.tabletsOfRuin = "災禍之簡";
      return 0.75;
    } else if (
      cat === "Special" &&
      pm.fieldCondition.aura.vesselOfRuin &&
      (pm[attacker].Name !== "古鼎鹿" ||
        (pm[attacker].Name === "古鼎鹿" && pm[attacker].ability !== "default"))
    ) {
      //災禍之鼎
      dm.detailStat.attacker.vesselOfRuin = "災禍之鼎";
      return 0.75;
    } else {
      return 1;
    }
  };

  return {
    atkModifier,
  };
});
