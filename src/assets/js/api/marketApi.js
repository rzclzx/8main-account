import axios from '../axios/coinConfig'
import swapAxios from '../axios/swapAxiosConfig'

const MarketApi = {
  // get spot ticker
  getTicker (product) {
    return axios.post('/market/ticker', {
      product: product
    })
  },
  // get all spot ticker
  getAllTicker () {
    return axios.post('/market/ticker/all')
  },
  // get hash ticker
  getSwapAllTicker () {
    return swapAxios.post('/market/ticker/all')
  },
  getAvgPrice (coinName) {
    return axios.post('/ticker/avg/new', {
      coinName
    })
  },
  getBar (product, type, since) {
    return swapAxios.post('market/bar', {
      product: product,
      type: type,
      since: since
    })
  }
}

export default MarketApi
