<template>
  <div class="container">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="keywordSearch">
        <el-input class="search-input" placeholder="请输入查询内容" v-model="keyword"></el-input>
        <el-button class="search-btn" type="primary" @click="search">查询</el-button>
      </div>
      <div class="storeSearch">
        <el-select v-model="serialName" placeholder="请选择门店" @change="serialChange">
          <el-option label="全部门店" value="null"></el-option>
          <el-option
            v-for="item in userInfo.stores"
            :key="item.serial"
            :label="item.name"
            :value="item.serial">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="order_status">
      <el-button type="primary"
         v-for="(item, index) in status_list"
         :key="index"
         plain
         :class="order_status === item.status?'active':''"
         @click="orderStatusChange(item.status)"
         :status="item.status">
        {{item.name}}
      </el-button>
    </div>
    <div class="center">
      <el-table
        class="table"
        height="100%"
        :data="neworderData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="id"
          label="#"
          sortable
          width="80">
        </el-table-column>
        <el-table-column
          prop="order_serial_number"
          label="订单编号"
          sortable
          width="180">
          <template slot-scope="scope" >
            <router-link class="details" :to="'/orderDetails/' + scope.row.id">{{scope.row.order_serial_number}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="创建时间"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="user__nickname"
          label="买家昵称"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="payment_method"
          label="支付方式"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="order_status"
          label="订单状态"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="confirm_receipt"
          label="订单进度"
          sortable
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" >
            <template v-if="scope.row.confirm_receipt === '待门店确认' && scope.row.order_status === '已付款'">
              <el-button
                size="mini"
                type="primary"
                :disabled="dealer_confirm_receipt"
                @click="storeConfirm(scope.$index, scope.row)">门店确认</el-button>
            </template>
            <template v-else>无</template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      @current-change="changePage"
      :current-page="page"
      background
      layout="prev, pager, next"
      :page-count="total">
    </el-pagination>
  </div>
</template>

<script>
// import token from 'javascript/token'
import IfAccessToken from 'javascript/token'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'order',
  data () {
    return {
      page: 1,
      keyword: '',
      serialName: '全部门店',
      serialNum: null,
      order_status: null,
      status_list: [{
        name: '全部订单',
        status: null
      },
      {
        name: '待付款',
        status: 0
      },
      {
        name: '已付款',
        status: 1
      },
      {
        name: '已发货',
        status: 2
      },
      {
        name: '已收货',
        status: 3
      },
      {
        name: '已取消',
        status: 4
      }],
      orderData: [],
      total: 0
    }
  },
  activated () {
    this.getOrderInfo()
  },
  computed: {
    dealer_confirm_receipt () {
      return !this.$permissions('dealer_confirm_receipt')
    },
    ...mapState(['userInfo']),
    neworderData () {
      const orderData = this.orderData
      orderData.forEach((item) => {
        let orderStatus = ['待付款', '已付款', '已发货', '已收货', '已取消']
        let logisticsStatus = ['未发货', '正在配送', '已签收']
        let paymentMethod = ['无', '支付宝', '微信支付', '线下支付']
        let confirmReceipt = ['未支付', '待门店确认', '待经销商确认', '待梦工场确认', '已确认收款']
        item.order_status = orderStatus[item.order_status]
        item.logistics_status = logisticsStatus[item.logistics_status]
        item.payment_method = paymentMethod[item.payment_method]
        item.confirm_receipt = confirmReceipt[item.confirm_receipt]
      })
      return orderData
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.confirm_receipt === '待门店确认' && row.order_status === '已付款') {
        return 'warning-row'
      }
      return ''
    },
    storeConfirm (index, row) {
      let that = this
      new IfAccessToken({
        method: 'PATCH',
        url: `${this.$interfaces.dealer_orders}/${row.id}`,
        data: that.$qs.stringify({
          key: 'confirm_receipt',
          value: 2
        }),
        success: function (data) {
          console.log(data)
          if (data.code === 'SUCCESS') {
            that.$message({
              message: '确认成功',
              type: 'success'
            })
            that.getOrderInfo()
          } else if (data.code === 'mch.ORDER_NOT_EXIST') {
            that.$message({
              message: '订单不存在',
              type: 'warning'
            })
          } else if (data.code === 'mch.PERMISSION_DENIED') {
            that.$message({
              message: '权限不足',
              type: 'warning'
            })
          } else {
            that.$message({
              message: '订单确认失败',
              type: 'warning'
            })
          }
        }
      })
    },
    search () {
      this.page = 1
      this.order_status = null
      this.serialNum = null
      this.serialName = '全部门店'
      this.getOrderInfo()
    },
    orderStatusChange (status) {
      if (status !== this.order_status) { this.order_status = status }
      this.keyword = ''
      this.page = 1
      this.getOrderInfo()
    },
    serialChange (value) {
      if (value === 'null') { value = null }
      this.serialNum = value
      this.page = 1
      this.getOrderInfo()
    },
    ...mapMutations(['changeStatics']),
    getOrderInfo () {
      let that = this
      new IfAccessToken({
        method: 'get',
        params: {
          per_page: 20,
          page: that.page,
          keyword: that.keyword,
          order_status: that.order_status,
          store_serial: that.serialNum
        },
        url: this.$interfaces.dealer_orders,
        success: function (data) {
          console.log(data)
          that.changeStatics(data.static)
          if (data.code === 'SUCCESS') {
            that.orderData = data.data
            that.total = data.num_page
          } else {
            this.$message({
              message: '订单列表失败',
              type: 'warning'
            })
          }
        }
      })
    },
    changePage (page) {
      this.page = page
      this.getOrderInfo()
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
    overflow hidden
    .order_status
      width: 100%
      height:60px
      background #f2f2f2
      box-sizing border-box
      padding:10px 20px
      margin-bottom:20px
      .active
        background #409eff
        color: #fff
    .header
      width:100%
      height:40px
      margin-bottom:20px
      .nav
        height:100%
        float left
      .storeSearch
        float right
        height: 100%
        margin-right:20px
      .keywordSearch
        float right
        height: 100%
        .search-input
          width:200px
        .search-btn
          margin-left:10px
          height: 40px
    .center
      flex:1
      overflow scroll
      .el-table >>> .el-table__header-wrapper thead tr th
          background #eef1f6
      .el-table >>> .warning-row
          background: oldlace
      .el-table >>> .success-row
          background: #f0f9eb
    .pagination
      margin:20px auto
</style>
