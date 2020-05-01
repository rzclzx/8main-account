<template>
  <st-form v-model="dataForm" :rules="rules" @submit="submit">
    <!-- 原密码 -->
    <st-form-item
      limitName="originalPassword"
      ruleName="originalPassword"
      :label="$t('message.users.originalFundPassword')"
    >
      <st-input
        type="password"
        :maxLength="6"
        v-model="dataForm.originalPassword"
        :limits="limits.originalPassword"
        :placeholder="$t('message.users.enterOriginalFundPassword')"
      />
    </st-form-item>
    <!-- 新密码 -->
    <st-form-item
      limitName="password"
      ruleName="password"
      :label="$t('message.users.newFundPassword')"
    >
      <st-input
        type="password"
        :maxLength="6"
        v-model="dataForm.password"
        :limits="limits.password"
        :placeholder="$t('message.users.newFundPassword')"
      />
    </st-form-item>
    <!-- 确认密码 -->
    <st-form-item class="count-down-wrapper"
                  limitName="confirmPassword"
                  ruleName="confirmPassword"
                  :label="$t('message.users.confirmFundPassword')"
    >
      <st-input
        type="password"
        :maxLength="6"
        v-model="dataForm.confirmPassword"
        :limits="limits.confirmPassword"
        :placeholder="$t('message.users.repeatEnterNewFundPassword')"
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
    <input type="submit" :value="$t('message.users.confirm')"/>
  </st-form>
</template>

<script>
  import CountDown from '../../../../../components/st-ui'

  export default {
    name: 'users-fund-change-form',
    // async asyncData({store, redirect}) {
    //   if (!store.state.manage.userInfo.tradePwdExist) redirect('/users/safe/fund/setting')
    // },
    components: {
      CountDown
    },
    data() {
      return {
        mobile: this.$store.state.manage.userInfo.mobile,
        purpose: this.$dictionary.purpose.modifyFundPassword,
        ticketType: this.$dictionary.ticketType.modifyFundPasswordTicket,
        onceBtn: false,
        dataForm: {
          originalPassword: '',
          password: '',
          confirmPassword: '',
          SMSCode: '',
          googleCode: ''
        },
        rules: {
          originalPassword: [
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
            },
            {
              validator: value => {
                if (value === this.dataForm.originalPassword) return false
                else {
                  return true
                }
              },
              message: this.$t('message.errorMessage.re-enterPwd')
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
          SMSCode: this.$rules.SMSCode('modifyFundPasswordTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          originalPassword: [
            value => {
              return value.replace(/\D/g, '')
            }
          ],
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
            return this.usersApi.verifyFundPwd(this.dataForm.originalPassword, this.purpose, this.ticket)
          })
          .then(() => {
            this.usersApi.modifyFundPwd(this.dataForm.confirmPassword, this.ticket)
              .then(() => {
                this.$store.dispatch('getUserInfo')
                this.onceBtn = false
                this.$store.commit('SET_SUCCESSIVE', {successive: true})
                this.$store.commit('SAVE_TICKET', {
                  type: this.ticketType,
                  ticket: ''
                })
                this.$router.push({
                  path: '/users/safe/fund/change/success'
                })
              })
          })
          .catch(() => {
            this.dataForm.SMSCode = ''
            this.onceBtn = false
          })
      }
    },
    created() {
      if (!this.$store.state.manage.userInfo.tradePwdExist) {
        this.$router.push({
          path: '/users/safe/fund/setting'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .st-form {
    margin: 70px 0 0 442px;
  }
</style>
