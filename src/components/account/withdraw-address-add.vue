<template>
  <st-form class="form" v-model="dataForm" :rules="rules" @submit="addAddress">
    <st-form-item
      :label="$t('message.account.setAddressNote')"
      ruleName="tag"
    >
      <st-input
        type="text"
        :maxLength="18"
        v-model="dataForm.tag"
        :autofocus="true"
      />
    </st-form-item>
    <st-form-item
      :label="$t('message.account.selectAddress')"
    >
      <st-select @getSelectData="getSelectData" :defaultString="selParams[0].name" :countryData="selParams"></st-select>
    </st-form-item>
    <st-form-item
      :label="selValue !==1 ? ($route.params.name+$t('message.account.address')): $t('message.account.numberPhone')"
      ruleName="address"
    >
      <st-input
        ref="address"
        type="text"
        :maxLength="($route.params.name === 'XRP' || $route.params.name === 'XMC') ? 106 : selValue ? 14 : 50"
        v-model="dataForm.address"
      />
    </st-form-item>
    <st-form-item
      v-if="isGray === 1 && selValue !==1"
      :label="$route.params.name + $t('message.account.addressLabel')"
      style="position: relative;margin-bottom: 20px"
    >
      <st-input
        type="text"
        v-model="dataForm.paymentId"
      />
      <st-row align="center" class="create-item-tit">
        <span>{{ $t('message.account.tips') }}</span>
      </st-row>
    </st-form-item>
    <st-form-item
      :label="$t('message.account.trustAddress')"
    >
      <st-row class="trust" align="center">
        <st-switch :status="toggleTrust" @callback="toggleTrustFn"></st-switch>
        <p>{{ $t('message.account.trustMessage') }}</p>
      </st-row>
    </st-form-item>
    <template v-if="toggleTrust">
      <st-form-item :label="$t('message.account.moneyPW')"
                    limitName="password"
                    ruleName="password"
      >
        <st-input type="password"
                  :maxLength="6"
                  v-model="dataForm.password"
                  :limits="limits.password"
                  :placeholder="$t('message.account.placeMoneyPW')"
        />
      </st-form-item>
      <st-form-item class="short count-down-wrapper"
                    :label="this.$t('message.users.SMSCode')"
                    limitName="SMSCode"
                    ruleName="SMSCode"
                    v-if="userInfo.twiceMobileAuth"
      >
        <st-input type="number"
                  :maxLength="6"
                  v-model="dataForm.SMSCode"
                  :limits="limits.SMSCode"
                  :placeholder="$t('message.users.enterSMSCode')"
        />
        <count-down class="code"
                    :ticketType="ticketType"
                    :purpose='purpose'
                    :ticket="ticket"
        />
      </st-form-item>
      <st-form-item :label="$t('message.users.googleCode')"
                    limitName="googleCode"
                    ruleName="googleCode"
                    v-if="userInfo.twiceGoogleAuth"
      >
        <google-code v-model="dataForm.googleCode"/>
      </st-form-item>
    </template>
    <input :style="!buttonStatus ? 'margin-left: 200px;backgroundColor: #999;cursor: text;' : 'margin-left: 200px;'"
           type="submit" :value="$t('message.account.add')"/>
  </st-form>
</template>

