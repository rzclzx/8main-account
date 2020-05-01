
let state = {
  language: null,
  sendEmainText: null,
  isSendEmails: null,
  index: null,
  setTimeS: null,
  int: null
}

let mutations = {
  'SAVE_EMAIN_TIME'(state, payload) {
    state.sendEmainText = payload.sendEmainText
    state.isSendEmails = payload.isSendEmails
    state.index = payload.index
    state.setTimeS = payload.setTimeS
    state.int = payload.int
  },
  'SAVE_EMAIN_INDEX'(state, payload) {
    state.index = payload.index
  },
  'SAVE_EMAIN_LANGUAGE'(state, payload) {
    state.language = payload.language
  }
}

export default {
  state,
  mutations
}
