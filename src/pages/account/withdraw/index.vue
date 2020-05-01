<template>
  <div>
  </div>
</template>

<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        let path = vm.$route.fullPath.slice(-1)
        if (path === '/') {
          vm.$router.replace(vm.$route.fullPath + vm.$store.state.dictionary.currencyList[0].name)
        } else {
          vm.$router.replace(vm.$route.fullPath + '/' + vm.$store.state.dictionary.currencyList[0].name)
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
