<template>
  <div>
    <div class="title-container">
      <basics-title :title="title" line />
    </div>
    <div v-loading="appLoading" class="app-container">
      <basics-block title="基本信息">
        <basics-form
          :key="key"
          ref="form"
          :loading="loadings._operation_resource_publish"
          :forms="forms"
          :actions="actions"
          :attr="{ disabled: formDisabled }"
          @changeForm="changeForm"
          @submitForm="submitForm"
        >
          <template v-if="$route.query.type === 'add' && $route.query.businessId !== '101'" slot="slotButton" class="form-item">
            <div style="margin: 0 0 20px 100px">
              <el-button
                icon="el-icon-edit-outline"
                type="primary"
                @click="()=>drawerCom = true"
              >选择用户类型</el-button>
            </div>
          </template>
        </basics-form>
      </basics-block>
    </div>
    <el-drawer
      title="用户类型"
      :visible.sync="drawerCom"
      direction="rtl"
      size="55%"
    >
      <template>
        <app-user ref="appUser" :business-id="$route.query.businessId" @userChange="userChange" />
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { createLive, packagetsList, getLiveInfo, updateLive } from '@/api/live-broadcast/manage'
import forms, { actions } from './forms/create'
import { mapGetters } from 'vuex'
import AppUser from './components/appUser'
import _ from 'lodash'
// import AppUserMusic from './components/appUser/indexMusic.vue'

