import * as types from '../mutation-types'

let state = {
  token: null,
  shareid: '',
  locale: 'cn'
}

let mutations = {
  [types.SET_COOKIE] (state, payload) {
    state.token = payload.token
  },
  [types.SET_SHAREID] (state, payload) {
    state.shareid = payload.shareid
  },
  [types.SET_LOCALE] (state, payload) {
    state.locale = payload.locale
  }
}

export default {
  state,
  mutations
}
