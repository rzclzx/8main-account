import Vue from 'vue'
import Router from 'vue-router'
import Cookie from '@/assets/js/config/cookie'
import ApiConfig from '@/assets/js/config/api.config'

Vue.use(Router)

const authUser = (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!Cookie.getCookie('token')) {
      window.location.href = ApiConfig.mainDomain + 'manage/login'
    } else {
      next()
    }
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/account',
      component: resolve => require(['@/pages/account/index.vue'], resolve),
      beforeEnter: authUser,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/account/deposit',
      component: resolve => require(['@/pages/account/deposit/index'], resolve),
      name: 'account-deposit'
    },
    {
      path: '/account/deposit/:name',
      component: resolve => require(['@/pages/account/deposit/_name'], resolve),
      name: 'account-deposit-name'
    },
    {
      path: '/account/withdraw',
      component: resolve => require(['@/pages/account/withdraw/index'], resolve),
      name: 'account-withdraw'
    },
    {
      path: '/account/withdraw/:name',
      component: resolve => require(['@/pages/account/withdraw/_name'], resolve),
      name: 'account-withdraw-name'
    },
    {
      path: '/account/withdraw/detail/:name',
      component: resolve => require(['@/pages/account/withdraw/detail/_name'], resolve)
    },
    {
      name: 'address',
      path: '/account/withdraw/address/:name',
      component: resolve => require(['@/pages/account/withdraw/address/_name'], resolve),
    },
    {
      path: '/account/bills',
      component: resolve => require(['@/pages/account/bills/index'], resolve)
    },
    {
      path: '/account/bills/record',
      component: resolve => require(['@/pages/account/bills/record'], resolve)
    },
    {
      path: '/account/deposit/detail/:name',
      component: resolve => require(['@/pages/account/deposit/detail/_name'], resolve)
    },
    {
      path: '/users',
      component: resolve => require(['@/pages/users'], resolve)
    },
    {
      path: '/users/info',
      component: resolve => require(['@/pages/users/info/index.vue'], resolve)
    },
    {
      path: '/users/info/auth/high',
      component: resolve => require(['@/pages/users/info/index.vue'], resolve)
    },
    {
      path: '/users/info/auth/success',
      component: resolve => require(['@/pages/users/info/auth/success.vue'], resolve),
      name: 'users-info-auth-success'
    },
    {
      path: '/users/safe',
      component: resolve => require(['@/pages/users/safe'], resolve)
    },
    {
      path: '/users/safe/mobile',
      component: resolve => require(['@/pages/users/safe/mobile/index.vue'], resolve)
    },
    {
      path: '/users/safe/mobile/change',
      component: resolve => require(['@/pages/users/safe/mobile/change/index.vue'], resolve)
    },
    {
      path: '/users/safe/mobile/change/send_email',
      component: resolve => require(['@/pages/users/safe/mobile/change/send_email.vue'], resolve)
    },
    {
      path: '/users/safe/change_login_password',
      component: resolve => require(['@/pages/users/safe/change_login_password'], resolve)
    },
    {
      path: '/users/safe/email/bind',
      component: resolve => require(['@/pages/users/safe/email/bind'], resolve)
    },
    {
      path: '/users/safe/email/bind/send_email',
      component: resolve => require(['@/pages/users/safe/email/bind/send_email.vue'], resolve),
      name: 'users-safe-email-bind-sendemail'
    },
    {
      path: '/users/safe/email/change',
      component: resolve => require(['@/pages/users/safe/email/change'], resolve)
    },
    {
      path: '/users/safe/email/bind/send_email',
      component: resolve => require(['@/pages/users/safe/email/change/send_email.vue'], resolve),
      name: 'users-safe-email-change-sendemail'
    },
    {
      path: '/users/safe/confirm',
      component: resolve => require(['@/pages/users/safe/confirm'], resolve)
    },
    {
      path: '/users/safe/confirm/success',
      component: resolve => require(['@/pages/users/safe/confirm/success.vue'], resolve)
    },
    {
      path: '/users/safe/confirm/fail',
      component: resolve => require(['@/pages/users/safe/confirm/fail.vue'], resolve)
    },
    {
      path: '/users/safe/google/bind',
      component: resolve => require(['@/pages/users/safe/google/bind'], resolve)
    },
    {
      path: '/users/safe/google/bind/success.vue',
      component: resolve => require(['@/pages/users/safe/google/bind/success.vue'], resolve),
      name: 'users-safe-google-bind-success'
    },
    {
      path: '/users/safe/google/unbind',
      component: resolve => require(['@/pages/users/safe/google/unbind/index.vue'], resolve)
    },
    {
      path: '/users/safe/google/unbind/success.vue',
      component: resolve => require(['@/pages/users/safe/google/unbind/success.vue'], resolve),
      name: 'users-safe-google-unbind-success'
    },
    {
      path: '/users/safe/google/change',
      component: resolve => require(['@/pages/users/safe/google/change/index.vue'], resolve)
    },
    {
      path: '/users/safe/google/change/success.vue',
      component: resolve => require(['@/pages/users/safe/google/change/success.vue'], resolve),
      name: 'users-safe-google-change-success'
    },
    {
      path: '/users/safe/fund/change',
      component: resolve => require(['@/pages/users/safe/fund/change'], resolve)
    },
    {
      path: '/users/safe/fund/change/success',
      component: resolve => require(['@/pages/users/safe/fund/change/success.vue'], resolve)
    },
    {
      path: '/users/safe/fund/reset',
      component: resolve => require(['@/pages/users/safe/fund/reset'], resolve)
    },
    {
      path: '/users/safe/fund/reset/success',
      component: resolve => require(['@/pages/users/safe/fund/reset/success.vue'], resolve)
    },
    {
      path: '/users/safe/fund/reset/send_email',
      component: resolve => require(['@/pages/users/safe/fund/reset/send_email.vue'], resolve)
    },
    {
      path: '/users/safe/fund/setting',
      component: resolve => require(['@/pages/users/safe/fund/setting/index.vue'], resolve)
    },
    {
      path: '/users/safe/fund/setting/send_email',
      component: resolve => require(['@/pages/users/safe/fund/setting/send_email.vue'], resolve)
    },
    {
      path: '/users/safe/fund/setting/success',
      component: resolve => require(['@/pages/users/safe/fund/setting/success.vue'], resolve)
    },
    {
      path: '/users/safe/verify/login',
      component: resolve => require(['@/pages/users/safe/verify/login'], resolve)
    },
    {
      path: '/users/safe/verify/twice',
      component: resolve => require(['@/pages/users/safe/verify/twice'], resolve)
    },
    {
      path: '/users/safe/verify/trade',
      component: resolve => require(['@/pages/users/safe/verify/trade'], resolve)
    },
    {
      path: '/users/tool',
      component: resolve => require(['@/pages/users/tool'], resolve)
    },
    {
      path: '/users/invite',
      component: resolve => require(['@/pages/users/invite'], resolve)
    },
    {
      path: '/users/invite/ranking',
      component: resolve => require(['@/pages/users/invite/ranking'], resolve)
    },
    {
      path: '/users/invite/invite-detail',
      component: resolve => require(['@/pages/users/invite/invite-detail'], resolve)
    }
  ]
})
