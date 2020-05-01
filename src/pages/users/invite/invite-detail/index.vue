<template>
  <div class="invite-detail">
    <user-bread :list="breadList"></user-bread>
    <type-nav :arr="navArr"></type-nav>
    <div class="line"></div>
    <invite-record></invite-record>
  </div>
</template>

<script>
  import UserBread from '../../../../components/users/user-bread'
  import TypeNav from '../../../../components/users/type-nav'
  import InviteRecord from '../../../../components/users/invite-record'

  export default {
    name: 'invite-detail',
    components: {
      UserBread,
      TypeNav,
      InviteRecord
    },
    data() {
      return {
        breadList: [
          {
            name: this.$t(`message.users.invite`),
            link: '/users/invite'
          },
          {
            name: ''
            // name: '邀请记录'
          }
        ],
        navArr: [
          {
            key: 'invited',
            text: 'message.invite.invitedRecord'
          },
          {
            key: 'commission',
            text: 'message.invite.commissionSubsidiary'
          }
        ]
      }
    },
    watch: {
      '$route'() {
        if (this.$route.query.type === 'commission') {
          this.breadList[1].name = this.$t(`message.invite.commissionSubsidiary`)
        } else {
          this.breadList[1].name = this.$t(`message.invite.invitedRecord`)
        }
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      }
    },
    created() {
      if (this.$route.query.type === 'commission') {
        this.breadList[1].name = this.$t(`message.invite.commissionSubsidiary`)
      } else {
        this.breadList[1].name = this.$t(`message.invite.invitedRecord`)
      }
    }
  }
</script>

<style lang="less" scoped>
  .invite-detail {
    width: 1180px;
    margin: 0 auto;
    background: #ffffff;
    .line {
      width: 1120px;
      height: 1px;
      margin: 0 auto;
      background: #E4ECF1;
    }
  }
</style>
