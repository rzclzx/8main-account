<!-- 短信验证码 -->
<template>
  <div class="send-SMS" :class="{ relative: showCaptcha }">
    <a class="get-code button" :class="{ active: smallStyle }" @click="countDown" v-if="status">{{
      $t('message.common.sendSMS') }}</a>
    <a class="get-code" :class="{ active: smallStyle }" v-else>
      <div>{{ time }} {{ $t('message.common.second') }}</div>
    </a>
    <div v-if="showCaptcha" style="margin-bottom: 20px;width: 350px">
      <captcha
        :purpose="purpose"
        :nation="nation"
        :ticketType="ticketType"
        :ticket="ticket"
        :callback="closeCaptcha"
        :countDown="countDown"
        :popupType="popupType"
      ></captcha>
    </div>
  </div>
</template>

<script>
  import Captcha from './captcha.vue'

  export default {
    name: 'count-down',
    components: {
      Captcha
    },
    props: {
      purpose: {
        type: Number,
        required: true
      },
      nation: Number,
      mobile: String,
      ticket: String,
      ticketType: {
        type: String,
        required: true
      },
      smallStyle: Boolean,
      channel: Number,
      defaultName: String,
      popupType: String,
      type: String,
      offCaptcha: Boolean
    },
    data () {
      return {
        time: 60,
        status: true,
        buttonStatus: true,
        showCaptcha: false
      }
    },
    watch: {
      // 修改手机号时，重置滑块
      offCaptcha () {
        this.offCaptchaFun()
      }
    },
    computed: {
      userMobile () {
        return this.$store.state.manage.userInfo && this.$store.state.manage.userInfo.mobile
      }
    },
    methods: {
      countDown () {
        let mobile = this.userMobile && this.purpose !== 37 ? '' : this.mobile
        if (!this.userMobile && !this.mobile && !this.ticket) {
          this.$toast(this.$t('register.enterMobile'))
          return false
        }
        // 将手机号与国家码的判断放在后端!!!
        if (this.mobile) {
          if (this.nation === 211) {
            if (this.mobile.length !== 11) {
              this.$toast(this.$t('message.promptInformation.mobileWrongFormat'))
              return false
            }
          }
          if (this.nation !== 211) {
            if (!(/^\d{1,16}$/.test(this.mobile))) {
              this.$toast(this.$t('message.promptInformation.mobileWrongFormat'))
              return false
            }
          }
        }
        if (this.type) {
          if (!this.mobile) {
            this.$toast(this.$t('message.register.enterMobile'))
            return false
          }
        }
        this.status = false
        let time = setInterval(() => {
          if (this.time === 1) {
            clearInterval(time)
            this.time = 60
            this.status = true
            this.buttonStatus = true
          } else {
            this.time -= 1
          }
        }, 1000)
        if (this.buttonStatus) {
          this.buttonStatus = false
          this.$store.dispatch('getSMSCode', {
            purpose: this.purpose,
            nation: this.nation,
            mobile: mobile,
            ticket: this.ticket,
            channel: this.channel,
            ticketType: this.ticketType
          })
            .then(res => {
              // this.status = false
              // let time = setInterval(() => {
              //   if (this.time === 1) {
              //     clearInterval(time)
              //     this.time = 60
              //     this.status = true
              //     this.buttonStatus = true
              //   } else {
              //     this.time -= 1
              //   }
              // }, 1000)
            })
            .catch(error => {
              // 关闭滑块
              this.offCaptchaFun()
              // 重置倒计时
              clearInterval(time)
              // 重置“点击发送”
              this.status = true
              // 先完成验证
              if (error.data.code === 112) {
                // 重置滑块
                this.resetCaptchaFun()
              }
              this.buttonStatus = true
            })
        } else {
          return false
        }
      },
      // 关闭滑块
      offCaptchaFun () {
        this.showCaptcha = false
      },
      // 重置滑块
      resetCaptchaFun () {
        // 每次去重置滑块
        this.showCaptcha = false
        this.$nextTick(function () {
          this.showCaptcha = true
        })
      },
      closeCaptcha () {
        // this.showCaptcha = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";
  .send-SMS {
    display: inline-block;
    /*margin-left: 10px;*/
    vertical-align: top;
    width: 100%;
    position: absolute;
    top: 30px;
    z-index: 1;
    right: 0;
  }
  .send-SMS.relative {
    position: relative !important;
    top: 0 !important;
  }
  .get-code {
    height: 30px;
    position: absolute;
    top: -30px;
    right: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -ms-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    font-size: 14px;
    color: #597AB9;
    text-align: center;
    /*border: 1px solid #d9d9d9;*/
    cursor: pointer;
  }
  .button {
    &:hover {
      color: #3a5a99;
    }
  }
  .active {
    margin-top: 16px;
    margin-left: 8px;
    width: 100px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
  }

  @media screen and (max-width: 768px) {
    .send-SMS {
      top: 0.68rem;
    }

    .get-code {
      font-size: 0.28rem;
      height: 0.68rem;
      top: -0.68rem;
    }
  }
</style>
