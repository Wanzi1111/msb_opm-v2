<template>
  <div>
    <el-dialog
      title="获奖人名单"
      :visible.sync="visiable"
      width="700px"
      @close="onDialogClose"
    >
      <basics-table
        :list="dialogData"
        :columns="columns"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { downloadBatchTransferTemplete } from '@/api/express/manage'
import { columns } from './columns'

export default {
  name: 'DialogViewAwardUsers',
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
      columns,
      list: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {

  },
  methods: {
    onDialogClose(ifRefreshList) {
      this.$emit('handleDialogVis', '', '', ifRefreshList)
    },
    onFormSubmit(values) {},
    onFormChange(newValues, oldValues) {}
  }
}
</script>
