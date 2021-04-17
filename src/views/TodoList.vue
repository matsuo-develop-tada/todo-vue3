<template>
  <div>
    <!-- ヘッダー -->
    <header>
      <h1>Todoリスト</h1>
      <button class="deleteIcon">🗑</button>
      <button class="createIcon">➕</button>
    </header>

    <main>
      <nav>
        <!-- 実行日時フィルター -->
        <input type="date" v-model="selectedDtDo" @keydown="clearDtDo()" />

        <!-- カラーフィルター -->
        <div class="colorFilter">
          <button @click="switchColorCodeList()">
            <span :style="'background-color: ' + selectedColorCode"></span>
          </button>
          <ul v-if="isOpen">
            <li v-for="color in state.colors" :key="color.id_color" @click="changeColorCode(color.color_code)">
              <span :style="'background-color: ' + color.color_code"></span>
            </li>
          </ul>
        </div>

        <!-- 達成度ドーナツチャート -->
        <div class="doughnutChart">
          <doughnut-chart :complete="complete" :incomplete="incomplete" />
        </div>
      </nav>

      <!-- Todo一覧 -->
      <div class="todoList">
        <ul>
          <li v-for="todo in state.todos" :key="todo.id" :style="'background-color: ' + todo.color_code">
            <input type="checkbox" v-model="todo.checked" />
            {{ todo.content }}
            <span>{{ formatDate(todo.dt_do, '/') }}</span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { requests } from '../requests'
import { Todo } from '../interfaces/todo.interface'
import { Color } from '../interfaces/color.interface'
import { formatDate } from '../common'
import DoughnutChart from '../components/DoughnutChart.vue'

export default defineComponent({
  components: {
    DoughnutChart,
  },
  setup: () => {
    const state = reactive<{ todos: Todo[]; colors: Color[] }>({ todos: [], colors: [] })
    const selectedDtDo = ref(formatDate(new Date(), '-'))
    const selectedColorCode = ref('')
    const colorCodes = ref<string[]>([])
    const isOpen = ref(false)

    const complete = ref(0)
    const incomplete = ref(0)

    onMounted(async () => {
      state.todos = await requests.getTodos()
      state.colors = await requests.getColors()
      complete.value = state.todos.filter((todo) => todo.checked).length
      incomplete.value = state.todos.filter((todo) => !todo.checked).length
    })

    const clearDtDo = () => {
      console.log('clearDtDo')
      selectedDtDo.value = ''
    }

    const switchColorCodeList = () => {
      isOpen.value = !isOpen.value
    }

    const changeColorCode = (colorCode: string) => {
      selectedColorCode.value = colorCode
      isOpen.value = false
    }

    return {
      state,
      selectedDtDo,
      selectedColorCode,
      formatDate,
      colorCodes,
      isOpen,
      clearDtDo,
      switchColorCodeList,
      changeColorCode,

      complete,
      incomplete,
    }
  },
})
</script>

<style lang="scss" scoped>
* {
  color: #707070;
}
// ヘッダー
header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 330px;
  height: 60px;
  margin-bottom: 20px;
  border-bottom: 1px solid #707070;
  h1 {
    font-size: 24px;
    margin: 0;
  }
  .deleteIcon {
    position: absolute;
    right: 40px;
  }
  .createIcon {
    position: absolute;
    right: 10px;
  }
}

main {
  max-width: 760px;
  min-width: 330px;
  padding: 0 10px;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    // 実行日時フィルター
    input[type='date'] {
      height: 30px;
      margin-right: 10px;
    }

    // カラーフィルター
    .colorFilter {
      height: 30px;
      button {
        display: block;
        width: 100px;
        height: 100%;
        padding: 5px;
        cursor: pointer;
        span {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      ul {
        padding: 0;
        margin: 0;
        li {
          list-style: none;
          background-color: #efefef;
          border: 1px solid #707070;
          border-top: none;
          height: 30px;
          width: 100%;
          padding: 5px;
          cursor: pointer;
          span {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    // 達成度ドーナツチャート
    .doughnutChart {
      margin-left: auto;
    }
  }

  // Todo一覧
  .todoList {
    ul {
      padding: 0;
      margin: 0;
      li {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #707070;
        border-radius: 4px;
        cursor: pointer;
        input[type='checkbox'] {
          width: 20px;
          height: 20px;
          margin: 0;
          margin-right: 10px;
          background: #000;
        }
        span {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
