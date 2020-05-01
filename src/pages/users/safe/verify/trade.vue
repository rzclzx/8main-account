<template>
  <div class="users-verify-trade container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.tradeVerify`)" top="30px" paddingTop="30px" paddingBottom="330px">
      <div class="list">
        <list-item
          :label="$t(`message.users.noFundPassword`)"
          :isCurrent="!userInfo.tradePwdHours && !userInfo.tradePwdAlways"
          :params=$dictionary.tradeType.noPassword
          :callback="choose"
        >
        </list-item>
        <list-item
          :label="$t(`message.users.hourFundPassword`)"
          :isCurrent="userInfo.tradePwdHours"
          :able="userInfo.tradePwdExist"
          :params=$dictionary.tradeType.everyHoursPwd
          :callback="choose"
        >
          <router-link to="/users/safe/fund/setting" v-if="!userInfo.tradePwdExist">{{
            $t(`message.users.setFundPassword`) }}
          </router-link>
        </list-item>
        <list-item
          :label="$t(`message.users.needFundPassword`)"
          :isCurrent="userInfo.tradePwdAlways"
          :able="userInfo.tradePwdExist"
          :params=$dictionary.tradeType.everyTradePwd
          :callback="choose"
        >
          <router-link to="/users/safe/fund/setting" v-if="!userInfo.tradePwdExist">{{
            $t(`message.users.setFundPassword`) }}
          </router-link>
        </list-item>
      </div>
    </st-content>
    <popup :title="$t(`message.users.verify`)" :callback="close" v-if="show">
      <verify-box :purpose="purpose" :ticketType="ticketType" @verify="verify"></verify-box>
    </popup>
  </div>
</template>

<script>
  import UserBread from '../../../../components/users/user-bread'
  import Popup from '../../../../components/common/popup'
  import ListItem from '../../../../components/common/listItem'
  import VerifyBox from '../../../../components/messageBox/verifyBox'

  export default {
    name: 'users-verify-trade',
    components: {
      UserBread,
      Popup,
      ListItem,
      VerifyBox
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.tradeVerify`)
          }
        ],
        show: false,
        purpose: this.$dictionary.purpose.transactionVerification,
        ticketType: 'tradeTicket',
        type: null
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      }
    },
    methods: {
      close() {
        this.type = null
        this.show = false
      },
      choose(type) {
        this.type = type
        this.show = true
      },
      verify(res) {
        return this.usersApi.tradeStrategy(this.type, res.data.ticket)
          .then(res => {
            this.$store.commit('SAVE_TICKET', {
              type: this.ticketType,
              ticket: ''
            })
            this.close()
            return res
          })
          .then(() => {
            return this.$store.dispatch('getUserInfo')
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/theme.less";

  .users-verify-trade {
    a {
      color: @linkColor;
      &:hover {
        color: #1e2266;
      }
    }
  }
</style>
