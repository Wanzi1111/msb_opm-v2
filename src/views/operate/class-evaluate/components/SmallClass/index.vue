<template>
  <div>
    <basics-search
      ref="searchs"
      :loading="loadings._msb_api_app_listLessonComment"
      :searchs="searchs"
      @submitSearch="submitSearch"
      @changeSearch="changeSearch"
    />

    <data-chart
      :chart-data="chartData"
      :loading="loadings._msb_api_app_commentRatio"
    />

    <basics-table
      ref="table"
      :table="table"
      :loading="loadings._msb_api_app_listLessonComment"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
    />
  </div>
</template>

<script>
import {
  listLessonComment,
  commentRatio,
  invalidComment
} from '@/api/operate/class-evaluate'
import BasicsTable from '@/components/BasicsTable'
import BasicsSearch from '@/components/BasicsSearch'
import DataChart from './components/DataChart'
import columns from './columns/list'
import searchs from './searchs/searchs'
// import moment from 'moment'
import { mapGetters } from 'vuex'

const initPagination = { page: 1, limit: 20 }

export default {
  name: 'SmallClass',
  components: { BasicsTable, BasicsSearch, DataChart },
  data() {
    return {
      table: { stripe: true },
      columns: columns,
      searchs: searchs,
      total: 0,
      list: [],
      chartData: {},
      query: { tab: 1 },
      listQuery: { ...initPagination }
      // actionFunction: actions({
      //   setInvaild: this.setInvaild
      // })
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
    getStatistics() {
      const { query } = this
      const classTime = query.classTime || []
      const data = {
        ...query,
        startTime: classTime[0],
        endTime: classTime[1]
      }
      delete data.classTime
      for (const name in data) {
        !data[name] && data[name] !== 0 && delete data[name]
      }
      commentRatio(data).then(res => {
        if (res.status === 0) {
          this.chartData = res.data || {}
        }
      })
    },
    getList() {
      const { query, listQuery } = this
      const classTime = query.classTime || []
      const data = {
        ...query,
        startTime: classTime[0],
        endTime: classTime[1]
      }
      delete data.classTime
      for (const name in data) {
        !data[name] && data[name] !== 0 && delete data[name]
      }
      listLessonComment({
        pageNum: listQuery.page,
        pageSize: listQuery.limit,
        ...data
      }).then(res => {
        const data = res?.data || {}
        this.list = data?.list || []
        this.total = data?.total || 0
      })
    },
    // 搜索
    submitSearch(val) {
      this.listQuery = initPagination
      this.query = { ...val, tab: 1 }
      this.getList()
      this.getStatistics()
    },
    changeSearch(val, oldVal) {
      if (val.classTime.length > 0) {
        this.classTime = val.classTime
      }
      this.query = { ...val, tab: 1 }
    },
    // 设置无效
    setInvaild(dat, row, index) {
      console.log(dat, row, index)
      const title = row.del ? '有效' : '无效'

      this.$confirm(`确定设为${title}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // query.enabled = 1
        // query.id = item.id
        // this.addClass(query)
        const query = {
          id: row.id,
          del: row.del ? 0 : 1
        }
        invalidComment(query).then(res => {
          this.$message({
            type: 'info',
            message: `已设置${title}`
          })
          this.getList()
        })
      })
    }
  }
}
</script>
