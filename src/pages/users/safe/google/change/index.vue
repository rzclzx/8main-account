<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.changeGoogleVerify`)" top="30px">
      <change></change>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../../../components/users/user-bread'
  import Change from './change'

  export default {
    name: 'users-fund-setting',
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
            name: this.$t(`message.users.changeGoogleVerify`)
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    .st-content {
      /*height: 561px;*/
    }
  }
</style>
