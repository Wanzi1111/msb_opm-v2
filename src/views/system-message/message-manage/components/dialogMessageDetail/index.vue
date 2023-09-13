<template>
  <div>
    <el-dialog
      :title="dialogData.groupName + '详情'"
      :visible.sync="visiable"
      width="900px"
      @close="onDialogClose"
    >
      <basics-table
        :list="list"
        :columns="dialogData.subGroupCount === 0 ? columns : subGroupColumns"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { downloadBatchTransferTemplete } from '@/api/express/manage'
import { columns, subGroupColumns } from './columns'

export default {
  name: 'DialogMessageDetail',
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
      subGroupColumns,
      list: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    const { dialogData: { subGroupCount, sceneList, subGroupList }} = this
    this.list = subGroupCount === 0 ? sceneList : subGroupList
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
