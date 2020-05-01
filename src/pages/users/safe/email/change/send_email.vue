<template>
  <success-email
    :message="$t(`message.users.changeEmailSuccess`)"
    :txt="$t(`message.users.clickChangeEmail`)"
    :email="$route.params.email"
  >
  </success-email>
</template>

<script>
  import SuccessEmail from '../../../../../components/common/success-email'

  export default {
    name: 'change-send-email',
    // middleware: ['auth', 'successive'],
    components: {
      SuccessEmail
    },
    beforeDestroy() {
      this.$store.commit('SET_SUCCESSIVE', {successive: false})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
