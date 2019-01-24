<template>
  <div class="login-mask">
    <div class="login">
      <div class="login-title">梦工场商户管理平台</div>
      <div class="login-content">
        <el-input placeholder="请输入账号" v-model="account" class="login-int" @keydown.enter.native="keyOption">
          <template slot="prepend"><span class="iconfont">&#xe61c;</span></template>
        </el-input>
        <el-input type="password" placeholder="请输入密码" v-model="password" class="login-int" @keydown.enter.native="keyOption">
          <template slot="prepend"><span class="iconfont">&#xe64c;</span></template>
        </el-input>
        <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import interfaces from 'javascript/interface'
import IfAccessToken from 'javascript/token'
import dataimgsrc from 'javascript/common.js'
import {mapMutations} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      account: this.$store.state.account,
      password: ''
    }
  },
  mounted () {},
  methods: {
    keyOption () {
      this.handleLogin()
    },
    handleLogin () {
      if (!this.account || !this.password) {
        this.$message({
          message: '请输入账号或密码',
          type: 'warning'
        })
      } else {
        this.$axios({
          method: 'post',
          url: interfaces.auth,
          data: this.$qs.stringify({
            account: this.account,
            password: this.password,
            sys: 'dealer'
          })
        }).then((res) => {
          switch (res.code) {
            case 'SUCCESS':
              res.message = '登录成功'
              res.type = 'success'
              this.handleLoginSucc(res.data)
              break
            case 'user.INVALID_ACCOUNT' :
              res.message = '账号输入错误'
              res.type = 'warning'
              break
            case 'user.PASSWORD_NOT_MATCH' :
              res.message = '密码输入错误'
              res.type = 'warning'
              break
            case 'user.SYS_REFUSED' :
              res.message = '该用户不允许登录此系统！'
              res.type = 'warning'
              break
            default :
              res.message = '登录失败'
              res.type = 'error'
          }
          this.$message({
            message: res.message,
            type: res.type
          })
        }).catch(function (error) {
          console.log(error)
        })
      }
      this.changeAccount(this.account)
    },
    handleLoginSucc (data) {
      this.changeToken(data)
      const that = this
      new IfAccessToken({
        method: 'get',
        url: interfaces.userMe,
        success: function (data) {
          if (data.code === 'SUCCESS') {
            data.data.head_image = dataimgsrc(data.data.head_image)
            that.changeUserInfo(data.data)
            that.$router.push('/')
          } else {
            that.$message({
              message: '获取信息失败',
              type: 'error'
            })
          }
        }
      })
    },
    ...mapMutations(['changeAccount', 'changeToken', 'changeUserInfo'])
  }
}
</script>

<style lang="stylus" scoped>
  .login-mask
    height 100%
    background url("~image/loginBJ.jpg") no-repeat center center
    background-size cover
    .login
      position: absolute;
      left: 50%;
      top: 50%;
      width: 350px;
      margin: -190px 0 0 -175px;
      border-radius: 5px;
      background: rgba(0,0,0,.3);
      overflow: hidden;
      .login-title
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
      .login-content
        width: 100%
        height: 100%
        box-sizing border-box
        padding:30px 30px
        .login-btn
          width: 100%
          margin:0 auto
          display block
          font-size 12px
        .login-int
          margin-bottom:30px
        .login-int >>> .el-input-group__prepend
          padding: 0 12px
        .login-int >>> .el-input__inner
          font-size 12px
</style>
