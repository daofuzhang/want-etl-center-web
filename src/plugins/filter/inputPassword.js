/**
* 輸入框僅可填特定密碼格式
*/
const inputPassword = (str) => {
  let result = ''
  if (str) {
    result = str.replace(/[^A-Za-z\d@$!%*#?&]/g, '')
  }
  return result
}

export default inputPassword