let Utils = {
  num: {
    numAdd (num1, num2) {
      var baseNum, baseNum1, baseNum2
      try {
        baseNum1 = num1.toString().split('.')[1].length
      } catch (e) {
        baseNum1 = 0
      }
      try {
        baseNum2 = num2.toString().split('.')[1].length
      } catch (e) {
        baseNum2 = 0
      }
      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
      return (num1 * baseNum + num2 * baseNum) / baseNum
    },
    numSub (num1, num2) {
      var baseNum, baseNum1, baseNum2
      var precision
      try {
        baseNum1 = num1.toString().split('.')[1].length
      } catch (e) {
        baseNum1 = 0
      }
      try {
        baseNum2 = num2.toString().split('.')[1].length
      } catch (e) {
        baseNum2 = 0
      }
      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
      precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
      return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
    },
    numMulti (num1, num2) {
      var baseNum = 0
      try {
        baseNum += num1.toString().split('.')[1].length
      } catch (e) {
      }
      try {
        baseNum += num2.toString().split('.')[1].length
      } catch (e) {
      }
      return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum)
    },
    numDiv (num1, num2) {
      let baseNum1 = 0
      let baseNum2 = 0
      let baseNum3, baseNum4
      try {
        baseNum1 = num1.toString().split('.')[1].length
      } catch (e) {
        baseNum1 = 0
      }
      try {
        baseNum2 = num2.toString().split('.')[1].length
      } catch (e) {
        baseNum2 = 0
      }
      baseNum3 = Number(num1.toString().replace('.', ''))
      baseNum4 = Number(num2.toString().replace('.', ''))
      return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1)
    }
  },
  deepFn: {
    merge (data, type, deep, len, size = 3) {
      let order = []
      if (data && data.length && !type) {
        for (let i = 0; i < data.length; i++) {
          // 数组为空时，写入第一条数据
          if (!order.length) {
            order.push({
              price: this.formatDeep(Number(data[i][0]).toFixed(8), deep),
              amount: Number(Number(data[i][1]).toFixed(size))
            })
          } else {
            // 判断该深度下，成交价是否与数组最后一条数据相同，相同则amount增加，不同则写入新数据
            if (this.formatDeep(Number(data[i - 1][0]), deep) === this.formatDeep(Number(data[i][0]), deep)) {
              order[order.length - 1].amount += Number(Number(data[i][1]).toFixed(size))
            } else {
              if (order.length < len) {
                order.push({
                  price: this.formatDeep(Number(data[i][0]).toFixed(8), deep),
                  amount: Number(Number(data[i][1]).toFixed(size))
                })
              } else {
                break
              }
            }
          }
        }
        if (order.length) {
          order.forEach((info, i) => {
            info.number = 0
            for (let k = i + 1; k--;) {
              info.number += order[k].amount
            }
          })
        }
        while (order.length < len) {
          order[order.length] = {}
        }
        return order
      } else if (data && data.length && type) {
        for (let i = data.length - 1; i >= 0; i--) {
          if ((deep === 7 && Number(data[i][0]) < 0.0000001) || (deep === 6 && Number(data[i][0]) < 0.000001)) {
            break
          }
          // 数组为空时，写入第一条数据
          if (!order.length) {
            order.push({
              price: this.formatDeep(Number(data[i][0]).toFixed(8), deep, type),
              amount: Number(Number(data[i][1]).toFixed(size))
            })
          } else {
            // 判断该深度下，成交价是否与数组最后一条数据相同，相同则amount增加，不同则写入新数据
            if (this.formatDeep(Number(data[i + 1][0]), deep, type) === this.formatDeep(Number(data[i][0]), deep, type)) {
              order[order.length - 1].amount += Number(Number(data[i][1]).toFixed(size))
            } else {
              if (order.length < len) {
                order.push({
                  price: this.formatDeep(Number(data[i][0]).toFixed(8), deep, type),
                  amount: Number(Number(data[i][1]).toFixed(size))
                })
              } else {
                break
              }
            }
          }
        }
        if (order.length) {
          order.forEach((info, i) => {
            info.number = 0
            for (let k = i + 1; k--;) {
              info.number += order[k].amount
            }
          })
        }
        while (order.length < len) {
          order[order.length] = {}
        }
        return order
      } else {
        while (order.length < len) {
          order[order.length] = {}
        }
        return order
      }
    },
    formatDeep (num, deep, type) {
      // 判断是否为数字，不是则返回
      let floatNum = parseFloat(num)
      if (isNaN(floatNum)) {
        return false
      }
      let s = this.editE(floatNum.toString())
      let value = NaN
      switch (deep) {
        case 8:
          if (s.indexOf('.') < 0) {
            s += '.'
          }
          while (s.split('.')[1].length < 9) {
            s += '0'
          }
          value = s.substring(0, s.indexOf('.') + 9)
          // value += '000000'
          break
        case 7:
          if (/\.[0-9]{7}[1-9]{1}/.test(floatNum) || num.toString().indexOf('e') !== -1) {
            if (!type) {
              floatNum += 0.0000001
              s = this.editE(floatNum.toString())
            }
          }
          if (s.indexOf('.') < 0) {
            s += '.'
          }
          while (s.split('.')[1].length < 8) {
            s += '0'
          }
          value = s.substring(0, s.indexOf('.') + 8)
          break
        case 6:
          if (/\.[0-9]{7}[1-9]{1}/.test(floatNum) || /\.[0-9]{6}[1-9]{1}/.test(floatNum)) {
            if (!type) {
              floatNum += 0.000001
              s = this.editE(floatNum.toString())
            }
          }
          if (s.indexOf('.') < 0) {
            s += '.'
          }
          while (s.split('.')[1].length < 7) {
            s += '0'
          }
          value = s.substring(0, s.indexOf('.') + 7)
          break
      }
      return value
    },
    editE (num) {
      if (!num) return num
      num = num.toString()
      if (num.indexOf('e') === -1) { return num }
      let reg = /(?:(\d)+(?:.(\d+))?)[e]{1}-(\d)/.exec(num)
      if (!reg) {
        return num
      }
      let v = num
      if (reg[3] === '7') {
        v = '0.000000' + (reg[2] ? reg[1] + reg[2] : reg[1])
      } else {
        v = '0.0000000' + reg[1]
      }
      return v
    }
  },
  getListInfo (list, value, key) {
    let info = list.filter(item => {
      return item[key].toString() === value.toString()
    })[0] || null
    return info
  }
}
export default Utils
