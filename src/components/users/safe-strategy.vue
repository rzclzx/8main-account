<template>
  <div class="safe-strategy">
    <user-safe-item :title="$t(`message.users.loginVerify`)" :tip="tipOne">
      <router-link to="/users/safe/verify/login">{{ $t(`message.users.change`) }}</router-link>
    </user-safe-item>
    <user-safe-item :title="$t(`message.users.twiceVerify`)" :tip="tipTwo">
      <router-link to="/users/safe/verify/twice">{{ $t(`message.users.change`) }}</router-link>
    </user-safe-item>
    <user-safe-item :title="$t(`message.users.tradeVerify`)" :tip="tipThree">
      <router-link to="/users/safe/verify/trade">{{ $t(`message.users.change`) }}</router-link>
    </user-safe-item>
  </div>
</template>

<script>
  import UserSafeItem from './user-safe-item'

  export default {
    name: 'safe-strategy',
    components: {
      UserSafeItem
    },
    data() {
      return {
        safeStrategyOne: this.$t(`message.users.loginVerify`),
        safeStrategyTwo: this.$t(`message.users.pwdLogin`),
        safeStrategyThree: this.$t(`message.users.change`),
        safeStrategyFore: this.$t(`message.users.twiceVerify`),
        safeStrategyFive: this.$t(`message.users.codeTwice`),
        safeStrategySix: this.$t(`message.users.tradeVerify`),
        safeStrategySeven: this.$t(`message.users.perHour`),
        safeStrategyEight: this.$t(`message.users.pwdAndGoogleLogin`),
        safeStrategyNine: this.$t(`message.users.codeAndGoogleTwice`),
        safeStrategyTen: this.$t(`message.users.googleTwice`),
        safeStrategyEleven: this.$t(`message.users.each`),
        safeStrategyTwelve: this.$t(`message.users.doNotEnter`),
        tipOne: '',
        tipTwo: '',
        tipThree: ''
      }
    },
    computed: {
      twiceLogin() {
        return this.$store.state.manage.userInfo.twiceLogin
      },
      twiceMobileAuth() {
        return this.$store.state.manage.userInfo.twiceMobileAuth
      },
      twiceGoogleAuth() {
        return this.$store.state.manage.userInfo.twiceGoogleAuth
      },
      tradePwdHours() {
        return this.$store.state.manage.userInfo.tradePwdHours
      },
      tradePwdAlways() {
        return this.$store.state.manage.userInfo.tradePwdAlways
      }
    },
    methods: {
      // 确定安全策略
      confirmTipOne() {
        if (this.twiceLogin) {
          this.tipOne = this.safeStrategyEight
        } else {
          this.tipOne = this.safeStrategyTwo
        }
      },
      confirmTipTwo() {
        if (this.twiceMobileAuth && this.twiceGoogleAuth) {
          this.tipTwo = this.safeStrategyNine
        } else if (this.twiceGoogleAuth) {
          this.tipTwo = this.safeStrategyTen
        } else {
          this.tipTwo = this.safeStrategyFive
        }
      },
      confirmTipThree() {
        if (this.tradePwdHours) {
          this.tipThree = this.safeStrategySeven
        } else if (this.tradePwdAlways) {
          this.tipThree = this.safeStrategyEleven
        } else {
          this.tipThree = this.safeStrategyTwelve
        }
      },
      confirmTips() {
        this.confirmTipOne()
        this.confirmTipTwo()
        this.confirmTipThree()
      }
    },
    mounted() {
      this.confirmTips()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .safe-strategy {
    a {
      font-size: 14px;
      color: @linkColor;
      &:hover {
        color: #1e2266;
      }
    }
  }
</style>
