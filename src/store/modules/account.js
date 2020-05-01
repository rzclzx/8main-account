import * as types from '../mutation-types'
import AccountApi from '../../assets/js/api/accountApi'

let state = {
  mainAssets: null,
  detailAssets: null,
  labsAssets: null
}

const mutations = {
  [types.SET_MAIN_ASSETS] (state, payload) {
    state[payload.type] = payload.data
  }
}

const actions = {
  getAssetsMain ({ commit }) {
    return AccountApi.getAssetsMain()
      .then(res => {
        commit('SET_MAIN_ASSETS', {
          type: 'mainAssets',
          data: res.data.assets
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  getAssetsDetail ({ commit }) {
    return AccountApi.getAssetsDetail()
      .then(res => {
        commit('SET_MAIN_ASSETS', {
          type: 'detailAssets',
          data: res.data.assetsDetail
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  getAssetsLabs ({ commit }) {
    return AccountApi.getAssetsLabs()
      .then(res => {
        commit('SET_MAIN_ASSETS', {
          type: 'labsAssets',
          data: res.data.assetsDetails
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export default {
  state,
  actions,
  mutations
}
