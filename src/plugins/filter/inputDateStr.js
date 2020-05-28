/**
 * 輸入框只可填入數字及:並防止 xss 攻擊
 * 例如： 00:00:00
 *
 * @param { String } str
 */
const inputDateStr = (str) => {
  let result = ''
  if (str) {
    const value1 = str.substring(0, 2)
    const value2 = str.substring(2, 3)
    const value3 = str.substring(3, 5)
    const value4 = str.substring(5, 6)
    const value5 = str.substring(6, 8)
    let newValueOf1 = value1.replace(/\D/g, '')
    const newValueOf2 = value2.replace(/[^:]/g, ':')
    let newValueOf3 = value3.replace(/\D/g, '')
    const newValueOf4 = value4.replace(/[^:]/g, ':')
    let newValueOf5 = value5.replace(/\D/g, '')

    newValueOf1 = newValueOf1 > 23 ? 23 : newValueOf1
    newValueOf3 = newValueOf3 > 59 ? 59 : newValueOf3
    newValueOf5 = newValueOf5 > 59 ? 59 : newValueOf5

    result = `${newValueOf1}${newValueOf2}${newValueOf3}${newValueOf4}${newValueOf5}`
  }

  return result
}

export default inputDateStr
