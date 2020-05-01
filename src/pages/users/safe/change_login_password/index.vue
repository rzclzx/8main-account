<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.changeLoginPassword`)" top="30px">
      <change></change>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../../components/users/user-bread'
  import Change from './change_login_password'

  export default {
    name: 'users-login-change',
    // middleware: ['auth'],
    components: {
      UserBread,
      Change
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.changeLoginPassword`)
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
