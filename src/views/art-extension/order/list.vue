
<template>
  <div>
    <div class="title-container">
      <basics-title title="订单查询" line />
    </div>
    <div class="app-container">

      <basics-search ref="search" :loading="loadings._ai_api_api_fx_op_order_api_getOrderRecord" :searchs="searchs" @submitSearch="submitSearch" />

      <!-- <basics-action :actions="act" /> -->

      <!-- <div class="action-item action-item__line">
        <el-alert
          type="primary"
          :title="`订单量：${orderNum}；收益金额：${orderProfit}`"
          :closable="false"
        />
      </div> -->

      <basics-statics type="slot" :actions="act">
        <template>
          <slot>{{ `订单量：${orderNum}；收益金额：${orderProfit}` }}</slot>
        </template>
      </basics-statics>

      <basics-table
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :loading="loadings._ai_api_api_fx_op_order_api_getOrderRecord"
        :list-query="listQuery"
        :action-function="actions"
      >
        <template slot="name" slot-scope="scope">
          <div>uid: {{ scope.row.uid }}</div>
          <div>昵称: {{ scope.row.name }}</div>
        </template>
        <template slot="course" slot-scope="scope">
          <div>{{ scope.row.subjectInfo ? scope.row.subjectInfo : '-' }}</div>
          <div>{{ scope.row.amount ? scope.row.amount : '-' }}</div>
        </template>
        <template slot="mony" slot-scope="scope">
          <div>{{ scope.row.buyTimeInfo ? scope.row.buyTimeInfo : '-' }}</div>
          <div>{{ scope.row.refundTimeInfo ? scope.row.refundTimeInfo : '-' }}</div>
        </template>
        <template slot="status" slot-scope="scope">
          <el-popover
            placement="top"
            width="400"
            trigger="click"
          >
            <div>
              <div v-for="(item,key) in scope.row.fxOrderDeatilOpVoList" :key="key" class="detail_list">
                <div style="margin-right: 10px; margin-left: 10px;">{{ item.arrivalTimeInfo }}</div>
                <el-button round size="mini" style="margin-right: 60px">{{ item.statusInfo }}</el-button>
                <div>{{ item.profitAmount }}</div>
              </div>
            </div>
            <el-link slot="reference" type="primary">{{ scope.row.statusInfo }}</el-link>
          </el-popover>
        </template>
      </basics-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { orderRecordList, orderNumAndProfit, getAllOrderFilterStatus, getAllOrderSubject } from '@/api/art-extension/order'
