// 用户模块数据管理
import * as types from '../mutation-types'

let state = {
  successive: null
}

let mutations = {
  [types.SET_SUCCESSIVE] (state, payload) {
    state.successive = payload.successive
  }
}

export default {
  state,
  mutations
}
