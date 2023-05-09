<script setup>
import { propsToAttrMap } from "@vue/shared";
import { usePokemonStore } from "../stores/pokemon";
const pm = usePokemonStore();

const singleDouble = (e) => {
  if (e.target.id == "single") {
    pm.fieldCondition.single = true;
    pm.fieldCondition.double = false;
  } else if (e.target.id == "double") {
    pm.fieldCondition.single = false;
    pm.fieldCondition.double = true;
  }
};
const weatherReset = () => {
  Object.keys(pm.fieldCondition.weather).forEach(
    (a) => (pm.fieldCondition.weather[a] = false)
  );
};

const weatherChange = (e) => {
  if (e.target.id == "defaultWeather") {
    weatherReset();
  } else if (e.target.id == "sun") {
    weatherReset();
    pm.fieldCondition.weather.sun = true;
  } else if (e.target.id == "rain") {
    weatherReset();
    pm.fieldCondition.weather.rain = true;
  } else if (e.target.id == "sandstorm") {
    weatherReset();
    pm.fieldCondition.weather.sandstorm = true;
  } else {
    weatherReset();
    pm.fieldCondition.weather.snow = true;
  }
};

const fieldReset = () => {
  Object.keys(pm.fieldCondition.field).forEach(
    (a) => (pm.fieldCondition.field[a] = false)
  );
};

const fieldChange = (e) => {
  if (e.target.id == "defaultField") {
    fieldReset();
  } else if (e.target.id == "electric") {
    fieldReset();
    pm.fieldCondition.field.electric = true;
  } else if (e.target.id == "psychic") {
    fieldReset();
    pm.fieldCondition.field.psychic = true;
  } else if (e.target.id == "grassy") {
    fieldReset();
    pm.fieldCondition.field.grassy = true;
  } else {
    fieldReset();
    pm.fieldCondition.field.misty = true;
  }
};

const setAura = (val) => {
  pm.fieldCondition.aura[val] = !pm.fieldCondition.aura[val];
};
</script>
<template>
  <div class="other px-1 mb-3">
    <div class="other-weather d-flex align-items-center mb-3">
      <div class="content ps-1"><p>天氣</p></div>
      <div class="btn-group" role="weather">
        <input
          type="radio"
          class="btn-check"
          name="weather"
          id="defaultWeather"
          autocomplete="off"
          checked
          @change="weatherChange($event)"
        />
        <label class="btn btn-outline-primary" for="defaultWeather">-</label>
        <input
          type="radio"
          class="btn-check"
          name="weather"
          id="sun"
          autocomplete="off"
          @change="weatherChange($event)"
        />
        <label class="btn btn-outline-primary" for="sun">晴天</label>
        <input
          type="radio"
          class="btn-check"
          name="weather"
          id="rain"
          autocomplete="off"
          @change="weatherChange($event)"
        />
        <label class="btn btn-outline-primary" for="rain">雨天</label>
        <input
          type="radio"
          class="btn-check"
          name="weather"
          id="sandstorm"
          autocomplete="off"
          @change="weatherChange($event)"
        />
        <label class="btn btn-outline-primary" for="sandstorm">沙暴</label>
        <input
          type="radio"
          class="btn-check"
          name="weather"
          id="snow"
          autocomplete="off"
          @change="weatherChange($event)"
        />
        <label class="btn btn-outline-primary" for="snow">下雪</label>
      </div>
    </div>
    <div class="other-field d-flex align-items-center mb-3">
      <div class="content ps-1"><p>場地</p></div>
      <div class="btn-group" role="field">
        <input
          type="radio"
          class="btn-check bgc"
          name="field"
          id="defaultField"
          autocomplete="off"
          checked
          @change="fieldChange($event)"
        />
        <label class="btn btn-outline-primary" for="defaultField">-</label>
        <input
          type="radio"
          class="btn-check"
          name="field"
          id="electric"
          autocomplete="off"
          @change="fieldChange($event)"
        />
        <label class="btn btn-outline-primary" for="electric">電氣</label>
        <input
          type="radio"
          class="btn-check"
          name="field"
          id="psychic"
          autocomplete="off"
          @change="fieldChange($event)"
        />
        <label class="btn btn-outline-primary" for="psychic">精神</label>
        <input
          type="radio"
          class="btn-check"
          name="field"
          id="grassy"
          autocomplete="off"
          @change="fieldChange($event)"
        />
        <label class="btn btn-outline-primary" for="grassy">青草</label>
        <input
          type="radio"
          class="btn-check"
          name="field"
          id="misty"
          autocomplete="off"
          @change="fieldChange($event)"
        />
        <label class="btn btn-outline-primary" for="misty">薄霧</label>
      </div>
    </div>
    <div class="other-aura d-flex align-items-center mb-3">
      <div class="content ps-1"><p>氣場</p></div>
      <div class="btn-group" role="aura">
        <input
          type="checkbox"
          class="btn-check"
          id="tabletsOfRuin"
          autocomplete="off"
          @click="setAura($event.target.id)"
        />
        <label class="btn btn-outline-primary px-0" for="tabletsOfRuin"
          ><span>災禍之簡</span></label
        >

        <input
          type="checkbox"
          class="btn-check"
          id="swordOfRuin"
          autocomplete="off"
          @click="setAura($event.target.id)"
        />
        <label class="btn btn-outline-primary px-0" for="swordOfRuin"
          ><span>災禍之劍</span></label
        >

        <input
          type="checkbox"
          class="btn-check"
          id="vesselOfRuin"
          autocomplete="off"
          @click="setAura($event.target.id)"
        />
        <label class="btn btn-outline-primary px-0" for="vesselOfRuin"
          ><span>災禍之鼎</span></label
        >

        <input
          type="checkbox"
          class="btn-check"
          id="beadsOfRuin"
          autocomplete="off"
          @click="setAura($event.target.id)"
        />
        <label class="btn btn-outline-primary px-0" for="beadsOfRuin"
          ><span>災禍之玉</span></label
        >

        <input
          type="checkbox"
          class="btn-check"
          id="fairyAura"
          autocomplete="off"
          @click="setAura($event.target.id)"
        />
        <label class="btn btn-outline-primary px-0" for="fairyAura"
          ><span>妖精氣場</span></label
        >

        <input
          type="checkbox"
          class="btn-check"
          id="darkAura"
          autocomplete="off"
          @click="setAura($event.target.id)"
        />
        <label class="btn btn-outline-primary px-0" for="darkAura"
          ><span>暗黑氣場</span></label
        >
      </div>
    </div>
  </div>
  <div class="other-category d-flex justify-content-center mb-3">
    <div class="btn-group" role="category">
      <input
        type="radio"
        class="btn-check"
        name="category"
        id="single"
        autocomplete="off"
        checked
        @change="singleDouble($event)"
      />
      <label class="btn btn-outline-primary" for="single">單打</label>
      <input
        type="radio"
        class="btn-check"
        name="category"
        id="double"
        autocomplete="off"
        @change="singleDouble($event)"
      />
      <label class="btn btn-outline-primary" for="double">雙打</label>
    </div>
  </div>
</template>
<style>
</style>