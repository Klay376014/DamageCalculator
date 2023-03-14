import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { usePokemonStore } from "./pokemon";
import { useNatureStore } from "./nature";
import { UsePowerStore } from "./power";
import { UseAttackStore } from "./attackModifier";
import { UseDefenseStore } from "./defenseModifier";
import { UseDamageModifierStore } from "./damageModifier";

export const UseDamageStore = defineStore("damage", () => {
  const pm = usePokemonStore();
  const nt = useNatureStore();
  const pw = UsePowerStore();
  const at = UseAttackStore();
  const de = UseDefenseStore();
  const dm = UseDamageModifierStore();

  const resultContent = reactive([]);

  const st = reactive({
    //預設值待後續做變動
    atk: 100,
    def: 100,
    atkUp: 2,
    atkDown: 2,
    defUp: 2,
    defDown: 2,
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
        return 0.75;
      }
    }
    return 1;
  };

  const weatherAtk = (attacker) => {
    let moveType = pm[attacker].move.type;
    if (moveType === "Water" && pm.fieldCondition.weather.rain) {
      return 1.5;
    } else if (moveType === "Fire" && pm.fieldCondition.weather.sun) {
      return 1.5;
    } else if (moveType === "Water" && pm.fieldCondition.weather.sun) {
      if(pm[attacker].move.num === 875){
        return 1;
      }
      return 0.5;
    } else if (moveType === "Fire" && pm.fieldCondition.weather.rain) {
      return 0.5;
    } else {
      return 1;
    }
  };

  const criticalHit = (attacker) => {
    if (pm[attacker].condition.criticalHit) {
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
      if (teraType === "None") {
        return 1.5;
      } else {
        if (teraType === moveType) {
          return 2;
        } else {
          return 1.5;
        }
      }
    }

    if (pm[attacker].ability === "Pixilate") {
      if (teraType === "None") {
        if ((type1 === "Fairy" || type2 === "Fairy") && moveType === "Normal") {
          return 1.5;
        }
      } else if (teraType === "Fairy" && moveType === "Normal") {
        return 1.5;
      }
    }

    if (teraType === "None") {
      if (type1 === moveType || type2 === moveType) {
        if (pm[attacker].ability === "Adaptability") {
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
        if (pm[attacker].ability === "Adaptability") {
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
        if (teraType === moveType || type1 === moveType || type2 === moveType) {
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

    if (moveType === "Ground" && pm[attacker].item === "Iron Ball") {
      return 1;
    }

    if (pm[attacker].ability === "Pixilate") {
      moveType = "Fairy";
      if (teraType !== "None") {
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
        }else {
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
      return 1;
    }

    if(pm[attacker].ability==="Guts"){
      //毅力不減攻
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
    let dm1 = damageResult(attacker, defender, 0.85),
      dm2 = damageResult(attacker, defender, 0.86),
      dm3 = damageResult(attacker, defender, 0.87),
      dm4 = damageResult(attacker, defender, 0.88),
      dm5 = damageResult(attacker, defender, 0.89),
      dm6 = damageResult(attacker, defender, 0.9),
      dm7 = damageResult(attacker, defender, 0.91),
      dm8 = damageResult(attacker, defender, 0.92),
      dm9 = damageResult(attacker, defender, 0.93),
      dm10 = damageResult(attacker, defender, 0.94),
      dm11 = damageResult(attacker, defender, 0.95),
      dm12 = damageResult(attacker, defender, 0.96),
      dm13 = damageResult(attacker, defender, 0.97),
      dm14 = damageResult(attacker, defender, 0.98),
      dm15 = damageResult(attacker, defender, 0.99),
      dm16 = damageResult(attacker, defender, 1);

    if (dm1 / hp >= 1) {
      return "確一";
    } else if (dm16 / hp >= 1 && dm1 / hp < 1) {
      if (dm2 / hp >= 1) {
        return "亂一 (93.75%)";
      } else if (dm3 / hp >= 1) {
        return "亂一 (87.5%)";
      } else if (dm4 / hp >= 1) {
        return "亂一 (81.25%)";
      } else if (dm5 / hp >= 1) {
        return "亂一 (75%)";
      } else if (dm6 / hp >= 1) {
        return "亂一 (68.75%)";
      } else if (dm7 / hp >= 1) {
        return "亂一 (62.5%)";
      } else if (dm8 / hp >= 1) {
        return "亂一 (56.25%)";
      } else if (dm9 / hp >= 1) {
        return "亂一 (50%)";
      } else if (dm10 / hp >= 1) {
        return "亂一 (43.75%)";
      } else if (dm11 / hp >= 1) {
        return "亂一 (37.5%)";
      } else if (dm12 / hp >= 1) {
        return "亂一 (31.25%)";
      } else if (dm13 / hp >= 1) {
        return "亂一 (25%)";
      } else if (dm14 / hp >= 1) {
        return "亂一 (18.75%)";
      } else if (dm15 / hp >= 1) {
        return "亂一 (12.5%)";
      } else {
        return "亂一 (6.25%)";
      }
    } else if (dm16 / hp < 1 && dm1 / hp > 0.5) {
      return "確二";
    } else if (dm16 / hp >= 0.5 && dm1 / hp < 0.5) {
      return "亂二";
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
      }
      if (damageResult(attacker, defender, 1) == 0) {
        resultContent.unshift("似乎沒有效果...");
      } else {
        resultContent.unshift(
          `${damageResult(attacker, defender, 0.85)} ~ ${damageResult(
            attacker,
            defender,
            1
          )} (${((damageResult(attacker, defender, 0.85) / hp) * 100).toFixed(
            1
          )}% ~ ${((damageResult(attacker, defender, 1) / hp) * 100).toFixed(
            1
          )}%)　　${ohko(attacker, defender, hp)}`
        );
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
  };
});
