import {BigDecimal} from 'bigdecimal'
const statusArr = ['提币失败', '等待处理', '提币成功', '提币取消', '等待邮件确认', '处理中', '处理完毕，提现中']

function singleTimeFormat (str) {
  return str.toString().length === 1 ? ('0' + str) : str
}

function getYMD (time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  return year + '-' + singleTimeFormat(month) + '-' + singleTimeFormat(date)
}

function getHMC (time) {
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  return singleTimeFormat(hours) + ':' + singleTimeFormat(minutes) + ':' + singleTimeFormat(seconds)
}

const Filter = {
  coinStatus (satus) {
    return statusArr[satus]
  },
  numberFormat (num) {
    if (num) {
      let [num1, num2] = num.toString().split('.')
      num1 = num1.split('').reverse().map((item, index) => {
        return (index) % 3 || !index ? item : item + ','
      }).reverse().join('')
      num2 ? num = num1 + '.' + num2 : num = num1
    }
    return num
  },
  splitFormat (num, fractionDigits) {
    if (isNaN(num)) return num
    if (num) {
      if (num === '0') {
        return num
      }
      if (!fractionDigits) {
        return parseInt(num)
      }
      // if (num.toString().indexOf('.') > -1) {
      //   let digit = num.toString().split('.')
      //   if (digit[1].length < fractionDigits) {
      //     let digitResult = ''
      //     for (let i = 0; i < fractionDigits - digit[1].length; i++) {
      //       digitResult += '0'
      //     }
      //     return num + digitResult
      //   } else {
      //     let digitResult = digit[1].substring(0, fractionDigits)
      //     return digit[0] + '.' + digitResult
      //   }
      // } else {
      //   let digitResult = '.'
      //   for (let i = 0; i < fractionDigits; i++) {
      //     digitResult += '0'
      //   }
      //   return num + digitResult
      // }
      let _num = new BigDecimal(num + '')
      return _num.setScale(fractionDigits, BigDecimal['ROUND_FLOOR']).toPlainString()
    } else {
      return num
    }
  },
  timeFormat (time) {
    if (!time) return ''
    let GTM_8 = 480  // 480
    let date = new Date(time)
    let subMin = date.getTimezoneOffset() + GTM_8
    date.setMinutes(date.getMinutes() + subMin)
    return getYMD(date) + ' ' + getHMC(date)
  },
  getSubstring (time) {
    return time.substring(2, 10)
  },
  getToUpperCase (upper) {
    return upper.toUpperCase()
  }
}

export default Filter
