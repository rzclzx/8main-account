<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <deposit-record :isPage="true" class="list"></deposit-record>
  </div>
</template>

<script>
  import DepositRecord from '../../../../components/account/deposit-record'
  import UserBread from '../../../../components/users/user-bread'

  export default {
    name: 'deposit-ranking-name',
    components: {
      DepositRecord,
      UserBread
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.account.deposit`),
            link: `/account/deposit/${this.$route.params.name}`
          },
          {
            name: this.$route.params.name + this.$t(`message.account.depositRecord`)
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
    height: 843px;
    background-color: #fff;
  }
</style>
