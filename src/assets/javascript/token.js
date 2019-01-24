import Vue from 'vue'
import Router from '@/router'
import Store from '@/store'
import interfaces from './interface.js'
var if_access_token = async function(obj){
  this.code = false;
  await this.goAjax(obj)
  if(this.code){
    if(await this.refreshToken()){
      this.goAjax(obj)
    }
  }
};
if_access_token.prototype = {
  goAjax:async function(obj){
    let that = this;
    var params = {
      method:obj.method || 'get',//类型
      url:obj.url,//地址
      data:obj.data || {},//发送数据
      params:obj.params || {}
    }
    var access_token = `Bearer ${Store.state.token.access_token}`
    if(!params.data.access_token){
      params.headers = {
        "Authorization": access_token || ""
      }
    }
    await Vue.prototype.$axios(params).then((res) => {
      let data = res
      if(data.code.indexOf("ACCESS_TOKEN_EXPIRES") >0 ){
        that.code = true
      }else{//access_token未过期的回调
        that.code = false
        obj.success(data)
      }
    })
  },
  refreshToken: async function(){
    let refreshCode = true
    await Vue.prototype.$axios({
      method:'get',
      url:interfaces.auth_refresh_token,
      params:{
        refresh_token:Store.state.token.refresh_token
      }
    }).then((res)=> {
      let data = res
      console.log(data)
      if(data.code === "SUCCESS"){
        let token = Store.state.token
        token.access_token = data.data.access_token
        console.log(data.data.access_token)
        Store.commit('changeToken', token)
      }else{
        Vue.prototype.$alert('登录信息已过期，请重新登录', '身份状态失效', {
          confirmButtonText: '重新登录',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        refreshCode = false
        Router.push('/login')
      }
    })
    return refreshCode
  }
}
// var token = function (obj) {
//   new if_access_token(obj)
// }
export default if_access_token
