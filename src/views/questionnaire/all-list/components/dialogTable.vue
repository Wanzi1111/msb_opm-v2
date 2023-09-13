<template>
  <div class="dialogtab">
    <div class="tit">{{ item.questionTitle }} （{{ dataName[item.questionType] }}）<el-button class="download" type="primary" @click="download">下载数据</el-button></div>
    <el-form style="display:flex">
      <template v-if="item.questionType === 3">
        <el-input
          v-model="serchQuery.keyword"
          style="width:200px"
          placeholder="关键词查询"
        />
        <el-form-item label-width="100px" label="过滤空值">
          <el-switch v-model="serchQuery.filterBlank" />
        </el-form-item>
      </template>
      <el-form-item v-else label-width="40px" label="选项">
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="(item1, index) in listData"
            :key="index"
            :label="item1.name"
            :value="item1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 80px;
               height: 34px;margin-left:50px;"
          type="primary"
          @click="getBlankReport"
        >查找</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="blankData" border style="width: 100%">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="anwserUser" label="用户Id" width="180" />
      <!-- <el-table-column prop="optionName" label="选项" width="180" /> -->
      <el-table-column v-if="item.questionType !== 3" label="选项" width="180">
        <template slot-scope="scope">
          {{ scope.row.optionName || scope.row.scoreValue }}
        </template>
      </el-table-column>
      <el-table-column v-else label="选项" width="180">
        <template slot-scope="scope">
          {{ scope.row.surveyNote }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="180">
        <template slot-scope="scope">
          {{ moment(scope.row.ctime * 1000) }}
        </template>
      </el-table-column>
      <el-table-column v-if="item.questionType !== 3" prop="surveyNote" label="备注" />
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
</template>
<script>
import { reportDetail, download, optionList } from '@/api/questionnaire/index'
import { createBlob } from '@/utils'
import moment from 'moment'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      blankData: [],
      currentPage: 1,
      options: [],
      value: '',
      serchQuery: {
        keyword: '',
        filterBlank: 0
      },
      dataName: ['', '单选', '多选', '简答', '评分', 'nps'],
      num: 0,
      listData: [],
      pageSize: 10, // 每页显示条数
      totalCount: 0 // 总条数
    }
  },
  watch: {
    item() {
      this.value = ''
      this.getDetail()
      this.optionList()
    }
  },
  created() {
    console.log(this.item, 'this.item')
    this.getDetail()
    this.optionList()
  },
  methods: {
    moment(row) {
      return moment(row).format('YYYY-MM-DD HH:mm:ss')
    },
    optionList() {
      const data = {}
      if (this.item.questionType === 1) {
        data.surveyQuestionId = this.item.questionRadioList[0].surveyQuestionId
        if (this.value) {
          data.radioId = this.value
        }
      }
      if (this.item.questionType === 2) {
        data.surveyQuestionId = this.item.questionCheckboxList[0].surveyQuestionId
        if (this.value) {
          data.checkboxId = this.value
        }
      }
      if (this.item.questionType === 3) {
        data.surveyQuestionId = this.item.questionFillBlankList[0].surveyQuestionId
        const filterBlank = Number(this.serchQuery.filterBlank)
        Object.assign(data, { keyword: this.serchQuery.keyword, filterBlank })
      }

      if (this.item.questionType === 4) {
        data.surveyQuestionId = this.item.questionScoreList[0].surveyQuestionId
        if (this.value) {
          data.scoreValue = this.value
        }
      }
      if (this.item.questionType === 5) {
        data.surveyQuestionId = this.item.questionNpsList[0].surveyQuestionId
        if (this.value) {
          data.scoreValue = this.value
        }
      }
      optionList(data).then(res => {
        this.listData = res.data
      })
    },
    download() {
      const data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        surveyId: this.$route.params.id
      }
      if (this.item.questionType === 1) {
        data.surveyQuestionId = this.item.questionRadioList[0].surveyQuestionId
        if (this.value) {
          data.radioId = this.value
        }
      }
      if (this.item.questionType === 2) {
        data.surveyQuestionId = this.item.questionCheckboxList[0].surveyQuestionId
        if (this.value) {
          data.checkboxId = this.value
        }
      }
      if (this.item.questionType === 3) {
        data.surveyQuestionId = this.item.questionFillBlankList[0].surveyQuestionId
        const filterBlank = Number(this.serchQuery.filterBlank)
        Object.assign(data, { keyword: this.serchQuery.keyword, filterBlank })
      }

      if (this.item.questionType === 4) {
        data.surveyQuestionId = this.item.questionScoreList[0].surveyQuestionId
        if (this.value) {
          data.scoreValue = this.value
        }
      }
      if (this.item.questionType === 5) {
        data.surveyQuestionId = this.item.questionNpsList[0].surveyQuestionId
        if (this.value) {
          data.scoreValue = this.value
        }
      }
      download(data).then(res => {
        createBlob('详情数据.xls', res)
      })
    },
    handleCurrentChange(page) {
      console.log(page, 'handleCurrentChange')
      this.currentPage = page
      this.getDetail()
      // this.getBlankReport()
    },
    getBlankReport() {
      this.getDetail(true)
    },
    // 切换每页显示的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.currentPage = 1
    },
    getDetail(flag) {
      //  const query = {
      //   surveyId: this.surveyId,
      //   surveyQuestionId: this.surveyQuestionId,
      //   filterBlank: radio ? 1 : 0,
      //   keyword: input,
      //   pageNum: this.currentPage,
      //   pageSize: this.pageSize
      // }
      const data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        surveyId: this.$route.params.id
      }
      if (this.item.questionType === 1) {
        data.surveyQuestionId = this.item.questionRadioList[0].surveyQuestionId
        data.radioId = this.value
      }
      if (this.item.questionType === 2) {
        data.surveyQuestionId = this.item.questionCheckboxList[0].surveyQuestionId
        data.checkboxId = this.value
      }
      if (this.item.questionType === 3) {
        data.surveyQuestionId = this.item.questionFillBlankList[0].surveyQuestionId
        const filterBlank = Number(this.serchQuery.filterBlank)
        Object.assign(data, { keyword: this.serchQuery.keyword, filterBlank })
      }

      if (this.item.questionType === 4) {
        data.surveyQuestionId = this.item.questionScoreList[0].surveyQuestionId
        data.scoreValue = this.value
      }
      if (this.item.questionType === 5) {
        data.surveyQuestionId = this.item.questionNpsList[0].surveyQuestionId
        data.scoreValue = this.value
      }
      // this.listData = []
      reportDetail(data).then(res => {
        this.blankData = res.data.data
        this.totalCount = res.data.total
        // if (!this.num) {
        // this.listData = JSON.parse(JSON.stringify(this.blankData))
        // }
        // this.num++
      })
    }
  }
}
</script>
<style lang="scss">
.dialogtab{
  .pagination {
  margin: 20px 0 50px;
  display: flex;
  justify-content: flex-end;
}
.tit{
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 15px;
}
.download {
  float: right;
}
}
</style>
