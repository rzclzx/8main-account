import axios from '../axios/coinConfig'

const ManageApi = {
  // 验证登录时需要输入Google或短信验证码
  loginNeedVerify (account) {
    return axios.post('/user/login/need/verify', {
      account: account
    })
  },
  // 登录
  login (username, password, googleCode, ticket, device) {
    return axios.post('/user/login', {
      googleCode: googleCode,
      user_name: username,
      password: password,
      ticket: ticket,
      device: device
    })
  },
  // 退出登录
  logout () {
    return axios.post('/user/logout')
  }
}

export default ManageApi
