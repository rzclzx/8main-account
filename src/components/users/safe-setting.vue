<template>
  <div class="safe-setting">
    <user-safe-item :title="$t(`message.users.bindMobile`)" :tip="$t(`message.users.receiveInformation`)">
      <span @click="submit">{{ $t(`message.users.changeMobile1`) }}</span>
    </user-safe-item>
    <user-safe-item :title="$t(`message.users.bindGoogle`)" :tip="$t(`message.users.confirmTwice`)">
      <template v-if="userInfo.googleBind">
        <router-link to="../../users/safe/google/change">{{ $t(`message.users.changeGoogle`) }}</router-link>
        <div class="line"></div>
        <router-link to="../../users/safe/google/unbind">{{ $t(`message.users.unbind`) }}</router-link>
      </template>
      <router-link to="../../users/safe/google/bind" v-else>{{ $t(`message.users.bindGoogle`) }}</router-link>
    </user-safe-item>
    <user-safe-item :title="$t(`message.users.bindEmail`)" :tip="$t(`message.users.modifyWithdraw`)">
      <router-link to="../../users/safe/email/change" v-if="userInfo.emailBind">{{ $t(`message.users.changeBindEmail`)
        }}
      </router-link>
      <router-link to="../../users/safe/email/bind" v-else>{{ $t(`message.users.bindEmail`) }}</router-link>
    </user-safe-item>
    <popup :title="$t(`message.users.changeMobile`)" :callback="close" v-if="changeMobile" popupWidth="500px"
           popupHeight="270px">
      <st-change-mobile :boxMessageText="$t('message.users.bindEmailOrGoogle')"></st-change-mobile>
    </popup>
  </div>
</template>

<script>
  import UserSafeItem from './user-safe-item.vue'
  import Popup from '../../components/common/popup'
  import StChangeMobile from '../../components/users/change-mobile'

  export default {
    name: 'safe-setting',
    components: {
      Popup,
      UserSafeItem,
      StChangeMobile
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      }
    },
    data() {
      return {
        changeMobile: false
      }
    },
    methods: {
      submit() {
        if (!this.userInfo.googleBind && !this.userInfo.emailBind) {
          this.changeMobile = true
          return false
        }
        this.$router.push({path: '/users/safe/mobile'})
      },
      // 关闭弹窗
      close() {
        this.changeMobile = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .safe-setting {
    a,
    span {
      font-size: 14px;
      color: @linkColor;
    }
    a:hover {
      color: #1e2266;
    }
    .line {
      margin: 0 9px;
      width: 1px;
      height: 12px;
      background: @linkColor;
    }
    .user-safe-item {
      span:hover {
        color: #1e2266;
        cursor: pointer;
      }
    }
  }
</style>
