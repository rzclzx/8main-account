<template>
  <div class="container">
    <user-bread :list="breadList"></user-bread>
    <st-content :title="$t(`message.users.changeMobile`)" top="30px" paddingTop="20px">
      <st-prompt>
        <p>{{ $t(`message.users.modifyTips`) }}</p>
      </st-prompt>
      <st-form v-model="dataForm" :rules="rules" @submit="submit">
        <!-- 新手机号 -->
        <st-form-item
          limitName="mobile"
          ruleName="mobile"
          :label="$t('message.users.newMobile')"
        >
          <st-row class="entrust-filter-item" align="center">
            <st-down-selectCountry style="height: 100%;" representative="1" v-model="productId" initValue="211"
                                   @onSelect="selectProductId" :initText="text" padding="2px" inputWidth="60px"
                                   Pwidth="60px" lineHeight="40px" bgposition="center 14px" ulPositionL="84%"
                                   ulPositionT="100%">
              <st-select-option
                v-for="item in product"
                :key="item.id"
                :value="item.id"
                :text="(item[countryName] || item.nameCh) + ' +' + item.code"
              >
              </st-select-option>
            </st-down-selectCountry>
          </st-row>
          <st-input
            type="text"
            v-model="dataForm.mobile"
            :limits="limits.mobile"
            :placeholder="$t('message.users.enterChangeMobile')"
            style="padding: 0 10px 0 70px"
          />
        </st-form-item>
        <!-- 新手机短信验证码 -->
        <st-form-item class="count-down-wrapper"
                      limitName="newSMSCode"
                      ruleName="newSMSCode"
                      :label="$t('message.users.SMSCode')"
        >
          <st-input
            type="number"
            :maxLength="6"
            v-model="dataForm.newSMSCode"
            :limits="limits.newSMSCode"
            :placeholder="$t('message.users.newSMSCode')"
            style="width: 200px;"
          />
          <count-down
            class="code"
            :nation='productId'
            :channel='channel'
            :ticketType="ticketType"
            :purpose='purpose'
            :ticket='ticket'
            :mobile="dataForm.mobile"
            type="changeMobile"
          />
        </st-form-item>
        <!-- 谷歌验证 -->
        <st-form-item
          limitName="googleCode"
          ruleName="googleCode"
          :label="$t('message.users.googleCode')"
          v-if="userInfo.googleBind"
        >
          <google-code v-model="dataForm.googleCode"/>
        </st-form-item>
        <!-- 提交 -->
        <input type="submit" :value="$t('message.users.modify')" v-if="userInfo.googleBind"
               :class="{ continuousClicks: !preventContinuousClicks }"/>
        <input type="submit" :value="$t('message.users.sendEmail')" v-else
               :class="{ continuousClicks: !preventContinuousClicks }"/>
      </st-form>
    </st-content>
  </div>
</template>

