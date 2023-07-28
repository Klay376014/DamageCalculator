<script setup>
import { useSpeedTierStore } from "../stores/speedTier";

const pms = useSpeedTierStore();
const src1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
const src2 = `.png`;

console.log(pms.newList.length);

const extremeSpeed = (spe) => {
  return Math.trunc((((spe * 2 + 31 + 63) * 50) / 100 + 5) * 1.1);
};
const fullSpeed = (spe) => {
  return Math.trunc(((spe * 2 + 31 + 63) * 50) / 100 + 5);
};
const extremeSpeedScarf = (spe) => {
  return Math.trunc(
    Math.trunc((((spe * 2 + 31 + 63) * 50) / 100 + 5) * 1.1) * 1.5
  );
};
const fullSpeedScarf = (spe) => {
  return Math.trunc((((spe * 2 + 31 + 63) * 50) / 100 + 5) * 1.5);
};
const baseSpeed = (spe) => {
  return Math.trunc(((spe * 2 + 31) * 50) / 100 + 5);
};
const slowestSpeed = (spe) => {
  return Math.trunc(((spe * 2 * 50) / 100 + 5) * 0.9);
};
</script>
<template>
  <div class="text-center mt-2 fw-bold">
    <h1>寶可夢速線表(Regulation D)</h1>
    <p>
      術語說明（以下皆為50等數值）<br />
      頂速︰252S+／滿速︰252S／無練速︰0S／底速︰0S、個體0、性格減速
    </p>
  </div>
  <div class="container-fluid">
    <table
      class="table text-white table-sm align-middle table-bordered table-hover"
    >
      <thead>
        <tr class="text-center">
          <th class="w120">寶可夢</th>
          <th>種族值</th>
          <th>頂速</th>
          <th>滿速</th>
          <th class="mw120">頂速速圍</th>
          <th class="mw120">滿速速圍</th>
          <th>無練速</th>
          <th>底速</th>
        </tr>
      </thead>
      <tbody v-for="pm in pms.newList">
        <tr class="text-center">
          <td>
            <img :src="src1 + pm[1].img + src2" height="45" width="45" />
            <br />
            {{ pm[0] }}
          </td>
          <td class="text-purple fw-bold">{{ pm[1].baseStats.spe }}</td>
          <td>{{ extremeSpeed(pm[1].baseStats.spe) }}</td>
          <td>{{ fullSpeed(pm[1].baseStats.spe) }}</td>
          <td>{{ extremeSpeedScarf(pm[1].baseStats.spe) }}</td>
          <td>{{ fullSpeedScarf(pm[1].baseStats.spe) }}</td>
          <td>{{ baseSpeed(pm[1].baseStats.spe) }}</td>
          <td>{{ slowestSpeed(pm[1].baseStats.spe) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style></style>