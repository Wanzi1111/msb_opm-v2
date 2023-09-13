<template>
  <div>
    <el-row :gutter="12">
      <el-col v-for="(item, index) in row.sonPublish" :key="index" :xs="8" :sm="8" :md="8" :lg="6">
        <el-card shadow="hover" style="margin-top:20px;">
          <el-row class="img-card">
            <el-col :span="8">
              <el-image
                style="width: 100px; height: 100px"
                :src="item.resourceUrl"
                :preview-src-list="[item.resourceUrl]"
              />
            </el-col>
            <el-col :span="16">
              <div class="text">
                <p>位置: {{ item.advertName }}</p>
                <p>PV: {{ item.clickCount }}({{ item.pvRation }}%)</p>
                <p>UV: {{ item.uvCount }}({{ item.uvRation }}%)</p>
                <p>状态: {{ !item.enabled ? '已关闭':'已打开' }}</p>
              </div>
              <el-popover v-if="row.publishStatus!==3" class="set" trigger="click" placement="bottom-start">
                <div slot="reference" class="name-wrapper">
                  <div class="el-icon-s-tools" />
                </div>
                <div v-if="item.enabled!=1" @click="stopPublishV2(item, true)">开启</div>
                <div v-else @click="stopPublishV2(item)">关闭</div>
                <div v-if="row.publishStatus == 0" @click="stopPublishV2(item, 'detail')">查看</div>
              </el-popover>
            </el-col>
          </el-row>
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
  .text {
    height: 120px
  }
}
.set {
  position: absolute;
  top: -15px;
  right: -8px;
}
</style>
