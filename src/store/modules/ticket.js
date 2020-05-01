// 验证数据管理
import * as types from '../mutation-types'

let state = {
  // 注册
  registerTicket: '',
  // 登录
  loginTicket: '',
  // 修改登录密码
  modifyPasswordTicket: '',
  // 重置登录密码
  resetPasswordTicket: '',
  // 设置资金密码
  setFundPasswordTicket: '',
  // 重置资金密码
  resetFundPasswordTicket: '',
  // 修改资金密码
  modifyFundPasswordTicket: '',
  // 绑定资金密码
  bindFundTicket: '',
  // 绑定手机
  bindPhoneTicket: '',
  // 解绑手机
  unBindPhoneTicket: '',
  // 绑定邮箱 6
  bindEmailTicket: '',
  // 解绑邮箱
  unBindEmailTicket: '',
  // 绑定Google
  bindGoogleTicket: '',
  // 创建Api 11
  createApiTicket: '',
  // 查看Api 12
  getApiTicket: '',
  // 修改Api 13
  modifyApiTicket: '',
  // 解绑Google
  unbindGoogleTicket: '',
  // 重置修改Google
  modifyGoogleTicket: '',
  // 登录验证策略 25
  loginVerifyTicket: '',
  // 修改手机号 37
  modifyMobileTicket: '',
  // 二次认证 26
  twiceTicket: '',
  // 交易验证
  tradeTicket: '',
  // 人民币提现
  moneyTicket: '',
  // 数字火币提现
  coinTicket: '',
  // 身份认证
  idTicket: ''
}

let mutations = {
  [types.SAVE_TICKET] (state, payload) {
    state[payload.type] = payload.ticket
  }
}

export default {
  state,
  mutations
}
