<template>
  <div class="users-tool container">
    <user-nav :id="3"></user-nav>
    <st-content :title="$t(`message.users.myApi`)" top="30px" paddingTop="20px" paddingBottom="50px">
      <st-prompt>
        <p>{{ $t(`message.users.tips1`) }}</p>
        <p>{{ $t(`message.users.tips2`) }}</p>
        <p>{{ $t(`message.users.tips3`) }}</p>
        <p>{{ $t(`message.users.tips4`) }}</p>
      </st-prompt>
      <st-row class="title" justify="between" align="center">
        <h2>{{ $t(`message.users.apiList`) }}</h2>
        <a class="api-create" @click="createAPI" v-if="record.length < 5">{{ $t(`message.users.createNewApi`) }}</a>
      </st-row>
      <custom-table :record="record" theme="theme2" style="margin-top: 20px;">
        <table-column :label="$t(`message.users.createTime`)" width="210" :customStyle="{paddingLeft: '22px'}">
          <template slot-scope="scope">
            <div class="api-handle">
              {{ scope && scope.createTime | timeFormat }}
            </div>
          </template>
        </table-column>
        <table-column :label="$t(`message.users.remarks`)" index="apiName" width="180"></table-column>
        <table-column :label="$t(`message.users.apiKey`)" index="apiKey" width="210"></table-column>
        <table-column :label="$t(`message.users.permissions`)" width="180"></table-column>
        <table-column :label="$t(`message.users.status`)" index="apiEnable" width="140"></table-column>
        <table-column :label="$t(`message.users.operating`)" width="128"
                      :customStyle="{paddingRight: '20px',textAlign: 'right'}">
          <template slot-scope="scope">
            <div class="api-handle">
              <a @click="getAPI(scope.id)">{{ $t(`message.users.view`) }}</a>
              <a @click="modifyAPI(scope.id)">{{ $t(`message.users.modify`) }}</a>
              <a @click="deleteAPI(scope.id)">{{ $t(`message.users.delete`) }}</a>
            </div>
          </template>
        </table-column>
      </custom-table>
      <div class="api-empty" v-if="listStatus">
        <p>{{ $t(`message.users.currentlyUnavailableApi`) }}<a @click="createAPI">{{ $t(`message.users.createNow`)
          }}</a></p>
      </div>
      <popup :title="$t(`message.users.createApi`)" :callback="close" v-if="createStatus">
        <create-api theme="create" @create='getAPIList' @close="close"></create-api>
      </popup>
      <popup :title="$t(`message.users.modifyApi`)" :callback="close" v-if="modifyStatus">
        <create-api theme="modify" :id="apiId" @modify='getAPIList' @close="close"></create-api>
      </popup>
      <popup :title="$t(`message.users.viewApi`)" :callback="close" v-if="getStatus">
        <api-info :id="apiId" @close="close"></api-info>
      </popup>
    </st-content>
  </div>
</template>

<script>
  import CustomTable from '../../../components/users/table/table'
  import TableColumn from '../../../components/users/table/column'
  import UserNav from '../../../components/users/user-nav'
  import StPrompt from '../../../components/users/prompt'
  import Popup from '../../../components/common/popup'
  import CreateApi from '../../../components/users/createApi'
  import ApiInfo from '../../../components/users/apiInfo'

  export default {
    name: 'users-tool',
    // middleware: ['auth'],
    components: {
      StPrompt,
      UserNav,
      CustomTable,
      TableColumn,
      Popup,
      CreateApi,
      ApiInfo
    },
    data() {
      return {
        record: [],
        createStatus: false,
        modifyStatus: false,
        listStatus: false, // 判断是否存在api，初始为false，获取api列表后判断
        getStatus: false,
        apiId: ''
      }
    },
    methods: {
      // 获取API列表
      getAPIList() {
        this.usersApi.getAPIList()
          .then(res => {
            let list = res.data.apiList
            if (list.length) {
              this.listStatus = false
              list.map(item => {
                item.apiEnable = item.apiEnable ? this.$t(`message.users.normal`) : this.$t(`message.users.notInService`)
              })
            } else {
              this.listStatus = true
            }
            this.record = list
          })
          .catch(error => {
            console.log(error)
          })
      },
      // 创建API
      createAPI() {
        this.createStatus = true
      },
      // 查看API
      getAPI(id) {
        this.apiId = id
        this.$nextTick(() => {
          this.getStatus = true
        })
      },
      modifyAPI(id) {
        this.apiId = id
        this.$nextTick(() => {
          this.modifyStatus = true
        })
      },
      // 删除API
      deleteAPI(id) {
        this.usersApi.deleteAPI(id)
          .then((res) => {
            this.getAPIList()
          })
          .catch(error => {
            console.log(error)
          })
      },
      // 关闭所有弹窗
      close() {
        this.createStatus = false
        this.modifyStatus = false
        this.getStatus = false
      }
    },
    created() {
      this.getAPIList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";

  .users-tool {
    .title {
      margin-top: 36px;
      height: 72px;
      border-bottom: 2px solid @borderColor;
      h2 {
        font-size: 16px;
      }
      a {
        display: block;
        width: 100px;
        border: 1px solid @linkColor;
        .border-radius(@radius: 3px);
        line-height: 30px;
        font-size: 14px;
        color: @linkColor;
        text-align: center;
        &:hover {
          background: #3a5a99;
          color: #fff;
        }
      }
    }
    .api-empty {
      height: 233px;
      p {
        padding-top: 100px;
        line-height: 14px;
        font-size: 14px;
        text-align: center;
        color: #999;
        a {
          color: #597ab9;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .api-handle {
      a {
        margin-right: 9px;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          color: @buttonColor;
        }
      }
    }
  }
</style>
