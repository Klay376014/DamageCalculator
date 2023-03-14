<script setup>
  import { UseDamageStore } from "../stores/damage";
  import { usePokemonStore } from "../stores/pokemon";

  const store = UseDamageStore();
  const pm = usePokemonStore();
</script>
<template>
  <div class="card-body result mt-2 pt-0">
    <div class="text-center d-flex justify-content-around">
      <button
        type="button"
        class="btn btn-warning"
        @click="store.damageCalculate('pokemon1', 'pokemon2')"
      >
        計算結果(寶可夢1打寶可夢2)
      </button>
      <button
        type="button"
        class="btn btn-warning"
        @click="store.damageCalculate('pokemon2', 'pokemon1')"
      >
        計算結果(寶可夢2打寶可夢1)
      </button>
    </div>
    <div class="showDamage mt-3 fw-bold text-left container">
      <ul v-for="(content, index) in store.resultContent">
        <li>
          <div class="d-flex justify-content-between mt-0">
            <p class="mb-0">{{ content }}</p>
            <button
              type="button"
              class="btn btn-warning pt2"
              data-bs-toggle="modal"
              :data-bs-target="'#result' + index"
            >
              詳細顯示
            </button>

            <div class="modal fade" :id="'result' + index" tabindex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    {{ index }}
                    <br />
                    {{ content }}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-warning pt2">
                      複製訊息
                    </button>
                    <button type="button" class="btn btn-primary pt2">
                      分享到社群
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style></style>
