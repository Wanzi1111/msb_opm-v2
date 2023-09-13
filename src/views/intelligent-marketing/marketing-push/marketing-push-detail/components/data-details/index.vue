<template>
  <div v-loading="loadings._ums_meixiu_api_sms_api_push_market_plan_data">
    <div class="statics-bar">
      <el-row :gutter="24">
        <el-col v-for="v in staticsConfig" :key="v.key" :span="4">
          <div class="statics-box">
            <span class="label">{{ v.label }}</span>
            <i class="value">{{ v.value }}</i>
          </div>
        </el-col>
      </el-row>
    </div>

    <basics-search
      ref="searchs"
      :loading="loadings._ums_api_uc_api_platform_user_list"
      :searchs="searchs"
      @submitSearch="submitSearch"
    />

    <basics-table
      :loading="loadings._ums_api_uc_api_platform_user_list"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      @sort-change="handleSort"
    />

  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { getMarketingPlanDetail } from '@/api/intelligentMarketing'
import searchs from './searchs'
import columns from './columns'
import { staticsConfig } from './config'

const init_pagaination = {
  page: 1,
  limit: 20
}

export default {
  name: 'MarketingPushDetails',
  data() {
    return {
      columns,
      searchs,
      total: 0,
      list: [],
      staticsConfig,
      sortQuery: {},
      searchQuery: {},
      listQuery: { ...init_pagaination }
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    ...mapState(['intelligentMarketing'])
  },
  mounted() {
    this.$nextTick(() => {
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
      const { id } = this.$route.query
      const { searchQuery, sortQuery, listQuery } = this
      const payload = {
        planId: id,
        pageNum: listQuery.page,
        pageSize: listQuery.limit,
        ...sortQuery,
        ...cloneDeep(searchQuery)
      }
      if (payload.createTime?.length) {
        payload.startDate = moment(payload.createTime[0]).format('YYYY-MM-DD')
        payload.endDate = moment(payload.createTime[1]).format('YYYY-MM-DD')
      }
      delete payload.createTime
      getMarketingPlanDetail(payload)
        .then(({ payload: { subPlanList: { list, totalSize }, audienceCount, planCount, planSendRate, uv, pv, clickRate, triggerType, startDate, endDate, triggerTime, businessType, status, name, triggerDateTimes }}) => {
          const staticsData = { audienceCount, planCount, planSendRate: `${planSendRate === 0 ? 0 : (planSendRate / 100).toFixed(2)}%`, uv, pv, clickRate: `${clickRate === 0 ? 0 : (clickRate / 100).toFixed(2)}%` }
          const trigerData = { triggerType, startDate, endDate, triggerTime, businessType, status, name, triggerDateTimes }

          staticsConfig.forEach(v => {
            v.value = staticsData[v.key]
          })
          this.$emit('handleTitleData', trigerData)
          this.list = list
          this.total = totalSize
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
    handleDialogVis(type, data, refreshFlag) {
      this.dialogType = type
      this.dialogData = data
      refreshFlag && this.initGetList()
    }
  }
}
</script>
<style lang="scss" scoped>
.statics-bar {
  padding: 14px;
  margin: 8px 0;
  border-radius: 2px;
  background-color: #f0f0f0;
  .statics-box {
    height: 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .label {
      font-size: 14px;
      color: #909399;
    }
    .value {
      font-size: 16px;
      color: #434343;
    }
  }
}
</style>
