<template>
    <div class="box">
      <div class="head-img">
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <img class="bate64" v-show="bate64" :src="bate64">
        <input type="file" class="head-input" @change="baseUrl($event)"/>
      </div>
      <el-button type="primary" class="modify" @click="modify">确认修改</el-button>
    </div>
</template>

<script>
import IfAccessToken from 'javascript/token'
import {mapMutations} from 'vuex'
import dataimgsrc from 'javascript/common.js'
export default {
  name: 'ModifyImage',
  data () {
    return {
      bate64: ''
    }
  },
  methods: {
    ...mapMutations(['changeUserInfo']),
    baseUrl ($event) {
      let that = this
      let file = $event.target.files[0]
      var reader = new FileReader()
      reader.onload = (function (file) {
        return function (e) {
          that.bate64 = this.result
          console.log(that.bate64)
        }
      })(file)
      reader.readAsDataURL(file)
    },
    modify () {
      if (this.bate64) {
        let that = this
        new IfAccessToken({
          method: 'PATCH',
          url: that.$interfaces.userMe,
          data: that.$qs.stringify({
            head_image: that.bate64
          }),
          success (data) {
            console.log(data)
            if (data.code === 'SUCCESS') {
              that.$message({
                message: '上传成功',
                type: 'success'
              })
              new IfAccessToken({
                method: 'get',
                url: that.$interfaces.userMe,
                success: function (data) {
                  if (data.code === 'SUCCESS') {
                    data.data.head_image = dataimgsrc(data.data.head_image)
                    that.changeUserInfo(data.data)
                  }
                }
              })
            } else if (data.code === 'user.INVALID_HEAD_IMAGE') {
              that.$message({
                message: '图片不合法',
                type: 'warning'
              })
            } else {
              that.$message({
                message: '上传失败',
                type: 'error'
              })
            }
          }
        })
      } else {
        this.$message({
          message: '请选择图片',
          type: 'warning'
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
    .modify
      display block
      margin-top:20px
    .head-img
      width: 180px;
      height: 180px;
      border: 1px dashed #d9d9d9;
      display inline-block
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      i
        position absolute
        left: 0
        right: 0
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      .bate64
        position absolute
        left: 0
        right: 0
        width: 178px;
        height: 178px;
        z-index 1
        overflow hidden
        border-radius 50%
      .head-input
        position absolute
        left: 0
        right: 0
        width: 178px;
        height: 178px;
        z-index 2
        opacity 0
</style>
