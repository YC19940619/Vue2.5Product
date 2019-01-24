import store from '@/store'
const state = store.state
const permissions =  (permission) => {
  try {
    return state.userInfo.permissions.includes(permission) //  权限
  }catch (e) {
    return false
  }
}
export default permissions

