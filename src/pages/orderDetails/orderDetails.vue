<template>
    <div class="container">
      <div class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="center">
        <div class="order-header">
          <div class="order-status">订单状态：{{orderData.order_status}}</div>
          <div class="order-status">订单进度：{{orderData.confirm_receipt}}</div>
          <div class="order-status">订单编号：{{orderData.order_serial_number}}</div>
        </div>
        <div class="order-outline">
          <div class="order-title">订单概要</div>
          <table>
            <tbody>
              <tr>
                <td>下单时间：{{orderData.create_date}}</td>
                <td>修改时间：{{orderData.update_time}}</td>
              <tr>
                <td>支付方式：{{orderData.payment_method}}</td>
                <td>收货人姓名：{{orderData.receiver}}</td>
              </tr>
              <tr>
                <td>收货人手机号：{{orderData.phone_number}}</td>
                <td>收货人地址：{{orderData.shippingaddress}}</td>
              </tr>
              <tr>
                <td>发货方式：{{orderData.delivery_method}}</td>
                <td>发货时间：{{orderData.delivery_time}}</td>
              </tr>
              <tr>
                <td>运单编号：{{orderData.waybill_number}}</td>
                <td>物流状态：{{orderData.logistics_status}}</td>
              </tr>
              <tr>
                <td>发货方式：{{orderData.delivery_method}}</td>
                <td>发货时间：{{orderData.delivery_time}}</td>
              </tr>
              <tr>
                <td>商品总金额：{{orderData.total_money}}元</td>
                <td>运费金额：{{orderData.freight}}元</td>
                <td>实际金额：{{orderData.need_pay}}元</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="order-details">
          <div class="order-title">订单详情</div>
          <el-table
            class="table"
            border
            :data="orderData.cartitem"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="name"
              label="商品名称"
            >
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="数量"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格/元"
            >
            </el-table-column>
            <el-table-column
              prop="category"
              label="商品类型"
            >
            </el-table-column>
            <el-table-column
              prop="series"
              label="系列"
            >
            </el-table-column>
            <el-table-column label="详细信息" width="500">
              <template slot-scope="scope">
                <div class="attribute" v-for="(item, index) in scope.row.attributes_values" :key="index">
                  <div class="left">{{item.attribute}}：</div>
                  <div class="center" v-html="item.attribute_value"></div>
                  <img class="right" :src="item.attribute_value_img" v-if="item.attribute_value_img">
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
import IfAccessToken from 'javascript/token'
import DataImgSrc from 'javascript/common'
import {mapState} from 'vuex'
export default {
  name: 'OrderDetails',
  data () {
    return {
      orderData: {}
    }
  },
  orderData: null,
  mounted () {
    // this.getOrderDetailsInfo()
  },
  activated () {
    this.getOrderDetailsInfo()
  },
  computed: {
    ...mapState(['statics'])
  },
  methods: {
    getOrderDetailsInfo () {
      let that = this
      console.log(this.statics)
      const statics = this.statics.subattributes//  获取表情
      new IfAccessToken({
        method: 'get',
        url: `${this.$interfaces.dealer_orders}/${this.$route.params.id}`,
        success: function (data) {
          console.log(data.data)
          if (data.code === 'SUCCESS') {
            let orderStatus = ['待付款', '已付款', '已发货', '已收货', '已取消']
            let logisticsStatus = ['未发货', '正在配送', '已签收']
            let paymentMethod = ['无', '支付宝', '微信支付', '线下支付']
            let confirmReceipt = ['未支付', '待门店确认', '待经销商确认', '待梦工场确认', '已确认收款']
            data.data.order_status = orderStatus[data.data.order_status]
            data.data.logistics_status = logisticsStatus[data.data.logistics_status]
            data.data.payment_method = paymentMethod[data.data.payment_method]
            data.data.confirm_receipt = confirmReceipt[data.data.confirm_receipt]
            for (var i in data.data) {
              if (!data.data[i]) {
                data.data[i] = '暂无'
              }
            }
            data.data.cartitem.forEach((item) => {
              item.attributes_values.forEach((value) => {
                if (value.attribute_value_img) {
                  value.attribute_value_img = `${DataImgSrc(value.attribute_value_img)}`
                }
                for (var n = 0; n < statics.length; n++) {
                  for (var m = 0; m < statics[n].values.length; m++) {
                    let item = `<img style="height:20px;margin: 5px 0;" src="${DataImgSrc(statics[n].values[m].img)}"/>`
                    let num = statics[n].values[m].webgl_num
                    let allitem = new RegExp('\\[' + num + '\\]', 'g')
                    value.attribute_value = value.attribute_value.replace(allitem, item)
                  }
                }
              })
            })
            that.orderData = data.data
          } else {
            this.$message({
              message: '订单详情失败',
              type: 'warning'
            })
          }
        }
      })
    }
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
    .order-title
      box-sizing border-box
      padding-left: 16px;
      border: 1px solid #E1E6EB
      border-left: 3px solid #778
      background #F4F5F9
      width: 100%
      line-height 40px
    .order-header
      width: 100%
      background-color: #F9F9F9
      border: 1px solid #DDD
      box-sizing border-box
      padding:10px 20px
      margin-bottom: 20px
      .order-status
        line-height 20px
    .order-outline
      width: 100%
      height: auto
      margin-bottom: 20px
      table
        width: 100%
        tbody
          width: 100%
          tr
            display flex
            flex-direction row
            td
              flex: 1
              padding: 12px 8px;
              vertical-align: middle;
              border: 1px solid #dddddd;
              border-top:0
    .order-details
      width: 100%
      height: auto
      margin-bottom: 20px
      .attribute
        width: 100%
        height: 30px
        overflow hidden
        .left
          text-align right
          width: 80px
          line-height 30px
          float left
        .center
          float left
          line-height 30px
        .right
          margin: 5px
          float left
          display block
          height: 20px
</style>
