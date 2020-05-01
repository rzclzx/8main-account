<template>
  <st-form v-model="dataForm" :rules="rules" @submit="realNameVerify">
    <st-form-item :label="$t('message.users.choseCountry')">
      <st-select :initText="initText" v-model="dataForm.country" @onSelect="selectItem">
        <st-option v-for="item in countryData" :key="item.id" :value="item.id"
                   :label="item[countryName] || item.nameCh"></st-option>
      </st-select>
    </st-form-item>
    <st-form-item
      :label="$t('message.users.name')"
      ruleName="realName"
      lineHeight="12px"
      marginBottom="8px"
      :tips="$t('message.users.authTips1')"
    >
      <st-input type="text"
                :maxLength="20"
                :placeHolder="$t('message.promptInformation.inputName')"
                v-model="dataForm.realName"/>
      <!-- <p class="tips">请务必使用真实本人姓名及身份证号，一旦认证成功不可再次修改</p> -->
    </st-form-item>
    <st-form-item :label="$t('message.users.idCard')" v-if="dataForm.country !== 211">
      <st-input type="text" :placeHolder="$t('message.promptInformation.licenseNumber')" v-model="dataForm.idCard"/>
    </st-form-item>
    <st-form-item :label="$t('message.users.idCard')" ruleName="idCard" v-else>
      <st-input type="text" :maxLength="18" :placeHolder="$t('message.promptInformation.licenseNumber')"
                v-model="dataForm.idCard"/>
    </st-form-item>
    <div v-show="showCaptcha" style="width: 350px; margin: -30px 0 10px 0">
      <captcha :purpose="purpose" :ticketType="ticketType" :callback="closeCaptcha" :countDown="countDown"></captcha>
      <!--<count-down-->
      <!--class="code"-->
      <!--:ticketType="ticketType"-->
      <!--:purpose='purpose'-->
      <!--:ticket="ticket"-->
      <!--/>-->
    </div>
    <input type="submit" :value="$t('message.users.authorize')"/>
  </st-form>
</template>

<script>
  import checkMsg from '../../../../assets/js/errorMessage'
  import Captcha from '../../../../components/st-ui/src/captcha'

  export default {
    components: {Captcha},
    // async asyncData({store, redirect}) {
    //   if (store.state.user.userInfo.baseAuth) redirect('/')
    // },
    name: 'users-fund-change-form',
    data() {
      return {
        showCaptcha: false,
        purpose: 39,
        ticketType: 'idTicket',
        initText: this.$t('message.users.china'), // 传入组件的默认值
        countryData: [],
        dataForm: {
          country: 211,
          realName: '',
          idCard: ''
        },
        rules: {
          realName: [
            {required: true, message: this.$t('message.promptInformation.inputName')}
          ],
          idCard: [
            {required: true, message: this.$t('message.promptInformation.licenseNumber')},
            {
              validator: value => {
                if (!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value))) {
                  return false
                } else {
                  return true
                }
              },
              message: this.$t('message.promptInformation.idNumberFormatError')
            },
            {
              validator: value => {
                if (!(/^[a-z0-9]+$/i).test(value)) {
                  return false
                } else {
                  return true
                }
              },
              message: this.$t('message.promptInformation.licenseNumberError')
            },
            {
              validator: value => {
                return checkMsg.isIdCard(value, this)
              },
              message: this.$t('message.promptInformation.validIdNumber')
            }
          ]
        },
        limits: {},
        submitStatus: false
      }
    },
    computed: {
      countryName() {
        return this.$i18n.locale === 'cn' ? 'nameCh' : `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
      },
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    methods: {
      // 从组件中获得选择的国家
      getSelectData(obj) {
        this.formData.country = obj.id
        this.defaultString = obj.name
      },
      // 获取国家列表
      getListCountry() {
        this.usersApi.listCountry()
          .then(res => {
            this.countryData = res.data.countryList
          })
      },
      selectItem(id, name) {
        this.dataForm.country = id
      },
      closeCaptcha(bool) {
        // if (bool) {
        //   this.realNameVerify()
        // }
        // this.showCaptcha = false
        // this.$store.commit('SAVE_TICKET', {
        //   type: 'idTicket',
        //   ticket: ''
        // })
      },
      countDown() {
      },
      realNameVerify() {
        if (this.submitStatus) return false
        this.submitStatus = true
        this.usersApi.realNameVerify(this.dataForm, this.ticket)
          .then((res) => {
            this.$store.dispatch('getUserInfo')
          })
          .then(() => {
            this.$store.commit('SET_SUCCESSIVE', {successive: true})
            this.$router.push({
              name: 'users-info-auth-success'
            })
            this.$store.commit('SAVE_TICKET', {
              type: 'idTicket',
              ticket: ''
            })
          })
          .catch(error => {
            this.submitStatus = false
            if (error.data.code === 112) {
              this.$store.commit('SAVE_TICKET', {
                type: 'idTicket',
                ticket: error.data.ticket
              })
              this.showCaptcha = true
              return
            }
            this.$toast(this.$dictionary.error(error.data.code))
          })
      }
    },
    mounted() {
      this.getListCountry()
    },
    created() {
      if (this.$store.state.manage.userInfo.baseAuth) {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/theme.less";

  .st-form {
    margin: 70px 0 0 442px;
    .item-name {
      margin-bottom: 40px;
      p {
        position: absolute;
        top: 44px;
        font-size: 12px;
        color: #999;
      }
    }
    .tips {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      color: #999;
    }
  }
</style>
