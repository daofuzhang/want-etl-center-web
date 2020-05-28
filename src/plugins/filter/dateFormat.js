/**
 * 日期格式化功能，返回 yyyy-MM-dd HH:mm:ss
 *
 * @param { * } value : 值
 * @param { Number } len : 取幾位(不填為全部)
 */
const dateFormat = (value, len) => {
  if (!value) return '-'
  const date = new Date(value)
  const addZero = z => (z < 10 ? `0${z}` : z)
  const year = date.getFullYear()
  const month = addZero(date.getMonth() + 1)
  const day = addZero(date.getDate())
  const hour = addZero(date.getHours())
  const minute = addZero(date.getMinutes())
  const second = addZero(date.getSeconds())
  let newDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  newDate = newDate.substring(0, len)
  return newDate
}

export default dateFormat
