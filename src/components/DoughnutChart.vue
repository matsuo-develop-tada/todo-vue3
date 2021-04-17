<template>
  <div>
    <canvas id="canvas" width="50" height="50"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, reactive } from 'vue'
import { Chart } from 'chart.js'

export default defineComponent({
  name: 'DoughnutChart',
  props: {
    complete: Number,
    incomplete: Number,
  },
  setup: (props) => {
    watch([props], () => {
      console.log('watch')
      drawChart()
    })
    onMounted(() => {
      console.log('onMounted')
      drawChart()
    })

    const drawChart = () => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      const context = canvas.getContext('2d')
      if (!context) return
      const chart = new Chart(context, {
        type: 'doughnut',
        data: {
          labels: ['完了済', '未完了'],
          datasets: [
            {
              label: 'todo',
              data: [props.complete, props.incomplete], // 親コンポーネントから受け取ったデータ（完了済、未完了）をセット
              backgroundColor: ['#707070', '#ffffff'],
              weight: 0.1,
              borderColor: '#707070',
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          cutoutPercentage: 80,
          tooltips: {
            enabled: false,
          },
        },
      })
    }
  },
})
</script>
