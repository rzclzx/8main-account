import * as types from '../mutation-types'
import MarketApi from '../../assets/js/api/marketApi'

let state = {
  ticker: {},
  swapTicker: null
}
let mutations = {
  [types.SAVE_TICKER] (state, payload) {
    state[payload.type] = payload.ticker
  }
}
let actions = {
  getSpotAllTicker (context) {
    return MarketApi.getAllTicker()
      .then(res => {
        let ticker = {}
        res.data['ticker_all'].map(item => {
          ticker[item.productId] = item
        })
        context.commit('SAVE_TICKER', {
          type: 'ticker',
          ticker: ticker
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  getSwapAllTicker (context) {
    return MarketApi.getSwapAllTicker()
      .then(res => {
        let ticker = {}
        res.data['ticker_all'].map(item => {
          ticker[item.productId] = item
        })
        context.commit('SAVE_TICKER', {
          type: 'swapTicker',
          ticker: ticker
        })
        return res
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
