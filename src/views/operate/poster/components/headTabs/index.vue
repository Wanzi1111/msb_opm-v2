<template>
  <div v-loading="loadings._k8s_api_poster_api_v1_recommend_poster_getPosterAll" class="headers">
    <el-tabs v-if="linePayload.lineList" v-model="line" @tab-click="handelLine">
      <el-tab-pane v-for="(item,key,index) in linePayload.lineList" :key="index" :label="item" :name="key" />
    </el-tabs>
    <basics-action :actions="act">
      <template slot="radio">
        <el-radio-group v-model="sub_line" @change="handelShb">
          <el-radio-button v-for="(value,key,index) in liens" :key="index" :label="key" border>{{ value }}</el-radio-button>
        </el-radio-group>
      </template>
    </basics-action>
    <basics-search
      ref="searchs"
      :searchs="searchs"
      @changeSearch="changeSearch"
      @submitSearch="submitSearch"
    /></div>
</template>
<script>
import { getPosterAll } from '@/api/operate/poster-controller'
import { default as act } from '../../actions/list'
import searchs, { defaultSearchVal } from './search/list'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { cloneDeep } from 'lodash'
// import { areas } from '../../enum'
export default {
  name: 'HeadTabs',
  props: {
    lineListen: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      // 转介绍海报 新增字段
      line: '1',
      sub_line: '10',
      linePayload: {},
      searchs,
      query: {
        startDate: defaultSearchVal.valueTime[0],
        endDate: defaultSearchVal.valueTime[1],
        del: defaultSearchVal.del,
        poster_id: this.$route.query?.poster_id || ''
      },
      act: act({ add: this.create, optionManage: this.optionManage })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    content() {
      return this.linePayload?.poster?.content || []
    },
    liens() {
      return this.linePayload && this.linePayload?.subLineList && this.linePayload?.subLineList[this.line] || {}
    }
  },
  mounted() {
    const { lineListen } = this
    Object.keys(lineListen).map(item => {
      this[item] = lineListen[item]
    })
    const { poster_id } = this.$route.query
    this.$nextTick(() => {
      if (!poster_id) {
        this.$refs.searchs.set({
          type: 'defaultVal',
          data: {
            valueTime: defaultSearchVal.valueTime,
            del: defaultSearchVal.del
          }
        })
      } else {
        this.query = {
          ...this.query,
          startDate: '',
          endDate: '',
          del: null
        }
      }
      this.lineList()
    })
  },
  methods: {
    changeSearch() {
    },
    submitSearch(vals, isReset) {
      const newVals = cloneDeep(vals)
      if (isReset) {
        this.query = {}
      } else {
        if (newVals.valueTime) {
          newVals.startDate = moment(newVals.valueTime[0]).format('YYYY-MM-DD HH:mm:ss')
          newVals.endDate = moment(moment(newVals.valueTime[1])).format('YYYY-MM-DD HH:mm:ss')
          delete newVals.valueTime
        }
        this.query = newVals
      }
      this.$emit('getList', { ...this.query })
    },
    // 转介绍海报 管理位置添加
    optionManage() {
      this.$emit('optionManage')
    },
    // 跳转到 添加海报
    create() {
      this.$router.push({ name: 'PosterDetail', query: { type: 'add' }})
    },
    // 转介绍海报 搜索栏字典枚举
    async lineList() {
      if (this.sub_line === '') { // 如果业务线为小熊艺术line（2）则业务体系sub_line只能为小熊艺术（20）
        this.sub_line = this.line === '1' ? '10' : this.line === '2' ? '20' : this.line === '3' ? '30' : '10'
      }
      const { line, sub_line, query } = this
      const { startDate, endDate } = query
      const parmas = {
        line,
        sub_line,
        del: 0
      }
      await getPosterAll(parmas).then((result) => {
        this.linePayload = { ...result.payload } || {}
        this.setSelectValue(result)
        const poster_id = query.poster_id || result?.payload?.poster?.content[0]?.id // 默认取数据里的第一个
        this.query = {
          ...query,
          poster_id
        }
        this.$refs.searchs.set({
          type: 'defaultVal',
          data: {
            poster_id
          }
        })
        this.$emit('getList', { poster_id, startDate, endDate }) // 默认查询值
      }).catch((err) => {
        this.$message(err)
      })
    },
    // 设置下拉框的值
    setSelectValue(result) {
      const positionLists = result.payload.poster.content.map(v => {
        return {
          label: v.position,
          value: v.id
        }
      })
      this.$refs.searchs.set({
        type: 'options',
        data: {
          poster_id: positionLists
        }
      })
    },
    async handelLine() {
      this.sub_line = '' // 切换业务线时 清空 sub_line
      this.$refs.searchs.reset() // 切换业务线时 清空 查询参数
      await this.lineList()
    },
    async handelShb() {
      this.$refs.searchs.reset()
      await this.lineList()
    }
  }
}
</script>

<style lang="scss" scoped>
.headers {
  margin-bottom: 5px;
}
</style>
