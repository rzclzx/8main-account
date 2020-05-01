<template>
  <success
    :message="$t('message.users.realNameAuthentication')"
    :urlBack="'/users'"
  >
  </success>
</template>

<script>
  import Success from '../../../../components/common/success'

  export default {
    name: 'users-info-auth-success',
    // middleware: ['auth', 'successive'],
    components: {
      Success
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
