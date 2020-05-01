// 用户模块数据管理
import * as types from '../mutation-types'

let state = {
  userInfo: null
}

let mutations = {
  [types.SAVE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  state,
  mutations
}
