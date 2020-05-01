<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.settingFundPassword`)" top="30px">
      <setting></setting>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../../../components/users/user-bread'
  import Setting from './setting.vue'

  export default {
    name: 'users-fund-setting',
    middleware: ['auth'],
    components: {
      UserBread,
      Setting
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.settingFundPassword`)
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
    }
  }
</style>
