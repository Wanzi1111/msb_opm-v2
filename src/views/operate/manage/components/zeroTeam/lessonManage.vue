<template>
  <div>
    <div class="title-container">
      <basics-title title="课管理" line :actions="act" />
    </div>
    <div
      v-loading="loadings._k8s_api_activity_api_activity_config_getActivityList
        || loadings._k8s_api_activity_api_activity_config_getActivityCourseList
        || loadings._k8s_api_activity_api_activity_config_activityCourseSortByFlag"
      class="app-container"
    >
      <basics-search
        ref="searchs"
        :loading="loadings._ums_api_uc_api_platform_user_list"
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
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { getActivityCourseList, getZeroActivityList, delActivityCourseById, activityCourseSortByFlag } from '@/api/operate/manage'
import actions from './action'
import { lessonManageSearchs } from './search'
import { lessonManageColumns, lessonManageTableActions } from './column'
import { lineMap } from './index.vue'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'ManageZeroTeamLessonManage',
  props: {
    line: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columns: lessonManageColumns,
      searchs: lessonManageSearchs,
      act: actions({ create: this.handleActions }),
      total: 0,
      list: [{ id: 1 }],
      activeTab: '0',
      searchQuery: {},
      listQuery: { ...init_pagaination },
      actionFunction: lessonManageTableActions({ handleTableAction: this.handleTableAction })
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
      this.getZeroActivityList()
      this.$refs.searchs.search()
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
      const { activityId } = this.$route.query
      getActivityCourseList({ activityId, ...searchQuery })
        .then(({ payload }) => {
          this.list = payload
        })
    },
    // 活动名称列表
    getZeroActivityList() {
      const { line, activityId } = this.$route.query
      this.$refs.searchs.set({
        type: 'defaultVal',
        data: { activityId, line, del: 0 }
      })
      getZeroActivityList({ activityType: lineMap[line] })
        .then(({ payload }) => {
          payload.forEach(v => {
            v.label = v.activityName
            v.value = v.activityId
          })
          this.$refs.searchs.set({
            type: 'options',
            data: { activityId: payload }
          })
        })
    },
    submitSearch(value, reset) {
      this.searchQuery = { ...value }
      if (reset) {
        // 默认参数
        const { line, activityId } = this.$route.query
        this.$refs.searchs.set({
          type: 'defaultVal',
          data: { activityId, line }
        })
        this.searchQuery = { line, activityId }
      }
      this.initGetList()
    },
    handleTableAction(type, row) {
      const { line } = this.$route.query
      const { activityId, id, img, url, name } = row
      switch (type) {
        case 'sortUp': {
          activityCourseSortByFlag({ id, activityId, flag: 0 })
            .then(() => {
              this.$message.success('升序成功～')
              this.getList()
            })
          break
        }
        case 'sortDown': {
          activityCourseSortByFlag({ id, activityId, flag: 1 })
            .then(() => {
              this.$message.success('降序成功～')
              this.getList()
            })
          break
        }
        case 'edit': {
          this.$router.push({ name: 'ManageZeroTeamLessonCreate', query: { line, activityId, id, img, url, name }})
          break
        }
        case 'close': {
          this.$confirm('确认停用吗？', '停用', { type: 'warning' })
            .then(() => {
              delActivityCourseById({ id, del: 1 })
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
              delActivityCourseById({ id, del: 0 })
                .then(() => {
                  this.$message.success('恢复成功～')
                  this.getList()
                })
            })
          break
        }
      }
    },
    handleActions() {
      const { line, activityId } = this.$route.query
      this.$router.push({ name: 'ManageZeroTeamLessonCreate', query: { line, activityId }})
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
