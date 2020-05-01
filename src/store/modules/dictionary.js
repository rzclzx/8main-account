// 字典数据管理
import * as types from '../mutation-types'
import AccountApi from '../../assets/js/api/accountApi'

let state = {
  productList: null,
  currencyList: null,
  listTransfer: null
}
let mutations = {
  [types.SAVE_DICTIONARY] (state, payload) {
    state[payload.type] = payload.data
  }
}
const actions = {
  // 获取转账记录
  getListTransfer({commit}) {
    return AccountApi.listTransfer(1, 6)
      .then(res => {
        commit('SAVE_DICTIONARY', {
          type: 'listTransfer',
          data: res.data.transferList
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
export default {
  state,
  mutations,
  actions
}
