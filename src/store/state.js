let userInfo = {}
let token = {}
let account = ''
let statics = {}
let headerBjColor = '#242f42'
try {
  userInfo = JSON.parse(localStorage.getItem('userInfo')) || userInfo
  token = JSON.parse(localStorage.getItem('token')) || token
  statics = JSON.parse(localStorage.getItem('statics')) || statics
  account = localStorage.getItem('account') || account
  headerBjColor = localStorage.getItem('headerBjColor') || headerBjColor
} catch (e) {}
export default {
  userInfo,
  token,
  account,
  statics,
  headerBjColor
}
