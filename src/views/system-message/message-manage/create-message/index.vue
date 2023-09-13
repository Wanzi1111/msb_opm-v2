<template>
  <div>
    <div v-loading="loadings._ums_meixiu_api_mc_manage_save" class="app-container form-box">
      <basics-form
        ref="formRef"
        :forms="forms"
        :actions="formActions"
        @submitForm="onFormSubmit"
        @changeForm="onFormChange"
      >
        <template slot="message-divider">
          <el-divider content-position="center">新建消息组</el-divider>
        </template>
        <template slot="temp-divider" slot-scope="scope">
          <el-divider v-if="scope.form.subSupport === '1'" content-position="center">创建二级消息组</el-divider>
          <el-divider v-else content-position="center">绑定场景值</el-divider>
        </template>
        <template slot="tempId" slot-scope="scope">
          <template v-if="scope.form.subSupport === '1'">
            <div v-for="(v, i) in subGroupList" :key="i">
              <el-divider content-position="left">组{{ i + 1 }}</el-divider>
              <el-form-item label="二级消息组名称" class="form-item" :rules="[{ required: true, message: '请输入！' }]">
                <el-input v-model="v.groupName" placeholder="请输入消息组名称" maxlength="20" style="width: 300px" />
              </el-form-item>
              <el-form-item label="二级消息组说明" class="form-item" :rules="[{ required: true, message: '请输入！' }]">
                <el-input v-model="v.memo" placeholder="请输入消息组说明" maxlength="24" style="width: 300px" />
              </el-form-item>
              <el-form-item label="绑定场景/模板ID" class="form-item" :rules="[{ required: true, message: '请选择！' }]">
                <el-button @click="handleDrawerVis('chooseTwoLevelTemp', { drawerType: 'chooseTwoLevelTemp', index: i, selected: v.sceneList })">点击选择场景ID</el-button>
                <i>（最多绑定10个场景，至少1个）</i>
                <el-button icon="el-icon-minus" circle size="mini" @click="handleDelGroup(i, v)" />
              </el-form-item>
              <template v-if="v.sceneList.length">
                <div style="padding-left: 150px;">
                  <div v-for="(val, ind) in v.sceneList" :key="val.id" style="margin-bottom: 5px">
                    <el-input v-model="val.sceneName" placeholder="请输入场景名称" style="width: 300px">
                      <template slot="prepend">{{ val.sceneId }}</template>
                    </el-input>
                    <i class="el-icon-circle-close" style="cursor: pointer;" @click="handleDelTemp('delTwoLevel', i, ind)" />
                  </div>
                </div>
              </template>
              <div v-if="i !== subGroupList.length - 1" style="height: 12px;" />
            </div>
          </template>
          <template v-else>
            <el-form-item label="绑定场景/模板ID" class="form-item" :rules="[{ required: true, message: '请选择！' }]">
              <el-button @click="handleDrawerVis('chooseTemp', { drawerType: 'chooseTemp', selected: sceneList})">点击选择场景ID</el-button><i>（最多绑定10个场景，至少1个）</i>
            </el-form-item>
            <template v-if="sceneList.length">
              <div style="padding-left: 150px;">
                <div v-for="(v, i) in sceneList" :key="v.id" style="margin-bottom: 5px">
                  <el-input v-model="v.sceneName" placeholder="请输入场景名称" style="width: 300px">
                    <template slot="prepend">{{ v.sceneId }}</template>
                  </el-input>
                  <i class="el-icon-circle-close" style="cursor: pointer;" @click="handleDelTemp('del', i)" />
                </div>
              </div>
            </template>
          </template>
        </template>
        <template slot="open-divider">
          <el-divider content-position="left" />
        </template>
      </basics-form>

      <template v-if="drawerType">
        <drawer-choose-templete v-if="drawerType" :drawer-data="drawerData" @handleDrawerVis="handleDrawerVis" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import DrawerChooseTemplete from './drawer-choose-templete'
import { saveMessageGroup } from '@/api/system-message'
import forms, { formActions } from './form'

// const temp_ids_temp = { id: 'xx12412212', name: '' }
const message_group_temp = { groupName: '', memo: '', sceneList: [] }

