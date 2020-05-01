<template>
  <div class="invite-record">
    <div class="table-box">
      <table class="invite-record-table">
        <thead>
        <tr>
          <th v-if="$route.query.type === 'invited' || !$route.query.type" width="200" align="left"
              style="padding-left: 22px">{{ $t(`message.users.userName`) }}
          </th>
          <th v-if="$route.query.type === 'commission'" width="200" align="left" style="padding-left: 22px">
            {{ $t(`message.invite.convert`) }}
          </th>
          <th v-if="$route.query.type === 'invited' || !$route.query.type" width="262" align="left">{{
            $t(`message.users.registerDate`) }}
          </th>
          <th v-if="$route.query.type === 'commission'" width="262" align="left">
            {{ $t(`message.invite.time`) }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in ($route.query.type === 'invited' || !$route.query.type) ? invitedList : commissionList"
            :key="item.id">
          <!--<td align="left" style="padding-left: 22px; color: #999;">{{ item.mobile }}</td>-->
          <!--<td align="left">{{ item.registerTime | timeFormat }}</td>-->
          <td v-if="$route.query.type === 'invited' || !$route.query.type" align="left" style="padding-left: 22px;">
            <span class="head-portrait"></span>
            <p>
              {{ item.mobile }}
            </p>
          </td>
          <td v-if="$route.query.type === 'commission'" align="left" style="padding-left: 22px;">
            {{ item.rakeBack || 0 }}
            <span class="unit">{{ item.currency || 0 }}</span>
          </td>
          <td v-if="$route.query.type === 'invited' || !$route.query.type" align="left">
            {{ item.registerTime | timeFormat }}
          </td>
          <td v-if="$route.query.type === 'commission'" align="left">
            {{ item.dealTime || '' }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="$route.query.type === 'invited' || !$route.query.type">
      <div class="no-list" v-if="!invitedList && curPage === 1">
        <img src="../../assets/images/account-nolist.png" alt="" />
        <p>{{ $t('message.common.noList') }}</p>
      </div>
      <st-page :page="curPage" v-if="invitedList && invitedList.length >= 10 && curPage === 1" style="margin-top: 20px"
               :isDown="isDown"></st-page>
      <st-page :page="curPage" v-else-if="invitedList && curPage > 1" style="margin-top: 20px"
               :isDown="isDown"></st-page>
    </div>

    <div v-if="$route.query.type === 'commission'">
      <div class="no-list" v-if="!commissionList && curPage === 1">
        <img src="../../assets/images/account-nolist.png" alt=""/>
        <p>{{ $t('message.common.noList') }}</p>
      </div>
      <st-page :page="curPage" v-if="commissionList && commissionList.length >= 10 && curPage === 1"
               style="margin-top: 20px" :isDown="isDowns"></st-page>
      <st-page :page="curPage" v-else-if="commissionList && curPage > 1" style="margin-top: 20px"
               :isDown="isDowns"></st-page>
    </div>

  </div>
</template>

<script>
  import StPage from '../page/page'
  // import UsersApi from '../../assets/js/api/userApi'
  import AgentApi from '../../assets/js/api/agentApi'

  export default {
    name: 'invite-record',
    components: {
      StPage
    },
    data() {
      return {
        invitedCount: 0,
        invitedList: [],
        commissionList: [],
        curPage: 1,
        isDown: false,
        isDowns: false
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      }
    },
    // props: ['count', 'list'],
    watch: {
      '$route'(route, oldRoute) {
        if (!this.userInfo) {
          return false
        }
        if (route.query.page !== oldRoute.query.page) {
          this.invitedList = []
          this.commissionList = []
        }
        this.curPage = route.query.page || 1
        this.getInvitedList()
        this.getProfitList()
      }
    },
    methods: {
      // 获取已邀请人数列表
      getInvitedList() {
        this.usersApi.getInvitedList(this.curPage)
          .then(res => {
            // console.log(res.data.inviteeList)
            if (res.data.inviteeList) {
              this.invitedList = res.data.inviteeList.slice(0, 10)
              if (this.invitedList.length < 10) this.isDown = true
              else this.isDown = false
              if (!this.invitedList.length) this.invitedList = Number(this.curPage) === 1 ? null : []
            } else {
              this.invitedList = Number(this.curPage) === 1 ? null : []
              this.isDown = false
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getProfitList() {
        AgentApi.commissionDetails(this.curPage, 10, 1)
          .then(res => {
            // console.log(res.result.data)
            if (res.result.data) {
              this.commissionList = res.result.data.slice(0, 10)
              if (this.commissionList.length < 10) this.isDowns = true
              else this.isDowns = false
              if (!this.commissionList.length) this.commissionList = Number(this.curPage) === 1 ? null : []
            } else {
              this.commissionList = Number(this.curPage) === 1 ? null : []
              this.isDowns = false
            }
          })
          .catch(er => {
            console.log(er)
          })
      }
    },
    created() {
      this.curPage = this.$route.query.page || 1
      this.getInvitedList()
      this.getProfitList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .invite-record {
    background: #fff;
    padding: 0 30px 20px;
    .invited {
      height: 130px;
      width: 260px;
      padding-top: 20px;
      background: url("../../assets/images/inviteBg.png") no-repeat #697FB6;
      p {
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
        span {
          font-size: 24px;
          line-height: 24px;
        }
        &:last-child {
          margin-top: 30px;
        }
      }
    }
    .table-box {
      min-height: 460px;
      padding-top: 20px;
      background: #fff;
      .invite-record-table {
        /*margin-top: 50px;*/
        border-collapse: collapse;
        background: #fff;
        thead {
          background: #F8F9FC;
          tr {
            height: 40px;
            border-bottom: 1px solid #ECF0F7;
            th {
              font-family: PingFangSC-Medium;
              font-size: 12px;
              font-weight: 200;
              color: #667AA0;
              &:nth-child(1) {
                width: 262px;
                padding-left: 16px;
              }
              &:nth-child(2) {
                width: 888px;
              }
            }
          }
        }
        tbody {
          background: #fff;
          min-height: 430px;
          tr {
            border-bottom: 1px solid #ECF0F7;
            td {
              height: 42px;
              font-family: Helvetica;
              font-size: 12px;
              font-weight: 200;
              color: #24324C;
              &:nth-child(1) {
                width: 246px;
                display: flex;
                direction: row;
                align-items: center;
                .head-portrait {
                  display: block;
                  width: 20px;
                  height: 20px;
                  margin-right: 20px;
                  background: url('../../assets/images/invite/touxiang.png') no-repeat;
                  background-size: 100% 100%;
                }
                .unit {
                  margin-left: 6px;
                  color: #94A1B9;
                }
              }
            }
            &:hover {
              background: #F0F4FF;
            }
          }
        }
      }
    }

    .no-list {
      /*width: 1180px;*/
      margin: -320px auto 186px;
      img {
        margin: 0 auto;
        width: 175px;
        height: 100px;
      }
      p {
        line-height: 34px;
        font-size: 14px;
        color: #c9d0dc;
        text-align: center;
      }
    }
    .page {
      margin-top: 30px;
    }
  }
</style>
