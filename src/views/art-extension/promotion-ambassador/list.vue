
<template>
  <div>
    <div class="title-container">
      <basics-title title="推广大使管理" line />
    </div>
    <div class="app-container">

      <basics-search ref="search" :loading="loadings._ai_api_api_fx_op_user_api_getSpreadUser" :searchs="searchs" @submitSearch="submitSearch" />

      <basics-action :actions="act" />

      <basics-table
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :loading="loadings._ai_api_api_fx_op_user_api_getSpreadUser"
        :list-query="listQuery"
        :action-function="actions"
      >
        <template slot="oder" slot-scope="scope">
          <div>{{ `${scope.row.totalOrderNum}/${scope.row.totalNumberOfTrialClassOrder}/${scope.row.totalNumberOfSystemClassOrder}` }}</div>
        </template>
        <template slot="info" slot-scope="scope">
          <div>{{ scope.row.spreadUserName ? scope.row.spreadUserName : '-' }}</div>
          <div>{{ scope.row.levelInfo ? scope.row.levelInfo : '-' }}</div>
        </template>
        <template slot="phone" slot-scope="scope">
          <div>{{ scope.row.mobilePhone ? scope.row.mobilePhone : '-' }}</div>
          <div>{{ scope.row.weixinNum ? scope.row.weixinNum : '-' }}</div>
        </template>
        <template slot="qianyueTime" slot-scope="scope">
          <div>{{ scope.row.reportTimeInfo ? scope.row.reportTimeInfo : '-' }}</div>
          <div>{{ scope.row.reviewTimeInfo ? scope.row.reviewTimeInfo : '-' }}</div>
          <div>{{ scope.row.signTimeInfo ? scope.row.signTimeInfo : '-' }}</div>
        </template>
        <template slot="guanbiTime" slot-scope="scope">
          <div>{{ scope.row.closeTime ? scope.row.closeTime : '-' }}</div>
          <div>{{ scope.row.closeReason ? scope.row.closeReason : '-' }}</div>
        </template>
      </basics-table>
    </div>

    <!-- 审核 -->
    <el-dialog
      v-if="isShowExamine"
      title="审核"
      :visible.sync="isShowExamine"
      width="500px"
    >
      <basics-form ref="examineForm" :forms="examineForm" :actions="examineFormActions" />
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      v-if="isShowEdit"
      append-to-body
      title="编辑"
      :visible.sync="isShowEdit"
      width="500px"
    >
      <basics-form ref="editForm" :forms="editForm" :actions="editFormActions" />
    </el-dialog>

    <!-- 关闭 -->
    <el-dialog
      v-if="isShowClose"
      append-to-body
      title="关闭"
      :visible.sync="isShowClose"
      width="500px"
    >
      <basics-form ref="closeForm" :forms="closeForm" :actions="closeFormActions" />
    </el-dialog>

    <!-- 添加推广大使 -->
    <el-dialog
      v-if="dialogAddPeopleVis"
      title="添加"
      :visible.sync="dialogAddPeopleVis"
      width="500px"
    >
      <basics-form ref="examineForm" :forms="addPeopleFrom" :actions="addPeopleFromActions" :loading="loadings._ai_api_api_fx_op_user_api_addSpreadUser" @submitForm="handleAddPeople" />
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import moment from 'moment'
import axios from 'axios'
import {
  eliminateUser,
  promotionAmbassadorList,
  approvedPromotionAmbassador,
  editPromotionAmbassador,
  closePromotionAmbassador,
  recoveryPromotionAmbassador,
  ediSecondLevelAmbassador,
  getAllLevel,
  getAllUserStatus,
  addSpreadUser,
  updateAddWechat
} from '@/api/art-extension/promotion-ambassador'
import columns, { tableAction } from './columns'
import searchs from './searchs'
import { default as act } from './actions/index'
import BasicsForm from '@/components/BasicsForm'
import examineForm, { actions as examineFormActions } from './forms/examineForm'
import editForm, { actions as editFormActions } from './forms/editForm'
import closeForm, { actions as closeFormActions } from './forms/closeForm'
import addPeopleFrom, { actions as addPeopleFromActions } from './forms/addPeopleForm'

