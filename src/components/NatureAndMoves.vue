<script setup>
import { ref } from "@vue/reactivity";
import NatureList from "../nature.json";
import { usePokemonStore } from "../stores/pokemon";
import { useNatureStore } from "../stores/nature";
import { useMoveStore } from "../stores/moves";

const props = defineProps({
  pokemonNum: String,
});

const pm = usePokemonStore();
const store = useNatureStore();
const moves = useMoveStore();
let moveName = "";
let moveEnName = "";
let moveContent = ref("");

const levelCheck = function (value) {
  if (props.pokemonNum == "pokemon1") {
    if (value > 100) {
      store.levelChange(100);
    } else if (value < 1) {
      store.levelChange(1);
    }
  } else {
    if (value > 100) {
      store.levelChange2(100);
    } else if (value < 1) {
      store.levelChange2(1);
    }
  }
};

const list = NatureList;

const moveContentValue = (move) => {
  return `屬性︰${moves.typeList[move.type]}/威力︰${move.basePower}/${
    moves.categoryList[move.category]
  }`;
};

const moveSelect = (e, num) => {
  let move = e.target.value;
  moveName = Object.keys(moves.moveList).find(
    (key) => moves.moveList[key].name === move
  );
  if (moveName != undefined) {
    pm[num].move = moves.moveList[moveName];
    moveContent.value = moveContentValue(moves.moveList[moveName]);
  } else {
    moveEnName = Object.keys(moves.moveList).find((key) => key === move);
    if (moveEnName != undefined) {
      pm[num].move = moves.moveList[moveEnName];
      moveContent.value = moveContentValue(moves.moveList[moveEnName]);
      e.target.value = moves.moveList[moveEnName].name;
    } else {
      pm[num].move = {};
      moveContent.value = "";
    }
  }
};
</script>
<template>
  <div class="row">
    <div class="col-3 text-left mt-1 ms-1 pt-01">
      <span style="font-weight: bold"
        >等級<input
          type="number"
          min="1"
          max="100"
          step="1"
          class="inputSet ms-1 h36 w-62"
          :value="props.pokemonNum == 'pokemon1' ? store.level : store.level2"
          @blur="levelCheck($event.target.value)"
          @keyup.enter="levelCheck($event.target.value)"
          @change="
            props.pokemonNum == 'pokemon1'
              ? store.levelChange($event.target.value)
              : store.levelChange2($event.target.value)
          "
      /></span>
    </div>
    <div class="col-9 ms--1 ps-1 natureWidth">
      <select
        class="form-select mt-1"
        @change="
          props.pokemonNum == 'pokemon1'
            ? store.natureChange($event.target.value)
            : store.natureChange2($event.target.value)
        "
      >
        <option value="default" selected>選擇性格</option>
        <option v-for="nature in list" :value="nature.name">
          {{ nature.content }}
        </option>
      </select>
    </div>
  </div>
  <div class="d-flex pe-0">
    <div class="moveList">
      <label for="searchMove" class="form-label"></label>
      <input
        class="form-control"
        list="moveList"
        id="searchMove"
        placeholder="選擇招式"
        @change="moveSelect($event, props.pokemonNum)"
      />
      <datalist id="moveList">
        <optgroup label="中文招式">
          <option
            v-for="move in moves.moveList"
            :value="move.name"
          ></option>
        </optgroup>
        <optgroup label="英文招式">
          <option
            v-for="(move, enName) in moves.moveList"
            :value="enName"
          ></option>
        </optgroup>
      </datalist>
    </div>
    <div class="ms-4 moveContent" v-if="moveContent.value !== ''">
      {{ moveContent }}
    </div>
  </div>
</template>
<style></style>