export default {
  name: 'CreateMessage',
  components: { DrawerChooseTemplete },
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      visiable: true,
      drawerType: '',
      drawerData: '',
      forms,
      formActions: formActions(),
      subGroupList: [], // 二级消息组列表，sceneList为场景id列表
      subGroupListCache: [], // 缓存编辑时的数据、用户保存时标记删除的分组del为1
      sceneList: [], // 不支持二级分组时的单个场景id列表
      id: '' // 编辑id
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.$nextTick(() => {
      this.handleEdit()
    })
  },
  methods: {
    handleEdit() {
      const { $route: { query: { type, data }}} = this
      // 编辑回显
      if (type === 'edit') {
        const { displaySort, groupName, sceneList, status, subGroupList, subSupport } = JSON.parse(data)
        const recoveryFormData = { displaySort, groupName, status: status + '', subSupport: subSupport + '', twoNums: subGroupList.length || 1 }
        if (subSupport + '' === '1') {
          this.subGroupList = [...subGroupList]
          this.subGroupListCache = [...subGroupList]
        } else {
          this.sceneList = sceneList
        }
        this.$nextTick(() => {
          this.$refs.formRef.recoveryForm(recoveryFormData)
        })
      }
    },
    onFormSubmit(values) {
      const { subGroupListCache, sceneList, $route: { query: { data }}} = this
      const { app, id } = JSON.parse(data)
      const payload = cloneDeep(values)
      let errMsg = ''
      delete payload.twoNums
      // 二级分组
      if (payload.subSupport === '1') {
        payload.subGroupList = this.subGroupList
        payload.subGroupList.forEach(val => {
          if (!val.sceneList?.length) {
            errMsg = '请选择分组场景！'
          } else {
            val.sceneList = val.sceneList.map(v => ({ sceneId: v.sceneId, sceneName: v.sceneName, sceneType: v.sceneType }))
          }
        })
        const ids = payload.subGroupList.map(v => v.sceneList.map(v => v.sceneId)).flat()
        if (ids.length !== new Set(ids).size) {
          errMsg = '场景值不可重复选择！'
        }
      // 一级分组
      } else {
        if (!sceneList?.length) {
          errMsg = '请选择分组场景！'
        } else {
          payload.sceneList = sceneList
          const ids = payload.sceneList.map(v => v.sceneId)
          if (ids.length !== new Set(ids).size) {
            errMsg = '场景值不可重复选择！'
          }
        }
      }
      // 参数校验
      if (errMsg) {
        this.$message.error(errMsg)
        return
      }
      if (subGroupListCache.length) {
        const delList = subGroupListCache.filter(v => v.del === '1')
        payload.subGroupList = [...payload.subGroupList, ...delList]
      }
      if (id) {
        payload.id = id
      }
      // console.log('payload', payload)
      // return
      const submitFn = () => {
        return saveMessageGroup({ app, ...payload })
          .then(() => {
            this.$message.success('保存成功~')
            setTimeout(() => {
              this.$router.go(-1)
            }, 200)
          })
      }
      if (payload.status === '1') {
        this.$confirm('确认提交后，APP消息设置页面会立即展示该消息', '提示', { type: 'info' })
          .then(() => {
            submitFn()
          })
      } else {
        submitFn()
      }
    },
    onFormChange(newVals, oldVals) {
      // console.log('newVals, oldVals', newVals, oldVals)
      // 二级消息组动态数量
      const subGroupListLen = this.subGroupList.length
      if (newVals.twoNums < subGroupListLen) {
        // 标记删除
        const delIdList = this.subGroupList.slice(newVals.twoNums)
          .filter(v => !!v.id)
          .map(v => v.id)
        if (delIdList.length) {
          this.subGroupListCache.forEach(v => {
            if (delIdList.includes(v.id)) {
              v.del = '1'
            }
          })
        }
        this.subGroupList.splice(newVals.twoNums)
      } else if (newVals.twoNums > subGroupListLen) {
        for (var i = 0; i < newVals.twoNums - subGroupListLen; i++) {
          this.subGroupList.push({ ...message_group_temp })
        }
      }

      // 是否支持二级消息组
      if (newVals.subSupport && newVals.subSupport !== oldVals.subSupport) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { twoNums: newVals.subSupport === '1' }
        })
      }
    },
    // 删除一个分组
    handleDelGroup(i, v) {
      this.subGroupList = [...this.subGroupList.slice(0, i), ...this.subGroupList.slice(i + 1)]

      // 标记删除
      if (v.id) {
        this.subGroupListCache.forEach(val => {
          if (val.id === v.id) {
            val.del = '1'
          }
        })
      }
      this.$refs.formRef.set({
        type: 'defaultVal',
        data: { twoNums: this.subGroupList.length }
      })
    },
    handleDrawerVis(type, data) {
      this.drawerType = type || ''
      this.drawerData = data || ''
      if (!type) {
        const { drawerType, index, selected } = data
        if (!selected) return
        if (drawerType === 'chooseTemp') {
          this.sceneList = selected
        } else if (drawerType === 'chooseTwoLevelTemp') {
          this.$set(this.subGroupList, index, { ...this.subGroupList[index], sceneList: selected })
        }
      }
    },
    handleDelTemp(type, i, ind) {
      if (type === 'del') {
        this.sceneList.splice(i, 1)
      } else if (type === 'delTwoLevel') {
        this.subGroupList[i].sceneList.splice(ind, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  ::v-deep .el-form-item__label {
    width: 150px !important
  }
}
</style>
