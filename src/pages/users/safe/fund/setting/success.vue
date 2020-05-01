<template>
  <success
    :message="$t(`message.users.fundPasswordSetSuccess`)"
    :urlBack="'/users/safe'"
  >
  </success>
</template>

<script>
  import Success from '../../../../../components/common/success'

  export default {
    // middleware: ['auth', 'successive'],
    name: 'fund-set-success',
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
