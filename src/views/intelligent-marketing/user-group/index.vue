<template>
  <div>
    <div class="title-container">
      <basics-title title="用户分群管理" line :actions="actions" />
    </div>

    <div v-loading="appLoading" class="app-container">
      <basics-tabs
        :tab-list="tabList"
        :active-tab="activeTab"
        @handleTabClick="handleTabClick"
      />

      <basics-search
        ref="searchs"
        :searchs="searchs"
        @submitSearch="submitSearch"
      />

      <basics-table
        :list="list"
        :get-list="getList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actionFunction"
      />

      <template>
        <dialog-user-group-classify v-if="dialogType === 'editUserGroupClassify'" @handleDialogVis="handleDialogVis" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep, omit } from 'lodash'
import moment from 'moment'
import {
  getGroupTreeByRootId,
  getGroupList,
  updateGroupStatus,
  removeGroupById,
  refreshGroup,
  exportByGroupId
} from '@/api/intelligentMarketing'
import { getToken } from '@/utils/auth'
import DialogUserGroupClassify from './components/dialogUserGroupClassify'
import searchs from './search'
import columns, { tableActions } from './columns'
import { tabList, actions } from './config'
import { transferData } from './utils'

const init_pagination = {
  page: 1,
  limit: 20
}

const uid = getToken('userId')
const uname = getToken('cname')

export default {
  name: 'UserGroup',
  components: { DialogUserGroupClassify },
  data() {
    return {
      columns,
      searchs,
      tabList,
      total: 0,
      list: [],
      activeTab: '1',
      searchQuery: {},
      dialogType: '',
      dialogData: null,
      userGroupTree: {},
      listQuery: { ...init_pagination },
      actions: actions({ handleActions: this.handleActions }),
      actionFunction: tableActions({
        handleTableAction: this.handleTableAction
      })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._big_data_client_profile_group_page ||
       loadings._big_data_client_profile_group_getGroupTreeByRootId_1 ||
       loadings._big_data_client_profile_group_getGroupTreeByRootId_2 ||
       loadings._big_data_client_profile_group_getGroupTreeByRootId_3 ||
       loadings._big_data_client_profile_group_updateStatus ||
       loadings._big_data_client_profile_group_removeById ||
       loadings._big_data_client_profile_group_refresh
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.handleUserGroupTree()
      const { $route: { query: { type, bizId, groupCode }}} = this
      // 从别的分群展示 快捷跳转过来
      if (type === 'linkSearch') {
        if (bizId && groupCode) {
          this.activeTab = bizId || '1'
          this.$refs.searchs.set({
            type: 'defaultVal',
            data: {
              userSearchSelect: 'groupCode',
              userSearch: groupCode
            }
          })
        }
      }
      this.$refs.searchs.search()
    })
  },
  activated() {
    this.getList()
  },
  methods: {
    initGetList() {
      this.listQuery = { ...init_pagination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      console.log('2', 2)
      const { activeTab, searchQuery, listQuery: { page: pageNo, limit: pageSize }} = this
      getGroupList({ bizId: +activeTab, pageNo, pageSize, ...searchQuery })
        .then(res => {
          const { result: { list, total }} = res
          this.list = list
          this.total = total
        }).catch(() => {
          this.list = []
          this.total = 0
        })
    },
    submitSearch(value) {
      console.log('value', value)
      let newValue = cloneDeep(value)
      if (newValue.createTime?.length) {
        newValue.ctimeBegin = moment(newValue[0]).format('YYYY-MM-DD')
        newValue.ctimeEnd = moment(newValue[1]).format('YYYY-MM-DD')
      }
      // 组装inputSelect
      if (newValue.userSearch) {
        newValue[newValue['userSearchSelect']] = newValue['userSearch']
      }
      newValue.hasStop = newValue.hasStop?.length ? 0 : 1
      newValue.groupTreeId = newValue.groupTreeId?.length ? newValue.groupTreeId : null
      // 剔除无用属性
      newValue = omit(newValue, ['createTime', 'userSearch', 'userSearchSelect'])
      this.searchQuery = { ...newValue }
      this.initGetList()
    },
    async handleTabClick(val) {
      this.activeTab = val
      await this.handleUserGroupTree()
      this.$refs.searchs.search()
    },
    handleTableAction(type, row) {
      console.log('【type】', type)
      switch (type) {
        case 'log': {
          this.$router.push({ path: '/intelligent-marketing/user-group-log', query: { id: row.id }})
          break
        }
        case 'edit': {
          this.$router.push({ path: '/intelligent-marketing/user-group-detail', query: { id: row.id, type: 'edit' }})
          break
        }
        case 'stop': {
          this.$confirm('停用后将暂停更新数据', '停用', { type: 'warning' })
            .then(() => {
              updateGroupStatus({ id: row.id, status: 4, uid, uname })
                .then(() => {
                  this.$message.success('停用场景成功～')
                  this.getList()
                })
            })
          break
        }
        case 'enable': {
          this.$confirm('启用后数据将开始更新', '启用', { type: 'warning' })
            .then(() => {
              updateGroupStatus({ id: row.id, status: 0, uid, uname })
                .then(() => {
                  this.$message.success('启用场景成功～')
                  this.getList()
                })
            })
          break
        }
        case 'delete': {
          this.$confirm('删除存在数据缺失风险，请先确认是否存在相关数据。此操作无法恢复！确定删除吗？', '删除', { type: 'warning' })
            .then(() => {
              removeGroupById({ id: row.id, uid, uname })
                .then(() => {
                  this.$message.success('删除场景成功～')
                  this.getList()
                })
            })
          break
        }
        case 'refresh': {
          this.$confirm('手动刷新后数据将开始更新', '刷新', { type: 'warning' })
            .then(() => {
              refreshGroup({ id: row.id, uid, uname })
                .then(() => {
                  this.$message.success('刷新场景成功～')
                  this.getList()
                })
            })
          break
        }
        case 'dowload': {
          exportByGroupId({ id: row.id })
            .then(res => {
              window.open(res.result)
            })
        }
      }
    },
    handleActions(type) {
      switch (type) {
        case 'addUserGroup': {
          this.$router.push({ path: '/intelligent-marketing/user-group-detail' })
          break
        }
        case 'editUserGroupClassify': {
          this.dialogType = 'editUserGroupClassify'
        }
      }
    },
    handleDialogVis(type, data, refreshFlag) {
      this.dialogType = type
      this.dialogData = data
      refreshFlag && this.initGetList()
    },
    // 根据不同业务线 处理对应的人群分类筛选
    handleUserGroupTree() {
      return new Promise(async (resolve) => {
        const { activeTab: rootId, userGroupTree } = this
        let treeData = []
        if (userGroupTree[rootId]) {
          treeData = [...userGroupTree[rootId]]
        } else {
          const res = await getGroupTreeByRootId({ rootId })
          treeData = transferData(res.result)
          this.userGroupTree[rootId] = treeData
        }
        this.$refs.searchs.set({
          type: 'defaultVal',
          data: { groupTreeId: null }
        })
        this.$refs.searchs.set({
          type: 'options',
          data: { groupTreeId: treeData }
        })
        resolve()
      })
    }
    // getUserPropsTreeByRootId() {
    //   getUserPropsTreeByRootId({})
    // }
  }
}
</script>
<style lang="scss" scoped></style>
