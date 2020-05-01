<template>
  <st-row class="withdraw-name container" justify="between">
    <account-slider :title="$t(`message.account.withdraw`)"></account-slider>
    <div class="main">
      <st-content class="info" :title="$t(`message.account.getWithdrawAddress`,{coin: $route.params.name})"
                  paddingTop="20px" paddingBottom="50px"
      >
        <!-- 提示信息 -->
        <div class="tips" v-if="Number(currencyInfo.type) % 2 === 1">
          <!--<div class="tips">-->
          {{ $t(`message.account.BTChint`, {currency: currencyInfo.name}) }}
        </div>
        <!-- 内外部地址 -->
        <st-row class="item" align="center">
          <p>{{ addressInfo ? $t(`message.account.withdrawAddress`): $t(`message.account.noAddressHave`) }}</p>
          <withdraw-address-info :addressInfo="addressInfo" @getAddress="getAddress"></withdraw-address-info>
        </st-row>
        <st-form v-if="trans" class="form" v-model="dataForm" :rules="rules" @submit="takeCoin">
          <st-form-item :label="$t('message.account.fee')" v-if="addressInfo && !(addressInfo.innerId > 0)">
            <div class="fee">
              <st-select v-model="dataForm.fee" :initText="feeData[0] && feeData[0].withdrawFee || '0'"
                         @onSelect="selectFee" paddingLeft="40px">
                <st-option v-for="item in feeData || []"
                           :key="item.id"
                           :label="item.withdrawFee"
                           :value="item.withdrawFee">

                </st-option>
              </st-select>
              <span class="currency">{{feeCurrencyName}}</span>
              <div class="create-item-feeMessage">
                <span>{{$t('message.account.takeMessage')}}</span>
                <div class="create-item-feeMessage-tit">
                  <h6>{{$t('message.account.takeMessage')}}</h6>
                  <span>{{$t('message.account.takeFeeMessageLength')}}</span>
                </div>
              </div>
            </div>
          </st-form-item>
          <!-- 输入提现数量 -->
          <st-form-item :label="$t('message.account.withdrawAmount')" ruleName="amount" limitName="float"
                        ref="clearRule" style="height: 80px;">
            <div class="max">
              <input type="password" id="password" autocomplete="new-password" :style="{position: 'absolute', top: '-9999px'}"/>
              <st-input
                type="text"
                v-model="dataForm.amount"
                :placeholder="$t('message.account.placeWithdrawNumber', {aount: `${currencyInfo.minWithdraw} ${$route.params.name}`})"
                :limits="$route.params.name === 'EOS' ? limits.float4 : limits.float"
              />
              <span class="currency">{{$route.params.name}}</span>
              <st-row align="center" class="create-item-tit" v-show="isAmount">
                <a @click="withdrawMax">{{$t('message.account.kt')+': '}}<span
                  style="color: #121400">{{ ktCurrency }}</span> {{$route.params.name}}</a>
                <template v-if="addressInfo">
                  <span v-if="addressInfo.innerId > 0">{{ $t('message.account.dayLimits') }}：<em style="color: #121400">{{ currencyInfo.dailyAmount }}</em> {{ $route.params.name }}</span>
                  <span v-else>{{ $t('message.account.dayLimits') }}：<em style="color: #121400">{{ currencyInfo.dailyAmount }}</em> {{ $route.params.name }}</span>
                </template>
              </st-row>
            </div>
          </st-form-item>
          <template v-if="addressInfo && !addressInfo.trust">
            <st-form-item
              :label="this.$t('message.account.moneyPW')"
              limitName="password"
              ruleName="password"
            >
              <st-input
                type="password"
                :maxLength="6"
                v-model="dataForm.password"
                :limits="limits.password"
                :placeholder="$t('message.account.placeMoneyPW')"
                autocomplete="new-password"
              />
            </st-form-item>
            <st-form-item
              class="short count-down-wrapper"
              :label="this.$t('message.users.SMSCode')"
              limitName="SMSCode"
              ruleName="SMSCode"
              v-if="userInfo.twiceMobileAuth"
            >
              <st-input
                type="number"
                :maxLength="6"
                v-model="dataForm.SMSCode"
                :limits="limits.SMSCode"
                :placeholder="$t('message.users.enterSMSCode')"
              />
              <count-down
                class="code"
                :ticketType="ticketType"
                :purpose='purpose'
                :ticket="ticket"
              />
            </st-form-item>
            <st-form-item
              :label="this.$t('message.users.googleCode')"
              limitName="googleCode"
              ruleName="googleCode"
              v-if="userInfo.twiceGoogleAuth"
            >
              <google-code v-model="dataForm.googleCode"/>
            </st-form-item>
          </template>
          <st-form-item style="min-height: 20px">
            <st-row align="center" class="create-item-tit">
              <span style="font-size: 12px;color: #667AA0">{{$t('message.account.sjdz')}}<em style="color: #121400">{{ dataForm.amount || 0 }}</em> {{$route.params.name}}</span>&nbsp;&nbsp;
              <span style="font-size: 12px;color: #667AA0" v-if="addressInfo && addressInfo.innerId > 0">{{ $t('message.account.noFee') }}</span>
            </st-row>
          </st-form-item>
          <input style="margin-left: 208px;" type="submit" :value="$t('message.account.withdraw')"/>
        </st-form>
      </st-content>
      <withdraw-record ref="record" class="list"></withdraw-record>
    </div>
  </st-row>
