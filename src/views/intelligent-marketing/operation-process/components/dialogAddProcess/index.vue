<template>
  <div>
    <el-drawer
      title="新增计划"
      :visible.sync="visiable"
      :size="620"
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
        />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { addProcess, editProcess, getProcessDetail } from '@/api/intelligentMarketing/operation-process'
import forms, { formActions } from './form'

const init_bind_code = { couponCode: '', couponCount: '' }

export default {
  name: 'DialogAddProcess',
  props: {
    dialogData: {
      type: Object,
      default: () => ({})
    },
    handleDialogVis: {
      type: Function,
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
      groupList: [] // 人群列表
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_sms_api_web_process_add ||
      loadings._ums_meixiu_api_sms_api_web_process_edit ||
      loadings._ums_meixiu_api_sms_api_web_process_editFind
    }
  },
  mounted() {
    this.getProcessDetail()
  },
  methods: {
    getProcessDetail() {
      const { id } = this.dialogData
      if (!id) return
      getProcessDetail({ id })
        .then(({ payload }) => {
          const { eventName, userName, imageList } = payload
          this.$refs.formRef.recoveryForm({ eventName, userName, imageList: imageList.map(v => ({ name: v.imageUrl, url: v.imageUrl })) })
        })
    },
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    // onFormChange(newValues, oldValues) {
    //   if (newValues.businessType !== oldValues.businessType && newValues.businessType) {

    //   }
    // },
    onFormSubmit(values) {
      const payload = cloneDeep(values)
      payload.imageList = payload.imageList.map(v => ({ imageUrl: v.url }))
      if (this.dialogData?.id) {
        editProcess({ ...payload, id: this.dialogData.id })
          .then(() => {
            this.$message.success('编辑成功~')
            this.onDialogClose(true)
          })
        return
      }
      addProcess(payload)
        .then(() => {
          this.$message.success('新建成功~')
          this.onDialogClose(true)
        })
    }
  }
}
</script>
