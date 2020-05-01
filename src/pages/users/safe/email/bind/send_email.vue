<template>
  <success-email
    :message="$t(`message.users.bindEmailSuccess`)"
    :txt="$t(`message.users.clickCarryOut`)"
    :email="$route.params.email"
  >
  </success-email>
</template>

<script>
  import SuccessEmail from '../../../../../components/common/success-email'

  export default {
    name: 'bind-send-email',
    // middleware: ['auth', 'successive'],
    components: {
      SuccessEmail
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
