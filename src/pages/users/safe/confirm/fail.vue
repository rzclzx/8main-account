<template>
  <fail
    :message="this.$t(`message.users.linkDead`) + '，' + currentMsg.message"
    :urlBack="currentMsg.urlBack"
  >
  </fail>
</template>

<script>
  import Fail from '../../../../components/common/fail'

  export default {
    // middleware: ['auth', 'successive'],
    name: 'confirm-fail',
    components: {
      Fail
    },
    data() {
      return {
        type: [
          {},
          {
            message: this.$t(`message.users.bindEmailSetFail`),  // 邮箱绑定设置失败
            urlGo: '/',
            urlBack: '/users/safe/email/bind'
          },
          {
            message: this.$t(`message.users.bindEmailChangeFail`),  // 更换绑定邮箱设置失败
            urlGo: '/',
            urlBack: '/users/safe/email/change'
          },
          {
            message: this.$t(`message.users.fundPasswordSetFail`),  // 资金密码设置失败
            urlGo: '/',
            urlBack: '/users/safe/fund/setting'
          },
          {
            message: this.$t(`message.users.fundPasswordChangeFail`),  // 资金密码修改失败
            urlGo: '/',
            urlBack: '/users/safe/fund/change'
          },
          {
            message: this.$t(`message.users.fundPasswordResetFail`),  // 资金密码重置失败
            urlGo: '/',
            urlBack: '/users/safe/fund/reset'
          },
          {
            message: this.$t(`message.users.addTrustAddressFail`),  // 添加信任地址失败
            urlGo: '/',
            urlBack: '/users/safe'  // 待修改
          },
          {
            message: this.$t(`message.users.makeMoneyFail`),  // 数字货币提现失败
            urlGo: '/',
            urlBack: '/users/safe'  // 待修改
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {
            message: this.$t(`message.users.modifyMobileFail`),  // 换绑手机号失败
            urlGo: '/',
            urlBack: '/users/safe'
          }
        ],
        mailPurpose: 0
      }
    },
    computed: {
      currentMsg() {
        return this.type[this.mailPurpose]
      }
    },
    created() {
      this.mailPurpose = Number(this.$route.query.mailPurpose)
      if (!this.$store.state.successive.successive) {
        this.$router.push('/')
      }
    },
    beforeDestroy() {
      this.$store.commit('SET_SUCCESSIVE', {successive: false})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
