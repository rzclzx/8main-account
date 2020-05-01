import Product from '@/assets/js/config/product'

export default {
  install (Vue, i18n) {
    const product = Product(i18n)
    Vue[ Vue.prototype ? 'prototype' : 'val' ].$dictionary = {
      product: product,
      orderStatusList: [
        // {value: '-1,0,1,2,3' ,name: i18n.t('message.orderStatusList.name1')},
        // {value: '0,1', name: i18n.t('message.orderStatusList.name2')},
        // {value: -1, name: i18n.t('message.orderStatusList.name3')},
        // {value: 2, name: i18n.t('message.orderStatusList.name4')},
        // {value: 3, name: i18n.t('message.orderStatusList.name5')}
      ],
      error(id) {
        if (id === 112) {
          return
        }
        return i18n.t('message.errorCode.' + id)
      },
      safeLevel: {
        dangerous: {
          level: i18n.t('message.safeLevel.dangerous'),
          width: '30',
          color: '#e6491a'
        },
        safe: {
          level: i18n.t('message.safeLevel.safe'),
          width: '60',
          color: '#8fbe02'
        },
        verySafe: {
          level: i18n.t('message.safeLevel.verySafe'),
          width: '90',
          color: '#00a854'
        }
      },
      safeNotice: [
        {
          name: i18n.t('message.safeNotice.safeNoticeName1'),
          id: 1
        },
        {
          name: i18n.t('message.safeNotice.safeNoticeName2'),
          id: 2
        },
        {
          name: i18n.t('message.safeNotice.safeNoticeName3'),
          id: 3
        },
        {
          name: i18n.t('message.safeNotice.safeNoticeName4'),
          id: 4
        },
        {
          name: i18n.t('message.safeNotice.safeNoticeName5'),
          id: 5
        },
        {
          name: i18n.t('message.safeNotice.safeNoticeName6'),
          id: 6
        }
      ],
      manageNav: [
        {
          name: i18n.t('message.manageNav.login'),
          status: 'login',
          link: '/manage'
        },
        {
          name: i18n.t('message.manageNav.register'),
          status: 'register',
          link: '/manage/register'
        }
      ],
      depositStatus: {
        'WAIT': i18n.t('message.depositStatus.wait'),
        'WAIT_CONFIRM': i18n.t('message.depositStatus.wait_confirm'),
        'SUCCESSED': i18n.t('message.depositStatus.successed'),
        'FAILED': i18n.t('message.depositStatus.failed')
      },
      ticketType: {
        // 注册
        registerTicket: 'registerTicket',
        // 登录
        loginTicket: 'loginTicket',
        // 修改登录密码
        modifyPasswordTicket: 'modifyPasswordTicket',
        // 重置登录密码
        resetPasswordTicket: 'resetPasswordTicket',
        // 设置资金密码
        setFundPasswordTicket: 'setFundPasswordTicket',
        // 重置资金密码
        resetFundPasswordTicket: 'resetFundPasswordTicket',
        // 修改资金密码
        modifyFundPasswordTicket: 'modifyFundPasswordTicket',
        // 绑定资金密码
        bindFundTicket: 'bindFundTicket',
        // 绑定手机
        bindPhoneTicket: 'bindPhoneTicket',
        // 解绑手机
        unBindPhoneTicket: 'unBindPhoneTicket',
        // 绑定邮箱 6
        bindEmailTicket: 'bindEmailTicket',
        // 解绑邮箱
        unBindEmailTicket: 'unBindEmailTicket',
        // 绑定Google
        bindGoogleTicket: 'bindGoogleTicket',
        // 创建Api 11
        createApiTicket: 'createApiTicket',
        // 查看Api 12
        getApiTicket: 'getApiTicket',
        // 修改Api 13
        modifyApiTicket: 'modifyApiTicket',
        // 解绑Google
        unbindGoogleTicket: 'unbindGoogleTicket',
        // 重置修改Google
        modifyGoogleTicket: 'modifyGoogleTicket',
        // 登录验证策略 25
        loginVerifyTicket: 'loginVerifyTicket',
        // 二次认证 26
        twiceTicket: 'twiceTicket',
        // 修改手机号 37
        modifyMobileTicket: 'modifyMobileTicket',
        // 交易验证
        tradeTicket: 'tradeTicket',
        // 人民币提现
        moneyTicket: 'moneyTicket',
        // 数字火币提现
        coinTicket: 'coinTicket',
        // 身份认证
        idTicket: 'idTicket'
      },
      // 查询提币记录 提币状态
      coinRecordStatus: {
        WAITING_PROCESS: 0, // 等待处理（此时可以撤销，其他状态不能撤销）
        WITHDRAW_SUCCESSED: 1, // 提币成功
        WITHDRAW_CANCELED: 2, // 提币取消
        WAITING_CONFIRM: 3, // 等待邮件确认
        WITHDRAW_PROCESSING: 4, // 处理中
        WITHDRAW_FAILED: -1, // 提币失败
        WITHDRAW_ING: 5 // 处理完毕，提现中
      },
      action: [
        {text: i18n.t('message.action.all'), enumName: ''},
        {value: 0, text: i18n.t('message.action.buy'), enumName: 'BUY'},
        {value: 1, text: i18n.t('message.action.sell'), enumName: 'SELL'},
        {value: 2, text: i18n.t('message.action.cz'), enumName: 'RECHARGE'},
        {value: 3, text: i18n.t('message.action.tx'), enumName: 'WITHDRAW'}
        // {value: 4,text: '内部提现',enumName: 'WITHDRAW_INNER'}
      ],
      // 验证类型字典
      purpose: {
        myChildAccount: 0, //
        resetPassword: 1, // 重置密码
        resetFundPassword: 2, // 重置资金密码
        resetGoogle: 3, // 重设Google密钥
        bindMobile: 4, // 绑定手机
        unBindMobile: 5, // 解绑手机
        bindEmail: 6, // 绑定邮箱
        unBindEmail: 7, // 解绑邮箱
        bindGoogle: 8, // 绑定Google
        unBindGoogle: 9, // 解绑Google
        modifyFundPassword: 10, // 修改资金密码
        createAPI: 11, // 创建API
        viewAPI: 12, // 查看API
        modifyAPI: 13, // 修改API
        bindFundPassword: 14, // 绑定资金密码
        modifyLoginPassword: 15, // 修改登录密码
        register: 21, // 注册
        login: 22, // 登录
        RMBTake: 23, // 人民币提现
        digitalTake: 24, // 数字货币提现
        loginVerification: 25, // 登录验证策略
        secondVerification: 26, // 二次认证策略
        transactionVerification: 27, // 交易认证策略
        currencyAddress: 28, // 添加提币地址
        modifyLoginPasswordNotice: 29, // 修改登录密码-通知
        resetLoginPasswordNotice: 30, // 重置登录密码-通知
        modifyFundPasswordNotice: 31, // 修改资金密码-通知
        resetFundPasswordNotice: 32, // 重置资金密码-通知
        modifyLoginVerificationNotice: 33, // 修改登录验证设置-通知
        modifyTransactionVerificationNotice: 34, // 修改交易验证设置-通知
        modifySecondVerificationNotice: 35, // 修改二次认证设置-通知
        offSiteLoginNotice: 36, // 异地登录-通知
        modifyMobileNotice: 38, // 修改绑定手机-通知
        modifyMobile: 37 // 修改手机号
      },
      // 安全策略相关接口
      // 登录验证策略接口 登录验证类型
      loginType: {
        password: 0, // 密码
        passwordGoogle: 1 // 密码 + Google
      },
      // 二次验证策略接口 二次验证类型
      twiceType: {
        sms: 1, // 短信
        google: 2, // Google
        smsGoogle: 3 // 短信+Google
      },
      // 交易验证策略接口 交易验证类型
      tradeType: {
        noPassword: 1, // 不输入资金密码
        everyHoursPwd: 2, // 每小时输入资金密码
        everyTradePwd: 3 // 每次交易输入资金密码
      },
      // 筛选类型
      typeList: {
        1: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.sgfp'),
            id: 30
          },
          {
            name: i18n.t('message.typeList.sgdk'),
            id: 31
          }
        ],
        2: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.syff'),
            id: 5
          }
        ],
        3: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.cz'),
            id: 9
          },
          {
            name: i18n.t('message.typeList.tx'),
            id: 10
          },
          {
            name: i18n.t('message.typeList.fee'),
            id: 11
          },
          {
            name: i18n.t('message.typeList.activityEarnings'),
            id: 13
          },
          {
            name: i18n.t('message.typeList.yqfy'),
            id: 17
          },
          {
            name: i18n.t('message.typeList.feeYH'),
            id: 18
          }
        ],
        6: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          }
        ],
        7: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.bc'),
            id: 20
          },
          {
            name: i18n.t('message.typeList.jc'),
            id: 21
          },
          {
            name: i18n.t('message.typeList.qs'),
            id: 23
          }
        ],
        9: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.borrowed'),
            id: 6
          },
          {
            name: i18n.t('message.typeList.repaid'),
            id: 7
          }
        ],
        10: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.borrowed'),
            id: 6
          },
          {
            name: i18n.t('message.typeList.repaid'),
            id: 7
          },
          {
            name: i18n.t('message.typeList.bc'),
            id: 33
          }
        ]
      },
      typeAllList: {
        0: i18n.t('message.typeList.buy'), // 买入
        1: i18n.t('message.typeList.sell'), // 卖出
        2: i18n.t('message.typeList.zr'), // 转入
        3: i18n.t('message.typeList.zc'), // 转出
        5: i18n.t('message.typeList.syff'), // 收益发放
        6: i18n.t('message.typeList.borrowed'), // 借入
        7: i18n.t('message.typeList.repaid'), // 还款
        9: i18n.t('message.typeList.cz'), // 充值
        10: i18n.t('message.typeList.tx'), // 提现
        11: i18n.t('message.typeList.fee'), // 提现手续费
        13: i18n.t('message.typeList.activityEarnings'), // 活动收入
        17: i18n.t('message.typeList.yqfy'), // 邀请返佣
        18: i18n.t('message.typeList.feeYH'), // 手续费优惠
        20: i18n.t('message.typeList.bc'), // 爆仓
        21: i18n.t('message.typeList.jc'), // 自动减仓
        23: i18n.t('message.typeList.qs'), // 清算
        30: i18n.t('message.typeList.sgfp'), // 申购分配
        31: i18n.t('message.typeList.sgdk'), // 申购点卡
        33: i18n.t('message.typeList.bc') // 抵押贷款爆仓
      },
      // 邮件类型字典
      mailPurpose: {
        bindEmailSendMail: '1', // 绑定邮箱发邮件
        changeBindEmailSendMail: '2', // 更换绑定邮箱发邮件
        setFundPwdSendMail: '3', // 设置资金密码发邮件
        modifyFundPwdSendMail: '4', // 修改资金密码发邮件
        resetFundPwdSendMail: '5', // 重置资金密码发邮件
        trustAddressConfirmSendMail: '6', // 添加信任地址发邮件
        withdrawCoinConfirmSendMail: '7', // 数字货币提现发邮件
        modifyMobileSendMail: '16' // 绑定手机号发送邮件
      },
      // 手续费类型
      poundageList: {
        BTC: [
          {
            value: 1,
            name: '0.0005'
          },
          {
            value: 2,
            name: '0.001'
          },
          {
            value: 3,
            name: '0.0015'
          },
          {
            value: 4,
            name: '0.002'
          },
          {
            value: 5,
            name: '0.005'
          },
          {
            value: 6,
            name: '0.01'
          }
        ],
        LTC: [
          {
            value: 1,
            name: '0.001'
          },
          {
            value: 2,
            name: '0.002'
          },
          {
            value: 3,
            name: '0.005'
          },
          {
            value: 4,
            name: '0.01'
          },
          {
            value: 5,
            name: '0.02'
          },
          {
            value: 6,
            name: '0.05'
          }
        ],
        ETH: [
          {
            value: 1,
            name: '0.00042'
          },
          {
            value: 2,
            name: '0.00105'
          },
          {
            value: 3,
            name: '0.00168'
          },
          {
            value: 4,
            name: '0.00210'
          },
          {
            value: 5,
            name: '0.00630'
          },
          {
            value: 6,
            name: '0.01050'
          }
        ],
        BCH: [
          {
            value: 1,
            name: '0.0005'
          },
          {
            value: 2,
            name: '0.001'
          },
          {
            value: 3,
            name: '0.0015'
          },
          {
            value: 4,
            name: '0.002'
          },
          {
            value: 5,
            name: '0.005'
          },
          {
            value: 6,
            name: '0.01'
          }
        ],
        DASH: [
          {
            value: 1,
            name: '0.0005'
          },
          {
            value: 2,
            name: '0.001'
          },
          {
            value: 3,
            name: '0.0015'
          },
          {
            value: 4,
            name: '0.002'
          },
          {
            value: 5,
            name: '0.005'
          },
          {
            value: 6,
            name: '0.01'
          }
        ]
      },
      zendeskLocale: {
        'cn': 'zh-cn',
        'en': 'en-us'
      },
      labsAccountId: 9,
      mortgageloanId: 10,
      getPrompt(key) {
        return i18n.t(key)
      },
      coinColor: {BUY: '#00a854', SELL: '#f04134'},
      userPersonalInfo: {
        NOT_UPLOADED: 0, // 未上传
        WAITING_AUTH: 1, // 等待审核
        AUTH_FAIL: 2, // 审核不通过
        AUTH_PASS: 3 // 审核通过
      },
      transferStatus: {
        DELETE: -1, // "删除、预处理"
        WAITING_PROCESS: 0, // "等待处理"
        SUCCESS: 1, // "处理成功"
        FAILED: 2, // "处理失败"
        WAIT: 3, // “待审核”
        AUDITFAILURE: 4 // “审核失败”
      },
      productList: null,
      currencyList: null,
      // 筛选类型
      typeListDictionary: {
        1: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.sgfp'),
            id: 30
          },
          {
            name: i18n.t('message.typeList.sgdk'),
            id: 31
          }
        ],
        2: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.syff'),
            id: 5
          }
        ],
        3: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.cz'),
            id: 9
          },
          {
            name: i18n.t('message.typeList.tx'),
            id: 10
          },
          {
            name: i18n.t('message.typeList.fee'),
            id: 11
          },
          {
            name: i18n.t('message.typeList.activityEarnings'),
            id: 13
          },
          {
            name: i18n.t('message.typeList.yqfy'),
            id: 17
          },
          {
            name: i18n.t('message.typeList.feeYH'),
            id: 18
          }
        ],
        6: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          }
        ],
        7: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.bc'),
            id: 20
          },
          {
            name: i18n.t('message.typeList.jc'),
            id: 21
          },
          {
            name: i18n.t('message.typeList.qs'),
            id: 23
          }
        ],
        9: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.buy'),
            id: 0
          },
          {
            name: i18n.t('message.typeList.sell'),
            id: 1
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.borrowed'),
            id: 6
          },
          {
            name: i18n.t('message.typeList.repaid'),
            id: 7
          }
        ],
        10: [
          {
            name: i18n.t('message.typeList.all'),
            id: ''
          },
          {
            name: i18n.t('message.typeList.zr'),
            id: 2
          },
          {
            name: i18n.t('message.typeList.zc'),
            id: 3
          },
          {
            name: i18n.t('message.typeList.borrowed'),
            id: 6
          },
          {
            name: i18n.t('message.typeList.repaid'),
            id: 7
          },
          {
            name: i18n.t('message.typeList.bc'),
            id: 33
          }
        ]
      }
    }
  }
}
