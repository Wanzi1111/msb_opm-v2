<template>
  <el-dialog
    title="批量充值"
    :visible.sync="visible"
    width="500px"
    :before-close="close"
  >
    <el-form ref="importsForm" label-width="50px">
      <el-form-item>
        <upload
          ref="upload"
          :upload-api="$api.importOverseasOrder"
          tip="请上传已经填写完成的兑换码文件，请仔细检查是否有遗漏未填写的订单。"
          :media-rules="{
            size: 1,
            type: '.xls,.xlsx'
          }"
          @uploadEnd="uploadEnd"
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-check" :loading="gLoadings._ums_meixiu_api_im_g_v1_admin_import_order" type="primary" @click="nowUp">
          上传文件
        </el-button>
        <el-button icon="el-icon-close" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

import Upload from './upload'

export default {
  name: 'Imports',
  components: { Upload },
  props: {
    id: {
      default: 0,
      type: Number
    },
    visible: Boolean,
    close: {
      default: () => {},
      type: Function
    }
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    uploadEnd() {
      this.close(1)
    },
    nowUp() {
      this.$refs.upload.actUp()
    }
  }
}
</script>
