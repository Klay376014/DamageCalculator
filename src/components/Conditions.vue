<script setup>
import { usePokemonStore } from "../stores/pokemon";
const props = defineProps({ pokemonNum: String });

const pm = usePokemonStore();

const setCondition = (val) => {
  pm[props.pokemonNum].condition[val] = !pm[props.pokemonNum].condition[val];
};
</script>
<template>
  <div class="condition px-1 d-flex justify-content-between flex-wrap mb-3">
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        role="switch"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'HelpingHand'"
        @click="setCondition('helpingHand')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'HelpingHand'"
        >幫助</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'Burned'"
        @click="setCondition('burned')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'Burned'"
        >燒傷</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'Charge'"
        @click="setCondition('charge')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'Charge'"
        >充電</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'CriticalHit'"
        @click="setCondition('criticalHit')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'CriticalHit'"
        >要害</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'PowerSpot'"
        @click="setCondition('powerSpot')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'PowerSpot'"
        >能量點</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'LightScreen'"
        @click="setCondition('lightScreen')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'lightScreen'"
        >光牆</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'Reflect'"
        @click="setCondition('reflect')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'Reflect'"
        >反射壁</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'SteelySpirit'"
        @click="setCondition('steelySpirit')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'SteelySpirit'"
        >鋼之意志</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        :class="props.pokemonNum==='pokemon2' ? 'pm2' : ''"
        type="checkbox"
        :id="props.pokemonNum + 'FriendGuard'"
        @click="setCondition('friendGuard')"
      />
      <label class="form-check-label" :for="props.pokemonNum + 'FriendGuard'"
        >友情防守</label
      >
    </div>
  </div>
</template>
<style></style>
