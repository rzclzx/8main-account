<template>
  <st-row class="filter-detail" align="center" justify="between">
    <st-row align="center">
      <st-form-item :label="$t('message.account.selectNumber')" labelSpace="10px" minHeight="30px">
        <st-select class="item" v-model="site" :value="site" :initText="initSite" @onSelect="selectSite" width="150px"
                   :style="{marginRight: site === labsSite ? '10px' : '110px'}">
          <st-option v-for="item in siteList"
                     :key="item.id"
                     :value="item.id"
                     :label="item[localeName] || item.name"
                     style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
          >
          </st-option>
        </st-select>
      </st-form-item>
      <st-form-item label="" labelSpace="10px" minHeight="30px" v-if="site === labsSite">
        <st-select class="item" v-model="productId" :value="productId" :initText="initProductName"
                   @onSelect="selectProductId" width="110px">
          <st-option v-for="item in productSiteList"
                     :key="item.id"
                     :value="item.id"
                     :label="item[localeName] || item.name"
                     style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                     ref="productOption"
          >
          </st-option>
        </st-select>
      </st-form-item>
      <st-form-item :label="$t('message.account.selectTime')" labelSpace="10px" minHeight="30px">
        <st-select class="item" v-model="time" :value="time" :initText="initTime" @onSelect="selectTime" width="130px">
          <st-option ref="timeOption"
                     v-for="item in timeList"
                     :key="item.id"
                     :value="item.id"
                     :label="item.name"
          >
          </st-option>
        </st-select>
      </st-form-item>
      <st-form-item :label="$t('message.account.selectCoin')" labelSpace="10px" minHeight="30px">
        <st-select class="item" v-model="coin" :value="coin" :initText="initCoin" @onSelect="selectCoin" width="100px">
          <st-option ref="coinOption"
                     v-for="(item,i) in coinList"
                     :key="i"
                     :value="item.id"
                     :label="item.name"
          >
          </st-option>
        </st-select>
      </st-form-item>
      <st-form-item :label="$t('message.account.selectType')" labelSpace="10px" minHeight="30px">
        <st-select class="item" v-model="type" :value="type" style="margin-right: 0;" :initText="initType"
                   @onSelect="selectType" width="160px">
          <st-option ref="typeOption"
                     v-for="item in typeList"
                     :key="item.id"
                     :value="item.id"
                     :label="item.name"
          >
          </st-option>
        </st-select>
      </st-form-item>
    </st-row>
    <router-link to="/account/bills/record" v-if="site === 6">{{ $t('message.account.viewTransferRecord') }}
    </router-link>
  </st-row>
</template>