<script>
  import StPrompt from '../../../../../components/users/prompt'
  import UserBread from '../../../../../components/users/user-bread'
  import StDownSelectCountry from '../../../../../components/registerSelect/down-select-country'
  import StSelectOption from '../../../../../components/registerSelect/select-option'

  export default {
//    原来已注释
//     async asyncData ({ store, redirect }) {
// //      if (!store.state.ticket['modifyMobileTicket']) redirect('/users/safe/mobile')
// //      if (!store.state.user.userInfo.emailBind && !store.state.user.userInfo.googleBind) redirect('/users/safe')
//     },
    name: 'change-mobile',
    computed: {
      ticket () {
        return this.$store.state.ticket[this.ticketType]
      },
      userInfo () {
        return this.$store.state.manage.userInfo
      },
      countryName () {
        return this.$i18n.locale === 'cn' ? 'nameCh' : `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
      }
    },
    components: {
      StPrompt,
      UserBread,
      StSelectOption,
      StDownSelectCountry
    },
    data () {
      return {
        text: '',
        product: [],
        productId: 211,
        channel: 1,
        breadList: [
          {
            name: this.$t(`message.users.userSafe`),
            link: '/users/safe'
          },
          {
            name: this.$t(`message.users.changeMobile`)
          }
        ],
        dataForm: {
          mobile: '',
          newSMSCode: '',
          googleCode: ''
        },
        rules: {
          mobile: [
            {required: true, message: this.$t(`message.register.error1`)},
            {
              validator: value => {
                if (this.productId === 211) {
                  if (!(/^\d{11}$/.test(value))) return false
                  else {
                    return true
                  }
                } else {
                  if (!(/^\d{1,16}$/.test(value))) return false
                  else {
                    return true
                  }
                }
              },
              message: this.$t(`message.register.error2`)
            }
          ],
          newSMSCode: this.$rules.SMSCode('modifyMobileTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          mobile: this.$limits.mobile(),
          newSMSCode: this.$limits.SMSCode()
        },
        preventContinuousClicks: true,
        purpose: this.$dictionary.purpose.modifyMobile,
        ticketType: this.$dictionary.ticketType.modifyMobileTicket
      }
    },
    methods: {
      selectProductId (val) {
        this.productId = val
      },
      submit () {
        if (!this.preventContinuousClicks) {
          return false
        }
        this.preventContinuousClicks = !this.preventContinuousClicks
        if (this.userInfo.googleBind) {
          this.$store.dispatch('verifyGoogle', {
            googleCode: this.dataForm.googleCode,
            purpose: this.purpose,
            ticket: this.ticket
          })
            .then(() => {
              return this.$store.dispatch('verifyCode', {
                code: this.dataForm.newSMSCode,
                ticket: this.ticket,
                channel: this.channel
              })
                .then(() => {
                  return this.usersApi.changeMobileGoogle(this.ticket, this.dataForm.mobile)
                    .then(() => {
                      this.preventContinuousClicks = !this.preventContinuousClicks
                      this.$store.dispatch('getUserInfo')
                      this.$store.commit('SAVE_TICKET', {
                        type: this.ticketType,
                        ticket: ''
                      })
                      this.$store.commit('SET_SUCCESSIVE', {successive: true})
                      // 如果短信验证码和谷歌都验证正确，则返回
                      this.$router.push({path: '/users/safe'})
                    })
                })
            })
            .catch(error => {
              this.preventContinuousClicks = !this.preventContinuousClicks
              this.dataForm.newSMSCode = ''
              console.log(error)
            })
        } else {
          this.$store.dispatch('verifyCode', {
            code: this.dataForm.newSMSCode,
            ticket: this.ticket,
            channel: this.channel
          })
            .then(() => {
              return this.usersApi.changeMobileSendEmail(this.ticket, this.dataForm.mobile)
                .then(() => {
                  this.preventContinuousClicks = !this.preventContinuousClicks
                  this.$store.dispatch('getUserInfo')
                  this.$store.commit('SAVE_TICKET', {
                    type: this.ticketType,
                    ticket: ''
                  })
                  this.$store.commit('SET_SUCCESSIVE', {successive: true})
                  this.$router.push({
                    path: '/users/safe/mobile/change/send_email',
                    query: {email: this.userInfo.email}
                  })
                })
            })
            .catch(error => {
              this.preventContinuousClicks = !this.preventContinuousClicks
              this.dataForm.newSMSCode = ''
              console.log(error)
            })
        }
      }
    },
    created () {
      this.usersApi.listCountry()
        .then(res => {
          this.product = res.data.countryList
          this.text = ' +' + this.product[210].code
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
</script>

<style lang="less" scoped>
  .container {
    .st-content {
      height: 638px;
      .st-form {
        margin: 70px 0 0 442px;
        .continuousClicks {
          background: #ccc !important;
          color: #fff !important;
          cursor: auto !important;
        }
      }
      .entrust-filter-item {
        position: absolute;
        width: 60px;
        height: 40px;
      }
    }
  }
</style>
