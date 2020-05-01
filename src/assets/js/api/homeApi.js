import axios from '../axios/zendeskAxiosConfig'

const homeApi = {
  getAnnouncement (locale, id) {
    return axios.get('api/v2/help_center/' + locale + '/categories/' + id + '/articles.json?per_page=4')
  },
  getNews () {
    return axios.get(`api/v2/help_center/zh-cn/categories/360000082273/articles.json`)
  }
}

export default homeApi
