<template>
  <div style="padding: 0 90px">
    <el-row :gutter="12">
      <el-col v-for="(item, index) in row.sonPublish" :key="index" :xs="12" :sm="12" :md="8" :lg="8">
        <el-card shadow="hover" style="margin-top:20px" body-style="height: 270px">
          <el-row class="img-CTR">
            <el-col :span="23">
              <div class="advertName">
                <div>
                  <span>位置: {{ item.advertName }}</span>
                  <b> | </b>
                  <span>尺寸: {{ item.advertSizeName }}-{{ item.newAdvertSize }}</span>
                </div>
                <div class="advertStatus">状态: <el-tag size="small" :type="item.enabled ? 'success' : 'default'">{{ !item.enabled ? '已关闭':'已打开' }}</el-tag></div>
              </div>
            </el-col>
            <el-col :span="1">
              <el-popover v-if="row.publishStatus !== 3" class="set" trigger="click" placement="bottom-start">
                <div slot="reference" class="name-wrapper">
                  <div class="el-icon-s-tools" />
                </div>
                <div v-if="item.enabled != 1" style="cursor: pointer" @click="stopPublishV2(item, true)">开启</div>
                <div v-else style="cursor: pointer" @click="stopPublishV2(item)">关闭</div>
                <div v-if="row.publishStatus == 0" style="cursor: pointer" @click="stopPublishV2(item, 'detail')">查看</div>
              </el-popover>
            </el-col>
          </el-row>
          <div class="img-card">
            <el-image
              class="data-img"
              fit="scale-down"
              :src="item.resourceUrl"
              :preview-src-list="[item.resourceUrl]"
            />
            <div>
              <div class="data-box">
                <div class="data-title">手机端：</div>
                <div>
                  <div v-if="ctr" class="data-item">CTR：{{ item.ert || '' }}</div>
                  <div class="data-item">浏览量: PV: {{ item.exposureCount }}（{{ item.pvExposureRation || 0 }}%） UV: {{ item.uvExposureCount }}（{{ item.uvExposureRation || 0 }}%）</div>
                  <div class="data-item">点击量: PV: {{ item.clickCount }}（{{ item.pvRation || 0 }}%） UV: {{ item.uvCount }}（{{ item.uvRation || 0 }}%）</div>
                </div>
              </div>
              <div v-if="showPadData" class="data-box">
                <div class="data-title">PAD端：</div>
                <div>
                  <div v-if="ctr" class="data-item">CTR：{{ item.ertPad || '' }}</div>
                  <div class="data-item">浏览量: PV: {{ item.exposurePadCount }}（{{ item.pvExposurePadRation || 0 }}%） UV: {{ item.uvExposurePadCount }}（{{ item.uvExposurePadRation || 0 }}%）</div>
                  <div class="data-item">点击量: PV: {{ item.clickPadCount }}（{{ item.pvPadRation || 0 }}%） UV: {{ item.uvPadCount }}（{{ item.uvPadRation || 0 }}%）</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    row: {
      default: () => ({}),
      type: Object
    },
    ctr: {
      default: false,
      type: Boolean
    },
    showPadData: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    stopPublishV2(row, item) {
      // if (row.publishStatus === 3) {
      //   this.$message.warning('已关闭状态，不能操作')
      //   return
      // }
      this.$bus.$emit('changeStatus', row, item)
    }
  }
}
</script>
<style lang="scss" scoped>
.img-CTR {
  line-height: 18px;
  .advertName {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .advertStatus {
      width: 95px;
      margin-left: 5px;
    }
  }
}
.img-card {
  display: flex;
  align-items: center;
  .tip {
    span {
      display: block;
      margin-top: 11px;
      padding-left: 10px;
      color: #666;
    }
  }
  .el-icon-s-tools {
    color: #999
  }
  .data-img {
    width: 100px;
    height: 100px;
    padding: 4px;
    margin-right: 10px;
    border-radius: 8px;
    border: 1px dashed #e6ebf5;
    vertical-align: baseline;
  }
  .data-box {
    line-height: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .data-title {
      width: 70px;
    }
    .data-item {
      margin: 5px 0;
    }
  }
}
.set {
  padding: 5px;
  position: absolute;
  top: -15px;
  right: -8px;
  cursor: pointer;
}
</style>
