<template>
  <div class="update">
    <div class="title">
      <span>更新画面</span>
    </div>
    <hr />
    <nav>
      <input class="datePic" type="date" v-model="state.todo.dt_do" />
      <div class="colorPic">
        <color-list
          class="colorFilter"
          :registeredColorCode="state.todo.color_code"
          @changeColorCode="changeColorCode"
        />
      </div>
    </nav>
    <div class="todoTextArea">
      <textarea v-model="state.todo.content" class="todoText" placeholder="予定を入力してください"></textarea>
    </div>
    <div class="textLeft">
      <button class="btnBack" type="button" @click="backTop">戻る<i class="fas fa-times"></i></button>
      <button class="btnRegist" type="button" @click="update">更新する <i class="fas fa-times"></i></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Todo } from '../interfaces/todo.interface'
import { requests } from '../requests'
import ColorList from '../components/ColorList.vue'

export default defineComponent({
  components: {
    ColorList,
  },
  props: {
    id: {
      type: String,
    },
  },
  setup: (props) => {
    const router = useRouter()
    const state = reactive<{ todo: Todo }>({
      todo: {
        id_todo: 0,
        content: '',
        color_code: '',
        checked: false,
        dt_do: '',
        dt_create: '',
        dt_update: '',
      },
    })

    let registeredColorCode = ''

    const update = () => {
      requests.updateTodo(state.todo).then(() => {
        router.push('/todo-list')
      })
    }

    // 子コンポーネントのカラーコードを取得する
    const changeColorCode = (colorCode: string) => {
      state.todo.color_code = colorCode
    }

    onMounted(async () => {
      // idに対応したtodoをapiを使用してDBから取得する
      state.todo = await requests.getSingleTodo(props.id!)

      // DBから取得したdt_doはstring型なので、date型に直してYYYY/MM/DDのみを取得する
      const tempDate = new Date(state.todo.dt_do)
      const tempYear = tempDate.getFullYear()
      const tempMonth = tempDate.getMonth() + 1 >= 10 ? tempDate.getMonth() + 1 : `0${tempDate.getMonth() + 1}`
      const tempDay = tempDate.getDate() >= 10 ? tempDate.getDate() : `0${tempDate.getDate()}`

      // Date型に一回してから、画面のdatepickerに合うようにフォーマットしなおす
      state.todo.dt_do = `${tempYear}-${tempMonth}-${tempDay}`
    })

    return { state, update, changeColorCode }
  },
})
</script>

<style></style>
