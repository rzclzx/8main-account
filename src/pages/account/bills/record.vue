<template>
  <st-content class="detail-index container" :title="$t('message.account.transferRecord')" paddingBottom="30px">
    <div class="detail-list">
      <table>
        <thead>
        <tr>
          <th width="160" align="left">{{ $t('message.account.operationDate') }}</th>
          <th width="172" align="right">{{ $t('message.account.transferAccount') }}</th>
          <th width="142" align="right">{{ $t('message.account.transferToAccount') }}</th>
          <th width="146" align="right">{{ $t('message.account.currency') }}</th>
          <th width="172" align="right">{{ $t('message.account.amountE') }}</th>
          <th width="172" align="right">{{ $t('message.account.fee') }}</th>
          <th width="172" align="right">{{ $t('message.applyCoin.status') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in record" :key="item.id">
          <td align="left" style="color: #999;">{{ item.createTime | timeFormat }}</td>
          <td align="right">{{ getSiteInfo(item.triggerSiteId)[localeName] || getSiteInfo(item.triggerSiteId).name }}
          </td>
          <td align="right">{{ getSiteInfo(item.targetSiteId)[localeName] || getSiteInfo(item.targetSiteId).name }}</td>
          <td align="right">{{ getCurrencyInfo(item.currencyId)[0].name }}</td>
          <td align="right">{{ item.amount }}</td>
          <td align="right">{{ item.fee || '-' }}</td>
          <td align="right" v-if="item.status === $dictionary.transferStatus.SUCCESS"
              style="color: #32B28F">{{ $t('message.account.transferStatus2') }}
          </td>
          <td align="right"
              v-else-if="item.status === $dictionary.transferStatus.FAILED || item.status === $dictionary.transferStatus.AUDITFAILURE"
              style="color: #B92E5D">{{ $t('message.account.transferStatus3') }}
          </td>
          <td align="right"
              v-else-if="item.status === $dictionary.transferStatus.WAITING_PROCESS || item.status === $dictionary.transferStatus.WAIT || item.status === $store.state.dictionary.transferStatus.DELETE"
              style="color: #F5A623">{{ $t('message.account.transferStatus1') }}
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="!record && page === 1" class="no-list">
        <img src="../../../assets/images/account-nolist.png" alt=""/>
        <h6>{{$t('message.public.noList')}}</h6>
      </div>
      <st-page :page="page" style="margin-top: 40px" :isDown="isDown"
               v-if="page > 1 || (record && record.length)"></st-page>
    </div>
  </st-content>
</template>

<script>
  import AccountApi from '../../../assets/js/api/accountApi'
  import ToolsApi from '../../../assets/js/api/toolsApi'
  import CustomTable from '../../../components/users/table/table'
  import StTableColumn from '../../../components/users/table/column'

  export default {
    name: 'bills-record',
    components: {
      CustomTable,
      StTableColumn
    },
    data () {
      return {
        record: [],
        isDown: false,
        page: 1,
        allSite: []
      }
    },
    computed: {
      currencyList () {
        return this.$store.state.dictionary.currencyList
      },
      listTransfer () {
        return this.$store.state.dictionary.listTransfer
      },
      // 站点名称key
      localeName () {
        if (/(zh)|(cn)/.test(this.$i18n.locale)) return 'name'
        else return `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
      }
    },
    watch: {
      '$route' (route) {
        this.page = route.query.page || 1
        this.getLedger(this.page)
      }
    },
    methods: {
      // 获取币种详情
      getCurrencyInfo (id) {
        return this.currencyList.filter(item => item.id === id)
      },
      // 获取站点详情
      getSiteInfo (id) {
        return this.getListInfo(this.allSite, id, 'id')
      },
      isGreen (action) {
        const list = [0, 2, 5, 6, 9, 13, 30, 31]
        return list.some(item => item === action)
      },
      getListInfo (list, value, key) {
        list = list || this.listTransfer
        let info = list.filter(item => {
          return item[key].toString() === value.toString()
        })[0]
        return info
      },
      getLedger (curPage) {
        AccountApi.listTransfer(curPage, 6)
          .then(res => {
            this.isDown = true
            if (res.data.transferList && res.data.transferList.length) {
              this.record = res.data.transferList
              res.data.transferList.length === 10 && (this.isDown = false)
            } else {
              this.record = null
            }
          })
      }
    },
    mounted () {
      if (this.$route.query.page) {
        this.page = Number(this.$route.query.page)
      }
      this.getLedger(this.page || 1)
    },
    created () {
      ToolsApi.getSiteList()
        .then(res => {
          this.allSite = res.data.siteList
        })
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

  .detail-list {
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      thead {
        border-bottom: 1px solid #f0f1f3;
        tr {
          height: 50px;
          th {
            font-size: 12px;
            font-weight: normal;
            color: #888;
          }
        }
      }
      tbody {
        tr {
          height: 50px;
          border-bottom: 1px solid #f0f1f3;
          font-size: 12px;
          td {
            color: #333;
          }
        }
      }
    }
    .no-list {
      margin-top: 100px;
      padding-bottom: 50px;
      img {
        margin: 0 auto;
        width: 175px;
      }
      h6 {
        line-height: 34px;
        font-size: 14px;
        color: #c9d0dc;
        text-align: center;
      }
    }
  }
</style>
