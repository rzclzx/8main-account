<template>
  <st-row class="user-info" align="center">
    <span class="portrait"></span>
    <div class="content">
      <st-row align="center">
        <template v-if="!this.setNicknameStatus">
          <p class="nickname">{{ userInfo.nickName }}</p>
          <a class="set-nickname" @click="changeSetNicknameStatus(true)">{{ $t(`message.users.setNickname`) }}</a>
        </template>
        <template v-else>
          <input type="text" v-model="nickname"
                 class="nickname-input"
                 ref="nickname"
                 @input="checkNickName($event)"
                 @keyup.13="setNickname()"
          />
          <a class="set-nickname" @click="setNickname">{{ $t(`message.users.confirm`) }}</a>
          <a class="set-nickname" @click="changeSetNicknameStatus(false)">{{ $t(`message.users.cancel`) }}</a>
        </template>
      </st-row>
      <st-row>
        <p class="login">{{ $t(`message.users.lastLoginTime`) }}：{{ userInfo.lastLoginDate ? userInfo.lastLoginDate :
          currentTime | timeFormat }}</p>
        <p class="login">{{ $t(`message.users.lastLoginAddress`) }}：{{ userInfo.lastLoginAddress }}</p>
      </st-row>
    </div>
  </st-row>
</template>

<script>
  export default {
    name: 'user-info',
    data() {
      return {
        setNicknameStatus: false,
        currentTime: '',
        nickname: '',
        maxLength: 11
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.manage.userInfo
      }
    },
    methods: {
      // 检测昵称是否合法
      checkNickName(e) {
        let str = e.target.value
        let realLength = 0
        let len = str.length
        let charCode = -1
        let tt = 0
        for (let i = 0; i < len; i++) {
          charCode = str.charCodeAt(i)
          if (charCode >= 0 && charCode <= 128) {
            realLength += 1
          } else {
            realLength += 2
          }
          if (realLength <= 11) {
            tt++
          }
        }
        if (realLength >= 11) {
          this.bool && (this.maxLength = realLength !== str.length ? tt : 11)
        } else {
          this.maxLength = 11
          this.bool = true
        }
      },
      changeSetNicknameStatus(bool) {
        this.setNicknameStatus = bool
        this.$nextTick(() => {
          if (bool) {
            this.$refs['nickname'].focus()
          } else {
            this.nickname = ''
          }
        })
      },
      setNickname() {
        if (this.nickname.length < 2) {
          if (this.nickname.charCodeAt(0) >= 0 && this.nickname.charCodeAt(0) <= 128) {
            this.nickname = ''
            this.setNicknameStatus = false
          } else {
            if (this.nickname) {
              this.usersApi.setNickname(this.nickname)
                .then((res) => {
                  this.$store.dispatch('getUserInfo')
                })
                .catch(error => {
                  console.log(error)
                })
            }
            this.nickname = ''
            this.setNicknameStatus = false
          }
        } else {
          this.nickname = this.nickname.slice(0, this.maxLength)
          if (this.nickname) {
            this.usersApi.setNickname(this.nickname)
              .then((res) => {
                this.$store.dispatch('getUserInfo')
              })
              .catch(error => {
                console.log(error.message)
              })
          }
          this.nickname = ''
          this.setNicknameStatus = false
        }
//        if (!this.nickname) {
//          console.log('请填写用户昵称')
//          return false
//        }
//        this.usersApi.setNickname(this.nickname)
//          .then(res => {
//            this.changeSetNicknameStatus(false)
//            return res
//          })
//          .then(res => {
//            this.$store.dispatch('getUserInfo')
//          })
      }
    },
    created() {
      this.currentTime = new Date()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .user-info {
    border-bottom: 2px solid @borderColor;
    padding: 27px 0 27px 20px;
    .portrait {
      display: block;
      width: 66px;
      height: 66px;
      background: url(../../assets/images/icon-portrait.png) center no-repeat;
    }
    .content {
      margin-left: 32px;
      .nickname {
        line-height: 30px;
        font-size: 18px;
      }
      .set-nickname {
        margin-left: 18px;
        font-size: 14px;
        color: @linkColor;
        &:hover {
          color: #1e2266;
        }
      }
      .nickname-input {
        display: block;
        width: 130px;
        height: 30px;
        .border-radius(@radius: 3px);
        padding-left: 10px;
        background: #f5f6fa;
      }
      .login {
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        color: @tipColor;
        &:last-child {
          margin-left: 12px;
        }
      }
    }
  }
</style>
