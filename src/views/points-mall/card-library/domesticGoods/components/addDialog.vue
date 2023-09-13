<template>
  <el-dialog title="新增卡卷" :visible="isformVisible" @close="handClose">
    <el-form :model="form">
      <el-form-item
        label="名称"
        :label-width="formLabelWidth"
        :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="选择类型" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择选择类型">
          <el-option label="卡密" value="卡密" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="有效期"
        :label-width="formLabelWidth"
        :rules="[{ required: true }]"
      ><el-date-picker
        v-model="valuePicker"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      /></el-form-item>
      <el-form-item
        label="选择文件"
        :label-width="formLabelWidth"
        :rules="[{ required: true }]"
      >
        <uploadFile :is-file-name="isFileName" @upFiles="upFiles" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleImport">导 入</el-button>
    </div>
  </el-dialog>
</template>

<script>
import uploadFile from './uploadFile'

export default {
  components: { uploadFile },
  props: {
    formVisible: Boolean
  },

  data() {
    return {
      form: {
        name: '',
        region: '卡密'
      },
      formLabelWidth: '120px',
      isFileName: '',
      valuePicker: '',
      isformVisible: false,
      upFile: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  computed: {},
  watch: {
    formVisible(v) {
      if (v) {
        this.upFile = null
        this.valuePicker = ''
        this.form.name = ''
      }
      this.isformVisible = v
    }
  },
  mounted() {},
  methods: {
    upFiles(v) {
      if (v[0]) {
        this.upFile = v
        this.isFileName = this.upFile[0].name
      }
    },
    handleImport() {
      // 导入
      if (!this.form.name) {
        this.$message.error('请输入名称')
        return
      }
      if (!this.valuePicker) {
        this.$message.error('请输入有效期')
        return
      }
      if (!this.upFile) {
        this.$message.error('请选择文件')
        return
      }

      if (
        this.upFile[0].type !== 'text/csv' &&
        this.upFile[0].type !== 'text/plain'
      ) {
        this.$message.error('请选择csv文件或者 txt')
        return
      }
      const params = {
        couponName: this.form.name,
        type: 'CARD_CODE',
        startTime: this.valuePicker[0].getTime(),
        endTime: this.valuePicker[1].getTime(),
        file: this.upFile[0]
      }
      this.$api
        .addCouponApi(params)
        .then(() => {
          this.$emit('closeDetail', false)
        })
        .catch(e => {
          this.$emit('closeDetail', false)
        })
    },
    handClose() {
      this.$emit('closeDetail', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-form-item__content {
    width: 350px;
  }
  ::v-deep .el-select > .el-input {
    width: 350px;
  }
  ::v-deep .dialog-footer .el-button {
    width: 200px;
  }
.inputDesc {
  line-height: 1.5;
  margin-top: 20px;
  span {
    color: #409eff;
  }
}
.uploadWrap {
  position: relative;
  .el-button {
    width: 100%;
  }
  input {
    width: 350px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
}
</style>
