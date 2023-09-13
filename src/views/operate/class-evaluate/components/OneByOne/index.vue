<template>
  <div>
    <!-- <el-tabs v-model="activeName">
      <el-tab-pane label="课后评价" name="0">
      </el-tab-pane>
    </el-tabs> -->
    <basics-search
      ref="searchs"
      :loading="loadings._api_pc_operate_list"
      :searchs="searchs"
      @submitSearch="submitSearch"
      @changeSearch="changeSearch"
    />
    <DataChart :chart-data="chartData" :class-time="classTime" :loading="loadings._msb_api_app_commentRatio" />
    <!-- <basics-action :actions="formal" />
    <basics-action :actions="act" /> -->
    <basics-table
      ref="table"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :table="table"
      :loading="loadings._msb_api_app_listCommentLabel || loadings._msb_api_app_listLessonComment"
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
  exportEvaluate,
  listLessonComment,
  commentRatio,
  invalidComment
} from '@/api/operate/class-evaluate'
import BasicsTable from '@/components/BasicsTable'
import BasicsSearch from '@/components/BasicsSearch'
import DataChart from './DataChart'
import formal from './actions/formal'
import columns from './columns/list'
// import columns, { actions } from './columns/list'
import searchs from './searchs/searchs'
import moment from 'moment'
import { createBlob } from '@/utils'
import store from '@/store'
import { mapGetters } from 'vuex'

const defStatistics = {
  auFour: '',
  foFour: '',
  foThree: '',
  foPercen: '',
  foEvaluate: '',
  foOne: '',
  foCount: '',
  foFive: '',
  auPercen: '',
  foTwo: '',
  auEvaluate: '',
  auTwo: '',
  auCount: '',
  auFive: '',
  auThree: '',
  auOne: ''
}
export default {
  name: 'OneByOne',
  components: { BasicsTable, BasicsSearch, DataChart },
  data() {
    return {
      table: { stripe: true },
      columns: columns,
      searchs: searchs,
      chartData: null,
      classTime: [
        moment()
          .subtract(1, 'month')
          .format('YYYY-MM-DD HH:mm:ss'),
        moment().format('YYYY-MM-DD HH:mm:ss')
      ],
      total: 0,
      // actionFunction: actions({
      //   setInvaild: this.setInvaild
      // }),
      formal: formal({ statistics: defStatistics }),
      list: [],
      query: {},
      searchQuery: {},
      labelData: JSON.parse(localStorage.getItem('dataLabel')),
      listQuery: {
        page: 1,
        limit: 20
      },
      activeName: 0,
      rowStyle: {
        height: 0
      },
      cellStyle: {
        padding: 0
      }
      // activeName: 0
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {},
  mounted() {
    const labelData = JSON.parse(localStorage.getItem('dataLabel'))

    this.$nextTick(() => {
      this.getStatistics()
      if (!labelData || JSON.stringify(labelData) === '{}') {
        store.dispatch('app/getClassLabel', { cb: this.getList })
      } else {
        this.getList()
      }
    })
  },
  methods: {
    // 获取统计数据
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
    // 获取投诉列表
    getList() {
      const { query, listQuery } = this
      this.searchQuery = { ...query }
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
        const data = res.data || {}
        this.list = data.list || []

        this.total = data.total || 0
      })
    },
    // 搜索
    submitSearch(val) {
      console.log('val', val)
      this.listQuery = {
        page: 1,
        limit: 20
      }
      this.query = val
      this.getList()
      this.getStatistics()
    },
    changeSearch(val, oldVal) {
      if (val.classTime.length > 0) {
        this.classTime = val.classTime
      }
      this.query = val
    },
    // 设置无效
    setInvaild(dat, row, index) {
      console.log(dat, row, index)
      const title = row.del ? '有效' : '无效'

      this.$confirm(`确定设为${title}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
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
            this.getStatistics()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设置'
          })
        })
    },
    // 导出
    exportDocument() {
      const { searchQuery } = this
      const classTime = searchQuery.classTime || []
      const data = {
        ...searchQuery,
        beginTime: classTime[0],
        endTime: classTime[1]
      }
      delete data.classTime
      for (const name in data) {
        !data[name] && data[name] !== 0 && delete data[name]
      }
      exportEvaluate(data).then(res => {
        createBlob(
          `1对1课后评价数据统计-${moment().format('YYYY-MM-DD')}.xls`,
          res
        )
      })
    }
  }
}
</script>
