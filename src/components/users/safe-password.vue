<template>
  <div class="safe-password">
    <user-safe-item :title="$t(`message.users.loginPwd`)" :tip="$t(`message.users.loginWebsite`)">
      <router-link to="../../users/safe/change_login_password">{{ $t(`message.users.modifyLoginPwd`) }}</router-link>
    </user-safe-item>
    <user-safe-item :title="$t(`message.users.fundPwd`)" :tip="$t(`message.users.tradingAndWithdrawals`)">
      <template v-if="userInfo.tradePwdExist">
        <router-link to="../../users/safe/fund/change">{{ $t(`message.users.changeFundPasswordHandle`) }}</router-link>
        <div class="line"></div>
        <router-link to="../../users/safe/fund/reset">{{ $t(`message.users.resetFundPasswordHandle`) }}</router-link>
      </template>
      <router-link to="../../users/safe/fund/setting" v-else>{{ $t(`message.users.setNow`) }}</router-link>
    </user-safe-item>
  </div>
</template>

<script>
  import UserSafeItem from './user-safe-item'

  export default {
    name: 'safe-password',
    components: {
      UserSafeItem
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .safe-password {
    a {
      font-size: 14px;
      color: @linkColor;
      &:hover {
        color: #1e2266;
      }
    }
    .line {
      margin: 0 9px;
      width: 1px;
      height: 12px;
      background: @linkColor;
    }
  }
</style>
