// axios配置
import axios from 'axios'
import qs from 'qs'
import apiConfig from '@/assets/js/config/api.config'
import Cookie from '@/assets/js/config/cookie'
import store from '@/store/index'

let coinAxios = axios.create()

// 请求baseURL
coinAxios.defaults.baseURL = apiConfig.agentURL

// 请求延迟
// coinAxios.defaults.timeout = 5000

// POST传参序列化
coinAxios.interceptors.request.use((config) => {
  config.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// post方法并且数据不是formData，序列化参数
  if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
    // config.data = qs.stringify(config.data)
  }
  // 无token时，尝试重新获取token
  if (!config.headers['access_token'] && Cookie.getCookie('token')) {
    config.headers['access_token'] = Cookie.getCookie('token')
  }
  if (!Cookie.getCookie('token') && config.headers['access_token']) {
    try {
      delete config.headers['access_token']
    } catch (err) {
      console.log(err)
    }
  }
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

// code状态码200判断
coinAxios.interceptors.response.use((res) => {
  if (parseInt(res.status) !== 200) return Promise.reject(res)
  if (res.data.code === 0) return res.data
  let parameter = ''
  if (res.data.code === 30019) parameter = res.data.data.limitPrice
  if (res.data.code === 105 || res.data.code === 110) {
    Cookie.clearCookie('token', apiConfig.domain)
    store.commit('SAVE_USER_INFO', null)
  }
  store.commit('SHOW_NOTICE', {
    notice: res.data.code,
    parameter: parameter
  })
  return Promise.reject(res)
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error)
})

export default coinAxios
