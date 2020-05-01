<template>
  <st-content class="deposit-record" top="20px" paddingTop="20px" paddingBottom="50px">
    <st-row class="title" justify="between" align="center" slot="title" v-if="isPage">
      <h2 class="history">{{ $route.params.name }}{{ $t('message.account.depositRecord') }}</h2>
    </st-row>
    <st-row class="title" justify="between" align="center" slot="title" v-else>
      <h2>{{ $t('message.account.rechargeRecord') }}</h2>
      <router-link :to="`/account/deposit/detail/${$route.params.name}`">{{$t('message.account.little')}} >
      </router-link>
    </st-row>
    <table class="tb">
      <thead>
      <tr>
        <th>{{$t('message.accountdetail.rechargeAddress')}}</th>
        <th style="text-align: left">{{$t('message.account.rechargeQuantity')}}</th>
        <th>{{$t('message.accountdetail.operationTime')}}</th>
        <th>{{$t('message.account.processingStatus')}}</th>
        <th>{{$t('message.account.action')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in record" :key="item.id">
        <td>{{ item.address }}</td>
        <td>{{ item.amount }} <span style="color: #667AA0">{{$route.params.name}}</span></td>
        <td>{{ item.createdDate | timeFormat }}</td>
        <td>{{ item.status && $dictionary.depositStatus[item.status] }}</td>
        <td><a @click="details(item)" style="color:rgb(75, 125, 220)">{{ $t("message.accountdetail.xiangq") }}</a></td>
      </tr>
      </tbody>
    </table>
    <div class="no-list" v-if="record.length === 0 && page === 1">
      <img src="../../assets/images/account-nolist.png" alt=""/>
      <p>{{ $t('message.common.noList') }}</p>
    </div>
    <st-page :page="page" v-else-if="(record.length && record.length >= 10) || page > 1" style="margin-top: 40px"
             :isDown="isDown"></st-page>
    <RecordDetailAlert v-if="isAlert" :currencyName="$route.params.name" :detail="datail" :type='1' :callback="alertCallback"></RecordDetailAlert>
  </st-content>
</template>

<script>
  import StTable from '../users/table/table'
  import StTableColumn from '../users/table/column'
  import RecordDetailAlert from '../alert/record-detail-alert.vue'
  export default {
    name: 'deposit-record',
    components: {
      StTable,
      StTableColumn,
      RecordDetailAlert
    },
    props: ['isPage'],
    data () {
      return {
        record: [],
        isDown: false,
        page: 1,
        datail: {},
        isAlert: false,
        operateWay: {
          1: this.$t(''),
          2: this.$t('')
        }
      }
    },
    computed: {
      currencyList() {
        return this.$store.state.dictionary.currencyList
      }
    },
    watch: {
      '$route' (route) {
        this.getCoinRecordList()
      }
    },
    methods: {
      alertCallback () {
        this.isAlert = false
      },
      // 查看明细
      details (item) {
        this.isAlert = true 
        this.datail = item
      },
      // 获取充值记录
      getCoinRecordList () {
        let currency = this.currencyList.filter(item => {
          return item.name === this.$route.params.name
        })[0].id
        if (this.$route.query.page) {
          this.page = this.$route.query.page
        } else {
          this.page = 1
        }
        this.accountApi.getCoinRecordList(currency, this.page)
          .then(res => {
            this.record = res.data.recordList || []
            if (this.record.length === 10) {
              this.isDown = false
            } else {
              this.isDown = true
            }
          })
      }
    },
    mounted () {
      this.getCoinRecordList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../assets/css/accountTable';
  @import "../../assets/css/theme";

  .deposit-record {
    .title {
      h2 {
        line-height: 70px;
        font-size: 16px;
        color: #24324C;
        &.history {
          color: #333;
        }
      }
      a {
        font-size: 12px;
        color: #4B7DDC;
        &:hover {
          color: @linkColor;
        }
      }
    }
    .tb {
      thead {
        tr {
          border-bottom: 1px solid #DBE5F8;
        }
        th {
          color: #667AA0;
          background: #F8F9FC;
        }
      }
      tbody {
        tr {
          background: #fff;
          border-bottom: 1px solid #DBE5F8;
          &:hover {
            background: #F0F4FF;
          }
          td {
            color: #24324C !important;
          }
        }
      }
      th:nth-child(1) {
        width: 330px;
      }
      td:nth-child(1) {
        color: #888;
      }
      td:nth-child(2) {
        max-width: 285px;
        text-align: left;
        word-break: break-all;
        word-wrap: break-word;
      }
      td:nth-last-child(3) {
        width: 132px;
        color: @tipColor !important;
      }
      td:nth-last-child(1) {
        width: 80px;
        color: @tipColor !important;
      }
    }
    .no-list {
      margin-top: 100px;
      padding-bottom: 50px;
      img {
        margin: 0 auto;
        width: 175px;
      }
      p {
        line-height: 34px;
        font-size: 14px;
        color: #c9d0dc;
        text-align: center;
      }
    }
  }
</style>