import columns, { tableAction } from './columns'
import searchs from './searchs'
import { default as act } from './actions/index'
const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'Order',
  data() {
    return {
      orderNum: 0,
      orderProfit: 0,
      columns,
      searchs,
      list: [],
      total: 0,
      listQuery: { ...init_pagination },
      act: act({ exportOder: this.exportOder, exportProfit: this.exportProfit }),
      actions: tableAction({ handleTableAction: this.handleTableAction }),
      searchQuery: { }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  async mounted() {
    this.getList()
    this.getEnum()
  },
  methods: {
    // 获取所有订单筛选状态
    async getEnum() {
      Promise.all([getAllOrderFilterStatus(), getAllOrderSubject()]).then(res => {
        this.$refs.search && this.$refs.search.set({
          type: 'options',
          data: {
            orderFilterStatus: res[0].payload.map((item) => { return { label: item.statusInfo, value: item.status } }),
            subject: res[1].payload.map((item) => { return { label: item.codeInfo, value: item.code } })
          }
        })
      })
    },
    exportOder() {
      const data = {
        hasAll: true,
        currentPage: 1
      }
      const { mobile, spreadUserMobile, buyTime = [], spreadUserId, subject, orderFilterStatus, pid } = this.$refs.search.formData
      let buyStartTime = ''
      let buyEndTime = ''
      if (buyTime && buyTime.length) {
        buyStartTime = buyTime[0]
        buyEndTime = buyTime[1]
      }
      orderFilterStatus && (data.orderFilterStatus = orderFilterStatus)
      subject !== '' && (data.subject = subject)
      orderFilterStatus !== '' && (data.orderFilterStatus = orderFilterStatus)
      mobile && (data.mobile = mobile)
      spreadUserMobile && (data.spreadUserMobile = spreadUserMobile)
      buyStartTime && (data.buyStartTime = buyStartTime)
      buyEndTime && (data.buyEndTime = buyEndTime)
      spreadUserId && (data.spreadUserId = spreadUserId)
      pid && (data.pid = pid)
      axios.post('/ai_api/api/fx/op/order/api/exportOrderRecord', data, { responseType: 'blob' }).then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', '订单记录报表.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    },
    exportProfit() {
      const data = {
        hasAll: true,
        currentPage: 1
      }
      const { mobile, spreadUserMobile, buyTime = [], spreadUserId, subject, orderFilterStatus, pid } = this.$refs.search.formData
      orderFilterStatus && (data.orderFilterStatus = orderFilterStatus)
      subject !== '' && (data.subject = subject)
      orderFilterStatus !== '' && (data.orderFilterStatus = orderFilterStatus)
      let buyStartTime = ''
      let buyEndTime = ''
      if (buyTime && buyTime.length) {
        buyStartTime = buyTime[0]
        buyEndTime = buyTime[1]
      }
      mobile && (data.mobile = mobile)
      spreadUserMobile && (data.spreadUserMobile = spreadUserMobile)
      buyStartTime && (data.buyStartTime = buyStartTime)
      buyEndTime && (data.buyEndTime = buyEndTime)
      spreadUserId && (data.spreadUserId = spreadUserId)
      pid && (data.pid = pid)
      axios.post('/ai_api/api/fx/op/order/api/exportExtractRecord', data, { responseType: 'blob' }).then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', '收益记录报表.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    },
    // 提交查询
    submitSearch(values) {
      const { mobile, spreadUserMobile, spreadUserId, buyTime, subject, orderFilterStatus, pid } = values
      const payload = { mobile, spreadUserMobile, spreadUserId, subject, orderFilterStatus, pid }
      console.log(payload, 'opop')
      for (const key in payload) {
        if (values[key] === '') {
          delete payload[key]
        }
      }
      if (buyTime) {
        payload.buyStartTime = buyTime[0]
        payload.buyEndTime = buyTime[1]
      }
      this.searchQuery = payload
      this.initPaginationAndGetList()
    },
    // 重置分页，查询列表
    initPaginationAndGetList() {
      this.listQuery = { ...init_pagination }
      this.getList()
    },
    // 获取 列表数据
    async getList() {
      const { listQuery: { page, limit }, searchQuery } = this
      const res = await orderRecordList({ currentPage: page, size: limit, ...searchQuery })
      const { totalCount, fxCommissionRecordOpDtoList } = res.payload
      this.list = fxCommissionRecordOpDtoList
      this.total = parseInt(totalCount)
      const numRes = await orderNumAndProfit({ hasAll: true, currentPage: page, ...searchQuery })
      this.orderNum = numRes.payload.orderNum
      this.orderProfit = numRes.payload.orderProfit
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-el-badge {
  ::v-deep .el-badge__content.is-fixed {
    top: 12px;
    right: 2px;
  }
}
.detail_list {
  display: flex;
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
}
.action-item {
  margin-bottom: 10px;
  margin-right: 10px;
  float: left;
  ::v-deep .el-alert {
    min-height: 36px;
    padding: 0 16px 0 8px;
    .el-alert__closebtn {
      top: 14px;
      right: 8px;
    }
    .el-alert__content {
      padding: 2px 8px 0;
      line-height: 0;
    }
  }
  ::v-deep .el-alert--success {
    border: 1px solid #13ce66;
  }
  ::v-deep .el-alert--info {
    border: 1px solid #909399;
  }
  ::v-deep .el-alert--warning {
    border: 1px solid #ffba00;
  }
  ::v-deep .el-alert--error {
    border: 1px solid #ff4949;
  }
}
.action-item__line {
  min-height: 36px;
  line-height: 36px;
}
.action-item__left {
  float: left;
}
.action-item__right {
  float: right;
}
.action-margin-top {
  margin-top: 30px;
}
.el-alert--primary {
  background-color: rgba(23, 144, 255, 0.15);
  color: #1790ff;
  border: 1px solid #1790ff;
  min-height: 36px;
  ::v-deep .el-alert__icon {
    color: #1790ff;
    &:before {
      content: "\e731";
    }
  }
}
</style>
