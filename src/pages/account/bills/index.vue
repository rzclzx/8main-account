<template>
  <st-content class="detail-index container" :title="$t('message.account.billsDetails')" paddingBottom="30px">
    <bills-filter></bills-filter>
    <bills-list></bills-list>
  </st-content>
</template>

<script>
  import BillsFilter from '../../../components/account/bills-filter'
  import BillsList from '../../../components/account/bills-list'

  export default {
    name: 'ranking-index',
    components: {
      BillsFilter,
      BillsList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../assets/css/theme';

  .detail-index {
    padding: 16px 40px 30px;
    background: #fff;
    h2 {
      border-bottom: 1px solid #e5e5e5;
      line-height: 48px;
      font-size: 16px;
      color: #666;
    }
  }

  .entrust-filter {
    margin-top: 24px;
    margin-bottom: 40px;
    .entrust-filter-item {
      margin-right: 32px;
      & > p {
        margin-right: 10px;
        font-size: 13px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
