<template>
  <div v-loading="loading" class="app-container">
    <div class="operat-top">
      <span>运营位设置</span>
      <el-button
        class="top-btn"
        type="info"
        plain
        @click="manageType"
      >分类管理</el-button>
      <el-button
        class="top-btn"
        type="primary"
        @click="createAdType"
      >新建分组</el-button>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="item in businessData"
        :key="item.value"
        :label="item.label"
        :name="item.value"
      />
    </el-tabs>
    <basics-search
      ref="searchs"
      :searchs="searchs"
      @changeSearch="changeSearch"
      @submitSearch="submitSearch"
    />
    <el-radio-group
      v-if="activeName === '小熊美术'"
      v-model="languageVersion"
      style="margin-bottom: 20px"
      size="small"
      @change="changeRadio"
    >
      <el-radio-button label="0">中文版</el-radio-button>
      <el-radio-button label="1">英文版</el-radio-button>
      <el-radio-button label="2">其他</el-radio-button>
    </el-radio-group>
    <el-collapse
      v-if="clientList.length"
      v-model="activeNames"
      v-loading="loadings._ums_meixiu_api_a_ad_position_listPosition"
      accordion
      @change="handleChange"
    >
      <el-collapse-item
        v-for="(item, index) in clientList"
        :key="index"
        :name="index"
      >
        <template slot="title">
          <span>{{ item.classifyName }}</span>
          <span class="inline" />
          <span>{{ item.name }}</span>
          <el-button
            size="small"
            class="title-client"
            type="info"
            :disabled="true"
            plain
          >{{ item.clientType }}</el-button>
          <div class="pv">
            <div>
              手机端：CTR: {{ item.allErt }} 点击量: pv:{{ item.pvCount }} uv:{{
                item.uvCount
              }}
              浏览量: pv:{{ item.exposureCount }} uv:{{ item.uvExposureCount }}
            </div>
            <div>
              PAD端：CTR: {{ item.allErtPad }} 点击量: pv:{{
                item.pvPadCount
              }}
              uv:{{ item.uvPadCount }} 浏览量: pv:{{
                item.exposurePadCount
              }}
              uv:{{ item.uvExposurePadCount }}
            </div>
          </div>
          <p class="title-right">
            <span class="coll-handle">ID:{{ item.id }}</span>
            <el-popover
              class="coll-handle"
              placement="top-start"
              title="图片"
              width="200"
              trigger="hover"
            >
              <img class="coll-img" :src="item.picUrl" alt="">
              <el-button slot="reference" type="text">预览</el-button>
            </el-popover>
            <el-dropdown class="coll-handle">
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span
                    style="display: block"
                    @click="editClass(item)"
                  >编辑分组</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span
                    style="display: block"
                    @click="delClass(item)"
                  >删除分组</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span
                    style="display: block"
                    @click="downReport(item)"
                  >下载数据</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span
                    style="display: block"
                    @click="addOperat(item)"
                  >新增运营位</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </p>
        </template>
        <div>
          <basics-table
            ref="table"
            :table="table"
            :loading="loadings._ums_meixiu_api_a_ad_resource_listAdvertV2"
            :list="item.positionList || []"
            :columns="columns"
            :total="0"
            :action-function="tableActions"
            :default-sort="{ prop: 'seatSort' }"
          >
            <template slot="seatSort" slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.seatSort"
                  size="mini"
                  @change="changeSort(scope.row)"
                />
              </div>
            </template>
          </basics-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-empty v-else :image-size="200" />
    <pagination
      v-show="total > 0"
      :total="total"
      :page-sizes="listQuery.pageSizes"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getListPosition"
    />
    <el-dialog
      class="assign-dialog"
      title="分类管理"
      :visible.sync="dialogRoleVisible"
      width="960px"
      :before-close="closeModal"
    >
      <div>
        <div style="margin: 20px">
          <el-select v-model="businessValue" placeholder="请选择业务线">
            <el-option
              v-for="item in businessData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="clientValue" placeholder="请选择客户端">
            <el-option
              v-for="item in clientData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            v-show="clientValue"
            class="top-btn"
            type="primary"
            plain
            @click="handleTree('', 3)"
          >新增</el-button>
          <div>
            <p v-for="item in classData" :key="item.id">
              <span v-show="!item.enabled">
                <span class="tree-span"> {{ item.name }}</span>
                <el-button
                  class="top-btn"
                  type="primary"
                  circle
                  icon="el-icon-edit"
                  @click="handleTree(item, 1)"
                />
              </span>
            </p>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeModal">取 消</el-button>
          <el-button type="primary" @click="closeModal">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      width="500px"
      :title="groupTitle"
      :visible.sync="dialogFormVisible"
    >
      <!-- 组-->
      <basics-form
        :key="dialogFormVisible"
        ref="groupForm"
        :forms="formsG"
        :actions="adActions"
        @changeForm="changeGroupForm"
        @submitForm="submitAdGrounp"
      />
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdGrounp">{{
          btnName
        }}</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  listPosition,
  addGroup,
  addPosition,
  searchClassify,
  orderPosition,
  exportOperatReport,
  addClassify
} from '@/api/ad-center/operat'
import BasicsSearch from '@/components/BasicsSearch'
import moment from 'moment'
import Pagination from '@/components/Pagination'
// import draggable from 'vuedraggable'
import searchs from './searchs/searchs'
// import { mapGetters } from 'vuex'
import { createBlob } from '@/utils'
import formsG, { actions } from './forms/ad-grounp'
import store from '@/store'
import { mapGetters } from 'vuex'
import columns, { tableActions } from './columns'
import Sortable from 'sortablejs'
import allEnum from '@/utils/enum'

