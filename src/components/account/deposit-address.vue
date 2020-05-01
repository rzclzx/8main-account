<template>
  <st-content class="deposit-address" :title="$t(`message.account.deposit`)">
    <div class="main" v-if="isDeposit === 1">
      <div class="main-content" style="margin-top: 21px; padding: 25px 0 30px;border-bottom: 1px solid #f0f1f3;">
        <p style="height: 59px;font-size: 14px;color: #999;">{{ $t(`message.account.suspended`) }}</p>
      </div>
    </div>
    <div v-else>
      <div class="address" v-if="addressType === 1">
        <st-row justify="between">
          <st-row class="content" direction="column" style="margin-top: 21px;">
            <p style="font-size: 14px;color: #597ab9;">{{ $t(`message.account.depositAddress`) }}
              <span style="display: inline;width: 100%;font-size: 14px;color: #999;">（{{ $t(`message.account.addressTip`) }}）</span>
            </p>
            <div style="position: relative;margin-top: 5px;width: 790px;">
              <p ref="address-ios" class="cz-address">{{ mergeAddress }}</p>
              <div style="position: absolute;display: inline">
                <a @click="copyKey3" v-if="mergeAddress">{{ $t(`message.account.copy`) }}</a>
                <div style="position: relative;display: inline">
                  <a @mouseenter="showErCode" @mouseleave="hiddenErCode" v-if="mergeAddress">{{
                    $t(`message.account.erCode`) }}</a>
                  <st-row class="er-code" justify="center" align="center"
                          :style="showOrHidden ? 'display: flex;right: -38px' : 'display: none'">
                    <canvas ref="canvas" width="196" height="196"></canvas>
                  </st-row>
                </div>
                <a @click="checkAddress2" v-if="$route.params.name === 'XMC' && mergeAddress">{{
                  $t(`message.account.checkAddress2`) }}</a>
              </div>
            </div>
            <div v-if="$route.params.name === 'UCC'" class="tipsUcc">{{ $t(`message.account.UCCAddressTip`) }}<a
              href="https://www.unichangecoin.org/" target="_blank">{{ $t(`message.account.go58Coin`) }}</a></div>
          </st-row>
        </st-row>
      </div>
      <div class="address" v-else>
        <st-row justify="between">
          <st-row class="content" direction="column" style="margin-top: 21px;">
            <p style="font-size: 14px;color: #597ab9;">{{ $t(`message.account.depositAddress`) }}<span
              style="display: inline;width: 100%;font-size: 14px;color: #999;">（{{ $t(`message.account.addressTip`) }}）</span>
            </p>
            <div style="position: relative;margin-top: 5px;width: 790px;">
              <p ref="address-ios" class="cz-address">{{ address }}</p>
              <div style="position: absolute;display: inline">
                <a @click="copyKey1" v-if="address">{{ $t(`message.account.copy`) }}</a>
                <div style="position: relative;display: inline">
                  <a @mouseenter="showErCode" @mouseleave="hiddenErCode" v-if="address">{{ $t(`message.account.erCode`)
                    }}</a>
                  <st-row class="er-code" justify="center" align="center"
                          :style="showOrHidden ? 'display: flex;right: -38px' : 'display: none'">
                    <canvas ref="canvas" width="196" height="196"></canvas>
                  </st-row>
                </div>
                <a @click="checkAddress1" v-if="$route.params.name === 'XMC' && address">{{
                  $t(`message.account.checkAddress1`) }}</a>
              </div>
            </div>
            <div v-if="$route.params.name === 'UCC'" class="tipsUcc">{{ $t(`message.account.UCCAddressTip`) }}<a
              href="https://www.unichangecoin.org/" target="_blank">{{ $t(`message.account.go58Coin`) }}</a></div>
          </st-row>
        </st-row>
        <st-row class="content" direction="column" v-if="isGray" style="margin-top: 20px;">
          <p style="font-size: 14px;color: #597ab9;">{{ $t(`message.account.label`) }}<span
            style="font-size: 14px;color: #999;">（{{ $t(`message.account.labelTip`) }}）</span></p>
          <st-row align="center" style="margin-top: 5px;">
            <p ref="address-ios">{{ paymentId }}</p>
            <a @click="copyKey2" v-if="paymentId">{{ $t(`message.account.copy`) }}</a>
          </st-row>
        </st-row>
      </div>
    </div>

    <div class="agree">
      <h3>{{ $t(`message.account.depositAgree`) }}</h3>
      <p>1、{{ $t(`message.account.depositAgree3`, { currency: `${this.$route.params.name}`, amount:
        `${this.getMin(this.$route.params.name)}` }) }}</p>
      <p>2、{{ $t(`message.account.depositAgree4`, { currency: `${this.$route.params.name}` }) }}</p>
      <p>3、{{ $t(`message.account.depositAgree1`, { currency: `${this.$route.params.name}`, amount:
        `${this.getCurrencyInfo(this.$route.params.name).receiveConfirmNum}` }) }}</p>
      <p>4、{{ $t(`message.account.depositAgree2`, { currency: `${this.$route.params.name}` }) }}</p>
      <p v-if="isGray">5、{{ $t(`message.account.depositAgree5`, { currency: `${this.$route.params.name}` }) }}</p>
    </div>
    <input type="text" id="copy-key-1" ref="copy-key-1" v-model="address"/>
    <input type="text" id="copy-key-2" ref="copy-key-2" v-model="paymentId"/>
    <input type="text" id="copy-key-3" ref="copy-key-3" v-model="mergeAddress"/>
  </st-content>
