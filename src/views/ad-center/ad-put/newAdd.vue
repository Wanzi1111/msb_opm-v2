<template>
  <div v-loading="appLoading" class="put-wrap">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <!-- 投放主题 -->
      <div class="app-container">
        <el-form-item label="投放主题" prop="publishName">
          <el-col :span="8">
            <el-input v-model="form.publishName" placeholder="请输入" />
          </el-col>
        </el-form-item>
      </div>
      <!-- 选择位置 -->
      <div class="app-container">
        <div>
          <span class="put-label">选择位置</span>
          <span class="sub-label">{{ showClient }}</span>
        </div>
        <div class="put-item">
          <material-table ref="multipleTable" :ad-posi-list="adPosiList" @selectionChange="selectionChange" />
        </div>
      </div>
      <!-- 通用规则 -->
      <div class="app-container">
        <div>
          <span class="put-label">通用规则</span>
          <span class="sub-label">{{ showClient }}</span>
        </div>
        <div class="put-item">
          <el-form-item label="跳转类型" prop="otherType">
            <el-select v-model="form.otherType" clearable>
              <el-option
                v-for="item in otherTypeLabels"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
            <span class="put-item-tips">广告位无自定义配置时生效</span>
          </el-form-item>
          <el-form-item
            v-if="form.otherType !== '5'"
            prop="otherUrl"
            label="跳转页面"
            :rules="[{ required: true }]"
          >
            <upload-media
              v-if="form.otherType === '4'"
              v-model="form.otherUrl"
              :item="uploadItem"
              v-on="$listeners"
              @upload="uploadApi"
            />
            <div v-if="form.otherType === '4'" class="note">
              <template>
                <i class="el-icon-info" />
                <span>图片大小不支持超过300K，支持GIF、PNG、JPG和JPEG格式</span>
              </template>
            </div>
            <el-input v-else v-model="form.otherUrl" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
            <span class="put-item-tips">不选默认即时生效</span>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
            <span class="put-item-tips">不选默认长期有效</span>
          </el-form-item>
        </div>
      </div>
      <!-- 用户定向 -->
      <div v-if="showDirectedFormItem || showSelect" class="app-container">
        <div>
          <span class="put-label">用户定向</span>
          <!-- <span class="sub-label">{{ showClient }}</span> -->
          <el-radio-group v-model="form.directType" :disabled="!showUserGroup">
            <el-radio label="0">标签规则</el-radio>
            <el-radio label="1">分群规则</el-radio>
          </el-radio-group>
        </div>
        <div v-show="form.directType === '0'" class="put-item">
          <!-- 小熊美术-学生端App -->
          <div v-if="showSelect == 1">
            <el-form-item label="语言版本" prop="languageVersion">
              <div>
                <el-radio-group v-model="form.languageVersion" size="small">
                  <el-radio-button v-for="(item,key) in directionalEnum[1].languageVersion" :key="key" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="付费类型" prop="userType">
              <div>
                <el-checkbox-group v-model="form.userType" size="small">
                  <el-checkbox-button v-for="(item,key) in directionalEnum[1].userType" :key="key" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="级别" prop="userLevel">
              <div>
                <el-checkbox-group v-model="form.userLevel" size="small" :disabled="form.userType == 3">
                  <el-checkbox-button v-for="(item,key) in directionalEnum[1].userLevel" :key="key" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="上课状态" prop="classStatus">
              <div>
                <el-checkbox-group v-model="form.classStatus" size="small" :disabled="form.userType == 3">
                  <el-checkbox-button v-for="(item,key) in directionalEnum[1].classStatus" :key="key" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="用户区域" prop="userArea">
              <div>
                <el-checkbox-group v-model="form.userArea" size="small" @change="changeCheckbox">
                  <el-checkbox-button v-for="(item,key) in directionalEnum[1].userArea" :key="key" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item v-if="cityData.length > 0" prop="sideType">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;" />
              <el-checkbox-group v-model="form.sideType" class="checkbox-class" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cityData" :key="city.id" :label="city.code">{{ city.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <!-- 美术宝书画院-学生端App -->
          <div v-if="showSelect == 2">
            <el-form-item label="付费类型" prop="userType">
              <div>
                <el-checkbox-group v-model="form.userType" size="small">
                  <el-checkbox-button v-for="item in directionalEnum[2].userType" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </div>
          <!-- 小熊音乐-学生端App  小熊音乐-学生端小程序-->
          <div v-if="showSelect == 3">
            <!-- <el-form-item label="付费类型" prop="userType">
              <div>
                <el-checkbox-group v-model="form.userType" size="small">
                  <el-checkbox-button v-for="item in directionalEnum[3].userType" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="区域" prop="sideType">
              <div>
                <el-checkbox-group v-model="form.sideType" size="small">
                  <el-checkbox-button v-for="item in directionalEnum[3].sideType" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item> -->
            <el-form-item label="周周分享" prop="weekShare">
              <div>
                <el-checkbox-group v-model="form.weekShare" size="small" @change="handleCheck(form.weekShare,'weekShare')">
                  <el-checkbox-button v-for="item in directionalEnum[3].weekShare" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="注册渠道（排除）" prop="registerChannel">
              <div>
                <el-cascader
                  v-model="form.registerChannel"
                  :style="{width: '250px'}"
                  :options="setRegisterChannelList"
                  :props="{ multiple: true, emitPath: false }"
                  :show-all-levels="false"
                  collapse-tags
                  clearable
                />
              </div>
            </el-form-item>
            <el-form-item label="用户状态及购课状态" prop="subjectStatus">
              <div v-for="(item,key) in form.subjectStatus" :key="key" style="margin-bottom: 15px;">
                <el-cascader
                  v-model="form.subjectStatus[key]"
                  :style="{width: '250px'}"
                  :options="statusChannelList"
                  :props="{ multiple: true, emitPath: false }"
                  :show-all-levels="false"
                  collapse-tags
                  clearable
                />
                <el-button type="primary" icon="el-icon-plus" circle size="mini" style="margin-left:20px;font-size: 15px;" @click="addStatus(key)" />
                <el-button v-if="form.subjectStatus.length > 1" type="danger" icon="el-icon-delete" circle size="mini" style="font-size: 15px;" @click="deleteStatus(key)" />
              </div>
            </el-form-item>
          </div>
          <!-- 美术宝1对1-学生端App  美术宝1对1-PC端-->
          <div v-if="showSelect == 4 || showSelect == 8">
            <el-form-item label="付费类型" prop="userType">
              <div>
                <el-checkbox-group v-model="form.userType" size="small" @change="handleCheck(form.userType,'userType')">
                  <el-checkbox-button v-for="item in directionalEnum[4].userType" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="用户区域" prop="sideType">
              <div>
                <el-checkbox-group v-model="form.sideType" size="small" @change="handleCheck(form.sideType,'sideType')">
                  <el-checkbox-button v-for="(item,key) in directionalEnum[4].sideType" :key="key" size="small" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="赠课类型" prop="givenType">
              <div>
                <el-checkbox-group v-model="form.givenType" size="small" :disabled="form.userType == 2" @change="handleCheck(form.givenType,'givenType','oldGivenType')">
                  <el-checkbox-button v-for="(item,key) in directionalEnum[4].givenType" :key="key" size="small" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="周周分享" prop="weekShare">
              <div>
                <el-checkbox-group v-model="form.weekShare" size="small" @change="handleCheck(form.weekShare,'weekShare')">
                  <el-checkbox-button v-for="item in directionalEnum[4].weekShare" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="周周分享参加权限" prop="weekShareFlag">
              <div>
                <el-radio-group v-model="form.weekShareFlag" size="small">
                  <el-radio-button v-for="item in directionalEnum[4].weekShareFlag" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="赠课活动" prop="giveActivity">
              <div>
                <el-checkbox-group v-model="form.giveActivity" size="small" @change="handleCheck(form.giveActivity,'giveActivity')">
                  <el-checkbox-button v-for="item in directionalEnum[4].giveActivity" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="赠课活动参加权限" prop="giveActivityFlag">
              <div>
                <el-radio-group v-model="form.giveActivityFlag" size="small">
                  <el-radio-button v-for="item in directionalEnum[4].giveActivityFlag" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="瓜分金币参加权限" prop="goldShareFlag">
              <el-radio-group v-model="form.goldShareFlag" size="small">
                <el-radio-button v-for="item in directionalEnum[4].goldShareFlag" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- 小熊艺术-学生端App -->
          <div v-if="showSelect == 5">
            <el-form-item label="语言版本" prop="languageVersion">
              <div>
                <el-radio-group v-model="form.languageVersion" size="small">
                  <el-radio-button v-for="item in directionalEnum[5].languageVersion" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="周周分享" prop="weekShare">
              <div>
                <el-checkbox-group v-model="form.weekShare" size="small" @change="handleCheck(form.weekShare,'weekShare')">
                  <el-checkbox-button v-for="item in directionalEnum[5].weekShare" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <!-- <el-form-item label="用户区域" prop="userArea">
              <div>
                <el-checkbox-group v-model="form.userArea" size="small" @change="changeCheckbox">
                  <el-checkbox-button label="0">不限</el-checkbox-button>
                  <el-checkbox-button label="1">国内</el-checkbox-button>
                  <el-checkbox-button label="3">港澳台</el-checkbox-button>
                  <el-checkbox-button label="2">海外</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item> -->
            <el-form-item label="用户区域" prop="sideType">
              <!-- <el-select v-model="form.sideType" multiple collapse-tags @change="handleCheck(form.sideType,'sideType')">
                <el-option v-for="city in artData" :key="city.id" :label="city.name" :value="city.code" />
              </el-select> -->
              <div>
                <el-cascader
                  v-model="form.sideType"
                  :style="{width: '250px'}"
                  :options="artData"
                  :props="{ multiple: true, emitPath: false }"
                  :show-all-levels="false"
                  collapse-tags
                  clearable
                  @change="handleCheck(form.sideType,'sideType')"
                />
              </div>
            </el-form-item>
            <el-form-item label="注册渠道（排除）" prop="registerChannel">
              <div>
                <el-cascader
                  v-model="form.registerChannel"
                  :style="{width: '250px'}"
                  :options="setRegisterChannelList"
                  :props="{ multiple: true, emitPath: false }"
                  :show-all-levels="false"
                  collapse-tags
                  clearable
                />
              </div>
            </el-form-item>
            <el-form-item label="用户状态及购课状态" prop="subjectStatus">
              <div v-for="(item,key) in form.subjectStatus" :key="key" style="margin-bottom: 15px;">
                <el-cascader
                  v-model="form.subjectStatus[key]"
                  :style="{width: '250px'}"
                  :options="statusChannelList"
                  :props="{ multiple: true, emitPath: false }"
                  :show-all-levels="false"
                  collapse-tags
                  clearable
                />
                <el-button type="primary" icon="el-icon-plus" circle size="mini" style="margin-left:20px;font-size: 15px;" @click="addStatus(key)" />
                <el-button v-if="form.subjectStatus.length > 1" type="danger" icon="el-icon-delete" circle size="mini" style="font-size: 15px;" @click="deleteStatus(key)" />
              </div>
            </el-form-item>
            <el-form-item label="周周分享参加权限" prop="weekShareFlag">
              <div>
                <el-radio-group v-model="form.weekShareFlag" size="small">
                  <el-radio-button v-for="item in directionalEnum[4].weekShareFlag" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
          </div>
          <!-- 美术宝1对1-教师端App -->
          <div v-if="showSelect == 6">
            <el-form-item label="授课类型" prop="awardedType">
              <div>
                <el-checkbox-group v-model="form.awardedType" size="small">
                  <el-checkbox-button v-for="item in directionalEnum[6].awardedType" :key="item.label" :label="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </div>
        </div>
        <div v-show="showUserGroup && form.directType === '1'" class="app-container">
          <user-group-com ref="userGroupCom" :root-id="rootId" :user-group-selected="userGroupSelected" />
        </div>
      </div>

      <div class="app-container submit-bar">
        <el-form-item class="put-submit">
          <el-button type="primary" @click="onSubmit">{{ parentId && editType === 'edit' ? '立即修改':'立即创建' }}</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { listAdvertV2New } from '@/api/ad-center/ad-position'
