import agentAxios from '../axios/agentAxiosConfig'

const Agent = {
  // 返佣详情
  commissionDetails (page, pageSize, status) {
    return agentAxios.post('/agent/brokerage/profit', { page, pageSize, status })
  },
  // 返佣折合
  commissionConvert () {
    return agentAxios.post('/agent/brokerage/count')
  },
  // 排行榜
  rankingList (pageSize) {
    return agentAxios.post('/agent/brokerage/rankingList', { pageSize })
  },
  // 海报地址
  getPosters(locale) {
    return agentAxios.get('/agent/user/invitee//posterlist/' + locale)
  }
}

export default Agent
