<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.changeMobile`)" top="30px">
      <success-email
        :message="$t(`message.users.modifyMobileSuccess`)"
        :txt="$t(`message.users.clickMobileOut`)"
        :email="$route.query.email"
      >
      </success-email>
    </st-content>
  </div>
</template>

<script>
  import SuccessEmail from '../../../../../components/common/success-email'
  import UserBread from '../../../../../components/users/user-bread'

  export default {
    name: 'change-mobile-send-email',
    // middleware: ['auth', 'successive'],
    components: {
      SuccessEmail,
      UserBread
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.changeMobile`)
          }
        ]
      }
    },
    beforeDestroy() {
      this.$store.commit('SET_SUCCESSIVE', {successive: false})
    },
    created() {
      if (!this.$store.state.successive.successive) {
        this.$router.push('/')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .container {
    .st-content {
      height: 638px;
      .st-form {
        margin: 70px 0 0 442px;
      }
    }
  }
</style>
