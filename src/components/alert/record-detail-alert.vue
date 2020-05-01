<template>
  <div class="record-alert">
    <div class="alert-box">
      <div class="alert-box-header">
        {{currencyName}} {{ title }}
        <span @click="callback">+</span>
      </div>
      <!-- 充值明细 -->
      <div v-if="type===1" class="alert-box-content">
        <div>
          <span>{{$t('message.accountdetail.rechargeNum')}}：</span>
          <span>{{ detail.amount }} {{currencyName}}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.actualAccount')}}：</span>
          <span>{{ detail.amount }} {{currencyName}}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.operationTime')}}：</span>
          <span>{{ detail.createdDate | timeFormat }}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.operationMode')}}：</span>
          <span>{{ detail.depositCoinType === 1 ? $t('message.accountdetail.internalAddressRecharge'): $t('message.accountdetail.externalAddressRecharge')}}</span>
          <!-- <span>{{ depositCoinType[detail.depositCoinType] }}</span> -->
        </div>
        <div>
          <span>{{$t('message.accountdetail.orderNumber')}}：</span>
          <span>{{detail.id}}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.blockChainTrading')}}：</span>
          <span>{{ detail.txid }}</span>
        </div>
        <div  v-if="detail.addressTag">
          <span>{{$t('message.accountdetail.label')}}：</span>
          <span>{{ detail.addressTag }}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.rechargeAddress')}}：</span>
          <span>{{ detail.address }}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.status')}}：</span>
          <span :class="'success'">{{ detail.status && $dictionary.depositStatus[detail.status] }}</span>
        </div>
      </div>
      <div v-if="type===1" class="alert-box-footer">
        <button class="foot-button2" @click="callback">{{$t('message.accountdetail.know')}}</button>
      </div>
      <!-- 提现明细 -->
      <div v-else-if="type === 2" class="alert-box-content">
        <div>
          <span>{{$t('message.accountdetail.presentQuantity')}}：</span>
          <span>{{detail.amount}} {{detail.currency.name}}</span>
        </div>
        <div v-if="detail.status===1">
          <span>{{$t('message.accountdetail.actualAccount')}}：</span>
          <span>{{detail.amount}} {{detail.currency.name}}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.poundage')}}：</span>
          <span>{{detail.fee}} {{detail.feeCurrency.name}}</span>
        </div>
        <div v-if="detail.status===1">
          <span>{{$t('message.accountdetail.actualHandlingFee')}}：</span>
          <span>{{detail.status === $dictionary.coinRecordStatus.WITHDRAW_SUCCESSED ? detail.actualFee : '--'}} {{detail.feeCurrency.name}}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.operationTime')}}：</span>
          <span>{{ detail.createDate | timeFormat }}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.operationMode')}}：</span>
          <span>{{ detail.withdrawCoinType === 1 ? $t('message.accountdetail.internalAddressRaising'):$t('message.accountdetail.externalAddressExtraction')}}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.orderNumber')}}：</span>
          <span>{{ detail.id }}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.blockChainTrading')}}：</span>
          <span>{{ detail.txid ? detail.txid :'--' }}</span>
        </div>
        <div v-if="detail.addressTag">
          <span>{{$t('message.accountdetail.label')}}：</span>
          <span>{{ detail.addressTag }}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.presentAddress')}}：</span>
          <span>{{detail.targetAddress}}</span>
        </div>
        <div>
          <span>{{$t('message.accountdetail.status')}}：</span>
          <span :class="{success:detail.status===1,wait:detail.status===3,cancelcol:detail.status === -1}">{{$t(`message.status.withdraw${detail.status}`)}}</span>
        </div>
        <div v-if="detail.status === -1">
          <span>{{$t('message.account.failureMessage')}}：</span>
          <span>{{detail.comment}}</span>
        </div>
      </div>
      <div v-if="type===2" class="alert-box-footer">
        <div  v-if="detail.status === 3">
          <button class="foot-button1" v-if="detail.status === 3" @click="clickCancle(detail.id)" style="margin-right: 6px;">{{$t('message.account.cancel')}}</button>
          <button class="foot-button2" :disabled="!$store.state.AccountDetail.isSendEmails[index]" :class="{dasabled:!$store.state.AccountDetail.isSendEmails[index]}" v-if="detail.status === 3" @click="setSendEmail(detail.id)" style="margin-right: 6px;">{{ $store.state.AccountDetail.sendEmainText[index] }}</button>
        </div>
        <button class="foot-button2" @click="clickCancle(detail.id)" v-else-if="detail.status === 0" style="margin-right: 6px;">{{$t('message.account.cancel')}}</button>
        <button class="foot-button2" v-else @click="callback">{{$t('message.accountdetail.know')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import AccountApi from '../../assets/js/api/accountApi'
  export default {
    props: {
      detail: {
        type: Object,
        default: {}
      },
      callback: {
        type: Function,
        required: true
      },
      currencyName: String,
      type: Number,
      clickCancle: {
        type:Function
      }
    },
    data () {
      return {
        emailDisabled: false,
        confirmEmail: this.$t('message.accountdetail.sendEmail'),
        title: '',
        index: this.$store.state.AccountDetail.index,
        depositCoinType: {
          0: this.$t('message.accountdetail.blockChainRecharge'),
          1: this.$t('message.accountdetail.stationRecharge'),
          2: this.$t('message.accountdetail.forkMoneyRecharge'),
          3: this.$t('message.accountdetail.collectionFee')
        }
      }
    },
    created () {
      // console.log(this.detail)
      if (this.type === 1) {
        this.title = this.$t('message.header.deposit')
      } else {
        this.title = this.$t('message.header.withdraw')
      }
    },
    methods: {
      // 邮件确认
      setSendEmail(id) {
        let that = this
        if (this.$store.state.AccountDetail.isSendEmails[this.index]){
          this.$store.state.AccountDetail.isSendEmails[this.index] = !this.$store.state.AccountDetail.isSendEmails[this.index]
          this.$store.state.AccountDetail.sendEmainText[that.index] = that.$store.state.AccountDetail.setTimeS[that.index] + 's'
          that.$store.state.AccountDetail.int[this.index] = setInterval(function(){
            that.$store.state.AccountDetail.setTimeS[that.index]--
            that.$store.state.AccountDetail.sendEmainText[that.index] = that.$store.state.AccountDetail.setTimeS[that.index]+'s'
            let sendEmainText = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.sendEmainText))
            let setTimeS = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.setTimeS))
            let isSendEmails = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.isSendEmails))
            that.$store.commit('SAVE_EMAIN_TIME', { isSendEmails: isSendEmails,sendEmainText: sendEmainText,setTimeS: setTimeS,int: that.$store.state.AccountDetail.int })
            if (that.$store.state.AccountDetail.setTimeS[that.index] === 0 ){
              that.$store.state.AccountDetail.isSendEmails[that.index] = !that.$store.state.AccountDetail.isSendEmails[that.index]
              that.$store.state.AccountDetail.setTimeS[that.index] = 60
              that.$store.state.AccountDetail.sendEmainText[that.index] = that.$store.state.AccountDetail.language
              let sendEmainText = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.sendEmainText))
              let setTimeS = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.setTimeS))
              let isSendEmails = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.isSendEmails))
              that.$store.commit('SAVE_EMAIN_TIME', { isSendEmails: isSendEmails,sendEmainText: sendEmainText,setTimeS: setTimeS,int: that.$store.state.AccountDetail.int})
              clearInterval(that.$store.state.AccountDetail.int[that.index])
            }
          },1000)
          AccountApi.takeCoinReConfirm(id)
            .then(res => {
              this.$toast(this.$dictionary.error('0004'))
            })
            .catch(er => {
            })
        }
      },
      // 撤销
      takeCoinCancel(id) {
        AccountApi.takeCoinCancel(id)
          .then(res => {
            this.$toast(this.$dictionary.error('0002'))
            this.getData()
          })
      },
      minus (num1, num2) {
        let r1, r2, m, n
        try {
          r1 = num1.toString().split('.')[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = num2.toString().split('.')[1].length
        } catch (e) {
          r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        n = (r1 >= r2) ? r1 : r2
        return ((num1 * m - num2 * m) / m).toFixed(n)
      }
    }
  }
