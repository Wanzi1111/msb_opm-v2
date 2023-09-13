<template>
  <div class="app-container ad-input">
    <!-- <tab-client @handleTabClick="handleTabClick" /> -->
    <el-tabs v-model="currTab.businessType" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item, index) in adConfig.businessType" :key="index" :disabled="loadings._ums_meixiu_api_a_ad_resource_publishListV2" :label="item.label" :name="item.value" />
    </el-tabs>
    <div v-if="searchs">
      <basics-search
        ref="searchs"
        :searchs="searchs"
        :loading="loadings._ums_meixiu_api_a_ad_resource_publishListV2"
        @changeSearch="changeSearch"
        @submitSearch="submitSearch"
      />
    </div>
    <basics-action :actions="act">
      <template slot="radio">
        <el-radio-group v-model="currTab.clientType" @change="clientTypeChange">
          <el-radio-button v-for="radio in radioOptions" :key="radio" :label="radio">{{ radio }}</el-radio-button>
        </el-radio-group>
      </template>
    </basics-action>
    <!-- <el-radio-group v-model="publishStatus" style="margin-bottom: 20px" @change="changePub">
      <el-radio-button label="1">未开始</el-radio-button>
      <el-radio-button label="0">投放中</el-radio-button>
      <el-radio-button label="2">已结束</el-radio-button>
      <el-radio-button label="3">已关闭</el-radio-button>
    </el-radio-group> -->
    <basics-table
      ref="table"
      :table="table"
      :loading="loadings._ums_meixiu_api_a_ad_resource_publishListV2"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :action-function="actionFunction"
      :list-query="listQuery"
      @selection-change="handleSelectionChange"
    >
      <template slot="click" slot-scope="scope">
        <div>PV: {{ scope.row.clickCount || '0' }}</div>
        <div>UV: {{ scope.row.uvCount || '0' }}</div>
      </template>
      <template slot="exposure" slot-scope="scope">
        <div>PV: {{ scope.row.exposureCount || '0' }}</div>
        <div>UV: {{ scope.row.uvExposureCount || '0' }}</div>
      </template>
    </basics-table>
    <!-- 素材预览 -->
    <el-dialog
      title="素材预览"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="closeDl"
    >
      <el-image :src="url" :preview-src-list="srcList" />
    </el-dialog>
    <!-- 素材 -->
    <el-dialog
      title="查看"
      :visible.sync="showDetailState"
      width="80%"
      :before-close="closeDS"
    >
      <el-form ref="form" :model="StatusDetail" label-width="100px">
        <div class="app-container">
          <el-form-item label="投放主题" prop="publishName">
            <el-col :span="8">
              <el-input v-model="StatusDetail.publishName" style="width: 220px" disabled placeholder="请输入" />
            </el-col>
          </el-form-item>
          <el-form-item label="跳转类型" prop="otherType">
            <el-select v-model="StatusDetail.otherType" disabled>
              <el-option
                v-for="item in otherTypeLabels"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <div style="padding: 20px 0">
            <el-table
              ref="multipleTable"
              :data="StatusDetail.details || []"
              stripe
              tooltip-effect="dark"
              style="width: 70%; min-width: 800px"
              max-height="400"
            >
              <el-table-column
                prop="advertName"
                label="广告位名称"
                align="center"
              />
              <el-table-column
                prop="advertType"
                label="广告类型"
                align="center"
              />
              <el-table-column
                label="预览"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <img v-if="scope.row.resourceUrl" style="width: 20px;height: 20px;" :src="scope.row.resourceUrl" alt="">
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="totalCount"
                label="广告数量"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="ad-num">{{ scope.row.useredCount }}/{{ scope.row.totalCount }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-form-item label="跳转页面" prop="otherUrl">
            <el-input v-model="StatusDetail.otherUrl" style="width: 220px" placeholder="请输入" disabled />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="StatusDetail.startTime"
              disabled
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="StatusDetail.endTime"
              disabled
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item v-if="selectType == 1" label="语言版本" prop="languageVersion">
            <div>
              <el-radio-group v-model="StatusDetail.languageVersion" size="small" style="pointer-events: none">
                <el-radio-button label="0">中文版</el-radio-button>
                <el-radio-button label="1">英文版</el-radio-button>
                <el-radio-button label="2">其他</el-radio-button>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item v-if="selectType == 1 || selectType == 2 || selectType == 3 || selectType == 4" label="付费类型" prop="userType" style="pointer-events: none">
            <div>
              <el-checkbox-group v-model="StatusDetail.userType" size="small">
                <el-checkbox-button label="1">付费</el-checkbox-button>
                <el-checkbox-button label="2">未付费</el-checkbox-button>
                <el-checkbox-button label="3">已退费</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item v-if="selectType == 1" label="级别" prop="userLevel" style="pointer-events: none">
            <div>
              <el-checkbox-group v-model="StatusDetail.userLevel" size="small">
                <el-checkbox-button label="1">S1</el-checkbox-button>
                <el-checkbox-button label="2">S2</el-checkbox-button>
                <el-checkbox-button label="3">S3</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item v-if="selectType == 1 " label="上课状态" prop="classStatus" style="pointer-events: none">
            <div>
              <el-checkbox-group v-model="StatusDetail.classStatus" size="small">
                <el-checkbox-button label="1">待上课</el-checkbox-button>
                <el-checkbox-button label="2">上课中</el-checkbox-button>
                <el-checkbox-button label="3">已结课</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item v-if="selectType == 3 || selectType == 4 " label="区域" prop="sideType" style="pointer-events: none">
            <div>
              <el-checkbox-group v-model="StatusDetail.sideType" size="small">
                <el-checkbox-button label="1">国内</el-checkbox-button>
                <el-checkbox-button label="2">海外</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item v-if="selectType == 4 " label="区域" prop="givenType" style="pointer-events: none">
            <div>
              <el-checkbox-group v-model="StatusDetail.givenType" size="small">
                <el-checkbox-button label="1">新生半月</el-checkbox-button>
                <el-checkbox-button label="2">老生半月</el-checkbox-button>
                <el-checkbox-button label="3">老生月月</el-checkbox-button>
                <el-checkbox-button label="4">无赠课</el-checkbox-button>
                <el-checkbox-button label="5">9月特享</el-checkbox-button>
                <el-checkbox-button label="6">班课老生月月</el-checkbox-button>
                <el-checkbox-button label="7">班课新生半月</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="用户区域 (点击展开)" name="1">
              {{ StatusDetail.sideTypeName }}
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      title="查看素材"
      :visible.sync="showAdvertisingState"
      width="60%"
      :before-close="closeDS"
    >
      <el-form ref="form" :model="AdvertisingDetai" label-width="100px">
        <div class="app-container">
          <div style="width: 100px;height: 100px;margin: 20px auto;">
            <img style="width: 100%;height: 100%" :src="AdvertisingDetai.resourceUrl" alt="">
          </div>
          <el-form-item label="跳转类型" prop="otherType">
            <el-select v-model="AdvertisingDetai.otherType" disabled>
              <el-option
                v-for="item in otherTypeLabels"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="跳转页面" prop="otherUrl">
            <el-input v-model="AdvertisingDetai.otherUrl" placeholder="请输入" disabled />
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import searchs from './searchs/searchs'
import act from './actions/list'
import { getAdvertType, listAdversTopicPublish, queryResource1 } from '@/api/ad-center/ad-position'
import { publishListV2, stopPublishV2, exportClickReportV2New } from '@/api/ad-center/ad-input'
import BasicsTable from '@/components/BasicsTable'
import BasicsAction from '@/components/BasicsAction'
import columns, { actionsList } from './columns'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { otherTypeLabels } from './enum'
import { createBlob } from '@/utils'
// import a from 'file-saver'

const defaultListQuery = {
  page: 1,
  limit: 20
}

export default {
  name: 'AdPut',
  components: { BasicsAction, BasicsTable },
  data() {
    return {
      radioValue: '学生端',
      otherTypeLabels,
      dialogVisible: false,
      url: '',
      clientType: null,
      srcList: [],
      act: act({ download: this.download, toAddAd: this.toAddAd }),
      total: 0,
      publishStatus: null,
      listQuery: {
        page: 1,
        limit: 20
      },
      query: {
        id: '', publishName: '', userType: '', status: '', publishStatus: '0', time: [`${moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`]
      },
      // actionFunction: actions({ viewImg: this.viewImg }),
      actionFunction: actionsList({
        tableAction: this.tableAction
      }),
      table: { stripe: true },
      searchs: searchs(1),
      list: [],
      columns: columns(),
      // 列表查看
      showDetailState: false,
      StatusDetail: {
        userLevel: [],
        userType: [],
        classStatus: [],
        sideType: [],
        givenType: [],
        languageVersion: [] // 语言版本
      },
      AdvertisingDetai: {},
      showAdvertisingState: false,
      selectType: 0, // 选择类型
      activeName: '0',
      currTab: {
        businessType: '',
        clientType: ''
      },
      multipleSelectionIds: []
    }
  },
  computed: {
    ...mapGetters(['loadings', 'adConfig']),
    // 根据业务线返回客户端
    radioOptions() {
      const arr = this.adConfig.clientType[this.currTab.businessType]
      return arr
    }
  },
  // watch: {
  //   publishStatus() {
  //     this.getList()
  //   }
  // },
  created() {
    // 初始化查询条件
    this.initData()
    this.$bus.$on('changeStatus', (row, flag) => {
      if (flag === 'detail') {
        queryResource1({ resourceId: row.resourceId }).then(res => {
          this.showAdvertisingState = true
          this.AdvertisingDetai = res.data
        })
      } else {
        this.stopPublishV2(row, flag, true)
      }
    })
    if (this.clientType) {
      this.handleTabClick(this.clientType)
    }
  },

  methods: {
    // 改变客户端
    clientTypeChange() {
      this.clientType = { ...this.currTab }
      this.listQuery = { ...defaultListQuery }
      this.getList()
      if (this.clientType.businessType === '美术宝1对1') {
        this.searchs = null
        if (this.clientType.clientType === '教师端App') {
          this.$nextTick(() => {
            this.$set(this, 'searchs', searchs(6))
            this.selectType = 6
          })
        } else if (['学生端App', '小程序', 'PC端', '微信公众号'].includes(this.clientType.clientType)) {
          this.$nextTick(() => {
            this.$set(this, 'searchs', searchs(4))
            this.selectType = 4
          })
        }
      }
    },
    // 赋默认值
    initData() {
      const { businessType } = this.adConfig
      this.currTab.businessType = businessType[0].value
      // this.currTab.clientType = clientType[this.currTab.businessType][0]
      this.currTab.clientType = '学生端App'
      this.clientType = { ...this.currTab }
      // this.getList()
    },
    // 预览 - 关闭
    closeDl() {
      this.dialogVisible = false
    },
    // 表格操作
    tableAction(dat, row, index, type) {
      this.$nextTick(() => {
        if (type === 'edit') {
          this.$router.push({ name: 'AddPut', query: { ...this.clientType, parentId: row.id, editType: 'edit' }})
        } else if (type === 'copy') {
          this.$router.push({ name: 'AddPut', query: { ...this.clientType, parentId: row.id, editType: 'copy' }})
        } else if (type === 'close') {
          const ableList = [3, 2]
          if (ableList.includes(row.publishStatus)) {
            this.stopPublishV2(row, true)
          } else {
            this.stopPublishV2(row, false)
          }
        }
      })
    },
    // 查看
    showDetail(row) {
      console.log(row)
      listAdversTopicPublish({ parentId: row.id }).then(res => {
        const StatusDetail = res.data
        //  用户定向
        if (StatusDetail.userLevel) {
          try {
            StatusDetail.userLevel = JSON.parse(`[${StatusDetail.userLevel}]`)
            StatusDetail.userLevel = StatusDetail.userLevel.map(i => i.toString())
          } catch (e) {
            console.warn(e)
          }
        } else {
          StatusDetail.userLevel = []
        }
        //  用户定向
        if (StatusDetail.userType) {
          try {
            StatusDetail.userType = JSON.parse(`[${StatusDetail.userType}]`)
            StatusDetail.userType = StatusDetail.userType.map(i => i.toString())
          } catch (e) {
            console.warn(e)
          }
        } else {
          StatusDetail.userType = []
        }
        //  用户定向
        if (StatusDetail.classStatus) {
          try {
            StatusDetail.classStatus = JSON.parse(`[${StatusDetail.classStatus}]`)
            StatusDetail.classStatus = StatusDetail.classStatus.map(i => i.toString())
          } catch (e) {
            console.warn(e)
          }
        } else {
          StatusDetail.classStatus = []
        }
        //  用户定向
        if (StatusDetail.sideType) {
          try {
            StatusDetail.sideType = JSON.parse(`[${StatusDetail.sideType}]`)
            StatusDetail.sideType = StatusDetail.sideType.map(i => i.toString())
          } catch (e) {
            console.warn(e)
          }
        } else {
          StatusDetail.sideType = []
        }
        //  用户定向
        if (StatusDetail.givenType) {
          try {
            StatusDetail.givenType = JSON.parse(`[${StatusDetail.givenType}]`)
            StatusDetail.givenType = StatusDetail.givenType.map(i => i.toString())
          } catch (e) {
            console.warn(e)
          }
        } else {
          StatusDetail.givenType = []
        }
        // this.StatusDetail = StatusDetail
        this.$set(this, 'StatusDetail', StatusDetail)
      })

      this.showDetailState = true
    },
    closeDS() {
      this.showAdvertisingState = false
      this.showDetailState = false
    },
    changePub() {
      this.listQuery = {
        page: 1,
        limit: 20
      }
      this.getList()
    },
    // handleClick
    handleTabClick() {
      // this.currTab.clientType = this.adConfig.clientType[this.currTab.businessType][0]
      const { businessType } = this.currTab
      if (businessType === 'Artworld') {
        this.currTab.clientType = '用户端App'
      } else {
        this.currTab.clientType = '学生端App'
      }
      const item = { ...this.currTab }
      this.searchs = null
      this.$nextTick(() => {
        if (item.businessType === '小熊美术' && item.clientType === '学生端App') {
          this.$set(this, 'searchs', searchs(1))
          this.selectType = 1
        } else if (item.businessType === '美术宝书法' && item.clientType === '学生端App') {
          this.$set(this, 'searchs', searchs(2))
          this.selectType = 2
        } else if (item.businessType === '小熊音乐' && item.clientType === '学生端App') {
          this.$set(this, 'searchs', searchs(3))
          this.selectType = 3
        } else if (['学生端App', '微信公众号'].includes(item.clientType) && item.businessType === '美术宝1对1') {
          this.$set(this, 'searchs', searchs(4))
          this.selectType = 4
        } else if (['学生端App', '微信公众号'].includes(item.clientType) && item.businessType === '小熊艺术') {
          this.$set(this, 'searchs', searchs(5))
          this.selectType = 5
        } else if (item.clientType === '教师端App' && item.businessType === '美术宝1对1') {
          this.$set(this, 'searchs', searchs(6))
          this.selectType = 6
        } else if (item.clientType === '用户端App' && item.businessType === 'Artworld') {
          this.$set(this, 'searchs', searchs(7))
          this.selectType = 7
        } else {
          this.$set(this, 'searchs', searchs())
        }
        getAdvertType({ ...item })
          .then(res => {
            this.$nextTick(() => {
              if (res.data) {
                const list = res.data.map(item => {
                  return {
                    value: item.name,
                    label: item.name
                  }
                })
                this.$refs.searchs && this.$refs.searchs.set({
                  type: 'options',
                  data: {
                    advertType: list || []
                  }
                })
              }
            })
          })
      })
      this.clientType = item
      this.listQuery = {
        page: 1,
        limit: 20
      }
      // this.$set('listQuery', 'page', 1)
      // this.$set('listQuery', 'limit', 20)
      this.getList()
    },
    // changeSearch
    changeSearch(val) {
      console.log('changeSearch', val)
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
      this.$router.push({ name: 'AddPut', query: { ...this.clientType }})
    },
    async stopPublishV2(row, flag, childFlag) {
      const enabled = flag ? 1 : 0
      await stopPublishV2({ publishId: row.id, enabled: enabled, flag: !childFlag ? row.parentFlag : 0 })
      this.listQuery = {
        page: 1,
        limit: 20
      }
      this.getList()
    },
    viewImg(dat, row) {
      this.dialogVisible = true
      this.url = row.resourceUrl
      this.srcList = []
      this.srcList.push(this.url)
    },
    // 获取广告位列表
    getList(flag) {
      const { listQuery } = this
      const time = this.query.time || []
      // // debugger
      const data = {
        pageNum: listQuery.page,
        pageSize: listQuery.limit,
        startTime: time[0],
        endTime: time[1],
        publishStatus: this.publishStatus,
        ...this.clientType,
        ...this.query,
        ...this.currTab
      }
      delete data.time
      publishListV2(data).then((res) => {
        this.list = res.data.list
        this.total = ~~res.data.total || 0
        this.columns = null
        this.$nextTick(() => {
          this.columns = columns()
          this.columns = columns(this.selectType)
        })
      })
    },
    async download() {
      const time = this.query.time || []
      const ids = this.multipleSelectionIds
      const data = {
        startTime: time[0],
        endTime: time[1],
        publishStatus: this.publishStatus,
        ...this.clientType,
        ...this.query,
        ...this.currTab
      }
      if (ids?.length) {
        data.ids = ids
      }
      delete data.time
      exportClickReportV2New(data).then(res => {
        createBlob(`广告投放数据${time[0]}-${time[1]}.xls`, res)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelectionIds = val.length ? val.map(v => v.id) : []
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
  .showDetail{
    margin-top: 10px;
    cursor: pointer;
    &:hover{
      color: #1790ff;
    }
  }
</style>
