<template>
  <div class="user-auth">
    <!-- 实名认证 -->
    <!-- <h3>{{ $t(`message.users.userAuth`) }}</h3>
    <st-row justify="between" align="center">
      <p>{{ $t(`message.users.authTip`) }}</p>
      <nuxt-link to="/users/info/auth" v-if="baseAuth === false">{{ $t(`message.users.unauthorized`) }}</nuxt-link>
      <a style="cursor: default" v-if="baseAuth === true">{{ $t(`message.users.authorized`) }}</a>
    </st-row> -->
    <!-- 初级认证  高级认证 -->
    <st-row justify="between" align="center">
      <st-row justify="between" align="center">
        <st-row justify="center" class="icon">
          <span class="baseAuth"></span>
        </st-row>
        <p class="authLevel">{{ $t(`message.users.baseAuth`) }}</p>
      </st-row>
      <router-link to="/users/info" v-if="baseAuth === false">{{ $t(`message.users.goAuth`) }}</router-link>
      <a class="authTrue" style="cursor: default" v-if="baseAuth === true">{{ $t(`message.users.authorized`) }}</a>
    </st-row>
    <st-row justify="between" align="center" style="margin-top: 27px;">
      <st-row justify="between" align="center">
        <st-row justify="center" class="icon">
          <span class="highAuth"></span>
        </st-row>
        <p class="authLevel">
          {{ $t(`message.users.highAuth`) }}
          <span v-if="authStatus === $dictionary.userPersonalInfo.AUTH_FAIL">{{ $t(`message.users.notPass`) }}</span>
        </p>
      </st-row>
      <router-link to="/users/info/auth/high"
                   v-if="baseAuth === true && highAuth === false && authStatus !== $dictionary.userPersonalInfo.WAITING_AUTH">
        {{ $t(`message.users.goAuth`) }}
      </router-link>
      <a class="authTrue" style="cursor: default" v-if="baseAuth === false && highAuth === false">{{
        $t(`message.users.unauthorized`) }}</a>
      <a class="authTrue" style="cursor: default"
         v-if="highAuth === false && authStatus === $dictionary.userPersonalInfo.WAITING_AUTH">{{
        $t(`message.users.waitAuth`)
        }}</a>
      <a class="authTrue" style="cursor: default" v-if="highAuth === true">{{ $t(`message.users.authorized`) }}</a>
    </st-row>
  </div>
</template>

<script>
  import ApiConfig from '../../../myConfig/api.config'

  export default {
    name: 'user-auth',
    props: ['authStatus'],
    data() {
      return {
        apiConfig: ApiConfig,
        href: ''
      }
    },
    computed: {
      baseAuth() {
        return this.$store.state.manage.userInfo.baseAuth
      },
      highAuth() {
        return this.$store.state.manage.userInfo.highAuth
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .user-auth {
    border: 1px solid @borderColor;
    padding: 23px 20px;
    h3 {
      line-height: 28px;
      font-size: 14px;
    }
    p {
      width: 855px;
      line-height: 28px;
      font-size: 14px;
      color: @tipColor;
      &.authLevel {
        margin-left: 27px;
        color: #333;
        span {
          margin-left: 200px;
          color: @tipColor;
        }
      }
    }
    a {
      font-size: 14px;
      color: @linkColor;
      &:first-child {
        &:hover {
          color: #1e2266;
        }
      }
      &.authTrue {
        color: @tipColor;
      }
    }
    .bind-mobile {
      width: 28px;
      height: 28px;
      background: url(../../assets/images/icon-bind-mobile.png);
    }
    .baseAuth {
      width: 26px;
      height: 26px;
      background: url(../../assets/images/baseAuth.png) no-repeat;
    }
    .highAuth {
      width: 26px;
      height: 26px;
      background: url(../../assets/images/highAuth.png) no-repeat;
    }
  }
</style>
