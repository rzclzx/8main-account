<template>
  <st-row :class="['captcha', popupType]" justify="center" align="center">
    <div class="box">
      <!-- 滑块验证DOM -->
      <div id="ali-captcha" class="nc-container"></div>
    </div>
  </st-row>
</template>

<script>
  // import apiConfig from '../../../../myConfig/api.config'
  import Cookie from '../../../../myConfig/cookie'

  export default {
    name: 'captcha',
    props: {
      popupType: String,
      purpose: {
        type: Number,
        required: true
      },
      nation: Number,
      ticket: String,
      ticketType: {
        type: String,
        required: true
      },
      callback: {
        type: Function,
        required: true
      },
      countDown: {
        type: Function
      }
    },
    data() {
      return {
        // 滑块验证相关
        appKey: 'FFFF0N00000000006910',
        modelName: 'no-captcha',
        scene: 'nc_register',
        nc_token: null,
        lang: 'ja_JP',
        NC_Opt: {},
        nc: {},
        captchaUrl: '',
        ruleForm: {
          picCode: ''
        },
        rules: {
          picCode: [
            {required: true, message: this.$t('message.common.captchaError')}
          ]
        },
        browser: {}
      }
    },
    mounted() {
      // 挂载组件是初始化
      this.init()
    },
    computed: {
      // 从Vuex取得该类型的ticket
      // ticket () {
      //   return this.$store.state.ticket[this.ticketType]
      // }
    },
    methods: {
      getBrowser() {
        this.browser = {
          versions: (function () {
            var u = navigator.userAgent
            // 移动终端浏览器版本信息
            return {
              // IE内核
              trident: u.indexOf('Trident') > -1,
              // opera内核
              presto: u.indexOf('Presto') > -1,
              // 苹果、谷歌内核
              webKit: u.indexOf('AppleWebKit') > -1,
              // 火狐内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
              // 是否为移动终端
              mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE|Android/),
              // ios终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
              // android终端或者uc浏览器
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
              // 是否为iPhone或者QQHD浏览器
              iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
              // 是否iPad
              iPad: u.indexOf('iPad') > -1,
              // 是否web应该程序，没有头部与底部
              webApp: u.indexOf('Safari') === -1
            }
          })()
        }
        // 更新滑块场景
        if (this.browser.versions.mobile) {
          this.scene = 'nc_register_h5'
        }
      },
      close() {
        this.callback(false)
      },
      // 滑块初始化
      init() {
        let self = this
        // 拼接token
        this.nc_token = [this.appKey, (new Date()).getTime(), Math.random()].join(':')
        this.NC_Opt = {
          renderTo: '#ali-captcha',
          appkey: this.appKey,
          scene: this.scene,
          token: this.nc_token,
          // 表示web
          deviceIdentify: 4,
          customWidth: '100%',
          trans: {'key1': 'code0'},
          elementID: ['usernameID'],
          is_Opt: 0,
          language: this.lang,
          isEnabled: true,
          timeout: 3000,
          times: 5,
          apimap: {},
          callback: function (data) {
            // 向服务器发送验证
            self.usersApi.aliCaptcha(self.purpose, data.csessionid, self.NC_Opt.deviceIdentify, self.ticket,
              data.sig, self.NC_Opt.token, self.NC_Opt.scene)
              .then(res => {
                if (res.data.ticket) {
                  // 将ticket存到Store
                  self.$store.commit('SAVE_TICKET', {
                    type: self.ticketType,
                    ticket: res.data.ticket
                  })
                  // 携带拿到的ticket再次去请求短信验证码
                  self.$nextTick(function () {
                    // 返回给父组件
                    self.callback(true)
                    self.countDown()
                  })
                }
              })
              .catch(err => {
                // 返回给父组件
                self.callback(false)
                console.log(err)
              })
          }
        }
        this.nc = new noCaptcha(this.NC_Opt)
      },
      reload() {
        this.nc.reload()
      }
    },
    created() {
      // 获取多语言设置
      let locale = Cookie.getCookie('locale')
      switch (locale) {
        case 'cn':
          this.lang = 'cn'
          break
        case 'en':
          this.lang = 'en'
          break
        case 'ko':
          this.lang = 'ko_KR'
          break
        case 'ja':
          this.lang = 'ja_JP'
          break
        case 'ru':
          this.lang = 'ru_RU'
          break
        default:
          this.lang = 'cn'
      }
      this.getBrowser()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";
  .captcha {
    .box {
      width: 100%;
    }
  }
  #ali-captcha {
    width: 100%;
    height: 40px;
    margin: 20px auto 0;
  }
</style>
