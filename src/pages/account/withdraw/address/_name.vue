<template>
  <div class="withdraw-address-name container">
    <account-bread :list="breadList"></account-bread>
    <st-content class="addressManagement" style="padding: 0;" :title="this.$t('message.account.addressManagement')">
      <div class="list" style="padding: 0 25px 0;">
        <st-row class="site" align="center" wrap="wrap">
          <template v-for="(item, index) in list" v-if="list && list.length > 0">
            <st-row class="address have"
                    :class="isGray === 0 ? ((item.id === isActive) ? 'active' : '') : ((Number(item.innerId) !== 0) ? (item.id === isActive) ? 'active' : '' : 'gray')"
                    direction="column" @callback="changeAddress(item)" :key="item.id">
              <div class="have-bg"></div>
              <!-- 内部地址/外部地址 -->
              <st-row class="site-top">
                <div class="left-picture" :class="item.innerId > 0 ? 'in-left-picture' : ''"></div>
                <div class="content" :class="item.innerId > 0 ? 'in-content' : ''">
                  <p class="address1">{{ item.innerId > 0 ? $t(`message.account.withinAddress`) :
                    $t(`message.account.outsideAddress`) }}</p>
                </div>
                <div class="right-picture" :class="item.innerId > 0 ? 'in-right-picture' : ''"></div>
              </st-row>

              <st-row align="center" class="have-z">
                <h4 :class="isGray === 1 && Number(item.innerId) === 0 ? 'gray' : ''">{{item.tag}}</h4>
                <st-row class="certification" v-if="item.trust&&!item.status">
                  <div class="left-picture"></div>
                  <span :class="isGray === 1 && Number(item.innerId) === 0 ? 'sp-trust gray' : 'sp-trust'">
                    {{$t(`message.account.noTrust`)}}
                  </span>
                </st-row>
                <st-row class="certified" v-else-if="item.trust && item.status">
                  <div class="left-picture"></div>
                  <span :class="isGray === 1 && Number(item.innerId) === 0 ? 'sp-trusting gray' : 'sp-trusting'"
                  >{{$t(`message.account.trust`)}}</span>
                </st-row>

                <!-- 发送邮件认证 -->
                <!--<a class="a-email" v-if="item.trust&&!item.status" @click="setSendEmail(item.id, index)">{{$t(`message.account.sendResoveEmail`)}}</a>-->
                <a class="a-email" v-if="item.trust&&!item.status" @click="setSendEmail(item.id, index)">{{
                  $store.state.AccountDetail.sendEmainText[index] }}</a>
                <!-- 删除 -->
                <a class="del" @click="deleteAddress(item.id)"></a>
              </st-row>
              <!-- 提现地址 -->
              <div class="site-bottom">
                <p :class="isGray === 1 && Number(item.innerId) === 0 ? 'gray' : ''">{{item.address}}</p>
              </div>
              <!-- 标签 -->
              <st-row class="label" v-if="item.paymentId">
                <p> {{ $t(`message.account.label`) }} ：</p>
                <p>{{ item.paymentId }}</p>
              </st-row>
            </st-row>
          </template>
          <a @click="show=true">
            <st-row class="address empty" justify="center" align="center" v-if="list.length < 5">
              <div></div>
              <p>{{ $t(`message.account.addNewsAddress`) }}</p>
            </st-row>
          </a>
          <popup :title="$t(`message.account.addNewsAddress`)" :callback="close" v-if="show">
            <withdraw-address-add @close="close"></withdraw-address-add>
          </popup>
        </st-row>
        <div class="divider"></div>
        <form class="form">
          <st-row justify="center">
            <st-form-item>
              <!--<router-link :to="`/account/withdraw/${$route.params.name}?address=${isActive}`">-->
              <a class="button" @click="affirm">{{ $t('message.users.confirm') }}</a>
              <!--</router-link>-->
            </st-form-item>
          </st-row>
        </form>
      </div>
    </st-content>
  </div>
</template>

