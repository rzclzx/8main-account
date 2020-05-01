<template>
  <div>
    <st-row v-if="addressInfo" class="address have" @click="show= true" direction="column">
      <st-row class="site-top">
        <div class="left-picture" :class="addressInfo.innerId > 0 ? 'in-left-picture' : ''"></div>
        <div class="content" :class="addressInfo.innerId > 0 ? 'in-content' : ''">
          <p>{{ addressInfo.innerId > 0 ? $t(`message.account.withinAddress`) :
            $t(`message.account.outsideAddress`) }}</p>
        </div>
        <div class="right-picture" :class="addressInfo.innerId > 0 ? 'in-right-picture' : ''"></div>
      </st-row>
      <h4>{{ addressInfo.tag }}</h4>
      <p class="address-content">{{ addressInfo.address }}</p>
      <!-- 标签 -->
      <st-row class="item" align="center" v-if="addressInfo && addressInfo.paymentId">
        <p>{{ $t(`message.account.label`) }}：</p>
        <p style="text-align: left;">{{ addressInfo.paymentId }}</p>
      </st-row>
      <!--<st-row>-->
      <router-link class="address-nav" tag="div"
                   :to="{path: `/account/withdraw/address/${$route.params.name}`}"></router-link>
      <!--</st-row>-->
      <!--<div class="have-bg"></div>-->
    </st-row>
    <a v-else @click="address">
      <st-row class="address" justify="center" align="center">
        <img src="../../assets/images/icon-an.png" alt="">
        <p>{{$t(`message.account.addNewsAddress`)}}</p>
      </st-row>
    </a>
    <popup :title="$t(`message.account.addNewsAddress`)" :callback="close" v-if="show">
      <withdraw-address-add @close="close"></withdraw-address-add>
    </popup>
  </div>
</template>

<script>
  import Popup from '../common/popup'
  import withdrawAddressAdd from './withdraw-address-add'

  export default {
    name: 'withdraw-address-info',
    components: {
      Popup,
      withdrawAddressAdd
    },
    props: {
      addressInfo: {
        required: true
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      address () {
        let $this = this
        if (this.$store.state.manage.userInfo.tradePwdExist) {
          // this.show = true
          $this.$router.push({
            name: 'address',
            path: `/account/withdraw/address/${$this.$route.params.name}`,
            params: {
              isShow: true
            }
          })
        } else {
          this.$toast(this.$t('message.accountdetail.setpassword'))
          this.show = false
          setTimeout(function () {
            $this.$router.push('/users/safe/fund/setting')
          },700)
        }
        // this.show= true
      },
      close(bl) {
        this.show = false
        bl && this.$emit('getAddress')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .address {
    width: 350px;
    height: 136px;
    border: 1px solid #ECF0F7;
    .border-radius(5px);
    background: url('../../assets/images/bg-small.png');
    background-size: 100% 100%;
    img {
      width: 18px;
      height: 18px;
      margin-right: 5px;
    }
    p {
      /*margin-top: 6px;*/
      /*font-size: 12px;*/
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #7889A9;
    }
    .address-content {
      /*margin-top: 6px;*/
      width: 308px;
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
    /*&:hover {*/
    /*background: #f3f7ff;*/
    /*.have-bg {*/
    /*z-index: -1;*/
    /*}*/
    /*}*/
    &:hover {
      border: 1px solid #ECF0F7;
      box-shadow: 0 8px 20px 0 rgba(112, 128, 201, 0.10);
    }
  }

  .site-top {
    height: 18px;
    margin-left: -23px;
    .left-picture {
      width: 3px;
      height: 19px;
      background: url('../../assets/images/out-left.png');
      background-size: 100% 100%;
    }
    .in-left-picture {
      background: url('../../assets/images/in-left.png');
      background-size: 100% 100%;
    }
    .content {
      height: 18px;
      padding: 0 2px 0 4px;
      /*line-height: 18px;*/
      background: #879FCD;
      p {
        line-height: 18px;
        font-family: PingFangSC-Regular;
        font-weight: 200;
        color: #fff;
      }
    }
    .in-content {
      background: #96B0FC;
    }
    .right-picture {
      width: 7px;
      height: 18px;
      background: url('../../assets/images/out-right.png');
      background-size: 100% 100%;
    }
    .in-right-picture {
      background: url('../../assets/images/in-right.png');
      background-size: 100% 100%;
    }
  }
  .have {
    position: relative;
    padding: 10px 0 0 20px;
    color: #333;
    border: 1px solid #f0f1f3;
    h4 {
      margin: 10px 0 10px;
      line-height: 20px;
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: #24324C;
    }
    p {
      position: relative;
      z-index: 1;
      line-height: 14px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #7889A9;
    }
    .address-nav {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
      font-size: 14px;
      align-self: flex-end;
      background: url('../../assets/images/exchange.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
    .item {
      margin-top: 20px;
      p {
        line-height: 14px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #7889A9;
      }
    }
    .have-bg {
      position: absolute;
      top: 50%;
      right: 20px;
      width: 129px;
      height: 101px;
      margin-top: -50px;
      background: url("../../assets/images/bg_logo.png") no-repeat center center;
      background-size: 129px 101px;
      animation: mymove 2s alternate infinite;
      -webkit-animation: mymove 2s alternate infinite;
    }
  }
</style>
