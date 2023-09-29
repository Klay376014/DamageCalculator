<script setup>
import { computed } from "vue";
import { useItemStore } from "../stores/items";
import { usePokemonStore } from "../stores/pokemon";

const props = defineProps({
  pokemonNum: String,
});

const pm = usePokemonStore();
const store = useItemStore();

const OgerponItem = `${store.itemList["Ogerpon Mask"].name}${store.itemList["Ogerpon Mask"].effect}`
const isOgerpon = computed (() => {
  return (["厄鬼椪-水井", "厄鬼椪-火灶", "厄鬼椪-礎石"].indexOf(pm[props.pokemonNum].Name) !== -1)
})

const itemSelect = (val) => {
  pm[props.pokemonNum].item = val;
};
</script>
<template>
  <div class="item px-1 mb-3">
    <select class="form-select mt-3" @change="itemSelect($event.target.value)">
      <option value="default" selected v-if="isOgerpon">{{ OgerponItem }}</option>
      <option value="default" selected v-else>選擇道具</option>
      <option v-for="(item, value) of store.itemList" :value="value">
        {{ item.name + item.effect }}
      </option>
    </select>
  </div>
</template>
<style></style>