<script>
  import AccountBread from '../../../../components/account/account-bread'
  import Popup from '../../../../components/common/popup'
  import StContent from '../../../../components/account/account-content'
  import withdrawAddressAdd from '../../../../components/account/withdraw-address-add'
  import AccountApi from '../../../../assets/js/api/accountApi'

  export default {
    name: 'withdraw-address-name',
    components: {
      AccountBread,
      Popup,
      withdrawAddressAdd,
      StContent
    },
    data() {
      return {
        breadList: [
          {
            name: this.$route.params.name + ' ' + this.$t(`message.account.withdraw`),
            link: `/account/withdraw/${this.$route.params.name}`
          },
          {
            name: this.$t('message.account.addressManagement')
          }
        ],
        show: false,
        coinInfo: {},
        list: [],
        isGray: 0,
        isActive: '',
        isItem: {},
        addressInfo: {},
        currencyInfo: {},
        confirmEmail: this.$t('message.accountdetail.sendEmail'),
        isSendEmails: [],
        setTimeS: [],
        sendEmainText: [],
        int: [],
        sendEmailTime: ''
      }
    },
    mounted() {
      this.getCoinInfo()
      this.$store.commit('SAVE_EMAIN_LANGUAGE', {language: this.$t('message.account.sendResoveEmail')})
      this.getData()
    },
    watch: {
      list () {
        if (this.list && this.list.length) {
          this.changeAddress(this.list && this.list.length && this.list[0])
        } else {
          this.isActive = ''
          this.isItem = {}
        }
      }
    },
    methods: {
      close(bl) {
        this.show = false
        bl && this.getList()
        this.getData()
        this.getDataAll()
      },
      // 获取地址列表
      getList() {
        return AccountApi.getCoinAddressList(this.coinInfo.id)
          .then(res => {
            this.list = res.data.addressList || []
            return res
          })
      },
      // 删除地址
      deleteAddress(addressId) {
        AccountApi.getCoinDeleteAddress(this.coinInfo.id, addressId)
          .then(() => {
            return this.getList()
          })
          .then(res => {
            this.isActive = (res.data.addressList && res.data.addressList[0].id) || ''
          })
          .catch(er => {
          })
      },
      // 选中的地址改变
      changeAddress(item) {
        // 如果当前点击的是外部地址则不切换（innerId 为非零的时候是内部地址，为0的时候是外部地址）
        if (this.isGray === 1 && !item.innerId) {
          return false
        }
        this.isActive = item.id
        this.isItem = item
      },
      // 发送邮件
      sendResoveEmail(id) {
        AccountApi.getCoinResendConfirmAddress(id)
          .then(res => {
            this.$toast(this.$dictionary.error('0004'))
          })
          .catch(er => {
            console.log(er)
          })
      },
      getCoinInfo() {
        this.coinInfo = this.$store.state.dictionary.currencyList.filter(item => {
          return item.name === this.$route.params.name
        })[0]
      },
      getDataAll() {
        // 获取币种详情
        let currencyInfo = this.$store.state.dictionary.currencyList.filter(item => {
          return item.name === this.$route.params.name
        })[0]
        this.accountApi.getCoinAddressList(currencyInfo.id)
          .then(res => {
            let addressInfo = null
            // if (!res.data) return false
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
        this.currencyInfo = currencyInfo
      },
      // 获取地址列表关于倒计时
      getData() {
        if (this.$store.state.AccountDetail && this.$store.state.AccountDetail.int && this.$store.state.AccountDetail.int.length > 0) {
          for (let i = 0; i < this.$store.state.AccountDetail.int.length; i++) {
            clearInterval(this.$store.state.AccountDetail.int[i])
          }
        }
        this.isSendEmails = []
        this.setTimeS = []
        this.sendEmainText = []
        this.$store.commit('SAVE_EMAIN_TIME', {
          isSendEmails: this.isSendEmails,
          sendEmainText: this.sendEmainText,
          setTimeS: this.setTimeS
        })
        AccountApi.getCoinAddressList(this.coinInfo.id)
          .then(res => {
            // this.tableData = res.data.recordList || []
            this.list = res.data.addressList || []
            for (let i = 0; i < this.list.length; i++) {
              this.isSendEmails.push(true)
              this.setTimeS.push(60)
              this.sendEmainText.push(this.$t('message.account.sendResoveEmail'))
              this.int.push('int' + i)
            }
            this.$store.commit('SAVE_EMAIN_TIME', {
              isSendEmails: this.isSendEmails,
              sendEmainText: this.sendEmainText,
              setTimeS: this.setTimeS,
              int: this.int
            })
          })
          .catch(er => {
            console.log(er)
            this.list = []
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
              that.sendEmainText[index] = that.$t('message.account.sendResoveEmail')
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
          AccountApi.getCoinResendConfirmAddress(id)
            .then(res => {
              this.$toast(this.$dictionary.error('0004'))
            })
            .catch(er => {
              console.log(er)
            })
        }
      },
      // 确定
      affirm() {
        if (this.isItem.trust && !this.isItem.status) {
          this.$toast(this.$dictionary.error('700'))
          return false
        }
        this.$router.push({
          path: `/account/withdraw/${this.$route.params.name}?address=${this.isActive}`
        })
      }
    },
    created() {
      if (this.$route.params.isShow) {
        this.show = this.$route.params.isShow
      }
      this.getDataAll()
      let currencyId = this.$store.state.dictionary.currencyList.filter(item => {
        return item.name === this.$route.params.name
      })[0].id
      let isGray = this.$store.state.dictionary.currencyList.filter(item => {
        return item.name === this.$route.params.name
      })[0].type
      AccountApi.getCoinAddressList(currencyId)
        .then(res => {
          if (!res.data.addressList) return false
          let isActiveIndex = res.data.addressList && res.data.addressList.filter(item => {
            if (Number(item.innerId) !== 0) {
              return item
            }
          })
          this.$nextTick(() => {
            this.list = res.data.addressList || []
            this.isGray = Number(isGray) % 2
            this.isActive = res.data.addressList && (isGray % 2 === 1 ? isActiveIndex[0].id : res.data.addressList[0].id) || ''
            this.isItem = res.data.addressList && res.data.addressList.length && res.data.addressList[0] || {}
          })
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../../assets/css/theme";

  .withdraw-address-name {
    width: 1180px;
    margin-top: -40px;
    .form {
      .base-form();
      margin: 30px 0;
      .st-form-item {
        margin: 0;
        .button {
          display: block;
          width: 115px;
          height: 36px;
          text-align: center;
          line-height: 36px;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          font-weight: 200;
          letter-spacing: 1.14px;
          color: #fff;
          background-color: #597ab9;
          border: none;
          border-radius: 3px;
        }
      }
    }
    .address {
      position: relative;
      margin: 30px 22px 0 0;
      width: 360px;
      height: 136px;
      border: 1px dashed #ECF0F7;
      background: url('../../../../assets/images/bg-big.png');
      .border-radius(6px);
      cursor: pointer;
      &:nth-child(3) {
        margin-right: 0;
      }
      img {
        width: 18px;
        height: 18px;
      }
      p {
        /*margin-top: 6px;*/
        font-size: 12px;
      }
      .del {
        position: absolute;
        right: 10px;
        top: 9.7px;
        display: block;
        width: 18px;
        height: 18px;
        background: url('../../../../assets/images/delete-ls.jpg')
      }
      .sp-trust, .sp-trusting, .a-email {
        /*margin-left: 4px;*/
        display: block;
        height: 16px;
        padding-right: 4px;
        line-height: 16px;
        /*font-family: PingFangSC-Regular;*/
        font-size: 12px;
        font-weight: 200;
        color: #fff;
      }
      .sp-trust {
        background: #F5A623;
        border-radius: 1px 3px 3px 1px;
      }
      .sp-trusting {
        background: #0AB480;
        border-radius: 1px 3px 3px 1px;
      }
      .certification {
        height: 16px;
        .left-picture {
          width: 9px;
          height: 16px;
          margin-left: 4px;
          /*background: url('../../../../assets/images/trust.png');*/
          /*background-size: 100% 100%;*/
          border-width: 8px 9px 8px 0px;
          border-style: solid;
          border-color: transparent #F5A623 transparent transparent; /*透明 黄 透明 透明 */
          border-radius: 0 1px 1px 0;
        }
      }
      .certified {
        height: 16px;
        .left-picture {
          width: 9px;
          height: 16px;
          margin-left: 4px;
          /*background: url('../../../../assets/images/trusting.png');*/
          /*background-size: 100% 100%;*/
          border-width: 8px 9px 8px 0px;
          border-style: solid;
          border-color: transparent #0AB480 transparent transparent; /*透明 黄 透明 透明 */
          border-radius: 0 1px 1px 0;
        }
      }
      .a-email {
        margin-left: 10px;
        font-size: 14px;
        color: #597ab9;
      }
    }
    .have {
      position: relative;
      padding: 9.7px 0 0 20px;
      border: 1px solid #ECF0F7;
      /*.border-shadow(2px 2px 10px #e5e6e7);*/
      background: url('../../../../assets/images/bg-big.png');
      background-size: 100% 100%;
      h4 {
        line-height: 20px;
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #24324C;
      }
      /*.have-bg {*/
      /*position: absolute;*/
      /*z-index: 0;*/
      /*top: 50%;*/
      /*right: 20px;*/
      /*width: 129px;*/
      /*height: 101px;*/
      /*margin-top: -50px;*/
      /*background: url("../../../../assets/images/bg_logo.png") no-repeat center center;*/
      /*background-size: 129px 101px;*/
      /*animation: mymove 2s alternate infinite;*/
      /*-webkit-animation: mymove 2s alternate infinite;*/
      /*}*/
      &:visited {
        border: 1px solid #B9C7E2;
      }
      &:hover {
        border: 1px solid #ECF0F7;
        box-shadow: 0 8px 20px 0 rgba(112, 128, 201, 0.10);
        .del {
          background: url(../../../../assets/images/del.png);
          background-size: 100% 100%;
        }
      }
      &:active {
        border: 1px solid #B9C7E2;
      }
    }
    .list {
      width: 1180px;
    }
    .active {
      border: 1px solid #B9C7E2;
      /*color: #597ab9;*/
      /*.border-shadow(2px 2px 10px #e5e6e7);*/
      .del {
        background: url(../../../../assets/images/delete-ls.jpg);
      }
    }
    .gray {
      color: #999;
    }
    .have-z {
      height: 20px;
      margin: 9.8px 0 10px;
      h4, span, a {
        z-index: 1;
      }
    }
    .site-top {
      height: 18px;
      margin-left: -23px;
      .left-picture {
        width: 3px;
        height: 19px;
        background: url('../../../../assets/images/out-left.png');
        background-size: 100% 100%;
      }
      .in-left-picture {
        background: url('../../../../assets/images/in-left.png');
        background-size: 100% 100%;
      }
      .content {
        height: 18px;
        padding: 0 2px 0 4px;
        background: #879FCD;
        .address1 {
          height: 18px;
          margin: auto auto;
          /*font-family: PingFangSC-Regular;*/
          font-size: 12px;
          font-weight: 200;
          color: #fff;
          line-height: 18px;
        }
      }
      .in-content {
        background: #96B0FC;
      }
      .right-picture {
        width: 7px;
        height: 18px;
        background: url('../../../../assets/images/out-right.png');
        background-size: 100% 100%;
      }
      .in-right-picture {
        background: url('../../../../assets/images/in-right.png');
        background-size: 100% 100%;
      }
    }
    .site-bottom {
      width: 100%;
    }
    .site-bottom p {
      position: relative;
      z-index: 1;
      width: 100%;
      line-height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
      white-space: nowrap;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #7889A9;
    }
    .label {
      margin-top: 20px;
      p {
        line-height: 14px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #5D6588;
      }
    }
    .empty {
      margin-right: 0;
      background: url(../../../../assets/images/bg-big.png);
      background-size: 100% 100%;
      div {
        width: 19px;
        height: 19px;
        background: url(../../../../assets/images/add.png);
        background-size: 100% 100%;
      }
      p {
        line-height: 16px;
        margin-left: 3px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #7889A9;
      }
      &:hover {
        div {
          background: url('../../../../assets/images/add-hover.png');
          background-size: 100% 100%;
        }
        p {
          color: #7E9EFD;
        }
      }
    }
    .divider {
      width: 1120px;
      height: 1px;
      margin-top: 30px;
      border-bottom: 1px dashed #ECF0F7;
    }
  }
</style>
