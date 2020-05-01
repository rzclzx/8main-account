<template>
  <st-form v-model="formData" :rules="rules" @submit="transfer" class="transfer-window">
    <st-form-item ruleName="triggerSiteId" :label="$t(`message.account.from`)">
      <st-row style="width: 350px;">
        <st-select width="100%"
                   :initText="(type === 'main' && (mainSite[localeName] || mainSite.name)) || $t(`message.account.toSelect`)"
                   v-model="formData.triggerSiteId"
                   @onSelect="selectTriggerSiteId"
                   ref="trigger">
          <st-option v-for="item in supportSite[currencyId]"
                     :key="item.id"
                     :label="item[localeName] || item.name"
                     :value="item.id">

          </st-option>
        </st-select>
        <st-select width="100%"
                   :initText="$t(`message.account.toSelect`)"
                   v-model="formData.triggerComment"
                   @onSelect="selectTriggerComment"
                   ref="triggerComment"
                   style="margin-left: 12px;"
                   v-if="formData.triggerSiteId === labsAccountId">
          <st-option v-for="item in productList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">

          </st-option>
        </st-select>
      </st-row>
    </st-form-item>
    <st-form-item ruleName="targetSiteId" :label="$t(`message.account.to`)">
      <st-row style="width: 350px;">
        <st-select width="100%" v-model="formData.targetSiteId" @onSelect="selectTargetSiteId" ref="target"
                   :initText="$t(`message.account.toSelect`)">
          <st-option v-for="item in supportSite[currencyId]"
                     :key="item.id"
                     :label="item[localeName] || item.name"
                     :value="item.id">

          </st-option>
        </st-select>
        <st-select width="100%"
                   v-model="formData.targetComment"
                   @onSelect="selectTargetComment"
                   ref="targetComment"
                   :initText="$t(`message.account.toSelect`)"
                   style="margin-left: 12px;"
                   v-if="formData.targetSiteId === labsAccountId">
          <st-option v-for="item in productList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">

          </st-option>
        </st-select>
      </st-row>
    </st-form-item>
    <st-form-item ruleName="amount" limitName="float" :label="$t(`message.account.transferAmount`)" minHeight="76px"
                  :lineHeight="maxAmount && '12px'" :marginBottom="maxAmount && '9px'">
      <st-input
        type="text"
        v-model="formData.amount"
        :placeholder="$t('message.account.transferPlaceholder')"
        :limits="limits.float"
      >
      </st-input>
      <st-row class="tip" align="center" v-show="maxAmount">
        <p>{{ $t('message.account.transferMax') }} {{ maxAmount }} {{ currencyName }}</p>
        <a @click="transferAll">{{ $t('message.account.transferAll') }}</a>
      </st-row>
    </st-form-item>
    <input type="submit" :value="$t('message.account.transfer')"/>
    <p class="tip-2">{{ $t('message.account.transferTip') }}</p>
    <p class="tip-3" v-if="formData.triggerSiteId === 7">
      {{ $t('message.account.transferSwapTip') }}
    </p>
  </st-form>
</template>

