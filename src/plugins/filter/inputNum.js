/**
 * 輸入框僅可填數字並防止 xss 攻擊
 *
 * @param { String } str : 值
 * @param { Boolean } checkLength : 是否限制字數
 * @param { Number } limitLength : 取幾位數
 */
const inputNum = (str, checkLength, limitLength) => {
  let result = ''
  if (str) {
    result = str.replace(/[^\d]/g, '')

    if (checkLength && result.length > limitLength) {
      result = result.substring(0, limitLength)
    }
  }
  return result
}

export default inputNum