export default {
  name: 'CreateLive',
  components: { AppUser },
  data() {
    return {
      key: 1,
      forms: _.cloneDeep(forms),
      formData: {},
      actions: actions({ name: 'Manage', params: { businessId: this.$route.query.businessId }}),
      goodsList: [],
      goodsObj: {
        original: '',
        price: '',
        name: '',
        id: '',
        goodsIntroduction: '',
        goodsUrl: ''
      },
      appUserType: '',
      drawerCom: false,
      formDisabled: false
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    title() {
      const { $route: { query: { type }}} = this
      const titleMap = {
        'add': '新建直播',
        'edit': '编辑直播',
        'detail': '直播详情'
      }
      return titleMap[type]
    },
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_play_v1_live_createLive ||
        loadings._ums_meixiu_api_play_v1_live_updateLive ||
        loadings._ums_meixiu_api_play_v1_live_getLiveInfo ||
        loadings._ums_meixiu_api_play_v1_live_packagetsList
    }
  },
  mounted() {
    this.packagets()
    const { $route: { query: { type }}} = this
    if (['edit', 'detail'].includes(type)) { // 获取修改信息
      this.handleEdit()
    }
    if (type === 'detail') {
      this.formDisabled = true
    }
  },
  methods: {
    handleEdit() {
      const { $route: { query: { liveActivityId, businessId }}} = this
      getLiveInfo({ liveActivityId, businessId }).then((result) => {
        if (businessId === '101') {
          result.payload.appUserType = Object.keys(JSON.parse(result.payload.appUserType))
        }
        this.formData = { ...result.payload }
        const json = JSON.parse(result.payload.goodsInfos)
        this.appUserType = result.payload.appUserType
        this.goodsObj = { ...this.goodsObj, ...json[0] }
        this.$nextTick(() => {
          this.$refs.form.recoveryForm({
            ...result.payload,
            prepareRemind: !!result.payload.prepareRemind,
            ...this.goodsObj
          })
        })
      }).catch((err) => {
        console.log(err)
      })

      this.$nextTick(() => {
        this.$refs.form.set({
          type: 'attr',
          data: {
            liveActivityId: { disabled: true },
            channelId: { disabled: true },
            openTime: { disabled: true },
            closeTime: { disabled: true },
            pushTerminal: { disabled: true },
            appUserType: { disabled: true }
          }
        })
      })
    },
    packagets() {
      const { $route: { query: { businessId }}} = this
      packagetsList({ type: 3, businessId }).then(res => {
        this.goodsList = [...res.payload].map(item => {
          item.value = item.id
          item.label = item.name
          return item
        })
        this.$refs.form.set({
          type: 'options',
          data: { id: this.goodsList }
        })
      })
      // 1v1 用户类型特殊展示s
      if (businessId !== '101') {
        this.$refs.form.set({
          type: 'visible',
          data: { appUserType: false }
        })
      }
    },
    // 子组件：用户类型变化
    userChange(val) {
      this.appUserType = _.omit(val, ['assignUser', 'type'])
      this.drawerCom = false
    },
    // 表单变化
    changeForm(val, oldVal) {
      const { id, prepareRemind, remindTime, openTime } = val
      if (id && id !== oldVal.id) {
        const dat = this.goodsList.filter(item => item.id === val.id)
        this.goodsObj = { ...this.goodsObj, ...dat[0] }
        this.$nextTick(() => {
          this.$refs.form.set({
            type: 'defaultVal',
            data: { ...this.goodsObj }
          })
        })
      }

      if (prepareRemind !== oldVal.prepareRemind) {
        this.$nextTick(() => {
          this.$refs.form.set({
            type: 'visible',
            data: { remindTime: prepareRemind }
          })
        })
      }
      if (remindTime && remindTime !== oldVal.remindTime) {
        const time = this.tTime(openTime) - this.tTime(remindTime)
        const timeDate = openTime - remindTime
        this.$nextTick(() => {
          this.$refs.form.set({
            type: 'rules',
            data: {
              remindTime: [{
                validator: function (rule, value, cd) {
                  const cdtime = time > 5 ? '直播预约时间不能大于5天' : timeDate <= 0 ? '直播预约时间不能小于开始时间' : ''
                  if (cdtime) return cd(new Error(cdtime))
                  else return cd()
                }
              }]
            }
          })
        })
      }
    },
    // 提交参数处理 数组 扁平化 并 去重
    arrDel(arr) {
      const newArr = arr ? arr.flat(Infinity) : []
      return [...new Set(newArr)]
    },

    // 提交表单
    submitForm(val) {
      const { $route: { query: { businessId, type }}} = this
      if (Number(val.closeTime) - Number(val.openTime) <= 0) return this.$message.error('结束时间不能小于开始')
      console.log('val', val)
      val.prepareRemind = ~~val.prepareRemind
      let appUserType = ''
      if (businessId !== '101') {
        appUserType = this.appUserType
        if (Object.keys(appUserType).length < 1) return this.$message.warning('请保存用户类型后，再提交')
        appUserType = JSON.stringify(appUserType)
      } else {
        const userMap = {}
        val.appUserType.forEach(v => {
          userMap[v] = true
        })
        appUserType = JSON.stringify(userMap)
      }

      let data = { ...this.formData, ...val }
      Object.keys(this.goodsObj).map(item => {
        this.goodsObj[item] = val[item]
      })
      const infosJson = [{
        ...this.goodsObj
      }]
      delete infosJson[0].label
      delete infosJson[0].value
      Object.keys(infosJson[0]).map(item => {
        delete data[item]
      })
      data.goodsInfos = JSON.stringify(infosJson)
      data.businessId = Number(businessId)

      // console.log('appu', appUserType)
      // return
      if (type === 'add') {
        data = { ...data, appUserType }
        createLive(data).then(() => {
          this.$message.success('新建成功~')
          this.$router.push({ name: 'Manage' })
        })
      } else {
        data = { ...data, appUserType, id: this.$route.query.id }
        updateLive(data).then(() => {
          this.$message.success('更新成功~')
          this.$router.push({ name: 'Manage' })
        })
      }
    },
    tTime(time) {
      const newdate = new Date()
      return ~~((time - newdate.getTime()) / (1000 * 3600 * 24))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .el-form-item__label {
    width: 120px !important
  }
}
</style>
