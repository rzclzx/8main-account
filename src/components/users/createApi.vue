<template>
  <st-form v-model="dataForm" :rules="rules" @submit="create">
    <st-form-item
      ruleName="apiName"
      :label="$t(`message.users.apiRemarks`)"
    >
      <st-input
        type="text"
        v-model="dataForm.apiName"
        :placeholder="$t(`message.users.inputRemark`)"
        :autofocus="true"
      />
    </st-form-item>
    <st-form-item
      :label="$t(`message.users.ipWhitelist`)"
    >
      <textarea v-model="dataForm.ipList"></textarea>
      <p class="create-ip-tip">{{ $t(`message.users.tips5`) }}</p>
    </st-form-item>
    <st-form-item class="count-down-wrapper"
                  ruleName="SMSCode"
                  :label="this.$t('message.users.SMSCode')"
                  v-if="twiceMobileAuth"
                  style="margin-top: 10px"
    >
      <st-input
        type="number"
        :maxLength="6"
        v-model="dataForm.SMSCode"
        :limits="limits.SMSCode"
        :placeholder="$t('message.users.enterSMSCode')"
        style="width: 200px;"
      />
      <count-down
        class="code"
        :ticketType="ticketType"
        :purpose='purpose'
        :ticket="ticket"
      />
    </st-form-item>
    <st-form-item
      ruleName="googleCode"
      :label="$t('message.users.googleCode')"
      v-if="twiceGoogleAuth"
    >
      <google-code v-model="dataForm.googleCode"/>
    </st-form-item>
    <!-- 提交 -->
    <input type="submit" style="margin-left: 210px"
           :value="this.id ? this.$t(`message.users.modify`) : this.$t(`message.users.create`)"/>
  </st-form>
</template>

<script>
  import CountDown from '../st-ui'

  export default {
    name: 'createApi',
    components: {
      CountDown
    },
    props: ['theme', 'id'],
    computed: {
      purpose() {
        return this.id ? this.$dictionary.purpose.modifyAPI : this.$dictionary.purpose.createAPI
      },
      ticketType() {
        return this.id ? this.$dictionary.ticketType.modifyApiTicket : this.$dictionary.ticketType.createApiTicket
      },
      ticket() {
        return this.$store.state.ticket[this.ticketType]
      },
      twiceMobileAuth() {
        return this.$store.state.manage.userInfo.twiceMobileAuth
      },
      twiceGoogleAuth() {
        return this.$store.state.manage.userInfo.twiceGoogleAuth
      }
    },
    data() {
      return {
        buttonStatus: true,
        dataForm: {
          ipList: '',
          apiName: '',
          SMSCode: '',
          googleCode: ''
        },
        rules: {
          apiName: [
            {required: true, message: this.$t(`message.users.inputRemarks`)}
          ],
          SMSCode: this.$rules.SMSCode(this.id ? 'modifyApiTicket' : 'createApiTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          SMSCode: this.$limits.SMSCode()
        }
      }
    },
    methods: {
      create() {
        if (this.buttonStatus) {
          this.buttonStatus = false
        } else {
          return false
        }
        // 根据有无id判断是创建API还是修改API
        if (this.id) {
          this.$store.dispatch('twiceVerify', {
            code: this.dataForm.SMSCode,
            googleCode: this.dataForm.googleCode,
            ticket: this.ticket,
            purpose: this.purpose,
            ticketType: this.ticketType
          })
            .then(() => {
              this.usersApi.modifyAPI(this.ticket, this.id, this.dataForm.apiName, this.dataForm.ipList)
                .then(() => {
                  this.$store.commit('SAVE_TICKET', {
                    type: this.ticketType,
                    ticket: ''
                  })
                  this.$emit('modify')
                  this.buttonStatus = true
                  this.$emit('close')
                })
            })
            .catch(error => {
              this.dataForm.SMSCode = ''
              console.log(error)
              this.buttonStatus = true
            })
        } else {
          this.$store.dispatch('twiceVerify', {
            code: this.dataForm.SMSCode,
            googleCode: this.dataForm.googleCode,
            ticket: this.ticket,
            purpose: this.purpose,
            ticketType: this.ticketType
          })
            .then(() => {
              this.usersApi.createAPI(this.ticket, this.dataForm.apiName, this.dataForm.ipList)
                .then(() => {
                  this.$store.commit('SAVE_TICKET', {
                    type: this.ticketType,
                    ticket: ''
                  })
                  this.$emit('create')
                  this.buttonStatus = true
                  this.$emit('close')
                })
            })
            .catch(error => {
              this.dataForm.SMSCode = ''
              this.buttonStatus = true
              console.log(error)
            })
        }
      }
    },
    mounted() {
      if (this.id) {
        this.usersApi.getAPISimple(this.id)
          .then(res => {
            this.dataForm.apiName = res.data.api.apiName
            let allowIp = res.data.api.allowIp
            let ipList = ''
            allowIp.map(item => {
              ipList += item + ','
            })
            ipList = ipList.substring(0, ipList.length - 1)
            this.dataForm.ipList = ipList
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme.less";

  .st-form {
    margin: 60px 0 30px 0;
    .create-ip-tip {
      width: 558px;
      line-height: 36px;
      font-size: 12px;
      color: #999;
    }
    .st-form-item {
      margin-left: 210px;
      .message {
        line-height: 20px;
      }
      textarea {
        display: block;
        padding: 10px;
        width: 350px;
        height: 128px;
        border: 1px solid @inputColor;
        .border-radius(@radius: 3px);
      }
    }
  }
</style>
