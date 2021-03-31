<template>
  <div>
    <h1>Todo一覧</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.content }}
        <button>詳細</button>
        <button>削除</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getTodos } from '../requests'
import { Todo } from '../interfaces/todo.interface'

export default defineComponent({
  setup: () => {
    const todos = ref<Todo[]>([])

    onMounted(async () => {
      todos.value = await getTodos()
    })

    return {
      todos,
    }
  },
})
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
ul {
  li {
    list-style: none;
    text-align: center;
  }
}
</style>
