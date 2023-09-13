<template>
  <div>
    <el-dialog
      title="物流进度"
      :visible.sync="visiable"
      width="520px"
      destroy-on-close
      @close="onDialogClose"
    >
      <div v-loading="loadings._ums_meixiu_api_im_g_v2_order_getLogisticsDetail2">
        <basics-descriptions :config="confirmConfig" :column="1" :attr="{size: 'small'}">
          <template slot="subVo" slot-scope="scope">
            <el-timeline v-if="scope.item.value && scope.item.value.length">
              <el-timeline-item v-for="(v, i) in scope.item.value" :key="i" :timestamp="v.thirdCreateTime" placement="top">
                <div>{{ v.orderStatus }}</div>
                <div>{{ `${v.areaName} ${v.note}` }}</div>
              </el-timeline-item>
            </el-timeline>
          </template>
        </basics-descriptions>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onDialogClose">取消</el-button>
          <!-- <el-button type="primary" @click="handlePushForm">立即推单</el-button> -->
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { getLogisticsDetail2 } from '@/api/points-mall/logis-manage'
import { confirmConfig } from './config'
import { desensitizationAddress } from '@/utils'

export default {
  name: 'DialogLogisProcess',
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
    },
    dialogData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      visiable: true,
      confirmConfig: [...confirmConfig]
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      const { confirmConfig, dialogData } = this
      const newConfig = cloneDeep(confirmConfig)
      const { order_id } = dialogData
      getLogisticsDetail2({ orderId: order_id })
        .then(({ payload: { subVo, addressDetail, supplier, expressName, orderNo }}) => {
          const dataSource = { ...dialogData, supplier, addressDetail }
          newConfig.map(v => {
            if (v.key === 'expressName') {
              v.value = `${expressName} ${orderNo}`
            } else if (v.key === 'subVo') {
              v.value = subVo.length ? subVo.reverse() : ''
            } else if (v.key === 'addressDetail') {
              const { province, city, area, addressDetail } = dataSource
              if (!addressDetail) {
                v.value = ''
                return
              }
              v.value = desensitizationAddress(addressDetail, `${province}${city}${area}`.length + 3)
            } else {
              v.value = dataSource[v.key]
            }
            return v
          })
          this.confirmConfig = newConfig
        })
    },
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    }
  }
}
</script>

<style lang="scss" scoped>
.logis-process-header {
  height: 80px;
  display: flex;
  justify-content: flex-start;
  // align-items:
}
</style>
