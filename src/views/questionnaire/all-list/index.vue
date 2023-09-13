<!--
 * @Descripttion: 问卷管理列表
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-25 13:41:07
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-10 13:29:14
-->
<template>
  <div class="app-container">
    <section>
      <div class="header">
        <h3>问卷中心</h3>
        <basics-action :actions="act" />
        <!-- <el-button size="small" type="primary" @click="handleCreate">创建问卷</el-button> -->
      </div>
      <!-- 业务线 tabs -->
      <el-tabs v-model="surveyBizLineCode">
        <el-tab-pane
          v-for="(item, index) in bizLineTypeList"
          :key="index"
          :label="item.label"
          :name="item.value"
        />
      </el-tabs>
      <!-- search -->
      <basics-search
        ref="searchs"
        :loading="loadings._operation_resource_publishList"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />
      <!-- status -->
      <el-tabs v-model="surveyStatus">
        <el-tab-pane
          v-for="(item, index) in statusList"
          :key="index"
          :label="item.label"
          :name="item.value"
        />
      </el-tabs>
    </section>

    <!-- 问卷列表 -->
    <div class="list">
      <list-item v-for="(item, index) in surveyList" :ref="`item${index}`" :key="item.id" :survey="item" @handle="handleSurvey" />
      <div v-if="surveyList.length === 0" class="is-empty">暂无数据</div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 发布问卷 弹框 -->
    <pub-survey-dialog ref="pubDialog" :survey="handleSurveyItem" @result="getSurveyList" />
    <!-- 删除问卷 -->
    <del-survey-dialog ref="delDialog" :survey="handleSurveyItem" @result="getSurveyList" />
    <!-- 复制问卷 -->
    <copy-survey-dialog ref="copyDialog" :survey="handleSurveyItem" @result="getSurveyList" />
    <!-- 暂停问卷 -->
    <stop-dialog ref="stopDialog" :survey="handleSurveyItem" @result="getSurveyList" />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getSurveyList } from '@/api/questionnaire/index'
