<script setup>
import { usePokemonStore } from "../stores/pokemon";
import { ref } from "vue";
const props = defineProps({ className: String, pokemonNum: String });
const emit = defineEmits(["terastal"]);

const checked = ref(["None"]);

const changeChecked = function (type) {
  checked.value = type;
};

const clearChecked = function () {
  emit("terastal", "None");
};

const changeTera = function () {
  emit("terastal", checked.value);
};

const store = usePokemonStore();
</script>
<template>
  <button
    type="button"
    class="btn mt-3 position-absolute tera"
    :class="props.className"
    data-bs-toggle="modal"
    :data-bs-target="'#terastal' + props.pokemonNum"
    value="太晶化"
    style="height: 40px"
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
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    :value="props.pokemonNum + 'Tera' + key"
                    :name="props.pokemonNum + 'Tera'"
                    @click="changeChecked(key, type)"
                  />
                  <label class="form-check-label" :for="props.pokemonNum + key">
                    {{ type }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="clearChecked"
          >
            取消太晶化
          </button>
          <button
            type="button"
            class="btn"
            :class="props.className"
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