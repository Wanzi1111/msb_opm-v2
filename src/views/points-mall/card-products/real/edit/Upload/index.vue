<template>
  <div>
    <div>
      <div v-if="imageUrl" class="imgWrap">
        <img :src="imageUrl" class="avatar">
        <span class="delete" @click="toDel">
          <i class="el-icon-delete" />
        </span>
      </div>
      <el-upload
        v-else
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :http-request="picUpload"
        :before-upload="beforeAvatarUpload"
      >
        <div class="textW">
          <i class="el-icon-plus avatar-uploader-icon" />
          <p>上传</p>
        </div>
      </el-upload>
    </div>
    <p
      class="imgDest"
      v-text="
        imgDest === 'listImgs'
          ? '尺寸：建议750 x 750 像素；图片大小不超过1MB，最多添加1张主图'
          : '尺寸：建议120X120像素，jpg/png格式，大小不超过1MB；用于商品详情页的logo展示'
      "
    />
  </div>
</template>

<script>
import { upload } from '@/api/common'
export default {
  name: 'CustomUpload',
  props: {
    editImg: {
      type: String,
      default: ''
    },
    isDesc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imgDest: '',
      isMouted: false
    }
  },
  computed: {
    imageUrl() {
      if (this.editImg.length > 0) {
        return this.editImg
      }
      return ''
    }
  },
  created() {
    this.imgDest = this.isDesc
  },
  methods: {
    chooseInput(e) {
      // let file = e.target.file;
      console.log('e.target--------', e)
      // upload({});
    },
    handleAvatarSuccess(res, file) {
      console.log('e.target--------', res, file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      console.log(file.type, 'file.type')
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
        return
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        return
      }
      if (isJPG && isLt1M) {
        this.isMouted = true
      }
    },
    // 去删除
    toDel() {
      this.$emit('uploadImg', '')
    },
    picUpload(e) {
      console.log('file-------->', e)
      if (!this.isMouted) {
        return
      }
      upload(
        {
          file: e.file,
          rename: '列表图',
          time: 0,
          attr: {
            bucketName: 'one-by-one',
            dir: ''
          }
        },
        res => {
          console.log('返回的 res', res)
          this.$emit('uploadImg', res)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.imgDest {
  font-size: 14px;
  white-space: nowrap;
  color: #666;
}
.imgWrap {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  width: 140px;
  min-height: 140px;
  padding: 0 10px;

  img {
    width: 100%;
    display: block;
  }

  .delete {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 33;
    background: rgba(0, 0, 0, 0.1);
    width: 40px;
    text-align: center;
    .el-icon-delete {
      font-size: 20px;
    }
  }
  &:hover {
    .delete {
      display: block;
    }
  }
}
.avatar-uploader {
  border: 1px dashed #ccc;
  width: 140px;
  height: 140px;
  position: relative;
  .avatar {
    width: 100%;
    padding: 0 10px;
  }
  .textW {
    font-size: 20px;
    color: #333;
    p {
      margin: 0;
      font-size: 16px;
    }
  }
  .avatar-uploader-icon {
    color: #999;
  }
  ::v-deep .el-upload {
    background: #f9f9f9;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
