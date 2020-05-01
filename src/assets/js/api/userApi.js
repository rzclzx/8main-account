import axios from '../axios/coinConfig'
import otcAxios from '../axios/otcAxiosConfig'

const UserApi = {
  // 获取用户信息
  getUserInfo () {
    return axios.post('/user/userinfo')
  },
  // 设置当前用户的昵称
  setNickname (nickName) {
    return axios.post('/user/nickname/set', {
      nickName: nickName
    })
  },
  // 用户登录记录
  getLoginRecord () {
    return axios.post('/user/login/record')
  },
  // 发送短信验证码。如果指定了mobile，则会发送到这个手机号;否则发送到当前用户绑定的手机号。
  getSMSCode (purpose, nation, mobile, ticket, channel) {
    return axios.post('/user/security/sms_code/send', {
      purpose: purpose,
      nation: nation,
      mobile: mobile,
      ticket: ticket,
      channel: channel
    })
  },
  // 绑定邮箱
  bindEmail (email, ticket) {
    return axios.post('/user/security/bind/email', {
      email: email,
      ticket: ticket
    })
  },
  // 检查短信验证码
  verifySMSCode (code, ticket, channel) {
    return axios.post('/user/security/sms_code/verify', {
      code: code,
      ticket: ticket,
      channel: channel
    })
  },
  // 校验Google验证码
  verifyGoogle (ticket, code, purpose, channel) {
    return axios.post('/user/security/google_code/verify', {
      ticket: ticket,
      code: code,
      purpose: purpose,
      channel: channel
    })
  },
  // 获得一个新的图片验证码图片
  refreshCaptcha: (purpose, ticket) => {
    return axios.post('/user/security/captcha/refresh', {
      purpose: purpose,
      ticket: ticket
    })
  },
  getCaptcha: (ticket) => {
    return axios.post('/user/security/captcha/show', {
      ticket: ticket
    })
  },
  // 校验captcha
  verifyCaptcha: (ticket, captcha) => {
    return axios.post('/user/security/captcha/verify', {
      ticket: ticket,
      captcha: captcha
    })
  },
  // 绑定google
  bindGoogle (ticket, twiceAuth, channel) {
    return axios.post('/user/security/google_code/bind', {
      ticket: ticket,
      twiceAuth: twiceAuth,
      channel: channel
    })
  },
  // 更换google
  modifyGoogle (ticket, channel) {
    return axios.post('/user/security/google_code/change', {
      ticket: ticket,
      channel: channel
    })
  },
  // 解绑google
  unbindGoogle (ticket) {
    return axios.post('/user/security/google_code/unbind', {
      ticket: ticket
    })
  },
  // 用户注册
  register (password, ticket, inviterId) {
    return axios.post('/user/registration/register', {
      password: password,
      ticket: ticket,
      inviterId: inviterId
    })
  },
  // 登录
  login (userName, password, googleCode, ticket, device) {
    return axios.post('/user/login', {
      googleCode: googleCode,
      user_name: userName,
      password: password,
      ticket: ticket,
      device: device
    })
  },
  // 验证登录密码
  verifyLoginPwd (purpose, password, ticket) {
    return axios.post('/user/security/login_pwd/verify', {
      purpose: purpose,
      password: password,
      ticket: ticket
    })
  },
  // 修改登录密码
  modifyLoginPwd (ticket, password) {
    return axios.post('/user/security/login_pwd/change', {
      ticket: ticket,
      password: password
    })
  },
  // 验证登录时需要输入Google或短信验证码
  verifyLoginGoogle (account) {
    return axios.post('/user/login/need/verify', {
      account: account
    })
  },
  // 重置登录密码 —— 获取用户信息
  userInfoReset (account) {
    return axios.post('/user/security/login_pwd/reset/userinfo', {
      account: account
    })
  },
  // 重置登录密码 —— 验证证件号
  identityNoVerify (ticket, identityNo) {
    return axios.post('/user/security/login_pwd/reset/verify/identity_no', {
      ticket: ticket,
      identityNo: identityNo
    })
  },
  // 重置登录密码
  resetLoginPwd (ticket, password) {
    return axios.post('/user/security/login_pwd/reset', {
      ticket: ticket,
      password: password
    })
  },
  // 创建API
  createAPI (ticket, apiName, ipList) {
    return axios.post('/user/authorization/create', {
      ticket: ticket,
      apiName: apiName,
      ipList: ipList
    })
  },
  // 安全通知配置
  getSafeNotice () {
    return axios.post('/user/security/notice/info')
  },
  setNotice (type, open) {
    return axios.post('/user/security/notice/set', {
      type: type,
      open: open
    })
  },
  // 获取我的API列表
  getAPIList () {
    return axios.post('/user/authorization/list')
  },
  // 获取API详情（为修改时使用，不会返回apiKey,apiSecret）
  getAPISimple (id) {
    return axios.post('/user/authorization/get/simple', {
      id: id
    })
  },
  // 获取API信息(获取全部信息,包括api key, secret)
  getAPI (ticket, id) {
    return axios.post('/user/authorization/get', {
      ticket: ticket,
      id: id
    })
  },
  // 修改API信息
  modifyAPI (ticket, id, apiName, ipList) {
    return axios.post('/user/authorization/update', {
      ticket: ticket,
      id: id,
      apiName: apiName,
      ipList: ipList
    })
  },
  // 删除API
  deleteAPI (id) {
    return axios.post('/user/authorization/delete', {
      id: id
    })
  },
  // 国家码字典
  listCountry () {
    return axios.post('/tools/dict/country/list')
  },
  // 进行普通认证
  realNameVerify ({country, realName, idCard}, ticket) {
    return axios.post('/user/verify/real_name', {
      country: country,
      realName: realName,
      idCard: idCard,
      ticket: ticket
    })
  },
  // 为当前用户生成一个用于Google验证码的密钥。如果该用户之前已经生成过该密钥，则新的密钥将覆盖原来的密钥。
  getGoogleKey (ticket, purpose, channel) {
    return axios.post('/user/security/google_code/generate_key', {
      ticket: ticket,
      purpose: purpose,
      channel: channel
    })
  },
  // 校验资金密码
  verifyMoneyPossword (purpose, ticket, fundPassword) {
    return axios.post('/user/security/fund_password/verify', {
      purpose: purpose,
      ticket: ticket,
      fund_password: fundPassword
    })
  },
  // 设置资金密码
  verifyFundPwd (password, purpose, ticket) {
    return axios.post('/user/security/trade_pwd/verify', {
      password: password,
      purpose: purpose,
      ticket: ticket
    })
  },
  // 设置资金密码
  bindFundPwd (password, ticket) {
    return axios.post('/user/security/trade_pwd/bind', {
      password: password,
      ticket: ticket
    })
  },
  // 修改资金密码
  modifyFundPwd (password, ticket) {
    return axios.post('/user/security/trade_pwd/change', {
      password: password,
      ticket: ticket
    })
  },
  // 重置资金密码
  resetFundPwd (password, ticket) {
    return axios.post('/user/security/trade_pwd/reset', {
      password: password,
      ticket: ticket
    })
  },
  // 资金密码确认（如果绑定了邮箱，跳转到邮箱后会返回一个ticket，用了访问这个接口）
  confirmFundPwd (ticket) {
    return axios.post('/user/security/trade_pwd/confirm', {
      ticket: ticket
    })
  },
  // 登录验证策略
  loginVerifyStrategy (type, ticket) {
    return axios.post('/user/security/verify_strategy/login', {
      type: type,
      ticket: ticket
    })
  },
  // 二次验证策略
  twiceStrategy (type, ticket) {
    return axios.post('/user/security/verify_strategy/twice', {
      type: type,
      ticket: ticket
    })
  },
  // 交易验证策略
  tradeStrategy (type, ticket) {
    return axios.post('/user/security/verify_strategy/trade', {
      type: type,
      ticket: ticket
    })
  },
  // 确定邮箱
  confirmEmail: (ticket) => {
    return axios.post('/user/security/bind/email/confirm', {
      ticket: ticket
    })
  },
  // 资金密码设置邮件发送确认
  tradePwdConfirm (ticket) {
    return axios.post('/user/security/trade_pwd/confirm', {
      ticket: ticket
    })
  },
  // 获取已邀请人数
  getInvitedCount () {
    return axios.post('/user/invitee/count')
  },
  // 获取已邀请人数列表
  getInvitedList (curPage, pageSize) {
    return axios.post('/user/invitee/list', { curPage, pageSize })
  },
  // 修改绑定手机号 --- 绑定了谷歌
  changeMobileGoogle (ticket, newMobile) {
    return axios.post('/user/security/update/mobile', {
      ticket: ticket,
      newMobile: newMobile
    })
  },
  // 修改绑定手机--没有绑定谷歌绑定了邮箱需要发送邮件
  changeMobileSendEmail (ticket, newMobile) {
    return axios.post('/user/security/update_mobile/send_email', {
      ticket: ticket,
      newMobile: newMobile
    })
  },
  // 获取用户个人信息
  userPersonalInfo () {
    return axios.post('/user/user_personal_info')
  },
  // get oss token
  getOssToken (fileName) {
    return otcAxios.post('/otc/tools/oss/token', {
      fileName: fileName
    })
  },
  // upload to oss
  uploadOss (url, data, config) {
    return axios.post(url, data, config)
  },
  // 进行高级认证
  idCardPicVerify (path) {
    return axios.post('/user/verify/idcard_pic', { pic_path: path })
  },
  // 校验阿里滑块
  aliCaptcha: (purpose, csessionid, deviceIdentify, ticket, sig, token, scene) => {
    return axios.post('/user/security/afs/captcha/verify', {
      purpose: purpose,
      sessionId: csessionid,
      deviceIdentify: deviceIdentify,
      ticket: ticket,
      sig: sig,
      token: token,
      scene: scene
    })
  }
}

export default UserApi
