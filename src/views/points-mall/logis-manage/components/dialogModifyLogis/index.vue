<template>
  <div>
    <el-dialog
      title="修改配送信息"
      :visible.sync="visiable"
      width="520px"
      @close="onDialogClose"
    >
      <div class="modify-logis-header">
        <div>
          <el-image style="width: 80px; height: 80px; margin-right: 10px" />
        </div>
        <div>
          <p style="color: #999">商品名称：</p>
          <p>
            <span>圆通快递</span>
            <span>快递单号</span>
          </p>
        </div>
      </div>
      <basics-form
        ref="formRef"
        :forms="forms"
        :loading="loadings._ums_api_sms_api_messagePlatForm_addOrUpdateSmsScenarioConfiguration"
        :actions="formActions"
        @submitForm="onFormSubmit"
        @changeForm="onFormChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { downloadBatchTransferTemplete } from '@/api/express/manage'
import forms, { formActions } from './form'

export default {
  name: 'DialogLogisProcess',
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      visiable: true,
      forms,
      formActions: formActions(this.onDialogClose)
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    console.log('【11】', 11)
  },
  methods: {
    onDialogClose() {
      this.$emit('handleDialogVis', '', '')
    },
    onFormSubmit(values) {},
    onFormChange(newValues, oldValues) {}
  }
}
</script>

<style lang="scss" scoped>
.modify-logis-header {
  height: 80px;
  display: flex;
  justify-content: flex-start;
  // align-items:
}
</style>
