export const state = () => ({
  dateTime: '',
  textInput: '',
  graphType: 'force',
  inputSelect: 'article',
  directedSelected: 'undirected',
  classificationSelected: 'entity',
  // loading control of all input
  isLoading: false,
  echartsNodes: [
    {
      name: 'Junwei Sun',
      value: 1,
      symbolSize: 25,
      category: ''
    },
    {
      name: 'BUPT-IBL',
      value: 5,
      symbolSize: 50,
      category: ''
    },
    {
      name: 'Yun Zhang',
      value: 1,
      symbolSize: 25,
      category: ''
    },
    {
      name: 'Ting Bai',
      value: 1,
      symbolSize: 25,
      category: ''
    },
    {
      name: 'Bin Wu',
      value: 1,
      symbolSize: 25,
      category: ''
    },
    {
      name: '2019 ICDM/ICBK KGC Contest',
      value: 1,
      symbolSize: 50,
      category: ''
    }
  ],
  echartsEdges: [
    {
      source: 'Junwei Sun',
      target: 'BUPT-IBL',
      label: {
        formatter: 'belong to'
      }
    },
    {
      source: 'BUPT-IBL',
      target: '2019 ICDM/ICBK KGC Contest',
      label: {
        formatter: 'participate in'
      }
    },
    {
      source: 'Yun Zhang',
      target: 'BUPT-IBL',
      label: {
        formatter: 'belong to'
      }
    },
    {
      source: 'Ting Bai',
      target: 'BUPT-IBL',
      label: {
        formatter: 'belong to'
      }
    },
    {
      source: 'Bin Wu',
      target: 'BUPT-IBL',
      label: {
        formatter: 'belong to'
      }
    }
  ],
  echartsClassification: {
    entityCategory: {
      'Junwei Sun': 'PERSON',
      'BUPT-IBL': 'TEAM',
      'Yun Zhang': 'PERSON',
      'Ting Bai': 'PERSON',
      'Bin Wu': 'PERSON',
      '2019 ICDM/ICBK KGC Contest': 'CONTEST'
    },
    communitiesDetection: {
      'Junwei Sun': 'community 1',
      'BUPT-IBL': 'community 1',
      'Yun Zhang': 'community 1',
      'Ting Bai': 'community 1',
      'Bin Wu': 'community 1',
      '2019 ICDM/ICBK KGC Contest': 'community 1'
    }
  },
  echartsCategories: {
    entityCategory: [
      {
        name: 'CONTEST'
      },
      {
        name: 'PERSON'
      },
      {
        name: 'TEAM'
      }
    ],
    communitiesDetection: [
      {
        name: 'community 1'
      }
    ]
  }
})

export const getters = {
  edgeSymbol(state) {
    if (state.directedSelected === 'undirected') return ['none', 'none']
    else if (state.directedSelected === 'directed') return ['none', 'arrow']
  },
  classifyKey(state) {
    if (state.classificationSelected === 'entity') return 'entityCategory'
    else if (state.classificationSelected === 'community')
      return 'communitiesDetection'
  }
}

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
  setInputSelect(state, type) {
    state.inputSelect = type
  },
  setDirectedSelected(state, type) {
    state.directedSelected = type
  },
  setClassificationSelected(state, type) {
    state.classificationSelected = type
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
  setEchartsClassification(state, val) {
    state.echartsClassification = val
  },
  setEchartsCategories(state, val) {
    state.echartsCategories = val
  }
}
