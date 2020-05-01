// import Vue from 'vue'

let checkMsg = {
  verifyMobile: (mobile, that) => {
    if (!mobile) {
      return that.$dictionary.getPrompt('message.promptInformation.inputMobile')
    }
    if (!(/^1(([34578]\d{9}$)|(((99)|(98)|(66))\d{8}$))/.test(mobile))) {
      return that.$dictionary.getPrompt('message.promptInformation.mobileWrongFormat')
    }
    return ''
  },
  otherMobile: (mobile, that) => {
    if (!mobile) {
      return that.$dictionary.getPrompt('message.promptInformation.inputMobile')
    }
    if (!(/^\d{1,14}$/.test(mobile))) {
      return that.$dictionary.getPrompt('message.promptInformation.mobileWrongFormat')
    }
    return ''
  },
  verifyFirstPassword: (firstPassword, that) => {
    if (!firstPassword) {
      return that.$dictionary.getPrompt('message.promptInformation.inputPwd')
    }
    if (firstPassword.length < 8 || firstPassword.length > 20) {
      return that.$dictionary.getPrompt('message.promptInformation.enterPwd')
    }
    return ''
  },
  verifyNewPassword: (firstPassword, newPassword, that) => {
    if (!newPassword) {
      return that.$dictionary.getPrompt('message.promptInformation.confirmPwd')
    }
    if (firstPassword !== newPassword) {
      return that.$dictionary.getPrompt('message.promptInformation.reEnter')
    }
    return ''
  },
  verifyFirstFundPwd: (firstPassword, that) => {
    if (!firstPassword) {
      return that.$dictionary.getPrompt('message.promptInformation.fundPwd')
    }
    if (!(/^\d{6}$/.test(firstPassword))) {
      return that.$dictionary.getPrompt('message.promptInformation.sixFundsPassword')
    }
    return ''
  },
  verifyNewFundPwd: (firstPassword, newPassword, that) => {
    if (!newPassword) {
      return that.$dictionary.getPrompt('message.promptInformation.confirmFundPwd')
    }
    if (firstPassword !== newPassword) {
      return that.$dictionary.getPrompt('message.promptInformation.reEnter')
    }
    return ''
  },
  verifyPwdAndFirstPwd: (password, firstPassword, that) => {
    if (firstPassword === password) {
      return that.$dictionary.getPrompt('message.promptInformation.oldAndNewPwd')
    }
    return ''
  },
  verifyCode: (code, that) => {
    if (!code) {
      return that.$dictionary.getPrompt('message.promptInformation.inputCode')
    }
    if (code.length !== 6) {
      return that.$dictionary.getPrompt('message.promptInformation.inputNumberCode')
    }
    return ''
  },
  verifyTwiceCode: (twiceMobileAuth, code, that) => {
    if (twiceMobileAuth && !code) {
      return that.$dictionary.getPrompt('message.promptInformation.inputCode')
    }
    if (twiceMobileAuth && !(/^\d{6}$/.test(code))) {
      return that.$dictionary.getPrompt('message.promptInformation.inputNumberCode')
    }
    if (twiceMobileAuth) {
      return ''
    }
  },
  verifyGoogleCode: (googleCode, that) => {
    if (!googleCode) {
      return that.$dictionary.getPrompt('message.promptInformation.inputGoogle')
    }
    if (!(/^\d{6}$/.test(googleCode))) {
      return that.$dictionary.getPrompt('message.promptInformation.inputSixGoogle')
    }
    return ''
  },
  verifyTwiceGoogleCode: (twiceGoogleAuth, googleCode, that) => {
    if (twiceGoogleAuth && !googleCode) {
      return that.$dictionary.getPrompt('message.promptInformation.inputGoogle')
    }
    if (twiceGoogleAuth && !(/^\d{6}$/.test(googleCode))) {
      return that.$dictionary.getPrompt('message.promptInformation.inputSixGoogle')
    }
    if (twiceGoogleAuth) {
      return ''
    }
  },
  verifyNewGoogleCode: (newGoogleCode, that) => {
    if (!newGoogleCode) {
      return that.$dictionary.getPrompt('message.promptInformation.inputNewGoogle')
    }
    if (!(/^\d{6}$/.test(newGoogleCode))) {
      return that.$dictionary.getPrompt('message.promptInformation.inputSixGoogle')
    }
    return ''
  },
  verifyEmail: (email, that) => {
    if (!email) {
      return that.$dictionary.getPrompt('message.promptInformation.inputEmail')
    }
    if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email))) {
      return that.$dictionary.getPrompt('message.promptInformation.inputEmailFormat')
    }
    return ''
  },
  verifyAccount: (account, that) => {
    if (!account) {
      return that.$dictionary.getPrompt('message.promptInformation.resetAccount')
    } else if ((account.length <= 14) || (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(account))) {
      return ''
    } else {
      return that.$dictionary.getPrompt('message.promptInformation.mobileOrEmailFormat')
    }
  },
  verifyMobileAccount: (account, that) => {
    if (!account) {
      return that.$dictionary.getPrompt('message.promptInformation.loginAccount')
    } else if ((account.length <= 14) || (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(account))) {
      return ''
    } else {
      return that.$dictionary.getPrompt('message.promptInformation.mobileOrEmailFormat')
    }
  },
  verifyIdCard: (identityNo, that) => {
    if (!identityNo) {
      return that.$dictionary.getPrompt('message.promptInformation.inputIdNumber')
    }
    if (!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(identityNo))) {
      return that.$dictionary.getPrompt('promptInformation.idNumberFormatError')
    }
    return ''
  },
  verifyLicenseNumber: (identityNo, that) => {
    if (!identityNo) {
      return that.$dictionary.getPrompt('message.promptInformation.licenseNumber')
    }
    if (!(/^[a-z0-9]+$/i).test(identityNo)) {
      return that.$dictionary.getPrompt('message.promptInformation.licenseNumberError')
    }
    return ''
  },
  verifyRealName: (realName, that) => {
    if (!realName) {
      return that.$dictionary.getPrompt('message.promptInformation.inputName')
    }
    return ''
  },
  checkHighAuth: (fileName, fileNameError) => {
    if (fileName && fileNameError) {
      return ''
    } else {
      return false
    }
  },
  verifyHighAuth: (fileNameOne, fileNameTwo, fileNameThree, that) => {
    // if (!fileNameOne || !fileNameTwo || !fileNameThree) {
    //   return '请先上传证件照！'
    // }
    if (!fileNameOne) {
      return that.$dictionary.getPrompt('message.promptInformation.firstIdPhoto')
    }
    if (!fileNameTwo) {
      return that.$dictionary.getPrompt('message.promptInformation.secondIdPhoto')
    }
    if (!fileNameThree) {
      return that.$dictionary.getPrompt('message.promptInformation.thirdIdPhoto')
    }
    return ''
  },
  verifyCheckOne: (checkedOne, that) => {
    if (!checkedOne) {
      return that.$dictionary.getPrompt('message.promptInformation.companyStatement')
    }
    return ''
  },
  verifyCheck: (checked, that) => {
    if (!checked) {
      return that.$dictionary.getPrompt('message.promptInformation.companyStatement')
    }
    return ''
  },
  verifyApiName: (apiName, that) => {
    if (!apiName) {
      return that.$dictionary.getPrompt('message.promptInformation.inputRemarks')
    }
    return ''
  },
  isIdCard: (cardid) => {
    // 身份证正则表达式(18位)
    let isIdCard2 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    let stard = '10X98765432' // 最后一位身份证的号码
    let first = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 1-17系数
    let sum = 0
    if (!isIdCard2.test(cardid)) {
      return false
    }
    let year = cardid.substr(6, 4)
    let month = cardid.substr(10, 2)
    let day = cardid.substr(12, 2)
    let birthday = cardid.substr(6, 8)
    // 校验日期是否合法
    if (birthday !== checkMsg.dateToString(new Date(year + '/' + month + '/' + day))) {
      return false
    }
    for (let i = 0; i < cardid.length - 1; i++) {
      sum += cardid[i] * first[i]
    }
    let result = sum % 11
    let last = stard[result] // 计算出来的最后一位身份证号码
    if (cardid[cardid.length - 1].toUpperCase() === last) {
      return true
    } else {
      return false
    }
  },
  // 日期转字符串 返回日期格式20080808
  dateToString: (date) => {
    if (date instanceof Date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      return year.toString() + month.toString() + day.toString()
    }
    return ''
  },
  // 提现金额验证
  getMoneyVerity: (num, maxNum, highAuth, videoAuth, that) => {
    if (!num) return that.$dictionary.getPrompt('message.promptInformation.withdrawalAmount')
    if (!/^\d*(?:\.\d{0, 2})?$/.test(num)) {
      return that.$dictionary.getPrompt('message.promptInformation.twoDecimalPlaces')
    } else if (num < 100) {
      return that.$dictionary.getPrompt('message.promptInformation.minimumCash')
    } else if (num > maxNum) {
      return that.$dictionary.getPrompt('message.promptInformation.amountLimit')
    } else if (!highAuth) {
      return that.$dictionary.getPrompt('message.promptInformation.advancedCertification')
    } else if (num > 5000 && !videoAuth) {
      return that.$dictionary.getPrompt('message.promptInformation.videoCertification')
    } else {
      return ''
    }
  },
  // 验证资金密码
  moneyPwdVerity: (pwd, that) => {
    if (!pwd) {
      return that.$dictionary.getPrompt('message.promptInformation.fundPwd')
    }
    if (!(/^\d{6}$/.test(pwd))) {
      return that.$dictionary.getPrompt('message.promptInformation.fundPwdError')
    }
    return ''
  },
  // 验证数字
  numberVerity: (num, that) => {
    if (!num) {
      return that.$dictionary.getPrompt('message.promptInformation.inputNumber')
    }
    if (!/^\d*(?:\.\d{0, 2})?$/.test(num)) {
      return that.$dictionary.getPrompt('message.promptInformation.twoDecimalPlaces')
    }
    return ''
  },
  // 验证数字
  numberEightVerity: (value, num = 8, that) => {
    if (!value || !Number(value)) {
      return that.$dictionary.getPrompt('message.promptInformation.greaterThanZero')
    }
    let rg = new RegExp('^[0-9]{0, 8}([.]{1}[0-9]{0, " + num + "}){0, 1}$')
    if (!rg.test(value)) {
      return that.$dictionary.getPrompt('message.promptInformation.eightDecimals1') + num + that.$dictionary.getPrompt('message.promptInformation.eightDecimals2')
    }
    return ''
  },
  bankVerity: (num, that) => {
    if (!num) {
      return that.$dictionary.getPrompt('message.promptInformation.inputBankCard')
    }
    let odd = 0
    let even = 0
    let n = 0
    for (let i = num.length; i--;) {
      n = Number(num.slice(i, i + 1))
      if (isNaN(n)) {
        return that.$dictionary.getPrompt('message.promptInformation.bankCardError')
      }
      if ((num.length - i) % 2) {
        odd += n
      } else {
        n *= 2
        if (n.toString().length === 2) {
          n -= 9
        }
        even += n
      }
    }
    if ((odd + even) % 10) {
      return that.$dictionary.getPrompt('message.promptInformation.bankCardError')
    }
    return ''
  }
}

export default checkMsg
