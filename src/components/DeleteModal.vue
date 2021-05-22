<template>
  <div class="deleteModal">
    <div class="modal">
      <p class="title">
        <span>完了済のTodoを</span>
        <span>削除してもよろしいですか？</span>
      </p>
      <div class="btnArea">
        <button class="delBtn" @click="deleteTodos">削除</button>
        <button class="canBtn" @click="cancel">戻る</button>
      </div>
    </div>
  </div>
</template>

<script>
import { requests } from '../requests'

export default {
  props: {
    completedTodos: Array,
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    deleteTodos() {
      requests.delTodos(this.completedTodos).then((data) => {
        console.log(data)
        this.$emit('closeDeleteModal')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  span {
    display: inline-block;
  }
}
.deleteModal {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  width: 90%;
  max-width: 500px;
  padding: 15px;
  background: #ffffff;
}
.btnArea {
  position: relative;
  text-align: center;
}
.delBtn {
  border-radius: 4px;
  padding: 0 20px;
  margin-right: 2rem;
}
.canBtn {
  border-radius: 4px;
  padding: 0 20px;
}
</style>