<script>
  import checkMsg from '../../assets/js/errorMessage'
  import StSelect from '../common/st-select'
  import AccountApi from '../../assets/js/api/accountApi'

  export default {
    name: 'withdraw-address-add',
    components: {
      StSelect
    },
    data() {
      return {
        isGray: 0,
        // 验证类型
        purpose: this.$dictionary.purpose.currencyAddress,
        // 是否需要信任验证
        toggleTrust: false,
        // 防连点
        buttonStatus: true,
        // 验证地址类型
        selParams: [],
        // 选中地址类型
        selValue: 1,
        ticketType: this.$dictionary.ticketType.coinTicket,
        coinInfo: {},
        dataForm: {
          password: '',
          SMSCode: '',
          googleCode: '',
          tag: '',
          address: '',
          paymentId: ''
        },
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
          tag: [
            {required: true, message: this.$t('message.errorMessage.addressNote')},
            {
              validator: value => {
                return true
              },
              message: this.$t('message.errorMessage.addressLabel')
            }
          ],
          address: [
            {required: true, message: this.$t('message.errorMessage.address')},
            {
              validator: value => {
                if (this.addressErrorFn(value)) return false
                else {
                  return true
                }
              },
              message: this.$t('message.errorMessage.address')
            }
          ],
          paymentId: [
            {required: true, message: this.$t('message.errorMessage.addressLabel')},
            {
              validator: value => {
                return true
              },
              message: this.$t('message.errorMessage.addressLabel')
            }
          ],
          SMSCode: this.$rules.SMSCode('coinTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          password: [
            value => {
              return value.replace(/\D/g, '')
            }
          ],
          SMSCode: this.$limits.SMSCode()
        }
      }
    },
    created() {
      this.selParams = [
        {
          name: this.$t(`message.account.accountAddress`),
          value: 1
        },
        {
          name: this.$t(`message.account.external`) + this.$route.params.name + this.$t(`message.account.externalAddress`),
          value: 0
        }
      ]
      this.getCoinInfo()
      this.isGray = (this.currencyList.filter(item => {
        return item.name === this.$route.params.name
      })[0].type >> 1) % 2
    },
    computed: {
      currencyList() {
        return this.$store.state.dictionary.currencyList
      },
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      },
      userInfo() {
        return this.$store.state.manage.userInfo
      }
    },
    methods: {
      // 关闭弹窗
      create() {
        this.$emit('close', true)
      },
      getSelectData(obj) {
        this.selValue = obj.value
        this.$refs.address.toggle(this.dataForm.address)
      },
      // 信任地址切换
      toggleTrustFn() {
        this.toggleTrust = !this.toggleTrust
      },
      // 添加地址
      addAddress() {
        if (this.buttonStatus) {
          this.buttonStatus = false
        } else {
          return false
        }
        if (this.toggleTrust) {
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
              return AccountApi.getCoinAddAddress(this.coinInfo.id, this.selValue, this.dataForm.address, this.dataForm.tag, Number(this.toggleTrust), this.dataForm.paymentId, res.data.ticket)
            })
            .then(res => {
              this.buttonStatus = true
              this.create()
              this.$store.commit('SAVE_TICKET', {
                type: this.ticketType,
                ticket: ''
              })
              this.$toast(this.$dictionary.error('701'))
            })
            .catch(er => {
              this.dataForm.SMSCode = ''
              this.buttonStatus = true
            })
        } else {
          AccountApi.getCoinAddAddress(this.coinInfo.id, this.selValue, this.dataForm.address, this.dataForm.tag, Number(this.toggleTrust), this.dataForm.paymentId)
            .then(res => {
              this.create()
              this.buttonStatus = true
              this.$store.commit('SAVE_TICKET', {
                type: this.ticketType,
                ticket: ''
              })
            })
            .catch(er => {
              this.buttonStatus = true
            })
        }
      },
      addressErrorFn(value) {
        if (this.selValue) {
          this.rules.address[1].message = checkMsg.otherMobile(value, this)
        } else {
          this.rules.address[1].message = value ? '' : this.$t('message.errorMessage.address')
        }
        return !!this.rules.address[1].message
      },
      getCoinInfo() {
        this.coinInfo = this.$store.state.dictionary.currencyList.filter(item => {
          return item.name === this.$route.params.name
        })[0]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .form {
    .base-form();
    margin-left: 0;
    .st-form-item {
      margin-bottom: 0;
      margin-left: 200px;
      .create-item-tit {
        position: absolute;
        right: 161px;
        bottom: 2px;
        text-align: right;
        span {
          margin-left: 10px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .trust {
    p {
      margin-left: 16px;
      width: 300px;
      font-size: 12px;
    }
  }
</style>
