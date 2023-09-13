<!--
 * @Descripttion: 问卷-数据统计
 * @version: 1.0.0
 * @Author: zhangjianwen
 * @Date: 2020-12-04 14:33:41
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-12-14 11:50:45
-->
<template>
  <div class="app-container statics">
    <section>
      <header>
        <basics-block :title="reportStatics.surveyTitle" back />
        <el-button
          type="primary"
          @click="downloadAll"
        >数据下载</el-button>
      </header>
      <!-- 搜索栏 -->
      <!-- <basics-search
        ref="searchs"
        :loading="loadings._operation_resource_publishList"
        :searchs="searchs"
        @submitSearch="submitSearch"
        @changeSearch="changeSearch"
      /> -->
    </section>
    <div class="content">
      <div v-for="(item1, idx) in surveyQuestionList" :key="item1.id">
        <div v-show="item1.questionType !== 3" class="list ">
          <div class="list-header">
            <span>{{ idx + 1 }}.{{ item1.questionTitle }}({{
              dataName[item1.questionType]
            }})</span><el-button class="right" size="small" type="primary" @click="lookDetail(item1)">查看详情</el-button>
          </div>
          <tableItem :total="item1.answerCount" :tabledata="handleData(item1)" />
        </div>
      </div>
      <!-- <div class="list ">
        <div class="list-header">
          <span>1.{{ questionRadioList.questionTitle }}（单选）</span>
        </div>
        <tableItem
          :total="questionRadioList.answerCount"
          :tabledata="questionRadioList.questionRadioList"
        />
      </div>
      <div class="list ">
        <div class="list-header">
          <span>2.{{ questionCheckboxList.questionTitle }}（多选）</span>
        </div>
        <tableItem
          :total="questionCheckboxList.answerCount"
          :tabledata="questionCheckboxList.questionCheckboxList"
        />
      </div> -->
      <div class="list blank">
        <div v-for="item2 in questionFillBlankList" :key="item2.id">
          <div class="list-header">{{ item2.questionTitle }}:</div>
          <button @click="lookDetail(item2)">
            {{ item2.questionTitle }}
          </button>
        </div>
      </div>

      <!-- <div class="list ">
        <div class="list-header">
          <span>3.{{ scoreList.questionTitle }}</span>
        </div>
        <tableItem
          :total="scoreList.answerCount"
          :tabledata="scoreList.scoreList"
        />
      </div> -->
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisibleDel"
      width="50%"
      :before-close="handleDelClose"
    >
      <dialog-table :item="item" />
    </el-dialog>
    <!-- 查看宝宝名字弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <div class="blank-search">
          <el-input
            v-model="serchQuery.input"
            style="width:200px"
            placeholder="关键词查询"
          />
          <el-form>
            <el-form-item label-width="100px" label="过滤空值">
              <el-switch v-model="serchQuery.radio" />
            </el-form-item>
          </el-form>
          <el-button
            style="width: 80px;
               height: 34px;margin-left:50px;"
            type="primary"
            @click="getBlankReport"
          >查找</el-button>
        </div>

        <el-table :data="blankData" style="width: 100%">
          <el-table-column prop="answerSource" label="序号" width="180" />
          <el-table-column prop="answerSource" label="问卷来源" width="180" />
          <el-table-column prop="answerTime" label="提交时间" width="180" />
          <el-table-column prop="answerFill" label="回答内容" />
        </el-table>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { reportStatics, fillBlankReport, downloadAll } from '@/api/questionnaire/index'
import searchs from './searchs/statics'
import { createBlob } from '@/utils'

// import BasicsSearch from '@/components/BasicsSearch'
import BasicsBlock from '@/components/BasicsBlock'
import tableItem from './components/tableItem'
import dialogTable from './components/dialogTable'

