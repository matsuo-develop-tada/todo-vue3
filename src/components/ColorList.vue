<template>
  <div>
    <button @click="switchList()">
      <span :style="'background-color: #' + selectedColorCode"></span>
    </button>
    <ul v-if="isOpen">
      <li v-if="listMode === 'filter'" @click="changeColorCode('')"></li>
      <li v-for="color in state.colors" :key="color.id_color" @click="changeColorCode(color.color_code)">
        <span :style="'background-color: #' + color.color_code"></span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, PropType } from 'vue'
import { requests } from '../requests'
import { Color } from '../interfaces/color.interface'

export default defineComponent({
  name: 'ColorList',
  props: {
    listMode: {
      type: String as PropType<null | 'filter'>,
      required: false,
      default: null,
    },
  },
  setup: (props, { emit }) => {
    const state = reactive<{ colors: Color[] }>({ colors: [] })
    const selectedColorCode = ref('')
    const isOpen = ref(false)

    // カラーコードリスト開閉
    const switchList = () => {
      isOpen.value = !isOpen.value
    }
    // カラーコードリストの変更検知
    const changeColorCode = (colorCode: string) => {
      selectedColorCode.value = colorCode
      // 親コンポーネントにカラーコードを渡す
      emit('changeColorCode', colorCode)
      isOpen.value = false
    }

    onMounted(async () => {
      state.colors = await requests.getColors()
    })

    return {
      state,
      selectedColorCode,
      isOpen,

      switchList,
      changeColorCode,
    }
  },
})
</script>

<style lang="scss" scoped>
div {
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
</style>
