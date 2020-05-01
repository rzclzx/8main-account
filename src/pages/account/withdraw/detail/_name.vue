<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <withdraw-record :isPage="true" class="list"></withdraw-record>
  </div>
</template>

<script>
  import withdrawRecord from '../../../../components/account/withdraw-record'
  import UserBread from '../../../../components/users/user-bread'

  export default {
    name: 'withdraw-ranking-name',
    components: {
      withdrawRecord,
      UserBread
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.account.withdraw`),
            link: `/account/withdraw/${this.$route.params.name}`
          },
          {
            name: this.$route.params.name + this.$t(`message.account.withdrawRecord`)
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .list {
    margin-top: 30px;
    padding: 0 42px;
    min-height: 770px;
    background-color: #fff;
  }
</style>
