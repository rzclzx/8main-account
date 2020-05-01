<!-- 安全验证弹框 -->
<template>
  <st-form v-model="dataForm" :rules="rules" @submit="verify">
    <!-- 短信验证码 -->
    <st-form-item class="count-down-wrapper"
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
      ruleName="googleCode"
      :label="$t('message.users.googleCode')"
      v-if="twiceGoogleAuth"
    >
      <google-code v-model="dataForm.googleCode" :autofocus="!twiceMobileAuth"/>
    </st-form-item>
    <!-- 提交 -->
    <input type="submit" :value="$t('message.users.confirm')"/>
  </st-form>
</template>

<script>
  import CountDown from '../st-ui'
  export default {
    name: 'verify-box',
    props: {
      purpose: {
        required: true
      },
      ticketType: {
        required: true
      }
    },
    components: {
      CountDown
    },
    data() {
      return {
        dataForm: {
          SMSCode: '',
          googleCode: ''
        },
        rules: {
          SMSCode: this.$rules.SMSCode(this.ticketType, this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          SMSCode: this.$limits.SMSCode()
        },
        submitStatus: true
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
      }
    },
    methods: {
      verify() {
        if (this.submitStatus) {
          this.submitStatus = false
          this.$store.dispatch('twiceVerify', {
            code: this.dataForm.SMSCode,
            googleCode: this.dataForm.googleCode,
            ticket: this.ticket,
            purpose: this.purpose,
            ticketType: this.ticketType
          })
            .then(res => {
              return this.$emit('verify', res)
            })
            .catch(error => {
              if (error.data.code === 302 || error.data.code === 300) {
                this.dataForm.code = ''
              } else if (error.data.code === 304) {
                this.dataForm.googleCode = ''
              } else {
                this.dataForm.code = ''
                this.dataForm.googleCode = ''
              }
              this.submitStatus = true
              // 302为短信码错误
              if (error.data.code !== 302) {
                this.$toast(this.$dictionary.error(error.data.code))
              }
            })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .st-form {
    margin: 60px 0 30px 210px;
  }
</style>
