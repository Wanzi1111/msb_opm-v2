<template>
  <div>
    <basics-search
      ref="searchs"
      :loading="loadings._k8s_api_activity_api_activity_config_getActivityList"
      :searchs="searchs"
      @submitSearch="submitSearch"
    />
    <basics-table
      :loading="loadings._k8s_api_activity_api_activity_config_getActivityList"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import searchs from './search'
import columns, { tableActions } from './column'
import { getZeroActivityList, delActivityById, activitySortByFlag } from '@/api/operate/manage'

const init_pagaination = {
  page: 1,
  limit: 20
}

export const lineMap = {
  1: 'YIYUAN',
  2: 'NEWBEARART'
}

export default {
  name: 'ZeroTeam',
  props: {
    line: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columns,
      searchs,
      total: 0,
      list: [{ id: 1 }],
      activeTab: '0',
      searchQuery: {},
      listQuery: { ...init_pagaination },
      actionFunction: tableActions({ handleTableAction: this.handleTableAction })
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    line() {
      this.getList()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    initGetList() {
      this.listQuery = { ...init_pagaination }
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const { searchQuery } = this
      const activityType = lineMap[this.line]
      getZeroActivityList({ activityType, ...searchQuery })
        .then(({ payload }) => {
          this.list = payload
        })
    },
    submitSearch(value) {
      this.searchQuery = { ...value }
      this.initGetList()
    },
    handleTableAction(type, row) {
      const { line } = this
      const { activityId } = row
      const activityType = lineMap[line]
      switch (type) {
        case 'sortUp': {
          activitySortByFlag({ activityId, activityType, flag: 0 })
            .then(() => {
              this.$message.success('升序成功～')
              this.getList()
            })
          break
        }
        case 'sortDown': {
          activitySortByFlag({ activityId, activityType, flag: 1 })
            .then(() => {
              this.$message.success('降序成功～')
              this.getList()
            })
          break
        }
        case 'edit': {
          this.$router.push({ name: 'ManageCreateZeroTeam', query: { line, activityId }})
          break
        }
        case 'lessonManage': {
          this.$router.push({ name: 'ManageZeroTeamLessonManage', query: { line, activityId }})
          break
        }
        case 'close': {
          this.$confirm('确认停用吗？', '停用', { type: 'warning' })
            .then(() => {
              delActivityById({ activityId, del: 1 })
                .then(() => {
                  this.$message.success('停用成功～')
                  this.getList()
                })
            })
          break
        }
        case 'open': {
          this.$confirm('确认恢复吗？', '恢复', { type: 'warning' })
            .then(() => {
              delActivityById({ activityId, del: 0 })
                .then(() => {
                  this.$message.success('恢复成功～')
                  this.getList()
                })
            })
          break
        }
      }
    },
    handleActions() { }
  }
}
</script>
<style lang="scss" scoped>
</style>
