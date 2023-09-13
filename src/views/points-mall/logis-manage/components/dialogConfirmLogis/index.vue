<template>
  <div>
    <el-dialog
      title="物流推单确认"
      :visible.sync="visiable"
      width="600px"
      @close="onDialogClose"
    >
      <basics-descriptions :config="confirmConfig" :column="1" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="onDialogClose">取消</el-button>
        <el-button type="primary" :loading="loadings._ums_meixiu_api_im_g_v2_order_immediatelyPush" @click="handlePushForm">立即推单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { immediatelyPush } from '@/api/points-mall/logis-manage'
import { confirmConfig } from './config'

export default {
  name: 'DialogConfirmLogis',
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
      confirmConfig
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
      const { province, city, area, street } = dialogData
      newConfig.map(v => {
        if (v.key === 'province') {
          v.value = `${province} ${city} ${area} ${street}`
        } else {
          v.value = dialogData[v.key] || ''
        }
        return v
      })
      this.confirmConfig = newConfig
    },
    onDialogClose() {
      this.$emit('handleDialogVis', '', '',)
    },
    handlePushForm() {
      immediatelyPush({ id: this.dialogData.id })
        .then(() => {
          this.$message.success('推单成功~')
          this.$emit('handleDialogVis', '', '', 1)
        })
    }
  }
}
</script>