</script>

<style lang='less' scoped>
.record-alert{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  left:0;
  top:0;
  z-index: 101;
  font-family: PingFangSC-Regular;
  .alert-box{
    width: 500px;
    background: #fff;
    opacity: 1;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    border-radius: 3px;
    overflow: hidden;
    .alert-box-header{
      height: 48px;
      line-height: 48px;
      box-shadow: 0 0 10px 0 rgba(89,122,185,0.10);
      padding: 0 10px;
      font-size: 14px;
      color: #24324C;
      span{
        color: #D4DAE5;
        float: right;
        width: 16px;
        height: 16px;
        display: inline-block;
        text-align: center;
        line-height: 16px; 
        margin-top:16px;
        transform: rotate(45deg);
        font-size: 20px;
        font-weight: 800;
      }
      span:hover{
        cursor: pointer;
      }
    }
    .alert-box-content{
      padding: 20px 80px;
      div{
        width: 340px;
        font-size: 12px;
        line-height: 14px;
        vertical-align: top;
        margin-bottom: 8px;
        &:nth-last-child(1){
          margin-bottom: 0;
        }
        span{
          // display: inline-block;
          display: table-cell;
          line-height: 14px;
        }
        span:nth-child(1){
          display: table-cell;
          white-space:nowrap;
          color: #667AA0;
          letter-spacing: 0;
          // width: 60px;
        }
        span:nth-child(2){
          color:#24324C;
          word-wrap:break-word; word-break:normal;
          word-break:break-all !important; /* 支持IE和chrome，FF不支持*/
          word-wrap:break-word !important; /* 以上三个浏览器均支持 */          
        }
        .success{
          color: #32B28F !important;
        }
        .wait{
          color: #F5A623 !important;
        }
        .cancelcol{
          color: #e6491a !important;
        }
      }
    }
    .alert-box-footer{
      height: 72px;
      background: #F5F6FA;
      text-align: center;
      width: 100%;
      button{
        // width: 96px;
        height: 40px;
        line-height: 40px;
        border-radius: 3px; 
        padding: 0 20px;
        border: none;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        letter-spacing: 0;
        margin-top: 16px;
        &:hover{
          cursor: pointer;
        }
      }
      .foot-button1{
        background: #fff;
        color: #4B7DDC;
        border: 1px solid #597AB9;
      }
      .foot-button1:hover{
        background: #597AB9;
        color: #fff;
      }
      .foot-button2{
        background: #597AB9;
        color: #fff;
      }
      .foot-button2:hover{
        background: #4B6AA5;
      }
      .dasabled:hover{
        cursor: not-allowed;
      }
    }
  }
}
</style>