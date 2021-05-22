<template>
  <div class="deleteModal">
    <div class="modal">
      <div class="title">
        <p>完了済のTodoを削除してもよろしいですか</p>
      </div>
      <div class="btnArea">
        <button class="delBtn" @click="deleteTodos">削除</button>
        <button class="canBtn" @click="closeDeleteModal">戻る</button>
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
    closeDeleteModal() {
      this.$emit('closeDeleteModal')
    },
    deleteTodos() {
      requests.delTodos(this.completedTodos).then((response) => {
        this.$emit('closeDeleteModal')
      })
    },
  },
}
</script>

<style style="scoped">
.title {
  text-align: center;
}
.deleteModal {
  z-index: 1;
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
  z-index: 1;
  width: 30%;
  padding: 1em;
  background: #fff;
}
.btnArea {
  position: relative;
  text-align: center;
}
.delBtn {
  border-radius: 5px;
  margin-right: 2rem;
  width: 20%;
}
.canBtn {
  border-radius: 3px;
  width: 20%;
}
</style>
