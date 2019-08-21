export const state = () => ({
  dateTime: '',
  textInput: '',
  graphType: 'force',
  isTextAreaAvaliable: false,
  // loading control of all input
  isLoading: false,
  echartsNodes: [
    {
      name: 'car',
      value: 10,
      category: 'c1',
      symbolSize: 30
    },
    {
      name: 'people',
      value: 10,
      category: 'c1',
      symbolSize: 20
    },
    {
      name: 'store',
      value: 10,
      category: 'c2',
      symbolSize: 50
    }
  ],
  echartsEdges: [
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
  ],
  echartsCategories: [{ name: 'c1' }, { name: 'c2' }]
})

export const mutations = {
  updateDateTime(state) {
    state.dateTime = Date()
  },
  setInputText(state, text) {
    state.textInput = text
  },
  setGraphType(state, type) {
    state.graphType = type
  },
  setTextAreaAvaliable(state, val) {
    state.isTextAreaAvaliable = val
  },
  setIsLoading(state, val) {
    state.isLoading = val
  },
  setEchartsNodes(state, val) {
    state.echartsNodes = val
  },
  setEchartsEdges(state, val) {
    state.echartsEdges = val
  },
  setEchartsCategories(state, val) {
    state.echartsCategories = val
  }
}
