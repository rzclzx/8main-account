<template>
  <div class="detail-list">
    <table>
      <thead>
      <tr>
        <th width="170" align="left">{{ $t('message.account.operationDate') }}</th>
        <th width="156" align="right">{{ $t('message.account.number') }}</th>
        <th width="126" align="right">{{ $t('message.account.currency') }}</th>
        <th width="136" align="right">{{ $t('message.account.type') }}</th>
        <th width="172" align="right">{{ $t('message.account.amountE') }}</th>
        <th width="172" align="right">{{ $t('message.account.fee') }}</th>
        <th width="188" align="right">{{ $t('message.account.balance') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in record" :key="item.id">
        <td align="left" style="color: #999;">{{ item.createTime | timeFormat }}</td>
        <td align="right">{{ productName }} {{ getSiteInfo(item.siteId)[localeName] || getSiteInfo(item.siteId).name
          }}
        </td>
        <td align="right">{{ getCurrencyInfo(item.currencyId).name }}</td>
        <template>
          <td align="right" v-if="isGreen(item.action)" style="color: #388d3c">{{ $dictionary.typeAllList[item.action]
            }}
          </td>
          <td align="right" v-else style="color: #e6491a">{{ $dictionary.typeAllList[item.action] }}</td>
        </template>
        <td align="right">{{ item.amount }}</td>
        <td align="right">{{ item.action != 11 && item.fee || '-' | splitFormat(8) }}</td>
        <td align="right">{{ item.balance | splitFormat(8) }}</td>
      </tr>
      </tbody>
    </table>
    <div v-if="!record && page === 1" class="no-list">
      <img src="../../assets/images/account-nolist.png" alt=""/>
      <h6>{{$t('message.public.noList')}}</h6>
    </div>
    <st-page :page="page" style="margin-top: 40px" :isDown="isDown"
             v-if="page > 1 || (record && record.length)"></st-page>
  </div>
</template>

<script>
  import AccountApi from '../../assets/js/api/accountApi'
  import ToolsApi from '../../assets/js/api/toolsApi'
  import CustomTable from '../users/table/table'
  import StTableColumn from '../users/table/column'

  export default {
    name: 'bills-list',
    components: {
      CustomTable,
      StTableColumn
    },
    data () {
      return {
        record: [],
        isDown: false,
        page: 1,
        siteList: [],
        mainSite: []
      }
    },
    computed: {
      currencyList () {
        return this.$store.state.dictionary.currencyList
      },
      // 站点名称key
      localeName () {
        if (/(zh)|(cn)/.test(this.$i18n.locale)) return 'name'
        else return `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
      },
      productName () {
        let productName = ''
        let productId = this.$route.query.productId
        if (productId) {
          productName = this.$store.state.dictionary.productList.find(item => item.id === Number(productId)).name
        }
        return productName
      }
    },
    watch: {
      '$route' (route) {
        this.page = route.query.page || 1
        this.getLedger(route.query.site || this.mainSite.id.toString(), route.query.time || 1, route.query.coin, route.query.type, this.page, this.$route.query.productId || '')
      }
    },
    methods: {
      // 获取币种详情
      getCurrencyInfo (id) {
        return this.getListInfo(this.currencyList, id, 'id')
      },
      // 获取站点详情
      getSiteInfo (id) {
        return this.getListInfo(this.siteList, id, 'id')
      },
      isGreen (action) {
        const list = [0, 2, 5, 6, 9, 13, 17, 18, 30, 31]
        return list.some(item => item === action)
      },
      getListInfo (list, value, key) {
        list = list || this.currencyList
        let info = list.filter(item => {
          return item[key].toString() === value.toString()
        })[0]
        return info
      },
      getLedger (siteId, ledgerType, currencyId, action, curPage, productId) {
        AccountApi.getLedger(siteId, ledgerType, currencyId, action, curPage, productId)
          .then(res => {
            this.isDown = true
            if (res.data.ledgers && res.data.ledgers.length) {
              this.record = res.data.ledgers
              res.data.ledgers.length === 10 && (this.isDown = false)
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
      ToolsApi.getMainSite()
        .then(res => {
          this.mainSite = res.data.site
          return ToolsApi.getSiteList()
            .then(res => {
              this.siteList = res.data.siteList
              this.$nextTick(() => {
                this.getLedger(this.$route.query.site || this.mainSite.id.toString(), this.$route.query.time || 1, this.$route.query.coin, this.$route.query.type, this.page || 1, this.$route.query.productId || '')
              })
            })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
