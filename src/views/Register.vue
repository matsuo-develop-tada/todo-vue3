<template>
  <div id="content">
    <div class="title">
      <span>新規登録</span>
    </div>
    <hr />
    <nav>
      <input class="datePic" type="date" v-model="state.deadline" />
      <div class="colorPic">
        <color-list class="colorFilter" @changeColorCode="changeColorCode" />
      </div>
    </nav>
    <div class="todoTextArea">
      <textarea v-model="state.todoContent" class="todoText" placeholder="予定を入力してください"></textarea>
    </div>
    <div class="validation" v-show="!stateValid.validate">
      <div class="alert" v-show="stateValid.validateDeadline">日付は必須項目です</div>
      <div class="alert" v-show="stateValid.validateColor">カラーコードは必須項目です</div>
      <div class="alert" v-show="stateValid.validateTodoContent">予定入力欄は必須項目です</div>
    </div>
    <div class="textLeft">
      <button class="btnBack" type="button" @click="backTop">戻る<i class="fas fa-times"></i></button>
      <button class="btnRegist" type="button" :disabled="!stateValid.validate" @click="regist">
        登録する <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { requests } from '../requests'
import { Todo } from '../interfaces/todo.interface'
import ColorList from '../components/ColorList.vue'

export default defineComponent({
  components: {
    ColorList,
  },
  setup() {
    // interfaceを使用してvalidationの初期値を設定
    interface stateValidation {
      validateDeadline: boolean
      validateColor: boolean
      validateTodoContent: boolean
    }
    const stateValid: stateValidation = reactive({
      // 必須項目の日時、カラーコード、予定をそれぞれ未記入の場合「登録」ボタンを非活性にするようにする
      validate: computed(() => {
        return !stateValid.validateDeadline && !stateValid.validateColor && !stateValid.validateTodoContent
      }),
      // 日付の入力チェック
      validateDeadline: computed(() => {
        return !state.deadline
      }),
      // カラーコードの入力チェック
      validateColor: computed(() => {
        return !state.colorCode
      }),
      // 予定の入力チェック
      validateTodoContent: computed(() => {
        return !state.todoContent
      }),
    })
    // 各入力欄の初期値を設定する
    const state = reactive({
      deadline: '',
      todoContent: '',
      colorCode: '',
    })
    return {
      stateValid,
      state,
    }
  },
  methods: {
    // 子コンポーネントのカラーコードを取得する
    changeColorCode(colorCode: any) {
      this.state.colorCode = colorCode
    },
    backTop() {
      // 登録を破棄するかどうか確認する
      const result = confirm('変更を破棄してトップに戻りますか？')
      if (result) {
        // 確認してOKの場合、一覧のトップページへ遷移する
        this.$router.push('/')
      }
    },
    regist() {
      const todo: Todo = {
        id_todo: 0,
        content: this.state.todoContent,
        color_code: this.state.colorCode,
        checked: false,
        dt_do: this.state.deadline,
        dt_create: this.state.deadline,
        dt_update: this.state.deadline,
      }
      // axiosでserver側にとばしてtodoを登録する処理を記述する
      requests
        .registTodo(todo)
        .then(() => {
          // 確認してOKの場合、一覧のトップページへ遷移する
          this.$router.push('/')
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
})
</script>

<style lang="scss" scoped>
#content {
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
    }
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
  .btnRegist {
    border-radius: 5px;
  }
  .validation {
    margin-top: 15px;
    width: 70%;
    border: solid;
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
