<template>
  <section class="container users-auth-two">
    <div class="info">
      <st-row class="info-img" justify="between">
        <div class="item">
          <div><img ref="imgShow1" src="../../../../assets/images/zheng.png" alt=""></div>
          <p>{{$t('message.users.cartPositive')}}</p>
          <div @click="selImg='imgShow1'" class="upload"
               :style="$i18n.locale === 'ru' ? 'width: 90px;' : 'width: 60px;'">
            <upload :beforeUpload="beforeUpload" k='range1' :range="range" :afterUpload="upload"
                    @fileName="fileName"></upload>
            <div class="range" ref="range1"></div>
            <a :style="$i18n.locale === 'ru' ? 'width: 90px;' : 'width: 60px;'">{{$t('message.users.upload')}}</a>
          </div>
        </div>
        <div class="item">
          <div><img ref="imgShow2" src="../../../../assets/images/fan.png" alt=""></div>
          <p>{{$t('message.users.cartReverse')}}</p>
          <div @click="selImg='imgShow2'" class="upload"
               :style="$i18n.locale === 'ru' ? 'width: 90px;' : 'width: 60px;'">
            <upload :beforeUpload="beforeUpload" k='range2' :range="range" :afterUpload="upload"
                    @fileName="fileName"></upload>
            <div class="range" ref="range2"></div>
            <a :style="$i18n.locale === 'ru' ? 'width: 90px;' : 'width: 60px;'">{{$t('message.users.upload')}}</a>
          </div>
        </div>
        <div class="item">
          <div><img ref="imgShow3" src="../../../../assets/images/heying.png" alt=""></div>
          <p>{{$t('message.users.handCart')}}</p>
          <div @click="selImg='imgShow3'" class="upload"
               :style="$i18n.locale === 'ru' ? 'width: 90px;' : 'width: 60px;'">
            <upload :beforeUpload="beforeUpload" :afterUpload="upload" k='range3' :range="range"
                    @fileName="fileName"></upload>
            <div class="range" ref="range3"></div>
            <a :style="$i18n.locale === 'ru' ? 'width: 90px;' : 'width: 60px;'">{{$t('message.users.upload')}}</a>
          </div>
        </div>
      </st-row>
      <st-row justify="center" class="submit">
        <p class="error-tip" v-if="highAuthError" style="margin: 6px 0 -35px 0;">{{ highAuthError }}</p>
        <a class="sub" :class="{btnOne: isBtnOne}" @click="idCardVerify">{{$t('message.users.push')}}</a>
      </st-row>
    </div>
  </section>
</template>

<script>
  import checkMsg from '../../../../assets/js/errorMessage'
  import Captcha from '../../../../components/st-ui/src/captcha'
  import Upload from '../../../../components/common/upload'
  import UserApi from '../../../../assets/js/api/userApi'
  import Vue from 'vue'

  export default {
    components: {
      Captcha,
      Upload
    },
    // async fetch({store, redirect}) {
    //   if (store.state.user.userInfo.highAuth) redirect('/')
    //   const res = await UserApi.userPersonalInfo()
    //     .catch((e) => {
    //       console.log(e)
    //     })
    //   if (res.data.info) {
    //     if (res.data.info.picAuthStatus === Vue.$dictionary.userPersonalInfo.AUTH_PASS || res.data.info.picAuthStatus === Vue.$dictionary.userPersonalInfo.WAITING_AUTH) {
    //       redirect('/users')
    //     }
    //   }
    // },
    name: 'users-auth-high',
    data() {
      return {
        isBtnOne: false,
        highAuthError: '',
        AddFileName: '',
        FileName: [],
        selImg: ''
      }
    },
    methods: {
      getShow(number) {
        this.selImg = 'imgShow' + number
      },
      upload(e) {
        let reader = new FileReader()
        let that = this
        reader.onload = function (event) {
          that.$refs[that.selImg].src = event.target.result
        }
        reader.readAsDataURL(e.target.files[0])
      },
      range(display, height, k) {
        this.$refs[k].style.display = display
        this.$refs[k].style.height = height
      },
      beforeUpload(file) {
        if (file.size > 6 * 1024 * 1024) {
          return false
        } else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          return false
        } else {
          return true
        }
      },
      fileName(fileName, num) {
        this.FileName[num.replace('range', '') - 1] = fileName
        this.highAuthError = checkMsg.checkHighAuth(fileName, this.highAuthError, this)
      },
      idCardVerify() {
        this.highAuthError = checkMsg.verifyHighAuth(this.FileName[0], this.FileName[1], this.FileName[2], this)
        if (this.highAuthError) {
          return false
        }
        this.AddFileName = this.FileName.join() // this.FileName[0] + ',' + this.FileName[1] + ',' + this.FileName[2]
        if (this.isBtnOne) {
          return
        } else {
          this.isBtnOne = true
        }
        this.usersApi.idCardPicVerify(this.AddFileName)
          .then(() => {
            return this.$store.dispatch('getUserInfo')
          })
          .then(() => {
            this.$toast(this.$t('message.users.submitSuccess'))
            this.$router.replace('/users')
          })
          .catch(er => {
            this.isBtnOne = false
          })
      }
    },
    created() {
      if (this.$store.state.manage.userInfo.highAuth) {
        this.$router.push({
          path: '/users'
        })
      }
      UserApi.userPersonalInfo()
        .then(res => {
          if (res.data.info) {
            if (res.data.info.picAuthStatus === Vue.$dictionary.userPersonalInfo.AUTH_PASS || res.data.info.picAuthStatus === Vue.$dictionary.userPersonalInfo.WAITING_AUTH) {
              this.$router.push({
                path: '/users'
              })
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/theme.less";

  .users-auth-two {
    .info {
      margin-top: 20px;
      padding: 0 20px;
      width: 1220px;
      background-color: #fff;
      .item {
        position: relative;
      }
      .info-img {
        padding: 60px 0;
        .item {
          div {
            img {
              width: 260px;
              height: 148px;
              /*max-width: 260px;*/
              /*max-height: 148px;*/
            }
          }
          p {
            height: 52px;
            line-height: 52px;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
          .upload {
            margin: 0 auto;
            width: 60px;
            height: 32px;
            a {
              display: block;
              width: 60px;
              height: 32px;
              border: 1px solid #597ab9;
              color: #597ab9;
              line-height: 32px;
              text-align: center;
              .border-radius();
            }
            &:hover {
              a {
                background-color: #597ab9;
                color: #fff;
              }
            }
            .range {
              display: none;
              position: absolute;
              top: 0;
              left: -1px;
              width: 260px;
              height: 148px;
              background: rgba(1, 1, 1, 0.5);
            }
          }
        }
      }
      .submit {
        a {
          width: 358px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 16px;
          color: #fff;
          background-color: #597ab9;
          &:hover {
            background-color: #4a6dae;
          }
          &.btnOne {
            background-color: #ebebeb;
            color: #888;
          }
        }
      }
    }
  }
</style>
