import axios from '../axios/coinConfig'

const AccountApi = {
  // 主账户资产信息
  getAssetsMain (getWithdraw) {
    return axios.post('/account/assets/main', {
      getWithdraw: getWithdraw
    })
  },
  // 各账户资产明细信息
  getAssetsDetail () {
    return axios.post('/account/assets/detail')
  },
  // 获取用户杠杆账户资产
  getAssetsLabs () {
    return axios.post('/account/assets/lever')
  },
  // 获取用户各站点总资产（换算成btc）
  getSitesAll (currency) {
    return axios.post('/account/assets/sites/all', {currency: currency})
  },
  // 转账请求
  transfer (currencyId, triggerSiteId, targetSiteId, amount, triggerComment, targetComment, swapsForce) {
    return axios.post('/account/transfer/request', {currencyId, triggerSiteId, targetSiteId, amount, triggerComment, targetComment, swapsForce})
  },
  // 用户掉期账户可用余额和持仓状态
  swapsAvailable (currencyId) {
    return axios.post('/account/swaps/max/available', {currencyId: currencyId})
  },
  // 数字充值----获取充值地址
  getCoinAddress (currency) {
    return axios.post('/deposit/coin/address/get', {
      currency: currency,
      flag: true
    })
  },
  // 数字充值----获取充值记录
  getCoinRecordList (currency, curPage) {
    return axios.post('/deposit/coin/record/list', {
      currency: currency,
      curPage: curPage
    })
  },
  // 获取提现手续费
  getWithdrawFee (currencyId) {
    return axios.get('/withdrawFee/' + currencyId + '/list')
  },
  // 添加提现地址
  getCoinAddAddress: (currency, type, address, tag, trust, paymentId, ticket) => {
    return axios.post('/withdraw/coin/address/add', {ticket, currency, type, address, tag, trust, paymentId})
  },
  // 删除提现地址
  getCoinDeleteAddress: (currency, addressId) => {
    return axios.post('/withdraw/coin/address/delete', {currency, addressId})
  },
  // 提现地址列表
  getCoinAddressList (currency) {
    return axios.post('/withdraw/coin/address/list', {currency})
  },
  // 添加提现地址邮件确认
  getCoinResendConfirmAddress: (addressId) => {
    return axios.post('/withdraw/coin/address/resend/email/confirm', {addressId})
  },
  // 提币接口
  takeCoin: (currency, feeCurrency, addressId, amount, fee, ticket) => {
    return axios.post('/withdraw/coin/request', {
      ticket: ticket,
      currency: currency,
      feeCurrency: feeCurrency,
      addressId: addressId,
      amount: amount,
      fee: fee
    })
  },
  // 查询提币记录
  takeCoinRecords: (currency, curPage) => {
    return axios.post('/withdraw/coin/records', {
      currency: currency,
      curPage: curPage
    })
  },
  // 重发提币邮件确认
  takeCoinReConfirm: (withdrawId) => {
    return axios.post('/withdraw/coin/resend/email/confirm', {
      withdrawId: withdrawId
    })
  },
  // 提币撤回
  takeCoinCancel: (withdrawId) => {
    return axios.post('/withdraw/coin/cancel', {withdrawId})
  },
  // 账单详情
  getLedger (siteId, ledgerType, currencyId, action, curPage, productId) {
    return axios.post('/account/ledgers', {
      siteId: siteId,
      ledgerType: ledgerType,
      currencyId: currencyId,
      action: action,
      curPage: curPage,
      productId: productId
    })
  },
  // 验证资金密码
  verifyFundPwd (password, purpose, ticket) {
    return axios.post('/user/security/trade_pwd/verify', {
      password: password,
      purpose: purpose,
      ticket: ticket
    })
  },
  // 添加提现地址邮件确认
  getCoinConfirmAddress: (ticket) => {
    return axios.post('/withdraw/coin/address/add/confirm', {ticket})
  },
  // 提币邮件确认接口
  takeCoinConfirm: (ticket) => {
    return axios.post('/withdraw/coin/request/confirm', {
      ticket: ticket
    })
  },
  // 修改绑定手机 邮箱确认
  confirmMobile: (ticket) => {
    return axios.post('/user/security/update/mobile/confirm', {
      ticket: ticket
    })
  },
  // 转账记录
  listTransfer (curPage, targetSite) {
    return axios.post('/account/transfer/list', {curPage, targetSite})
  }
}

export default AccountApi
