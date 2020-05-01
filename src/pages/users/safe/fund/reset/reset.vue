<template>
  <st-form v-model="dataForm" :rules="rules" @submit="submit">
    <st-prompt>
      <p>{{ $t('message.users.resetFundPasswordTip') }}</p>
    </st-prompt>
    <!-- 重置密码 -->
    <st-form-item
      limitName="password"
      ruleName="password"
      :label="$t('message.users.resetFundPassword')"
    >
      <st-input
        type="password"
        :maxLength="6"
        v-model="dataForm.password"
        :limits="limits.password"
        :placeholder="$t('message.users.enterResetFundPassword')"
      />
    </st-form-item>
    <!-- 确认密码 -->
    <st-form-item
      limitName="confirmPassword"
      ruleName="confirmPassword"
      :label="$t('message.users.confirmFundPassword')"
    >
      <st-input
        type="password"
        :maxLength="6"
        v-model="dataForm.confirmPassword"
        :limits="limits.confirmPassword"
        :placeholder="$t('message.users.repeatEnterFundPassword')"
      />
    </st-form-item>
    <!-- 短信验证码 -->
    <st-form-item class="count-down-wrapper"
                  limitName="SMSCode"
                  ruleName="SMSCode"
                  :label="$t('message.users.SMSCode')"
                  v-if="twiceMobileAuth"
    >
      <st-input
        type="number"
        :maxLength="6"
        v-model="dataForm.SMSCode"
        :limits="limits.SMSCode"
        :placeholder="$t('message.users.enterSMSCode')"
        style="width: 200px;"
      />
      <count-down
        class="code"
        :ticketType="ticketType"
        :purpose='purpose'
        :ticket="ticket"
      />
    </st-form-item>
    <!-- 谷歌验证 -->
    <st-form-item
      limitName="googleCode"
      ruleName="googleCode"
      :label="$t('message.users.googleCode')"
      v-if="twiceGoogleAuth"
    >
      <google-code v-model="dataForm.googleCode"/>
    </st-form-item>
    <!-- 提交 -->
    <input type="submit" :value="$t('message.users.next')"/>
  </st-form>
</template>

<script>
  import StPrompt from '../../../../../components/users/prompt'
  import CountDown from '../../../../../components/st-ui'

  export default {
    async asyncData({store, redirect}) {
      if (!store.state.user.userInfo.tradePwdExist) redirect('/users/safe/fund/setting')
    },
    name: 'users-fund-reset-form',
    components: {
      StPrompt,
      CountDown
    },
    data() {
      return {
        purpose: this.$dictionary.purpose.resetFundPassword,
        ticketType: this.$dictionary.ticketType.resetFundPasswordTicket,
        onceBtn: false,
        dataForm: {
          password: '',
          confirmPassword: '',
          SMSCode: '',
          googleCode: ''
        },
        rules: {
          password: [
            {required: true, message: this.$t('message.errorMessage.fundPwd')},
            {
              validator: value => {
                if (!(/^\d{6}$/.test(value))) return false
                else {
                  return true
                }
              },
              message: this.$t('message.errorMessage.fundPwdSix')
            }
          ],
          confirmPassword: [
            {required: true, message: this.$t('message.errorMessage.confirmFundPwd')},
            {
              validator: value => {
                if (value !== this.dataForm.password) return false
                else {
                  return true
                }
              },
              message: this.$t('message.errorMessage.re-enter')
            }
          ],
          SMSCode: this.$rules.SMSCode('resetFundPasswordTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          password: [
            value => {
              return value.replace(/\D/g, '')
            }
          ],
          confirmPassword: [
            value => {
              return value.replace(/\D/g, '')
            }
          ],
          SMSCode: this.$limits.SMSCode()
        }
      }
    },
    computed: {
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      },
      twiceMobileAuth() {
        return this.$store.state.manage.userInfo.twiceMobileAuth
      },
      twiceGoogleAuth() {
        return this.$store.state.manage.userInfo.twiceGoogleAuth
      },
      isEmailBind() {
        return this.$store.state.manage.userInfo.emailBind
      }
    },
    methods: {
      submit() {
        if (this.onceBtn) return false
        this.onceBtn = true
        this.$store.dispatch('twiceVerify', {
          code: this.dataForm.SMSCode,
          ticket: this.ticket,
          purpose: this.purpose,
          ticketType: this.ticketType,
          googleCode: this.dataForm.googleCode
        })
          .then(() => {
            this.onceBtn = false
            this.$store.commit('SET_SUCCESSIVE', {successive: true})
            // 重置资金密码之前，先判断是否绑定邮箱，如果没有进行绑定邮箱，则跳转到绑定邮箱页面，如果绑定了邮箱，则跳转到邮件确认页面
            // 10月17号，注销掉发送邮件页面
            // if (!this.isEmailBind) {
            //   // 在重置资金密码之前，如果没有进行绑定邮箱，则先进行绑定邮箱
            //   this.$toast(this.$t('message.errorMessage.firstBindEmail'))
            //   setTimeout(() => {
            //     this.$router.push({path: '/users/safe/email/bind'})
            //   }, 4000)
            //   return false
            // }
            this.usersApi.resetFundPwd(this.dataForm.confirmPassword, this.ticket)
              .then(res => {
                this.$store.dispatch('getUserInfo')
                this.onceBtn = false
                this.$store.commit('SET_SUCCESSIVE', {successive: true})
                this.$store.commit('SAVE_TICKET', {
                  type: this.ticketType,
                  ticket: ''
                })
                // 10月11号，注销掉发送邮件页面
                // if (res.data.email_send) {
                //   // 如果绑定了邮箱，则进行邮件确认！
                //   this.$router.push({
                //     path: '/users/safe/fund/reset/send_email'
                //   })
                //   return false
                // }
                this.$router.push('/users/safe/fund/reset/success')
              })
          })
          .catch(error => {
            this.dataForm.SMSCode = ''
            this.onceBtn = false
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../assets/css/theme.less";

  .st-form {
    margin-top: 20px;
    .st-prompt {
      margin-bottom: 50px;
    }
    .st-form-item {
      margin-left: 442px;
    }
    input[type=submit] {
      margin-left: 442px;
    }
  }
</style>
