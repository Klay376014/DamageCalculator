import { defineStore } from "pinia";
import { UseDamageStore } from "./damage";
import { usePokemonStore } from "./pokemon";

export const UseDamageModifierStore = defineStore("dm", () => {
  const pm = usePokemonStore();
  const dm = UseDamageStore();

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
        return 0.667;
      } else {
        return 0.5;
      }
    } else if (
      pm[attacker].move.category === "Special" &&
      pm[defender].condition.lightScreen
    ) {
      if (pm.fieldCondition.double) {
        return 0.667;
      } else {
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
      return 1.5;
    }
    if (atkAbi === "Tinted Lens" && dm.typeModifier(attacker, defender) < 1) {
      return 2;
    }
    
    return 1;
  };

  const damageModifierAbility2 = (attacker, defender) => {
    let defAbi = pm[defender].ability;
    let move = pm[attacker].move;

    if (defAbi === "Fur Coat" && move.type === "Fire") {
      return 2;
    }

    if (
      defAbi === "Multiscale" ||
      (defAbi === "Fur Coat" && move.flags.contact === 1) ||
      (defAbi === "Punk Rock" && move.flags.sound === 1) ||
      (defAbi === "Ice Scales" && move.category === "Special")
    ) {
      return 0.5;
    }

    if (
      (defAbi === "Solid Rock" || defAbi === "Filter") &&
      dm.typeModifier(attacker, defender) > 1
    ) {
      return 0.75;
    }

    return 1;
  };

  const friendGuardJudge = (defender) => {
    if (pm[defender].condition.friendGuard) {
      return 0.75;
    }
    return 1;
  };

  const damageModifierItem1 = (attacker, defender) => {
    let item = pm[attacker].item;

    if (item === "Expert Belt" && dm.typeModifier(attacker, defender) > 1) {
      return 1.2;
    }

    if (item === "Life Orb") {
      return 1.3;
    }

    if (item === "Metronome-2") {
      return 1.2;
    }

    if (item === "Metronome-3") {
      return 1.4;
    }

    if (item === "Metronome-4") {
      return 1.6;
    }

    if (item === "Metronome-5") {
      return 1.8;
    }

    if (item === "Metronome-6") {
      return 2;
    }

    return 1;
  };

  const damageModifierItem2 = (attacker, defender) => {
    if (
      pm[defender].item === "Type Berry" &&
      dm.typeModifier(attacker, defender) > 1
    ) {
      return 0.5;
    }
    return 1;
  };

  return {
    damageModifier,
  };
});
