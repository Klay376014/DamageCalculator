import { defineStore } from "pinia";
import { useAbilityStore } from "./abilities";
import { UseDamageStore } from "./damage";
import { useItemStore } from "./items";
import { usePokemonStore } from "./pokemon";

export const UseDamageModifierStore = defineStore("dm", () => {
  const pm = usePokemonStore();
  const dm = UseDamageStore();
  const abi = useAbilityStore();
  const it = useItemStore();

  const damageModifier = (attacker, defender) => {
    return (
      Math.round(
        Math.round(
          Math.round(
            Math.round(
              Math.round(
                Math.round(
                  Math.round(4096 * wallJudge(attacker, defender)) *
                    damageModifierMove(attacker, defender)
                ) * damageModifierAbility1(attacker, defender)
              ) * damageModifierAbility2(attacker, defender)
            ) * friendGuardJudge(defender)
          ) * damageModifierItem1(attacker, defender)
        ) * damageModifierItem2(attacker, defender)
      ) / 4096
    );
  };

  const wallJudge = (attacker, defender) => {
    if (pm[attacker].condition.criticalHit) {
      return 1;
    }

    if (
      pm[attacker].move.category === "Physical" &&
      pm[defender].condition.reflect
    ) {
      if (pm.fieldCondition.double) {
        dm.detailStat.defender.reflect = "反射壁(雙打)";
        return 0.667;
      } else {
        dm.detailStat.defender.reflect = "反射壁";
        return 0.5;
      }
    } else if (
      pm[attacker].move.category === "Special" &&
      pm[defender].condition.lightScreen
    ) {
      if (pm.fieldCondition.double) {
        dm.detailStat.defender.lightScreen = "光牆(雙打)";
        return 0.667;
      } else {
        dm.detailStat.defender.lightScreen = "光牆";
        return 0.5;
      }
    } else {
      return 1;
    }
  };

  const damageModifierMove = (attacker, defender) => {
    let move = pm[attacker].move.num;

    if (move === 878 && dm.typeModifier(attacker, defender) > 1) {
      //全開猛撞
      return 1.333;
    }
    if (move === 879 && dm.typeModifier(attacker, defender) > 1) {
      //閃電猛衝
      return 1.333;
    }

    return 1;
  };

  const damageModifierAbility1 = (attacker, defender) => {
    let atkAbi = pm[attacker].ability;

    if (atkAbi === "Sniper" && pm[attacker].condition.criticalHit) {
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
      return 1.5;
    }
    if (atkAbi === "Tinted Lens" && dm.typeModifier(attacker, defender) < 1) {
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
      return 2;
    }

    return 1;
  };

  const damageModifierAbility2 = (attacker, defender) => {
    let defAbi = pm[defender].ability;
    let move = pm[attacker].move;

    if (defAbi === "Fur Coat" && move.type === "Fire") {
      dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
      return 2;
    }

    if (
      defAbi === "Multiscale" ||
      (defAbi === "Fur Coat" && move.flags.contact === 1) ||
      (defAbi === "Punk Rock" && move.flags.sound === 1) ||
      (defAbi === "Ice Scales" && move.category === "Special")
    ) {
      dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
      return 0.5;
    }

    if (
      (defAbi === "Solid Rock" || defAbi === "Filter") &&
      dm.typeModifier(attacker, defender) > 1
    ) {
      dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
      return 0.75;
    }

    return 1;
  };

  const friendGuardJudge = (defender) => {
    if (pm[defender].condition.friendGuard) {
      dm.detailStat.defender.friendGuard = "友情防守";
      return 0.75;
    }
    return 1;
  };

  const damageModifierItem1 = (attacker, defender) => {
    let item = pm[attacker].item;

    if (item === "Expert Belt" && dm.typeModifier(attacker, defender) > 1) {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.2;
    }

    if (item === "Life Orb") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.3;
    }

    if (item === "Metronome-2") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.2;
    }

    if (item === "Metronome-3") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.4;
    }

    if (item === "Metronome-4") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.6;
    }

    if (item === "Metronome-5") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.8;
    }

    if (item === "Metronome-6") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 2;
    }

    return 1;
  };

  const damageModifierItem2 = (attacker, defender) => {
    if (
      pm[defender].item === "Type Berry" &&
      dm.typeModifier(attacker, defender) > 1
    ) {
      dm.detailStat.defender.item = "屬性半減果實";
      return 0.5;
    }
    return 1;
  };

  return {
    damageModifier,
  };
});
