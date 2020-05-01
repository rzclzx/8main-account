<template>
  <st-content class="withdraw-record" top="20px" paddingTop="20px" paddingBottom="30px">
    <st-row class="title" justify="between" align="center" slot="title" v-if="isPage">
      <h2 class="history">{{ $route.params.name }}{{ $t('message.account.withdrawRecord') }}</h2>
    </st-row>
    <st-row class="title" justify="between" align="center" slot="title" v-else>
      <h2>{{ $t('message.account.tenWithdrawRecord') }}</h2>
      <router-link :to="`/account/withdraw/detail/${$route.params.name}`">{{$t('message.account.little')}} >
      </router-link>
    </st-row>
    <table class="tb">
      <thead>
      <tr>
        <th>{{$t('message.accountdetail.operationTime')}}</th>
        <th style="width: 150px;text-align: left">{{$t('message.account.withdrawNumber')}}</th>
        <th>{{$t('message.account.actualAmount')}}</th>
        <th>{{$t('message.account.fee')}}</th>
        <th>{{$t('message.account.actualFee')}}</th>
        <!--<th>{{$t('message.account.actualAmount')}}</th>-->
        <th>{{$t('message.account.status')}}</th>
        <th>{{$t('message.account.action')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in tableData" :key="item.id">
        <td>{{item.createDate | timeFormat}}</td>
        <td v-if="item.detailAddress">
          <a :href="item.detailAddress" target="_blank" style="color: #597ab9;">{{item.targetAddress}}</a>
        </td>
        <td v-else>{{item.targetAddress}}</td>
        <td>{{item.amount}} <span style="color: #667AA0">{{ item.currency.name }}</span></td>
        <td>{{item.fee}}</td>
        <td>{{item.status === $dictionary.coinRecordStatus.WITHDRAW_SUCCESSED ? item.actualFee : '--'}}</td>
        <!--<td>{{item.status === $dictionary.coinRecordStatus.WITHDRAW_SUCCESSED ? minus(item.amount,item.actualFee) : '&#45;&#45;'}}</td>-->
        <td>{{$t(`message.status.withdraw${item.status}`)}}</td>
        <td>
          <div v-if="item.status === 3" style="display:inline-block;">
            <a @click="setSendEmail(item.id,index)" style="color: #F5A623">{{ $store.state.AccountDetail.sendEmainText[index] }}</a>
            <a @click="takeCoinCancel(item.id)"
               style="margin-left: 6px;color: #4B7DDC">{{$t('message.account.cancel')}}</a>
          </div>
          <a @click="takeCoinCancel(item.id)" v-if="item.status === 0" style="color: #4B7DDC">{{$t('message.account.cancel')}}</a>
          <a @click="takeMessage(item.comment)" v-if="item.status === -1" style="color: #F5A623">{{$t('message.account.failureMessage')}}</a>
          <a @click="details(item,index)" style="color:rgb(75, 125, 220)">{{ $t('message.accountdetail.xiangq') }}</a>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="tableData.length === 0&&page ===1" class="no-list">
      <img src="../../assets/images/account-nolist.png" alt=""/>
      <h6>{{$t('message.public.noList')}}</h6>
    </div>
    <st-page :page="page" v-else-if="(tableData.length && tableData.length >= 10) || page > 1" style="margin-top: 40px"
             :isDown="isDown"></st-page>
    <RecordDetailAlert v-if="isAlert"
                       :currencyName="$route.params.name"
                       :detail="datail"
                       :type='2'
                       :clickCancle="showAlert"
                       :sendEmailTime="sendEmailTime"
                       :callback="alertCallback">
    </RecordDetailAlert>
    <Alert
      popupWidth="500px"
      popupHeight="200px"
      v-if="confirmShow"
      :title="alertTitle"
      :type="alertType"
      :content="alertContent"
      :callback="confirmCallback"
      :determine="determine">
    </Alert>
  </st-content>
</template>

<script>
  import AccountApi from '../../assets/js/api/accountApi'
  import RecordDetailAlert from '../alert/record-detail-alert.vue'
  import Alert from '../alert/alert.vue'
  export default {
    name: 'withdraw-record',
    props: ['isPage'],
    components: {
      RecordDetailAlert,
      Alert
    },
    data() {
      return {
        // 提现记录
        getCurrencyId: 0,
        tableData: [],
        isDown: false,
        page: 1,
        isAlert: false,
        datail: {},
        alertTitle: "",
        alertContent: "",
        confirmShow: false,
        alertType: '',
        cancleId: '',
        confirmEmail: this.$t('message.accountdetail.sendEmail'),
        isSendEmails: [],
        setTimeS: [],
        sendEmainText: [],
        int: [],
        sendEmailTime: ''
      }
    },
    mounted() {
      this.$store.commit('SAVE_EMAIN_LANGUAGE', {language: this.$t('message.accountdetail.sendEmail')})
      this.getCurrencyId = (this.$store.state.dictionary.currencyList.filter(item => {
        return item.name === this.$route.params.name
      })[0] || {}).id
      this.getData()
    },
    watch: {
      '$route'(route) {
        this.getCurrencyId = (this.$store.state.dictionary.currencyList.filter(item => {
          return item.name === this.$route.params.name
        })[0] || {}).id
        this.getData()
      }
    },
    methods: {
      //  发送邮件
      emailText(arr,index){
        return arr[index]
      },
      // 关闭详情
      alertCallback () {
        this.isAlert = false
      },
      // 查看明细
      details(item, index) {
        this.cancleId = item.id
        this.isAlert = true
        this.datail = item
        this.$store.commit('SAVE_EMAIN_INDEX', { index: index })
      },
      // 关闭是否确认撤销
      confirmCallback () {
        this.confirmShow = false
      },
      // 在详情中撤销
      showAlert () {
        this.confirmShow = true
        this.alertTitle = this.$t('message.account.cancel')
        this.alertContent= this.$t('message.accountdetail.cancelTx')
        this.alertType = 'confirm'
      },
      // 撤销弹出框
      takeCoinCancel(id) {
        this.cancleId = id
        this.alertTitle = this.$t('message.account.cancel')
        this.alertContent= this.$t('message.accountdetail.cancelTx')
        this.alertType = 'confirm'
        this.confirmShow = true
      },
      // 撤销
      determine () {
        AccountApi.takeCoinCancel(this.cancleId)
          .then(res => {
            this.$toast(this.$dictionary.error('0002'))
            this.getData()
            this.confirmShow = false
            this.isAlert = false
          })
      },
      // 获取历史数据
      getData() {
        if (this.$store.state.AccountDetail && this.$store.state.AccountDetail.int && this.$store.state.AccountDetail.int.length > 0) {
          for (let i=0;i<this.$store.state.AccountDetail.int.length;i++){
            clearInterval(this.$store.state.AccountDetail.int[i])
          }
        }
        this.isSendEmails = []
        this.setTimeS = []
        this.sendEmainText = []
        this.$store.commit('SAVE_EMAIN_TIME', { isSendEmails: this.isSendEmails,sendEmainText: this.sendEmainText,setTimeS: this.setTimeS })
        if (this.$route.query.page) {
          this.page = this.$route.query.page
        } else {
          this.page = 1
        }
        AccountApi.takeCoinRecords(this.getCurrencyId, this.page)
          .then(res => {
            this.tableData = res.data.recordList || []
            for (let i=0;i<this.tableData.length;i++) {
              this.isSendEmails.push(true)
              this.setTimeS.push(60)
              this.sendEmainText.push(this.$t('message.accountdetail.sendEmail'))
              this.int.push('int'+i)
            }
            this.$store.commit('SAVE_EMAIN_TIME', { isSendEmails: this.isSendEmails,sendEmainText: this.sendEmainText,setTimeS: this.setTimeS,int:this.int})
            if (this.tableData.length === 10) {
              this.isDown = false
            } else {
              this.isDown = true
            }
          })
          .catch(er => {
            this.tableData = []
          })
      },
      // 邮件确认
      setSendEmail(id, index) {
        let that = this
        if (this.$store.state.AccountDetail.isSendEmails[index]) {
          this.$store.state.AccountDetail.isSendEmails[index] = false
          this.$store.state.AccountDetail.sendEmainText[index] = that.setTimeS[index] + 's'
          clearInterval(that.$store.state.AccountDetail.int[index])
          that.$store.state.AccountDetail.int[index] = setInterval(function () {
            that.$store.state.AccountDetail.setTimeS[index]--
            that.$store.state.AccountDetail.sendEmainText[index] = that.setTimeS[index] + 's'
            that.sendEmainText = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.sendEmainText))
            that.setTimeS = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.setTimeS))
            that.isSendEmails = JSON.parse(JSON.stringify(that.$store.state.AccountDetail.isSendEmails))

            that.$store.commit('SAVE_EMAIN_TIME', {
              isSendEmails: that.isSendEmails,
              sendEmainText: that.sendEmainText,
              setTimeS: that.setTimeS,
              int: that.$store.state.AccountDetail.int
            })
            if (that.setTimeS[index] === 0) {
              that.isSendEmails[index] = true
              that.setTimeS[index] = 60
              that.sendEmainText[index] = that.$t('message.accountdetail.sendEmail')
              that.sendEmainText = JSON.parse(JSON.stringify(that.sendEmainText))
              that.setTimeS = JSON.parse(JSON.stringify(that.setTimeS))
              that.isSendEmails = JSON.parse(JSON.stringify(that.isSendEmails))

              that.$store.commit('SAVE_EMAIN_TIME', {
                isSendEmails: that.isSendEmails,
                sendEmainText: that.sendEmainText,
                setTimeS: that.setTimeS,
                int: that.$store.state.AccountDetail.int
              })
              clearInterval(that.$store.state.AccountDetail.int[index])
            }
          }, 1000)
          AccountApi.takeCoinReConfirm(id)
          .then(res => {
            this.$toast(this.$dictionary.error('0004'))
          })
          .catch(er => {
          })
        }
      },
      minus(num1, num2) {
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
      },
      takeMessage(txt) {
        this.$toast(txt)
      }
    },
    destroyed () {
      if (this.$store.state.AccountDetail && this.$store.state.AccountDetail.int && this.$store.state.AccountDetail.int.length > 0) {
        for (let i=0;i<this.$store.state.AccountDetail.int.length;i++){
          clearInterval(this.$store.state.AccountDetail.int[i])
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../assets/css/accountTable';
  @import "../../assets/css/theme";

  .withdraw-record {
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
        width: 100px;
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
      td:nth-last-child(2) {
        color: #388d3c;
      }
    }
  }
</style>
