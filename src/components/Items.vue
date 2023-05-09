<script setup>
import { useItemStore } from "../stores/items";
import { usePokemonStore } from "../stores/pokemon";

const props = defineProps({
  pokemonNum: String,
});

const pm = usePokemonStore();
const store = useItemStore();

const itemSelect=(val)=>{
  pm[props.pokemonNum].item = val;
}
</script>
<template>
  <div class="item px-1 mb-3">
    <select class="form-select mt-3" @change="itemSelect($event.target.value)">
      <option value="default" selected>選擇道具</option>
      <option v-for="(item, value) of store.itemList" :value="value">
        {{ item.name + item.effect }}
      </option>
    </select>
  </div>
</template>
<style></style>