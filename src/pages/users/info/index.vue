<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="title" top="30px" paddingTop="20px" paddingBottom="112px">
      <prompt>
        <p v-if="!isHighAuth">{{ $t(`message.users.authTip`) }}</p>
        <template v-else>
          <p>{{$t('message.users.userAuthTwoMessage1')}}</p>
          <p>{{$t('message.users.userAuthTwoMessage2')}}</p>
          <p>{{$t('message.users.userAuthTwoMessage3')}}</p>
        </template>
      </prompt>
      <auth v-if="!isHighAuth"></auth>
      <high-auth v-else></high-auth>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../components/users/user-bread'
  import Prompt from '../../../components/users/prompt'
  import Auth from './auth/index.vue'
  import HighAuth from './auth/high.vue'

  export default {
    name: 'users-info-auth',
    // middleware: ['auth'],
    components: {
      UserBread,
      Prompt,
      Auth,
      HighAuth
    },
    computed: {
      breadList() {
        return [
          {
            name: this.$t(`message.users.userInfo`),
            link: '/users'
          },
          {
            name: this.title
          }
        ]
      },
      title() {
        return this.isHighAuth ? this.$t(`message.users.highAuth`) : this.$t(`message.users.baseAuth`)
      },
      isHighAuth() {
        return this.$route.path.indexOf('high') > -1
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/css/theme";

  .container {
    min-width: 1300px;
    .authForm {
      margin: 50px 330px 0 304px;
      width: 446px;
      height: 266px;
      // background-color: #eee;
      .item {
        span {
          display: inline-block;
          width: 70px;
          text-align: right;
          font-size: 14px;
          color: #333;
        }
        input {
          margin-left: 18px;
          width: 348px;
          height: 40px;
          border: 1px solid #ced0da;
          border-radius: 4px;
          padding: 0 10px;
          font-size: 14px;
        }
        .tips {
          margin-top: 4px;
          padding-left: 88px;
          font-size: 12px;
          color: #999;
        }
      }
      .country {
        margin-bottom: 30px;
        span {
          margin-right: 18px;
        }
      }
      .name {
        margin-bottom: 16px;
      }
      .card {
        margin-bottom: 36px;
      }
      .submit {
        padding-left: 88px;
        button {
          width: 360px;
          height: 40px;
          background-color: #597ab9;
          border-radius: 3px;
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
</style>
