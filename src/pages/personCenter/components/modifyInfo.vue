<template>
  <div class="box">
    <div class="info">
      <div class="left">修改昵称：</div>
      <div class="right"><el-input v-model="userInfo.nickname" maxlength="20" minlength="2" placeholder="请输入昵称"></el-input></div>
    </div>
    <div class="info">
      <div class="left">修改手机号：</div>
      <div class="right"><el-input type="phone" max="11" v-model="userInfo.phone_num" placeholder="请输入手机号"></el-input></div>
    </div>
    <div class="info">
      <div class="left">修改性别：</div>
      <div class="right">
        <el-radio-group v-model="userInfo.sex">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-row class="btnarr">
      <el-button type="warning" @click="reset">重置信息</el-button>
      <el-button type="primary" @click="modify">确认修改</el-button>
    </el-row>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import IfAccessToken from 'javascript/token'
export default {
  name: 'ModifyInfo',
  data () {
    return {
      userInfo: {...this.$store.state.userInfo}
    }
  },
  methods: {
    ...mapMutations(['changeUserInfo']),
    reset () {
      this.userInfo.nickname = ''
      this.userInfo.phone_num = ''
    },
    modify () {
      let that = this
      const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (this.userInfo.nickname <= 0) {
        this.$message({
          message: '请输入昵称',
          type: 'warning'
        })
      } else if (!myreg.test(this.userInfo.phone_num)) {
        this.$message({
          message: '请输入合法的手机号',
          type: 'warning'
        })
      } else {
        new IfAccessToken({
          method: 'PATCH',
          url: that.$interfaces.userMe,
          data: that.$qs.stringify({
            nickname: that.userInfo.nickname,
            phone_num: that.userInfo.phone_num,
            sex: that.userInfo.sex
          }),
          success (data) {
            if (data.code === 'SUCCESS') {
              that.$message({
                message: '修改成功',
                type: 'success'
              })
              that.changeUserInfo(that.userInfo)
            } else if (data.code === 'user.INVALID_NICKNAME') {
              that.$message({
                message: '昵称必须在2到20位之间',
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
        .el-input
          width:300px
</style>
