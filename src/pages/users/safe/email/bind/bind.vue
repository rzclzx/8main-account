<template>
  <st-form v-model="dataForm" :rules="rules" @submit="submit">
    <!-- 绑定邮箱 -->
    <st-form-item
      limitName="email"
      ruleName="email"
      :label="$t('message.users.emailAddress')"
    >
      <st-input
        type="text"
        v-model="dataForm.email"
        :limits="limits.email"
        :placeholder="$t('message.users.enterEmailAddress')"
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
    <input type="submit" :value="$t('message.users.bind')"/>
  </st-form>
</template>

<script>
  import CountDown from '../../../../../components/st-ui'
  export default {
    // async asyncData ({store, redirect}) {
    //   if (store.state.manage.userInfo.emailBind) redirect('/')
    // },
    name: 'bind-email-form',
    components: {
      CountDown
    },
    computed: {
      twiceMobileAuth() {
        return this.$store.state.manage.userInfo.twiceMobileAuth
      },
      twiceGoogleAuth() {
        return this.$store.state.manage.userInfo.twiceGoogleAuth
      },
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    data() {
      return {
        ticketType: this.$dictionary.ticketType.bindEmailTicket,
        purpose: this.$dictionary.purpose.bindEmail,
        dataForm: {
          email: '',
          SMSCode: '',
          googleCode: ''
        },
        rules: {
          email: [
            {required: true, message: this.$t('message.errorMessage.emailAddress')},
            {
              validator: value => {
                if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))) return false
                else {
                  return true
                }
              },
              message: this.$t('message.errorMessage.emailAddress')
            }
          ],
          SMSCode: this.$rules.SMSCode('bindEmailTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          SMSCode: this.$limits.SMSCode()
        }
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('twiceVerify', {
          code: this.dataForm.SMSCode,
          googleCode: this.dataForm.googleCode,
          ticket: this.ticket,
          purpose: this.purpose,
          ticketType: this.ticketType
        })
          .then(res => {
            return this.usersApi.bindEmail(this.dataForm.email, this.ticket)
          })
          .then((res) => {
            this.$store.dispatch('getUserInfo')
            this.$store.commit('SAVE_TICKET', {
              type: this.ticketType,
              ticket: ''
            })
            this.$store.commit('SET_SUCCESSIVE', {successive: true})
            this.$router.push({
              name: 'users-safe-email-bind-sendemail',
              params: {email: this.dataForm.email}
            })
          })
          .catch(error => {
            this.dataForm.SMSCode = ''
            if (error.status) {
              console.log(error)
            }
          })
      }
    },
    created() {
      // console.log(this.ticketType)
      if (this.$store.state.manage.userInfo.emailBind) {
        this.$router.push({
          path: '/'
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
