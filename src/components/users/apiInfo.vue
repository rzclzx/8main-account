<!-- 查看API基本信息 -->
<template>
  <div>
    <div v-if="verifyStatus">
      <verify-box :purpose="purpose" :ticketType="ticketType" @verify="getAPIInfo"></verify-box>
    </div>
    <st-form v-else @submit.prevent>
      <st-form-item
        label="API Key："
      >
        <span>{{ apiKey }}</span>
      </st-form-item>
      <st-form-item
        label="Secret Key："
      >
        <span>{{ apiSecret }}</span>
      </st-form-item>
      <st-form-item
        :label="$t(`message.users.Whitelist`)"
        style="margin-bottom: 35px"
      >
        <div :class="{ list : !allowIp }">
          <span v-for="item in allowIp">{{ item }}</span>
        </div>
      </st-form-item>
      <!-- 提交 -->
      <a class="close-btn" @click="close">{{ $t(`message.users.close`) }}</a>
    </st-form>
  </div>
</template>

<script>
  import VerifyBox from '../messageBox/verifyBox'

  export default {
    name: 'apiInfo',
    components: {
      VerifyBox
    },
    props: {
      id: null
    },
    data() {
      return {
        apiKey: '',
        allowIp: [],
        apiSecret: '',
        verifyStatus: true,
        purpose: this.$dictionary.purpose.viewAPI,
        ticketType: this.$dictionary.ticketType.getApiTicket
      }
    },
    computed: {
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    methods: {
      getAPIInfo() {
        this.verifyStatus = false
        this.usersApi.getAPI(this.ticket, this.id)
          .then(res => {
            this.apiKey = res.data.api.apiKey
            this.apiSecret = res.data.api.apiSecret
            this.allowIp = res.data.api.allowIp
          })
          .catch(error => {
            console.log(error)
          })
      },
      close() {
        this.$store.commit('ticket/SAVE_TICKET', {
          type: this.ticketType,
          ticket: ''
        })
        this.$emit('close')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme.less";

  .st-form {
    /*margin: 60px 0 30px 0;*/
    .st-form-item {
      margin: 0 0 25px 270px;
      height: 40px !important;
      min-height: 40px !important;
      span {
        line-height: 40px;
        font-size: 14px;
        text-align: left;
      }
      .list {
        height: 40px;
        line-height: 40px;
      }
      div {
        span {
          margin-right: 35px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .close-btn {
      display: block;
      margin-left: 182px;
      width: 350px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      background: @buttonColor;
      .border-radius();
    }
  }
</style>
