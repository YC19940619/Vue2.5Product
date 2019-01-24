import Axios from 'axios'
import Vue from 'vue'
console.log(process.env.API_URL)
Axios.defaults.baseURL = process.env.API_URL;//其他地方请求地址可以省略域名
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;//第三方认证涉及到token 如果没有可以干掉
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';// 全局设置post请求的数据编码格式
Axios.interceptors.response.use(response => {
  // 在这里你可以判断后台返回数据携带的请求码
  return response.data
}, function (err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)' ; break;
      case 401: err.message = '未授权，请重新登录(401)'; break;
      case 403: err.message = '拒绝访问(403)'; break;
      case 404: err.message = '请求出错(404)'; break;
      case 408: err.message = '请求超时(408)'; break;
      case 500: err.message = '服务器错误(500)'; break;
      case 501: err.message = '服务未实现(501)'; break;
      case 502: err.message = '网络错误(502)'; break;
      case 503: err.message = '服务不可用(503)'; break;
      case 504: err.message = '网络超时(504)'; break;
      case 505: err.message = 'HTTP版本不受支持(505)'; break;
      default: err.message = `连接出错(${err.response.status})!`;
    }
  }else{
    err.message = '连接服务器失败!'
  }
  Vue.prototype.$message.error(err.message);
  return Promise.reject(err);
})

export default Axios
