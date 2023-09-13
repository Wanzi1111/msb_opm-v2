<template>
  <el-dialog title="审核备注" :visible="true" width="720px" @close="handleModalVis">
    <div v-loading="loadings._k8s_api_recommend_api_activity_checkAudit">
      <basics-form
        ref="formRef"
        class="form-box"
        :forms="forms"
        :actions="formActions"
        @changeForm="onFormChange"
        @submitForm="onFormSubmit"
      />
    </div>
  </el-dialog>
</template>

<script>

import { mapGetters } from 'vuex'
import { checkAudit } from '@/api/operate/review-activities'
import forms, { formActions } from './form'

export default {
  name: 'ModalRejectRemarks',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      forms,
      formActions
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  methods: {
    onFormChange(newVal, oldVal) {
      console.log('newVal', newVal)
      if (newVal.rejectRadio !== oldVal.rejectRadio) {
        if (newVal.rejectRadio === '其他') {
          this.$refs.formRef.set({
            type: 'visible',
            data: {
              textarea: true
            }
          })
        } else {
          this.$refs.formRef.set({
            type: 'visible',
            data: {
              textarea: false
            }
          })
        }
      }
    },
    handleModalVis(vis, refresh) {
      this.$emit('handleModalVis', vis, refresh || false)
    },
    onFormSubmit(values) {
      const audit_comment = values.rejectRadio === '其他' ? values.textarea : values.rejectRadio
      const { data: { id, audit_status }} = this
      if (!audit_comment) {
        this.$message.error('请选择或填写审核备注！')
        return
      }
      const params = { id, status: 2, audit_comment }
      if (+audit_status === 1) params.type = 1
      else delete params.type
      checkAudit(params).then(res => {
        if (res?.code === 0) {
          this.$message.success('驳回成功～')
          this.handleModalVis(false, true)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  ::v-deep .el-radio-group {
    display: flex;
    flex-direction: column;
  }
}
</style>
