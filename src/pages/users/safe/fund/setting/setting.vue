<template>
  <st-form v-model="dataForm" :rules="rules" @submit="submit">
    <!-- 设置密码 -->
    <st-form-item
      limitName="password"
      ruleName="password"
      :label="$t('message.users.setFundPassword')"
      lineHeight="12px"
      marginBottom="9px"
    >
      <st-input
        type="password"
        :maxLength="6"
        v-model="dataForm.password"
        :limits="limits.password"
        :placeholder="$t('message.users.enterFundPassword')"
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
  import CountDown from '../../../../../components/st-ui'
  export default {
    // async asyncData({store, redirect}) {
    //   if (store.state.user.userInfo.tradePwdExist) redirect('/')
    // },
    name: 'users-fund-setting-form',
    components: {
      CountDown
    },
    data() {
      return {
        purpose: this.$dictionary.purpose.bindFundPassword,
        ticketType: this.$dictionary.ticketType.setFundPasswordTicket,
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
          SMSCode: this.$rules.SMSCode('setFundPasswordTicket', this),
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
            this.usersApi.bindFundPwd(this.dataForm.confirmPassword, this.ticket)
              .then(() => {
                this.$store.dispatch('getUserInfo')
                this.onceBtn = false
                this.$store.commit('SET_SUCCESSIVE', {successive: true})
                this.$store.commit('SAVE_TICKET', {
                  type: this.ticketType,
                  ticket: ''
                })
                // 判断是否绑定邮箱，如果绑定了邮箱，则进行跳转到邮箱验证验证，如果没有绑定邮箱，则直接跳转到设置资金密码成功页面
                // 10月11号，注销掉发送邮件页面
                // if (this.isEmailBind) {
                //   this.$router.push('/users/safe/fund/setting/send_email')
                //   return false
                // }
                this.$router.push('/users/safe/fund/setting/success')
              })
          })
          .catch(() => {
            this.dataForm.SMSCode = ''
            this.onceBtn = false
          })
      }
    },
    created() {
      if (this.$store.state.manage.userInfo.tradePwdExist) {
        this.$router.push('/')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .st-form {
    margin: 70px 0 0 442px;
  }
</style>
