<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.unbindGoogleVerify`)" top="30px">
      <unbind></unbind>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../../../components/users/user-bread'
  import Unbind from './unbind.vue'

  export default {
    name: 'users-fund-setting',
    // middleware: ['auth'],
    components: {
      UserBread,
      Unbind
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.unbindGoogleVerify`)
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
