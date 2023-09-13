
<template>
  <div>
    <div class="title-container">
      <basics-title title="扫码购买监控" line />
    </div>
    <div class="app-container">

      <basics-search ref="search" :loading="loadings._ai_api_api_fx_op_order_api_getOrderRecord" :searchs="searchs" @changeSearch="changeSearch" @submitSearch="submitSearch" />

      <basics-action :actions="act" />

      <basics-table
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :loading="loadings._ai_api_api_fx_op_order_api_getOrderRecord"
        :list-query="listQuery"
        @sort-change="sort"
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
import columns from './columns'
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
      columns,
      searchs,
      list: [],
      total: 0,
      listQuery: { ...init_pagination },
      act: act({ manualRefresh: this.manualRefresh }),
      searchQuery: {}
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  methods: {
    // 列表排序字段函数
    sort(obj) {
      const { prop, order } = obj
      const type = { ascending: 2, descending: 1 }
      this.searchQuery = {
        ...this.searchQuery,
        orderColumn: prop,
        sort: type[order]
      }
      this.getList()
    },

    // 手动刷新
    manualRefresh() {
      const { dataStartTime: startTime, dataEndTime: endTime } = this.searchQuery
      if (!startTime || !endTime) return this.$message.error('请选择数据时间！')
      this.$api.refreshOperateTrack({ startTime, endTime }).then((result) => {
        !result.code && this.getList()
      })
    },

    // 搜索change
    changeSearch(values) {
      const {
        dataTime: [dataStartTime, dataEndTime],
        reportTime: [reportStartTime, reportEndTime],
        spreadUserId
      } = values
      this.searchQuery = { dataStartTime, dataEndTime, reportStartTime, reportEndTime, spreadUserId }
      this.getList()
    },

    // 提交查询
    submitSearch(values) {
      this.listQuery = { ...init_pagination }
      this.getList()
    },
    // 获取 列表数据
    async getList() {
      const { listQuery: { page, limit }, searchQuery } = this
      const res = await this.$api.operateTrackList({ currentPage: page, size: limit, ...searchQuery })
      const { totalCount, operateTrackDtoList } = res.payload
      this.list = operateTrackDtoList
      this.total = parseInt(totalCount)
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
  ::v-deep .el-alert  {
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
  ::v-deep .el-alert--success  {
    border: 1px solid #13ce66;
  }
  ::v-deep .el-alert--info  {
    border: 1px solid #909399;
  }
  ::v-deep .el-alert--warning  {
    border: 1px solid #ffba00;
  }
  ::v-deep .el-alert--error  {
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
