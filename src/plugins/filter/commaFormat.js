/**
 * 數字加上千分號功能
 *
 * @param { String | Number } value : 值
 * @param { Number } decimalDigits : 取幾位小數位數
 * @param { Boolean } addZero : 小數位數是否補0(Boolean)
 */
const commaFormat = (value, decimalDigits, addZero) => {
  if (value) {
    value = value.toString().replace(/,/g, '')
    value = Number(value)
  }
  let newVal = Math.round(Math.round(value * Math.pow(10, (decimalDigits || 0) + 1)) / 10) / Math.pow(10, (decimalDigits || 0))

  if (addZero === true && value !== 0) {
    newVal = newVal.toFixed(decimalDigits)
  }

  return newVal.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function (all, pre, digits) {
    return pre + digits.replace(/\d{3}/g, ',$&')
  })
}

export default commaFormat
