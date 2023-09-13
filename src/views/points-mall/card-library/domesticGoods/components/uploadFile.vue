<template>
  <div>
    <div class="uploadWrap">
      <el-button v-if="!FileName" type="primary">上传文件</el-button>
      <p v-else-if="FileName" style="margin:0">{{ FileName }}</p>
      <input ref="referenceUpload" type="file" @change="handleChange">
    </div>

    <p class="inputDesc">
      优惠券请上传单列的券码格式，卡密请上传双列的卡号+密码格式
      支持csv和txt格式，
      <a @click="clickDown">下载示例文件</a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    isFileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      FileName: ''
    }
  },
  computed: {},
  watch: {
    isFileName(v) {
      if (!v && this.$refs.referenceUpload) {
        this.$refs.referenceUpload.value = null
      }
      this.FileName = v
    }
  },
  mounted() {},
  methods: {
    clickDown() {
      fetch(
        'https://imgvip.meishubao.com/vip/h5/text/coupon-code-template.txt'
      ).then(res =>
        res.blob().then(blob => {
          var a = document.createElement('a')
          var url = window.URL.createObjectURL(blob)
          var filename = '示例文件.txt'
          a.href = url
          a.download = filename
          a.click()
          window.URL.revokeObjectURL(url)
        })
      )
    },
    handleChange(e) {
      const files = e.target.files || e.dataTransfer.files
      console.log('files', files)
      if (files) {
        this.$emit('upFiles', files)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inputDesc {
  line-height: 1.5;
  margin-top: 20px;
  a {
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
    opacity: 0;
  }
}
</style>
