<template>
    <div class="container">
      <div class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>门店管理</el-breadcrumb-item>
          <el-breadcrumb-item>门店列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
          <el-input class="search-input" placeholder="请输入查询内容" v-model="keyword"></el-input>
          <el-button class="search-btn" type="primary" @click="search">查询</el-button>
          <el-button class="search-all-btn" type="primary" @click="searchAll">全部门店</el-button>
        </div>
      </div>
      <div class="center">
        <el-table
          class="table"
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="id"
            label="#"
            sortable
            width="80">
          </el-table-column>
          <el-table-column
            prop="serial"
            label="门店编号"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="门店名称"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建日期"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="地址"
            sortable
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                :disabled = "dealer_view_user"
                @click="showMember(scope.$index, scope.row)">查看门店成员</el-button>
              <el-dialog title="门店成员" :visible.sync="dialogTableVisible">
                <el-table :data="gridData">
                  <el-table-column property="id" label="#" width="150"></el-table-column>
                  <el-table-column property="nickname" label="姓名" width="200"></el-table-column>
                  <el-table-column property="account" label="账号"></el-table-column>
                </el-table>
              </el-dialog>
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
import interfaces from 'javascript/interface'
import IfAccessToken from 'javascript/token'
export default {
  name: 'shop',
  data () {
    return {
      page: 1,
      tableData: [],
      gridData: [],
      dialogTableVisible: false,
      keyword: '',
      total: 0
    }
  },
  activated () {
    this.getShopInfo()
  },
  computed: {
    dealer_view_user () {
      return !this.$permissions('dealer_view_user')
    }
  },
  methods: {
    showMember (index, row) {
      this.getShopUserInfo(row.id)
      this.dialogTableVisible = true
    },
    search () {
      this.page = 1
      this.getShopInfo()
    },
    searchAll () {
      this.page = 1
      this.keyword = ''
      this.getShopInfo()
    },
    getShopInfo () {
      let that = this
      new IfAccessToken({
        method: 'get',
        params: {
          per_page: 20,
          page: that.page,
          keyword: this.keyword
        },
        url: interfaces.dealer_stores,
        success: function (data) {
          if (data.code === 'SUCCESS') {
            that.tableData = data.data
            that.total = data.num_page
          } else {
            this.$message({
              message: '门店获取失败',
              type: 'warning'
            })
          }
        }
      })
    },
    getShopUserInfo (id) {
      let that = this
      new IfAccessToken({
        method: 'get',
        url: `${interfaces.dealer_stores}/${id}`,
        success: function (data) {
          that.gridData = data.data.users
        }
      })
    },
    changePage (page) {
      this.page = page
      this.getShopInfo()
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
      .search
        float right
        height: 100%
        .search-input
          width:200px
        .search-btn
          margin-left:10px
          height: 40px
    .center
      flex:1
      .table >>> thead th
          background: #eef1f6;
    .pagination
      margin:20px auto
</style>
