/**
 * 輸入框可填任何內容並防止 xss 攻擊
 *
 * @param { String } str
 */
const inputStr = (str) => {
  let result = ''
  if (str) {
    result = str.replace(/"/g, '&#34;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&#60;')
      .replace(/>/g, '&#62;')
      .replace(/(^\s*)|(\s*$)/g, '')
  }
  return result
}

export default inputStr
