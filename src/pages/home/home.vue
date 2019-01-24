<template>
  <div class='container'>
    <div id='myChart' ref='myChart'></div>
  </div>
</template>

<script>
import IfAccessToken from 'javascript/token'
import echarts from 'echarts'
import 'echarts/map/js/china'
export default {
  name: 'home',
  data () {
    return {
      optionMap: {
        backgroundColor: '#FFFFFF',
        title: {
          text: '门店地图大数据',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: true,
          x: 'left',
          y: 'center',
          splitList: [
            {start: 11, end: 100},
            {start: 6, end: 10},
            {start: 1, end: 5},
            {start: 0, end: 0}
          ],
          color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
        },
        series: [{
          name: '门店分布',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: null
        }]
      },
      mapData: [
        {name: '北京'},
        {name: '天津'},
        {name: '上海'},
        {name: '重庆'},
        {name: '河北'},
        {name: '河南'},
        {name: '云南'},
        {name: '辽宁'},
        {name: '黑龙江'},
        {name: '湖南'},
        {name: '安徽'},
        {name: '山东'},
        {name: '新疆'},
        {name: '江苏'},
        {name: '浙江'},
        {name: '江西'},
        {name: '湖北'},
        {name: '广西'},
        {name: '甘肃'},
        {name: '山西'},
        {name: '内蒙古'},
        {name: '陕西'},
        {name: '吉林'},
        {name: '福建'},
        {name: '贵州'},
        {name: '广东'},
        {name: '青海'},
        {name: '西藏'},
        {name: '四川'},
        {name: '宁夏'},
        {name: '海南'},
        {name: '台湾'},
        {name: '香港'},
        {name: '澳门'}
      ]
    }
  },
  activated () {
    this.getShopInfo()
  },
  methods: {
    getShopInfo () {
      let that = this
      new IfAccessToken({
        method: 'get',
        params: {
          per_page: 100,
          page: 1
        },
        url: that.$interfaces.dealer_stores,
        success: function (data) {
          console.log(data)
          if (data.code === 'SUCCESS') {
            that.mapData.forEach((item) => {
              item['stores'] = []//  门店数据
              item['tooltip'] = {//  标签展示
                formatter (params) {
                  let str = `${params.data.name}门店数量：${params.data.stores.length}家</br>`
                  params.data.stores.forEach((item) => {
                    str += `${item.name}</br>`
                  })
                  return str
                }
              }
              data.data.forEach((store) => {
                if (store.province.includes(item.name)) { //  门店分组
                  item.stores.push(store)
                }
              })
              item['value'] = item.stores.length //  门店数量
            })
            that.drawLine()
          }
        }
      })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart)
      this.optionMap.series[0].data = this.mapData
      // 绘制图表
      myChart.setOption(this.optionMap)
    }
  }
}
</script>

<style lang='stylus' scoped>
  .container
    width: 100%
    height: 100%
    #myChart
      width: 100%
      height: 100%
</style>
