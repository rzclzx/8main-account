<template>
  <st-form v-model="dataForm" :rules="rules" @submit="submit">
    <st-form-item class="count-down-wrapper"
                  limitName="SMSCode"
                  ruleName="SMSCode"
                  :label="$t('message.users.SMSCode')"
    >
      <st-input
        type="number"
        :maxLength="6"
        v-model="dataForm.SMSCode"
        :limits="limits.SMSCode"
        :placeholder="$t('message.users.enterSMSCode')"
        style="width: 200px;"
        :autofocus="true"
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
    >
      <google-code v-model="dataForm.googleCode"/>
    </st-form-item>
    <!-- 提交 -->
    <input type="submit" :value="$t('message.users.unbind')"/>
  </st-form>
</template>

<script>
  export default {
    async asyncData({store, redirect}) {
      if (!store.state.user.userInfo.googleBind) redirect('/users/safe/google/bind')
    },
    data() {
      return {
        purpose: this.$dictionary.purpose.unBindGoogle,
        ticketType: this.$dictionary.ticketType.unbindGoogleTicket,
        channel: 1,
        dataForm: {
          SMSCode: '',
          googleCode: ''
        },
        rules: {
          SMSCode: this.$rules.SMSCode('unbindGoogleTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          SMSCode: this.$limits.SMSCode()
        }
      }
    },
    computed: {
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    methods: {
      // 验证googleCode和短信code，解绑google验证器
      submit() {
        this.$store.dispatch('verifyGoogle', {
          ticket: this.ticket,
          purpose: this.purpose,
          googleCode: this.dataForm.googleCode
        })
          .then(() => {
            return this.$store.dispatch('verifyCode', {
              code: this.dataForm.SMSCode,
              ticket: this.ticket
            })
          })
          .then(() => {
            return this.usersApi.unbindGoogle(this.ticket)
          })
          .then(() => {
            return this.$store.dispatch('getUserInfo')
          })
          .then(() => {
            this.$store.commit('SET_SUCCESSIVE', {successive: true})
            this.$store.commit('SAVE_TICKET', {
              type: this.ticketType,
              ticket: ''
            })
            this.$router.push({
              name: 'users-safe-google-unbind-success'
            })
          })
          .catch(error => {
            this.dataForm.SMSCode = ''
            this.$toast(this.$dictionary.error(error.data.code))
            console.log(error)
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
