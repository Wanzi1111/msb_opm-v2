<template>
  <div class="app-container ad-input">
    <el-tabs v-model="currTab.businessType" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item, index) in activityConfig.businessType" :key="index" :label="item.label" :name="item.value" />
    </el-tabs>
    <div v-if="searchs">
      <basics-search
        ref="searchs"
        :searchs="searchs"
        :loading="loadings._operation_resource_publishListV2"
        @submitSearch="submitSearch"
      />
    </div>
    <basics-action :actions="act" />
    <el-collapse v-model="activeNames" v-loading="loadings._ums_meixiu_api_a_r_v1_rActivityType_select" accordion @change="handleChange">
      <el-collapse-item v-for="(item, index) in classTableData" :key="index" :name="index">
        <template slot="title">
          <span>分类名称</span>
          <span class="inline" />
          <span style="color: #606266">{{ item.typeName }}</span>
          <p class="title-right">
            <i class="el-icon-top" style="margin-right:10px" @click.stop="handleSort(index, item, 0)" />
            <i class="el-icon-bottom" @click.stop="handleSort(index, item, 1)" />
          </p>
        </template>
        <div>
          <basics-table
            ref="table"
            :table="table"
            :loading="loadings._ums_meixiu_api_a_r_v1_rActivity_select"
            :list="activityTableData"
            :columns="columns"
            :action-function="actionFunction"
          />
        </div>
      </el-collapse-item>
    </el-collapse>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <!-- 分类管理 -->
    <el-dialog
      v-if="isShowClassification"
      title="分类管理"
      :visible.sync="isShowClassification"
      width="800px"
    >
      <Classification />
    </el-dialog>
    <!-- 新增/修改活动 -->
    <el-dialog
      v-if="isShowEditActivity"
      append-to-body
      :title="`${activityTitle}活动`"
      :visible.sync="isShowEditActivity"
      width="500px"
    >
      <basics-form ref="activityForm" :loading="loadings._permissions_api_user_pwd_mod" :forms="forms" :actions="formActions" @submitForm="submitForm" @changeForm="changeActivityForm" />
    </el-dialog>
  </div>
</template>

<script>
import searchs from './searchs/searchs'
import act from './actions/list'
import BasicsAction from '@/components/BasicsAction'
import Classification from './component/classificationManage/index.vue'
import BasicsForm from '@/components/BasicsForm'
import Pagination from '@/components/Pagination'
import columns, { actions } from './columns/list.js'
import { mapGetters } from 'vuex'
import moment from 'moment'
import forms, { actions as formActions } from './forms'
import { activityList, saveActivity, updateActivity, activitySort, activityTypeSort } from '@/api/operate/activity-api'
import { rActivityList } from '@/api/operate/activity-api.js'

