<template>
  <div>
    <el-dialog title="广告图片" :visible="true">
      <basics-form
        ref="materialForm"
        :loading="loadings['https:__msb-operation-center.oss-cn-hangzhou.aliyuncs.com']"
        :forms="materialForm"
        :actions="formActions"
        @submitForm="submitMaterial"
      >
        <template slot="imageList" slot-scope="scope">
          <div v-for="(image,key) in scope.form.imageList" :key="key" style="position: relative;">
            <el-form-item
              class="imageList-label"
              label-width="86px"
              :label="`素材${key ? key + 1 : ''}`"
            >
              <upload-media
                v-model="scope.form.imageList[key]['resourceUrl' + key]"
                :item="scope.form.imageList[key]"
                v-on="$listeners"
                @upload="uploadApi"
              />
              <div class="note">
                <template>
                  <i class="el-icon-info" />
                  <span>支持GIF、PNG、JPG和JPEG格式</span>
                </template>
              </div>
              <span v-show="key === scope.form.imageList.length - 1 && scope.form.imageList.length > 1" :class="[scope.form.imageList[key]['resourceUrl' + key] ? 'deleteHasImage' : 'deleteNoImage']"><el-button type="text" @click="delectImage(key)">删除</el-button></span>
              <span v-show="key === scope.form.imageList.length - 1 || scope.form.imageList.length === 1" :class="[scope.form.imageList[key]['resourceUrl' + key] ? 'addHasImage' : 'addNoImage']"><el-button type="text" @click="addImage">添加</el-button></span>
            </el-form-item>
          </div>
        </template>
      </basics-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadMedia from '@/components/BasicsForm/components/UploadMedia/index.vue'
import { upload } from '@/api/common'
import materialForm, { actions as formActions } from '../../forms/material'

export default {
  name: 'DialogAdPosition',
  components: {
    UploadMedia
  },
  props: {
    imgList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      materialForm,
      formActions,
      imageList: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.imageList = this.imgList
  },
  methods: {
    uploadApi: upload,
    handleAction(type, data) {
      switch (type) {
        case 'delete': {
          this.imageList = this.imageList.filter(v => v.id !== data)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.img-wrap {
  display: flex;
  overflow: scroll;
  .img-box {
    width: 150px;
    height: 150px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px dashed rgba(204, 204, 204, 0.877);
  }
}
</style>