<script>
  import ToolsApi from '../../assets/js/api/toolsApi'

  export default {
    name: 'bills-filter',
    data () {
      return {
        siteList: [],
        supportCurrency: [],
        mainSite: [],
        supportSite: [],
        site: 3,
        initSite: '',
        timeList: [],
        time: '',
        initTime: '',
        coinList: [],
        coin: '',
        initCoin: '',
        typeList: [],
        type: '',
        initType: '',
        labsSite: 9,
        productId: '',
        initProductName: '',
        productSiteList: []
      }
    },
    watch: {
      site (value) {
        this.time = 1
        this.coin = ''
        this.type = ''
        this.setType(value)
        this.productId = value === this.labsSite ? this.productSiteList[0].id : ''
        this.setCoin(value, this.productId)
        this.$nextTick(() => {
          this.$refs.timeOption[0].$el.click()
          this.$refs.coinOption[0].$el.click()
          this.$refs.typeOption[0].$el.click()
          this.$refs.productOption && this.$refs.productOption[0] && this.$refs.productOption[0].$el.click()
        })
        this.$router.replace({
          path: '/account/bills',
          query: {
            site: this.site,
            time: this.time,
            coin: this.coin,
            type: this.type,
            page: 1,
            productId: this.productId
          }
        })
      },
      productId (val) {
        this.time = 1
        this.coin = ''
        this.type = ''
        this.setType(this.site)
        this.setCoin(this.site, val)
        this.$nextTick(() => {
          this.$refs.timeOption[0].$el.click()
          this.$refs.coinOption[0].$el.click()
          this.$refs.typeOption[0].$el.click()
        })
        this.$router.replace({
          path: '/account/bills',
          query: {
            site: this.site,
            time: this.time,
            coin: this.coin,
            type: this.type,
            page: 1,
            productId: this.productId
          }
        })
      }
    },
    computed: {
      // 站点名称key
      localeName () {
        if (/(zh)|(cn)/.test(this.$i18n.locale)) return 'name'
        else return `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
      }
    },
    methods: {
      setCoin (site, _productId) {
        let coinList = [{
          id: '',
          name: this.$t('message.account.all')
        }]
        let productId = _productId || this.$route.query.productId || 0
        let productInfo = this.$store.state.dictionary.productList.find(item => item.id === Number(productId))
        if (Number(site) === 9) {
          this.supportCurrency[site].map(item => {
            if (productInfo && (item.id === productInfo.baseCurrency || item.id === productInfo.quoteCurrency)) coinList.push(item)
          })
        } else {
          this.supportCurrency[site].map(item => {
            coinList.push(item)
          })
        }
        this.coinList = coinList
        return coinList
      },
      setType (site) {
        this.typeList = this.$dictionary.typeListDictionary[site]
        return this.$dictionary.typeListDictionary[site]
      },
      selectSite (val) {
        this.site = val
      },
      selectProductId (val) {
        this.productId = val
      },
      selectTime (val) {
        this.time = val
        this.$router.replace({
          path: '/account/bills',
          query: {
            site: this.site,
            time: this.time,
            coin: this.coin,
            type: this.type,
            page: 1,
            productId: this.productId
          }
        })
      },
      selectCoin (val) {
        this.coin = val
        this.$router.replace({
          path: '/account/bills',
          query: {
            site: this.site,
            time: this.time,
            coin: this.coin,
            type: this.type,
            page: 1,
            productId: this.productId
          }
        })
      },
      selectType (val) {
        this.type = val
        this.$router.replace({
          path: '/account/bills',
          query: {
            site: this.site,
            time: this.time,
            coin: this.coin,
            type: this.type,
            page: 1,
            productId: this.productId
          }
        })
      }
    },
    created () {
      ToolsApi.getSiteSupportCurrencyList()
        .then(res => {
          this.supportCurrency = res.data.currencySiteAll
          return ToolsApi.getMainSite()
            .then(res => {
              this.mainSite = res.data.site
              return ToolsApi.getCurrencyAll()
                .then(res => {
                  this.supportSite = res.data.siteCurrencyAll
                  return ToolsApi.getSiteList()
                    .then(res => {
                      this.siteList = res.data.siteList
                      this.$nextTick(() => {
                        let site = (this.$route.query.site && this.$route.query.site.toString()) || this.mainSite.id.toString()
                        let initSite = this.siteList.filter(item => {
                          return site === item.id.toString()
                        })[0]
                        let keyName = /(zh)|(cn)/.test(this.$i18n.locale) ? 'name' : `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
                        let initSiteName = initSite[keyName] || initSite.name
                        // init Time
                        let timeList = [
                          {
                            id: '1',
                            name: this.$t('message.account.7dayBill')
                          },
                          {
                            id: '2',
                            name: this.$t('message.account.historyBill')
                          }
                        ]
                        let time = this.$route.query.time || ''
                        let initTime = time ? timeList.filter(item => {
                          return time === item.id.toString()
                        })[0].name : timeList[0].name
                        // init coin
                        let coinList = this.setCoin(site)
                        let coin = this.$route.query.coin || ''
                        let initCoin = coinList.filter(item => {
                          return coin === item.id.toString()
                        })[0].name
                        // init type
                        let typeList = this.setType(site)
                        let type = this.$route.query.type || ''
                        let initType = typeList.filter(item => {
                          return type === item.id.toString()
                        })[0].name
                        let productId = this.$route.query.productId || ''
                        let productSiteList = this.$store.state.dictionary.productList.filter(item => (item.type & 2) === 2)
                        let productInfo = productSiteList.find(item => item.id === Number(productId))
                        let initProductName = (productInfo && productInfo.name) || ''
                        this.site = Number(site)
                        this.initSite = initSiteName
                        this.timeList = timeList
                        this.time = time
                        this.initTime = initTime
                        this.coinList = coinList
                        this.coin = coin
                        this.initCoin = initCoin
                        this.typeList = typeList
                        this.type = type
                        this.initType = initType
                        this.productId = productId
                        this.initProductName = initProductName
                        this.productSiteList = productSiteList
                      })
                    })
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
<style lang="less">
  .filter-detail {
    margin-top: 14px;
    padding-left: 60px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f1f3;
    .st-form-item {
      .label {
        line-height: 30px !important;
        font-size: 12px !important;
        color: #666;
      }
    }
    .st-select {
      .box {
        height: 30px !important;
        p {
          font-size: 12px !important;
        }
      }
      ul {
        max-height: 135px !important;
      }
    }
    .st-option {
      height: 30px !important;
      line-height: 30px !important;
      font-size: 12px !important;
    }
    .item {
      margin-right: 110px;
      & > p {
        margin-right: 10px;
        font-size: 13px;
      }
    }
    a {
      font-size: 14px;
      color: #348db8;
    }
  }
</style>
