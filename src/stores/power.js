import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";
import { UseBasePowerStore } from "./basePower";

export const UsePowerStore = defineStore("power", () => {
  const pm = usePokemonStore();
  const bp = UseBasePowerStore();

  const powerModifier = (attacker, defender) => {
    let a = Math.round(
      (bp.basePowerModifier(attacker, defender, pm[attacker].move) *
        Math.round(
          Math.round(
            Math.round(
              Math.round(
                Math.round(
                  Math.round(
                    Math.round(
                      Math.round(
                        Math.round(
                          Math.round(4096 * powerModifierAbility(attacker)) *
                            powerModifierAbility2(attacker, defender)
                        ) * powerModifierItem(attacker)
                      ) * powerModifierMove(attacker)
                    ) * powerModifierHelpingHand(attacker)
                  ) * powerModifierPowerSpot(attacker)
                ) * powerModifierSteelySpirit(attacker)
              ) * powerModifierCharge(attacker)
            ) * powerModifierField(attacker)
          ) * powerModifierAura(attacker)
        )) /
        4096 -
        0.001
    );
    if (pm[attacker].teraType === pm[attacker].move.type) {
      if (
        a < 60 &&
        (!pm[attacker].move.multihit ||
          pm[attacker].move.priority < 1 ||
          pm[attacker].move.num !== 512)
      ) {
        console.log("太晶加成!");
        return 60;
      } else {
        return a;
      }
    } else {
      return a;
    }
  };

  const powerModifierAbility = (attacker) => {
    let atkAbi = pm[attacker].ability;
    if (atkAbi === "Rivalry-opposite") {
      //鬥爭心異性
      return 0.75;
    } else if (atkAbi === "Supreme Overlord 1") {
      //大將1
      return 1.1;
    } else if (
      (atkAbi === "Pixilate" && pm[attacker].move.type === "Normal") || //妖精皮膚
      (atkAbi === "Iron Fist" && pm[attacker].move.flags.punch === 1) || //鐵拳
      (atkAbi === "Reckless" && pm[attacker].move.recoil !== undefined) || //捨身
      pm[attacker].ability === "Supreme Overlord 2" //大將2
    ) {
      return 1.2;
    } else if (
      atkAbi === "Rivalry" //鬥爭心同性
    ) {
      return 1.25;
    } else if (
      atkAbi === "Analytic" || //分析
      (atkAbi === "Sheer Force" && pm[attacker].move.secondary !== null) || //強行
      (atkAbi === "Sheer Force" &&
        pm[attacker].move.secondaries !== undefined) ||
      (atkAbi === "Tough Claws" && pm[attacker].move.flags.contact === 1) || //硬爪
      (atkAbi === "Sand Force" && //沙之力
        pm.fieldCondition.weather.sandstorm === true &&
        (pm[attacker].move.type === "Ground" ||
          pm[attacker].move.type === "Rock" ||
          pm[attacker].move.type === "Steel")) ||
      atkAbi === "Supreme Overlord 3" || //大將3
      (atkAbi === "Punk Rock" && pm[attacker].move.flags.sound === 1) //龐克搖滾
    ) {
      return 1.3;
    } else if (
      (atkAbi === "Sharpness" && pm[attacker].move.flags.slicing === 1) || //鋒銳
      (atkAbi === "Technician" && pm[attacker].move.basePower <= 60) || //技術高手
      (atkAbi === "Strong Jaw" && pm[attacker].move.flags.bite === 1) || //強壯之顎
      (atkAbi === "Mega Launcher" && pm[attacker].move.flags.pulse === 1) || //超級發射器
      (atkAbi === "Flare Boost" && //受熱激升
        pm[attacker].condition.burned &&
        pm[attacker].move.category === "Special") ||
      (atkAbi === "Toxic Boost" && pm[attacker].move.category === "Physical") //中毒激升
    ) {
      return 1.5;
    } else {
      return 1;
    }
  };

  const powerModifierAbility2 = (attacker, defender) => {
    let defAbi = pm[defender].ability;
    if (defAbi === "Dry Skin" && pm[attacker].move.type === "Fire") {
      //乾燥皮膚
      return 1.25;
    } else if (defAbi === "Heatproof" && pm[attacker].move.type === "Fire") {
      //耐熱
      return 0.5;
    } else {
      return 1;
    }
  };

  const powerModifierItem = (attacker) => {
    let item = pm[attacker].item;
    let category = pm[attacker].move.category;
    if (
      (item === "Muscle Band" && category === "Physical") ||
      (item === "Wise Glasses" && category === "Special") ||
      (item === "Punching Glove" && pm[attacker].move.flags.punch === 1)
    ) {
      return 1.1;
    } else if (item === "Type Enhancing") {
      return 1.2;
    } else if (item === "Normal Gem" && pm[attacker].move.type === "Normal") {
      return 1.3;
    } else {
      return 1;
    }
  };

  const powerModifierMove = (attacker) => {
    let move = pm[attacker].move.num;
    if (move === 797 && pm.fieldCondition.field.psychic) {
      return 1.5;
    } else if (
      (move === 76 || move === 669) &&
      (pm.fieldCondition.weather.rain ||
        pm.fieldCondition.weather.sandstorm ||
        pm.fieldCondition.weather.snow)
    ) {
      return 0.5;
    } else if (move === 263 && pm[attacker].condition.burned) {
      return 2;
    } else {
      return 1;
    }
  };

  const powerModifierHelpingHand = (attacker) => {
    if (pm[attacker].condition.helpingHand) {
      return 1.5;
    } else {
      return 1;
    }
  };

  const powerModifierPowerSpot = (attacker) => {
    if (pm[attacker].condition.powerSpot) {
      return 1.3;
    } else {
      return 1;
    }
  };

  const powerModifierSteelySpirit = (attacker) => {
    if (
      pm[attacker].condition.steelySpirit &&
      pm[attacker].move.type === "Steel"
    ) {
      return 1.5;
    } else {
      return 1;
    }
  };

  const powerModifierCharge = (attacker) => {
    if (
      (pm[attacker].condition.charge ||
        pm[attacker].ability === "Electromorphosis" ||
        pm[attacker].ability === "Wind Power") &&
      pm[attacker].move.type === "Electric"
    ) {
      return 2;
    } else {
      return 1;
    }
  };

  const powerModifierField = (attacker) => {
    let type = pm[attacker].move.type;
    if (
      (type === "Electric" && pm.fieldCondition.field.electric) ||
      (type === "Psychic" && pm.fieldCondition.field.psychic) ||
      (type === "Grass" && pm.fieldCondition.field.grassy)
    ) {
      return 1.3;
    } else if (type === "Dragon" && pm.fieldCondition.field.misty) {
      return 0.5;
    } else {
      return 1;
    }
  };

  const powerModifierAura = (attacker) => {
    let type = pm[attacker].move.type;
    if (
      (type === "Fairy" && pm.fieldCondition.aura.fairyAura) ||
      (type === "Dark" && pm.fieldCondition.aura.darkAura)
    ) {
      return 1.33;
    } else {
      return 1;
    }
  };

  return {
    powerModifier,
  };
});
