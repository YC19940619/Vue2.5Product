<template>
  <el-container class="mgc-container">
    <el-header class="mgc-header" height="80px" :style= "{background:headerBjColor}">
      <mgc-header @changeNavActive="asideActive"
                  :asideWidth="asideWidth"
                  :maxasideWidth="maxasideWidth"
                  :isCollapse="isCollapse"
                  :userInfo = "userInfo"
      ></mgc-header></el-header>
    <el-container>
      <el-aside :width="asideWidth" class="mgc-aside">
        <el-menu
          :default-active="routePath"
          :collapse="isCollapse"
          :collapse-transition= "true"
          :router="true"
          background-color="rgb(50, 65, 87)"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-submenu index="2" v-if="this.$permissions('dealer_view_order')">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3" v-if="this.$permissions('dealer_view_mch')">
            <template slot="title">
              <i class="iconfont icon-shouye1"></i>
              <span>门店管理</span>
            </template>
            <el-menu-item index="/shop">门店列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><keep-alive><router-view></router-view></keep-alive></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import 'javascript/permissions.js'
import MgcHeader from './components/header'
import {mapState} from 'vuex'
export default {
  name: 'mgc',
  data () {
    return {
      asideWidth: '200px',
      maxasideWidth: '200px',
      minasideWidth: '64px',
      isCollapse: false
    }
  },
  mounted () {
  },
  computed: {
    routePath () {
      return this.$route.path
    },
    ...mapState(['userInfo', 'headerBjColor'])
  },
  components: {
    MgcHeader
  },
  methods: {
    asideActive (val) {
      this.isCollapse = !val
      if (val) {
        this.asideWidth = this.maxasideWidth
      } else {
        this.asideWidth = this.minasideWidth
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/common"
  .mgc-container
    width: 100%
    height: 100%
    .mgc-header
      position: relative;
      box-sizing: border-box;
      width: 100%;
      font-size: 22px;
      color: #fff;
      /*background :$bgColor;*/
      padding: 0
    .mgc-footer
      color: #333;
      text-align: center;
      line-height: 60px;
    .mgc-aside
      background-color: rgb(50, 65, 87);
      .el-menu
        border:none
        .iconfont
          display inline-block
          vertical-align: middle;
          margin-right: 5px;
          width: 24px;
          text-align: center;
          font-size: 18px;
</style>