</template>

<script>
  import AccountSlider from '../../../components/account/account-slider'
  import StContent from '../../../components/account/account-content'
  import withdrawAddressInfo from '../../../components/account/withdraw-address-info'
  import withdrawRecord from '../../../components/account/withdraw-record'
  import {BigDecimal} from 'bigdecimal'
  export default {
    name: 'withdraw-name',
    components: {
      withdrawAddressInfo,
      withdrawRecord,
      AccountSlider,
      StContent
    },
    data() {
      return {
        trans: true,
        timer: null,
        feeData: [],
        addressInfo: {},
        littleMoney: '',
        theDayWithdrawMount: '',
        feeCurrencyName: '',
        currencyInfo: {},
        ktCurrency: 0,
        purpose: this.$dictionary.purpose.digitalTake,
        ticketType: this.$dictionary.ticketType.moneyTicket,
        dataForm: {
          password: '',
          amount: '',
          SMSCode: '',
          googleCode: '',
          fee: ''
        },
        isAmount: true,
        aount: '0.1',
        rules: {
          password: [
            {required: true, message: this.$t('message.errorMessage.fundPwd')},
            {
              validator: value => {
                if (!(/^\d{6}$/.test(value))) return false
                else {
                  return true
                }
              },
              message: this.$t('message.errorMessage.fundPwdSix')
            }
          ],
          amount: [
            {
              validator: value => {
                if (this.getCoinVerity(Number(value))) {
                  this.isAmount = false
                  return false
                } else {
                  return true
                }
              },
              message: this.$t('message.errorMessage.drawNumber')
            }
          ],
          SMSCode: this.$rules.SMSCode('moneyTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          password: [
            value => {
              return value.replace(/\D/g, '')
            }
          ],
          SMSCode: this.$limits.SMSCode(),
          float: this.$limits.float(),
          float4: this.$limits.float4()
        }
      }
    },
    watch: {
      'dataForm.amount'() {
        this.isAmount = true
      },
      theDayWithdrawMount() {
        this.kt()
      },
      '$route': {
        handler(newName, oldName) {
          this.dataForm.password = ''
          this.dataForm.amount = ''
          this.dataForm.SMSCode = ''
          this.dataForm.googleCode = ''
          this.dataForm.fee = ''
          this.getDataAll()
          this.trans = false
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.trans = true
          }, 200)
        },
        immediate: true
      },
      feeData() {
        this.selectFee()
        this.kt()
      },
      littleMoney() {
        this.selectFee()
        this.kt()
      },
      "addressInfo"() {
        this.selectFee()
        this.kt()
      }
    },
    computed: {
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      },
      userInfo() {
        return this.$store.state.manage.userInfo
      },
      currencyList() {
        return this.$store.state.dictionary.currencyList
      }
    },
    methods: {
      getStatus (urlStr) {
        let urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      // init && select fee
      selectFee(value) {
        this.dataForm.fee = value || (this.feeData[0] && this.feeData[0].withdrawFee)
      },
      getAddress() {
        this.accountApi.getCoinAddressList(this.currencyInfo.id)
          .then(res => {
            this.addressInfo = res.data.addressList[0]
          })
      },
      withdrawMax() {
//        this.dataForm.amount = this.littleMoney
        this.dataForm.amount = this.ktCurrency
      },
      // 提交提币请求
      takeCoin() {
        if (this.addressInfo.trust) {
          this.accountApi.takeCoin(this.currencyInfo.id, this.currencyInfo.feeCurrencyId, this.addressInfo.id, this.dataForm.amount, this.dataForm.fee)
            .then(() => {
              this.$refs.record.getData()
              this.getLittle()
              this.resetData()
              this.$toast(this.$dictionary.error('0001'))
            })
            .catch((error) => {
              this.getLittle()
              console.log(error)
            })
        } else {
          this.$store.dispatch('twiceVerify', {
            code: this.dataForm.SMSCode,
            ticket: this.ticket,
            purpose: this.purpose,
            ticketType: this.ticketType,
            googleCode: this.dataForm.googleCode
          })
            .then(res => {
              return this.$store.dispatch('getMoneyPwdTicket', {
                ticketType: this.ticketType,
                purpose: this.purpose,
                password: this.dataForm.password,
                ticket: res.data.ticket
              })
            })
            .then(res => {
              return this.accountApi.takeCoin(this.currencyInfo.id, this.currencyInfo.feeCurrencyId, this.addressInfo.id, this.dataForm.amount, this.dataForm.fee, res.data.ticket)
            })
            .then(() => {
              this.$refs.record.getData()
              this.getLittle()
              this.resetData()
              this.$store.commit('SAVE_TICKET', {
                type: this.ticketType,
                ticket: ''
              })
              this.$toast(this.$dictionary.error('0001'))
            })
            .catch(error => {
              this.getLittle()
              this.dataForm.SMSCode = ''
            })
        }
      },
      // 重置数据
      resetData() {
        this.dataForm.amount = ''
        this.dataForm.password = ''
        this.dataForm.SMSCode = ''
        this.dataForm.googleCode = ''
      },
      getCoinVerity(value) {
        if (!value) {
          this.rules.amount[0].message = this.$t('message.errorMessage.drawNumber')
        } else {
          let min = this.currencyInfo.minWithdraw
          let max = this.currencyInfo.dailyAmount
//          let isInner = this.addressInfo ? this.addressInfo.innerId > 0 ? 2 : 1 : 1
          let isInner = this.addressInfo ? this.addressInfo.innerId > 0 ? 1 : 1 : 1
          if (value > Number(this.littleMoney)) {
            this.rules.amount[0].message = this.$t('message.promptInformation.amountLimit')
          } else if (!(this.addressInfo && this.addressInfo.innerId > 0) && (value < min)) {
            this.rules.amount[0].message = this.currencyInfo.name + this.$t('message.promptInformation.singleLowest') + min
          } else if (value > max * isInner) {
            this.rules.amount[0].message = this.currencyInfo.name + this.$t('message.promptInformation.highestSingleDay') + (max * isInner)
          } else return ''
        }
        return !!this.rules.amount[0].message
      },
      // 获取最多提现金额
      getLittle() {
        this.accountApi.getAssetsMain(1)
          .then(res => {
            this.littleMoney = res.data.assets[this.currencyInfo.id].available
            this.theDayWithdrawMount = res.data.assets[this.currencyInfo.id].todayWithdrawAmount
          })
      },
      //
      kt() {
        // if (!this.addressInfo) {
        //   this.ktCurrency = (this.littleMoney || 0)
        //   return
        // }
        let littleMoney = new BigDecimal((this.littleMoney ? this.littleMoney : 0).toString())
        let fee = new BigDecimal((this.dataForm.fee ? this.dataForm.fee : 0).toString())
        let m = (this.addressInfo && this.addressInfo.innerId) ? this.littleMoney : littleMoney.subtract(fee).toString()
        // let m = this.littleMoney - this.dataForm.fee
        let total = 0
        let n
        if (m > 0) {
          let dailyAmount = new BigDecimal((this.currencyInfo.dailyAmount).toString())
          let theDayWithdrawMount = new BigDecimal((this.theDayWithdrawMount).toString())
          n = dailyAmount.subtract(theDayWithdrawMount).toString()
          total = Number(m) > Number(n) ? n : m
          total = total >= 0 ? total : 0
        }
        this.ktCurrency = total
      },
      getDataAll() {
        // 获取币种详情
        let currencyInfo = this.$store.state.dictionary.currencyList.filter(item => {
          return item.name === this.$route.params.name
        })[0]
        // 获取提现手续费币种详情
        let feeCurrencyInfo = this.$store.state.dictionary.currencyList.filter(item => {
          return item.id.toString() === currencyInfo.feeCurrencyId.toString()
        })[0]
        this.accountApi.getWithdrawFee(currencyInfo.feeCurrencyId)
          .then(res => {
            this.feeData = res.data && res.data.info
          })
          .catch(e => {
            console.log(e)
          })
        this.accountApi.getCoinAddressList(currencyInfo.id)
          .then(res => {
            let addressInfo = null
            if (this.$route.query.address) {
              addressInfo = res.data.addressList && res.data.addressList.filter(item => {
                return item.id.toString() === this.$route.query.address
              })[0]
              if (!addressInfo) error({statusCode: 404, message: 'Post not found'})
            } else {
              if (Number(currencyInfo.type) % 2 === 1) {
                let isActiveIndex = res.data && res.data.addressList && res.data.addressList.filter(item => {
                  if (Number(item.innerId) !== 0) {
                    return item
                  }
                })
                addressInfo = (isActiveIndex && isActiveIndex[0]) || null
              } else {
                addressInfo = (res.data && res.data.addressList && res.data.addressList[0]) || null
              }
              // addressInfo = (res.data.addressList && res.data.addressList[0]) || null
            }
            this.addressInfo = addressInfo
          })
          .catch(e => {
            console.log(e)
          })
        this.accountApi.getAssetsMain(1)
          .then(res => {
            this.littleMoney = res.data.assets[currencyInfo.id].available
            this.theDayWithdrawMount = res.data.assets[currencyInfo.id].todayWithdrawAmount
          })
          .catch(e => {
            console.log(e)
          })
        this.feeCurrencyName = feeCurrencyInfo.name
        this.currencyInfo = currencyInfo
      }
    },
    created() {
      this.getDataAll()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";
  .container {
    width: 1180px;
  }
  .withdraw-name {
    .form {
      .base-form();
      margin-left: 0;
      margin-top: 30px;
      .st-form-item {
        margin-left: 208px;
        margin-bottom: 0;
        input {
          border: 1px solid #ECF0F7;
          .placeholder({ color: #D4DAE5; font-size: 14px; font-weight: 300 });
        }
        &:nth-child(2) {
          margin-top: 10px;
        }
      }
    }
    .main .st-content {
      h2 {
        color: #24324C !important;
      }
    }
    .main .info {
      margin-bottom: 20px;
      padding: 0 0 50px;
      width: 870px;
      background-color: #fff;
      .item {
        margin-top: 20px;
        p {
          margin-right: 12px;
          padding-right: 4px;
          width: 196px;
          text-align: right;
          font-size: 14px;
        }
      }
    }
    .main .list {
      padding: 0 42px 30px;
      width: 871px;
      background-color: #fff;
    }
    .tips {
      width: 830px;
      height: 32px;
      margin: 0 auto;
      background: rgba(245, 166, 35, .1);
      text-align: center;
      line-height: 32px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #F5A623;
    }
    .fee {
      position: relative;
      width: 350px;
      height: 40px;
      .currency {
        position: absolute;
        left: 6px;
        top: 0;
        line-height: 40px;
        font-size: 12px;
        color: #667AA0;
      }
      em {
        position: absolute;
        bottom: -25px;
        left: 0;
        font-size: 12px;
        line-height: 24px;
        height: 24px;
        color: #888;
      }
    }
    .create-item-feeMessage {
      position: absolute;
      right: -0px;
      bottom: -24px;
      > span {
        font-size: 12px;
        color: #597ab9;
        cursor: pointer;
      }
      .create-item-feeMessage-tit {
        position: absolute;
        right: -312px;
        top: -32px;
        width: 300px;
        display: none;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        h6 {
          padding-left: 20px;
          height: 36px;
          line-height: 36px;
          font-weight: 400;
          color: #597ab9;
          border-bottom: 1px solid #e5e5e5;
        }
        span {
          display: block;
          padding: 10px;
          padding-left: 20px;
          margin: 0 auto;
          width: 298px;
          font-size: 12px;
          line-height: 22px;
          text-align: left;
          color: #888;
        }
        &:after {
          position: absolute;
          left: -6px;
          top: 44px;
          display: block;
          content: '';
          width: 8px;
          height: 8px;
          border-left: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          .transform(rotate(45deg));
          background-color: #fff;
        }
      }
      &:hover {
        .create-item-feeMessage-tit {
          display: block;
        }
      }
    }
    .max {
      position: relative;
      width: 350px;
      height: 40px;
      .st-input {
        padding-left: 42px !important;
      }
      .currency {
        position: absolute;
        left: 6px;
        top: 0;
        line-height: 40px;
        font-size: 12px;
        color: #a7b6ce;
      }
      .create-item-tit {
        /*position: absolute;*/
        /*right: 0;*/
        /*bottom: -22px;*/
        margin-top: 4px;
        text-align: right;
        a {
          font-size: 12px;
          color: #667AA0;
        }
        span {
          margin-left: 10px;
          font-size: 12px;
          color: #667AA0;
        }
      }
    }
  }
</style>
