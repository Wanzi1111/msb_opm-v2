<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{ typeToLabel }}</el-breadcrumb-item>
      <el-breadcrumb-item class="active-breadcrumb">{{ typeToLabel }}详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      {{ typeToLabel }} 名称：{{ info.name }}
      <!--  -->
      <span class="append" :class="{ 'error' : info.usedCount > info.takeCount }">
        ( 发放数/总数量：{{ info.usedCount }}/{{ info.takeCount }} )
      </span>
    </div>
    <basics-search ref="search" :loading="loadings._ums_api_activity_prize_getCardByPage" :searchs="searchs" @submitSearch="submitSearch" />
    <basics-action :actions="actions" />
    <basics-table
      :key="type"
      ref="table"
      :table="table"
      :loading="loadings._ums_api_activity_prize_getCardByPage"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
    />
    <!-- 导出 弹窗 -->
    <el-dialog
      :title="'导出'"
      :visible.sync="dialogExportVisible"
      width="500px"
      destroy-on-close
      :before-close="() => dialogExportVisible = false"
    >
      <span>下发状态：</span>
      <el-select v-model="status" placeholder="请选择">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-check" type="primary" @click="submitExportAction">导出</el-button>
        <el-button icon="el-icon-close" @click="dialogExportVisible = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 导入 弹窗 -->
    <el-dialog
      :title="'导入'"
      :visible.sync="dialogImportVisible"
      width="550px"
      destroy-on-close
      :before-close="() => dialogImportVisible = false"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm">
        <el-form-item :label="typeToLabel+'有效期'" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="{
              disabledDate: (time) => {
                return time.getTime() < new Date() - 24 * 60 * 60 * 1000
              }
            }"
          />
        </el-form-item>
        <el-form-item label="上传文件" prop="url">
          <!-- :before-upload="beforeUpload" -->
          <!-- :on-success="handleUploadSuccess" -->
          <el-upload
            ref="upload"
            :limit="1"
            class="drag-wrapper"
            drag
            action="/"
            :auto-upload="false"
            :before-remove="beforeRemove"
            :on-change="handleUploadSuccess"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">支持扩展名：.xls .xlsx 且不超过1M
              <a href="javascript:;" class="down-file" @click="downFile">下载示例文件</a>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-check" type="primary" @click="submitImportAction">立即上传</el-button>
        <el-button icon="el-icon-close" @click="dialogImportVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import columnsCard, { actions as actCard } from './columns/detail-card'
import columnsCoupon, { actions as actCoupon } from './columns/detail-coupon'

import searchsCard from './searchs/searchs-card'
import searchsCoupon from './searchs/searchs-coupon'

import actions from './actions/list'
import { createBlob } from '@/utils'
import { mapGetters } from 'vuex'
import { getCardDetailList, importCard, exportCard, delCard, reissueCard, exportCardTemplate } from '@/api/prize/set'
import moment from 'moment'

