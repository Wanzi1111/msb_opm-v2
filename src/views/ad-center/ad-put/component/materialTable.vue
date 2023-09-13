<template>
  <div>
    <!-- 数据较多时用BasicsTable render表单输入卡顿 -->
    <el-table
      ref="multipleTable"
      v-loading="loadings._ums_meixiu_api_a_ad_resource_listAdvertV2New"
      max-height="400"
      stripe
      border
      :data="adPosiList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" min-width="200" fixed="left" />
      <el-table-column prop="advertSizeName" label="广告尺寸" align="center" min-width="200" />
      <el-table-column prop="advertId" label="广告位置" align="center" min-width="250">
        <template slot-scope="scope">
          <el-select v-model="scope.row.advertId" style="width: 100%" multiple clearable collapse-tags>
            <el-option v-for="v in scope.row.advertPositionOptions" :key="v.value" :value="v.value" :label="v.label" />
          </el-select>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="otherType" align="center" label="跳转类型" min-width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.otherType" style="width: 100%" clearable placeholder="不选择则走通用配置">
            <el-option v-for="v in otherTypeLabels" :key="v.value" :value="v.value" :label="v.label" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="otherUrl" align="center" label="链接地址" min-width="200">
        <template slot-scope="scope" clearable>
          <el-input v-model="scope.row.otherUrl" placeholder="请输入" />
        </template>
      </el-table-column> -->
      <el-table-column prop="resourceUrl" align="center" label="素材预览" min-width="80">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.resourceUrl.length"
            style="width: 40px; height: 40px"
            :src="scope.row.resourceUrl.split(',')[0]"
            :preview-src-list="scope.row.resourceUrl.split(',')"
          />
          <div v-else>无</div>
        </template>
      </el-table-column>
      <el-table-column prop="phoneCode" align="center" width="80" label="素材编辑" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="handleAdImgs(scope.row, scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 广告位预览图 -->
    <el-dialog
      v-if="isShowOverview"
      title="广告位预览图"
      :visible.sync="isShowOverview"
      width="500px"
      :before-close="closeOverviewDl"
    >
      <div class="ad-overview">
        <img :src="currOverviewUrl" alt="">
      </div>
    </el-dialog>
    <!-- 新增/修改素材 -->
    <el-dialog
      v-if="showDialogAdImgs"
      title="素材编辑"
      :visible.sync="showDialogAdImgs"
      width="500px"
      :before-close="closeMaterialDl"
    >
      <div class="ad-container">
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
          <template v-if="row.advertSizeName === 'pad开屏-1536*1848' || row.advertSizeName === '手机开屏-750*1334'" slot="imageButs" slot-scope="scope">
            <div v-for="(image,key) in scope.form.imageButs" :key="key" style="position: relative;">
              <el-form-item
                label-width="86px"
                :label="`查看按钮${key ? key + 1 : ''}`"
              >
                <upload-media
                  v-model="scope.form.imageButs[key]['bannerUrl' + key]"
                  class="upload-class"
                  :item="scope.form.imageButs[key]"
                  v-on="$listeners"
                  @upload="uploadApi"
                />
                <div class="note">
                  <template>
                    <i class="el-icon-info" />
                    <span>支持GIF、PNG、JPG和JPEG格式，尺寸要求： 656*200及以内</span>
                  </template>
                </div>
              </el-form-item>
            </div>
          </template>
          <template v-if="row.advertSizeName === '弹框-600*800'" slot="soundUrl" slot-scope="scope">
            <el-form-item
              label-width="86px"
              label="音频"
            >
              <upload-media
                v-model="scope.form.soundUrl"
                class="upload-class"
                :item="scope.item"
                v-on="$listeners"
                @upload="uploadApi"
              />
              <div class="note">
                <template>
                  <i class="el-icon-info" />
                  <span>目前支持mp3格式</span>
                </template>
              </div>
              <span :class="1 ? 'deleteHasImage' : 'deleteNoImage'"><el-button type="text" @click="deleteSoundUrl">删除</el-button></span>
            </el-form-item>
          </template>
        </basics-form>
      </div>
    </el-dialog>
    <!-- 图片预览 -->
    <!-- <el-dialog
      v-if="isShowImageList"
      title="图片预览"
      :visible.sync="isShowImageList"
      width="800px"
    >
      <div style="display:flex;margin-left:20px;flex-wrap: wrap;">
        <div v-for="item in imageList" :key="item.id" class="sort-item">
          <el-image
            class="sort-item-img"
            :src="item.resourceUrl"
            fit="contain"
            :preview-src-list="[item.resourceUrl]"
          />
        </div>
      </div>
    </el-dialog> -->
    <!-- <dialog-ad-position-imgs v-if="isShowImageList" :img-list="imageList" /> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UploadMedia from '@/components/BasicsForm/components/UploadMedia/index.vue'
