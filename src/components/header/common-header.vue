<template>
  <st-row class="common-header" align="center">
    <a :class="['logo', $i18n.locale]" :href="apiConfig.mainDomain"></a>
    <div class="line line-24"></div>
    <st-row class="main-nav" align="center">
      <!--<a href="/" style="margin-left: 40px">{{ $t(`message.header.index`) }}</a>-->
      <a :href="item.href" v-for="item in product" :key="item.id" v-if="item.header">{{ item.name }}</a>
      <!--<a href="/58BTopics">{{ $t('message.applyCoin.58BTopics') }}</a>-->
    </st-row>
    <div class="blank"></div>
    <st-row class="account-nav" align="center">
      <router-link to="/account">{{ $t(`message.header.wallet`) }}</router-link>
      <router-link
        :to="`/account/deposit/${this.$store.state.dictionary.currencyList && this.$store.state.dictionary.currencyList.length && this.$store.state.dictionary.currencyList[0].name}`">
        {{
        $t(`message.header.deposit`) }}
      </router-link>
      <router-link
        :to="`/account/withdraw/${this.$store.state.dictionary.currencyList && this.$store.state.dictionary.currencyList.length && this.$store.state.dictionary.currencyList[0].name}`">
        {{
        $t(`message.header.withdraw`) }}
      </router-link>
      <a
        :href="`https://58coin-support.zendesk.com/hc/${$dictionary.zendeskLocale[$i18n.locale] || 'en-us'}/categories/360000038673-%E5%85%AC%E5%91%8A%E4%B8%AD%E5%BF%83`"
        target="_blank">{{ $t(`message.header.notice`) }}</a>
    </st-row>
    <template v-if="userInfo">
      <router-link to="/users">{{ $t(`message.header.user`) }}：{{userInfo.nickName}}</router-link>
      <div class="line line-10"></div>
      <a @click="logout">{{ $t(`message.header.logout`) }}</a>
    </template>
    <template v-else>
      <a :href="apiConfig.mainDomain + 'manage/login'">{{ $t(`message.header.login`) }}</a>
      <div class="line line-10"></div>
      <a :href="apiConfig.mainDomain + 'manage/register'">{{ $t(`message.header.register`) }}</a>
    </template>
  </st-row>
</template>

<script>
  import Cookie from '../../assets/js/config/cookie'
  import Product from '../../assets/js/config/product'
  import ApiConfig from '../../assets/js/config/api.config'

  export default {
    name: 'common-header',
    props: {
      isMain: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        apiConfig: ApiConfig,
        isLogouting: false
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      },
      product() {
        return Product(this.$i18n)
      }
    },
    methods: {
      logout() {
        // Cookie.clearCookie('token', ApiConfig.domain)
        // setTimeout(() => {
        //   this.$router.redirect({
        //     path: '/'
        //   })
        // }, 10)
        if (this.isLogouting) return false
        this.isLogouting = true
        this.manageApi.logout()
          .then(() => {
            this.isLogouting = false
            Cookie.clearCookie('token', ApiConfig.domain)
            this.$store.commit('SET_COOKIE', {token: null})
            this.$store.commit('SAVE_USER_INFO', {data: null})
            setTimeout(() => {
              window.location.href = ApiConfig.mainDomain
            }, 10)
          })
          .catch(() => {
            this.isLogouting = false
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .common-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    min-width: 1300px;
    width: 100%;
    border-bottom: 1px solid #c5d4ed;
    .border-shadow(0 3px 8px rgba(205, 205, 205, .5));
    padding: 18.5px 42px 18.5px 50px;
    background: #fff;
    .logo {
      display: block;
      width: 168px;
      height: 46px;
      background: url("../../assets/images/58COIN_be.png") no-repeat;
      background-size: 100% 100%;
      text-indent: -9999px;
      &.cn {
        background-image: url(../../assets/images/58COIN_bc.png);
      }
      &.en {
        background-image: url("../../assets/images/58COIN_be.png");
      }
    }
    .line {
      width: 1px;
      background: #e2eafb;
    }
    .line-10 {
      margin: 0 20px;
      height: 10px;
    }
    .line-24 {
      margin: 0 40px;
      height: 24px;
    }
    a {
      font-size: 14px;
      color: #6c85ae;
      &:hover {
        color: #1e2266;
      }
    }
    .account-nav {
      margin-right: 60px;
    }
    .main-nav a,
    .account-nav a {
      margin-right: 30px;
    }
    .main-nav a,
    .account-nav a {
      &:last-child {
        margin-right: 0;
      }
    }
    .blank {
      .flex-grow();
    }
  }

  @media screen and (max-width: 1500px) {
    .common-header {
      padding: 18.5px 28px;
      .line-24 {
        margin: 0 20px;
      }
      .main-nav a,
      .account-nav a {
        margin-right: 20px;
      }
    }
  }
</style>