export default {
  name: 'Share',
  data() {
    var checkFile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请上传文件'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        date: '',
        url: ''
      },
      rules: {
        url: [
          // { required: true, message: '请上传文件', trigger: 'blur' }
          { required: true, validator: checkFile, checkAgemessage: '请上传文件', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      dialogExportVisible: false,
      dialogImportVisible: false,
      status: 1,
      statusOptions: [
        { label: '全部', value: 0 },
        { label: '未发放', value: 1 },
        { label: '已下发', value: 2 },
        { label: '待补发', value: 3 },
        { label: '已过期', value: 4 }
      ],
      info: {
        name: this.$route.query.name, // '京东卡50元',
        usedCount: 0,
        takeCount: 0
      },
      type: this.$route.query.type,
      columns: columnsCard,
      searchs: searchsCard,
      actions: actions({ handleExport: this.handleExport, handleImport: this.handleImport }),
      table: { stripe: true },
      list: [], // [{ a1: '111', cardStatus: 2 }],
      total: 0,
      query: {},
      listQuery: {
        page: 1,
        limit: 10
      },
      actionFunction: actCard({ handleDel: this.handleDel, handleSupply: this.handleSupply })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    typeToLabel() {
      return this.type === 'card' ? '卡密' : '券码'
    }
  },
  created() {
    this.getList()
    if (this.type === 'card') {
      this.searchs = searchsCard
      this.columns = columnsCard
      this.actionFunction = actCard({ handleDel: this.handleDel, handleSupply: this.handleSupply })
    } else {
      this.searchs = searchsCoupon
      this.columns = columnsCoupon
      this.actionFunction = actCoupon({ handleDel: this.handleDel, handleSupply: this.handleSupply })
    }
  },
  methods: {
    // 搜索
    submitSearch(obj) {
      console.log('query', obj)
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.query = obj
      this.getList()
    },
    // 获取列表
    getList() {
      const { listQuery: { page, limit }, query: { cardStatus, cardNo }} = this
      const params = {
        pageNo: page - 1,
        pageSize: limit,
        cardStatus: cardStatus || '',
        cardNo: cardNo || '',
        name: this.info.name
      }
      getCardDetailList(params).then(res => {
        this.info.takeCount = res.metadata.takeCount || 0
        this.info.usedCount = res.metadata.usedCount || 0
        this.info.cardType = res.metadata.cardType
        this.list = res.payload.content || []
        this.total = Number(res.payload.totalElements || 0)
      })
    },
    handleExport() {
      this.dialogExportVisible = true
    },
    // 导出操作
    async submitExportAction() {
      console.log('导出')
      const ret = await exportCard({
        name: this.info.name,
        cardStatus: this.status
      })
      createBlob(`卡券-${moment().format('YYYY-MM-DD')}.xls`, ret)
      if (ret.code === 0) {
        this.dialogExportVisible = false
        this.getList()
        this.$message.success('导出成功')
      }
      console.log(ret)
    },
    handleImport() {
      this.dialogImportVisible = true
    },
    submitImportAction() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          console.log('导入', this.ruleForm)
          const startTime = moment(this.ruleForm.date[0]).format('YYYY-MM-DD')
          const endTime = moment(this.ruleForm.date[1]).format('YYYY-MM-DD')
          const fd = new FormData()
          fd.append('name', this.info.name)
          fd.append('startTime', startTime)
          fd.append('endTime', endTime)
          fd.append('file', this.file)
          const ret = await importCard(fd)
          if (ret.code === 0) {
            this.dialogImportVisible = false
            this.$message.success('导入成功')
          }
          console.log(ret)
          this.getList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleDel(dat, row) {
      console.log('删除')
      this.$confirm('删除后将无法恢复，请确认是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const ret = await delCard({
          id: row.id
        })
        console.log(ret)
        if (ret.code === 0) {
          this.getList()
          this.$message.success('删除成功')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    async handleSupply(dat, row) {
      const ret = await reissueCard({
        name: this.info.name,
        cardType: this.info.cardType, // this.type === 'card' ? 0 : 1,
        userId: row.userId,
        id: row.id
      })
      console.log(ret)
      if (ret.code === 0) {
        this.getList()
        this.$message.success('操作成功')
      }
      console.log('补发')
    },
    beforeUpload(file) {
      console.log(file)
      if (['xls', 'xlsx'].indexOf(file.name.split('.')[1]) < 0) {
        this.$message.error('上传文件格式不正确')
        return false
      }
      if ((file.size / 1024 / 1024) > 1) {
        this.$message.error('上传文件不能大于1M')
        return false
      }
      return true
    },
    handleUploadSuccess(res, file) {
      if (['xls', 'xlsx'].indexOf(res.name.split('.')[1]) < 0) {
        this.$message.error('上传文件格式不正确')
        this.$refs.upload.clearFiles()
        return false
      }
      if ((res.size / 1024 / 1024) > 1) {
        this.$message.error('上传文件不能大于1M')
        this.$refs.upload.clearFiles()
        return false
      }
      this.ruleForm.url = res.uid
      this.$refs.ruleForm.validateField('url')
      this.file = res.raw
      console.log(res, file)
    },
    beforeRemove(file, fileList) {
      this.ruleForm.url = ''
      // this.$refs.ruleForm.validateField('url')
    },
    async downFile() {
      console.log('下载')
      const ret = await exportCardTemplate({
        name: this.info.name
      })
      createBlob(`卡券-${moment().format('YYYY-MM-DD')}.xls`, ret)
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-breadcrumb {
    margin: 20px 0;
    .active-breadcrumb {
      ::v-deep .el-breadcrumb__inner {
        color: #409eff;
      }
    }
  }
  .title {
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 10px;
    padding-left: 12px;
    // font-weight: bold;
    .append {
      font-size: 14px;
      color: #606266;
      &.error {
        color: #F56C6C;
      }
    }
  }
  .down-file {
    font-size: 16px;
    color: #409eff;
    margin-left: 6px;
    text-decoration: underline;
  }
</style>
