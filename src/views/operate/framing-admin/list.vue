<template>
  <div>
    <div class="title-container">
      <basics-title title="裱框管理" line />
    </div>
    <div v-loading="loadings._ums_meixiu_api_works_f_v1_frame_getFrameList || loadings._operation_frame_listFrame || loadings._ums_meixiu_api_works_f_v1_frame_category_frameCategoryList" class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="i in tabConfig" :key="i.key" :label="i.label" :name="i.key" :disabled="i.disabled" />
      </el-tabs>
      <basics-search ref="searchRef" :searchs="searchs" @submitSearch="submitSearch" />
      <div class="app-title">
        <basics-action
          ref="actions"
          :actions="act"
        />
      </div>
      <el-row :gutter="24">
        <el-col v-for="(item,index) in list" :key="index" :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
          <el-card class="grid-content" body-style="padding: 10px 5px" shadow="hover">
            <div slot="header">
              <span>装裱使用数：{{ item.num }}</span>
              <span>排序：{{ item.sort }}</span>
            </div>
            <div class="grid-img">
              <el-image
                style="height: 400px"
                :src="item.backgroundUrl || item.thumbnail"
                :preview-src-list="[item.backgroundUrl || item.thumbnail]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </div>
            <div class="grid-bottom">
              <div>
                <el-button type="primary" size="small" plain :disabled="!!item.status" @click="openFrame(item.id)">上架</el-button>
              </div>
              <div>
                <el-button type="danger" size="small" plain :disabled="!item.status" @click="forbiddenFrame(item.id)">下架</el-button>
              </div>
              <div>
                <el-button type="success" size="small" plain :disabled="!!item.status" @click="modify(item)">编辑</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-empty v-if="!list.length" description="暂无数据" />
      <pagination v-show="total>0" :total="total" :page-sizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <el-dialog
      :title="addORdify?'创建':'修改'+'裱框'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="800px"
    >
      <div v-if="dialogVisible && !loadings._operation_frame_listFrameTypeAll" class="dialog-style">
        <div class="basics-form-box">
          <basics-form key="0" ref="forms" :loading="loadings._operation_resource_publish" :forms="forms" :actions="actions" @changeForm="changeForm" @submitForm="submitForm">
            <template slot="coordinate" slot-scope="scope">
              <el-form-item v-bind="scope.item" :label="scope.item.label">
                <div class="coordinate-style">
                  <div>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-input v-model="coordinateData.lux" placeholder="左上X" /></el-col>
                      <el-col :span="6"><el-input v-model="coordinateData.luy" placeholder="左上Y" /></el-col>
                      <el-col :span="6"><el-input v-model="coordinateData.rux" placeholder="右上X" /></el-col>
                      <el-col :span="6"><el-input v-model="coordinateData.ruy" placeholder="右上Y" /></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-input v-model="coordinateData.ldx" placeholder="左下X" /></el-col>
                      <el-col :span="6"><el-input v-model="coordinateData.ldy" placeholder="左下Y" /></el-col>
                      <el-col :span="6"><el-input v-model="coordinateData.rdx" placeholder="右下X" /></el-col>
                      <el-col :span="6"><el-input v-model="coordinateData.rdy" placeholder="右下Y" /></el-col>
                    </el-row>
                  </div>
                </div>
              </el-form-item>
            </template>
          </basics-form>
        </div>
        <div class="dialog-right">
          <div>
            <span>图示</span>
          </div>
          <div class="image">
            <el-image
              :src="imageUrl"
              :preview-src-list="[`${previewImg}`]"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { cloneDeep } from 'lodash'
import moment from 'moment'
import {
  listFrame,
  addFrame,
  updateFrame,
  openFrame,
  forbiddenFrame,
  listFrameTypeAll
} from '@/api/operate/framing-admin'
import {
  frameTab
} from '@/api/operate/framing-class'
import defaultBgImgTiny from '@/assets/images/defaultBgImgTiny.jpg'
import previewImg from '@/assets/images/previewImg.jpg'
import { default as act } from './actions/list'
import searchs, { defaultSearchVal } from './searchs'
import forms, { actions as back } from './forms/list'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

let options = []
const coorData = {
  lux: '',
  luy: '',
  rux: '',
  ruy: '',
  ldx: '',
  ldy: '',
  rdx: '',
  rdy: ''
}

const initPagination = { page: 1, limit: 12, pageSizes: [12, 24, 48] }

