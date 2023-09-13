<template>
  <div>
    <!-- 筛选框 -->
    <basics-search
      ref="searchs"
      :searchs="searchs"
      :loading="loadings._ai_api_graphql_v1_toss"
      @changeSearch="onSearchChange"
      @submitSearch="onSearchSubmit"
    />
    <!-- 统计图表 -->
    <data-chart :statis-data="statisData" :loading="loadings._ai_api_graphql_v1_toss" />

    <!-- 导出 -->
    <section class="action-bar">
      <el-button :loading="loadings._ai_api_graphql_export" @click="handleExport">导出</el-button>
    </section>

    <!-- 表格 -->
    <basics-table
      ref="table"
      :columns="columns"
      :list="list"
      :loading="loadings._ai_api_graphql_v1_toss"
      :total="total"
      :list-query="paginationQuery"
      :get-list="getList"
      :action-function="actionFunction"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsTable from '@/components/BasicsTable'
import { createBlob } from '@/utils'
import {
  getAIList,
  getAIStatistics,
  handleAIExport,
  updateAIState
} from '@/api/operate/class-evaluate'
import DataChart from './components/DataChart'
import { SearchsConfig, ColumnsConfig, EVALUATION_TAG_0, EVALUATION_TAG_1, EVALUATION_TAG_2, Actions } from './config'

const EVALUATION_TAGS = { EVALUATION_TAG_0, EVALUATION_TAG_1, EVALUATION_TAG_2 }
const initPaninationQuery = { page: 1, limit: 10 }

export default {
  name: 'AI',
  components: { BasicsSearch, BasicsTable, DataChart },
  data() {
    return {
      searchs: SearchsConfig,
      columns: ColumnsConfig,
      actionFunction: Actions({
        setInvaild: this.setInvaild
      }),
      searchQuery: {}, // 搜索框query
      paginationQuery: { ...initPaninationQuery }, // 分页查询query
      list: [], // 表格数据
      total: 0, // 总数
      statisData: {}, // 统计数据
      checkedSelectionKeys: [] // table选中的key
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
      this.getStatistics()
    })
  },
  methods: {
    // 搜索框值更改
    onSearchChange(val) {
      const { searchs } = this
      const newSearchs = [...searchs]
      const { feedback_type } = val
      newSearchs.forEach(v => {
        if (v.prop === 'tag') {
          if ([0, 1, 2].includes(feedback_type)) {
            v.options = [...EVALUATION_TAGS[`EVALUATION_TAG_${feedback_type}`]]
          } else {
            v.options = [...EVALUATION_TAG_0, ...EVALUATION_TAG_1, ...EVALUATION_TAG_2]
          }
        }
      })
      this.searchs = newSearchs
    },
    // 搜索框提交
    onSearchSubmit(values) {
      const { feedback_type, tag } = values
      const searchQueryTemp = _.pickBy(values, _.identity)
      if (feedback_type === 0) {
        searchQueryTemp.feedback_type = 0
      }
      if (searchQueryTemp.task_time) {
        searchQueryTemp.task_time = { gte: moment(searchQueryTemp.task_time[0]).valueOf(), lte: moment(searchQueryTemp.task_time[1]).valueOf() }
      }
      if (tag) {
        searchQueryTemp.tag && delete searchQueryTemp.tag
        if (values.tag.length) {
          searchQueryTemp['tag.like'] = { 'tag.keyword': `*${tag.join(',')}*` }
        }
      }
      this.searchQuery = searchQueryTemp
      this.paginationQuery = initPaninationQuery
      this.getList()
      this.getStatistics()
    },
    // 设置 有/无效
    setInvaild(dat, row, index) {
      const confirmTitle = row.state ? '有效' : '无效'
      this.$confirm(`确定设为${confirmTitle}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateAIState({ id: row.id, state: row.state === 0 ? 1 : 0 }).then(res => {
          if (res && res.code === 0) {
            this.$message({
              type: 'success',
              message: `设置${confirmTitle}成功～`
            })
            this.getList()
            // this.getStatistics()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消设置'
        })
      })
    },
    // 获取表格数据
    getList() {
      this.checkedSelectionKeys = []
      getAIList({ searchQuery: this.searchQuery, paginationQuery: this.paginationQuery }).then((res) => {
        if (res && res.data && res.data.StudentFeedBackZhongTaiStatisticsPage) {
          const { data: { StudentFeedBackZhongTaiStatisticsPage: { content = [], totalElements = 0 }}} = res
          this.list = content
          this.total = ~~totalElements
        }
      })
    },
    // 获取统计数据
    getStatistics() {
      getAIStatistics(this.searchQuery).then(res => {
        if (res && res.data) {
          this.statisData = res.data.StudentFeedBackZhongTaiSumStatistics || {}
        }
      })
    },
    // 导出
    handleExport() {
      if (!this.checkedSelectionKeys.length) {
        this.$message({
          type: 'error',
          message: '请勾选导出项～'
        })
        return
      }
      handleAIExport(this.checkedSelectionKeys).then(res => {
        createBlob(
          `小熊美术课后评价数据统计-${moment().format('YYYY-MM-DD')}.xls`,
          res
        )
      })
    },
    // 表格勾选
    handleSelectionChange(values) {
      this.checkedSelectionKeys = values && values.length ? values.map(v => v.id) : []
    }
  }
}
</script>

<style lang="scss" scoped>
.action-bar {
  margin-bottom: 15px;
  text-align: right;
}
</style>
