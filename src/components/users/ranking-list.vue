<template>
  <div class="ranking-list">
    <table>
      <thead>
      <tr>
        <th>
          {{ $t(`message.invite.ranking`) }}
        </th>
        <th>
          {{ $t(`message.invite.user`) }}
        </th>
        <th>
          {{ $t(`message.invite.convert`) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in list" v-if="index < 20">
        <td>
          <span>{{ index + 1 | ranking }}</span>
        </td>
        <td>
          {{ item.account || '' }}
        </td>
        <td>
          {{ item.lastMonth || 0 }}
          <span style="color: #94A1B9;">USDT</span>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="no-list" v-if="list.length === 0">
      <img src="../../assets/images/account-nolist.png" alt=""/>
      <p>{{ $t('message.common.noList') }}</p>
    </div>
  </div>
</template>

<script>
  import AgentApi from '../../assets/js/api/agentApi'

  export default {
    name: 'ranking-list',
    data() {
      return {
        list: []
      }
    },
    computed: {},
    methods: {},
    filters: {
      ranking(value) {
        if (!value) return ''
        if (value < 10) return '0' + value
        else return value
      },
      phone(value) {
        if (!value) return ''
        return value.replace(/^(\d{3})\d{5}(\d+)/, '$1****$2')
      }
    },
    created() {
      AgentApi.rankingList()
        .then(res => {
          this.list = res.result.data
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .ranking-list {
    padding: 20px 30px 20px;
    min-height: 460px;
    background: #fff;
    table {
      /*width: 1120px;*/
      border-collapse: collapse;
      thead {
        height: 40px;
        background: #F8F9FC;
        tr {
          width: 1120px;
          height: 40px;
          padding-left: 20px;
          /*background: #F8F9FC;*/
          th {
            font-family: PingFangSC-Medium;
            font-size: 12px;
            font-weight: 200;
            color: #667AA0;
            border-right-style: none;
            border-left-style: none;
            text-align: left;
            &:nth-child(1) {
              width: 135px;
              padding-left: 20px;
            }
            &:nth-child(2) {
              width: 250px;
            }
            &:nth-child(3) {
              width: 775px;
            }
          }
        }
      }
      tbody {
        tr {
          width: 1120px;
          height: 60px;
          border-bottom: 1px solid #ECF0F7;
          td {
            font-family: Helvetica;
            font-size: 12px;
            font-weight: 200;
            color: #24324C;
            &:nth-child(1) {
              width: 22px;
              height: 60px;
              padding-left: 20px;
              span {
                display: block;
                width: 24px;
                height: 33px;
                line-height: 33px;
                text-align: center;
              }
            }
          }
          &:nth-child(1) {
            td:nth-child(1) {
              font-size: 0;
              span {
                background: url('../../assets/images/invite/01.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }
          &:nth-child(2) {
            td:nth-child(1) {
              font-size: 0;
              span {
                background: url('../../assets/images/invite/02.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }
          &:nth-child(3) {
            td:nth-child(1) {
              font-size: 0;
              span {
                background: url('../../assets/images/invite/03.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }
          &:hover {
            background: #F0F4FF;
          }
        }
      }
    }
    .no-list {
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
  }
</style>
