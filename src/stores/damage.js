import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { usePokemonStore } from "./pokemon";
import { useNatureStore } from "./nature";
import { UsePowerStore } from "./power";
import { UseAttackStore } from "./attackModifier";
import { UseDefenseStore } from "./defenseModifier";
import { UseDamageModifierStore } from "./damageModifier";
import * as _ from "lodash";

export const UseDamageStore = defineStore("damage", () => {
  const pm = usePokemonStore();
  const nt = useNatureStore();
  const pw = UsePowerStore();
  const at = UseAttackStore();
  const de = UseDefenseStore();
  const dm = UseDamageModifierStore();

  const resultContent = reactive([]);
  const detailContent = reactive([]);
  const detailStat = ref({
    attacker: {
      name: "",
      atk: "",
      spe: "",
      atkUp: "",
      speUP: "",
      tera: "",
      nature: "",
      move: "",
      ability: "",
      item: "",
      helpingHand: "",
      burned: "",
      charge: "",
      criticalHit: "",
      powerSpot: "",
      steelySpirit: "",
      weather: "",
      field: "",
      tabletsOfRuin: "",
      vesselOfRuin: "",
      fairyAura: "",
      darkAura: "",
      spread: "",
    },
    defender: {
      name: "",
      hp: "",
      def: "",
      spe: "",
      defUp: "",
      speUp: "",
      tera: "",
      nature: "",
      ability: "",
      item: "",
      lightScreen: "",
      reflect: "",
      friendGuard: "",
      weather: "",
      swordOfRuin: "",
      beadsOfRuin: "",
    },
  });
  const detailDefault = ref({
    attacker: {
      name: "",
      atk: "",
      spe: "",
      atkUp: "",
      speUP: "",
      tera: "",
      nature: "",
      move: "",
      ability: "",
      item: "",
      helpingHand: "",
      burned: "",
      charge: "",
      criticalHit: "",
      powerSpot: "",
      steelySpirit: "",
      weather: "",
      field: "",
      tabletsOfRuin: "",
      vesselOfRuin: "",
      fairyAura: "",
      darkAura: "",
      spread: "",
    },
    defender: {
      name: "",
      hp: "",
      def: "",
      spe: "",
      defUp: "",
      speUp: "",
      tera: "",
      nature: "",
      ability: "",
      item: "",
      lightScreen: "",
      reflect: "",
      friendGuard: "",
      weather: "",
      swordOfRuin: "",
      beadsOfRuin: "",
    },
  });

  const attckerContent = (text) => {
    if (detailStat.value.attacker[text].length > 0) {
      return `${detailStat.value.attacker[text]} `;
    } else {
      return ``;
    }
  };
  const defenderContent = (text) => {
    if (detailStat.value.defender[text].length > 0) {
      return `${detailStat.value.defender[text]} `;
    } else {
      return ``;
    }
  };

  const detailSet = (attacker, defender) => {
    detailStat.value.attacker.move = pm[attacker].move.name;
    detailStat.value.attacker.name = pm[attacker].Name;
    detailStat.value.defender.name = pm[defender].Name;
    detailStat.value.defender.hp = pm[defender].bp.hp + "Hp";

    detailContent.unshift(
      `${detailStat.value.attacker.name + " "}${attckerContent("atkUp") //能力等級
      }${
      //努力值&性格
      detailStat.value.attacker.atk + detailStat.value.attacker.nature + " "
      }${attckerContent("tera") //太晶
      }${attckerContent("ability") //特性
      }${attckerContent("item") //道具
      }${attckerContent("weather") //天氣
      }${attckerContent("field") //場地
      }${attckerContent("helpingHand") //幫助
      }${attckerContent("criticalHit") //要害
      }${attckerContent("charge") //充電
      }${attckerContent("powerSpot") //能量點
      }${attckerContent("steelySpirit") //鋼之意志
      }${attckerContent("tabletsOfRuin") //災禍之簡
      }${attckerContent("vesselOfRuin") //災禍之鼎
      }${attckerContent("fairyAura") //妖精氣場
      }${attckerContent("darkAura") //暗黑氣場
      }${attckerContent("burned") //燒傷
      }${attckerContent("spread") //
      }${detailStat.value.attacker.move} vs ${detailStat.value.defender.name} ${defenderContent("defUp") //能力等級
      }${detailStat.value.defender.hp + " "}${
      //努力值&性格
      detailStat.value.defender.def + detailStat.value.defender.nature + " "
      }${defenderContent("tera") //太晶
      }${defenderContent("ability") //特性
      }${defenderContent("item") //道具
      }${defenderContent("weather") //天氣
      }${defenderContent("lightScreen") //光牆
      }${defenderContent("reflect") //反射壁
      }${defenderContent("friendGuard") //友情防守
      }${defenderContent("swordOfRuin") //災禍之劍
      }${defenderContent("beadsOfRuin") //災禍之玉
      }`
    );
  };

  const st = reactive({
    //預設值待後續做變動
    atk: 1,
    def: 1,
    power: 100,
  });

  const damageFormula = (attacker, defender) => {
    st.power = pw.powerModifier(attacker, defender);
    st.atk = at.atkModifier(attacker, defender, pm[attacker].move.category);
    st.def = de.defModifier(attacker, defender, pm[attacker].move.category);
    return Math.trunc(
      Math.trunc(
        (Math.trunc((nt.level * 2) / 5 + 2) * st.power * st.atk) / st.def
      ) /
      50 +
      2
    );
  };

  const spreadDamage = (attacker) => {
    let target = pm[attacker].move.target;
    if (target === "allAdjacentFoes" || target === "allAdjacent") {
      if (pm.fieldCondition.double) {
        detailStat.value.attacker.spread = "分傷";
        return 0.75;
      }
    }
    return 1;
  };

  const weatherAtk = (attacker) => {
    let moveType = pm[attacker].move.type;
    if (pm.fieldCondition.weather.rain) {
      detailStat.value.attacker.weather = "雨天";
      if (moveType === "Water") {
        return 1.5;
      } else if (moveType === "Fire") {
        return 0.5;
      }
      return 1
    } else if (pm.fieldCondition.weather.sun) {
      detailStat.value.attacker.weather = "晴天";
      if (moveType === "Water") {
        if (pm[attacker].move.num === 875) {
          return 1;
        }
        return 0.5;
      } else if (moveType === "Fire") {
        return 1.5;
      }
      return 1
    } else {
      return 1;
    }
  };

  const criticalHit = (attacker) => {
    if (pm[attacker].condition.criticalHit) {
      detailStat.value.attacker.criticalHit = "要害";
      return 1.5;
    } else {
      return 1;
    }
  };

  const sameType = (attacker) => {
    let moveType = pm[attacker].move.type,
      type1 = pm[attacker].type1,
      type2 = pm[attacker].type2,
      teraType = pm[attacker].teraType;

    if (pm[attacker].ability === "Protean") {
      detailStat.value.attacker.ability = "變幻自如";
      if (teraType === "None") {
        return 1.5;
      } else {
        if (teraType === moveType) {
          detailStat.value.attacker.tera =
            "太晶" + pm.typeList[pm[attacker].teraType];
          return 2;
        } else {
          return 1.5;
        }
      }
    }

    if (pm[attacker].ability === "Pixilate") {
      if (teraType === "None") {
        if ((type1 === "Fairy" || type2 === "Fairy") && moveType === "Normal") {
          detailStat.value.attacker.ability = "妖精皮膚";
          return 1.5;
        }
      } else if (teraType === "Fairy" && moveType === "Normal") {
        detailStat.value.attacker.ability = "妖精皮膚";
        return 1.5;
      }
    }

    if (teraType === "None") {
      if (type1 === moveType || type2 === moveType) {
        if (pm[attacker].ability === "Adaptability") {
          detailStat.value.attacker.ability = "適應力";
          return 2;
        } else {
          return 1.5;
        }
      } else {
        return 1;
      }
    } else {
      if (
        (teraType === type1 && type1 === moveType) ||
        (teraType === type2 && type2 === moveType)
      ) {
        detailStat.value.attacker.tera =
          "太晶" + pm.typeList[pm[attacker].teraType];
        if (pm[attacker].ability === "Adaptability") {
          detailStat.value.attacker.ability = "適應力";

          return 2.25;
        } else {
          return 2;
        }
      } else if (
        (teraType === type1 && type2 === moveType) ||
        (teraType === type2 && type1 === moveType)
      ) {
        return 1.5;
      } else if (teraType != type1 && teraType != type2) {
        if (teraType === moveType) {
          detailStat.value.attacker.tera =
            "太晶" + pm.typeList[pm[attacker].teraType];
          return 1.5;
        } else if (type1 === moveType || type2 === moveType) {
          return 1.5;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    }
  };

  const typeModifier = (attacker, defender) => {
    let moveType = pm[attacker].move.type,
      type1 = pm[defender].type1,
      type2 = pm[defender].type2,
      teraType = pm[defender].teraType;

    if (
      moveType === "Ground" &&
      pm[defender].item === "Iron Ball" &&
      (teraType === "Flying" ||
        (teraType === "None" && (type1 === "Flying" || type2 === "Flying")))
    ) {
      detailStat.value.defender.item = "黑色鐵球";
      return 1;
    }

    if (pm[attacker].ability === "Pixilate") {
      moveType = "Fairy";
      if (teraType !== "None") {
        detailStat.value.defender.tera =
          "太晶" + pm.typeList[pm[defender].teraType];
        return pm.dt[teraType].damageTaken[moveType];
      } else {
        if (pm[defender].type2 === "") {
          return pm.dt[type1].damageTaken[moveType];
        } else {
          return (
            pm.dt[type1].damageTaken[moveType] *
            pm.dt[type2].damageTaken[moveType]
          );
        }
      }
    }

    if (pm[attacker].move.num === 560) {
      if (teraType !== "None") {
        detailStat.value.defender.tera =
          "太晶" + pm.typeList[pm[defender].teraType];
        return (
          pm.dt[teraType].damageTaken[moveType] *
          pm.dt[teraType].damageTaken.Flying
        );
      } else {
        if (type2 === "") {
          return (
            pm.dt[type1].damageTaken[moveType] * pm.dt[type1].damageTaken.Flying
          );
        } else {
          return (
            pm.dt[type1].damageTaken[moveType] *
            pm.dt[type2].damageTaken[moveType] *
            pm.dt[type1].damageTaken.Flying *
            pm.dt[type2].damageTaken.Flying
          );
        }
      }
    }

    if (teraType !== "None") {
      detailStat.value.defender.tera =
        "太晶" + pm.typeList[pm[defender].teraType];
      if (pm[attacker].move.num === 573) {
        //冷凍乾燥判定
        if (teraType === "Water") {
          return 2;
        }
      }
      return pm.dt[teraType].damageTaken[moveType];
    } else {
      if (type2 === "") {
        if (pm[attacker].move.num === 573) {
          //冷凍乾燥判定
          if (type1 === "Water") {
            return 2;
          } else {
            return pm.dt[type1].damageTaken[moveType];
          }
        } else {
          return pm.dt[type1].damageTaken[moveType];
        }
      } else {
        if (pm[attacker].move.num === 573) {
          //冷凍乾燥判定
          if (type1 === "Water") {
            return 2 * pm.dt[type2].damageTaken[moveType];
          } else if (type2 === "Water") {
            return 2 * pm.dt[type1].damageTaken[moveType];
          } else {
            return (
              pm.dt[type1].damageTaken[moveType] *
              pm.dt[type2].damageTaken[moveType]
            );
          }
        } else {
          return (
            pm.dt[type1].damageTaken[moveType] *
            pm.dt[type2].damageTaken[moveType]
          );
        }
      }
    }
  };

  const burnedJudge = (attacker) => {
    if (pm[attacker].move.num === 263) {
      //硬撐不減攻
      detailStat.value.attacker.burned = "燒傷";
      return 1;
    }

    if (pm[attacker].ability === "Guts") {
      //毅力不減攻
      detailStat.value.attacker.burned = "燒傷";
      return 1;
    }

    if (pm[attacker].teraType === "Fire") {
      return 1;
    } else if (pm[attacker].teraType === "None") {
      if (pm[attacker].type1 === "Fire" || pm[attacker].type2 === "Fire") {
        return 1;
      }
    }

    if (
      pm[attacker].condition.burned &&
      pm[attacker].move.category === "Physical"
    ) {
      detailStat.value.attacker.burned = "燒傷";
      return 0.5;
    } else {
      return 1;
    }
  };

  const damageResult = (attacker, defender, randomNum) => {
    return Math.round(
      Math.round(
        Math.trunc(
          Math.round(
            Math.trunc(
              Math.round(
                Math.round(
                  Math.round(
                    damageFormula(attacker, defender) * spreadDamage(attacker) -
                    0.001
                  ) *
                  weatherAtk(attacker) -
                  0.001
                ) *
                criticalHit(attacker) -
                0.001
              ) * randomNum
            ) *
            sameType(attacker) -
            0.001
          ) * typeModifier(attacker, defender)
        ) *
        burnedJudge(attacker) -
        0.001
      ) *
      dm.damageModifier(attacker, defender) -
      0.001
    );
  };

  const ohko = (attacker, defender, hp) => {
    const dmgRollCounts = 16;
    const damageRolls = Array.from({ length: dmgRollCounts }, (v, i) => (85 + i) / 100).map((modifier) => damageResult(attacker, defender, modifier));
    // Find the minimum roll that ko opponent
    const minKoIndex = damageRolls.findIndex(dm => dm / hp >= 1);
    if (minKoIndex === 0) {
      return "　確一";
    } else if (minKoIndex > 0) {
      return `　亂一 (${((dmgRollCounts - minKoIndex) / dmgRollCounts) * 100}%)`;
    } else if (damageRolls[0] / hp > 0.5) {
      return "　確二";
    } else if (damageRolls[dmgRollCounts - 1] / hp >= 0.5 && damageRolls[0] / hp < 0.5) {
      return "　亂二";
    } else {
      return "";
    }
  };

  const damageCalculate = (attacker, defender) => {
    let hp = pm[defender].stat.hp;
    try {
      if (pm[attacker].Name === "default" || pm[defender].Name === "default") {
        alert("請先選擇寶可夢！");
        return false;
      }
      if (pm[attacker].move.basePower === undefined) {
        alert("請先選擇招式！");
        return false;
      }
      if (resultContent.length > 3) {
        resultContent.pop();
        detailContent.pop();
      }
      if (damageResult(attacker, defender, 1) == 0) {
        resultContent.unshift("似乎沒有效果...");
        detailContent.unshift("沒有效果！！");
      } else {
        detailStat.value = _.cloneDeep(detailDefault.value); ////每次先把詳細內容的物件清空
        resultContent.unshift(
          `${damageResult(attacker, defender, 0.85)} ~ ${damageResult(
            attacker,
            defender,
            1
          )} (${((damageResult(attacker, defender, 0.85) / hp) * 100).toFixed(
            1
          )}% ~ ${((damageResult(attacker, defender, 1) / hp) * 100).toFixed(
            1
          )}%)${ohko(attacker, defender, hp)}`
        );
        detailSet(attacker, defender);
      }
    } catch (error) {
      alert("請選擇正確的招式／寶可夢！");
      return false;
    }
  };

  return {
    damageCalculate,
    typeModifier,
    resultContent,
    detailContent,
    detailStat,
  };
});
