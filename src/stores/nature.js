import { defineStore } from "pinia";
import { ref } from "vue";

export const useNatureStore = defineStore("nature", () => {
  const atkNature = ref(1);
  const defNature = ref(1);
  const spaNature = ref(1);
  const spdNature = ref(1);
  const speNature = ref(1);

  const atkNature2 = ref(1);
  const defNature2 = ref(1);
  const spaNature2 = ref(1);
  const spdNature2 = ref(1);
  const speNature2 = ref(1);

  const natureChange = (nature) => {
    atkNature.value = 1;
    defNature.value = 1;
    spaNature.value = 1;
    spdNature.value = 1;
    speNature.value = 1;

    if (nature == "timid") {
      speNature.value = 1.1;
      atkNature.value = 0.9;
    } else if (nature == "hasty") {
      speNature.value = 1.1;
      defNature.value = 0.9;
    } else if (nature == "jolly") {
      speNature.value = 1.1;
      spaNature.value = 0.9;
    } else if (nature == "naive") {
      speNature.value = 1.1;
      spdNature.value = 0.9;
    } else if (nature == "calm") {
      spdNature.value = 1.1;
      atkNature.value = 0.9;
    } else if (nature == "gentle") {
      spdNature.value = 1.1;
      defNature.value = 0.9;
    } else if (nature == "careful") {
      spdNature.value = 1.1;
      spaNature.value = 0.9;
    } else if (nature == "sassy") {
      spdNature.value = 1.1;
      speNature.value = 0.9;
    } else if (nature == "modest") {
      spaNature.value = 1.1;
      atkNature.value = 0.9;
    } else if (nature == "mild") {
      spaNature.value = 1.1;
      defNature.value = 0.9;
    } else if (nature == "rash") {
      spaNature.value = 1.1;
      spdNature.value = 0.9;
    } else if (nature == "quiet") {
      spaNature.value = 1.1;
      speNature.value = 0.9;
    } else if (nature == "bold") {
      defNature.value = 1.1;
      atkNature.value = 0.9;
    } else if (nature == "impish") {
      defNature.value = 1.1;
      spaNature.value = 0.9;
    } else if (nature == "lax") {
      defNature.value = 1.1;
      spdNature.value = 0.9;
    } else if (nature == "relaxed") {
      defNature.value = 1.1;
      speNature.value = 0.9;
    } else if (nature == "lonely") {
      atkNature.value = 1.1;
      defNature.value = 0.9;
    } else if (nature == "adamant") {
      atkNature.value = 1.1;
      spaNature.value = 0.9;
    } else if (nature == "naughty") {
      atkNature.value = 1.1;
      spdNature.value = 0.9;
    } else if (nature == "brave") {
      atkNature.value = 1.1;
      speNature.value = 0.9;
    }
  };

  const natureChange2 = (nature) => {
    atkNature2.value = 1;
    defNature2.value = 1;
    spaNature2.value = 1;
    spdNature2.value = 1;
    speNature2.value = 1;

    if (nature == "timid") {
      speNature2.value = 1.1;
      atkNature2.value = 0.9;
    } else if (nature == "hasty") {
      speNature2.value = 1.1;
      defNature2.value = 0.9;
    } else if (nature == "jolly") {
      speNature2.value = 1.1;
      spaNature2.value = 0.9;
    } else if (nature == "naive") {
      speNature2.value = 1.1;
      spdNature2.value = 0.9;
    } else if (nature == "calm") {
      spdNature2.value = 1.1;
      atkNature2.value = 0.9;
    } else if (nature == "gentle") {
      spdNature2.value = 1.1;
      defNature2.value = 0.9;
    } else if (nature == "careful") {
      spdNature2.value = 1.1;
      spaNature2.value = 0.9;
    } else if (nature == "sassy") {
      spdNature2.value = 1.1;
      speNature2.value = 0.9;
    } else if (nature == "modest") {
      spaNature2.value = 1.1;
      atkNature2.value = 0.9;
    } else if (nature == "mild") {
      spaNature2.value = 1.1;
      defNature2.value = 0.9;
    } else if (nature == "rash") {
      spaNature2.value = 1.1;
      spdNature2.value = 0.9;
    } else if (nature == "quiet") {
      spaNature2.value = 1.1;
      speNature2.value = 0.9;
    } else if (nature == "bold") {
      defNature2.value = 1.1;
      atkNature2.value = 0.9;
    } else if (nature == "impish") {
      defNature2.value = 1.1;
      spaNature2.value = 0.9;
    } else if (nature == "lax") {
      defNature2.value = 1.1;
      spdNature2.value = 0.9;
    } else if (nature == "relaxed") {
      defNature2.value = 1.1;
      speNature2.value = 0.9;
    } else if (nature == "lonely") {
      atkNature2.value = 1.1;
      defNature2.value = 0.9;
    } else if (nature == "adamant") {
      atkNature2.value = 1.1;
      spaNature2.value = 0.9;
    } else if (nature == "naughty") {
      atkNature2.value = 1.1;
      spdNature2.value = 0.9;
    } else if (nature == "brave") {
      atkNature2.value = 1.1;
      speNature2.value = 0.9;
    }
  };

  
  const level = ref(50);
  const level2 = ref(50);

  const levelChange = (newLevel) => {
    level.value = newLevel;
  };
  const levelChange2 = (newLevel) => {
    level2.value = newLevel;
  };

  return {
    atkNature,
    defNature,
    spaNature,
    spdNature,
    speNature,
    natureChange,
    atkNature2,
    defNature2,
    spaNature2,
    spdNature2,
    speNature2,
    natureChange2,
    level,
    levelChange,
    level2,
    levelChange2,
  };
});
