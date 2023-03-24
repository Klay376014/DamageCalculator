import { defineStore } from "pinia";
import { usePokemonStore } from "./pokemon";

export const UseBasePowerStore = defineStore("basePower", () => {
  const pm = usePokemonStore();

  const basePowerModifier = (attacker, defender, move) => {
    let atkSpe = Math.round(
      (Math.trunc(
        (pm[attacker].stat.spe * pm[attacker].statModifier.speUp) /
          pm[attacker].statModifier.speDown
      ) *
        (4096 * itemModifier(attacker))) /
        4096 -
        0.001
    );
    let defSpe = Math.round(
      (Math.trunc(
        (pm[defender].stat.spe * pm[defender].statModifier.speUp) /
          pm[defender].statModifier.speDown
      ) *
        (4096 * itemModifier(defender))) /
        4096 -
        0.001
    );
    let aw =
      pm.pokemonList[pm[attacker].Name].weightkg * weightAbility(attacker);
    let dw =
      pm.pokemonList[pm[defender].Name].weightkg * weightAbility(defender);

    if (move.num === 875) {
      //水蒸氣
      if (pm.fieldCondition.weather.sun) {
        return 120;
      }
    }

    if (move.num === 876) {
      //精神劍
      if (pm.fieldCondition.field.electric) {
        return 120;
      }
    }

    if (move.num === 500 || move.num === 681) {
      //囂張&輔助力量
      let count = 1;
      if (pm[attacker].statModifier.atkUp > 2) {
        count += pm[attacker].statModifier.atkUp - 2;
      }
      if (pm[attacker].statModifier.defUp > 2) {
        count += pm[attacker].statModifier.defUp - 2;
      }
      if (pm[attacker].statModifier.spaUp > 2) {
        count += pm[attacker].statModifier.spaUp - 2;
      }
      if (pm[attacker].statModifier.spdUp > 2) {
        count += pm[attacker].statModifier.spdUp - 2;
      }
      if (pm[attacker].statModifier.speUp > 2) {
        count += pm[attacker].statModifier.speUp - 2;
      }
      return 20 * count;
    }

    if (move.num === 486) {
      //電球

      if (atkSpe / defSpe >= 4) {
        return 150;
      } else if (atkSpe / defSpe >= 3) {
        return 120;
      } else if (atkSpe / defSpe >= 2) {
        return 80;
      } else if (atkSpe / defSpe >= 1) {
        return 60;
      } else {
        return 40;
      }
    }

    if (move.num === 360) {
      //陀螺球
      let pw = Math.trunc((25 * defSpe) / atkSpe) + 1;
      if (pw > 150) {
        return 150;
      } else {
        return pw;
      }
    }

    if (move.num === 447 || move.num === 67) {
      //打草結、踢倒
      if (dw >= 200) {
        return 120;
      } else if (dw >= 100) {
        return 100;
      } else if (dw >= 50) {
        return 80;
      } else if (dw >= 25) {
        return 60;
      } else if (dw >= 100) {
        return 40;
      } else {
        return 20;
      }
    }

    if (move.num === 535 || move.num === 484) {
      //重磅衝撞、高溫重壓
      if (aw / dw >= 5) {
        return 120;
      } else if (aw / dw >= 4) {
        return 100;
      } else if (aw / dw >= 3) {
        return 80;
      } else if (aw / dw >= 2) {
        return 60;
      } else {
        return 40;
      }
    }

    if (move.num === 311) {
      if (pm.fieldCondition.weather.sun) {
        pm[attacker].move.type = "Fire";
        return 100;
      } else if (pm.fieldCondition.weather.rain) {
        pm[attacker].move.type = "Water";
        return 100;
      } else if (pm.fieldCondition.weather.snow) {
        pm[attacker].move.type = "Ice";
        return 100;
      } else if (pm.fieldCondition.weather.sandstorm) {
        pm[attacker].move.type = "Rock";
        return 100;
      }
    }

    if (move.num === 805) {
      if (pm.fieldCondition.field.electric) {
        pm[attacker].move.type = "Electric";
        return 100;
      } else if (pm.fieldCondition.field.grassy) {
        pm[attacker].move.type = "Grass";
        return 100;
      } else if (pm.fieldCondition.field.misty) {
        pm[attacker].move.type = "Fairy";
        return 100;
      } else if (pm.fieldCondition.field.psychic) {
        pm[attacker].move.type = "Psychic";
        return 100;
      }
    }

    if (move.num === 851) {
      //太晶爆發
      let atkUp = pm[attacker].statModifier.atkUp;
      let atkDown = pm[attacker].statModifier.atkDown;
      let spaUp = pm[attacker].statModifier.spaUp;
      let spaDown = pm[attacker].statModifier.spaDown;
      let atk = Math.trunc((pm[attacker].stat.atk * atkUp) / atkDown);
      let spa = Math.trunc((pm[attacker].stat.spa * spaUp) / spaDown);
      if (pm[attacker].teraType !== "None") {
        if (atk > spa) {
          pm[attacker].move.category = "Physical";
          pm[attacker].move.type = pm[attacker].teraType;
        } else {
          pm[attacker].move.category = "Special";
          pm[attacker].move.type = pm[attacker].teraType;
        }
      }
    }

    return move.basePower;
  };

  const itemModifier = (num) => {
    let item = pm[num].item;
    if (item === "Choice Scarf") {
      return 1.5;
    } else if (item === "Iron Ball") {
      return 0.5;
    } else {
      return 1;
    }
  };

  const weightAbility = (num) => {
    let abi = pm[num].ability;
    if (abi === "Heavy Metal") {
      return 2;
    } else if (abi === "Light Metal") {
      return 0.5;
    } else {
      return 1;
    }
  };

  return {
    basePowerModifier,
  };
});
