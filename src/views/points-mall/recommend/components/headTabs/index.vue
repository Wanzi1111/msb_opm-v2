<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-25 17:40:48
 * @LastEditTime: 2022-04-07 18:44:11
 * @LastEditors: ZhangYeLei
-->
<template>
  <div
    v-loading="loadings._k8s_api_poster_api_v1_recommend_poster_getPosterAll"
    class="headers"
  >
    <el-tabs v-model="businessType" @tab-click="handelLine">
      <el-tab-pane v-for="(item, index) in newStateList" :key="index" :label="item.name" :name="item.businessType" />
    </el-tabs>
    <basics-search
      ref="searchs"
      :searchs="search"
      @submitSearch="submitSearch"
    />
    <el-row v-loading="loadings._ums_meixiu_api_im_g_v1_recommend_query_recommendationTag" class="search-container">
      <el-col class="search-col">
        <template v-for="(el) in list">
          <el-button :key="el.id" style="margin-bottom: 10px;" :type="ecommendationManageId === el.id? 'primary': 'plain'" @click="selectFn(el.id)">{{ el.recommendationTag }}</el-button>
        </template>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { recommendationTag } from '@/api/points-mall/recommend'
import { mapGetters } from 'vuex'
import search from './forms/search'
import _ from 'lodash'
import { business } from '../../enum/index'

export default {
  name: 'HeadTabs',
  data() {
    return {
      // 转介绍海报 新增字段
      businessType: 'ONETOONE',
      ecommendationManageId: '',
      search: search,
      list: []
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    newStateList() {
      return business
    }
  },
  created() {
    this.lineList()
  },
  methods: {
    selectFn(ecommendationManageId) {
      const { businessType } = this
      this.$set(this, 'ecommendationManageId', ecommendationManageId)
      this.$emit('getList', { businessType, ecommendationManageId }, { page: 1, limit: 10 })
    },
    // 推荐管理
    submitSearch(val) {
      this.$emit('getList', val)
    },
    lineList: _.debounce(async function() {
      const { businessType } = this
      await recommendationTag({ businessType }).then((result) => {
        this.list = result.payload || []
        const ecommendationManageId = result.payload.length ? result.payload[0].id : ''
        if (ecommendationManageId) {
          this.$set(this, 'ecommendationManageId', ecommendationManageId)
        }
        this.$emit('getList', { businessType, ecommendationManageId }, { page: 1, limit: 10 })
      }).catch((err) => {
        this.$message(err)
      })
    }, 200),
    async handelLine() {
      await this.lineList()
    }
  }
}
</script>

<style lang="scss" scoped>
.headers {
  // margin-bottom: 20px;
}
.search-container {
    margin-right: -10px;

    // ::v-deep .el-input__inner {
    //   businessType-height: 1;
    // }

  }
  .search-col {
    /*height: 36px;*/
    // margin-bottom: 10px;
  }
</style>
