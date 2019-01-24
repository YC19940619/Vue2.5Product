<template>
  <div class="nav-button" :class="{active:ifisCollapse}" @click="handleClickNavButton">
      <i></i>
      <i></i>
      <i></i>
  </div>
</template>

<script>
export default {
  name: 'NavButton',
  data () {
    return {
      classActive: true
    }
  },
  props: {
    isCollapse: Boolean
  },
  methods: {
    handleClickNavButton () {
      this.classActive = !this.classActive
      localStorage.setItem('navNative', this.classActive)
      this.$emit('changeNavActive', this.classActive)
    }
  },
  computed: {
    ifisCollapse () {
      return !this.isCollapse
    }
  }
}
</script>

<style lang="stylus" scoped>
  .nav-button
    float: left
    width: 80px
    height: 80px
    position relative
    i
      position: absolute;
      display: block;
      left: 50%;
      margin-left: -15px;
      width: 30px;
      background: #fff;
      height: 3px;
      -webkit-transform: rotate(0);
      -ms-transform: rotate(0);
      transform: rotate(0);
    i:nth-child(1)
      top: 25px;
    i:nth-child(2)
      top: 36px;
    i:nth-child(3)
      top: 47px;
  .nav-button.active
    i:nth-child(1)
      top: 36px
      transform: rotate(-45deg);
    i:nth-child(2)
      top: 36px
      transform: rotate(-45deg);
    i:nth-child(3)
      top: 36px
      transform: rotate(45deg);
</style>
