<template>
  <st-row class="ranking" direction="column">
    <user-bread :list="breadList"></user-bread>
    <!--<type-nav :arr="navArr"></type-nav>-->
    <loan-list></loan-list>
  </st-row>
</template>

<script>
  import UserBread from '../../../../components/users/user-bread'
  import TypeNav from '../../../../components/users/type-nav'
  import LoanList from '../../../../components/users/ranking-list'
  import AgentApi from '../../../../assets/js/api/agentApi'

  export default {
    name: 'ranking',
    components: {
      UserBread,
      TypeNav,
      LoanList
    },
    data() {
      return {
        vMon: '',
        monthList: ['invite.month_1', 'invite.month_2', 'invite.month_3', 'invite.month_4', 'invite.month_5', 'invite.month_6', 'invite.month_7', 'invite.month_8', 'invite.month_9', 'invite.month_10', 'invite.month_11', 'invite.month_12'],
        breadList: [
          {
            name: this.$t(`users.invite`),
            link: '/users/invite'
          },
          {
            // name: this.$t(`invite.militaryExploits`)
            name: ''
          }
        ],
        navArr: [{key: 'invited', text: 'invite.invitedRecord'}, {
          key: 'commission',
          text: 'invite.commissionSubsidiary'
        }]
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo
      }
    },
    methods: {
      getlastMonth() {
        AgentApi.rankingList()
          .then(res => {
            this.vMon = res.result.month
            var cMon = this.monthList.filter((item, index) => index + 1 === this.vMon)[0]
            this.breadList[1].name = this.$t(cMon) + this.$t(`invite.rankingList`)
          })
      }
    },
    created() {
      this.getlastMonth()
    }
  }
</script>

<style lang="less" scoped>
  .ranking {
    width: 1180px;
    margin: -11px auto -21px;
  }
</style>
