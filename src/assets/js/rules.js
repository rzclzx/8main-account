export default {
  SMSCode (ticketType, vue) {
    return [
      {
        validator: value => {
          if (!vue.$store.state.ticket[vue.$dictionary.ticketType[ticketType]]) return false
          else {
            return true
          }
        },
        message: vue.$t(`message.errorMessage.SMSCodeGetTicket`)
      },
      {required: true, message: vue.$t(`message.errorMessage.SMSCodeRequried`)},
      {
        validator: value => {
          if (!(/^\d{6}$/.test(value))) return false
          else {
            return true
          }
        },
        message: vue.$t(`message.errorMessage.SMSCodeSixNumber`)
      }
    ]
  },
  googleCode (vue) {
    return [
      {required: true, message: vue.$t(`message.errorMessage.googleVerificationCode`)},
      {
        validator: value => {
          if (!(/^\d{6}$/.test(value))) return false
          else {
            return true
          }
        },
        message: vue.$t(`message.errorMessage.googleSixNumber`)
      }
    ]
  }
}
