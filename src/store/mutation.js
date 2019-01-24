const changeToken = (state, token) => {
  state.token = token
  try {
    localStorage.setItem('token', JSON.stringify(token))
  } catch (e) {}
}
const changeUserInfo = (state, userInfo) => {
  state.userInfo = userInfo
  try {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  } catch (e) {}
}
const changeAccount = (state, account) => {
  state.account = account
  try {
    localStorage.setItem('account', account)
  } catch (e) {}
}
const changeStatics = (state, statics) => {
  state.statics = statics
  try {
    localStorage.setItem('statics', JSON.stringify(statics))
  } catch (e) {}
}
const changeHeaderBjColor = (state, headerBjColor) => {
  state.headerBjColor = headerBjColor
  try {
    localStorage.setItem('headerBjColor', headerBjColor)
  } catch (e) {}
}
export default {
  changeAccount,
  changeToken,
  changeUserInfo,
  changeStatics,
  changeHeaderBjColor
}
