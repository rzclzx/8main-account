<template>
  <st-form v-model="dataForm" :rules="rules" @submit="submit">
    <st-form-item
      ruleName="googleCode"
      :label="$t('message.users.enterOriginGoogleCode')"
    >
      <google-code v-model="dataForm.googleCode"/>
    </st-form-item>
    <st-form-item :label="$t('message.users.setGoogleKey')">
      <google-key class="google-key" :ticketType="ticketType" :purpose="purpose" :channel="channel"/>
    </st-form-item>
    <st-form-item
      ruleName="googleCode"
      :label="$t('message.users.googleCode')"
    >
      <google-code v-model="dataForm.newGoogleCode"/>
    </st-form-item>
    <st-form-item class="count-down-wrapper" ruleName="code" limitName="code" :label="$t('message.users.SMSCode')">
      <st-input type="number"
                style="width: 200px;"
                :placeholder="$t('message.users.enterSMSCode')"
                v-model="dataForm.code"
                :limits="limits.SMSCode"/>
      <count-down
        class="code"
        :ticketType="ticketType"
        :purpose="purpose"
        :ticket="ticket"
      />
    </st-form-item>
    <input type="submit" style="margin-bottom: 90px;" :value="$t('message.users.bind')"/>
  </st-form>
</template>

<script>
  import GoogleKey from '../../../../../components/users/safe-google-key'

  export default {
    async asyncData({store, redirect}) {
      if (!store.state.user.userInfo.googleBind) redirect('/users/safe/google/bind')
    },
    name: 'users-safe-google-bind',
    components: {
      GoogleKey
    },
    data() {
      return {
        dataForm: {
          code: '',
          googleCode: '',
          newGoogleCode: ''
        },
        purpose: this.$dictionary.purpose.resetGoogle,
        ticketType: 'modifyGoogleTicket',
        channel: 1,
        submitStatus: true,
        rules: {
          googleCode: this.$rules.googleCode(this),
          code: this.$rules.SMSCode('modifyGoogleTicket', this)
        },
        limits: {
          code: this.$limits.SMSCode()
        }
      }
    },
    computed: {
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    methods: {
      // 验证googleCode和短信code，绑定google验证器
      submit() {
        if (this.submitStatus) {
          this.submitStatus = false
          this.$store.dispatch('verifyGoogle', {
            ticket: this.ticket,
            googleCode: this.dataForm.googleCode,
            purpose: this.purpose
          })
            .then(() => {
              return this.$store.dispatch('verifyGoogle', {
                ticket: this.ticket,
                googleCode: this.dataForm.newGoogleCode,
                channel: this.channel,
                purpose: this.purpose
              })
            })
            .then(() => {
              return this.$store.dispatch('verifyCode', {
                code: this.dataForm.code,
                ticket: this.ticket
              })
            })
            .then(() => {
              return this.usersApi.modifyGoogle(this.ticket, this.channel)
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
                name: 'users-safe-google-change-success'
              })
            })
            .catch(error => {
              this.dataForm.code = ''
              this.submitStatus = true
              this.$toast(this.$dictionary.error(error.data.code))
              console.log(error)
            })
        }
      }
    }
  }
</script>

<style lang="less" scoped="">
  @import "../../../../../assets/css/theme.less";

  .st-form {
    margin: 70px 0 0 442px;
    .google-key {
      margin-bottom: 0;
    }
    .twice {
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border: 1px solid #999;
      }
      .select {
        background-image: url("../../../../../assets/images/icon-fxk.png");
        border: 0;
      }
      .message {
        font-size: 12px;
        color: #999;
      }
    }
  }
</style>
