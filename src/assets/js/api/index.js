import ToolsApi from './toolsApi'
import ManageApi from './manageApi'
import UserApi from './userApi'
import AccountApi from './accountApi'
import HomeApi from './homeApi'
import MarketApi from './marketApi'
import ApplyApi from './applyApi'
import AgentApi from './agentApi'

export default {
  install (Vue) {
    Vue.prototype.toolsApi = ToolsApi
    Vue.prototype.manageApi = ManageApi
    Vue.prototype.usersApi = UserApi
    Vue.prototype.accountApi = AccountApi
    Vue.prototype.homeApi = HomeApi
    Vue.prototype.marketApi = MarketApi
    Vue.prototype.applyApi = ApplyApi
    Vue.prototype.agentApi = AgentApi
  }
}
