<template>
  <div class="app-container">
    <!-- 运营位-->
    <basics-form
      ref="operForm"
      :forms="forms"
      :actions="formActions"
      class="form-style"
      @changeForm="changeAdForm"
      @submitForm="submitAdOperat"
    >
      <template slot="triggerRealm">
        <template v-if="activeName === '美术宝1对1'">
          <el-form-item label="用户定向" label-width="116px">
            <el-radio-group v-model="directType" size="small">
              <el-radio v-for="v in userDirectType" :key="v.value" :label="v.value">{{ v.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="directType === '0'">
            <el-form-item label="付费类型" label-width="116px">
              <el-checkbox-group v-model="userType" size="small" @change="(val)=>{handleCheckAllChange(val,'userType')}">
                <el-checkbox-button v-for="v in user_type" :key="v.value" :label="v.value">{{ v.label }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="用户区域" label-width="116px">
              <el-checkbox-group v-model="sideType" size="small" @change="(val)=>{handleCheckAllChange(val,'sideType')}">
                <el-checkbox-button v-for="v in user_area" :key="v.value" :label="v.value">{{ v.label }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="赠课类型" label-width="116px">
              <el-checkbox-group v-model="givenType" size="small" @change="(val)=>{handleCheckAllChange(val,'givenType')}">
                <el-checkbox-button v-for="v in given_type" :key="v.value" :label="v.value">{{ v.label }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="周周分享" label-width="116px">
              <el-checkbox-group v-model="weekShare" size="small" @change="(val)=>{handleCheckAllChange(val,'weekShare')}">
                <el-checkbox-button v-for="v in week_share" :key="v.value" :label="v.value">{{ v.label }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="周周分享权限" label-width="116px">
              <el-radio-group v-model="weekShareFlag" size="small">
                <el-radio-button v-for="v in weekShare_flag" :key="v.value" :label="v.value">{{ v.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="赠课活动" label-width="116px">
              <el-checkbox-group v-model="giveActivity" size="small" @change="(val)=>{handleCheckAllChange(val,'giveActivity')}">
                <el-checkbox-button v-for="v in give_activity" :key="v.value" :label="v.value">{{ v.label }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="赠课活动权限" label-width="116px">
              <el-radio-group v-model="giveActivityFlag" size="small">
                <el-radio-button v-for="v in giveActivity_flag" :key="v.value" :label="v.value">{{ v.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="瓜分金币权限" label-width="116px">
              <el-radio-group v-model="goldShareFlag" size="small">
                <el-radio-button v-for="v in gold_share_flag" :key="v.value" :label="v.value">{{ v.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item> -->
          </template>
          <template v-else>
            <user-group-com ref="userGroupRef" :root-id="rootId" :user-group-selected="userGroupSelected" style="padding: 0 0 10px 30px" />
          </template>

        </template>
        <template v-else-if="activeName==='小熊美术'">
          <el-form-item label="用户定向" label-width="116px">
            <el-checkbox-group v-model="userState" size="small" @change="(val)=>{handleCheckAllChange(val,'userState')}">
              <el-checkbox-button v-for="v in user_state" :key="v.value" :label="v.value">{{ v.label }}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <template v-else-if="activeName==='小熊艺术'">
          <el-form-item label="用户定向" label-width="116px">
            <el-radio-group v-model="directType" size="small">
              <el-radio v-for="v in userDirectType" :key="v.value" :label="v.value">{{ v.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="directType === '0'">
            <el-form-item label="语言版本">
              <div>
                <el-radio-group v-model="languageVersionTwo" size="small">
                  <el-radio-button v-for="item in languageVersionObj" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="周周分享" label-width="116px">
              <el-checkbox-group v-model="weekShare" size="small" @change="(val)=>{handleCheckAllChange(val,'weekShare')}">
                <el-checkbox-button v-for="v in week_share" :key="v.value" :label="v.value">{{ v.label }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="周周分享参加权限" label-width="116px">
              <el-radio-group v-model="weekShareFlagTwo" size="small">
                <el-radio-button v-for="v in weekShare_flag" :key="v.value" :label="v.value">{{ v.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="注册渠道（排除）">
              <div>
                <el-cascader
                  v-model="registerChannel"
                  :style="{width: '250px'}"
                  :options="setRegisterChannelList"
                  :props="{ multiple: true, emitPath: false }"
                  :show-all-levels="false"
                  collapse-tags
                  clearable
                />
              </div>
            </el-form-item>
            <el-form-item label="用户状态及购课状态" class="subjectStatus-style">
              <div v-for="(item,key) in subjectStatus" :key="key" style="margin-bottom: 15px;">
                <el-cascader
                  v-model="subjectStatus[key]"
                  :style="{width: '250px'}"
                  :options="statusChannelList"
                  :props="{ multiple: true, emitPath: false }"
                  :show-all-levels="false"
                  collapse-tags
                  clearable
                />
                <el-button type="primary" icon="el-icon-plus" circle size="mini" style="margin-left:20px;font-size: 15px;" @click="addStatus(key)" />
                <el-button v-if="subjectStatus.length > 1" type="danger" icon="el-icon-delete" circle size="mini" style="font-size: 15px;" @click="deleteStatus(key)" />
              </div>
            </el-form-item>
          </template>
          <template v-else>
            <user-group-com ref="userGroupRef" :root-id="rootId" :user-group-selected="userGroupSelected" style="padding: 0 0 10px 30px" />
          </template>
        </template>
      </template>
    </basics-form>
  </div>
</template>

<script>
import { addPosition } from '@/api/ad-center/operat'
import { getListRegions, advertDin, queryChannelTreeList } from '@/api/ad-center/ad-input'
import forms, { actions as formActions } from './forms/ad-operat'
import { mapGetters } from 'vuex'
import allEnum from '@/utils/enum'
import UserGroupCom from '@/views/ad-center/ad-put/component/userGroup'

const userDirectType = [
  { label: '标签定向', value: '0' },
  { label: '分群定向', value: '1' }
]

const rootIdMap = {
  '美术宝1对1': '1',
  '小熊艺术': '2'
}

const {
  user_area,
  user_type,
  user_state,
  given_type,
  week_share,
  weekShare_flag,
  give_activity,
  giveActivity_flag,
  gold_share_flag,
  languageVersionObj
} = allEnum

export default {
  name: 'OperationPosition',
  components: { UserGroupCom },
  data() {
    return {
      forms: forms,
      formActions: formActions({ quit: this.closeAoDl }),
      activeName: this.$route.query.activeName,
      rootId: rootIdMap[this.$route.query.activeName] || '', // 用户分群 业务线id
      userGroupSelected: [], // 用户分群 选中的分群
      userDirectType, // 用户定向options
      directType: '0', // 用户定向规则
      userType: ['0'],
      sideType: ['0'],
      userState: ['0'],
      weekShare: ['0'],
      givenType: ['0'],
      oldUserState: ['0'],
      weekShareFlag: '0',
      giveActivity: ['0'],
      giveActivityFlag: '0',
      languageVersionTwo: '3', // 语言版本
      weekShareFlagTwo: '0',
      subjectStatus: [['0']],
      registerChannel: [],
      registerChannelList: {},
      statusChannelList: [],
      user_area,
      user_type,
      user_state,
      given_type,
      week_share,
      weekShare_flag,
      give_activity,
      giveActivity_flag,
      gold_share_flag,
      languageVersionObj,
      setRegisterChannelList: []
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    loading() {
      const { loadings } = this
      return loadings._ai_api_api_c_v1_channel_queryChannelTreeList ||
      loadings._ums_meixiu_api_a_ad_resource_advertDin ||
      loadings._ums_meixiu_api_a_ad_resource_listRegions ||
      loadings._ums_meixiu_api_a_ad_position_addPosition
    }
  },
  watch: {},
  mounted() {
    this.handleInit()
  },
  methods: {
    async handleInit() {
      this.advertDin()

      const cityListRes = await getListRegions()
      const cityList = cityListRes?.data.map(item => {
        item.label = item.name
        item.value = item.code.toString()
        return item
      })
      const newArtData = [{ label: '不限', value: '0' }, ...(cityList?.slice(0, 4) || []), { label: '海外', value: '000', children: [...cityList.slice(4)] }]

      if (this.activeName === '小熊艺术') {
        await Promise.all([this.queryChannelTreeList('ART_APP'), this.queryChannelTreeList('WRITE_APP'), this.queryChannelTreeList('DANCE_APP')])
        this.setRegisterChannelList = Object.keys(this.registerChannelList)
          .reduce((pre, cur) => [...pre, ...this.registerChannelList[cur]], [])
          .sort((a, b) => +a.channleId - +b.channleId)
      }

      this.$nextTick(() => {
        this.$refs.operForm.set({
          type: 'attr',
          data: {
            sideType: { options: newArtData }
          }
        })
        this.$refs.operForm.set({
          type: 'visible',
          data: {
            triggerRealm: !['美术宝书画院', 'Artworld'].includes(this.activeName),
            sideType: !['美术宝1对1', 'Artworld'].includes(this.activeName)
          }
        })
      })
      if (this.$route.query?.rowData) {
        this.handleEdit(JSON.parse(this.$route.query?.rowData))
      }
    },
    handleEdit(el) {
      const arr = ['userState', 'sideType', 'userType', 'givenType', 'weekShare', 'giveActivity']
      arr.map(item => {
        this[item] = el[item] ? el[item].split(',') : []
      })
      this.subjectStatus = el.subjectStatus ? el.subjectStatus.split(',').map(item => { return item.split('') }) : [[]]
      this.languageVersionTwo = el.languageVersion
      this.weekShareFlagTwo = el.weekShareFlag
      this.registerChannel = el.registerChannel?.split(',') || []
      this.userGroupSelected = el.userClusterId ? el.userClusterId.split(',').map(v => +v) : []
      this.directType = el.directType + ''
      this.weekShareFlag = el.weekShareFlag
      this.giveActivityFlag = el.giveActivityFlag

      const form = JSON.parse(JSON.stringify(el))
      form.triggerResultO = form.triggerResult
      form.lineStatus = !!form.lineStatus
      form.sideType = form.sideType.split(',')
      this.$nextTick(() => {
        this.$refs.operForm.recoveryForm(form)
      })
    },
    // 获取用户状态及购课状态
    queryChannelTreeList(subject) {
      return new Promise((resolve) => {
        queryChannelTreeList({ subject }).then((res) => {
          if (res.code === 0) {
            const returnChildrenList = function(list) {
              const levelList = []
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
            let newRegisterChannelList = []
            newRegisterChannelList = returnChildrenList(res.payload).filter(i => i.children && i.children.length > 0)
            this.registerChannelList = { ...this.registerChannelList, [subject]: newRegisterChannelList }
          }
          resolve()
        })
      })
    },
    // 删除注册渠道
    deleteStatus(key) {
      this.subjectStatus.splice(key, 1)
    },
    // 新增注册渠道
    addStatus(key) {
      this.subjectStatus.push(['0'])
    },
    handleCheckAllChange(val, tab) {
      if (!this.oldUserState.includes('0') && val.includes('0')) {
        this[tab] = ['0']
      } else if (val.length > 1 && val.includes('0')) {
        this[tab].splice(val.indexOf('0'), 1)
      } else if (val.length < 1) {
        this[tab] = ['0']
      }
      this.oldUserState = val
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
    // 新增运营位 - 关闭
    closeAoDl() {
      this.$router.go(-1)
    },
    submitAdOperat(e) {
      // if (!e.triggerResultO) return this.$message.error('请填写跳转链接')
      const { activeName, $route: { query: { groupId, rowData }}} = this
      const { id } = JSON.parse(rowData || '{}')
      // return
      if (activeName === '美术宝1对1') {
        e.sideType = this.sideType?.toString()
      } else if (activeName === 'Artworld') {
        e.sideType = '0'
      } else {
        e.sideType = [...e.sideType].toString()
      }
      if (id) {
        e.id = id
      }
      e.groupId = groupId

      if (e.triggerResultO || e.triggerResultI) {
        e.triggerResult = e.triggerResultO || e.triggerResultI
        delete e.triggerResultO
        delete e.triggerResultI
      }
      // const query = e
      e.lineStatus = e.lineStatus ? 1 : 0

      // 用户定向
      // 分群定向
      if (['美术宝1对1', '小熊艺术'].includes(activeName)) {
        e.directType = this.directType
        if (e.directType === '1') {
          e.userClusterId = this.$refs.userGroupRef.userSelected.toString()
        }
      }
      // 标签定向
      e.registerChannel = this.registerChannel?.join(',')
      e.userType = this.userType && this.userType.length ? this.userType.toString() : ''
      e.userState = this.userState && this.userState.length ? this.userState.toString() : ''
      e.givenType = this.givenType && this.givenType.length ? this.givenType.toString() : ''
      e.weekShare = this.weekShare && this.weekShare.length ? this.weekShare.toString() : ''
      e.weekShareFlag = this.activeName === '小熊艺术' ? this.weekShareFlagTwo : this.weekShareFlag
      e.giveActivity = this.giveActivity && this.giveActivity.length ? this.giveActivity.toString() : ''
      e.giveActivityFlag = this.giveActivityFlag
      e.languageVersion = this.languageVersionTwo || ''
      e.subjectStatus = this.subjectStatus && this.subjectStatus.length > 0 ? this.subjectStatus.filter(item => item.length > 0).reduce((pre, item) => { return pre ? `${pre},${item.join('')}` : item.join('') }, '') : ''

      // console.log('e', e)
      // return

      addPosition(e).then(res => {
        if (e.id) {
          this.$message.success('更新运营位成功')
        } else {
          this.$message.success('新建运营位成功')
        }
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      }).catch(err => {
        console.log(err)
      })
    },
    // 运营位 跳转页面联动
    async changeAdForm(val, oldVal) {
      // const { businessType } = val;
      if (val.triggerType && +val.triggerType === 1) {
        this.$refs.operForm.set({
          type: 'visible',
          data: { triggerResultI: true, triggerResultO: false }
        })
      } else {
        this.$refs.operForm.set({
          type: 'visible',
          data: { triggerResultI: false, triggerResultO: true }
        })
      }
      if (val.sideType && val.sideType !== oldVal.sideType) {
        if (!oldVal.sideType?.includes('0') && val.sideType.includes('0')) {
          this.$refs.operForm.recoveryForm({
            sideType: ['0']
          })
        } else if (val.sideType.length > 1 && val.sideType.includes('0')) {
          const newVal = [...val.sideType]
          newVal.splice(val.sideType.indexOf('0'), 1)
          this.$refs.operForm.recoveryForm({
            sideType: newVal
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-icon-delete {
  float: right;
}
.form-style{
  ::v-deep .el-form-item__label {
    width: 116px !important;
  }
  .subjectStatus-style{
    ::v-deep .el-form-item__content {
      margin-left: 116px;
    }
  }
}
</style>