export default {
  name: 'Article',
  data() {
    return {
      table: { stripe: true },
      list: [],
      searchs,
      act: act({ add: this.create, sort: this.sortBut }),
      total: 0,
      listQuery: { ...initPagination },
      drawer: false,
      sequence: {},
      dialogVisible: false,
      forms: forms('101', []),
      actions: back({ back: this.closeDr }),
      coordinateData: {},
      imageUrl: defaultBgImgTiny,
      previewImg: previewImg,
      addORdify: true,
      id: '',
      activeName: '101',
      tabConfig: [],
      queryOrder: 2,
      searchQuery: {
        type: defaultSearchVal.type,
        status: defaultSearchVal.status
      }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    activeName: {
      handler: async function (newValue, oldValue) {
        this.$nextTick(() => {
          this.$refs.actions.set({
            type: 'attr',
            data: { create: {
              loading: true
            }}
          })
        })
        const listOption = await this.frameTy()
        this.$refs.searchRef.set({
          type: 'options',
          data: {
            type: [{ label: '全部', value: 0 }, ...listOption]
          }
        })
        this.$refs.searchRef.set({
          type: 'defaultVal',
          data: {
            type: 0
          }
        })
        this.$refs.searchRef.set({
          type: 'visible',
          data: {
            selectTime: !!['103', '104'].includes(newValue + '')
          }
        })
        this.searchQuery = {
          ...this.searchQuery,
          type: 0
        }
        this.initGetList()
        this.forms = forms(newValue, listOption)
        this.$refs.actions.set({
          type: 'attr',
          data: { create: {
            loading: false
          }}
        })
      },
      immediate: true
    }
  },
  created() {
    frameTab().then(res => {
      if (res?.code === 0) {
        this.tabConfig = res?.payload?.businessDto.map(v => {
          if (v.name === '美术宝1V1') this.activeName = String(v.code)
          return {
            label: v.name,
            key: String(v.code)
          }
        })
      }
    })
  },
  methods: {
    initGetList() {
      this.listQuery = { ...initPagination }
      this.getList()
    },
    submitSearch(vals) {
      const newVals = cloneDeep(vals)
      if (newVals.selectTime) {
        newVals.startTime = moment(newVals.selectTime[0]).startOf('day').valueOf()
        newVals.endTime = moment(newVals.selectTime[1]).endOf('day').valueOf()
      }
      delete newVals.selectTime
      this.searchQuery = { ...newVals }
      this.initGetList()
    },
    async frameTy() {
      const params = { uid: getToken('userId'), businessType: this.activeName }
      const res = await listFrameTypeAll(params)
      if (res?.status === 0 || res?.code === 0) {
        options = (res?.data || res?.payload?.data || [])?.map(item => ({
          ...item,
          value: item.id || '',
          label: item.name
        }))
      }
      return options
    },
    sortBut() {
      this.queryOrder = this.queryOrder === 1 ? 2 : 1
      this.getList()
      this.$message.success(this.queryOrder === 2 ? '当前为正序' : '当前为倒序')
    },
    openFrame(id) {
      const uid = getToken('userId')
      openFrame({ id, uid, businessType: this.activeName }).then(res => {
        this.$message.success(res.data || '上架成功')
        this.getList()
      })
    },
    forbiddenFrame(id) {
      const uid = getToken('userId')
      forbiddenFrame({ id, uid, businessType: this.activeName }).then(res => {
        this.$message.success(res.data || '下架成功')
        this.getList()
      })
    },
    submitForm(val) {
      const { id, addORdify, coordinateData } = this
      const rules = Object.keys(coordinateData).some(item => coordinateData[item] === '')
      if (rules) return this.$message.error('坐标值不能为空')
      const data = Object.assign(val, this.coordinateData)
      const params = { uid: getToken('userId'), businessType: this.activeName }
      data.id = addORdify ? null : id
      data['paperJamUrl'] = val?.paperJamUrl || ''
      data['paperJamMargin'] = val?.paperJamUrl || 0
      new Promise((resolve, reject) => {
        const handleFunc = addORdify ? addFrame : updateFrame
        handleFunc(data, params).then(res => {
          if (res?.code === 0 || res?.status === 0) {
            this.$message.success(res.data || '操作成功')
            this.dialogVisible = false
            this.$refs.forms.resetFields()
            this.coordinateData = {}
            this.getList()
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 关闭弹窗
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$refs.forms.resetFields()
          this.coordinateData = {}
        })
        .catch(_ => {})
    },
    create() {
      this.addORdify = true
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.forms.set({
          type: 'defaultVal',
          data: { coordinate: 0 }
        })
      })
      this.coordinateData = { ...coorData }
    },
    modify(val) {
      this.id = val.id
      this.addORdify = false
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.forms.set({
          type: 'defaultVal',
          data: { coordinate: 0 }
        })
        const { pictureBox, compressPicUrl, ...value } = val
        this.$refs.forms && this.$refs.forms.recoveryForm(this.activeName === '101' ? {
          ...val
        } : this.activeName === '105' ? {
          ...val
        } : {
          ...value,
          newPictureBox: String(pictureBox),
          compressPicUrl: compressPicUrl ? [{
            url: compressPicUrl,
            name: '相框压缩包.zip'
          }] : undefined,
          paper: value?.paperJamUrl ? '1' : '0',
          needPicture: compressPicUrl ? '0' : '1'
        })
      })
      this.coordinateData = { ...coorData }
      Object.keys(this.coordinateData).forEach(item => {
        this.coordinateData[item] = val[item]
      })
    },
    // 获取列表
    getList() {
      const { listQuery, searchQuery, queryOrder, activeName } = this
      const payload = {
        ...searchQuery,
        order: queryOrder,
        pageNum: listQuery.page,
        pageSize: listQuery.limit,
        uid: getToken('userId'),
        businessType: activeName
      }
      if (!['103', '104'].includes(activeName + '')) {
        delete payload.startTime
        delete payload.endTime
      }
      listFrame(payload).then(res => {
        const total = activeName === '101' ? res.data.total : ~~res.payload.total || 0
        this.list = activeName === '101' ? [...res.data.list] : [...res.payload.data]
        this.total = total
        this.$nextTick(() => {
          this.$refs.actions.set({
            type: 'label',
            data: { total: `共计: ${total} 条` }
          })
        })
      })
    },
    changeForm(val, oldVal) {
      switch (val.type) {
        case 4:
          this.$refs.forms.set({
            type: 'rules',
            data: {
              pictureBox: []
            }
          })
          this.$refs.forms.set({
            type: 'attr',
            data: {
              pictureBox: { disabled: true }
            }
          })
          break
        default:
          this.$refs.forms.set({
            type: 'rules',
            data: {
              pictureBox: [{ required: true, message: '裱框类型不能为空' }]
            }
          })
          this.$refs.forms.set({
            type: 'attr',
            data: {
              pictureBox: { disabled: false }
            }
          })
          break
      }
      switch (val.paper) {
        case '0':
          this.$refs.forms.set({
            type: 'visible',
            data: {
              'paperJamUrl': false,
              'paperJamMargin': false
            }
          })
          break
        case '1':
          this.$refs.forms.set({
            type: 'visible',
            data: {
              'paperJamUrl': undefined,
              'paperJamMargin': undefined
            }
          })
          break
      }
      switch (val.needPicture) {
        case '1':
          this.$refs.forms.set({
            type: 'visible',
            data: {
              'newPictureBox': false,
              'compressPicUrl': false
            }
          })
          break
        case '0':
          this.$refs.forms.set({
            type: 'visible',
            data: {
              'newPictureBox': undefined,
              'compressPicUrl': undefined
            }
          })
          break
      }
    },
    // 关闭
    closeDr() {
      this.dialogVisible = false
      this.$refs.forms.resetFields()
      this.coordinateData = {}
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    border: solid 1px rgb(216, 215, 215);
  }
  .grid-content {
    // min-height: 560px;
    margin: 10px 0;
    text-align: center;
      .grid-title{
        display: flex;
        height: 80px;
        line-height: 80px;
        border-bottom: solid 1px rgb(216, 215, 215);
        div{
          flex: 1;
          // margin: 0 0 0 60px;
        }
      }
      .grid-img{
        height: 400px;
        display: flex;
        justify-content: center;
      }
      .grid-bottom{
        display: flex;
        border-top: 1px solid #e6ebf5;
        padding: 0 5%;
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
        div{
          flex: 1;
        }
      }
  }
  .coordinate-style{
    min-width: 340px;
    margin: 0 0 2% 18%;
  }
  .size{
    margin-left: 6%;
    height: 16px;
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    box-sizing: border-box;
    line-height: 64px;
  }
  .dialog-style{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    .basics-form-box {
      width: 460px;
    }
    div{
      .image{
        width: 100%;
      }
    }
    .dialog-right{
      width: 300px;
      text-align: center;
    }
  }
  ::v-deep .el-form-item {
    .el-form-item__label{
      padding: 0;
    }
  }
</style>
