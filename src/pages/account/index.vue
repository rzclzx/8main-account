<template>
  <div class="account-index container">
    <div class="total-account">
      <p>{{ $t('message.account.qbTotalAccount') }}</p>
      <p>{{ $t('message.account.zcgj') }}：<span style="font-size: 16px;color: #24324C;">{{ totalAssets | getTotalAccount | splitFormat(8) }}</span>
        BTC<span style="font-size: 12px;color: #667AA0;"> ≈ {{ totalCnyAssets | getTotalAccount | splitFormat(2) }} {{ unit }}</span>
      </p>
      <span style="margin-top: 8px;display: block;font-size: 12px;color: #94A1B9;">{{ $t('message.account.note') }}</span>
      <span class="total-account-bg"></span>
    </div>
    <div style="background: #fff">
      <st-row class="nav" justify="between" align="center">
        <st-row class="item" align="center">
          <a :class="[ navId === mainSite.id && 'active' ]" @click="choose(mainSite.id)">{{ mainSite[localeName] || mainSite.name }}</a>
          <a v-for="item in allSite" :key="item.id" :class="[ navId === item.id && 'active' ]" @click="choose(item.id)" v-if="item.id !== mainSite.id">
            {{ item[localeName] || item.name }}
          </a>
        </st-row>
        <router-link class="view" to="/account/bills">{{ $t(`message.account.lookAccountDetail`) }}</router-link>
      </st-row>
      <st-row class="asset" align="center">
        <st-row class="total" align="baseline">
          <h3>{{ $t('message.account.zh') }}</h3>
          <p>{{ rateAsset | getRate(navId) | splitFormat(8) }}&nbsp;</p>
          <span>BTC ≈ {{  rateAsset | getCny(navId) | splitFormat(2) }} {{ unit }}</span>
        </st-row>
        <div class="blank"></div>
        <st-row class="hide" align="center" @callback="toggle">
          <span :class="[ hide && 'active' ]"></span>
          <p v-if="navId !== labsAccountId">{{ $t('message.account.yc') }}</p>
          <p v-else>{{ $t('message.account.hidePairs') }}</p>
        </st-row>
        <div class="search">
          <input type="text" v-model="searchCoin" @input="search" :placeholder="navId !== labsAccountId ? $t('message.account.ss') : $t('message.account.searchPairs')" />
          <span></span>
        </div>
      </st-row>
      <div class="detail" v-if="navId !== labsAccountId">
        <st-row class="title" align="center">
          <p class="col-1">{{ $t(`message.account.currency`) }}</p>
          <p class="col-2">{{ $t(`message.account.able`) }}</p>
          <p class="col-3" v-if="navId !== mortgageloanId">{{ $t(`message.account.dj`) }}</p>
          <p class="col-3" v-if="navId === mortgageloanId">{{ $t(`message.account.dy`) }}</p>
          <p class="col-4">{{ $t(`message.account.total`) }}</p>
          <p class="col-5">{{ $t(`message.account.handle`) }}</p>
        </st-row>
        <template
          v-if="searchList(filterList(supportCurrency[navId] || [])) && searchList(filterList(supportCurrency[navId] || [])).length">
          <st-row class="item" align="center" v-for="item in searchList(filterList(supportCurrency[navId] || []))"
                  :key="item.id">
            <p class="col-1">{{ item.name }}</p>
            <template v-if="navId === mainSite.id">
              <p class="col-2">{{ mainAssets | assetsItem(item.id, 'available') | splitFormat(8) }}</p>
              <p class="col-3">{{ mainAssets | assetsItem(item.id, 'hold') | splitFormat(8) }}</p>
              <p class="col-4">{{ mainAssets | assetsItem(item.id, 'balance') | splitFormat(8) }}</p>
            </template>
            <template v-else>
              <p class="col-2">{{ detailAssets | assetsSiteItem(item.id, navId, 'available') | splitFormat(8) }}</p>
              <p class="col-3">{{ detailAssets | assetsSiteItem(item.id, navId, 'hold') | splitFormat(8) }}</p>
              <p class="col-4">{{ detailAssets | assetsSiteItem(item.id, navId, 'balance') | splitFormat(8) }}</p>
            </template>
            <st-row class="handle col-5" justify="end">
              <template v-if="navId === mainSite.id && item.dailyAmount > 0">
                <router-link :to="{name: 'account-deposit-name', params: {name: item.name}}">{{ $t(`message.account.deposit`) }}</router-link>
                <router-link :to="{name: 'account-withdraw-name', params: {name: item.name}}">{{ $t(`message.account.withdraw`) }}</router-link>
              </template>
              <a @click="togglePopup(item.name, item.id, navId === mainSite.id && 'main')">{{ $t(`message.account.transfer`) }}</a>
            </st-row>
          </st-row>
        </template>
        <div class="no-list" v-else>
          <img src="../../assets/images/account-nolist.png" alt="" />
          <h6>{{$t('message.public.noList')}}</h6>
        </div>
      </div>
      <div class="detail" v-if="navId === labsAccountId">
        <st-row class="title" align="center">
          <p class="col-11">{{ labsName }}</p>
          <p class="col-12">{{ $t(`message.account.able`) }}</p>
          <p class="col-13">{{ $t(`message.account.dj`) }}</p>
          <p class="col-14">{{ $t('message.account.loan') }}</p>
          <p class="col-15">{{ $t(`message.account.total`) }}</p>
          <p class="col-16">{{ $t(`message.account.risk`) }}</p>
          <p class="col-17">{{ $t(`message.account.explosionPrice`) }}</p>
          <p class="col-18">{{ $t(`message.account.handle`) }}</p>
        </st-row>
        <template v-if="searchList(filterList(labsAssets)) && searchList(filterList(labsAssets)).length">
          <st-row class="item" align="center" v-for="item in searchList(filterList(labsAssets))" :key="item.id">
            <p class="col-11">{{ item.productName }}</p>
            <st-row class="col-12" align="start" direction="column">
              <p style="font-size: 12px;">{{ item.assetsInfo.baseAvailable | splitFormat(8) }} {{ item.assetsInfo.baseName }}</p>
              <p style="font-size: 12px;">{{ item.assetsInfo.quoteAvailable | splitFormat(8) }} {{ item.assetsInfo.quoteName }}</p>
            </st-row>
            <st-row class="col-13" align="start" direction="column">
              <p style="font-size: 12px;">{{ item.assetsInfo.baseHold | splitFormat(8) }} {{ item.assetsInfo.baseName }}</p>
              <p style="font-size: 12px;">{{ item.assetsInfo.quoteHold | splitFormat(8) }} {{ item.assetsInfo.quoteName }}</p>
            </st-row>
            <st-row class="col-14" align="start" direction="column">
              <template v-if="item.borrow.baseBorrow || item.borrow.quoteBorrow">
                <p style="font-size: 12px;">{{ item.borrow.baseBorrow | splitFormat(8) }} {{ item.borrow.baseName }}</p>
                <p style="font-size: 12px;">{{ item.borrow.quoteBorrow | splitFormat(8) }} {{ item.borrow.quoteName }}</p>
              </template>
              <p v-else>--</p>
            </st-row>
            <st-row class="col-15" align="start" direction="column">
              <p style="font-size: 12px;">{{ item.assetsInfo.baseAvailable + item.assetsInfo.baseHold | splitFormat(8) }} {{ item.assetsInfo.baseName }}</p>
              <p style="font-size: 12px;">{{ item.assetsInfo.quoteAvailable + item.assetsInfo.quoteHold | splitFormat(8) }} {{ item.assetsInfo.quoteName }}</p>
            </st-row>
            <p :class="['col-16', `level${getRiskLevel(item.risk)}`]">{{ $t(`message.account.riskLevel${getRiskLevel(item.risk)}`) }}</p>
            <p class="col-17">{{ (item.blastPrice === null || item.blastPrice === '') ? '--' : item.blastPrice | splitFormat(8) }}</p>
            <st-row class="handle col-18" justify="end" direction="column" align="end">
              <a style="margin: 0;"
                 @click="togglePopup(item.assetsInfo.baseName, getLabsCurrencyId(item.assetsInfo.baseName), 'labs', item.productId)">{{
                $t(`message.account.transfer`) }}</a>
              <a style="margin: 0;"
                 @click="togglePopup(item.assetsInfo.quoteName, getLabsCurrencyId(item.assetsInfo.quoteName), 'labs', item.productId)">{{
                $t(`message.account.transfer`) }}</a>
            </st-row>
          </st-row>
        </template>
        <div class="no-list" v-else>
          <img src="../../assets/images/account-nolist.png" alt="" />
          <h6>{{$t('message.public.noList')}}</h6>
        </div>
      </div>
    </div>
    <popup :title="`${this.transferInit && this.transferInit.name} ${this.$t(`message.account.transfer`)}`"
           :callback="togglePopup" v-if="popupStatus">
      <transfer-window :currencyId="transferInit.id" :currencyName="transferInit.name" :type="transferInit.type"
                       :productId="transferInit.productId" :mainSite="mainSite" :supportSite="supportSite"
                       @callback="togglePopup"></transfer-window>
    </popup>
  </div>
