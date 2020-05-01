<template>
  <div class="wait"></div>
</template>

<script>
  export default {
    name: 'confirm-waiting',
    data() {
      return {
        mailPurpose: ''
      }
    },
    methods: {
      successed() {
        this.$store.dispatch('getUserInfo')
        this.$store.commit('SET_SUCCESSIVE', {successive: true})
        this.$router.push({
          path: '/users/safe/confirm/success',
          query: {
            mailPurpose: this.mailPurpose
          }
        })
      },
      failed() {
        this.$store.dispatch('getUserInfo')
        this.$store.commit('SET_SUCCESSIVE', {successive: true})
        this.$router.push({
          path: '/users/safe/confirm/fail',
          query: {
            mailPurpose: this.mailPurpose
          }
        })
      }
    },
    mounted() {
      console.log(this.$route.query.mailPurpose, 'this.$route.query.mailPurpose')
      this.mailPurpose = Number(this.$route.query.mailPurpose)
      switch (this.$route.query.mailPurpose) {
        case this.$dictionary.mailPurpose.bindEmailSendMail:
        case this.$dictionary.mailPurpose.changeBindEmailSendMail:
          this.usersApi.confirmEmail(this.$route.query.token).then(res => {
            this.successed()
            console.log(res)
          }).catch(er => {
            console.log(er)
            this.failed()
          })
          break
        case this.$dictionary.mailPurpose.setFundPwdSendMail:
        case this.$dictionary.mailPurpose.modifyFundPwdSendMail:
        case this.$dictionary.mailPurpose.resetFundPwdSendMail:
          this.usersApi.tradePwdConfirm(this.$route.query.token).then(res => {
            this.successed()
            console.log(res)
          }).catch(er => {
            this.failed()
          })
          break
        case this.$dictionary.mailPurpose.trustAddressConfirmSendMail:
          this.accountApi.getCoinConfirmAddress(this.$route.query.token).then(res => {
            this.successed()
            console.log(res)
          }).catch(er => {
            this.failed()
          })
          break
        case this.$dictionary.mailPurpose.withdrawCoinConfirmSendMail:
          this.accountApi.takeCoinConfirm(this.$route.query.token).then(res => {
            this.successed()
            console.log(res)
          }).catch(er => {
            this.failed()
          })
          break
        case this.$dictionary.mailPurpose.modifyMobileSendMail:
          this.accountApi.confirmMobile(this.$route.query.token).then(res => {
            this.successed()
            console.log(res)
          }).catch(er => {
            this.failed()
          })
          break
        default:
          this.$router.replace('/')
          break
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .wait {
    display: none;
    margin-top: 100px;
    text-align: center;
    font-size: 24px;
    color: #888888;
  }
</style>
