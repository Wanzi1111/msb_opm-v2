<template>
  <div>
    <el-upload
      action=""
      :class="uploadLimitMax ? 'upload-hide' : ''"
      :on-remove="uploadRemove"
      :on-preview="handlePictureCardPreview"
      :before-upload="uploadBefore"
      :http-request="picUpload"
      class="form-item-element"
      :file-list="value"
      v-bind="item.attr"
    >
      <i v-if="!uploadLimitMax && !item.attr.notImg" class="el-icon-plus" />
      <el-button v-if="!uploadLimitMax && item.attr.notImg" size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览" :modal="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>

const mime = require('mime')

export default {
  name: 'CustomUpload',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  computed: {
    // 达到允许上传最大数时，隐藏上传图标
    limit() {
      const { item } = this
      if (item && item.attr && item.attr.limit && item.attr.limit > 0) {
        return item.attr.limit
      }
      return 1
    },
    uploadLimitMax() {
      const { value, limit } = this
      return value.length >= limit
    }
  },
  updated() {
    console.log(this.value)
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除上传文件
    uploadRemove(e) {
      const { value } = this
      this.$emit('input', [...value.filter(v => v.uid !== e.uid)])
    },
    /**
       * 上传文件校验
       * @param e
       * @param mediaRules
       * @returns {boolean}
       */
    uploadBefore(e) {
      const { item } = this
      const { mediaRules = { type: '', size: 2048 }} = item
      let isType = false
      if (mediaRules.type) {
        mediaRules.type.split(',').map(item => {
          if (!e.type && e.name.includes('.xls')) {
            isType = true
          }
          if (e.type === mime.getType(item)) {
            isType = true
          }
        })
      } else {
        isType = true
      }
      const isBig = e.size / 1024 / 1024 < mediaRules.size
      if (!isType) {
        this.$message.error(`上传格式错误，请选择${mediaRules.type}格式`)
        return false
      }
      if (!isBig) {
        this.$message.error(`上传文件太大，请选择${mediaRules.size}M以下文件`)
        return false
      }
      return true
    },
    // 上传图片
    picUpload(e) {
      const { item } = this
      this.$emit('upload', { file: e.file, attr: item.attr || {}}, res => {
        this.$emit('input', [...this.value, {
          name: e.file.name,
          url: res
        }])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-hide {
  ::v-deep .el-upload {
    display: none;
  }
}
</style>
