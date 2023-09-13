<template>
  <div v-loading="loadings._ums_meixiu_api_sms_api_push_market_plan_list || loadings._ums_meixiu_api_sms_api_push_market_coverTemplate">
    <div class="title-container">
      <basics-title
        title="营销push管理"
        line
        :actions="actions"
      />
    </div>

    <div class="app-container">
      <basics-tabs
        :tab-list="intelligentMarketing.pushDinc.listBusinessType || []"
        :active-tab="businessType"
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
        @sort-change="handleSort"
      />

      <template>
        <dialog-marketing-push-classify v-if="dialogType === 'editMarketingPushClassify'" @handleDialogVis="handleDialogVis" />
      </template>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { getListPlan, stopPlan, enablePlan, listCategory, coverTemplate } from '@/api/intelligentMarketing'
import searchs from './search'
import columns, { tableActions } from './columns'
import { actions } from './config'
import DialogMarketingPushClassify from './components/dialogMarketingPushClassify'

const init_pagaination = {
  page: 1,
  limit: 20
}

export const transferData = (tree) => {
  if (tree.length) {
    tree.map(v => {
      v.label = v.name
      v.value = v.id + ''
      if (v.childList?.length) {
        v.children = transferData(v.childList)
      }
      return v
    })
  }
  return tree
}

export default {
  name: 'MarketingPush',
  components: { DialogMarketingPushClassify },
  data() {
    return {
      columns,
      searchs,
      total: 0,
      list: [],
      dialogType: '',
      businessType: '101',
      searchQuery: {},
      sortQuery: {},
      listQuery: { ...init_pagaination },
      actions: actions({ handleActions: this.handleActions }),
      actionFunction: tableActions({ handleTableAction: this.handleTableAction })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    ...mapState(['intelligentMarketing'])
  },
  mounted() {
    this.$nextTick(() => {
      this.getListCategory()
      this.getList()
    })
  },
  activated() {
    this.getList()
  },
  methods: {
    initGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getListCategory() {
      listCategory({ businessType: this.businessType })
        .then(res => {
          const treeData = transferData(res.payload)
          this.$nextTick(() => {
            this.$refs.searchs.set({
              type: 'options',
              data: { oneTypeId: treeData }
            })
          })
        })
    },
    getList() {
      const { searchQuery, sortQuery, listQuery: { page: pageNum, limit: pageSize }, businessType } = this
      const newSearchQuery = cloneDeep(searchQuery)

      if (newSearchQuery.oneTypeId?.length) {
        if (newSearchQuery.oneTypeId.length === 1) {
          newSearchQuery.oneTypeId = newSearchQuery.oneTypeId[0]
        } else if (newSearchQuery.oneTypeId.length === 2) {
          newSearchQuery.twoTypeId = newSearchQuery.oneTypeId[1]
          newSearchQuery.oneTypeId = newSearchQuery.oneTypeId[0]
        }
      }
      if (newSearchQuery.createTime?.length) {
        newSearchQuery.startDate = moment(newSearchQuery.createTime[0]).format('YYYY-MM-DD')
        newSearchQuery.endDate = moment(newSearchQuery.createTime[1]).format('YYYY-MM-DD')
      }
      if (newSearchQuery.status?.length) {
        newSearchQuery.status = newSearchQuery.status[0]
      }
      delete newSearchQuery.createTime

      const payload = {
        pageNum,
        pageSize,
        businessType,
        ...sortQuery,
        ...newSearchQuery
      }
      getListPlan(payload)
        .then(({ payload: { list, totalSize }}) => {
          this.list = list
          this.total = totalSize
        })
        .catch(() => {
          this.list = []
          this.total = 0
        })
    },
    handleSort(obj) {
      let sortQuery = {}
      if (obj.order) {
        sortQuery = { [`${obj.prop}Order`]: obj.order === 'ascending' ? 0 : 1 }
      }
      this.sortQuery = sortQuery
      this.initGetList()
    },
    submitSearch(value) {
      this.searchQuery = { ...value }
      this.initGetList()
    },
    handleDialogVis(type, data, refreshCategory) {
      this.dialogType = type
      this.dialogData = data
      refreshCategory && this.getListCategory()
    },
    handleTabClick(val) {
      this.businessType = val
      this.$refs.searchs.set({
        type: 'defaultVal',
        data: { oneTypeId: null }
      })
      delete this.searchQuery.oneTypeId
      delete this.searchQuery.twoTypeId

      this.getListCategory()
      this.getList()
    },
    handleTableAction(type, row) {
      switch (type) {
        case 'detail': {
          this.$router.push({ path: '/intelligent-marketing/marketing-push-detail', query: { id: row.id }})
          break
        }
        case 'copy': {
          this.$router.push({ path: '/intelligent-marketing/operation-plan', query: { type: 'copy', id: row.id }})
          break
        }
        case 'enable': {
          this.$confirm('启用后数据将开始更新', '启用', { type: 'warning' })
            .then(() => {
              enablePlan({ id: row.id })
                .then(() => {
                  this.$message.success('启用成功～')
                  this.getList()
                })
            })
          break
        }
        case 'stop': {
          this.$confirm('停用后数据将暂停更新', '停用', { type: 'warning' })
            .then(() => {
              stopPlan({ id: row.id })
                .then(() => {
                  this.$message.success('停用成功～')
                  this.getList()
                })
            })
          break
        }
        case 'cover': {
          this.$confirm('编辑修改后可能会对数据产生影响，确定修改么？', '提示', { type: 'warning' })
            .then(() => {
              const { templateId, id } = row
              this.$prompt(`原模板ID：${templateId}`, '覆盖消息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '请输入新模板ID'
              }).then(({ value }) => {
                coverTemplate({ planId: id, oldTemplateId: templateId, newTemplateId: value })
                  .then(() => {
                    this.$message.success('覆盖成功~')
                    this.getList()
                  })
              })
            })
          break
        }
      }
    },
    handleActions(type) {
      switch (type) {
        case 'createOperationPlan': {
          this.$router.push({ path: '/intelligent-marketing/operation-plan' })
          break
        }
        case 'editMarketingPushClassify': {
          this.dialogType = type
          break
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
