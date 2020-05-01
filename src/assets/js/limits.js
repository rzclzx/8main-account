export default {
  SMSCode () {
    return [
      value => {
        value = value.replace(/\D/g, '')
        if (value === '' || value.indexOf('.') >= 0) return ' '
        return value.slice(0, 6)
      }
    ]
  },
  // 手机号除数字以外都不能输入
  mobile () {
    return [
      value => {
        return value.replace(/\D/g, '')
      }
    ]
  },
  // 密码不能输入空格
  password () {
    return [
      value => {
        return value.replace(' ', '')
      }
    ]
  },
  float (decimal = 8, integer = 12) {
    return [
      value => {
        value = value.replace(/。/g, '.')
        let nums = /(\d+)(\.?)(\d*)/.exec(value)
        if (!nums) return ''
        else value = nums[1].slice(0, integer) + nums[2] + nums[3].slice(0, decimal)
        return value
      }
    ]
  },
  float4 (decimal = 4, integer = 12) {
    return [
      value => {
        value = value.replace(/。/g, '.')
        let nums = /(\d+)(\.?)(\d*)/.exec(value)
        if (!nums) return ''
        else value = nums[1].slice(0, integer) + nums[2] + nums[3].slice(0, decimal)
        return value
      }
    ]
  }
}
