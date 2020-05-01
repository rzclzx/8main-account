<template>
  <success
    :message="currentMsg.message"
    :urlGo="currentMsg.urlGo"
    :urlBack="currentMsg.urlBack"
  >
  </success>
</template>

<script>
  import Success from '../../../../components/common/success'

  export default {
    // middleware: ['auth', 'successive'],
    name: 'confirm-success',
    components: {
      Success
    },
    data() {
      return {
        type: [
          {},
          {
            message: this.$t(`message.users.bindEmailSetSuccess`),  // 邮箱绑定设置成功
            urlGo: '/',
            urlBack: '/users/safe'
          },
          {
            message: this.$t(`message.users.bindEmailChangeSuccess`),  // 更换绑定邮箱设置成功
            urlGo: '/',
            urlBack: '/users/safe'
          },
          {
            message: this.$t(`message.users.fundPasswordSetSuccess`),  // 资金密码设置成功
            urlGo: '/',
            urlBack: '/users/safe'
          },
          {
            message: this.$t(`message.users.fundPasswordChangeSuccess`),  // 资金密码修改成功
            urlGo: '/',
            urlBack: '/users/safe'
          },
          {
            message: this.$t(`message.users.fundPasswordResetSuccess`),  // 资金密码重置成功
            urlGo: '/',
            urlBack: '/users/safe'
          },
          {
            message: this.$t(`message.users.addTrustAddressSuccess`),  // 添加信任地址成功
            urlGo: '/',
            urlBack: '/users/safe'
          },
          {
            message: this.$t(`message.users.makeMoneySuccess`),  // 数字货币提现成功
            urlGo: '/',
            urlBack: '/users/safe'
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
            message: this.$t(`message.users.changeMobileSuccess`),  // 修改手机号成功
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