export default {
  name: 'Activity',
  components: { BasicsAction, Classification, BasicsForm, Pagination },
  data() {
    return {
      table: { stripe: true },
      activeNames: null,
      activityTableData: [],
      classTableData: [],
      activityTitle: '新增',
      isShowClassification: false,
      dialogVisible: false,
      isShowEditActivity: false,
      url: '',
      clientType: null,
      srcList: [],
      act: act({ classification: this.classification, toAddAd: this.toAddAd }),
      total: 0,
      listQuery: {
        page: 1,
        size: 20
      },
      query: {
        time: [`${moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`]
      },
      actionFunction: actions({ handleDelete: this.handleDelete, handleEdit: this.handleEdit, handleSortDown: this.handleSortDown, handleSortUp: this.handleSortUp }),
      searchs: searchs,
      list: [],
      columns: columns(),
      forms: forms,
      formActions: formActions({ close: this.close }),
      // 列表查看
      showDetailState: false,
      currTab: {
        businessType: '1'
      },
      activityId: null
    }
  },
  computed: {
    ...mapGetters(['loadings', 'activityConfig'])
  },
  created() {
  },
  async mounted() {
    if (this.activityConfig.businessType && this.activityConfig.businessType.length) {
      this.currTab.businessType = this.activityConfig.businessType[0].value
    }
    this.getList()
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('删除后，客户端将不显示此活动入口，且不可恢复', '此操作将删除此活动入口，是否确认？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await updateActivity({ del: 1, id: parseInt(row.id) })
        this.$message({
          message: '删除活动成功。',
          type: 'success'
        })
        this.handleChange(this.activeNames)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑活动
    handleEdit(index, row) {
      this.$router.push({ name: 'ActivityAdd', query: { businessType: '小熊艺术', editType: 'edit', parentId: row.id }})
      // this.activityTitle = '编辑'
      // this.activityId = row.id.split('-')[0]
      // this.isShowEditActivity = true
      // const that = this
      // this.$nextTick(() => {
      //   that.$refs.activityForm.recoveryForm({ ...row, businessType: row.activityBusinessId })
      // })
    },
    // 排序
    async handleSort(index, row, sortType) {
      await activityTypeSort({ sortType: sortType, id: parseInt(row.id) })
      this.getList()
    },
    // 排序
    async handleSortUp(dat, row, index) {
      await activitySort({ sortType: 0, id: parseInt(row.id) })
      this.handleChange(this.activeNames, 'isSort')
    },
    async handleSortDown(dat, row, index) {
      await activitySort({ sortType: 1, id: parseInt(row.id) })
      this.handleChange(this.activeNames, 'isSort')
    },
    // 获取活动
    handleChange(val, isSort) {
      if (val || val === 0) {
        if (!isSort) {
          this.activityTableData = []
        }
        const time = this.query.time || []
        const data = {
          activityTypeId: parseInt(this.classTableData[val].id),
          startTime: moment(new Date(time[0])).valueOf(),
          endTime: moment(new Date(time[1])).valueOf()
        }
        // 赋值活动
        activityList(data).then(res => {
          this.activityTableData = res.payload.content
        })
      }
    },
    async changeActivityForm(val, oldVal) {
      if ((val.businessType !== oldVal.businessType) && val.businessType) {
        const res = await rActivityList({ ...this.listQuery, activityBusinessId: parseInt(val.businessType) })
        this.$refs.activityForm.set({
          type: 'options',
          data: {
            activityTypeId: res.payload.content.map(item => { return { label: item.typeName, value: item.id } })
          }
        })
      }
    },
    // 新增/修改活动
    async submitForm(val) {
      try {
        if (this.activityId) {
          await updateActivity({ ...val, id: this.activityId })
        } else {
          await saveActivity(val)
        }
        this.handleChange(this.activeNames)
        this.$message({
          message: this.activityId ? '修改活动成功。' : '新增活动成功。',
          type: 'success'
        })
        this.activityId = null
      } catch (error) {
        this.$message.error(this.activityId ? '修改活动失败。' : '新增活动失败。')
      }
      this.isShowEditActivity = false
    },
    close() {
      this.isShowEditActivity = false
    },
    handleTabClick() {
    },
    // submitSearch
    // 点击搜索
    submitSearch(val) {
      this.listQuery = {
        page: 1,
        limit: 20
      }
      this.query = val
      this.getList()
    },
    // 新建投放
    toAddAd() {
      this.$router.push({ name: 'ActivityAdd', query: { businessType: '小熊艺术', editType: 'add' }})
      // this.activityTitle = '新建'
      // this.activityId = null
      // this.isShowEditActivity = true
    },
    viewImg(dat, row) {
      this.dialogVisible = true
      this.url = row.resourceUrl
      this.srcList = []
      this.srcList.push(this.url)
    },
    // 获取活动分类列表
    async getList() {
      this.activeNames = null
      const res = await rActivityList({ ...this.listQuery, activityBusinessId: parseInt(this.currTab.businessType) })
      this.classTableData = res.payload.content
      this.total = parseInt(res.payload.totalElements)
    },
    // 分类管理
    classification() {
      this.isShowClassification = true
    }
  }
}
</script>
<style lang="scss" scoped>
.ad-container {
  padding: 20px;
}
.ad-input {
  ::v-deep .search-item-label {
    width: 70px !important;
  }
}
.inline {
  width: 1px;
  background: #ada4a4;
  height: 20px;
  margin: 0 10px;
}
.title-right {
  position: absolute;
  right: 80px;
}
</style>
