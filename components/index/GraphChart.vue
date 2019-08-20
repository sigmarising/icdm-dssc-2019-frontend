<template>
  <v-card class="card" min-height="450">
    <div ref="area" class="area d-flex align-center">
      <div ref="chart" class="chart"></div>
    </div>
  </v-card>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    dateTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartHeight: 450,
      chartWeight: 600,
      // the Echarts instance
      chart: null,
      // the ECharts Option
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  watch: {
    dateTime() {
      // this.updateSize()
    }
  },
  mounted() {
    // create ECharts Instance
    this.chart = echarts.init(this.$refs.chart)
    // binding resize handler
    window.addEventListener('resize', this.resizeHandler)

    this.chart.setOption(this.option)
  },
  beforeDestroy() {
    // dispose ECharts Instance
    this.chart.dispose()
    // unbinding resize handler
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler() {
      this.chart.resize()
    }
  }
}
</script>

<style scoped>
.card {
  height: 100%;
}

.area {
  height: 100%;
  padding: 0px;
  margin: 0px;
}

.chart {
  height: 450px;
  width: 100%;
}
</style>
