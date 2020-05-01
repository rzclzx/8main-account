<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.bindEmail`)" top="30px">
      <bind></bind>
    </st-content>
  </div>
</template>

<script>
  import UserBread from '../../../../../components/users/user-bread'
  import Bind from './bind'

  export default {
    name: 'bind-email',
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
            name: this.$t(`message.users.bindEmail`)
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    .st-content {
      height: 638px;
    }
  }
</style>
