<template>
  <div>
    <div class="title-container">
      <basics-title title="转介绍海报管理" line />
    </div>
    <div class="app-container">
      <head-tabs
        :line-listen="lineListen"
        @getList="getList"
        @optionManage="optionManage"
      />
      <!-- <basics-action :actions="act" /> -->
      <basics-table
        ref="table"
        :table="table"
        :loading="
          loadings._k8s_api_poster_api_v1_recommend_poster_getPosterListAll
        "
        :list="list"
        :get-list="getList"
        :columns="columns"
        :action-function="actionFunction"
      />
    </div>
    <position-manage
      :line-arr="lineArr"
      :outer-visible="outerVisible"
      :add-o-redit="addORedit"
      @clearPm="clearPm"
    />
  </div>
</template>

<script>
import {
  getPosterAll,
  getPosterListAll,
  modifyPosterListDel
} from '@/api/operate/poster-controller'
// import { default as act } from './actions/list'
import columns, { actions } from './columns/list'
import { mapGetters } from 'vuex'
import HeadTabs from './components/headTabs/index'
import PositionManage from './components/positionManage/index.vue'

export default {
  name: 'Poster',
  components: { HeadTabs, PositionManage },
  data() {
    return {
      table: { stripe: true },
      columns: columns({ getList: this.getList }),
      actionFunction: actions({
        copyPsoter: this.copyPsoter,
        updatePsoter: this.updatePsoter,
        deletePoster: this.deletePoster
      }),
      list: [],
      // act: act({ add: this.create, optionManage: this.optionManage }),
      outerVisible: false, // 新增位置position
      addORedit: true,
      lineListen: {},
      num: 1,
      status: -1,
      lineArr: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {
    this.lineList()
    this.lineListen = { ...this.$route.query }
    this.$bus.$on('busGetList', (poster_id) => {
      this.$nextTick(() => {
        this.getList({ poster_id })
      })
    })
  },
  methods: {
    // 转介绍海报 枚举
    async lineList() {
      const parmas = {
        line: 0,
        sub_line: 0,
        page: 1,
        size: 1
      }
      await getPosterAll(parmas)
        .then((result) => {
          const lineList = result?.payload?.lineList || []
          // 接口返回格式 两层对象 处理成数组类型健值对
          const lineArr = []
          Object.keys(lineList).map((item) => {
            lineArr.push({
              label: lineList[item],
              value: item
            })
          })
        })
        .catch((err) => {
          this.$message(err)
        })
    },
    // 转介绍海报 管理位置添加
    optionManage() {
      this.outerVisible = true
      this.addORedit = true
    },
    create() {
      this.$router.push({ name: 'PosterDetail', query: { type: 'add' }})
    },
    // 获取列表
    getList(query) {
      // del = this.status
      getPosterListAll({
        ...query
      }).then(({ payload }) => {
        const data = payload.map((v) => ({
          ...v,
          ...(v.copywriting && {
            copywriting1: v.copywriting.split('<>')[0] || '',
            copywriting2: v.copywriting.split('<>')[1] || '',
            copywriting3: v.copywriting.split('<>')[2] || ''
          })
        }))
        this.list = data || []
      })
    },
    // 获取查询状态
    // getStatus(status) {
    //   this.status = status
    // },
    // 复制
    copyPsoter(_, row) {
      this.$router.push({
        name: 'PosterDetail',
        query: { id: row.id, type: 'copy' }
      })
    },
    // 跳转到 - 修改公共
    updatePsoter(dat, row) {
      this.$router.push({
        name: 'PosterDetail',
        query: { id: row.id, type: 'edit' }
      })
    },
    deletePoster(dat, row) {
      const { id, posterId: poster_id } = row
      modifyPosterListDel({ id, del: dat })
        .then((res) => {
          if (res.code === 0) {
            this.getList({ poster_id })
          }
        })
        .catch((err) => {})
    },
    // component positionManages
    clearPm(val) {
      this.outerVisible = val
    }
  }
}
</script>
