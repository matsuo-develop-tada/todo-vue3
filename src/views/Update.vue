<template>
  <div id="update">
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
    <div class="validation" v-show="!stateValid.validate">
      <div class="alert" v-show="stateValid.validateDeadline">日付は必須項目です</div>
      <div class="alert" v-show="stateValid.validateColor">カラーコードは必須項目です</div>
      <div class="alert" v-show="stateValid.validateTodoContent">予定入力欄は必須項目です</div>
    </div>
    <div class="textLeft">
      <button class="btnBack" type="button" @click="backTop">戻る<i class="fas fa-times"></i></button>
      <button class="btnUpdate" type="button" @click="update">更新する <i class="fas fa-times"></i></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Todo } from '../interfaces/todo.interface'
import { requests } from '../requests'
import ColorList from '../components/ColorList.vue'

interface StateValidation {
  validateDeadline: boolean
  validateColor: boolean
  validateTodoContent: boolean
}

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

    const stateValid: StateValidation = reactive({
      // 必須項目の日時、カラーコード、予定をそれぞれ未記入の場合「登録」ボタンを非活性にするようにする
      validate: computed(() => {
        return !stateValid.validateDeadline && !stateValid.validateColor && !stateValid.validateTodoContent
      }),
      // 日付の入力チェック
      validateDeadline: computed(() => {
        return !state.todo.dt_do
      }),
      // カラーコードの入力チェック
      validateColor: computed(() => {
        return !state.todo.color_code
      }),
      // 予定の入力チェック
      validateTodoContent: computed(() => {
        return !state.todo.content
      }),
    })

    const update = () => {
      requests.updateTodo(state.todo).then((response) => {
        if (response.status === 200) {
          router.push('/todo-list')
        } else {
          alert('更新処理に失敗しました')
        }
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

    return { state, update, stateValid, changeColorCode }
  },
})
</script>

<style lang="scss" scoped>
#update {
  max-width: 760px;
  min-width: 330px;
  padding: 0 10px;
  margin: 0 auto;
  nav {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .datePic {
      margin-right: 10px;
      height: 30px;
    }
    .colorPic {
      z-index: 2;
      width: 47%;
    }
  }
  .blank {
    border: 1px dotted red;
  }
  .todoText {
    width: 70%;
    border-radius: 4px;
    height: 50%;
  }
  .btnBack {
    margin-right: 10px;
    border-radius: 5px;
  }
  .btnUpdate {
    border-radius: 5px;
  }
  .validation {
    margin-top: 15px;
    width: 70%;
    border: 1px solid;
    border-style: dotted;
    border-color: red;
    .alert {
      padding: 5px 5px 3px 5px;
      color: rgb(251, 80, 0);
    }
  }
  .textLeft {
    margin-top: 15px;
  }
}
</style>