import { getToken } from '@/utils/auth'
import searchs from './searchs/searchs'
import { default as act } from './actions/list'
// import BasicsTable from '@/components/BasicsTable'
import BasicsSearch from '@/components/BasicsSearch'
import BasicsAction from '@/components/BasicsAction'
import ListItem from './components/ListItem'
import PubSurveyDialog from './components/PubSurveyDialog'
import DelSurveyDialog from './components/DelSurveyDialog'
import StopDialog from './components/stopDialog'
import CopySurveyDialog from './components/CopySurveyDialog'
export default {
  name: 'AllList',
  components: {
    BasicsSearch,
    BasicsAction,
    ListItem,
    PubSurveyDialog,
    DelSurveyDialog,
    CopySurveyDialog,
    StopDialog
  },
  data() {
    return {
      searchs,
      act: act({ add: this.handleCreate }),
      searchParams: {},
      currentPage: 1,
      pageSize: 10, // 每页显示条数
      totalCount: 0, // 总条数
      surveyBizLineCode: '',
      surveyStatus: '999',
      // 0-未发布，1-进行中，2-已结束
      statusList: [
        {
          label: '全部问卷',
          value: '999'
        },
        {
          label: '未发布',
          value: '0'
        },
        {
          label: '进行中',
          value: '1'
        },
        {
          label: '已结束',
          value: '2'
        }
      ],
      surveyList: [],
      cid: '',
      handleSurveyType: '',
      handleSurveyItem: {},
      pubForm: {
        url: '',
        startDate: '',
        endDate: ''
      }
    }
  },
  computed: {
    ...mapGetters(['loadings', 'bizLine']),
    bizLineTypeList() {
      const arr = [{ label: '全部', value: '' }]
      const list =
        (this.$store.getters.bizLine &&
          this.$store.getters.bizLine.bizLineList) ||
        []
      return [...arr, ...list]
    },
    surveyTypeList() {
      const arr = [{ label: '全部', value: '' }]
      const list =
        (this.bizLine &&
          this.bizLine.surveyTypeList) ||
        []
      const data = [...arr, ...list]
      return data
    },
    surveyTypeObj() {
      return this.bizLine && this.bizLine.surveyType || {}
    },
    statusObj() {
      const list = this.statusList.filter(item => item.value !== '999')
      const obj = {}
      list.forEach(ele => {
        const { label, value } = ele
        Object.assign(obj, { [`${value}`]: label })
      })
      return obj
    }
  },
  watch: {
    surveyStatus(val, old) {
      console.log(val, old)

      if (val !== old && old) {
        this.getSurveyList()
      }
    },
    surveyBizLineCode(val, old) {
      console.log(val, old)
      if (val !== old && old) {
        this.getSurveyList()
      }
    }
  },
  created() {
    const cid = getToken('userId')
    this.cid = cid
    this.getBizLineConfig()
  },
  mounted() {
    this.getSurveyList()
    setTimeout(() => {
      this.$refs.searchs.set({
        type: 'options',
        data: {
          surveyTypeCode: this.surveyTypeList
        }
      })
    }, 1000)
  },
  methods: {
    ...mapActions('app', ['getBizLineConfig']),

    /**
     * 列表数据
     */
    getSurveyList(query = {}) {
      const loading = this.$loading({
        background: 'rgba(255, 255, 255, 0.2)'
      })
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        surveyStatus: this.surveyStatus === '999' ? '' : +this.surveyStatus,
        surveyBizLineCode: +this.surveyBizLineCode || '',
        ...this.searchParams,
        ...query
      }
      getSurveyList(params).then(res => {
        console.log(res, 'page list')
        const { data = {}} = res
        const { pageNumber, total } = data
        this.surveyList = data.data && data.data.map(item => {
          item.surveyTypeText = this.surveyTypeObj[item.surveyType]
          item.surveyStatusText = this.statusObj[item.surveyStatus]
          return item
        }) || []
        this.pageNum = pageNumber
        this.totalCount = total

        this.handleSurveyType = ''
        this.handleSurveyItem = {}
      }).finally(() => {
        loading.close()
      })
    },

    // 搜索
    submitSearch(res) {
      const { date, surveyTypeCode, surveyNo } = res
      const params = {
        ...res,
        surveyTypeCode: +surveyTypeCode,
        surveyNo: +surveyNo,
        startDate: date && date[0] || '',
        endDate: date && date[1] || ''
      }
      delete params.date
      this.searchParams = params
      this.getSurveyList()
    },

    // 创建
    handleCreate() {
      this.$router.push({ name: 'CreateQuestionnaire' })
    },

    // 分页
    handleCurrentChange(page) {
      this.currentPage = page
      this.getSurveyList()
    },
    // 切换每页显示的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
      this.getSurveyList()
    },

    handleSurvey(res) {
      const { type, survey } = res
      console.log(type, survey)
      this.handleSurveyType = type
      this.handleSurveyItem = { ...survey, cid: this.cid }
      switch (type) {
        case 'pub':
          this.$refs.pubDialog.visible = true
          break
        case 'delete':
          this.$refs.delDialog.visible = true
          break
        case 'copy':
          this.$refs.copyDialog.visible = true
          this.$refs.copyDialog.type = 'copy'
          break
        // 编辑标题
        case 'editTitle':
          this.$refs.copyDialog.visible = true
          this.$refs.copyDialog.type = 'editTitle'
          break
        case 'stop':
          this.$refs.stopDialog.visible = true
          this.$refs.stopDialog.type = 'editTitle'
          break
        // 编辑问卷
        // case 'edit':
        //   this.$router.push({ name: 'CreateQuestionnaire' }, { query: { surveyId: survey.id }})
        //   break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 0;
  background-color: transparent;
  > section{
    padding: 10px 20px 0;
    background-color: #fff;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #f2f2f2;
    h3 {
      margin: 0;
    }
  }

  .is-empty{
    padding: 50px 0;
    text-align: center;
    color: #999;
  }
  .pagination{
    margin: 20px 0 50px;
    display: flex;
    justify-content: flex-end;
  }

  .mgb-15{
    margin-bottom: 15px !important;
  }
  .mgt-15{
    margin-top: 15px !important;
  }

}
</style>