const { user_state, user_state_1v1 } = allEnum

export default {
  name: 'Operat',
  components: {
    BasicsSearch,
    Pagination
  },
  data() {
    return {
      table: { stripe: true },
      columns: columns(),
      list: [],
      tableActions: tableActions({
        editOpert: this.editOpert,
        goDeletCard: this.goDeletCard
      }),
      activeNames: null,
      formsG: formsG,
      adActions: actions({ quit: this.closeAgDl }),
      groupTitle: '新建分组',
      operaId: '',
      groupId: '',
      startTime: moment().subtract(1, 'months').format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      businessData: '',
      clientData: '',
      classData: '',
      businessValue: '',
      clientValue: '',
      clientList: [
        { label: '小熊美术', name: '小熊美术' },
        { label: '美术宝1对1', name: '美术宝1对1' },
        { label: '美术宝书法', name: '美术宝书法' }
      ],
      activeName: '小熊美术',
      searchs: searchs,
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 20,
      dialogRoleVisible: false,
      dialogFormVisible: false,
      btnName: '新增',
      languageVersion: '0',
      user_state,
      user_state_1v1
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    loading() {
      const { loadings } = this
      return (
        loadings._ums_meixiu_api_a_ad_position_listPosition ||
        loadings._ums_meixiu_api_a_ad_position_searchClassify ||
        loadings._ums_meixiu_api_a_ad_position_positionConfig
      )
    }
  },
  watch: {
    activeName(val) {
      this.getListPosition()
      this.getClassifyTree()
      this.changeSearch()

      this.$nextTick(() => {
        const columnsData = columns(val)
        if (this.activeName === 'Artworld') {
          this.columns = columnsData.filter((val) => val.prop !== 'userState')
          this.$refs.searchs.set({
            type: 'visible',
            data: { userState: false }
          })
        } else if (this.activeName !== '小熊艺术') {
          this.columns = columnsData.filter((val) => val.prop !== 'seatSort')
        } else {
          this.columns = columnsData
          this.$refs.searchs.set({
            type: 'visible',
            data: { userState: true }
          })
        }
      })
    },
    businessValue(val) {
      this.handleClientData(val)
      this.getClassData()
    },
    clientValue() {
      this.getClassData()
    }
  },
  created() {
    this.getListPosition()
    this.getClassifyTree()
  },
  mounted() {
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.rowDrop()
  },
  activated() {
    this.getListPosition()
  },
  methods: {
    handleChange(val) {
      this.rowDrop()
    },
    // 处理联动客户端
    handleClientData(bussinessName) {
      const { clientTypeData, clientType } = store.getters.operatConfig
      if (bussinessName === 'Artworld') {
        this.clientData = clientTypeData['Artworld']
        // 只有'美术宝1对1'、 '小熊艺术' 要额外支持 微信公众号
      } else if (bussinessName === '美术宝1对1') {
        this.clientData = [
          ...clientType,
          { label: '微信公众号', value: '微信公众号' }
        ]
      } else if (bussinessName === '小熊艺术') {
        this.clientData = clientTypeData['小熊艺术']
      } else {
        this.clientData = clientType
      }
    },
    rowDrop() {
      const tbody = document.querySelectorAll('.el-table__body-wrapper tbody')
      const _this = this
      tbody.forEach((item) => {
        Sortable.create(item, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.clientList[
              _this.activeNames
            ].positionList.splice(oldIndex, 1)[0]
            _this.clientList[_this.activeNames].positionList.splice(
              newIndex,
              0,
              currRow
            )
            _this.moveData(_this.clientList[_this.activeNames].positionList)
          }
        })
      })
    },
    // 获取树结构
    getClassifyTree() {
      const { businessType } = store.getters.operatConfig
      this.businessData = businessType
      this.handleClientData(this.activeName)
      this.$nextTick(() => {
        this.$refs.searchs.set({
          type: 'options',
          data: {
            clientType: [{ value: '', label: '全部' }, ...this.clientData],
            group: [{ value: '', label: '全部' }, ...this.clientData]
          }
        })
      })
    },
    // 客户端-类别 筛选项联动
    async changeSearch(val, oldVal) {
      this.startTime = (val?.time && val.time[0]) || ''
      this.endTime = (val?.time && val.time[1]) || ''
      const { activeName } = this
      this.$nextTick(() => {
        this.$refs.searchs.set({
          type: 'options',
          data: {
            userState: activeName === '美术宝1对1' ? user_state_1v1 : user_state
          }
        })
        this.$refs.searchs.set({
          type: 'visible',
          data: { userType: activeName === '美术宝1对1' }
        })
      })
      if (
        val &&
        ((val.clientType && this.activeName) ||
          (val.clientType && val.clientType !== oldVal.clientType))
      ) {
        const query = {
          businessName: this.activeName,
          clientType: val.clientType
        }
        await searchClassify(query).then((res) => {
          const selectData = res.data.filter((item) => {
            return +item.enabled === 0
          })
          if (selectData.length <= 0) {
            return
          }
          const classTypeOption = selectData.map((v) => {
            return {
              label: v.name,
              value: v.id
            }
          })
          this.$refs.searchs.set({
            type: 'options',
            data: {
              classifyId: classTypeOption
            }
          })
        })
      }
    },
    // 点击搜索
    submitSearch(val) {
      const query = val
      if (query.time) delete query.time
      if (!val.group && val.groupId) {
        delete query.groupId
      } else if (val.group && !isNaN(val.group)) {
        query.groupId = val.group
        delete query.group
      }
      if (!val.position && val.positionId) {
        delete query.positionId
      } else if (val.position && !isNaN(val.position)) {
        query.positionId = val.position
        delete query.position
      }
      // if (val.group && !isNaN(val.group)) {
      //   query.groupId = val.group;
      //   delete query.group;
      // }
      // if (val.position && !isNaN(val.position)) {
      //   query.positionId = val.position;
      //   delete query.position;
      // }
      query.startTime = this.startTime.substring(0, 10)
      query.endTime = this.endTime.substring(0, 10)
      // this.listQuery = {
      //   page: 1,
      //   limit: 20
      // };
      // this.query = val;
      this.getListPosition(query)
    },
    // 分类管理
    manageType() {
      this.dialogRoleVisible = true
    },
    // 打开分组
    createAdType() {
      this.groupId = ''
      this.btnName = '新增'
      this.groupTitle = '新建分组'
      this.dialogFormVisible = true
    },
    getClassData() {
      const query = {
        businessName: this.businessValue,
        clientType: this.clientValue
      }
      searchClassify(query).then((res) => {
        this.classData = res.data
      })
    },
    handleTree(item, key) {
      const query = {
        bussinessName: this.businessValue,
        clientType: this.clientValue,
        name: item.name
      }
      if (key === 1) {
        this.$prompt('请输入新名字', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          query.id = item.id
          this.addClass(query, value)
        })
      } else if (key === 2) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          query.enabled = 1
          query.id = item.id
          this.addClass(query)
        })
      } else {
        this.$prompt('请输入新名字', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.addClass(query, value)
        })
      }
    },
    addClass(query, val = '') {
      if (val) {
        query.name = val
      }
      addClassify(query).then((res) => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.getClassData()
      })
    },
    // 修改分类
    changeClass() {},
    // 关闭分类管理
    closeModal() {
      this.dialogRoleVisible = false
      this.businessValue = ''
      this.clientValue = ''
      this.classData = []
    },
    // 新增分组 - 关闭
    closeAgDl() {
      this.dialogFormVisible = false
    },
    // 新建分组
    addGrounp() {
      addGroup().then((res) => {})
    },
    submitAdGrounp() {
      const that = this
      const query = this.$refs.groupForm.form
      if (this.groupId) {
        query.id = this.groupId
      }
      addGroup(query).then((res) => {
        if (that.groupId) {
          this.$message.success('更新分组成功')
        } else {
          this.$message.success('新建分组成功')
        }
        this.dialogFormVisible = false
        this.getListPosition()
      })
    },
    // 删除运营位置
    goDeletCard(el) {
      this.$confirm('此操作将删除运营位, 是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const e = {
          enabled: 1,
          id: el.id,
          groupId: el.groupId
        }
        addPosition(e).then((res) => {
          this.$message.success('删除运营位成功')
          this.getListPosition()
        })
      })
    },
    // 编辑运营位
    editOpert(el) {
      const { activeName } = this
      this.$router.push({
        name: 'OperationPosition',
        query: { activeName, groupId: el.groupId, rowData: JSON.stringify(el) }
      })
    },
    // 工具函数 去掉无用key
    handleQuery(val) {
      const query = val
      Object.keys(query).map((item) => {
        if (!query[item]) {
          delete query[item]
        }
        return true
      })
      return query
    },
    // 获取运营位列表
    getListPosition(val) {
      this.positQuery = {
        pageNum: 1,
        pageSize: 20,
        languageVersion: this.languageVersion,
        businessName: this.activeName
      }
      let query = { ...this.positQuery, ...val }
      query = this.handleQuery(query)
      listPosition(query).then((res) => {
        this.clientList = res.data.list || []
        // this.myArray = data.list || [];
        this.total = ~~res.data.total || 0
        this.rowDrop()
      })
    },
    // 组 客户端 分类联动
    async changeGroupForm(val, oldVal) {
      this.businessValue = val.bussinessName
      this.clientValue = val.clientType
      // 新建分组业务线发生改变客服端数据联动变化 Artworld：用户端 其他：学生端app
      if (val.bussinessName !== oldVal.bussinessName && val.bussinessName) {
        this.handleClientData(val.bussinessName)
        this.$refs.groupForm.set({
          type: 'options',
          data: {
            clientType: this.clientData
          }
        })
      }
      if (
        val.bussinessName !== oldVal.bussinessName ||
        val.clientType !== oldVal.clientType
      ) {
        const query = {
          businessName: val.bussinessName,
          clientType: val.clientType
        }
        await searchClassify(query).then((res) => {
          const selectData = res.data.filter((item) => {
            return +item.enabled === 0
          })
          if (selectData.length <= 0) {
            return
          }
          const classTypeOption = selectData.map((v) => {
            return {
              label: v.name,
              value: v.id
            }
          })
          this.$refs.groupForm.set({
            type: 'options',
            data: {
              classifyId: classTypeOption
            }
          })
        })
        this.$nextTick(() => {
          this.$refs.groupForm.set({
            type: 'visible',
            data: {
              languageVersion: val.bussinessName === '小熊美术'
            }
          })
        })
      }
    },
    // 切换radio change
    changeRadio() {
      this.getListPosition()
    },
    // 拖动事件与后台的交互
    moveData(data) {
      // drag = false
      const query = []
      data.map((item, idx) => {
        const listItem = {}
        listItem.key = `${item.id}`
        listItem.value = `${idx}`
        query.push(listItem)
      })
      orderPosition(query).then((res) => {
        this.$message.success('排序自动保存')
      })
    },
    // 下载数据
    downReport(data) {
      const query = {
        groupId: data.id,
        startTime: this.startTime,
        endTime: this.endTime
      }
      exportOperatReport(query).then((res) => {
        createBlob(`运营位数据统计-${moment().format('YYYY-MM-DD')}.xls`, res)
      })
    },
    // 编辑分组
    editClass(e) {
      const that = this
      this.groupId = e.id
      this.groupTitle = '编辑分组'
      this.btnName = '编辑'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        that.$refs.groupForm.recoveryForm(e)
      })
    },
    // 删除分组
    delClass(e) {
      this.$confirm('此操作将删除运营组, 是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          enabled: 1,
          id: e.id
        }
        addGroup(query).then((res) => {
          this.$message.success('删除分组成功')
          //  this.dialogFormVisible = false;
          this.getListPosition()
        })
      })
    },
    // 新增运营位
    addOperat(e) {
      const { activeName } = this
      this.$router.push({
        name: 'OperationPosition',
        query: { activeName, groupId: e.id }
      })
    },
    changeSort(val) {
      if (!+val.seatSort) return this.$message.error('排序不规范!')
      const params = {
        id: val.id,
        seatSort: val.seatSort,
        groupId: val.groupId
      }
      addPosition(params).then((res) => {
        this.$message.success('排序成功~')
        this.getListPosition()
      })
      console.log(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.ad-container {
  padding: 20px;
}
.operat-top {
  height: 50px;
  border-bottom: 1px solid darkgrey;
  .top-btn {
    float: right;
    margin-right: 10px;
  }
}
.inline {
  width: 1px;
  background: #ada4a4;
  height: 20px;
  margin: 0 10px;
}
.pv {
  margin-left: 20px;
  font-size: 12px;
  color: #ada4a4;
  div {
    line-height: 18px;
  }
}
.card-con {
  display: flex;
  width: 150px;
  height: 150px;
  .card-r {
    width: 30%;
    img {
      margin-top: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .card-l {
    padding: 0 10px;
    display: block;
    font-size: 12px;
    white-space: nowrap;
    .l-name {
      font-size: 14px;
      font-weight: bold;
    }
    .l-label {
      font-size: 12px;
      font-weight: bold;
    }
    .l-pv {
      color: #ada4a4;
    }
  }
}
.tree-span {
  display: inline-block;
  width: 100px;
}
.title-client {
  margin: 0 10px;
}
.title-right {
  position: absolute;
  right: 80px;
}
.coll-handle {
  color: #ada4a4;
}
.coll-img {
  margin: 0 auto;
  width: 120px;
  height: auto;
}
.dialog-footer {
  text-align: right;
}
.create-ad-type {
  position: absolute;
  left: 425px;
  top: 232px;
}
::v-deep .el-popover,
::v-deep .el-popper {
  text-align: center !important;
}
::v-deep .el-row {
  margin-bottom: 20px;
}
::v-deep .el-card__body {
  padding: 10px !important;
}
</style>
