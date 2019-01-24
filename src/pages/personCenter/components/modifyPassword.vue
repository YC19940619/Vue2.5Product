<template>
  <div class="box">
    <div class="info">
      <div class="left">旧密码：</div>
      <div class="right"><el-input type="password" v-model="oldPassword"  placeholder="请输入旧密码"></el-input></div>
    </div>
    <div class="info">
      <div class="left">新密码：</div>
      <div class="right"><el-input type="password" v-model="newPassword"  placeholder="请输入新密码"></el-input></div>
    </div>
    <div class="info">
      <div class="left">确认密码：</div>
      <div class="right"><el-input type="password" v-model="confirmNewPassword"  placeholder="再次输入新密码"></el-input></div>
    </div>
    <el-row class="btnarr">
      <el-button type="warning" @click="reset">清空</el-button>
      <el-button type="primary" @click="modify">确认修改</el-button>
    </el-row>
  </div>
</template>

<script>
import IfAccessToken from 'javascript/token'
export default {
  name: 'ModifyPassword',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  },
  methods: {
    reset () {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmNewPassword = ''
    },
    modify () {
      if (this.oldPassword.length <= 0) {
        this.$message({
          message: '请输入旧密码',
          type: 'warning'
        })
      } else if (this.newPassword.length < 6 || this.newPassword.length > 20) {
        this.$message({
          message: '请输入6-20位新密码',
          type: 'warning'
        })
      } else if (this.newPassword !== this.confirmNewPassword) {
        this.$message({
          message: '两次密码不一致',
          type: 'warning'
        })
      } else {
        let that = this
        new IfAccessToken({
          method: 'PATCH',
          url: that.$interfaces.userMe,
          data: that.$qs.stringify({
            password: `${that.oldPassword},${that.newPassword},${that.confirmNewPassword}`
          }),
          success (data) {
            if (data.code === 'SUCCESS') {
              that.$message({
                message: '修改成功',
                type: 'success'
              })
            } else if (data.code === 'user.OLDPASSWORD_INCORRECT') {
              that.$message({
                message: '原密码不正确',
                type: 'warning'
              })
            } else if (data.code === 'user.TWOPASSWORDS_NOT_MATCH') {
              that.$message({
                message: '两次密码不一致',
                type: 'warning'
              })
            } else if (data.code === 'user.PASSWORD_FORMAT_ERROR') {
              that.$message({
                message: '请输入6-20位密码',
                type: 'warning'
              })
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box
    padding 20px
    box-sizing border-box
    .btnarr
      margin-top: 50px
      width: 300px
      display flex
      justify-content space-between
    .info
      width: 100%
      height: 45px
      line-height 45px
      overflow hidden
      margin-bottom:10px
      .left
        float: left
        width: 100px
        font-size 16px
        text-align right
      .right
        float left
        font-size 16px
</style>
