<template>
  <div class="users-verify-twice container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.twiceVerify`)" top="30px" paddingTop="30px" paddingBottom="330px">
      <div class="list">
        <list-item
          :label="$t(`message.users.SMSTwiceVerify`)"
          :isCurrent="userInfo.twiceMobileAuth && !userInfo.twiceGoogleAuth"
          :params=$dictionary.twiceType.sms
          :callback="choose"
        >
        </list-item>
        <list-item
          :label="$t(`message.users.googleTwiceVerify`)"
          :isCurrent="!userInfo.twiceMobileAuth && userInfo.twiceGoogleAuth"
          :able="userInfo.googleBind"
          :params=$dictionary.twiceType.google
          :callback="choose"
        >
          <router-link to="/users/safe/google/bind" v-if="!userInfo.googleBind">{{ $t(`message.users.bindGoogle`) }}
          </router-link>
        </list-item>
        <list-item
          :label="$t(`message.users.googleSMSTwiceVerify`)"
          :isCurrent="userInfo.twiceMobileAuth && userInfo.twiceGoogleAuth"
          :able="userInfo.googleBind"
          :params=$dictionary.twiceType.smsGoogle
          :callback="choose"
        >
          <router-link to="/users/safe/google/bind" v-if="!userInfo.googleBind">{{ $t(`message.users.bindGoogle`) }}
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
    name: 'users-verify-twice',
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
            name: this.$t(`message.users.twiceVerify`)
          }
        ],
        show: false,
        purpose: this.$dictionary.purpose.secondVerification,
        ticketType: 'twiceTicket',
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
        return this.usersApi.twiceStrategy(this.type, res.data.ticket)
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
  @import "../../../../assets/css/theme";

  .container {
    a {
      color: @linkColor;
      &:hover {
        color: #1e2266;
      }
    }
  }
</style>
