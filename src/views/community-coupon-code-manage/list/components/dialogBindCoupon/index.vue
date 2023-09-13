<template>
  <div>
    <el-drawer
      title="绑定券码"
      :visible.sync="visiable"
      :size="630"
      @close="onDialogClose"
    >
      <div
        v-loading="appLoading"
        style="padding: 30px"
      >
        <basics-form
          ref="formRef"
          :forms="forms"
          :actions="formActions"
          @submitForm="onFormSubmit"
          @changeForm="onFormChange"
        >
          <template slot="list">
            <div v-for="(v, i) in slotForm.code" :key="i">
              <el-form-item v-if="v.del !== '1'" label="请绑定券码" label-width="96px">
                <el-select v-model="v.couponCode" placeholder="请选择有赞优惠券" filterable>
                  <el-option v-for="val in umpCouponList" :key="val.id" :label="val.title + '-' + val.id" :value="val.id" />
                </el-select>
                <el-input-number v-model="v.couponCount" :min="1" placeholder="发放券数量" style="width: 140px" />
                <span style="color: #666; font-size: 12px; margin-left: 5px">/人</span>
                <el-button v-if="i === slotForm.code.length - 1" type="text" :disabled="slotForm.code.length >= 10" @click="handleAdd">添加</el-button>
                <el-button type="text" :disabled="slotForm.code.length <= 1" style="margin: 0" @click="handleDel(i, v)">删除</el-button>
              </el-form-item>
            </div>
          </template>
          <template slot="titleCenter">
            <div style="margin-bottom: 20px">推送内容配置</div>
          </template>
        </basics-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { getAllUmpCoupon, getCouponGroupList, addCoupon, updateCoupon } from '@/api/community-coupon-code-manage'
import { getToken } from '@/utils/auth'
import forms, { formActions } from './form'

const operationUserId = getToken('userId')
const init_bind_code = { couponCode: '', couponCount: '' }
const disableds = cloneDeep(forms).slice(0, 4)

export default {
  name: 'DialogBindCoupon',
  props: {
    dialogData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visiable: true,
      forms,
      formActions: formActions(),
      slotForm: {
        code: [cloneDeep(init_bind_code)]
      },
      umpCouponList: [], // 券码列表
      groupList: [], // 人群列表
      recoveryForm: {}
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_ofa_coupon_groupList ||
      loadings._ums_meixiu_api_ofa_v1_youZan_coupon_allUmpCoupon ||
      loadings._ums_meixiu_api_ofa_coupon_add
    }
  },
  mounted() {
    this.getAllUmpCoupon()
    this.$nextTick(() => {
      disableds.forEach(e => {
        this.$refs.formRef.set({
          type: 'attr',
          data: {
            [e.prop]: { disabled: false }
          }
        })
      })
    })
    if (this.dialogData.id) {
      this.getInfo()
    }
  },
  methods: {
    // 获取券详情
    getInfo() {
      this.$api.getCouponInfo(this.dialogData).then((res) => {
        const { payload, payload: { couponList }} = res
        this.recoveryForm = payload
        this.$nextTick(() => {
          this.slotForm.code = couponList
          if (!payload.appletImg) delete payload.appletImg
          else payload.appletImg = [{ url: payload.appletImg || '' }]
          this.$refs.formRef.recoveryForm({ ...payload })

          disableds.forEach(e => {
            this.$refs.formRef.set({
              type: 'attr',
              data: {
                [e.prop]: { disabled: true }
              }
            })
          })
        })
      })
    },
    getAllUmpCoupon() {
      getAllUmpCoupon()
        .then(({ payload }) => {
          this.umpCouponList = payload
        })
    },
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    handleAdd() {
      this.slotForm.code.push(cloneDeep(init_bind_code))
    },
    handleDel(i, v) {
      // 带id的不能删除，要记录下来，del=1表示删除，服务端接口开发能力有限，谅解～ -。-
      if (v.id) {
        this.slotForm.code.splice(i, 1, { ...v, del: '1' })
      } else {
        this.slotForm.code.splice(i, 1)
      }
    },
    onFormChange(newValues, oldValues) {
      if (newValues.businessType !== oldValues.businessType && newValues.businessType) {
        getCouponGroupList({ businessType: newValues.businessType })
          .then(({ payload }) => {
            const groupList = payload.map(v => ({
              label: v.groupName,
              value: v.groupId
            }))
            this.groupList = groupList
            this.$refs.formRef.set({
              type: 'options',
              data: {
                groupId: groupList
              }
            })
          })
      }
    },
    onFormSubmit(values) {
      const { id } = this.dialogData
      if (this.slotForm.code.some(v => !v.couponCode || !v.couponCount)) {
        this.$message.error('请正确填写所绑定券码及数量！')
        return
      }
      const { appletImg: [{ url: appletImg = '' } = {}] } = values
      this.$confirm('点击提交后券码将开始发放，是否确认提交', '提示', { type: 'warning' })
        .then(() => {
          const payload = {
            ...this.recoveryForm, // 这个是服务端的返回值，提交时候要带上，防止接口报错（👍）
            ...cloneDeep(values),
            operationUserId,
            appletImg,
            list: this.slotForm.code.map(v => {
              v.couponName = this.umpCouponList.find(val => val.id === v.couponCode)?.title
              v.couponId = id || '' // 外层我知道有，但是里层你也得给带上（👍）
              return v
            }),
            groupName: this.groupList.find(v => v.value === values.groupId)?.label,
            sendName: this.$store.state.communityCouponCodeManage.baseData.sendWay.find(v => v.value === values.sendType)?.label
          }
          // console.log('payload', payload)
          // return
          let api
          if (id) {
            api = updateCoupon
            payload.couponList = payload.list
            payload.id = id
            delete payload.list
          } else {
            api = addCoupon
            delete payload.id
          }
          api(payload)
            .then(() => {
              this.$message.success('绑定券码成功~')
              this.onDialogClose(true)
            })
        })
    }
  }
}
</script>
