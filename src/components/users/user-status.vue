<template>
  <div class="user-status">
    <st-row class="title" align="center">
      <h3>{{ $t(`message.users.userStatus`) }}</h3>
    </st-row>
    <st-row class="list first" align="center">
      <st-row justify="center" class="icon">
        <span class="level"></span>
      </st-row>
      <h4>{{ $t(`message.users.userSafeLevel`) }}</h4>
      <safe-level :level="getLevel(userInfo)"></safe-level>
      <template v-if="getLevel(userInfo) !== 'verySafe'">
        <div class="blank"></div>
        <router-link to="/users/safe">{{ $t(`message.users.promoteSafeLevel`) }}</router-link>
      </template>
    </st-row>
    <st-row class="list" align="center">
      <st-row justify="center" class="icon">
        <span class="bind-mobile"></span>
      </st-row>
      <h4>{{ $t(`message.users.bindMobile`) }}</h4>
      <p class="mobile">{{ userInfo.mobile }}</p>
      <template>
        <div class="blank"></div>
        <a @click="submit">{{ $t(`message.users.changeMobile1`) }}</a>
      </template>
    </st-row>
    <popup :title="$t(`message.users.changeMobile`)" :callback="close" v-if="changeMobile" popupWidth="500px"
           popupHeight="270px">
      <st-change-mobile :boxMessageText="$t('message.users.bindEmailOrGoogle')"></st-change-mobile>
    </popup>
  </div>
</template>

<script>
  import SafeLevel from './safe-level'
  import Popup from '../../components/common/popup'
  import StChangeMobile from '../../components/users/change-mobile'

  export default {
    name: 'user-status',
    components: {
      Popup,
      SafeLevel,
      StChangeMobile
    },
    data() {
      return {
        level: '',
        changeMobile: false
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      }
    },
    methods: {
      getLevel(userInfo) {
        if (userInfo.emailBind && userInfo.googleBind) {
          return 'verySafe'
        } else if (userInfo.emailBind || userInfo.googleBind) {
          return 'safe'
        } else {
          return 'dangerous'
        }
      },
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

  .user-status {
    .title {
      height: 72px;
      h3 {
        font-size: 14px;
      }
    }
    .list {
      margin-top: 24px;
      padding: 0 20px;
      .icon {
        width: 28px;
        height: 28px;
        .level {
          width: 24px;
          height: 28px;
          background: url(../../assets/images/icon-level.png);
        }
        .bind-mobile {
          width: 28px;
          height: 28px;
          background: url(../../assets/images/icon-bind-mobile.png);
        }
      }
      h4 {
        margin-left: 25px;
        width: 246px;
        font-size: 14px;
        color: @tipColor;
      }
      p {
        font-size: 14px;
      }
      .blank {
        .flex-grow();
      }
      a {
        font-size: 14px;
        color: @linkColor;
        &:hover {
          color: #1e2266;
        }
      }
      &.first {
        margin-top: 0;
      }
    }
  }
</style>