export default {
  name: 'StatQuestionnaire',
  components: {
    // BasicsSearch,
    tableItem,
    BasicsBlock,
    dialogTable
  },
  data() {
    return {
      searchs,
      reportStatics: {
        surveyTitle: '统计分析'
      },
      dataName: ['', '单选', '多选', '简答', '评分', 'nps'],
      surveyQuestionList: [],
      questionFillBlankList: [], // 简答

      tableData: [],
      blankData: [],
      dialogVisible: false,
      dialogVisibleDel: false,
      dialogTitle: '',
      serchQuery: {
        input: '',
        radio: 0
      },
      currentPage: 1,
      pageSize: 10, // 每页显示条数
      totalCount: 0, // 总条数
      surveyQuestionId: '',
      item: ''
    }
  },
  computed: {
    ...mapGetters(['loadings', 'bizLine'])
  },
  created() {},
  mounted() {
    // console.log();
    this.surveyId = this.$route.params.id
    this.$nextTick(() => {
      this.getReportStatics()
    })
  },
  methods: {
    downloadAll() {
      downloadAll({ surveyId: this.surveyId }).then(res => {
        createBlob('问卷数据.xls', res)
      })
    },
    // 后台数据处理
    handleData(item) {
      const list = [
        '',
        'questionRadioList',
        'questionCheckboxList',
        'questionFillBlankList',
        'questionScoreList',
        'questionNpsList'
      ][item.questionType]
      if (item.questionType < 3) {
        return item[list]
      } else if (item.questionType === 4) {
        return item[list][0].scoreList
      } else if (item.questionType === 5) {
        return item[list][0].npsList
      }
    },
    lookDetail(item) {
      this.dialogVisibleDel = true
      this.item = item
    },
    // 获取报告具体数据
    getReportStatics() {
      const query = {
        surveyId: this.surveyId
      }
      reportStatics(query).then(res => {
        this.reportStatics = res.data
        this.surveyQuestionList = res.data.surveyQuestionList.filter(item => {
          return +item.questionType !== 3
        })
        res.data.surveyQuestionList.map(item => {
          if (+item.questionType === 3) {
            this.questionFillBlankList.push(item)
          }
        })
        console.log(this.questionFillBlankList)
        // this.questionRadioList = res.data.surveyQuestionList[0]; // 单选
        // this.questionCheckboxList = res.data.surveyQuestionList[1]; // 多选
        // this.questionFillBlankList = res.data.surveyQuestionList[2]; // 填空
        // this.scoreList = res.data.surveyQuestionList[3]; // 评分
      })
    },

    //
    // 搜索
    submitSearch(val) {
      console.log(val, 'submitSearch')
    },

    changeSearch(val, oldVal) {
      console.log(val, oldVal, 'changeSearch')
    },
    //
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    // 打开宝宝弹窗
    async catDetial() {
      // await this.getBlankReport();
    },
    // 获取 填空题列表
    getBlankReport(item) {
      const { input, radio } = this.serchQuery
      if (item.questionTitle) {
        this.dialogTitle = item.questionTitle
        this.surveyQuestionId = item.id
      }
      const query = {
        surveyId: this.surveyId,
        surveyQuestionId: this.surveyQuestionId,
        filterBlank: radio ? 1 : 0,
        keyword: input,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      fillBlankReport(query).then(res => {
        this.blankData = res.data.data
        this.totalCount = this.blankData.total
        this.dialogVisible = true
      })
    },
    // 切换每页显示的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
    },
    // 分页
    handleCurrentChange(page) {
      console.log(page, 'handleCurrentChange')
      this.currentPage = page
      this.getBlankReport()
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleDelClose() {
      this.dialogVisibleDel = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 0;
  background-color: transparent;
  > section {
    padding: 10px 20px 0;
    background-color: #fff;
  }
  .right {
    float:right;
    margin-bottom: 10px;
  }
  header {
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
  .is-empty {
    padding: 50px 0;
    text-align: center;
    color: #999;
  }
  .list {
    margin: 20px 0;
    min-height: 300px;
    padding: 10px 20px;
    background-color: #fff;
    .list-header {
      margin-bottom: 10px;
    }
  }
  .blank {
    height: 50px;
    display: flex;
    div {
      margin-right: 10px;
    }
  }
}

.blank-search {
  display: flex;
}
.pagination {
  margin: 20px 0 50px;
  display: flex;
  justify-content: flex-end;
}
</style>
