// vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import dictionary from './modules/dictionary' // 字典模块
import manage from './modules/manage'
import ticket from './modules/ticket'
import market from './modules/market'
import auth from './modules/auth'
import account from './modules/account'
import successive from './modules/successive'
import UserApi from '../assets/js/api/userApi'
import AccountApi from '../assets/js/api/accountApi'
import AccountDetail from './modules/accountDetail'
import router from "../router";

Vue.use(Vuex)

let state = {
  contractList: null,
  noticeContent: '',
  notice: ''
}

const actions = {
  getUserInfo(context, payload) {
    return UserApi.getUserInfo()
      .then(res => {
        context.commit('SAVE_USER_INFO', res.data.info)
      })
      .catch(() => {
        console.log('用户未登录！')
        context.commit('SET_COOKIE', {
          token: null
        })
      })
  },
  // 发送短信验证码
  getSMSCode(context, payload) {
    return UserApi.getSMSCode(payload.purpose, payload.nation, payload.mobile, payload.ticket, payload.channel)
      .then(res => {
        context.commit('SAVE_TICKET', {
          type: payload.ticketType,
          ticket: res.data.ticket
        })
      })
  },
  // 验证google
  verifyGoogle(context, payload) {
    return UserApi.verifyGoogle(payload.ticket, payload.googleCode, payload.purpose, payload.channel)
      .then(res => {
        context.commit('SAVE_TICKET', {
          type: payload.ticketType,
          ticket: res.data.ticket
        })
        return res
      })
  },
  // 验证短信
  verifyCode(context, payload) {
    return UserApi.verifySMSCode(payload.code, payload.ticket, payload.channel)
  },
  twiceVerify(context, payload) {
    if (context.state.manage.userInfo || payload.twiceGoogleAuth || payload.twiceMobileAuth) {
      return new Promise(resolve => resolve())
        .then(res => {
          if (payload.twiceGoogleAuth || (context.state.manage.userInfo && context.state.manage.userInfo.twiceGoogleAuth)) return actions.verifyGoogle(context, payload)
          return res
        })
        .then(res => {
          if (payload.twiceMobileAuth || (context.state.manage.userInfo && context.state.manage.userInfo.twiceMobileAuth)) return actions.verifyCode(context, payload)
          return res
        })
    }
  },
  getMoneyPwdTicket(context, payload) {
    return AccountApi.verifyFundPwd(payload.password, payload.purpose, payload.ticket)
  }
}

const mutations = {
  SAVE_CONTRACT (state, payload) {
    state.contractList = payload.data
  },
  SHOW_NOTICE (state, payload) {
    state.notice = payload.notice
    state.parameter = payload.parameter
  },
  SHOW_NOTICE_CONTENT (state, payload) {
    state.noticeContent = payload.noticeContent
    state.parameter = payload.parameter
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    dictionary,
    manage,
    market,
    ticket,
    auth,
    account,
    successive,
    AccountDetail
  }
})