</template>

<script>
//  import DepositWithdrawAccount from '../../components/account/deposit-withdraw-account'
//  import DetailAccount from '../../components/account/detail-account'
import Popup from '../../components/common/popup'
import TransferWindow from '../../components/account/transfer-window'
import ToolsApi from '../../assets/js/api/toolsApi'

export default {
  name: 'account-index',
  components: {
//      DepositWithdrawAccount,
//      DetailAccount,
    Popup,
    TransferWindow
  },
  data() {
    return {
      popupStatus: false,
      transferInit: null,
      navId: 3,
      hide: true,
      searchCoin: '',
      rateAsset: null,
      labsAccountId: this.$dictionary.labsAccountId,
      mortgageloanId: this.$dictionary.mortgageloanId,
      totalAssets: '--', // 钱包总资产 折合成 BTC
      totalCnyAssets: '--', // 钱包总资产 money
      local: 0,
      unit: 'CNY',
      allSite: [],
      supportCurrency: [],
      mainSite: [],
      supportSite: []
    }
  },
  computed: {
    // 站点名称key
    localeName() {
      if (/(zh)|(cn)/.test(this.$i18n.locale)) return 'name'
      else return `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
    },
    mainAssets() {
      return this.$store.state.account.mainAssets
    },
    detailAssets() {
      return this.$store.state.account.detailAssets
    },
    labsAssets() {
      return this.$store.state.account.labsAssets || []
    },
    labsName() {
      let labsAccount = this.allSite.find(item => item.id === this.labsAccountId)
      return labsAccount[this.localeName] || labsAccount.name
    }
  },
  watch: {
    navId(id) {
      if (id === this.mainSite.id) {
        this.$store.dispatch('getAssetsMain')
      } else if (id === this.labsAccountId) {
        this.$store.dispatch('getAssetsLabs')
      } else {
        this.$store.dispatch('getAssetsDetail')
      }
      this.getRateAsset()
    }
  },
  methods: {
    getRateAsset() {
      this.accountApi.getSitesAll(this.local)
        .then(res => {
          this.rateAsset = res.data.assets
          this.unit = res.data.assets[0].currencyName || 'CNY'
          this.totalAssets = 0
          this.totalCnyAssets = 0
          for (let i = 0; i < res.data.assets.length; i++) {
            this.totalAssets += Number(res.data.assets[i].assets)
            this.totalCnyAssets += Number(res.data.assets[i].cnyAssets)
          }
        })
    },
    choose(id) {
      this.navId = id
    },
    toggle() {
      this.hide = !this.hide
    },
    search() {
      this.searchCoin = this.searchCoin.toUpperCase().slice(0, 12)
    },
    filterList(list) {
      let newList = []
      if (this.hide) {
        if (this.navId === this.mainSite.id) {
          list.map(item => {
            if (this.mainAssets[item.id] && this.mainAssets[item.id]['balance'] > 0) {
              newList.push(item)
            }
          })
        } else if (this.navId === this.labsAccountId) {
          list.map(item => {
            if (item.assetsInfo.baseAvailable || item.assetsInfo.baseHold || item.assetsInfo.quoteAvailable || item.assetsInfo.quoteHold) {
              newList.push(item)
            }
          })
        } else {
          list.map(item => {
            if (this.detailAssets && this.detailAssets[item.id] && this.detailAssets[item.id][this.navId] && this.detailAssets[item.id][this.navId]['balance'] > 0) {
              newList.push(item)
            }
          })
        }
        return newList
      }
      return list
    },
    searchList(list) {
      if (this.search) {
        if (this.navId === this.labsAccountId) {
          let newList = list.filter(item => item.productName.indexOf(this.searchCoin) > -1)
          return newList
        }
        let newList = list && list.filter(item => {
          return item.name && item.name.indexOf(this.searchCoin) > -1
        })
        return newList || []
      }
      return list
    },
    togglePopup(name, id, type, productId) {
      if (name && id) {
        this.popupStatus = true
        this.transferInit = {
          name,
          id,
          type,
          productId
        }
        return
      }
      this.popupStatus = false
      this.transferInit = null
      setTimeout(() => {
        this.getRateAsset()
      }, 3000)
    },
    getRiskLevel(value) {
      let level = 0
      value = Number(value)
      if (value) {
        if (value > 150) level = 1
        else if (value <= 150 && value > 130) level = 2
        else level = 3
      }
      return level
    },
    getLabsCurrencyId(name) {
      let currencyList = this.$store.state.dictionary.currencyList
      return currencyList.find(item => item.name === name).id
    }
  },
  filters: {
    getRate(value, navId) {
      if (value) {
        let info = value.filter(item => {
          return navId.toString() === item.site.toString()
        })[0]
        return info.assets
      } else {
        return '--'
      }
    },
    getCny(value, navId) {
      if (value) {
        let info = value.filter(item => {
          return navId.toString() === item.site.toString()
        })[0]
        return info.cnyAssets
      } else {
        return '--'
      }
    },
    assetsItem(value, id, type) {
      if (value && value[id]) {
        return value[id][type]
      }
      return '-'
    },
    assetsSiteItem(value, id, accountId, type) {
      if (value) return (value[id] && value[id][accountId] && value[id][accountId][type].toString()) || '-'
      return '-'
    },
    getTotalAccount (value) {
      if ((value - 0) === 0 || value) {
        return value
      }
      return '--'
    }
  },
  mounted() {
    this.local = this.$i18n.locale === 'en' ? 1 : this.$i18n.locale === 'ko' ? 3 : this.$i18n.locale === 'ja' ? 2 : this.$i18n.locale === 'ru' ? 4 : 0
    this.getRateAsset()
  },
  created() {
    ToolsApi.getSiteSupportCurrencyList()
      .then(res => {
        this.supportCurrency = res.data.currencySiteAll
      })
      .catch(e => {
        console.log(e)
      })
    ToolsApi.getMainSite()
      .then(res => {
        this.mainSite = res.data.site
      })
      .catch(e => {
        console.log(e)
      })
    ToolsApi.getCurrencyAll()
      .then(res => {
        this.supportSite = res.data.siteCurrencyAll
      })
      .catch(e => {
        console.log(e)
      })
    ToolsApi.getSiteList()
      .then(res => {
        this.allSite = res.data.siteList
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .account-index {
    /*padding-bottom: 50px;*/
    .total-account {
      position: relative;
      margin-bottom: 10px;
      padding: 20px 0 20px 30px;
      width: 100%;
      background: #fff;
      p {
        &:first-child {
          font-size: 16px;
          line-height: 1rem;
          color: #24324C;
        }
        &:nth-child(2) {
          margin-top: 8px;
          font-size: 12px;
          line-height: 1rem;
          color: #24324C;
        }
      }
      .total-account-bg {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 186px;
        height: 100px;
        background: url('../../assets/images/total-account.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .blank {
      .flex-grow();
    }
    .nav {
      height: 72px;
      padding: 0 40px;
      border-bottom: 2px solid #eff2f5;
      .item {
        a {
          margin-right: 45px;
          line-height: 30px;
          font-size: 14px;
          color: #999;
          &:last-child {
            margin-right: 0;
          }
          &.active {
            position: relative;
            color: #597ab9;
            &:after {
              position: absolute;
              bottom: -22px;
              left: 0;
              display: block;
              content: '';
              width: 100%;
              height: 2px;
              background: #597ab9;
            }
          }
        }
      }
      .view {
        font-size: 14px;
        color: #53b7e8;
        &:hover {
          color: #348db8;
        }
      }
    }
    .asset {
      height: 70px;
      padding: 0 40px;
      .total {
        h3 {
          margin-right: 10px;
          font-size: 12px;
          color: #888;
        }
        p {
          font-size: 14px;
          color: #1e2266;
        }
        span {
          font-size: 12px;
          color: #1e2266;
        }
      }
      .hide {
        cursor: pointer;
        span {
          display: block;
          width: 12px;
          height: 12px;
          background: url('../../assets/images/icon-kxkw.png');
          &.active {
            background: url('../../assets/images/icon-fxk.png');
          }
        }
        p {
          margin-left: 8px;
          font-size: 12px;
          color: #999;
        }
      }
      .search {
        position: relative;
        margin-left: 14px;
        input[type="text"] {
          width: 260px;
          height: 36px;
          border: 1px solid #ced0da;
          .border-radius();
          .placeholder({color: @placeholderColor});
          padding-left: 10px;
          padding-right: 40px;
        }
        span {
          position: absolute;
          top: 9px;
          right: 20px;
          display: block;
          width: 17px;
          height: 18px;
          background: url(../../assets/images/icon-ss.png);
        }
      }
    }
    .detail {
      min-height: 268px;
      .col-1 {
        width: 208px;
      }
      .col-2 {
        width: 234px;
      }
      .col-3 {
        width: 234px;
      }
      .col-4 {
        width: 234px;
      }
      .col-5 {
        width: 404px;
      }
      .col-11 {
        width: 140px;
      }
      .col-12 {
        width: 200px;
      }
      .col-13 {
        width: 200px;
      }
      .col-14 {
        width: 200px;
      }
      .col-15 {
        width: 200px;
      }
      .col-16 {
        width: 140px;
        &.level1 {
          color: @level1Color;
        }
        &.level2 {
          color: @level2Color;
        }
        &.level3 {
          color: @level3Color;
        }
      }
      .col-17 {
        width: 140px;
      }
      .col-18 {
        width: 60px;
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
      .title {
        height: 51px;
        padding: 0 40px;
        background-color: #fafafb;
        border-bottom: 1px solid #eff2f5;
        p {
          font-size: 12px;
          color: #888;
          &:last-child {
            text-align: right;
          }
        }
      }
      .item {
        height: 61px;
        padding: 0 40px;
        border-bottom: 1px solid #f0f1f3;
        p {
          font-size: 12px;
          &:first-child {
            font-size: 13px;
            color: #1e2266;
          }
        }
        .handle {
          a {
            margin-left: 84px;
            font-size: 12px;
            color: #597ab9;
            &:first-child {
              margin-left: 0;
            }
            &:hover {
              color: #1e2266;
            }
          }
        }
      }
    }
  }
</style>
