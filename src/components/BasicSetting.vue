<script setup>
  import { reactive, computed, ref } from "@vue/reactivity";
  import { storeToRefs } from "pinia";
  import { usePokemonStore } from "../stores/pokemon";
  const props = defineProps({
    pokemonNum: String,
  });

  const pm = usePokemonStore();

  const pokemon = storeToRefs(pm);

  const ivCheck = function () {
    if (pokemon[props.pokemonNum].value.iv.hp > 31) {
      pokemon[props.pokemonNum].value.iv.hp = 31;
    } else if (
      pokemon[props.pokemonNum].value.iv.hp < 0 ||
      pokemon[props.pokemonNum].value.iv.hp == ""
    ) {
      pokemon[props.pokemonNum].value.iv.hp = 0;
    }
    if (pokemon[props.pokemonNum].value.iv.atk > 31) {
      pokemon[props.pokemonNum].value.iv.atk = 31;
    } else if (
      pokemon[props.pokemonNum].value.iv.atk < 0 ||
      pokemon[props.pokemonNum].value.iv.atk == ""
    ) {
      pokemon[props.pokemonNum].value.iv.atk = 0;
    }
    if (pokemon[props.pokemonNum].value.iv.def > 31) {
      pokemon[props.pokemonNum].value.iv.def = 31;
    } else if (
      pokemon[props.pokemonNum].value.iv.def < 0 ||
      pokemon[props.pokemonNum].value.iv.def == ""
    ) {
      pokemon[props.pokemonNum].value.iv.def = 0;
    }
    if (pokemon[props.pokemonNum].value.iv.spa > 31) {
      pokemon[props.pokemonNum].value.iv.spa = 31;
    } else if (
      pokemon[props.pokemonNum].value.iv.spa < 0 ||
      pokemon[props.pokemonNum].value.iv.spa == ""
    ) {
      pokemon[props.pokemonNum].value.iv.spa = 0;
    }
    if (pokemon[props.pokemonNum].value.iv.spd > 31) {
      pokemon[props.pokemonNum].value.iv.spd = 31;
    } else if (
      pokemon[props.pokemonNum].value.iv.spd < 0 ||
      pokemon[props.pokemonNum].value.iv.spd == ""
    ) {
      pokemon[props.pokemonNum].value.iv.spd = 0;
    }
    if (pokemon[props.pokemonNum].value.iv.spe > 31) {
      pokemon[props.pokemonNum].value.iv.spe = 31;
    } else if (
      pokemon[props.pokemonNum].value.iv.spe < 0 ||
      pokemon[props.pokemonNum].value.iv.spe == ""
    ) {
      pokemon[props.pokemonNum].value.iv.spe = 0;
    }
  };

  let bpColor = "black";

  // const bpCalculate = function () {
  //   if (pokemon[props.pokemonNum].value.bp.max != 508) {
  //     pokemon[props.pokemonNum].value.bp.max = 508;
  //   }
  //   pokemon[props.pokemonNum].value.bp.max -=
  //     pokemon[props.pokemonNum].value.bp.hp +
  //     pokemon[props.pokemonNum].value.bp.atk +
  //     pokemon[props.pokemonNum].value.bp.def +
  //     pokemon[props.pokemonNum].value.bp.spa +
  //     pokemon[props.pokemonNum].value.bp.spd +
  //     pokemon[props.pokemonNum].value.bp.spe;
  //   bpCheck();
  // };

  const bpCheck = function () {
    if (pokemon[props.pokemonNum].value.bp.hp > 252) {
      pokemon[props.pokemonNum].value.bp.hp = 252;
    } else if (
      pokemon[props.pokemonNum].value.bp.hp < 0 ||
      pokemon[props.pokemonNum].value.bp.hp == ""
    ) {
      pokemon[props.pokemonNum].value.bp.hp = 0;
    }
    if (pokemon[props.pokemonNum].value.bp.atk > 252) {
      pokemon[props.pokemonNum].value.bp.atk = 252;
    } else if (
      pokemon[props.pokemonNum].value.bp.atk < 0 ||
      pokemon[props.pokemonNum].value.bp.atk == ""
    ) {
      pokemon[props.pokemonNum].value.bp.atk = 0;
    }
    if (pokemon[props.pokemonNum].value.bp.def > 252) {
      pokemon[props.pokemonNum].value.bp.def = 252;
    } else if (
      pokemon[props.pokemonNum].value.bp.def < 0 ||
      pokemon[props.pokemonNum].value.bp.def == ""
    ) {
      pokemon[props.pokemonNum].value.bp.def = 0;
    }
    if (pokemon[props.pokemonNum].value.bp.spa > 252) {
      pokemon[props.pokemonNum].value.bp.spa = 252;
    } else if (
      pokemon[props.pokemonNum].value.bp.spa < 0 ||
      pokemon[props.pokemonNum].value.bp.spa == ""
    ) {
      pokemon[props.pokemonNum].value.bp.spa = 0;
    }
    if (pokemon[props.pokemonNum].value.bp.spd > 252) {
      pokemon[props.pokemonNum].value.bp.spd = 252;
    } else if (
      pokemon[props.pokemonNum].value.bp.spd < 0 ||
      pokemon[props.pokemonNum].value.bp.spd == ""
    ) {
      pokemon[props.pokemonNum].value.bp.spd = 0;
    }
    if (pokemon[props.pokemonNum].value.bp.spe > 252) {
      pokemon[props.pokemonNum].value.bp.spe = 252;
    } else if (
      pokemon[props.pokemonNum].value.bp.spe < 0 ||
      pokemon[props.pokemonNum].value.bp.spe == ""
    ) {
      pokemon[props.pokemonNum].value.bp.spe = 0;
    }
    // bpContent();
  };

  const bpContent = function () {
    if (pokemon[props.pokemonNum].value.bp.max >= 0) {
      bpColor = "black";
    } else if (pokemon[props.pokemonNum].value.bp.max < 0) {
      bpColor = "red";
    }
  };
