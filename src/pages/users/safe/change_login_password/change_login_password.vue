<template>
  <st-form v-model="dataForm" :rules="rules" @submit="modifyLoginPassword">
    <!-- 原始密码 -->
    <st-form-item
      limitName="password"
      ruleName="password"
      :label="$t('message.users.originalLoginPassword')"
    >
      <st-input
        type="password"
        v-model="dataForm.password"
        :placeholder="$t('message.users.enterOriginalLoginPassword')"
      />
    </st-form-item>
    <!-- 设置新密码 -->
    <st-form-item
      limitName="password"
      ruleName="password"
      :label="$t('message.users.setNewLoginPassword')"
    >
      <st-input
        type="password"
        v-model="dataForm.newPassword"
        :placeholder="$t('message.users.enterNewLoginPassword')"
      />
    </st-form-item>
    <!-- 重复新密码 -->
    <st-form-item
      limitName="password"
      ruleName="confirmPassword"
      :label="$t('message.users.repeatNewLoginPassword')"
    >
      <st-input
        type="password"
        v-model="dataForm.confirmPassword"
        :placeholder="$t('message.users.repeatEnterNewLoginPassword')"
      />
    </st-form-item>
    <!-- 提交 -->
    <input type="submit" :value="$t('message.users.confirm')"/>
  </st-form>
</template>

<script>
  import Cookie from '../../../../../myConfig/cookie'
  import ApiConfig from '../../../../../myConfig/api.config'

  export default {
    name: 'test-form',
    components: {},
    data() {
      return {
        purpose: this.$dictionary.purpose.modifyLoginPassword,
        ticketType: 'modifyPasswordTicket',
        dataForm: {
          password: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          password: [
            {required: true, message: this.$t('message.errorMessage.oldPwd')},
            {
              validator: value => {
                if (value.length < 8 || value.length > 20) {
                  return false
                }
                return true
              },
              message: this.$t('message.errorMessage.pwd')
            }
          ],
          confirmPassword: [
            {required: true, message: this.$t('message.errorMessage.confirmPassword')},
            {
              validator: value => {
                if (value !== this.dataForm.newPassword) return false
                else {
                  return true
                }
              },
              message: this.$t('message.errorMessage.re-enter')
            }
          ]
        }
      }
    },
    computed: {
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    methods: {
      modifyLoginPassword() {
        this.usersApi.verifyLoginPwd(this.purpose, this.dataForm.password, this.ticket)
          .then((res) => {
            return this.$store.commit('SAVE_TICKET', {
              type: this.ticketType,
              ticket: res.data.ticket
            })
          })
          .then(() => {
            return this.usersApi.modifyLoginPwd(this.ticket, this.dataForm.newPassword)
          })
          .then(() => {
            return this.$store.commit('SAVE_TICKET', {
              type: this.ticketType,
              ticket: ''
            })
          })
          .then(() => {
            this.$toast(this.$t('message.errorMessage.modifyRegister'))
            Cookie.clearCookie('token', ApiConfig.domain)
            this.$store.commit('SET_COOKIE', {token: null})
            this.$store.commit('SAVE_USER_INFO', {data: null})
            window.location.href = ApiConfig.mainDomain + 'manage/login'
          })
          .catch(error => {
            if (error.code) {
              this.$toast(this.$dictionary.error(error.data.code))
            }
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .st-form {
    margin: 70px 0 0 442px;
  }
</style>
