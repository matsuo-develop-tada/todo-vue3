<template>
  <div>
    <!-- ヘッダー -->
    <header>
      <h1>Todoリスト</h1>
      <button class="deleteIcon" @click="showDeleteModal">🗑</button>
      <DeleteModal
        v-if="showTodoDelete"
        :completedTodos="completedTodos"
        @closeDeleteModal="closeDeleteModal"
      ></DeleteModal>

      <button class="createIcon">➕</button>
    </header>

    <main>
      <nav>
        <!-- 実行日時フィルター -->
        <div class="dateFilter">
          <input type="date" v-model="selectedDtDo" @change="filterTodos()" />
        </div>

        <!-- カラーフィルター -->
        <div class="colorFilter">
          <color-list :listMode="'filter'" @changeColorCode="changeColorCode" />
        </div>

        <!-- 達成度ドーナツチャート -->
        <div class="doughnutChart">
          <doughnut-chart :complete="complete" :incomplete="incomplete" />
        </div>
      </nav>

      <!-- Todo一覧 -->
      <div class="todoList">
        <ul>
          <li v-for="todo in state.todos" :key="todo.id" :style="'background-color: #' + todo.color_code">
            <input type="checkbox" v-model="todo.checked" @change="setComplete()" />
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
import { formatDate } from '../common'
import ColorList from '../components/ColorList.vue'
import DoughnutChart from '../components/DoughnutChart.vue'
import DeleteModal from '../components/DeleteModal.vue'

export default defineComponent({
  components: {
    ColorList,
    DoughnutChart,
    DeleteModal,
  },
  setup: () => {
    const state = reactive<{ todos: Todo[] }>({ todos: [] })
    const selectedDtDo = ref('')
    const selectedColorCode = ref('')
    const complete = ref(0)
    const incomplete = ref(0)

    const setComplete = () => {
      complete.value = state.todos.filter((todo) => todo.checked).length
      incomplete.value = state.todos.length - complete.value
    }
    const changeColorCode = (colorCode: string) => {
      selectedColorCode.value = colorCode
      filterTodos()
    }
    const filterTodos = async () => {
      state.todos = await requests.getTodos(selectedColorCode.value, selectedDtDo.value)
    }

    onMounted(async () => {
      state.todos = await requests.getTodos()
      setComplete()
    })

    return {
      state,
      selectedDtDo,
      complete,
      incomplete,

      setComplete,
      changeColorCode,
      filterTodos,
      formatDate,
    }
  },
  data() {
    return {
      showTodoDelete: false,
      completedTodos: [] as number[],
    }
  },
  methods: {
    showDeleteModal() {
      // 完了済（checkフラグがtrue）のid_todoを取得する
      // this.state.todos.filter((todo) => {
      //   return todo.checked ? this.completedTodos.push(todo.id_todo) : ''
      // })
      for (const todo of this.state.todos) {
        if (todo.checked) {
          this.completedTodos.push(todo.id_todo)
        }
      }
      this.showTodoDelete = true
    },
    closeDeleteModal() {
      this.showTodoDelete = false
    },
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
    .dateFilter {
      input {
        height: 30px;
        margin-right: 10px;
      }
    }

    // カラーフィルター
    .colorFilter {
      width: 100px;
      z-index: 2;
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