</script>
<template>
  <table class="table number">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">HP</th>
        <th scope="col">攻擊</th>
        <th scope="col">防禦</th>
        <th scope="col">特攻</th>
        <th scope="col">特防</th>
        <th scope="col">速度</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">種族值</th>
        <td>{{ pokemon[props.pokemonNum].value.hp }}</td>
        <td>{{ pokemon[props.pokemonNum].value.atk }}</td>
        <td>{{ pokemon[props.pokemonNum].value.def }}</td>
        <td>{{ pokemon[props.pokemonNum].value.spa }}</td>
        <td>{{ pokemon[props.pokemonNum].value.spd }}</td>
        <td>{{ pokemon[props.pokemonNum].value.spe }}</td>
      </tr>
      <tr>
        <th scope="row">個體值</th>
        <td>
          <input
            type="number"
            min="0"
            max="31"
            class="inputSet w-62"
            v-model="pokemon[props.pokemonNum].value.iv.hp"
            @blur="ivCheck"
            @keyup.enter="ivCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="31"
            class="inputSet w-62"
            v-model="pokemon[props.pokemonNum].value.iv.atk"
            @blur="ivCheck"
            @keyup.enter="ivCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="31"
            class="inputSet w-62"
            v-model="pokemon[props.pokemonNum].value.iv.def"
            @blur="ivCheck"
            @keyup.enter="ivCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="31"
            class="inputSet w-62"
            v-model="pokemon[props.pokemonNum].value.iv.spa"
            @blur="ivCheck"
            @keyup.enter="ivCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="31"
            class="inputSet w-62"
            v-model="pokemon[props.pokemonNum].value.iv.spd"
            @blur="ivCheck"
            @keyup.enter="ivCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="31"
            class="inputSet w-62"
            v-model="pokemon[props.pokemonNum].value.iv.spe"
            @blur="ivCheck"
            @keyup.enter="ivCheck"
          />
        </td>
      </tr>
      <tr>
        <th scope="row">
          努力值<br />剩餘<span
            :style="{
              color:
                pokemon[props.pokemonNum].value.bp.max >= 0 ? 'black' : 'red',
            }"
            >{{ pokemon[props.pokemonNum].value.bp.max }}</span
          >
        </th>
        <td>
          <input
            type="number"
            min="0"
            max="252"
            step="4"
            class="inputSet mt-2 w-62"
            v-model="pokemon[props.pokemonNum].value.bp.hp"
            @blur="bpCheck"
            @keyup.enter="bpCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="252"
            step="4"
            class="inputSet mt-2 w-62"
            v-model="pokemon[props.pokemonNum].value.bp.atk"
            @blur="bpCheck"
            @keyup.enter="bpCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="252"
            step="4"
            class="inputSet mt-2 w-62"
            v-model="pokemon[props.pokemonNum].value.bp.def"
            @blur="bpCheck"
            @keyup.enter="bpCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="252"
            step="4"
            class="inputSet mt-2 w-62"
            v-model="pokemon[props.pokemonNum].value.bp.spa"
            @blur="bpCheck"
            @keyup.enter="bpCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="252"
            step="4"
            class="inputSet mt-2 w-62"
            v-model="pokemon[props.pokemonNum].value.bp.spd"
            @blur="bpCheck"
            @keyup.enter="bpCheck"
          />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="252"
            step="4"
            class="inputSet mt-2 w-62"
            v-model="pokemon[props.pokemonNum].value.bp.spe"
            @blur="bpCheck"
            @keyup.enter="bpCheck"
          />
        </td>
      </tr>
      <tr>
        <th scope="row">實數值</th>
        <td>
          {{ pokemon[props.pokemonNum].value.stat.hp }}
        </td>
        <td>{{ pokemon[props.pokemonNum].value.stat.atk }}</td>
        <td>{{ pokemon[props.pokemonNum].value.stat.def }}</td>
        <td>{{ pokemon[props.pokemonNum].value.stat.spa }}</td>
        <td>{{ pokemon[props.pokemonNum].value.stat.spd }}</td>
        <td>{{ pokemon[props.pokemonNum].value.stat.spe }}</td>
      </tr>
      <tr>
        <th scope="row">能力階段</th>
        <td></td>
        <td>
          <select
            class="form-select form-select-sm"
            @change="pm.modifier.atk($event.target.value, props.pokemonNum)"
          >
            <option value="6">+6</option>
            <option value="5">+5</option>
            <option value="4">+4</option>
            <option value="3">+3</option>
            <option value="2">+2</option>
            <option value="1">+1</option>
            <option value="0" selected>-</option>
            <option value="-1">-1</option>
            <option value="-2">-2</option>
            <option value="-3">-3</option>
            <option value="-4">-4</option>
            <option value="-5">-5</option>
            <option value="-6">-6</option>
          </select>
        </td>
        <td>
          <select
            class="form-select form-select-sm"
            @change="pm.modifier.def($event.target.value, props.pokemonNum)"
          >
            <option value="6">+6</option>
            <option value="5">+5</option>
            <option value="4">+4</option>
            <option value="3">+3</option>
            <option value="2">+2</option>
            <option value="1">+1</option>
            <option value="0" selected>-</option>
            <option value="-1">-1</option>
            <option value="-2">-2</option>
            <option value="-3">-3</option>
            <option value="-4">-4</option>
            <option value="-5">-5</option>
            <option value="-6">-6</option>
          </select>
        </td>
        <td>
          <select
            class="form-select form-select-sm"
            @change="pm.modifier.spa($event.target.value, props.pokemonNum)"
          >
            <option value="6">+6</option>
            <option value="5">+5</option>
            <option value="4">+4</option>
            <option value="3">+3</option>
            <option value="2">+2</option>
            <option value="1">+1</option>
            <option value="0" selected>-</option>
            <option value="-1">-1</option>
            <option value="-2">-2</option>
            <option value="-3">-3</option>
            <option value="-4">-4</option>
            <option value="-5">-5</option>
            <option value="-6">-6</option>
          </select>
        </td>
        <td>
          <select
            class="form-select form-select-sm"
            @change="pm.modifier.spd($event.target.value, props.pokemonNum)"
          >
            <option value="6">+6</option>
            <option value="5">+5</option>
            <option value="4">+4</option>
            <option value="3">+3</option>
            <option value="2">+2</option>
            <option value="1">+1</option>
            <option value="0" selected>-</option>
            <option value="-1">-1</option>
            <option value="-2">-2</option>
            <option value="-3">-3</option>
            <option value="-4">-4</option>
            <option value="-5">-5</option>
            <option value="-6">-6</option>
          </select>
        </td>
        <td>
          <select
            class="form-select form-select-sm"
            @change="pm.modifier.spe($event.target.value, props.pokemonNum)"
          >
            <option value="6">+6</option>
            <option value="5">+5</option>
            <option value="4">+4</option>
            <option value="3">+3</option>
            <option value="2">+2</option>
            <option value="1">+1</option>
            <option value="0" selected>-</option>
            <option value="-1">-1</option>
            <option value="-2">-2</option>
            <option value="-3">-3</option>
            <option value="-4">-4</option>
            <option value="-5">-5</option>
            <option value="-6">-6</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style></style>
