<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.resetFundPassword`)" top="30px">
      <reset></reset>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../../../components/users/user-bread'
  import Reset from './reset.vue'

  export default {
    name: 'users-fund-setting',
    // middleware: ['auth'],
    components: {
      UserBread,
      Reset
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.resetFundPassword`)
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    .st-content {
      height: 568px;
    }
  }
</style>
