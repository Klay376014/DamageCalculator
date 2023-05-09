<script setup>
import { useAbilityStore } from "../stores/abilities";
import { usePokemonStore } from "../stores/pokemon";

const props = defineProps({
  pokemonNum: String,
});

const pm = usePokemonStore();
const store = useAbilityStore();

const abilitySelect=(val)=>{
  pm[props.pokemonNum].ability = val;
}
</script>
<template>
  <div class="ability px-1">
    <select class="form-select mt-2" @change="abilitySelect($event.target.value)">
      <option value="default" selected>選擇特性</option>
      <option
        v-for="(ability, value) of store.abilityList"
        :value="value"
      >
        {{ ability.name + ability.effect }}
      </option>
    </select>
  </div>
</template>
<style></style>