import { updatePut, getPublishById, getListRegions, queryChannelTreeList, advertDin } from '@/api/ad-center/ad-input'
import MaterialTable from './component/materialTable.vue'
import { directionalEnum, otherTypeLabels, typeList, rules } from './enum'
import UploadMedia from '@/components/BasicsForm/components/UploadMedia/index.vue'
import { upload } from '@/api/common'
import UserGroupCom from './component/userGroup'

const whiteList = ['美术宝1对1-学生端App']
let cityList = []

const userGroupLineMap = {
  '美术宝1对1': '1',
  '小熊艺术': '2',
  'Artworld': '3'
}

export default {
  name: 'AddPut',
  components: { MaterialTable, UploadMedia, UserGroupCom },
  data() {
    return {
      directionalEnum,
      typeList,
      currClientType: {
        businessType: this.$route.query.businessType || '小熊美术',
        clientType: this.$route.query.clientType || '学生端App'
      },
      rootId: userGroupLineMap[this.$route.query.businessType],
      statusChannelList: [],
      parentId: this.$route.query.parentId, // 编辑时的id
      editType: this.$route.query.editType, // edit编辑 || copy复用
      form: {
        directType: '0', // 用户定向规则
        giveActivity: ['0'], // 赠课活动
        giveActivityFlag: '1', // 赠课活动参加权限
        subjectStatus: [['0']], // 用户状态购课状态
        registerChannel: [],
        userType: ['0'], // 付费类型
        userLevel: [], // 级别
        classStatus: ['0'], // 上课状态
        sideType: ['0'], // 区域状态
        givenType: ['0'], // 赠课类型
        languageVersion: '3', // 语言版本
        weekShare: ['0'], // 周周分享
        weekShareFlag: '0', // 周周分享参加权限
        goldShareFlag: '1', // 瓜分金币参与权限
        userArea: ['0'],
        msXtLever: ['0'],
        msTyLever: ['0'],
        xzXtLever: ['0'],
        xzTyLever: ['0'],
        awardedType: [] // 授课类型
      },
      subjectStatusListMap: new Map(),
      oldForm: {},
      rules,
      selectedInfoList: [],
      currAdPosiIndex: undefined,
      otherTypeLabels,
      adPosiList: [],
      checkAll: false,
      isIndeterminate: true,
      cityData: [],
      artData: [],
      registerChannelList: {},
      idMap: {}, // 编辑时 每个广告位置下的每个素材都对应着一条数据、一个id，如果此广告位置编辑被选中了则此id需回传，如果未被选中则id传""
      tableKey: 1,
      userGroupSelected: [], // 选择的分群
      uploadItem: {
        prop: 'otherUrl',
        mediaRules: {
          size: 3,
          media: 'img',
          type: 'GIF,PNG,JPG,JPEG',
          multiple: false
        },
        note: true
      }
    }
  },
  computed: {
    ...mapGetters(['loadings', 'operatConfig']),
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_a_ad_resource_listTopicPublish ||
      loadings._ums_meixiu_api_a_ad_resource_listAdvertV2New ||
      loadings._ai_api_api_c_v1_channel_queryChannelTreeList ||
      loadings._ums_meixiu_api_a_ad_resource_advertDin ||
      loadings._ums_meixiu_api_a_ad_resource_listRegions ||
      loadings._ums_meixiu_api_a_ad_resource_publishV2
    },
    setRegisterChannelList() {
      return Object.keys(this.registerChannelList)
        .reduce((pre, cur) => [...pre, ...this.registerChannelList[cur]], [])
        .sort((a, b) => +a.channleId - +b.channleId)
    },
    // 新增选择的业务线
    showSelect() {
      const type = `${this.currClientType.businessType}-${this.currClientType.clientType}`
      return this.typeList.get(type)
    },
    showClient() {
      return `${this.currClientType.businessType}-${this.currClientType.clientType}`
    },
    showDirectedFormItem() {
      return whiteList.includes(this.showClient)
    },
    showUserGroup() {
      return [4, 5].includes(this.typeList.get(`${this.currClientType.businessType}-${this.currClientType.clientType}`))
      // return [4, 5, 6, 7].includes(this.typeList.get(`${this.currClientType.businessType}-${this.currClientType.clientType}`))
    }

    // newAdPosiList() {
    //   return this.adPosiList.map(v => ({ ...v, resourceUrlList: v.resourceUrl ? v.resourceUrl.split(',') : [] }))
    // }
  },
  async created() {
    this.oldForm = JSON.parse(JSON.stringify(this.form))
    if (this.parentId) {
      if (this.editType === 'edit') this.$route.meta.title = '编辑投放'
      await this.getPublish()
    } else {
      this.getAdPosiList()
    }
    if (this.showSelect === 5) {
      this.queryChannelTreeList('ART_APP')
      this.queryChannelTreeList('WRITE_APP')
      this.queryChannelTreeList('DANCE_APP')
    } else {
      this.queryChannelTreeList('MUSIC_APP')
    }
    this.advertDin()
    getListRegions().then(res => {
      // cityList = [...res?.data].filter(item => item.code !== 86)
      cityList = [...res?.data].map(item => {
        // item.code = item.code.toString()
        item['label'] = item.name
        item['value'] = item.code.toString()
        return item
      })
      const newArtData = [{ label: '不限', value: '0' }, ...cityList?.slice(0, 4), { label: '海外', value: '000', children: [...cityList.slice(4)] }]
      this.artData = newArtData
    })
    const { businessType, clientType } = this.currClientType

    // Artworld 、小熊艺术才有有赞跳转
    if (businessType === 'Artworld' || businessType === '小熊艺术') {
      this.otherTypeLabels = this.otherTypeLabels.concat([{ value: '3', label: '有赞商城跳转' }])
    }
    // 1v1PC端新增跳转图片
    if (clientType === 'PC端') {
      this.otherTypeLabels = this.otherTypeLabels.concat([{ value: '4', label: '跳转图片' }])
    }
  },
  beforeRouteEnter(to, from, next) {
    const { businessType, clientType } = to.query
    if (businessType && clientType) {
      next()
    } else {
      next(vm => {
        vm.$message.error('参数异常请重试')
        vm.$router.back()
      })
    }
  },
  methods: {
    uploadApi: upload,
    // 删除注册渠道
    deleteStatus(key) {
      this.form.subjectStatus.splice(key, 1)
    },
    // 新增注册渠道
    addStatus(key) {
      this.form.subjectStatus.push(['0'])
    },
    // 表格选中行
    selectionChange(val) {
      this.selectedInfoList = val
    },
    // 获取用户状态及购课状态字典接口
    async advertDin() {
      const res = await advertDin()
      const { putTargetList, subjectStatusList } = res.data
      const subjectStatusListMap = new Map()
      subjectStatusList.forEach(item => {
        subjectStatusListMap.set(item.code, putTargetList[putTargetList.findIndex((one) => item.parentCode === one.code)].code)
      })
      this.subjectStatusListMap = subjectStatusListMap
      this.statusChannelList = putTargetList.map(item => {
        const oneLabel = {
          value: item.code,
          label: item.desc,
          children: subjectStatusList.filter(one => one.parentCode === item.code).map(child => { return { value: child.code, label: child.desc } })
        }
        return oneLabel
      })
    },
    queryChannelTreeList(subject) {
      queryChannelTreeList({ subject }).then((res) => {
        if (res.code === 0) {
          let newRegisterChannelList = []
          const levelList = []
          // eslint-disable-next-line no-inner-declarations
          function returnChildrenList(list) {
            const List = []
            list.forEach((item) => {
              let label
              if (+item.level === 3) {
                levelList.push(item.channleId)
              }
              const subjectMap = { 'ART_APP': '美术', 'WRITE_APP': '书法', 'DANCE_APP': '舞蹈', 'MUSIC_APP': '音乐' }
              if (+item.level === 1) {
                label = `${subjectMap[subject]}-${item.channleOutName}`
              } else {
                label = item.channleOutName
              }
              if (!((+item.level === 2 || +item.level === 1) && (item.childrenChannel && item.childrenChannel.length === 0))) {
                List.push({
                  ...item, value: item.channleId, label,
                  children: item.childrenChannel && item.childrenChannel.length > 0 && returnChildrenList(item.childrenChannel)
                })
              }
            })
            return List
          }
          newRegisterChannelList = returnChildrenList(res.payload).filter(i => i.children && i.children.length > 0)
          this.registerChannelList = { ...this.registerChannelList, [subject]: newRegisterChannelList }
          this.level3 = { ...this.level3, [subject]: levelList }
        }
      })
    },
    // 不限和后面不能同时选择。 val: 具体的字端，type: 字端名称, oldType: 老得字端值
    handleCheck(val, type) {
      if (!this.oldForm[type].includes('0') && val.includes('0')) {
        this.form[type] = ['0']
        this.oldForm[type] = val
      } else if (val.length > 1 && val.includes('0')) {
        // this.form[type].splice(val.indexOf('0'), 1)
        const newVal = [...val]
        newVal.splice(val.indexOf('0'), 1)
        this.form[type] = [...newVal]
        this.oldForm[type] = [...newVal]
      }
    },
    handleCheckAllChange(val) {
      const cityDa = this.cityData.map(item => item.code)
      this.form.sideType = val ? cityDa : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cityData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cityData.length
    },
    changeCheckbox(val) {
      this.handleCheck(val, 'userArea') // 先判断用户动作，是否选中或者取消不限
      const { userArea } = this.form // 再用改变后的数据判断
      let cityDat = []
      if (userArea.indexOf('2') > -1 && userArea.indexOf('3') > -1) {
        // 港澳台与海外
        cityDat = cityList.filter(filterItem => !(['86'].some(someItem => someItem === filterItem.code)))
      } else if (userArea.indexOf('3') > -1) {
        // 港澳台或港澳台与国内
        cityDat = cityList.filter(filterItem => (['853', '852', '886'].some(someItem => someItem === filterItem.code)))
      } else if (userArea.indexOf('2') > -1) {
        // 海外或海外与国内
        cityDat = cityList.filter(filterItem => !(['86', '853', '852', '886'].some(someItem => someItem === filterItem.code)))
      }
      this.$set(this, 'cityData', cityDat)
    },
    // 获取广告位列表
    getAdPosiList() {
      listAdvertV2New({
        bussinessName: this.currClientType.businessType,
        clientType: this.currClientType.clientType
      }).then(res => {
        const data = res.data || {}
        if (JSON.stringify(data) !== '{}') {
          this.adPosiList = Object.values(data).map(val => {
            let obj = { otherType: '', otherUrl: '', resourceUrl: '', advertId: [], bannerUrl: '' }
            const advertPositionOptions = []
            val.forEach(v => {
              const { id, advertName, advertSizeName, newAdvertSize } = v
              obj = { ...obj, advertSizeName, newAdvertSize }
              advertPositionOptions.push({
                label: advertName,
                value: id
              })
            })
            obj['advertPositionOptions'] = advertPositionOptions
            return obj
          })
        }
      })
    },
    // 获取广告位
    async getPublish() {
      await getPublishById({ parentId: this.parentId }).then(res => {
        if (res.status === 0) {
          const d = res.data || []
          let sideType = []
          const userArea = []
          const arrList = ['86', '853', '852', '886', '0']
          let overseas = false // 有海外
          if (d.sideType || Array.isArray(d.sideType)) {
            sideType = JSON.parse(`[${d.sideType}]`)
            sideType = sideType.map(i => i.toString())
            if (sideType.indexOf('0') > -1) {
              userArea.push('0')
            }
            if (sideType.indexOf('86') > -1) {
              userArea.push('1')
            }
            if (sideType.indexOf('853') > -1 || sideType.indexOf('852') > -1 || sideType.indexOf('886') > -1) {
              userArea.push('3')
            }
            sideType.forEach(item => {
              if (arrList.indexOf(item) === -1) {
                overseas = true
              }
            })
            if (overseas) {
              userArea.push('2')
            }
          }
          const arr = d.publishInfoList || []
          const publishInfoList = []
          arr.forEach(item => {
            const index = publishInfoList.findIndex(one => one.advertId === item.advertId)
            if (index !== -1) {
              publishInfoList[index].resourceUrl = publishInfoList[index].resourceUrl + ',' + item.resourceUrl
              publishInfoList[index].bannerUrl = publishInfoList[index].bannerUrl + ',' + item.bannerUrl
              publishInfoList[index].id = publishInfoList[index].id + ',' + item.id
              this.idMap = {
                ...this.idMap,
                [publishInfoList[index].advertId]: publishInfoList[index].id
              }
            } else {
              this.idMap = {
                ...this.idMap,
                [item.advertId]: item.id + ''
              }
              publishInfoList.push(item)
            }
          })
          this.form = {
            ...this.form,
            directType: d.directType + '',
            publishName: d.publishName,
            otherUrl: d.otherUrl || undefined,
            startTime: d.startTime,
            endTime: d.endTime || undefined,
            publishInfoList: publishInfoList,
            otherType: d.otherType || undefined,
            awardedType: d.awardedType ? d.awardedType.split(',').filter(item => item !== '') : [],
            userType: d.userType ? d.userType.split(',').filter(item => item !== '') : [],
            userLevel: d.userLevel ? d.userLevel.split('') : [],
            sideType,
            classStatus: d.classStatus ? d.classStatus.split('') : [],
            givenType: d.givenType ? d.givenType.split(',').filter(item => item !== '') : [],
            userArea,
            languageVersion: d.languageVersion,
            registerChannel: d.registerChannel?.split(','),
            weekShare: d.weekShare ? d.weekShare.split(',').filter(item => item !== '') : [],
            weekShareFlag: d.weekShareFlag,
            goldShareFlag: d.goldShareFlag,
            giveActivity: d.giveActivity ? d.giveActivity.split('') : [],
            giveActivityFlag: d.giveActivityFlag,
            // 美术，书法系统和体验课
            msXtLever: d.msXtLever ? d.msXtLever.split('') : [],
            msTyLever: d.msTyLever ? d.msTyLever.split('') : [],
            xzXtLever: d.xzXtLever ? d.xzXtLever.split('') : [],
            xzTyLever: d.xzTyLever ? d.xzTyLever.split('') : [],
            subjectStatus: d.subjectStatus ? d.subjectStatus.split(',').map(item => { return item.split('') }) : [[]]
          }
          this.userGroupSelected = d.userClusterId || []
          this.changeCheckbox(userArea)
        }
      })
      // 获取广告位
      await listAdvertV2New({
        bussinessName: this.currClientType.businessType,
        clientType: this.currClientType.clientType,
        flag: 1 // 表示修改时获取广告位（不传会过滤掉已满广告位）
      }).then(res => {
        const data = res.data || {}
        const selectionArr = []
        this.adPosiList = Object.values(data).map((item, index) => {
          let obj = {}
          let resetObj = { resourceUrl: '', bannerUrl: '' }
          const advertPositionOptions = []
          const advertIds = []
          item.forEach((v, i) => {
            const { advertName, advertSizeName, newAdvertSize } = v
            const selectedItem = this.form.publishInfoList.filter(adItem => adItem.advertId === v.id)?.[0]
            obj = { advertName, advertSizeName, newAdvertSize }

            // 如果此项被选中 则构造广告位置select值、跳转类型、链接地址、图片的回显
            if (selectedItem) {
              const { otherType, otherUrl, resourceUrl, advertId, id, bannerUrl, soundUrl } = selectedItem
              advertIds.push(advertId)
              resetObj = {
                ...resetObj,
                id,
                otherType,
                otherUrl,
                soundUrl,
                resourceUrl: resetObj.resourceUrl
                  ? !resetObj.resourceUrl.includes(resourceUrl) ? `${resetObj.resourceUrl},${resourceUrl}` : resetObj.resourceUrl
                  : resourceUrl,
                bannerUrl: resetObj.bannerUrl
                  ? !resetObj.bannerUrl.includes(bannerUrl) ? `${resetObj.bannerUrl},${bannerUrl}` : resetObj.bannerUrl
                  : bannerUrl
              }
            }

            // 构造广告位置selectOptions
            advertPositionOptions.push({
              label: advertName,
              value: v.id
            })
          })
          // 选中
          if (advertIds.length) {
            selectionArr.push(index)
          }
          obj = {
            ...obj,
            ...resetObj,
            advertPositionOptions,
            advertId: advertIds
          }
          return obj
        })
        this.selectedInfoList = selectionArr.map((elIndex) => {
          this.$nextTick(() => {
            this.$refs.multipleTable && this.$refs.multipleTable.toggleRowSelection(this.adPosiList[elIndex])
          })
          return this.adPosiList[elIndex]
        })
      })
    },
    // 预览弹窗
    toOverview(overviewUrl) {
      this.currOverviewUrl = overviewUrl
      this.isShowOverview = true
    },
    closeMaterialDl() {
      this.addOrEditMaterial = 0
    },
    // 素材提交
    submitMaterial(val) {
      const adPosi = {
        ...this.adPosiList[this.currAdPosiIndex],
        resourceUrl: val.resourceUrl,
        bannerUrl: val.bannerUrl,
        otherType: val.otherType || undefined,
        otherUrl: val.otherUrl || undefined
      }
      this.$set(this.adPosiList, this.currAdPosiIndex, adPosi)
      // 如果修改则将展示内容放置在已选列表中
      if (this.parentId) {
        this.selectedInfoList = this.adPosiList
      }
      this.$refs.multipleTable && this.$refs.multipleTable.toggleRowSelection(this.adPosiList[this.currAdPosiIndex])
      this.closeMaterialDl()
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!(this.selectedInfoList.length > 0)) {
            this.$message.error('请选择广告投放位置')
            return false
          }
          if (!this.selectedInfoList[0].resourceUrl) {
            this.$message.error('广告素材不能为空')
            return false
          }
          const data = { ...this.form, ...this.currClientType, enabled: 1 }
          if (!data.startTime) {
            data.startTime = moment().format('YYYY-MM-DD HH:mm:ss')
          }
          let errMsg = ''
          data.publishInfoList = []

          this.selectedInfoList.forEach(item => {
            const { resourceUrl, otherType, otherUrl, advertId, bannerUrlObj, bannerUrl, soundUrl } = item
            const payload = { otherType, otherUrl, soundUrl }
            !otherType && delete payload.otherType
            !otherUrl && delete payload.otherUrl
            const resourceUrlList = resourceUrl ? String(resourceUrl).split(',') : []
            const bannerUrls = bannerUrl ? String(bannerUrl).split(',') : []
            if (!advertId.length) {
              errMsg = '广告位置不能为空'
            } else {
              resourceUrlList.forEach((url, i) => {
                advertId.forEach((adIdVal, adIdInd) => {
                  let id = ''
                  if (this.idMap[adIdVal]) {
                    id = this.idMap[adIdVal]?.split(',')?.[i] || ''
                  }

                  // 如果没有bannerUrlObj 说明此时并未编辑，则复原操作，并对应resourceUrl与bannerUrls
                  data.publishInfoList.push({ ...payload, resourceUrl: url, advertId: adIdVal, id, bannerUrl: !bannerUrlObj && bannerUrls ? bannerUrls[i] : '' })

                  // 如果有bannerUrlObj 说明是新增的，则使用resourceUrl查询banner使其具备正确的对应关系
                  if (bannerUrlObj) {
                    data.publishInfoList = data.publishInfoList.map(e => {
                      return {
                        ...e,
                        bannerUrl: bannerUrlObj[e.resourceUrl] || e.bannerUrl
                      }
                    })
                  }
                })
              })
            }
          })
          if (errMsg) {
            this.$message.error(errMsg)
            return
          }
          data.subjectStatus = data.subjectStatus && data.subjectStatus.length > 0 ? data.subjectStatus.filter(item => item.length > 0).reduce((pre, item) => { return pre ? `${pre},${item.join('')}` : item.join('') }, '') : ''
          if (this.parentId && this.editType === 'edit') {
            data.id = this.parentId
          }
          // 需要将数据中数组转成字符串的字段
          const labelArr = ['weekShare', 'registerChannel', 'awardedType', 'msXtLever', 'msTyLever', 'xzXtLever', 'xzTyLever', 'languageVersion', 'givenType', 'classStatus', 'userType', 'userLevel', 'sideType', 'giveActivity']
          for (const label in data) {
            if (labelArr.includes(label)) {
              data[label] = data[label] && data[label].length ? data[label].toString() : ''
            }
          }
          //  小熊美术新增字段
          switch (this.showSelect) {
            case 1:
              // 已退费不选
              if (data.userType === '3') {
                delete data.userLevel
                delete data.classStatus
              }
              break
            case 4:
            case 8:
              if (data.userType === '2') {
                delete data.givenType
              }
              break
          }
          if (data.subjectStatus) {
            const list = data.subjectStatus.split(',').reduce((content, item) => { return [...content, ...item.split('')] }, [])
            const str = []
            list.forEach((item, index) => {
              if (!str.includes(this.subjectStatusListMap.get(item))) {
                str.push(this.subjectStatusListMap.get(item))
              }
            })
            data.putTarget = str.toString()
          }
          // 分群规则
          if (this.showUserGroup) {
            const userSelected = this.$refs.userGroupCom.userSelected
            if (this.form.directType === '1' && userSelected?.length === 0) {
              this.$message.error('请选择用户定向-分群规则！')
              return
            }
            data.userClusterId = userSelected
          }
          // return
          updatePut(data).then(res => {
            if (res.status === 0) {
              this.$message.success(`${this.parentId && this.editType === 'edit' ? '修改成功' : '投放成功'}`)
              this.$router.replace({ name: 'AdPut' })
            }
          })
        } else {
          return false
        }
      })
    },
    back() {
      this.$router.replace({ name: 'AdPut' })
    },
    handleClose(tag) {
      console.log('tag', tag)
    }
  }
}
</script>
<style lang="scss" scoped>
.sort-item {
  width: 120px;
  margin-right: 20px;
  cursor: pointer;
  &-img {
    width: 120px;
    height: 120px;
    background-color: #ccc;
    border-radius: 5px;
  }
  &-title {
    margin-top: 10px;
    color: #999;
    text-align: center;
  }
}
.put-wrap {
  ::v-deep .el-select,
  ::v-deep .el-input {
    width: 300px;
  }
  .put-label {
    display: inline-block;
    width: 100px;
    padding: 0 12px 0 0;
    color: #606266;
    text-align: right;
    font-size: 14px;
    font-weight: 700;
    &::before {
      content: '*';
      color: #ff4949;
      margin-right: 4px;
    }
  }

  .sub-label {
    display: inline-block;
    padding: 0;
    color: #606266;
    font-size: 14px;
    font-weight: 700;
  }
  .put-item {
    padding: 20px 10px 10px 30px;
    &-tips {
      padding-left: 10px;
      color: #999;
    }
    ::v-deep .el-table__header {
      th {
        background-color: #f4f4f5;
      }
    }
  }
  .put-submit {
    text-align: right;
  }
  .submit-bar {
    ::v-deep .el-form-item--small {
      margin-bottom: 0;
    }
  }
  .item-action {
    width: 50px;
    height: 50px;
    position: relative;
    margin: 0 auto;
    border: 1px dashed #ccc;
    border-radius: 4px;
    &-img {
      width: 100%;
      height: 100%;
    }
    &-edit {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(120%, -50%);
      cursor: pointer;
      color: #1890ff;
    }
    &.empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .ad-num {
    color: #1890ff;
  }
  .to-overview {
    cursor: pointer;
    color: #1890ff;
    font-size: 18px;
  }
  .ad-overview {
    text-align: center;
    img {
      width: 80%;
    }
  }
  .material-tip {
    padding: 16px;
    font-size: 14px;
    font-weight: 700;
    color: #606266;
    span {
      color: red;
    }
  }
}
.checkbox-class{
  width: 177px;
  max-height: 400px;
  overflow-y: scroll;
  border-radius: 5px;
}
</style>