</template>

<script>
  import qrcode from 'qrcode'
  import Utils from '../../assets/js/utils'

  export default {
    name: 'deposit-address',
    props: {
      isGray: {
        type: Number
      }
    },
    data () {
      return {
        min: '',
        address: '',
        confirm: '',
        paymentId: '',
        mergeAddress: '', // 合并地址
        showOrHidden: false,
        addressType: 0, // 切换地址类型，默认0 为标准地址；为1时 是合并地址
        currencyInfo: {},
        isDeposit: 0
      }
    },
    computed: {
      currencyList () {
        return this.$store.state.dictionary.currencyList
      }
    },
    watch: {
      'addressType' (addressType) {
        if (addressType === 0) {
          qrcode.toCanvas(this.$refs.canvas, this.address, {width: 98, margin: 0}, function (error) {
            if (error) {
              console.error(error)
            }
          })
        } else {
          if (this.mergeAddress) {
            qrcode.toCanvas(this.$refs.canvas, this.mergeAddress, {width: 98, margin: 0}, function (error) {
              if (error) {
                console.error(error)
              }
            })
          }
        }
      },
      '$route'(route) {
        this.addressType = 0 // 切换标准地址
        this.address = ''
        this.getCoinAddress(route.params.name)
        this.getDataAll()
      }
    },
    methods: {
      // 获取币种详情
      getCurrencyInfo (name) {
        return Utils.getListInfo(this.currencyList, name, 'name')
      },
      // 获取最小充值额度
      getMin (name) {
        let min = this.getCurrencyInfo(name).minDeposit
        return min
      },
      // 获取充值地址
      getCoinAddress (currencyName) {
        let currencyInfo = this.currencyList.filter(item => {
          return item.name === currencyName
        })[0]
        if (currencyInfo.dailyAmount <= 0) return
        this.accountApi.getCoinAddress(currencyInfo.id)
          .then(res => {
            this.address = (res.data.addressList.length && res.data.addressList[0].address) || ''
            this.mergeAddress = (res.data.addressList.length && res.data.addressList[0].mergeAddress) || ''
            if (res.data.addressList.length && res.data.addressList[0].paymentId) {
              this.paymentId = res.data.addressList[0].paymentId
            }
            qrcode.toCanvas(this.$refs.canvas, this.address, {width: 98, margin: 0}, function (error) {
              if (error) {
                console.error(error)
              }
            })
          })
      },
      // 复制地址
      copyKey1 () {
        let key = this.$refs['copy-key-1'] // 要复制文字的节点
        key.select() // 选择对象
        document.execCommand('copy') // 执行浏览器复制命令
      },
      // 复制地址
      copyKey2 () {
        let key = this.$refs['copy-key-2'] // 要复制文字的节点
        key.select() // 选择对象
        document.execCommand('copy') // 执行浏览器复制命令
      },
      // 复制地址
      copyKey3 () {
        let key = this.$refs['copy-key-3'] // 要复制文字的节点
        key.select() // 选择对象
        document.execCommand('copy') // 执行浏览器复制命令
      },
      // 鼠标移入显示二维码
      showErCode () {
        this.showOrHidden = true
      },
      // 鼠标移出隐藏二维码
      hiddenErCode () {
        this.showOrHidden = false
      },
      // 点击切换合并地址
      checkAddress1 () {
        this.addressType = 1
      },
      // 点击切换标准地址
      checkAddress2 () {
        this.addressType = 0
      },
      // 获取币种详情
      getDataAll() {
        let currencyInfo = this.currencyList.filter(item => {
          return item.name === this.$route.params.name
        })[0]
        this.currencyInfo = currencyInfo
        this.isDeposit = Number(currencyInfo.type) % 2 === 1 ? 1 : 0
      }
    },
    mounted () {
      this.getDataAll()
      this.getCoinAddress(this.$route.params.name)
    },
    created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../assets/css/theme';

  .deposit-address {
    .address {
      position: relative;
      padding: 25px 94px 30px 0;
      border-bottom: 1px solid #f0f1f3;
      .content {
        /*padding-top: 20px;*/
        p {
          height: 24px;
          font-size: 14px;
        }
        .cz-address {
          max-width: 450px;
          display: inline-block;
          word-break: break-all;
          word-wrap: break-word;
          span {
            margin-left: 24px;
            display: inline-block;
            font-size: 14px;
            color: #ff7300;
          }
        }
        a {
          margin-left: 24px;
          font-size: 14px;
          color: #ff7300;
        }
        span {
          margin-top: 28px;
          font-size: 12px;
          color: #888;
        }
        .tipsUcc {
          margin-top: 20px;
          max-width: 540px;
          font-size: 12px;
          color: #888;
          a {
            font-size: 12px;
          }
        }
      }
      .er-code {
        position: absolute;
        top: 35px;
        right: -37px;
        /*display: none;*/
        width: 116px;
        height: 116px;
        border: 1px solid #eee;
        canvas {
          width: 98px;
          height: 98px;
        }
      }
    }
    .agree {
      padding: 18px 0 24px;
      h3 {
        line-height: 28px;
        font-size: 14px;
        color: @linkColor;
      }
      p {
        line-height: 24px;
        font-size: 12px;
      }
    }
    #copy-key-1 {
      position: absolute;
      left: 0;
      top: -10000px;
    }
    #copy-key-2 {
      position: absolute;
      left: 0;
      top: -10000px;
    }
    #copy-key-3 {
      position: absolute;
      left: 0;
      top: -10000px;
    }
  }
</style>
