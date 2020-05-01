// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'babel-polyfill'
import limits from './assets/js/limits'
import rules from './assets/js/rules'

// 导入ui组件库
import StUI from '../node_modules/st-ui/src/main'
import {Toast} from './components/toast'
import CountDown from './components/st-ui'
// import Scrollbar from './components/st-ui/scrollbar'
// import Language from './components/st-ui/language'

// import StUI from '../node_modules/st-ui/src/main.js'

// 导入Api
import Api from './assets/js/api/index'
import ToolsApi from './assets/js/api/toolsApi'
import UserApi from './assets/js/api/userApi'
import ApiConfig from './assets/js/config/api.config'
import Cookie from './assets/js/config/cookie'

// 导入过滤器
import Filter from './assets/js/filter'

import Dictionary from './assets/js/dictionary'

// 导入国际化插件及语言包
import VueI18n from 'vue-i18n'
import LangConfig from './assets/js/i18n/config'

import CN from './assets/js/i18n/cn'
import EN from './assets/js/i18n/en'
import KO from './assets/js/i18n/ko'
import RU from './assets/js/i18n/ru'
import JA from './assets/js/i18n/ja'

import StCN from '../node_modules/st-ui/src/locale/lang/cn'
import StEN from '../node_modules/st-ui/src/locale/lang/en'
import StKO from '../node_modules/st-ui/src/locale/lang/ko'
import StRU from '../node_modules/st-ui/src/locale/lang/ru'
import StJA from '../node_modules/st-ui/src/locale/lang/ja'
Vue.use(VueI18n)

Vue.prototype.$limits = limits
Vue.prototype.$rules = rules

// 配置ui组件库
Vue.use(StUI.Row)
Vue.use(StUI.Form)
Vue.use(StUI.FormItem)
Vue.use(StUI.Input)
Vue.use(StUI.Select)
Vue.use(StUI.Option)
Vue.use(StUI.GoogleCode)
Vue.use(StUI.Checkbox)
Vue.use(StUI.Switch)
Vue.use(StUI.Content)
Vue.use(StUI.Footer)
Vue.use(StUI.Page)
Vue.use(CountDown)
// Vue.use(Slider)
// Vue.use(Popup)
Vue.use(Toast)
Vue.prototype.$toast = Toast
// Vue.use(Scrollbar)
// Vue.use(Language)
// Vue.use(StUI.Footer)

// 配置Api
Vue.use(Api)

// 配置过滤器
for (let key in Filter) {
  Vue.filter(key, Filter[key])
}

Vue.config.productionTip = false

const messages = {
  'en': {
    message: EN,
    ...StEN
  },
  'cn': {
    message: CN,
    ...StCN
  },
  'ko': {
    message: KO,
    ...StKO
  },
  'ja': {
    message: JA,
    ...StJA
  },
  'ru': {
    message: RU,
    ...StRU
  }
}

const hasLanguage = function (lang, obj) {
  let localeList = Object.keys(obj)
  return localeList.some(item => item === lang) ? lang : 'en'
}

const i18n = new VueI18n({
  locale: hasLanguage(LangConfig.getLang(), messages),    // 语言标识
  messages
})

Vue.use(Dictionary, i18n)

/* eslint-disable no-new */
ToolsApi.getProductList()
  .then(res => {
    store.commit('SAVE_DICTIONARY', {
      type: 'productList',
      data: res.data.productList
    })
  })
  .catch((e) => {
    console.log('Net Error')
  })
ToolsApi.getCoinList()
  .then(res => {
    store.commit('SAVE_DICTIONARY', {
      type: 'currencyList',
      data: res.data.currencyList
    })
  })
  .catch(e => {
    console.log(e)
  })
UserApi.getUserInfo()
  .then(res => {
    store.commit('SAVE_USER_INFO', res.data.info)
    new Vue({
      el: '#app',
      router,
      store,
      i18n,
      components: { App },
      template: '<App/>'
    })
  })
  .catch(() => {
    console.log('用户未登录！')
    if (Cookie.getCookie('token')) {
      Cookie.clearCookie('token', ApiConfig.domain)
    }
    window.location.replace(ApiConfig.mainDomain + 'manage/login')
  })
