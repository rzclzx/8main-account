<template>
  <st-row class="deposit-name container" justify="between">
    <account-slider :title="$t(`message.account.deposit`)"></account-slider>
    <div class="main">
      <deposit-address :isGray="isGray"></deposit-address>
      <deposit-record></deposit-record>
    </div>
    <popup :title="$t(`message.account.riskWarning`)" :callback="close" v-if="show" popupWidth="500px"
           popupHeight="270px">
      <deposit-u-c-c @close="close" :callback="close" :isGray="isGray"></deposit-u-c-c>
    </popup>
  </st-row>
</template>

<script>
  import AccountSlider from '../../../components/account/account-slider'
  import DepositAddress from '../../../components/account/deposit-address'
  import DepositRecord from '../../../components/account/deposit-record'
  import Popup from '../../../components/common/popup'
  import DepositUCC from '../../../components/account/deposit-UCC'

  export default {
    name: 'deposit-name',
    components: {
      AccountSlider,
      DepositAddress,
      DepositRecord,
      DepositUCC,
      Popup
    },
    data () {
      return {
        show: false,
        isGray: 0
      }
    },
    computed: {
      currencyList() {
        return this.$store.state.dictionary.currencyList
      }
    },
    watch: {
      '$route.params.name'(router) {
        this.alterBox()
      }
    },
    methods: {
      close (bl) {
        this.show = false
        bl && this.getList()
      },
      alterBox() {
        // 右移第二位为 1 ，表示需要显示标签地址
        let isGray = Number(this.currencyList.filter(item => {
          return item.name === this.$route.params.name
        })[0].type >> 1) % 2
        this.isGray = isGray
        this.$nextTick(() => {
          (this.$route.params.name === 'UCC' || this.isGray) ? this.show = true : this.show = false
        })
      }
    },
    mounted() {
      this.alterBox()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .container {
    width: 1180px;
  }
  .deposit-name {
    .main {
      width: 870px;
    }
  }

  .main-content {
    height: 600px;
    p {
      margin: 50px 0 0 30px;
    }
  }
</style>
