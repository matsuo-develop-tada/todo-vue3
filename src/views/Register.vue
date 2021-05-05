<template>
  <div id="content">
    <div class="title">
      <span>新規登録</span>
    </div>
    <hr />
    <nav>
      <input class="datePic" type="date" v-model="deadline" />
      <color-list class="colorFilter" @changeColorCode="changeColorCode" />
    </nav>
    <div class="todoTextArea">
      <textarea v-model="todoContent" class="todoText" placeholder="予定を入力してください"></textarea>
    </div>
    <div class="textLeft">
      <button type="button" @click="backTop" class="btnBack btn-success">戻る<i class="fas fa-times"></i></button>
      <button type="button" @click="regist" class="btn btn-success">登録する <i class="fas fa-times"></i></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColorList from '../components/ColorList.vue'
import axios from 'axios'

// pthonのapiを使用するためのベースとなるURLをグローバル変数で初期化
const apiUrl = process.env.VUE_APP_API_URL

export default defineComponent({
  components: {
    ColorList,
  },
  // computed: {
  //   validate: function() {
  //     return !this.validateDeadline && !this.validateColor && !this.validateTodoContent ? false : true
  //   },
  //   validateDeadline() {
  //     return !this.deadline
  //   },
  //   validateColor: function() {
  //     return !this.colorCode
  //   },
  //   validateTodoContent: function() {
  //     return !this.todoContent
  //   },
  // },
  data() {
    return {
      deadline: null,
      todoContent: null,
      todo: {},
      colorCode: null,
    }
  },
  methods: {
    // 子コンポーネントのカラーコードを取得する
    changeColorCode(colorCode: any) {
      this.colorCode = colorCode
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
      const todo = {
        content: this.todoContent,
        deadline: this.deadline,
        colorCode: this.colorCode,
      }
      // axiosでserver側にとばしてtodoを登録する処理を記述する
      axios.post(`${apiUrl}/regist`, todo).then(() => {
        this.$router.push('/')
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
  }
  .todoText {
    width: 70%;
    border-radius: 4px;
    height: 50%;
  }
  .btnBack {
    margin-right: 10px;
  }
}
</style>
