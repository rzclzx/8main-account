import axios from '../axios/coinConfig'
import swapAxios from '../axios/swapAxiosConfig'

const ToolsApi = {
  // 获取服务器时间偏移量
  getOffset () {
    return axios.get('/tools/time/zone/offset')
  },
  // 获取币币产品列表
  getProductList () {
    return axios.post('/tools/dict/product/list')
  },
  // 获取算力产品列表
  getContractList () {
    return swapAxios.post('/contract/list')
  },
  // 获取币种列表
  getCoinList () {
    return axios.post('/tools/dict/currency/list/all')
  },
  // 获取全部账户
  getSiteList () {
    return axios.post('/tools/dict/site/list')
  },
  // 获取主账户信息
  getMainSite () {
    return axios.post('/tools/dict/site/main')
  },
  getSiteSupportCurrencyList () {
    return axios.post('/tools/dict/currency/site/all')
  },
  // 获取站点支持币种
  getCurrencyAll () {
    return axios.post('/tools/dict/site/currency/all')
  },
  // 获取自选交易对
  getOptionalProduct () {
    return axios.post('/optional/get')
  },
  // 新增自选
  addOptionalProduct (productId) {
    return axios.post('/optional/add', { productId })
  },
  // 删除自选
  removeOptionalProduct (productId) {
    return axios.post('/optional/remove', { productId })
  },
  // 获取美元兑人民币汇率
  getUsdCnyRate () {
    return axios.get('/market/rate/usd_cny')
  },
  // getProductOrder
  getProductOrder () {
    return axios.post('/tools/dict/get/quoteCurrency')
  }
}

export default ToolsApi
