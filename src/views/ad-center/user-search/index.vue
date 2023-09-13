<template>
  <div>
    <div class="title-container">
      <basics-title title="用户查询" line />
    </div>

    <div v-loading="loading" class="app-container">
      <basics-search
        ref="searchs"
        :searchs="searchs"
        @submitSearch="submitSearch"
        @changeSearch="handleSearchChange"
      />
      <el-row v-if="list.length" :gutter="40" class="ad-row">
        <el-col v-for="v in list" :key="v.id" :span="4">
          <div class="img-wrap">
            <div class="img-box">
              <el-image
                fit="contain"
                :src="v.resourceUrl"
                :preview-src-list="[v.resourceUrl]"
              />
            </div>
          </div>
          <div class="ad-info">
            <div>投放ID：{{ v.id }}</div>
            <el-tooltip effect="dark" :content="v.otherUrl" placement="top">
              <div class="ad-otherUrl">链接：{{ v.otherUrl }}</div>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <el-empty v-else :image-size="200" />
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import searchs from './search'
import { getUserAdList } from '@/api/ad-center/user-search'
import { listAdvertNew } from '@/api/ad-center/ad-position'

export default {
  name: 'AdCenterUserSearch',
  data() {
    return {
      searchs,
      list: [],
      searchQuery: { businessName: '美术宝1对1' },
      clientType: '学生端App'
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    loading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_a_ad_resource_listAdvertV2 ||
      loadings._ums_meixiu_api_a_ad_preview_ad
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    getList() {
      const { searchQuery } = this
      if (!searchQuery.uid) {
        this.$message.error('请输入用户id！')
        return
      }
      getUserAdList({ ...searchQuery, clientType: this.clientType })
        .then(({ data }) => {
          this.list = data
        })
    },
    submitSearch(value) {
      this.searchQuery = { ...value }
      this.getList()
    },
    handleSearchChange(val, oldVal) {
      if (val.businessName !== oldVal.businessName && val.businessName) {
        const payload = { bussinessName: val.businessName, clientType: this.clientType, enabeld: 0, pageNum: 1, pageSize: 999 }
        listAdvertNew(payload)
          .then(({ data: { list }}) => {
            this.$refs.searchs.set(({
              type: 'options',
              data: {
                advertType: list.map(v => ({ label: v.advertType, value: v.advertType }))
              }
            }))
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ad-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px;
}
.img-wrap {
  width: 100%;
  height: 100%;
  padding: 6px;
  border: 1px dashed #ccc;
  border-radius: 20px;
  .img-box {
    width: 100%;
    height:0;
    border-radius: 20px;
    position: relative;
    padding-bottom: 100%;
    ::v-deep .el-image {
      width:100%;
      height:100%;
      border-radius: 20px;
      position: absolute
    }
  }
}
.ad-info {
  font-size: 14px;
  color: #666;
  border-left: 2px solid #999;
  margin: 20px 10px 50px 10px;
  padding-left: 10px;
  .ad-otherUrl {
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
