import axios from '../axios/coinConfig'

const ApplyApi = {
  getApplyCount () {
    return axios.post('/orders/58b/appliedCount')
  },
  getAsset () {
    return axios.post('/orders/ucc/asset')
  },
  apply (size, tradePass) {
    return axios.post('/orders/58b/apply', {
      size,
      tradePass
    })
  },
  // 申购记录
  getList58B (page, pageSize) {
    return axios.post('/orders/58b/list', {
      page: page,
      pageSize: pageSize
    })
  },
  isNeedPwd () {
    return axios.post('/orders/trade_pwd/need')
  }
}

export default ApplyApi
