<template>
  <v-card class="card">
    <div ref="chart" class="chart"></div>
  </v-card>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {},
  data() {
    return {
      // the Echarts instance
      chart: null,
      // the ECharts Option
      option: {
        title: {
          text: 'Knowledge Graph'
        },
        legend: { bottom: 15 },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: this.$store.state.ShareVar.graphType,
            force: {
              repulsion: 400,
              edgeLength: 200
            },
            circular: {
              rotateLabel: true
            },
            roam: true,
            draggable: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            edgeSymbol: this.$store.getters['ShareVar/edgeSymbol'],
            edgeSymbolSize: 10,
            label: {
              show: true,
              fontSize: 15
            },
            edgeLabel: {
              show: true,
              fontSize: 12
            },
            itemStyle: {
              borderColor: '#FFFFFF',
              borderWidth: 1,
              shadowBlur: 4,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
              opacity: 0.6
            },
            emphasis: {
              lineStyle: {
                width: 3,
                opacity: 0.5
              },
              itemStyle: {
                borderColor: '#FFFFFF',
                borderWidth: 3,
                shadowBlur: 6,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
            nodes: this.$store.state.ShareVar.echartsNodes,
            edges: this.$store.state.ShareVar.echartsEdges,
            categories: this.$store.state.ShareVar.echartsCategories
          }
        ]
      }
    }
  },
  computed: {
    dateTime() {
      return this.$store.state.ShareVar.dateTime
    },
    graphLayoutType() {
      return this.$store.state.ShareVar.graphType
    },
    edgeSymbol() {
      return this.$store.getters['ShareVar/edgeSymbol']
    },
    classification() {
      return this.$store.getters['ShareVar/classifyKey']
    }
    // isLoading() {
    //   return this.$store.state.ShareVar.isLoading
    // }
  },
  watch: {
    dateTime() {
      this.chart.showLoading()

      this.updateData()

      this.chart.hideLoading()
      this.chart.setOption(this.option, true)
    },
    // The Fucking Teacher Ting Bai's Demand
    // Force to make classification responsitive
    classification() {
      this.chart.showLoading()

      this.updateData()

      this.chart.hideLoading()
      this.chart.setOption(this.option, true)
    },
    graphLayoutType() {
      this.chart.showLoading()
      this.option.series[0].layout = this.graphLayoutType
      this.chart.hideLoading()
      this.chart.setOption(this.option, true)
    },
    edgeSymbol() {
      this.chart.showLoading()
      this.option.series[0].edgeSymbol = this.edgeSymbol
      this.chart.hideLoading()
      this.chart.setOption(this.option, true)
    }
    // isLoading(val) {
    //   if (val) {
    //     this.chart.showLoading()
    //   } else {
    //     this.chart.hideLoading()
    //   }
    // }
  },
  mounted() {
    // create ECharts Instance
    this.chart = echarts.init(this.$refs.chart)
    // binding resize handler
    window.addEventListener('resize', this.resizeHandler)
    this.updateData()
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
    },
    updateData() {
      const classifyKey = this.classification
      this.option.series[0].nodes = []
      this.option.series[0].edges = []
      this.option.series[0].categories = []

      const vuexNodes = this.$store.state.ShareVar.echartsNodes
      const vuexEdges = this.$store.state.ShareVar.echartsEdges
      const vuexClassification = this.$store.state.ShareVar
        .echartsClassification
      const vuexCategories = this.$store.state.ShareVar.echartsCategories

      const thisNodes = []

      for (const val of vuexNodes) {
        thisNodes.push({
          name: val.name,
          value: val.value,
          category: vuexClassification[classifyKey][val.name],
          symbolSize: val.symbolSize
        })
      }

      this.option.series[0].nodes = thisNodes
      this.option.series[0].edges = vuexEdges
      this.option.series[0].categories = vuexCategories[classifyKey]
    }
  }
}
</script>

<style scoped>
.card {
  height: 100%;
  padding: 15px;
}

.chart {
  height: 100%;
  width: 100%;
  min-height: 500px;
}
</style>
