<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.changeMobile`)" top="30px" paddingTop="20px">
      <st-prompt>
        <p>{{ $t(`message.users.modifyTips`) }}</p>
      </st-prompt>
      <st-form v-model="dataForm" :rules="rules" @submit="submit">
        <!-- 原手机短信验证码 -->
        <st-form-item class="count-down-wrapper"
                      limitName="oldSMSCode"
                      ruleName="oldSMSCode"
                      :label="$t('message.users.SMSCode')"
        >
          <st-input
            type="number"
            :maxLength="6"
            v-model="dataForm.oldSMSCode"
            :limits="limits.oldSMSCode"
            :placeholder="$t('message.users.oldSMSCode')"
            style="width: 200px;"
          />
          <count-down
            class="code"
            :ticketType="ticketType"
            :purpose='purpose'
            :ticket="ticket"
          />
        </st-form-item>
        <!-- 下一步 -->
        <input type="submit" class="button" :value="$t('message.users.next')"
               :class="{ continuousClicks: !preventContinuousClicks }"/>
      </st-form>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../../components/users/user-bread'
  import StPrompt from '../../../../components/users/prompt'

  export default {
    // async asyncData({store, redirect}) {
    //   if (!store.state.manage.userInfo.emailBind && !store.state.manage.userInfo.googleBind) redirect('/users/safe')
    // },
    name: 'mobile',
    components: {
      StPrompt,
      UserBread
    },
    computed: {
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.changeMobile`)
          }
        ],
        dataForm: {
          oldSMSCode: ''
        },
        rules: {
          oldSMSCode: this.$rules.SMSCode('modifyMobileTicket', this)
        },
        limits: {
          oldSMSCode: this.$limits.SMSCode()
        },
        preventContinuousClicks: true,
        purpose: this.$dictionary.purpose.modifyMobile,
        ticketType: this.$dictionary.ticketType.modifyMobileTicket
      }
    },
    methods: {
      submit() {
        if (!this.preventContinuousClicks) {
          return false
        }
        this.preventContinuousClicks = !this.preventContinuousClicks
        this.$store.dispatch('verifyCode', {
          code: this.dataForm.oldSMSCode,
          ticket: this.ticket
        })
          .then((res) => {
            if (res.data) {
              this.preventContinuousClicks = !this.preventContinuousClicks
              // 判断输入的短信验证码是否为空，是否正确
              this.$router.push({path: '/users/safe/mobile/change'})
            }
          })
          .catch(error => {
            this.preventContinuousClicks = !this.preventContinuousClicks
            this.dataForm.oldSMSCode = ''
            console.log(error)
          })
      }
    },
    created() {
      if (!this.$store.state.manage.userInfo.emailBind && !this.$store.state.manage.userInfo.googleBind) {
        this.$router.push({path: '/users/safe'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    .st-content {
      height: 638px;
      .st-form {
        margin: 70px 0 0 442px;
        .continuousClicks {
          background: #ccc !important;
          color: #fff !important;
          cursor: auto !important;
        }
      }
    }
  }
</style>
