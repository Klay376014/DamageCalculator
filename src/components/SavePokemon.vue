<script setup>
import { onMounted, reactive } from 'vue'
import { usePokemonStore } from "../stores/pokemon";
import { toast } from "vue3-toastify";

const store = usePokemonStore();

const state = reactive({
  modalSave: null,
})
onMounted(() => {
  state.modalSave = new bootstrap.Modal('#savePokemon', {})
})

const savePokemon = () => {
  if(store[props.pokemonNum].Name === 'default'){
    alert('請先選擇寶可夢！')
    state.modalSave.hide()
    return false
  }
  store.savePokemon(props.pokemonNum)
  toast.dark("儲存成功！", {
    position: toast.POSITION.TOP_CENTER,
    multiple: false,
    transition: toast.TRANSITIONS.SLIDE,
    hideProgressBar: true,
    autoClose: 500,
  });
  state.modalSave.hide()
}



const props = defineProps({
  pokemonNum: String,
})
</script>
<template>
  <div class="modal fade" id="savePokemon" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center fs-4 fw-bold lh-1">
            <p class="mb-0">是否儲存內容？</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="modal-close">取消</button>
          <button type="button" class="btn btn-primary" @click="savePokemon()">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>