import { getPutsByPositionId } from '@/api/ad-center/ad-position'
import { upload } from '@/api/common'
// import DialogAdPositionImgs from './dialogAdPositionImgs'
import materialForm, { actions as formActions } from '../forms/material'
import { otherTypeLabels } from '../enum'

export default {
  components: {
    UploadMedia
    // DialogAdPositionImgs
  },
  props: {
    adPosiList: {
      default: () => ([]),
      type: Array
    }
  },
  data() {
    return {
      otherTypeLabels,
      materialForm: JSON.parse(JSON.stringify(materialForm)), // 新增素材form
      isShowOverview: false,
      isShowImageList: false,
      currOverviewUrl: '',
      imageList: [],
      showDialogAdImgs: false,
      formActions: formActions({ quit: this.closeMaterialDl }),
      row: {}
    }
  },
  computed: {
    ...mapGetters(['loadings', 'operatConfig'])
  },
  watch: {
    showDialogAdImgs(val) {
      if (!val) {
        this.materialForm = JSON.parse(JSON.stringify(materialForm))
      }
    }
  },
  methods: {
    uploadApi: upload,
    // 删除音频
    deleteSoundUrl() {
      this.$refs.materialForm.set({
        type: 'visible',
        data: { soundUrl: false }
      })
    },
    delectImage(key) {
      this.$refs.materialForm.form.imageList.splice(key, 1)
      this.$refs.materialForm.form.imageButs.splice(key, 1)
    },
    addImage() {
      this.$refs.materialForm.form.imageList.push({
        prop: `resourceUrl${this.materialForm.length}`,
        label: '素材',
        mediaRules: {
          size: 3,
          media: 'img',
          type: 'GIF,PNG,JPG,JPEG'
        },
        note: true
      })
      this.$refs.materialForm.form.imageButs.push({
        prop: `resourceUrl${this.materialForm.length}`,
        label: '查看按钮',
        mediaRules: {
          media: 'img',
          type: 'GIF,PNG,JPG,JPEG',
          case: '<=',
          width: 656,
          height: 200
        },
        note: true
      })
    },
    toggleRowSelection(index) {
      this.$refs.multipleTable?.toggleRowSelection(index)
    },
    // 素材提交
    submitMaterial(val) {
      let resourceUrl = ''
      let bannerUrl = ''
      const bannerUrlObj = {} // 使用对象的特质，使resourceUrl与bannerurl一一对应
      for (let i = 0; i < val.imageList.length; i++) {
        const label = `resourceUrl${i}`
        if (!val.imageList[i][label]) {
          this.$message.error('预览图不能为空！')
          return
        } else {
          resourceUrl = resourceUrl ? resourceUrl + ',' + val.imageList[i][label] : val.imageList[i][label]
          // 思考良久，决定使用resourceUrl来对应bannerurl，这样就解决了，对应关系不明确的痛点
          for (let j = 0; j < val.imageButs.length; j++) {
            const banLabel = `bannerUrl${i}`
            bannerUrl = bannerUrl ? bannerUrl + ',' + val.imageButs[j][banLabel] : val.imageButs[j][banLabel]
            bannerUrlObj[val.imageList[i][label]] = val.imageButs[i][banLabel]
          }
        }
      }
      const adPosi = {
        ...this.adPosiList[this.currAdPosiIndex],
        resourceUrl,
        bannerUrl,
        bannerUrlObj,
        soundUrl: val.soundUrl || ''
      }
      this.$set(this.adPosiList, this.currAdPosiIndex, adPosi)
      // 如果修改则将展示内容放置在已选列表中
      if (this.parentId) {
        this.selectedInfoList = this.adPosiList
      }
      this.$refs.multipleTable?.toggleRowSelection(this.adPosiList[this.currAdPosiIndex])
      this.closeMaterialDl()
    },
    closeMaterialDl() {
      this.showDialogAdImgs = false
    },
    // 表格选中行
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
    // 预览弹窗
    toOverview(overviewUrl) {
      this.currOverviewUrl = overviewUrl
      this.isShowOverview = true
    },
    showImageList(row) {
      getPutsByPositionId({ advertId: row.advertId }).then(res => {
        if (res.status === 0) {
          this.imageList = res.data
          this.isShowImageList = true
        }
      })
    },
    closeOverviewDl() {
      this.isShowOverview = false
    },
    // 添加或者修改
    handleAdImgs(row, index) {
      this.currAdPosiIndex = index
      this.showDialogAdImgs = true
      // if (type === 2) {
      const { resourceUrl, bannerUrl, soundUrl } = row
      this.row = { ...row }
      this.$nextTick(() => {
        const imageList = resourceUrl.split(',').map((item, key) => {
          const label = `resourceUrl${key}`
          const imgObj = {
            prop: label,
            label: '素材',
            mediaRules: {
              size: 3,
              media: 'img',
              type: 'GIF,PNG,JPG,JPEG'
            },
            note: true
          }
          imgObj[label] = item
          return imgObj
        })
        const imageButs = bannerUrl.split(',').map((item, key) => {
          const label = `bannerUrl${key}`
          const imgObj = {
            prop: label,
            label: '查看按钮',
            mediaRules: {
              media: 'img',
              type: 'GIF,PNG,JPG,JPEG',
              case: '<=',
              width: 656,
              height: 200
            },
            note: true
          }
          imgObj[label] = item
          return imgObj
        })
        this.$refs.materialForm.recoveryForm({
          imageList,
          imageButs,
          soundUrl: soundUrl || ''
        })
      })
    }
    // }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item__label {
  width: 86px !important;
  margin-right: 10px;
}
.imageList-label {
  ::v-deep .el-form-item__label:before {
    content: "*";
    color: #ff4949;
    margin-right: 4px;
  }
}
.deleteHasImage {
  position: absolute;
  top: 5px;
  right: 5px;
}
.deleteNoImage {
  position: absolute;
  top: 5px;
  right: 70px;
}
.addHasImage {
  position: absolute;
  top: 30px;
  right: 5px;
}
.addNoImage {
  position: absolute;
  top: 30px;
  right: 70px;
}
.note {
  align-self: flex-start;
  /*margin-left: 10px;*/
  color: #999;
  font-size: 12px;
  line-height: 1.5;
}
.item-action {
  width: 50px;
  height: 50px;
  position: relative;
  border: 1px dashed #ccc;
  border-radius: 4px;
  &-img {
    width: 100%;
    height: 100%;
  }
  &-edit {
    margin-left: 2px;
    margin-top: 12px;
    cursor: pointer;
    color: #1890ff;
  }
  &.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.ad-num {
  color: #1890ff;
}
.to-overview {
  cursor: pointer;
  color: #1890ff;
  font-size: 18px;
}
.ad-overview {
  text-align: center;
  img {
    width: 80%;
  }
}
.material-tip {
  padding: 16px;
  font-size: 14px;
  font-weight: 700;
  color: #606266;
  span {
    color: red;
  }
}

.upload-class {
  ::v-deep .upload-media {
    .media-upload {
      height: 100px !important;
    }
  }
}

</style>
