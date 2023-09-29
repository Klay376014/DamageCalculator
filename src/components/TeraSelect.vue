<script setup>
import { usePokemonStore } from "../stores/pokemon";
import { ref, computed } from "vue";
const props = defineProps({ pokemonNum: String });
const emit = defineEmits(["terastal"]);

const checked = ref(["None"]);

const changeChecked = function (type) {
  checked.value = type;
};

const clearChecked = function () {
  emit("terastal", "None");
  const radios = document.querySelectorAll(`input[name="${props.pokemonNum}Tera"]`);
    radios.forEach(radio => {
      radio.checked = false;
    });
};

const changeTera = function () {
  emit("terastal", checked.value);
};

const store = usePokemonStore();

const isOgerpon = function(type) {
  const name = store[props.pokemonNum].Name
  if (["厄鬼椪-水井", "厄鬼椪-火灶", "厄鬼椪-礎石"].indexOf(name) !== -1) {
    return type.localeCompare(store[props.pokemonNum].type2) !== 0
  } else if (name === "厄鬼椪-碧草") {
    return type.localeCompare('Grass') !== 0
  }
  return false
}
</script>
<template>
  <button
    type="button"
    class="btn px-0 mx-auto"
    :class="props.pokemonNum === 'pokemon1' ? 'btn-primary' : 'btn-secondary'"
    data-bs-toggle="modal"
    :data-bs-target="'#terastal' + props.pokemonNum"
    value="太晶化"
  >
    太晶化
  </button>

  <div
    class="modal fade"
    :id="'terastal' + props.pokemonNum"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">選擇太晶化屬性</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row m-auto">
              <div class="col-4 mb-2" v-for="(type, key) in store.typeList">
                <div class="btn-group">
                  <input
                    class="btn btn-primary ms-3"
                    type="radio"
                    :value="props.pokemonNum + 'Tera' + key"
                    :name="props.pokemonNum + 'Tera'"
                    @click="changeChecked(key, type)"
                    :disabled="isOgerpon(key)"
                  />
                  <label class="form-check-label" :for="props.pokemonNum + key">
                    {{ type }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex">
          <button
            type="button"
            class="btn btn-warning"
            data-bs-dismiss="modal"
            @click="clearChecked"
          >
            取消太晶化
          </button>
          <button
            type="button"
            class="btn px-0 confirm"
            :class="props.pokemonNum==='pokemon1'?'btn-primary':'btn-secondary'"
            data-bs-dismiss="modal"
            @click="changeTera"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>