<template>
  <div class="container">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="center">
      <el-tabs v-model="activeName" class="nav">
        <el-tab-pane label="个人信息" name="first"><person-info></person-info></el-tab-pane>
        <el-tab-pane label="修改基本信息" name="second"><modify-info></modify-info></el-tab-pane>
        <el-tab-pane label="修改密码" name="third"><modify-password></modify-password></el-tab-pane>
        <el-tab-pane label="修改头像" name="fourth"><modify-image></modify-image></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PersonInfo from './components/personInfo'
import ModifyInfo from './components/modifyInfo'
import ModifyPassword from './components/modifyPassword'
import ModifyImage from './components/modifyImage'
export default {
  name: 'PersonCenter',
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    PersonInfo,
    ModifyInfo,
    ModifyPassword,
    ModifyImage
  }
}
</script>

<style lang="stylus" scoped>
  .container
    width: 100%
    height: 100%
    display flex
    flex-direction column
    .header
      width:100%
      height:40px
      margin-bottom:20px
      .nav
        height:100%
        float left
    .center
      flex:1
      background #fff
      box-shadow 0 10px 20px #eee
      box-sizing:border-box
      padding:0 20px
      .nav
        height: 40px
</style>
