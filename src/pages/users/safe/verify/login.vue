<template>
  <div class="users-verify-login container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.loginVerify`)" top="30px" paddingTop="30px" paddingBottom="340px">
      <div class="list">
        <list-item
          :label="$t(`message.users.passwordLogin`)"
          :isCurrent="!userInfo.twiceLogin"
          :params=$dictionary.loginType.password
          :callback="choose"
        >
        </list-item>
        <list-item
          :label="$t(`message.users.passwordGoogleLogin`)"
          :isCurrent="userInfo.twiceLogin"
          :able="userInfo.googleBind"
          :params=$dictionary.loginType.passwordGoogle
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
    name: 'users-verify-login',
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
            name: this.$t(`message.users.loginVerify`)
          }
        ],
        show: false,
        purpose: this.$dictionary.purpose.loginVerification,
        ticketType: 'loginVerifyTicket',
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
        return this.usersApi.loginVerifyStrategy(this.type, res.data.ticket)
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

  .users-verify-login {
    a {
      color: @linkColor;
      &:hover {
        color: #1e2266;
      }
    }
  }
</style>