const init_pagination = {
  page: 1,
  limit: 20
}

export default {
  name: 'PromotionAmbassador',
  components: { BasicsForm },
  data() {
    return {
      columns,
      searchs,
      list: [],
      total: 0,
      listQuery: { ...init_pagination },
      act: act({ exportExcle: this.exportExcle, addPeople: () => { this.dialogAddPeopleVis = true } }),
      actions: tableAction({
        tableAction: this.tableAction
      }),
      searchQuery: { },
      examineForm: examineForm,
      isShowExamine: false,
      isShowEdit: false,
      isShowClose: false,
      dialogAddPeopleVis: false,
      examineFormActions: examineFormActions({ cancel: this.eliminateUser, ensure: this.examineFormEnsure }),
      editFormActions: editFormActions({ cancel: () => { this.isShowEdit = false }, ensure: this.editFormEnsure }),
      closeFormActions: closeFormActions({ cancel: () => { this.isShowClose = false }, ensure: this.closeFormEnsure }),
      addPeopleFromActions: addPeopleFromActions({ cancel: () => { this.dialogAddPeopleVis = false } }),
      editForm: editForm,
      closeForm: closeForm,
      addPeopleFrom: addPeopleFrom,
      rowId: ''
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.getList()
    // 获取字典
    this.getEum()
  },
  methods: {
    // 表格操作
    tableAction(dat, row, index, e) {
      this.rowData = row
      switch (e) {
        case 'toExamine':
          this.toExamine(row)
          break
        case 'editRow':
          this.editRow(row)
          break
        case 'closeRow':
          this.closeRow(row)
          break
        case 'recovery':
          this.recovery(row)
          break
        case 'ediSecondLevel':
          this.ediSecondLevel(row)
          break
        case 'addWeChat':
          this.addWeChat(row)
          break
        default:
          break
      }
    },
    // 添加推广大使
    handleAddPeople(value) {
      addSpreadUser({ mobile: value.mobile }).then(res => {
        if (res.code === 0) {
          this.$message.success('添加推广大使成功～')
          this.dialogAddPeopleVis = false
          this.initPaginationAndGetList()
        }
      })
    },
    // 淘汰
    async eliminateUser() {
      await eliminateUser({ spreadUserId: this.rowId, eliminateReason: '审核不通过' })
      this.isShowExamine = false
      this.$message({
        type: 'success',
        message: '淘汰成功!'
      })
      // 重新查询列表
      this.initPaginationAndGetList()
    },
    // 赋值字典
    async getEum() {
      const allLevewl = await getAllLevel()
      const allUserStatus = await getAllUserStatus()
      this.$nextTick(() => {
        this.$refs.search.set({
          type: 'options',
          data: {
            level: allLevewl.payload.map(item => { return { value: item.level, label: item.levelInfo } }),
            status: allUserStatus.payload.map(item => { return { value: item.status, label: item.statusInfo } })
          }
        })
      })
    },
    // 导出推广大使
    async exportExcle() {
      const data = {
        hasAll: true,
        currentPage: 1
      }
      const { mobile, spreadUserId, weixinNum, level, status, reportTimeInfo, signTimeInfo, pid } = this.$refs.search.formData
      mobile && (data.mobile = mobile)
      spreadUserId && (data.spreadUserId = spreadUserId)
      weixinNum && (data.weixinNum = weixinNum)
      if (level || level === 0) {
        data.level = level
      }
      if (status || status === 0) {
        data.status = status
      }
      if (reportTimeInfo && reportTimeInfo.length) {
        data.reportStartTime = reportTimeInfo[0]
        data.reportEndTime = reportTimeInfo[1]
      }
      if (signTimeInfo && signTimeInfo.length) {
        data.signStartTime = signTimeInfo[0]
        data.signEndTime = signTimeInfo[1]
      }
      if (pid) {
        data.pid = pid
      }
      axios.post('/ai_api/api/fx/op/user/api/exportSpreadUser', data, { responseType: 'blob' }).then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', '推广大使报表.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    },
    // 打开审核
    toExamine(row) {
      this.isShowExamine = true
      this.rowId = row.spreadUserId
      if (row.answerDtoList) {
        row.occupation = row.answerDtoList[0].answer.toString()
        row.calendarRange = row.answerDtoList[1].answer.toString()
        row.income = row.answerDtoList[2].answer.toString()
        row.platform = row.answerDtoList[3].answer.toString()
      }
      this.$nextTick(() => {
        this.$refs.examineForm.recoveryForm(row)
      })
    },
    // 打开编辑
    editRow(row) {
      this.isShowEdit = true
      this.rowId = row.spreadUserId
      this.$nextTick(() => {
        this.$refs.editForm.recoveryForm(row)
      })
    },
    // 打开关闭
    closeRow(row) {
      this.isShowClose = true
      this.rowId = row.spreadUserId
      this.$nextTick(() => {
        this.$refs.closeForm.recoveryForm(row)
      })
    },
    // 审核通过
    async examineFormEnsure() {
      await approvedPromotionAmbassador({ spreadUserId: this.rowId })
      this.isShowExamine = false
      // 重新查询列表
      this.getList()()
    },
    // 提交编辑
    async editFormEnsure(form) {
      const { weixinNum, spreadUserName } = form
      await editPromotionAmbassador({ spreadUserId: this.rowId, weixinNum, spreadUserName })
      this.isShowEdit = false
      // 重新查询列表
      this.getList()
    },
    // 关闭
    async closeFormEnsure(form) {
      const { spreadUserId, closeReason } = form
      if (closeReason) {
        await closePromotionAmbassador({ spreadUserId, closeReason })
        this.isShowClose = false
        // 重新查询列表
        this.getList()
      }
    },
    // 恢复
    recovery(row) {
      const title = row.mobilePhone ? ':' + row.mobilePhone : ''
      this.$confirm(`确认恢复账号${title}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await recoveryPromotionAmbassador({ spreadUserId: row.spreadUserId })
        // 重新查询列表
        this.getList()
        this.$message({
          type: 'success',
          message: '恢复成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复!'
        })
      })
    },
    // 开启/关闭二级
    ediSecondLevel(row) {
      this.$confirm(`确认开启二级权限: ${row.mobilePhone || ''}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await ediSecondLevelAmbassador({ spreadUserId: row.spreadUserId })
        // 重新查询列表
        this.getList()
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作!'
        })
      })
    },
    // 查询
    submitSearch(values) {
      for (const key in values) {
        if (values[key] || values[key] === 0) {
          this.searchQuery[key] = values[key]
        } else {
          this.searchQuery[key] = null
        }
      }
      this.initPaginationAndGetList()
    },
    // 重置分页，查询列表
    initPaginationAndGetList() {
      this.listQuery = { ...init_pagination }
      this.getList()
    },
    // 获取 列表数据
    async getList() {
      const { listQuery: { page, limit }, searchQuery } = this
      const payload = {
        ...searchQuery,
        currentPage: page,
        size: limit
      }
      if (searchQuery.reportTimeInfo && searchQuery.reportTimeInfo.length) {
        payload.reportStartTime = searchQuery.reportTimeInfo[0]
        payload.reportEndTime = searchQuery.reportTimeInfo[1]
        delete payload.reportTimeInfo
      }
      if (searchQuery.signTimeInfo && searchQuery.signTimeInfo.length) {
        payload.signStartTime = searchQuery.signTimeInfo[0]
        payload.signEndTime = searchQuery.signTimeInfo[1]
        delete payload.signTimeInfo
      }
      const res = await promotionAmbassadorList(payload)
      const { fxSpreadUserList, totalCount } = res.payload
      this.list = fxSpreadUserList
      this.total = parseInt(totalCount)
    },
    // 加微信
    addWeChat(row) {
      const title = row.administratorWeixin ? row.administratorWeixin : ''
      this.$confirm(`确认${row.addWechat === 1 ? '未' : '已'}加微信：${title}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await updateAddWechat({ spreadUserId: row.spreadUserId })
        // 重新查询列表
        this.getList()
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作!'
        })
      })
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
</style>
