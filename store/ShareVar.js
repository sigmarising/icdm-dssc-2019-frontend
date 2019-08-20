export const state = () => ({
  dateTime: '',
  textInput: '',
  graphType: 'force',
  isTextAreaAvaliable: false
})

export const mutations = {
  updateDateTime(state, time) {
    state.dateTime = time
  },
  setInputText(state, text) {
    state.textInput = text
  },
  setGraphType(state, type) {
    state.graphType = type
  },
  setTextAreaAvaliable(state, val) {
    state.isTextAreaAvaliable = val
  }
}
