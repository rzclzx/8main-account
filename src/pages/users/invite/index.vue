<template>
  <div class="users-invite container">
    <user-nav :id="4"></user-nav>
    <st-row class="content" direction="column">
      <st-row class="header" direction="column" align="center">
        <h2>{{ $t(`message.invite.title`) }}</h2>
        <st-row class="step" justify="center" align="center">
          <div class="step-content step-content1">
            <div class="captions"></div>
            <p>
              {{ $t(`message.invite.step1`) }}
            </p>
          </div>
          <div class="boult"></div>
          <div class="step-content step-content2">
            <div class="captions"></div>
            <p>
              {{ $t(`message.invite.step2`) }}
            </p>
          </div>
          <div class="boult"></div>
          <div class="step-content step-content3">
            <div class="captions"></div>
            <p>
              {{ $t(`message.invite.step3`) }}
            </p>
          </div>
        </st-row>
        <st-row class="share-link">
          <p>{{ shareId }}</p>
          <input type="text" id="shareId" ref="shareId" v-model="shareId"/>
          <a class="copy" @click="copy">{{ $t(`message.invite.copy`) }}</a>
        </st-row>
        <st-row class="download">
          <st-row class="wx" :class="$i18n.locale" align="center">
            <div class="wx-icon"></div>
            <p>
              {{ $t(`message.invite.wx`) }}
            </p>
            <div class="wxCode" :class="$i18n.locale">
              <canvas id="canvas" ref="canvas" width="84" height="84"></canvas>
            </div>
          </st-row>
          <st-row class="playbill" align="center">
            <div class="playbill-icon"></div>
            <p @click="openPopup">
              {{ $t(`message.invite.playbill`) }}
            </p>
            <div class="poster">
              <img :src=qrcodeURL id="img" ref="img">
              <img id="poster" :src=imgURL>
              <canvas id="mycanvas" width="750" height="1334"></canvas>
            </div>
          </st-row>
        </st-row>
      </st-row>
      <st-row class="invite" justify="center">
        <div class="rebate invite-content" @click="detail" justify="between" align="center" style="margin-right: 18px;">
          <st-row class="details" justify="between" align="center">
            <div class="picture" style="margin-right: 50px"></div>
            <div>
              <p class="figure">{{ count || 0 }} <span class="character">{{ $t(`message.invite.men`) }}</span></p>
              <p class="character">{{ $t(`message.invite.firend`) }}</p>
            </div>
          </st-row>
          <div class="arrows"></div>
        </div>
        <div class="convert invite-content" @click="convert" justify="between" align="center">
          <st-row class="details" align="center">
            <div class="picture" style="margin-right: 50px;"></div>
            <div>
              <p class="figure">{{ poolCount || 0 }} <span class="character">USDT</span></p>
              <p class="character">{{ $t(`message.invite.convert`) }}</p>
            </div>
          </st-row>
          <div class="arrows"></div>
        </div>
      </st-row>

      <st-row class="rankingList" direction="column" v-if="rankingList.ranking">
        <st-row class="ranking-title" justify="between">
          <h3>{{ $t(`message.invite.rankingList`) }}</h3>
          <router-link class="check" to="ranking">{{ $t(`message.invite.checkDetails`) }} <span></span></router-link>
        </st-row>
        <st-row class="ranking-content" justify="between">
          <st-row class="ranking-content1 ranking" direction="column" align="center">
            <div class="head-portrait"></div>
            <div class="competition"></div>
            <p class="phone">
              {{ rankingList.data && rankingList.data.length > 0 ? rankingList.data[0].account : '***' }}
            </p>
            <p>{{ rankingList.data && rankingList.data.length > 0 ? rankingList.data[0].lastMonth : '0' }}
              <span>USDT</span></p>
          </st-row>
          <st-row class="ranking-content2 ranking" direction="column" align="center">
            <div class="head-portrait"></div>
            <div class="competition"></div>
            <p class="phone">
              {{ rankingList.data && rankingList.data.length > 0 ? rankingList.data[1].account : '***' }}
            </p>
            <p>{{ rankingList.data && rankingList.data.length > 0 ? rankingList.data[1].lastMonth : '0' }}
              <span>USDT</span></p>
          </st-row>
          <st-row class="ranking-content3 ranking" direction="column" align="center">
            <div class="head-portrait"></div>
            <div class="competition"></div>
            <p class="phone">
              {{ rankingList.data && rankingList.data.length > 0 ? rankingList.data[2].account : '***' }}
            </p>
            <p>{{ rankingList.data && rankingList.data.length > 0 ? rankingList.data[2].lastMonth : '0' }}
              <span>USDT</span></p>
          </st-row>
        </st-row>
      </st-row>

      <div class="rebateRules">
        <h3>{{ $t(`message.invite.rebateRules`) }}</h3>
        <p><span>1</span>{{ $t(`message.invite.rebateRules1`) }}</p>
        <p><span>2</span>{{ $t(`message.invite.rebateRules2`) }}</p>
        <p><span>3</span>{{ $t(`message.invite.rebateRules3`) }}</p>
        <p><span>4</span>{{ $t(`message.invite.rebateRules4`) }}</p>
        <p><span>5</span>{{ $t(`message.invite.rebateRules5`) }}</p>
        <p><span>6</span>{{ $t(`message.invite.rebateRules6`) }}</p>
        <p style="margin-bottom: 30px;"><span>7</span>{{ $t(`message.invite.rebateRules7`) }}</p>
      </div>
    </st-row>

    <popup :title="$t(`message.invite.downPlaybill`)" :callback="closePopup" :popupWidth="'500px'" v-show="isDownload">
      <div class="download-playbill">
        <img id="img1" ref="thumbnail" :src=imgURL width="160" height="292" alt="">
        <div class="btn">
          <button @click="downloadHaibao">{{ $t(`message.invite.downLocal`) }}</button>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import UserNav from '../../../components/users/user-nav'
  import apiConfig from '../../../../myConfig/api.config'
  import qrcode from 'qrcode'
  import InviteRecord from '../../../components/users/invite-record'
  import UsersApi from '../../../assets/js/api/userApi'
  import AgentApi from '../../../assets/js/api/agentApi'
  import Popup from '../../../components/common/popup'

  export default {
    // middleware: ['auth'],
    name: 'users-invite',
    components: {
      UserNav,
      InviteRecord,
      Popup
    },
    // async asyncData ({route}) {
    //   let page = route.query.page || 1
    //   const initData = [
    //     UsersApi.getInvitedCount(),
    //     AgentApi.commissionConvert(),
    //     AgentApi.rankingList()
    //   ]
    //   let [count, poolCount, rankingList] = await Promise.all(initData)
    //     .catch((e) => {
    //       console.log(e)
    //     })
    //   return {
    //     count: count.data.count,
    //     poolCount: poolCount || {},
    //     rankingList: rankingList.result
    //   }
    // },
    data() {
      return {
        count: '',
        poolCount: '',
        rankingList: {},
        apiConfig,
        isDownload: false,
        imgURL: require('../../../assets/images/invite/playbill_cn.png'),
        qrcodeURL: ''
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      },
      shareId() {
        // 生产环境删除内网ip
        return `${this.apiConfig.mainDomain}shareregister/?shareid=${this.userInfo.encryptUserId}`
        // return `${'http://192.168.200.105/'}shareregister/?shareid=${this.userInfo.encryptUserId}`
        // return `${'http://192.168.3.69/'}?shareid=${this.userInfo.encryptUserId}`
      }
    },
    watch: {
      '$i18n.locale'() {
        this.i18Playbill()
      }
    },
    methods: {
      createQr() {
        let potions = {
          width: 84,
          margin: 1,
          color: {
            dark: '#22288A'
          }
        }
        var canvas = document.getElementById('canvas')
        qrcode.toCanvas(this.$refs.canvas, this.shareId, potions, function (error) {
          if (error) {
            console.error(error)
          }
        })
        this.qrcodeURL = canvas.toDataURL('image/png')
      },
      createImg() {
        var haibao = document.getElementById('poster')
        var canvas = document.getElementById('mycanvas')
        var ctx = canvas.getContext('2d')
        ctx.rect(0, 0, 750, 1334)
        ctx.fillStyle = '#fff'
        ctx.fill()
        var img = document.getElementById('img')
        img.setAttribute('crossOrigin', 'Anonymous')
        var img2 = new Image()
        img2.setAttribute('crossOrigin', 'anonymous')
        img2.src = this.imgURL
        var _this = this
        img2.onload = function () {
          ctx.drawImage(img2, 0, 0, 750, 1334)
          ctx.drawImage(img, 584, 1168, 116, 116)
          _this.imgURL = canvas.toDataURL()
        }

        var img1 = document.getElementById('img1')
        img1.src = this.imgURL
        haibao.src = this.imgURL
      },
      downloadHaibao() {
        var a = document.createElement('a')
        setTimeout(() => {
          a.href = this.imgURL
          a.download = '58coin'
          a.click()
          this.isDownload = false
        }, 500)
      },
      // 关闭弹窗
      closePopup() {
        this.isDownload = false
      },
      // 打开弹窗
      openPopup() {
        this.isDownload = true
        this.createImg()
      },
      copy() {
        let shareId = this.$refs['shareId'] // 要复制文字的节点
        shareId.select() // 选择对象
        document.execCommand('copy') // 执行浏览器复制命令
        this.$toast(this.$t(`message.users.copySuccessful`))
      },
      // 跳转到详情页
      detail() {
        window.location.href = `${this.apiConfig.userDomain}users/invite/invite-detail`
      },
      // 跳转返佣折合
      convert() {
        window.location.href = `${this.apiConfig.userDomain}users/invite/invite-detail?type=commission`
      },
      i18Playbill() {
        if (this.$i18n.locale === 'cn') {
          // AgentApi.getPosters('zh')
          //   .then(res => {
          //     // console.log(typeof (res.data[0]))
          //     let picUrl = res.data[0]
          //     // console.log(picUrl)
          //     let picUrl1 = picUrl.picUrl
          //     console.log(picUrl1)
          //     if (res.data) {
          //       this.imgURL = picUrl1
          //     }
          //   })
          //   .catch(er => {
          //     console.log(er)
          //   })
          this.imgURL = require('../../../assets/images/invite/playbill_cn.png')
        }
        if (this.$i18n.locale === 'en') {
          // AgentApi.getPosters('en')
          //   .then(res => {
          //     // console.log(typeof (res.data[0]))
          //     let picUrl = res.data[0]
          //     // console.log(picUrl)
          //     let picUrl1 = picUrl.picUrl
          //     // console.log(picUrl1)
          //     if (res.data) {
          //       this.imgURL = picUrl1
          //     }
          //   })
          //   .catch(er => {
          //     console.log(er)
          //   })
          this.imgURL = require('../../../assets/images/invite/playbill_en.png')
        }
        if (this.$i18n.locale === 'ja') {
          // AgentApi.getPosters('ja')
          //   .then(res => {
          //     // console.log(typeof (res.data[0]))
          //     let picUrl = res.data[0]
          //     // console.log(picUrl)
          //     let picUrl1 = picUrl.picUrl
          //     // console.log(picUrl1)
          //     if (res.data) {
          //       this.imgURL = picUrl1
          //     }
          //   })
          //   .catch(er => {
          //     console.log(er)
          //   })
          this.imgURL = require('../../../assets/images/invite/playbill_ja.png')
        }
        if (this.$i18n.locale === 'ko') {
          // AgentApi.getPosters('ko')
          //   .then(res => {
          //     // console.log(typeof (res.data[0]))
          //     let picUrl = res.data[0]
          //     // console.log(picUrl)
          //     let picUrl1 = picUrl.picUrl
          //     // console.log(picUrl1)
          //     if (res.data) {
          //       this.imgURL = picUrl1
          //     }
          //   })
          //   .catch(er => {
          //     console.log(er)
          //   })
          this.imgURL = require('../../../assets/images/invite/playbill_ko.png')
        }
        if (this.$i18n.locale === 'ru') {
          // AgentApi.getPosters('ru')
          //   .then(res => {
          //     // console.log(typeof (res.data[0]))
          //     let picUrl = res.data[0]
          //     // console.log(picUrl)
          //     let picUrl1 = picUrl.picUrl
          //     // console.log(picUrl1)
          //     if (res.data) {
          //       this.imgURL = picUrl1
          //     }
          //   })
          //   .catch(er => {
          //     console.log(er)
          //   })
          this.imgURL = require('../../../assets/images/invite/playbill_ru.png')
        }
      },
      getInvitedCount() {
        let _this = this
        UsersApi.getInvitedCount()
          .then(res => {
            _this.count = res.data.count || ''
          })
          .catch(e => {
            console.log(e)
          })
        AgentApi.commissionConvert()
          .then(res => {
            _this.poolCount = res.result.data.poolCount || ''
          })
          .catch(e => {
            console.log(e)
          })
        AgentApi.rankingList()
          .then(res => {
            _this.rankingList = res.result || {}
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    mounted() {

    },
    updated() {
      this.createQr()
    },
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
      this.i18Playbill()
      this.getInvitedCount()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";

  .users-invite {
    margin: -11px auto -21px;
    .content {
      width: 1160px;
      background: #fff;
      .header {
        width: 100%;
        height: 354px;
        background: url('../../../assets/images/invite/header.png') no-repeat;
        background-size: 100% 100%;
        h2 {
          margin: 40px 0 20px;
          font-size: 30px;
          color: #FFFFFF;
        }
        .step {
          .step-content {
            .captions {
              width: 78px;
              height: 57px;
              margin: 0 auto 6px;
            }
            p {
              font-size: 12px;
              font-weight: 200;
              color: #C1CDFF;
            }
          }
          .boult {
            width: 82px;
            height: 16px;
            margin: 0 30px 0;
            background: url('../../../assets/images/invite/boult.png') no-repeat;
            background-size: 100% 100%;
          }
          .step-content1 {
            .captions {
              background: url('../../../assets/images/invite/1.png') no-repeat;
              background-size: 100% 100%;
            }
          }
          .step-content2 {
            .captions {
              background: url('../../../assets/images/invite/2.png') no-repeat;
              background-size: 100% 100%;
            }
          }
          .step-content3 {
            .captions {
              background: url('../../../assets/images/invite/3.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .share-link {
          /*width: 600px;*/
          height: 40px;
          margin-top: 20px;
          background: #4B4EAC;
          border-radius: 3px;
          p {
            width: 482px;
            height: 40px;
            padding-left: 12px;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 200;
            color: #FFFFFF;
          }
          #shareId {
            position: absolute;
            left: 0;
            top: -10000px;
          }
          .copy {
            /*width: 118px;*/
            height: 40px;
            padding: 0 17px 0;
            background: #5B5FD3;
            border-radius: 0 3px 3px 0;
            line-height: 40px;
            font-size: 14px;
            color: #fff;
            text-align: center;
          }
        }
        .download {
          width: 600px;
          margin-top: 10px;
          .wx {
            margin: 0 25px 0 14px;
            position: relative;
            cursor: pointer;
            .wx-icon {
              width: 18px;
              height: 14px;
              margin-right: 6px;
              background: url('../../../assets/images/invite/wx.png') no-repeat;
              background-size: 100% 100%;
              z-index: 2;
            }
            p {
              font-size: 12px;
              font-weight: 200;
              color: #E3E4FF;
              z-index: 2;
            }
            &:hover {
              .wxCode {
                display: block;
              }
            }
            .wxCode {
              display: none;
              width: 100px;
              height: 120px;
              position: absolute;
              left: -14px;
              top: -5px;
              background: #585DE6;
              border-radius: 3px;
              canvas {
                margin: 28px 8px 0;
              }
            }
            .en {
              width: 135px;
              canvas {
                margin: 28px 26px 0;
              }
            }
            .ko {
              width: 115px;
              canvas {
                margin: 28px 15px 0;
              }
            }
            .ja {
              width: 125px;
              canvas {
                margin: 28px 21px 0;
              }
            }
            .ru {
              width: 170px;
              canvas {
                margin: 28px 42px 0;
              }
            }
          }
          .wx.en {
            margin: 0 25px 0 8px;
          }
          .wx.ko {
            margin: 0 25px 0 29px;
          }
          .wx.ja {
            margin: 0 25px 0 -14px;
          }
          .wx.ru {
            margin: 0 25px 0 -23px;
          }
          .playbill {
            cursor: pointer;
            position: relative;
            .playbill-icon {
              width: 14px;
              height: 14px;
              margin-right: 6px;
              background: url('../../../assets/images/invite/download.png') no-repeat;
              background-size: 100% 100%;
            }
            p {
              font-size: 12px;
              font-weight: 200;
              color: #E3E4FF;
            }
            .poster {
              display: none;
              position: absolute;
              left: 0;
              top: 30px;
              broder: 1px solid red;
            }
          }
        }
      }
      .invite {
        width: 100%;
        height: 130px;
        .invite-content {
          width: 520px;
          height: 130px;
          margin-top: -65px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          box-shadow: 0 2px 20px 0 rgba(140, 142, 249, 0.07);
          border-radius: 6px;
          cursor: pointer;
          border: 1px solid #FFFFFF;
          .details {
            margin-left: 50px;
            .picture {
              width: 103px;
              height: 96px;
              /*margin-right: 55px;*/
            }
            .figure {
              text-align: left;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              font-size: 30px;
              color: #24324C;
            }
            .character {
              font-size: 14px;
              font-weight: 200;
              /*text-indent:2em;*/
              text-align: left;
              color: #94A1B9;
            }
          }
          .arrows {
            width: 10px;
            height: 18px;
            margin-right: 20px;
            background: url('../../../assets/images/invite/PathCopy.png') no-repeat;
            background-size: 100% 100%;
          }
          &:hover {
            box-sizing: border-box;
            border: 1px solid #E6E8FF;
            box-shadow: 0 10px 20px 0 rgba(140, 142, 249, .1);
          }
        }
        .rebate {
          .picture {
            background: url('../../../assets/images/invite/Group21.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        .convert {
          .picture {
            background: url('../../../assets/images/invite/Group12.png') no-repeat;
            background-size: 100% 100%;
          }
        }

      }
      .rankingList {
        width: 1040px;
        height: 230px;
        margin: -35px auto 67px;
        .ranking-title {
          width: 1040px;
          h3 {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #667AA0;
          }
          .check {
            font-size: 12px;
            font-weight: 200;
            color: #4B7DDC;
            span {
              display: inline-block;
              width: 5px;
              height: 8px;
              margin-left: 2px;
              background: url('../../../assets/images/invite/path.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .ranking-content {
          width: 100%;
          margin-top: 51px;
          .ranking {
            width: 340px;
            height: 160px;
            border: 1px solid #ECF0F7;
            border-radius: 6px;
            .head-portrait {
              width: 64px;
              height: 80px;
              margin-top: -30px;
            }
            .competition {
              width: 55px;
              height: 25px;
              margin: 10px 0 10px;
            }
            .phone {
              font-size: 16px;
              font-weight: 200;
              color: #94A1B9;
            }
            p {
              font-size: 20px;
              font-weight: 200;
              color: #000;
              span {
                font-size: 15px;
                font-weight: 200;
                color: #94A1B9;
              }
            }
            &:hover {
              /*border: 1px solid #ECF0F7;*/
              /*border-image: linear-gradient(360deg, #00ABFF , #D3A570) 10 10;*/
              box-shadow: 0 2px 10px 0 #D3A570;
            }
          }
          .ranking-content1 {
            .head-portrait {
              background: url('../../../assets/images/invite/first.png') no-repeat;
              background-size: 100% 100%;
            }
            .competition {
              background: url('../../../assets/images/invite/no1.png') no-repeat;
              background-size: 100% 100%;
            }
          }
          .ranking-content2 {
            .head-portrait {
              background: url('../../../assets/images/invite/second.png') no-repeat;
              background-size: 100% 100%;
            }
            .competition {
              background: url('../../../assets/images/invite/no2.png') no-repeat;
              background-size: 100% 100%;
            }
          }
          .ranking-content3 {
            .head-portrait {
              background: url('../../../assets/images/invite/third.png') no-repeat;
              background-size: 100% 100%;
            }
            .competition {
              background: url('../../../assets/images/invite/no3.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .rebateRules {
        margin-top: -37px;
        h3 {
          margin: 0 0 20px 60px;
          /*font-family: PingFangSC-Medium;*/
          font-size: 16px;
          color: #667AA0;
        }
        p {
          margin: 0 0 14px 63px;
          font-family: PingFangSC-Regular;
          /*font-weight: 200;*/
          font-size: 14px;
          color: #24324C;
          span {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 14px;
            background: #EEF0FF;
            text-align: center;
            line-height: 14px;
            font-family: Helvetica;
            font-size: 12px;
            color: #94A1B9;
            border-radius: 1px;
          }
        }
      }
    }
    .download-playbill {
      width: 500px;
      #img1 {
        /*width: 160px;*/
        /*height: 292px;*/
        margin: 20px auto;
      }
      .btn {
        width: 500px;
        height: 60px;
        margin-bottom: -40px;
        background: #F5F6FA;
        text-align: center;
        button {
          /*width: 92px;*/
          height: 30px;
          margin: 15px auto;
          padding: 0 16px 0;
          background: #4B7DDC;
          border: none;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 200;
          color: #FFFFFF;
          cursor: pointer;
        }
      }
    }
  }
</style>
