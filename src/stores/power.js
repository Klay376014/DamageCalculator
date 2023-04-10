import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";
import { UseBasePowerStore } from "./basePower";
import { UseDamageStore } from "./damage";
import { useAbilityStore } from "./abilities";
import { useItemStore } from "./items";

export const UsePowerStore = defineStore("power", () => {
  const pm = usePokemonStore();
  const bp = UseBasePowerStore();
  const dm = UseDamageStore();
  const abi = useAbilityStore();
  const it = useItemStore();

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
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
      return 0.75;
    } else if (atkAbi === "Supreme Overlord 1") {
      //大將1
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
      return 1.1;
    } else if (
      (atkAbi === "Pixilate" && pm[attacker].move.type === "Normal") || //妖精皮膚
      (atkAbi === "Iron Fist" && pm[attacker].move.flags.punch === 1) || //鐵拳
      (atkAbi === "Reckless" && pm[attacker].move.recoil !== undefined) || //捨身
      pm[attacker].ability === "Supreme Overlord 2" //大將2
    ) {
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
      return 1.2;
    } else if (
      atkAbi === "Rivalry" //鬥爭心同性
    ) {
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
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
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
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
      dm.detailStat.attacker.ability = abi.abilityList[atkAbi].name;
      return 1.5;
    } else {
      return 1;
    }
  };

  const powerModifierAbility2 = (attacker, defender) => {
    let defAbi = pm[defender].ability;
    if (defAbi === "Dry Skin" && pm[attacker].move.type === "Fire") {
      //乾燥皮膚
      dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
      return 1.25;
    } else if (defAbi === "Heatproof" && pm[attacker].move.type === "Fire") {
      //耐熱
      dm.detailStat.defender.ability = abi.abilityList[defAbi].name;
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
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.1;
    } else if (item === "Type Enhancing") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.2;
    } else if (item === "Normal Gem" && pm[attacker].move.type === "Normal") {
      dm.detailStat.attacker.item = it.itemList[item].name;
      return 1.3;
    } else {
      return 1;
    }
  };

  const powerModifierMove = (attacker) => {
    let move = pm[attacker].move.num;
    if (move === 797 && pm.fieldCondition.field.psychic) {
      dm.detailStat.attacker.field = "電氣場地";
      return 1.5;
    } else if (
      (move === 76 || move === 669) &&
      (pm.fieldCondition.weather.rain ||
        pm.fieldCondition.weather.sandstorm ||
        pm.fieldCondition.weather.snow)
    ) {
      return 0.5;
    } else if (move === 263 && pm[attacker].condition.burned) {
      dm.detailStat.attacker.burned = "燒傷";
      return 2;
    } else {
      return 1;
    }
  };

  const powerModifierHelpingHand = (attacker) => {
    if (pm[attacker].condition.helpingHand) {
      dm.detailStat.attacker.helpingHand = "幫助";
      return 1.5;
    } else {
      return 1;
    }
  };

  const powerModifierPowerSpot = (attacker) => {
    if (pm[attacker].condition.powerSpot) {
      dm.detailStat.attacker.powerSpot = "能量點";
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
      dm.detailStat.attacker.steelySpirit = "鋼之意志";
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
      dm.detailStat.attacker.charge = "充電";
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
      if (pm.fieldCondition.field.electric) {
        dm.detailStat.attacker.field = "電氣場地";
      } else if (pm.fieldCondition.field.psychic) {
        dm.detailStat.attacker.field = "精神場地";
      } else {
        dm.detailStat.attacker.field = "青草場地";
      }
      return 1.3;
    } else if (type === "Dragon" && pm.fieldCondition.field.misty) {
      dm.detailStat.attacker.field = "薄霧場地";
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
      if(pm.fieldCondition.aura.fairyAura){
        dm.detailStat.attacker.aura = "妖精氣場";
      }else{
        dm.detailStat.attacker.aura = "暗黑氣場";
      }
      return 1.33;
    } else {
      return 1;
    }
  };

  return {
    powerModifier,
  };
});
