<template>
  <success
    :message="$t('users.changePwdSuccess')"
    :backText="$t('users.goLogin')"
    :urlBack="'/'"
  >
  </success>
</template>

<script>
  import Success from '~/components/common/success'

  export default {
    name: 'fund-set-success',
    components: {
      Success
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
