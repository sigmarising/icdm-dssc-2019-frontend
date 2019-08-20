<template>
  <v-card class="card">
    <div ref="chart" class="chart"></div>
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
          text: 'Knowledge Graph'
        },
        legend: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            circular: {
              rotateLabel: true
            },
            roam: true,
            draggable: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            label: {
              show: true
            },
            edgeLabel: {
              show: true
            },
            itemStyle: {
              borderColor: '#FFFFFF',
              borderWidth: 1,
              shadowBlur: 4,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 7
              },
              itemStyle: {
                borderColor: '#FFFFFF',
                borderWidth: 3,
                shadowBlur: 6,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
            categories: [{ name: 'c1' }, { name: 'c2' }],
            nodes: [
              {
                name: 'car',
                value: 10,
                category: 'c1'
              },
              {
                name: 'people',
                value: 10,
                category: 'c1'
              },
              {
                name: 'store',
                value: 10,
                category: 'c2'
              }
            ],
            edges: [
              {
                source: 'car',
                target: 'people',
                label: {
                  formatter: 'drive'
                }
              },
              {
                source: 'car',
                target: 'store',
                label: {
                  formatter: 'at'
                }
              }
            ]
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
  padding: 14px;
}

.chart {
  height: 100%;
  width: 100%;
  min-height: 500px;
}
</style>
