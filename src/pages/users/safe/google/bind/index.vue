<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.bindGoogleVerify`)" top="30px">
      <bind></bind>
    </st-content>
    <st-content :title="$t(`message.users.scanDownload`)" top="20px" class="download">
      <st-row class="row" justify="center" align="center">
        <figure>
          <div class="ios"></div>
          <figcaption>{{ $t(`message.users.appStoreDownload`) }}</figcaption>
        </figure>
        <figure>
          <div class="android"></div>
          <figcaption>{{ $t(`message.users.googlePlayDownload`) }}</figcaption>
        </figure>
      </st-row>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../../../components/users/user-bread'
  import Bind from './bind.vue'

  export default {
    name: 'users-fund-setting',
    // middleware: ['auth'],
    components: {
      UserBread,
      Bind
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.bindGoogleVerify`)
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    .st-content {
      height: 561px;
      &.download {
        height: 391px;
        .row {
          padding-top: 70px;
          figure {
            margin: 0 63px;
            div {
              width: 125px;
              height: 125px;
              background: yellowgreen;
              &.ios {
                background: url("../../../../../assets/images/AppStoreDown.png") no-repeat center center/125px;
              }
              &.android {
                background: url("../../../../../assets/images/GooglePlayDown.png") no-repeat center center/125px;
              }
            }
            figcaption {
              margin-top: 30px;
              font-size: 14px;
              line-height: 14px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
