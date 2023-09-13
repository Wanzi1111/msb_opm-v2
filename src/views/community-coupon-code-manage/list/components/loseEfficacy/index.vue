<template>
  <div>
    <el-drawer
      title="补发失效设置"
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
          <template slot="file">
            <el-form-item
              label="手机号"
              :rules=" [
                { required: true }
              ]"
              style="margin-left: 7.4%"
            >
              <el-upload
                ref="upload"
                class="upload-demo"
                action="/"
                :on-remove="handleRemove"
                :on-change="handlePreview"
                :auto-upload="false"
                :limit="1"
              >
                <el-button slot="trigger" size="small" type="">批量上传</el-button>
              </el-upload>
            </el-form-item>
          </template>
        </basics-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { getCouponGroupList, mobileReissueFailure } from '@/api/community-coupon-code-manage'
import { getToken } from '@/utils/auth'
import forms, { formActions } from './form'

const operationUserId = getToken('userId')
const init_bind_code = { couponCode: '', couponCount: '' }

export default {
  name: 'DialogLoseEfficacy',
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
      groupList: [], // 人群列表
      file: [] // 文件列表
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
  },
  methods: {
    // 文件上传 - start
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      this.file = file
    },
    // 文件上传 - end

    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
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
    // obj 转 formData
    formDataHandel(obj) {
      const { raw } = this.file
      const data = {
        ...obj,
        operationUserId,
        file: raw,
        groupName: this.groupList.find(v => v.value === obj.groupId)?.label,
        sendName: this.$store.state.communityCouponCodeManage.baseData.sendWay.find(v => v.value === obj.sendType)?.label
      }
      const formData = new FormData()
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value)
      }
      return formData
    },
    onFormSubmit(values) {
      const { operationType } = values
      const types = {
        0: '是否确认将数据置为失效，失效后券码将过期请谨慎操作',
        1: '是否确认对该数据进行补发，补发后券码将再次发放请谨慎操作'
      }
      this.$confirm(types[operationType], '提示', { type: 'warning' })
        .then(() => {
          mobileReissueFailure(this.formDataHandel(values))
            .then(() => {
              this.$message.success('绑定券码成功~')
              this.onDialogClose(true)
            })
        })
    }
  }
}
</script>