<script>
  import {BigDecimal} from 'bigdecimal'

  export default {
    name: 'transfer-window',
    props: {
      currencyId: {
        required: true
      },
      currencyName: {
        required: true
      },
      type: {
        required: true
      },
      productId: {
        required: true
      },
      mainSite: {
        required: true
      },
      supportSite: {
        required: true
      }
    },
    data () {
      return {
        labsAccountId: this.$dictionary.labsAccountId,
        formData: {
          triggerSiteId: (this.type === 'main' && this.mainSite.id) || '',
          triggerComment: '',
          targetSiteId: '',
          targetComment: '',
          amount: ''
        },
        swapsAvailable: null, // 合约账户可转出的最大值
        positionStatus: false, // 合约是否有持仓
        swapsForce: 0,
        rules: {
          triggerSiteId: [
            {required: true, message: this.$t('message.errorMessage.turnOutAccount')},
            {
              validator: () => {
                return !(this.formData.triggerSiteId === this.labsAccountId && !this.formData.triggerComment)
              },
              message: this.$t('message.errorMessage.selectSecondAccount')
            },
            {
              validator: () => {
                return !(this.formData.triggerSiteId === this.formData.targetSiteId && this.formData.triggerSiteId !== this.labsAccountId)
              },
              message: this.$t('message.errorMessage.accountAddressDifferent')
            },
            {
              validator: () => {
                return !(this.formData.triggerSiteId === this.labsAccountId && this.formData.triggerComment === this.formData.targetComment && this.formData.triggerComment)
              },
              message: this.$t('message.errorMessage.accountAddressDifferent')
            }
          ],
          targetSiteId: [
            {required: true, message: this.$t('message.errorMessage.turnIntoAccount')},
            {
              validator: () => {
                return !(this.formData.targetSiteId === this.labsAccountId && !this.formData.targetComment)
              },
              message: this.$t('message.errorMessage.selectSecondAccount')
            },
            {
              validator: () => {
                return !(this.formData.triggerSiteId === this.formData.targetSiteId && this.formData.targetSiteId !== this.labsAccountId)
              },
              message: this.$t('message.errorMessage.accountAddressDifferent')
            },
            {
              validator: () => {
                return !(this.formData.triggerSiteId === this.formData.targetSiteId && this.formData.targetSiteId === this.labsAccountId && this.formData.triggerComment === this.formData.targetComment && this.formData.targetComment)
              },
              message: this.$t('message.errorMessage.accountAddressDifferent')
            }
          ],
          amount: [
            {required: true, message: this.$t('message.errorMessage.transferAmount')},
            {
              validator: () => {
                return this.maxAmount
              },
              message: this.$t('message.errorMessage.turnOutAccount')
            },
            {
              validator: value => {
                return !(Number(value) <= 0)
              },
              message: this.$t('message.errorMessage.amount1')
            },
            {
              validator: value => {
                return !(Number(value) > this.maxAmount)
              },
              message: this.$t('message.errorMessage.amount2')
            }
          ]
        },
        limits: {
          float: this.$limits.float()
        },
        maxAmount: null,
        transferStatus: true
      }
    },
    computed: {
      mainAssets () {
        return this.$store.state.account.mainAssets
      },
      detailAssets () {
        return this.$store.state.account.detailAssets
      },
      labsAssets () {
        return this.$store.state.account.labsAssets || []
      },
      // 站点名称key
      localeName () {
        if (/(zh)|(cn)/.test(this.$i18n.locale)) return 'name'
        else return `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
      },
      productList () {
        return this.$store.state.dictionary.productList.filter(item => (item.type & 2) === 2 && (item.baseCurrency === this.currencyId || item.quoteCurrency === this.currencyId))
      }
    },
    methods: {
      // 获取最多可转账金额
      getMaxAmount () {
        let maxAmount = 0
        if (this.formData.triggerSiteId === this.mainSite.id) {
          maxAmount = this.mainAssets[this.currencyId].available
        } else if (this.formData.triggerSiteId === this.labsAccountId) {
          if (this.formData.triggerComment) {
            let assets = this.labsAssets.find(item => item.productId === this.formData.triggerComment)
            if (assets && !assets.borrow.baseBorrow && !assets.borrow.quoteBorrow) {
              maxAmount = assets.assetsInfo[this.currencyName === assets.assetsInfo.baseName ? 'baseAvailable' : 'quoteAvailable']
            }
            maxAmount = (new BigDecimal(maxAmount.toString())).toPlainString()
          }
        } else {
          maxAmount = this.detailAssets[this.currencyId][this.formData.triggerSiteId].available
        }
        this.maxAmount = (new BigDecimal(maxAmount + '')).setScale(8, BigDecimal['ROUND_FLOOR']).toPlainString()
        if (this.formData.triggerSiteId === 7) {
          this.maxAmount = this.swapsAvailable
        }
      },
      selectTriggerSiteId (value) {
        value !== this.labsAccountId && (this.formData.triggerComment = '')
        this.formData.triggerSiteId = value
        if (this.formData.targetSiteId && !(this.formData.targetSiteId === value && value === this.labsAccountId && this.formData.triggerComment === this.formData.targetComment)) {
          this.$refs['target'].toggle(false)
        }
        if (value === 7) {
          this.accountApi.swapsAvailable(this.currencyId)
            .then(res => {
              if (res.data) {
                this.swapsAvailable = res.data.swapsAvailable
                this.positionStatus = res.data.positionStatus
                this.getMaxAmount()
              }
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          this.getMaxAmount()
        }
      },
      selectTriggerComment (value) {
        this.formData.triggerComment = value
        if (this.formData.targetComment && this.formData.targetComment !== value) {
          this.$refs['targetComment'].toggle(false)
        }
        this.getMaxAmount()
      },
      selectTargetSiteId (value) {
        value !== this.labsAccountId && (this.formData.targetComment = '')
        this.formData.targetSiteId = value
        if (this.formData.triggerSiteId && this.formData.triggerSiteId !== value) {
          this.$refs['trigger'].toggle(false)
        }
      },
      selectTargetComment (value) {
        this.formData.targetComment = value
        if (this.formData.triggerComment && this.formData.triggerComment !== value) {
          this.$refs['triggerComment'].toggle(false)
        }
      },
      transferAll () {
        this.formData.amount = this.maxAmount
      },
      // 转账请求
      transfer () {
        if (this.transferStatus) {
          this.transferStatus = false
          if (this.formData.triggerSiteId === 7) {
            this.swapsForce = 1
          }
          this.accountApi.transfer(this.currencyId, this.formData.triggerSiteId, this.formData.targetSiteId, this.formData.amount, this.formData.triggerComment, this.formData.targetComment, this.swapsForce)
            .then(() => {
              this.$toast(this.$t(`message.account.transferSuccess`))
              setTimeout(() => {
                this.$store.dispatch('getAssetsMain')
                this.$store.dispatch('getAssetsDetail')
                this.$store.dispatch('getAssetsLabs')
              }, 3000)
              this.$emit('callback')
            })
            .catch((e) => {
              this.$toast(this.$dictionary.error(e.data.code))
              this.transferStatus = true
              if (e.data.code === 610) {
                this.$emit('callback')
              }
            })
        }
      }
    },
    mounted () {
      this.type === 'main' && this.getMaxAmount()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .transfer-window {
    padding: 60px 0 94px 210px;
    .tip {
      height: 28px;
      p {
        font-size: 12px;
        color: #b8b8b8;
      }
      a {
        margin-left: 12px;
        font-size: 12px;
        color: @linkColor;
      }
    }
    .tip-2 {
      line-height: 36px;
      font-size: 12px;
      color: #b8b8b8;
    }
    .tip-3 {
      width: 350px;
      font-size: 12px;
      color: #F5A623;
    }
  }
</style>
