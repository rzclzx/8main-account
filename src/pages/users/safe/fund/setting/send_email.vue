<template>
  <success-email
    :message="$t('message.users.setFundPasswordSendEmailSuccess')"
    :txt="$t('message.users.clickLinkInEmailForSetFundPassword')"
    :email="email"
  >
  </success-email>
</template>

<script>
  import SuccessEmail from '../../../../../components/common/success-email'

  export default {
    name: 'fund-set-email',
    // middleware: ['auth', 'successive'],
    components: {
      SuccessEmail
    },
    computed: {
      email() {
        return this.$store.state.manage.userInfo.email
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

</style>
