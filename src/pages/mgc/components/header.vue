<template>
    <div class="container">
      <div class="left">
        <p class="title" :style="{width:asideWidth}">
          <router-link to="/">
            <template v-if="asideWidth === maxasideWidth">
              梦工场商户平台
            </template>
            <template v-else>
              <img class="logo" src="~image/loginBJ.jpg">
            </template>
          </router-link>
        </p>
        <nav-button @changeNavActive="headerNavActive" :isCollapse="isCollapse"></nav-button></div>
      <div class="right">
        <el-dropdown  @command="handleCommand">
          <div class="person-info el-dropdown-link">
            <img :src="userInfo.head_image">{{userInfo.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
            <el-dropdown-item command="退出"><el-button class="exit" type="text" @click="open">退出</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-color-picker class="header-color" :value="headerBjColor" @change="changeColor"></el-color-picker>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import NavButton from './navbutton'
export default {
  name: 'MgcHeader',
  data () {
    return {
      defaultColor: '#242f42'
    }
  },
  props: {
    asideWidth: String,
    maxasideWidth: String,
    isCollapse: Boolean,
    userInfo: Object
  },
  components: {
    NavButton
  },
  computed: {
    ...mapState(['headerBjColor'])
  },
  mounted () {},
  methods: {
    ...mapMutations(['changeToken', 'changeHeaderBjColor']),
    changeColor (val) {
      console.log(val)
      if (val) {
        this.changeHeaderBjColor(val)
      } else {
        this.changeHeaderBjColor(this.defaultColor)
      }
    },
    headerNavActive (val) {
      this.$emit('changeNavActive', val)
    },
    handleCommand (command) {
      switch (command) {
        case '个人中心' :
          this.$router.push('/personcenter')
          break
      }
    },
    open () {
      this.$alert('是否退出系统？', '退出', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            this.changeToken(null)
            setTimeout(() => {
              this.$router.push('/login')
            }, 100)
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/common"
  .exit
    display block
    width:100%
  .container
    height: 100%
    .left
      float: left;
      line-height: 80px
      .title
        text-align center
        float left
        border-right:1px solid #ccc
        ellipsis()
        .logo
          display block
          margin: 20px auto
          width:40px
          height: 40px
    .header-color
      margin: 20px;
      float: right;
    .right
      float right
      .person-info
        height: 100%
        line-height 80px
        overflow hidden
        padding: 0 10px
        font-size 16px
        display flex
        flex-direction row
        align-items center
        color: #fff
        img
          float left
          display block
          margin: 20px 5px
          width:40px
          height:40px
          border-radius 50%
          overflow hidden
        i
          float right
          color: #fff
          font-size 16px
</style>
